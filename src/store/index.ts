import { configureStore, createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { getImages, saveAltText } from '../services/api'
import { Image } from '../types'

// ─── async actions ───────────────────────────────────────────────────────────

export const fetchImages = createAsyncThunk(
  'app/fetchImages',
  async (_, { getState }) => {
    const { statusFilter, typeFilter, complexityFilter, page } = (getState() as RootState).app
    return getImages(statusFilter, typeFilter, complexityFilter, page)
  }
)

export const updateAltText = createAsyncThunk(
  'app/updateAltText',
  async ({ id, field, text }: { id: string; field: 'short' | 'long'; text: string }) => {
    return saveAltText(id, field, text)
  }
)

// ─── slice ────────────────────────────────────────────────────────────────────

interface State {
  images: Image[]
  loading: boolean
  error: string | null
  page: number
  totalPages: number
  statusFilter: string
  typeFilter: string
  complexityFilter: string
  selectedIds: string[]
  editingId: string | null
  editingField: 'short' | 'long' | null
  editingValue: string
}

const initialState: State = {
  images: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  statusFilter: 'all',
  typeFilter: 'all',
  complexityFilter: 'all',
  selectedIds: [],
  editingId: null,
  editingField: null,
  editingValue: '',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStatusFilter(state, { payload }: PayloadAction<string>) {
      state.statusFilter = payload
      state.page = 1
      state.selectedIds = []
    },
    setTypeFilter(state, { payload }: PayloadAction<string>) {
      state.typeFilter = payload
      state.page = 1
      state.selectedIds = []
    },
    setComplexityFilter(state, { payload }: PayloadAction<string>) {
      state.complexityFilter = payload
      state.page = 1
      state.selectedIds = []
    },
    setPage(state, { payload }: PayloadAction<number>) {
      state.page = payload
      state.selectedIds = []
    },
    toggleSelect(state, { payload }: PayloadAction<string>) {
      const idx = state.selectedIds.indexOf(payload)
      if (idx === -1) state.selectedIds.push(payload)
      else state.selectedIds.splice(idx, 1)
    },
    selectAll(state, { payload }: PayloadAction<boolean>) {
      state.selectedIds = payload ? state.images.map(i => i.id) : []
    },
    startEdit(state, { payload }: PayloadAction<{ id: string; field: 'short' | 'long'; value: string }>) {
      state.editingId = payload.id
      state.editingField = payload.field
      state.editingValue = payload.value
    },
    setEditingValue(state, { payload }: PayloadAction<string>) {
      state.editingValue = payload
    },
    cancelEdit(state) {
      state.editingId = null
      state.editingField = null
      state.editingValue = ''
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchImages.pending, state => { state.loading = true; state.error = null })
      .addCase(fetchImages.fulfilled, (state, { payload }) => {
        state.loading = false
        state.images = payload.images
        state.totalPages = payload.totalPages
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Something went wrong'
      })
      .addCase(updateAltText.fulfilled, (state, { payload }) => {
        const img = state.images.find(i => i.id === payload.id)
        if (!img) return
        if (payload.field === 'short') {
          img.shortAlt = payload.text
          img.shortAltGeneratedAt = payload.generatedAt
        } else {
          img.longAlt = payload.text
          img.longAltGeneratedAt = payload.generatedAt
        }
        if (img.status === 'Blank' && payload.text) img.status = 'Generated'
        state.editingId = null
        state.editingField = null
        state.editingValue = ''
      })
  },
})

export const {
  setStatusFilter, setTypeFilter, setComplexityFilter,
  setPage, toggleSelect, selectAll,
  startEdit, setEditingValue, cancelEdit,
} = appSlice.actions

// ─── store ────────────────────────────────────────────────────────────────────

export const store = configureStore({
  reducer: { app: appSlice.reducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

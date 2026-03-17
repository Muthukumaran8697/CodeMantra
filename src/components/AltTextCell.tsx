import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { startEdit, setEditingValue, cancelEdit, updateAltText } from '../store'

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

interface Props {
  imageId: string
  field: 'short' | 'long'
  text: string
  generatedAt: string | null
}

export default function AltTextCell({ imageId, field, text, generatedAt }: Props) {
  const dispatch = useAppDispatch()
  const { editingId, editingField, editingValue } = useAppSelector(s => s.app)
  const isEditing = editingId === imageId && editingField === field
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing) ref.current?.focus()
  }, [isEditing])

  function handleSave() {
    dispatch(updateAltText({ id: imageId, field, text: editingValue }))
  }

  // function handleKeyDown(e: React.KeyboardEvent) {
  //   if (e.key === 'Escape') dispatch(cancelEdit())
  //   if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSave()
  // }

  function formatDate(iso: string) {
    return 'Generated: ' + iso.replace('T', ' ').slice(0, 16)
  }

  if (isEditing) {
    return (
      <div className="alt-cell">
        <div className="alt-box editing">
          <textarea
            ref={ref}
            rows={4}
            value={editingValue}
            // onChange={e => dispatch(setEditingValue(e.target.value))}
            // onKeyDown={handleKeyDown}
            placeholder={`Enter ${field} alt text…`}
          />
        </div>
        {/* <div className="edit-actions">
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-cancel" onClick={() => dispatch(cancelEdit())}>Cancel</button>
          <span className="edit-hint">Ctrl+Enter to save</span>
        </div> */}
      </div>
    )
  }

  return (
    <div className="alt-cell">
      <div className="alt-box">
        <p className={text ? '' : 'empty'}>{text || 'No alt text yet'}</p>
        <button
          className="edit-icon-btn"
          // onClick={() => dispatch(startEdit({ id: imageId, field, value: text }))}
          title={`Edit ${field} alt text`}
        >
          {/* <EditIcon /> */}
        </button>
      </div>
      {generatedAt && <span className="gen-time">{formatDate(generatedAt)}</span>}
    </div>
  )
}

import React from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { setStatusFilter, setTypeFilter, setComplexityFilter, fetchImages } from '../store'
import { getCounts } from '../services/api'

const counts = getCounts()

export default function FilterBar() {
  const dispatch = useAppDispatch()
  const { statusFilter, typeFilter, complexityFilter } = useAppSelector(s => s.app)

  function handleStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setStatusFilter(e.target.value))
    setTimeout(() => dispatch(fetchImages()), 0)
  }

  function handleType(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setTypeFilter(e.target.value))
    setTimeout(() => dispatch(fetchImages()), 0)
  }

  function handleComplexity(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setComplexityFilter(e.target.value))
    setTimeout(() => dispatch(fetchImages()), 0)
  }

  return (
    <div className="filters">
      <span className="filters-label">Filters:</span>

      <div className="filter-group">
        <label>Image Status</label>
        <select value={statusFilter} onChange={handleStatus}>
          <option value="all">Show All Images ({counts.status.all})</option>
          <option value="Blank">Blank ({counts.status.Blank ?? 0})</option>
          <option value="Generated">Generated ({counts.status.Generated ?? 0})</option>
          <option value="Reviewed">Reviewed ({counts.status.Reviewed ?? 0})</option>
          <option value="Completed">Completed ({counts.status.Completed ?? 0})</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Image Type</label>
        <select value={typeFilter} onChange={handleType}>
          <option value="all">All Types ({counts.type.all})</option>
          <option value="Illustration">Illustration ({counts.type.Illustration ?? 0})</option>
          <option value="Diagram">Diagram ({counts.type.Diagram ?? 0})</option>
          <option value="Photo">Photo ({counts.type.Photo ?? 0})</option>
          <option value="Chart">Chart ({counts.type.Chart ?? 0})</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Complexity</label>
        <select value={complexityFilter} onChange={handleComplexity}>
          <option value="all">All Complexities ({counts.complexity.all})</option>
          <option value="Simple">Simple ({counts.complexity.Simple ?? 0})</option>
          <option value="Medium">Medium ({counts.complexity.Medium ?? 0})</option>
          <option value="Complex">Complex ({counts.complexity.Complex ?? 0})</option>
        </select>
      </div>
    </div>
  )
}

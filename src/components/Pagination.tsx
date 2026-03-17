import React from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { setPage, fetchImages } from '../store'

export default function Pagination() {
  const dispatch = useAppDispatch()
  const { page, totalPages } = useAppSelector(s => s.app)

  function goTo(p: number) {
    if (p < 1 || p > totalPages) return
    dispatch(setPage(p))
    setTimeout(() => dispatch(fetchImages()), 0)
  }

  const buttonCount = Math.max(totalPages, page)

  return (
    <div className="pagination">
      <button className="pg-btn" onClick={() => goTo(page - 1)} disabled={page <= 1}>
        ← Previous
      </button>

      {Array.from({ length: buttonCount }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          className={`pg-num${p === page ? ' active' : ''}`}
          onClick={() => goTo(p)}
          disabled={p > totalPages}
        >
          {p}
        </button>
      ))}

      <button className="pg-btn" onClick={() => goTo(page + 1)} disabled={page >= totalPages}>
        Next →
      </button>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchImages, toggleSelect, selectAll } from '../store'
import { Image } from '../types'
import AltTextCell from './AltTextCell'

function Thumbnail({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (error) return <div className="thumb-placeholder">No image</div>

  return (
    <>
      {!loaded && <div className="thumb-placeholder" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="thumb"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </>
  )
}

function MetricsCell({ img }: { img: Image }) {
  const confClass = img.confidence >= 85 ? '' : img.confidence >= 70 ? 'mid' : 'low'

  return (
    <div className="metrics">
      <div className="metric-row">
        <span>Complexity:</span>
        <span className={`complexity-badge ${img.complexity}`}>{img.complexity}</span>
      </div>
      <div className="metric-row">
        <span>Confidence: </span>
        <span className={`Confidence-badge ${img.complexity}`}>{img.confidence}%</span>
        {/* <div className="confidence-bar">
          <div className={`confidence-fill ${confClass}`} style={{ width: `${img.confidence}%` }} />
        </div> */}
      </div>
      <div className="metric-row">
        <span>Image Type: <strong className="image-type">{img.imageType}</strong></span>
      </div>
    </div>
  )
}

export default function ImageGrid() {
  const dispatch = useAppDispatch()
  const { images, loading, error, selectedIds } = useAppSelector(s => s.app)

  useEffect(() => {
    dispatch(fetchImages())
  }, [dispatch])

  const allSelected = images.length > 0 && images.every(img => selectedIds.includes(img.id))
  const someSelected = selectedIds.length > 0 && !allSelected
console.log(images,"images",selectedIds,allSelected)
  if (error) {
    return <div className="table-state" style={{ color: '#ef4444' }}>Error: {error}</div>
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allSelected}
                // ref={el => { if (el) el.indeterminate = someSelected }}
                onChange={e => dispatch(selectAll(e.target.checked))}
              />
            </th>
            <th>Images</th>
            <th>Metrics</th>
            <th>Short Alt-Text</th>
            <th>Long Alt-Text</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5}>
                <div className="table-state">
                  <div className="spinner" />
                  Loading images…
                </div>
              </td>
            </tr>
          ) : images.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <div className="table-state">No images match the selected filters.</div>
              </td>
            </tr>
          ) : (
            images.map(img => (
              <tr
                key={img.id}
                className={selectedIds.includes(img.id) ? 'selected' : ''}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(img.id)}
                    onChange={() => dispatch(toggleSelect(img.id))}
                  />
                </td>
                <td>
                  <Thumbnail src={img.thumbnailUrl} alt={img.shortAlt || img.id} />
                </td>
                <td>
                  <MetricsCell img={img} />
                </td>
                <td>
                  <AltTextCell
                    imageId={img.id}
                    field="short"
                    text={img.shortAlt}
                    generatedAt={img.shortAltGeneratedAt}
                  />
                </td>
                <td>
                  <AltTextCell
                    imageId={img.id}
                    field="long"
                    text={img.longAlt}
                    generatedAt={img.longAltGeneratedAt}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

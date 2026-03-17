import React from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import ImageGrid from './components/ImageGrid'
import Pagination from './components/Pagination'

export default function App() {
  return (
    <div className="app-wrapper">
      <div className="app-card">
        <Header />
        <FilterBar />
        <ImageGrid />
        <Pagination />
      </div>
    </div>
  )
}

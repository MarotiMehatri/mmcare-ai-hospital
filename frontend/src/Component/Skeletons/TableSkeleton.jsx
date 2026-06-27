import React from 'react'
import Skeleton from 'react-loading-skeleton'

function TableSkeleton ({rows = 5}) {
  return (
    <div>
      {Array(rows).fill(0).map((_, index) => (
        <div key={index} style={{marginBottom: "15px"}}>
          <Skeleton height={50} />
        </div>
      ))}
    </div>
  )
}

export default TableSkeleton
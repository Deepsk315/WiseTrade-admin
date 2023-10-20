

import React, {useEffect, useState} from 'react'


export default function Pagination(props) {
  const limit = props.limit || 10
  const [page, setPage] = useState(1)

  // const total = props.total || page * limit
  const total = props.total !== null ? props.total : props.users.length < limit ? props.users.length : (page * limit)
  const first = total < 1 ? 0 : ((page - 1) * limit) + 1
  const last = (page * limit) > total ? total : (page * limit)
  const lastPage = Math.floor((total - 1) / limit) + 1


  const onFirstPage = () => {
    const newPage = 1
    setPage(newPage)
    if (props.setSkip) props.setSkip((newPage - 1) * limit)
  }

  const onPreviousPage = () => {
    if (page <= 1) return

    const newPage = page - 1
    setPage(newPage)
    if (props.setSkip) props.setSkip((newPage - 1) * limit)
  }

  const onNextPage = () => {
    if (page >= lastPage) return

    const newPage = page + 1
    setPage(newPage)
    if (props.setSkip) props.setSkip((newPage - 1) * limit)
  }

  const onLastPage = () => {
    const newPage = lastPage
    setPage(newPage)
    if (props.setSkip) props.setSkip((newPage - 1) * limit)
  }


  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
    <div className="btn-group">
      <button
        className="btn btn-sm btn-primary"
        onClick={onFirstPage}
        disabled={page <= 1}
      >
        {/* First */}
        <i className="fa fa-angle-double-left" aria-hidden="true" />
      </button>
      <button
        className="btn btn-sm btn-primary"
        onClick={onPreviousPage}
        disabled={page <= 1}
      >
        {/* Previous */}
        <i className="fa fa-angle-left" aria-hidden="true" />
      </button>
    </div>
    <p className="mx-1 mb-0 px-2 badge badge-light">{first}-{last} of {total}</p>
    <div className="btn-group">
      <button
        className="btn btn-sm btn-primary"
        onClick={onNextPage}
        disabled={page >= lastPage}
      >
        {/* Next */}
        <i className="fa fa-angle-right" aria-hidden="true" />
      </button>
      <button
        className="btn btn-sm btn-primary"
        onClick={onLastPage}
        disabled={page >= lastPage}
      >
        {/* Last */}
        <i className="fa fa-angle-double-right" aria-hidden="true" />
      </button>
    </div>
  </div>
  
  )

}

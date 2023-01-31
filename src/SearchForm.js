import React from 'react'
import { useGlobalContext } from './context'
const SearchForm = () => {
  const {setQuery,error,query} =  useGlobalContext();
  return (
    <form className='search-form' onSubmit={(e)=>e.preventDefault()} >
    <h2>Search Movies</h2>
    <input type="text" className='form-input' value={query} onChange={e=>setQuery(e.target.value)} />
    {error.show && <div className='error'>{error.msg}</div>}


    </form>
  )
}

export default SearchForm

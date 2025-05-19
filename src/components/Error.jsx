import React from 'react'
import { useRouteError } from 'react-router-dom'
function Error() {
    const err=useRouteError();
    console.log(err);
  return (
    <div>
      <h1 className='text-4xl'>Oops.....</h1>
      <br/>
      <span className='text-2xl'>Something went wrong 😅</span>
      <h1>{err.data}</h1>
      <h2>{err.status} {err.statusText}</h2>

    </div>
  )
}

export default Error

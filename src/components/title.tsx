import React from 'react'
import{jersey} from '../lib/font'

const title = () => {
  return (
    <h1 className={`${jersey.className} text-3xl font-bold font-mono `} style={{  color: '#610C9F' }}>
      Task <span style={{  color: '#DA0C81'}}>Hunt </span>
    </h1>
  )
}

export default title
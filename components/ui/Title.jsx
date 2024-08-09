import React from 'react'

const Title = ({children, classAdd}) => {
  return (
    <div className={`${classAdd} font-rubik font-bold`} >{children}</div>
  )
}

export default Title
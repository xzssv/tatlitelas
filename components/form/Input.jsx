import React from 'react'

const Input = (props) => {
  
  const {type,placeholder,errorMessage,touched,...inputProps} = props
  return (
    <div className='w-full'>
        <label className='relative block cursor-text w-full  '>
            <input {...inputProps} type={type} required className={`w-full h-14 border outline-none px-4 peer rounded-2xl 
            ${type!=="datetime-local" && "pt-2"}
            ${touched && errorMessage ? "border-red-600" : "border-primary"} 
            `}/>
            {type !== "datetime-local" &&  
            (<span className='absolute top-0 left-0 px-4 text-sm items-center flex h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all'>{placeholder}</span>)
             }
        </label>
        {touched && <span className='text-xs text-danger '>{errorMessage}</span>}
    </div>
  )
}

export default Input
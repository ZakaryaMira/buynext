import React from 'react'

const FormComponentTemplate = ({title, description, inputs, button}) => {
  return (
    <section className='bg-white w-100 h-100 p-4'>
        <h1 className='text-2xl text-[#212121] mb-4'>{title}</h1>
        <p className="text-2xl text-[#212121] mb-4">{description}</p>
        <form action="">
            
        </form>
    </section>
  )
}

export default FormComponentTemplate
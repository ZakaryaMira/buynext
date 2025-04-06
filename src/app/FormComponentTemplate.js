"use client"

import { useState } from "react"
export default function FormComponentTemplate  ({title, description, fields, onSubmit, button})  {
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        onsubmit(formData);
    }
  return (
    <form onsubmit={handleSubmit} className='max-w-md mx-auto bg-white p-8 rounded-2xl shadow'>
        <h2 className='text-2xl font-bold text-center text-[#212121] mb-2'>{title}</h2>
        <p className="text-sm text-center text-[#F2F2F2] mb-6">{description}</p>
        {fields.map((field) => (
            <div key={field.name} className="mb-4">
                <label className="block mb-1 text-sm heading-extra-bold text-[#F2F2F2]">{label}</label>
                <input type={field.type} name={field.name} placeholder={field.placeholder} className="w-full border border-gray-300 p-2 rounded heading-extra-bold" onChange={handleChange}/>
            </div>
        ))}
        <button type="submit" className="w-full bg-[#FFC10] hover:bg-yellow-500 text-[#212121] py-2 rounded heading-extra-bold">{button}</button>
    </form>
  )
}


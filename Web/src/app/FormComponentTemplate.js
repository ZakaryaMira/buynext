"use client";

import { useState } from "react";

export default function FormComponentTemplate({
  title,
  description,
  fields,
  onSubmit,
  button,
}) {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (err) {
      setError("Une erreur s'est produite lors de la soumission.");
      console.error("Form submission error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow mt-40 mb-40"
    >
      <h2 className="text-4xl font-bold heading-black text-center text-[#212121] mb-8">
        {title}
      </h2>
      <p className="text-base text-center heading-extra-bold text-[#212121] mb-6">{description}</p>

      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block mb-1 text-sm font-semibold text-[#212121]">
            {field.label} 
          </label>
          <input
            id={field.name} // added this after testing.
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full border border-gray-300 p-2 rounded font-semibold"
            onChange={handleChange}
          />
        </div>
      ))}

      {error && (
        <p className="text-red-600 text-sm text-center mb-4">{error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-[#FFC107] hover:bg-yellow-500 text-[#212121] py-2 rounded font-bold transition duration-300"
      >
        {button}
      </button>
    </form>
  );
}

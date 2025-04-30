import React from 'react';

const ProductSelectInput = ({ label, name, value, onChange, options = [], required = false }) => {
  return (
    <div>
      <label className="text-xl text-[#212121] heading-extra-bold mb-1 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 rounded-lg p-3 heading-extra-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Sélectionnez une option --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSelectInput;

import React from "react";

export default function ProductInpiutFiled({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="text-xl text-[#212121] heading-extra-bold mb-1 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="w-full border border-gray-300 rounded-lg p-3 heading-extra-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
      />
    </div>
  );
}

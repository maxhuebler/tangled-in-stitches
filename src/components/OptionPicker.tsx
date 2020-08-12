import React from 'react'

export const OptionPicker = ({ name, options, onChange, selected }) => {
  return (
    <div className="">
      <label className="block tracking-wide text-gray-700">{name}</label>
      <select
        className="block w-64 px-4 py-4 uppercase border-2 border-black rounded-lg"
        onChange={onChange}
        value={selected}
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

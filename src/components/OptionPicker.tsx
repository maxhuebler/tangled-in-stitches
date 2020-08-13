import React from 'react'

interface OptionProperties {
  name: string
  options: string[]
  onChange: React.ChangeEventHandler
  selected: string
}

const OptionPicker = ({
  name,
  options,
  onChange,
  selected,
}: OptionProperties): JSX.Element => {
  return (
    <div>
      <label htmlFor={name} className="block tracking-wide text-gray-700">
        {name}
      </label>
      <select
        className="block w-64 px-4 py-4 uppercase border-2 border-black rounded-lg"
        id={name}
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

export default OptionPicker

import React from "react";

interface Option<T> {
  [key: string]: any;
}

interface MultiSelectProps<T> {
  options?: T[];
  selected?: T[];
  onChange: (values: T[]) => void;
  labelField: keyof T;
  valueField: keyof T;
}

export default function MultiSelect<T>({
  options = [],
  selected = [],
  onChange,
  labelField,
  valueField,
}: MultiSelectProps<T>) {
  const toggleOption = (option: T) => {
    const isSelected = selected.some(
      (item) => item[valueField] === option[valueField]
    );
    if (isSelected) {
      onChange(selected.filter((item) => item[valueField] !== option[valueField]));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="border rounded p-2 max-h-60 overflow-auto">
      {options.map((option) => {
        const isSelected = selected.some(
          (item) => item[valueField] === option[valueField]
        );
        return (
          <label
            key={option[valueField] as React.Key}
            className={`flex items-center gap-2 cursor-pointer p-1 rounded ${
              isSelected ? "bg-blue-100" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleOption(option)}
              className="cursor-pointer"
            />
            <span>{option[labelField]}</span>
          </label>
        );
      })}
    </div>
  );
}

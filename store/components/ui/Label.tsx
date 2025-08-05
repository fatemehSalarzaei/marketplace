import React from 'react'

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export function Label(props: LabelProps) {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-gray-700 rtl:text-right ${props.className ?? ''}`}
    />
  )
}

import React, { useState, useEffect } from 'react'
import { RelatedObject } from '@/types/admin/pageBuilder/pageBuilder'
import { searchRelatedObjects } from '@/services/admin/pageBuilder/pageBuilderService'

interface Props {
  elementType: string
  value?: number
  onChange: (id: number | undefined) => void
}

export default function ObjectSelector({ elementType, value, onChange }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<RelatedObject[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    searchRelatedObjects(elementType, query)
      .then(setResults)
      .finally(() => setLoading(false))
  }, [query, elementType])

  const selected = results.find(r => r.id === value)

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder={`Search ${elementType}...`}
        value={selected ? selected.name : query}
        onChange={e => {
          setQuery(e.target.value)
          onChange(undefined)
        }}
        style={{ width: '100%', padding: '6px' }}
      />
      {loading && <div>Loading...</div>}
      {results.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            background: 'white',
            border: '1px solid #ccc',
            marginTop: 0,
            paddingLeft: 0,
            width: '100%',
            maxHeight: 150,
            overflowY: 'auto',
            zIndex: 10,
            listStyle: 'none',
          }}
        >
          {results.map(item => (
            <li
              key={item.id}
              style={{ cursor: 'pointer', padding: '4px' }}
              onClick={() => {
                onChange(item.id)
                setQuery(item.name)
                setResults([])
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

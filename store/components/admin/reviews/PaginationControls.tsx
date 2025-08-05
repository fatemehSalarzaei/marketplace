interface Props {
  next: string | null
  previous: string | null
  onPageChange: (url: string) => void
}

export default function PaginationControls({ next, previous, onPageChange }: Props) {
  return (
    <div className="flex justify-between items-center pt-4 border-t">
      <button
        disabled={!previous}
        onClick={() => previous && onPageChange(previous)}
        className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
      >
        قبلی
      </button>
      <button
        disabled={!next}
        onClick={() => next && onPageChange(next)}
        className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
      >
        بعدی
      </button>
    </div>
  )
}

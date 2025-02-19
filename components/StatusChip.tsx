const statusColors = {
  draft: 'bg-yellow-100 text-yellow-800',
  live: 'bg-green-100 text-green-800',
  started: 'bg-blue-100 text-blue-800',
  ended: 'bg-gray-200 text-gray-600',
  canceled: 'bg-red-100 text-red-800',
}

export default function StatusChip({ label }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        statusColors[label] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {label}
    </span>
  )
}

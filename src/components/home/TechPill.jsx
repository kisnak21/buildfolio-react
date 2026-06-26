const TechPill = ({ name, count }) => {
  return (
    <span className='bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 text-sm px-4 py-2 rounded-full cursor-pointer transition-colors'>
      {name} <span className='text-gray-400 ml-1'>{count}</span>
    </span>
  )
}

export default TechPill
import React from 'react'

function Card({title, value}) {
  return (
    <div className="h-auto p-4 rounded-lg w-[300px] flex flex-col gap-2 border shadow-md card">
      <p className="text-[14px] font-medium text-slate-600">
        {title} <span><i class="ri-question-line"></i></span>
      </p>
      <h1 className="text-xl font-bold text-slate-700">
        {value}
      </h1>
    </div>
  )
}

export default Card;
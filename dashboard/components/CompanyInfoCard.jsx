function CompanyInfoCard({data}) {
  
  return (
    <div className="h-full p-4 rounded-lg w-[270px] flex flex-col gap-3 border shadow-md card">
      <h1 className="font-bold text-slate-600 text-[18px]">
        Company Info
      </h1>
      <hr />
      <div className="infos flex flex-col gap-1">
       <ul className="flex flex-col gap-1">
         <li className='flex gap-1'>
            <span className='text-color'>
                Company:
            </span>
            <p>{data?.legalName}</p>
         </li>
         <li className='flex gap-1'>
            <span className='text-color'>
                Year Founded:
            </span>
            <p>
            {data?.yearFounded}
            </p>
         </li>
         <li className='flex gap-1'>
            <span className='text-color'>
                Employees:
            </span>
            <p>
            {data?.numberOfEmployees}
            </p>
         </li>
         <li className='flex gap-1'>
            <span className='text-color'>
                HQ:
            </span>
            <p>
            {data?.headquarters}
            </p>
         </li>
       </ul>
      </div>
    </div>
  )
};
export default CompanyInfoCard;
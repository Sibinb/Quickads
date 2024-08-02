import Image from "next/image";
import { useState, useMemo, useEffect } from "react";

const Table = ({ list }) => {
  const [itemsList,setItemList] = useState([]);
  const [rowsLimit] = useState(5);
  const [rowsToShow, setRowsToShow] = useState([]);
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage] = useState(Math.ceil(itemsList?.length / rowsLimit));
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState('');

  async function fetchVideoAdsInfo() {
    const response = await fetch("/data2.json");
    if (response.status === 200) {
      const videoadsInfo = await response.json();
      setData(videoadsInfo);
      setItemList(videoadsInfo?.data?.results);
    }
  }

  const convertNumberToUSD = (value) => {
    if (value) {
      return Number(value).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }

    return 0;
  };

  useEffect(() => {
    fetchVideoAdsInfo();
  },[]);


  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = itemsList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };

  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = itemsList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };

  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = itemsList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  useMemo(() => {
    if(itemsList?.length > 0){ 
        setCustomPagination(
          Array(Math.ceil(itemsList?.length / rowsLimit)).fill(null)
        );
    }
  },[]);

  useEffect(() => {
    if(itemsList?.length > 0){
      setRowsToShow(itemsList.slice(0, rowsLimit));
    }
    }, [itemsList])

  return (
    <div className="w-full h-full bg-white flex  items-center justify-center pt-3 pb-5">
      <div className="w-full px-2">
        <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border ">
            <thead className="rounded-lg text-base text-white font-semibold w-full bg-white">
              <tr className="">
                <th className="py-3 px-3 text-slate-400 sm:text-base font-medium whitespace-nowrap">
                  Thumbnail
                </th>
                <th className="py-3 px-3 text-slate-400 sm:text-base font-medium whitespace-nowrap">
                  Title
                </th>
                <th className="py-3 px-3  justify-center gap-1 text-slate-400 sm:text-base font-medium whitespace-nowrap">
                  Brand
                </th>
                <th className="py-3 px-3 text-slate-400 sm:text-base font-medium whitespace-nowrap">
                  Total ad spend
                </th>
                <th className="py-3 px-3 text-slate-400 sm:text-base font-medium whitespace-nowrap">
                  Ad spend 30
                </th>
                <th className="flex items-center py-3 px-3 text-slate-400 sm:text-base font-medium whitespace-nowrap gap-1">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {rowsToShow?.map((data, index) => (
                <tr
                  className={`bg-white`}
                  key={index}
                >
                  <td
                    className={`py-2 px-3 font-normal text-base ${
                      index == 0
                        ? "border-t-2"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}>
                    <Image alt={"thumbnail"}
                    src={data?.thumbnail}
                    className="rounded-full m-auto"
                    width={30}
                    height={30}
                    />
                  </td>
                  <td
                    className={`py-2 px-3 font-normal text-base ${
                      index == 0
                        ? "border-t-2 text-black"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    }`} >
                    {data?.title}
                  </td>
                  <td
                    className={`py-2 px-3 font-normal text-base ${
                      index == 0
                        ? "border-t-2"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    }`}>
                    {data?.brandName}
                  </td>
                  <td
                    className={`py-2 px-3 text-base  font-normal ${
                      index == 0
                        ? "border-t-2"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } `}>
                    <p className="text-center">{data?.totalSpend === null ? 0 : convertNumberToUSD(Number(data?.totalSpend)) }</p>
                  </td>
                  <td
                    className={`py-2 px-3 text-base  font-normal ${
                      index == 0
                        ? "border-t-2"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } min-w-[250px]`}>
                    <p className="text-center">{data?.last30Days === null ? 0 : convertNumberToUSD(Number(data?.last30Days)) }</p>
                  </td>
                  <td
                    className={`py-5 px-4 text-base  font-normal ${
                      index == 0
                        ? "border-t-2"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    }`}>
                    {data?.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">

          {/* <div className="flex">
            <ul
              class="flex justify-center items-center gap-x-[10px] z-30"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                class={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
                  currentPage == 0
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                }
  `}
                onClick={previousPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
              </li>
              {customPagination?.map((data, index) => (
                <li
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
                    currentPage == index
                      ? "text-blue-600  border-sky-500"
                      : "border-[#E4E4EB] "
                  }`}
                  onClick={() => changePage(index)}
                  key={index}
                >
                  {index + 1}
                </li>
              ))}
              <li
                class={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage == totalPage - 1
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                }`}
                onClick={nextPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Table;

import { getCountryData } from "@/helper";
import Image from "next/image";

function CampainsListCard({ data }) {
  return (
    <div className="h-full p-4 rounded-lg w-[270px] flex flex-col gap-3 border shadow-md card">
      <h1 className="font-bold text-slate-600 text-[18px]">
        Compains Per Country
      </h1>
      <hr />
      <div className="infos flex flex-col gap-1">
        <ul className="flex flex-col gap-[1px]">
          {data?.map((item) => {
            const info = getCountryData(String(item?.countryId));

            if(info !== null ){
                return (
                    <li className="flex gap-2">
                      <Image
                        alt={"flag"}
                        width={20}
                        height={15}
                        src={info.flag}
                      />
                      <p className="font-medium text-stone-500 text-[15px]">
                        {info.code}: {item?.count} ({Math.floor(item?.percentage)}%)
                      </p>
                    </li>
                  );
            }else{
                return (
                    <li className="flex gap-2">
                      <Image
                        alt={"flag"}
                        width={20}
                        height={15}
                        src={'/image.svg'}
                      />
                      <p className="font-medium text-stone-500 text-[15px]">
                       - : {item?.count} ({Math.floor(item?.percentage)}%)
                      </p>
                    </li>
                  );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
export default CampainsListCard;

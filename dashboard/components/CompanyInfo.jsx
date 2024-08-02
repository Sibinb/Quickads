import { useState, useEffect } from "react";
import Button from "./Button";
import CompanyInfoCard from "./CompanyInfoCard";
import Card from "./Card";
import CampainsListCard from "./CampainCard";

function CompanyInfo() {
  const [state, setState] = useState(null);

  async function fetchCompanyInfo() {
    const response = await fetch("/data1.json");
    if (response.status === 200) {
      const companyInfo = await response.json();
      setState(companyInfo);
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
    fetchCompanyInfo();
  }, []);

  return (
    <>
      <section className="py-6 w-full bg-slate-100 flex-center flex-col gap-2">
        <div className="flex-center gap-4">
          <h1 className="text-4xl font-bold">{state?.data?.company?.legalName}</h1>
          <div className="flex gap-2">
            <Button icon={<i class="ri-star-line"></i>} text={"Swipe"} />
            <Button
              icon={<i class="ri-share-line"></i>}
              text={"Share"}
              backgroundColor={true}
            />
          </div>
        </div>
        <p className="text-center text-base">{state?.data?.company?.headquarters}</p>
      </section>
      <section className="">
        <div className="wrapper flex gap-4 justify-between card-container">
          <div>
            <CompanyInfoCard data={state?.data?.company} />
          </div>
          <div className="flex flex-col gap-4">
            <Card
              title={"Ad spend 365"}
              value={convertNumberToUSD(
                state?.data?.company?.spend?.last365Days
              )}
            />
            <Card
              title={"Global Rank"}
              value={"#" + state?.data?.ranks?.global?.rank}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Card
              title={"Country Rank"}
              value={"#" + state?.data?.ranks?.country?.rank}
            />
            <Card
              title={"Category Rank"}
              value={"#" + state?.data?.ranks?.category?.rank}
            />
          </div>
          <div>
            <CampainsListCard data={state?.data?.top5Countries}/>
          </div>
        </div>
      </section>
    </>
  );
}

export default CompanyInfo;

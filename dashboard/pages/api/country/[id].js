// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { countryList } from "@/constant";

export default function handler(req, res) {
    const { id } = req.query;
    const country = countryList.filter((item)=> item.id === id);
    if(country.length > 0){
       res.status(200).json({ flag: country[0].flag, code : country[0].code.toUpperCase() });
    }else{
       res.status(200).json({ flag: null });
    }
}
  
const { countryList } = require("./constant");

export const getCountryData = (id) => {
   const country = countryList.filter((item)=> item.id === id);
   return country.length > 0 ? { flag : country[0].flag, code: country[0].code.toUpperCase()} : null
};
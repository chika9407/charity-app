const fs = require("fs");
const path = require("path");
const parseString = require("xml2js").parseString;

//for testing, short example doc

var xml = fs.readFileSync(
  path.join(__dirname, "../seeders/projectExample.xml"),
  "UTF-8"
);
parseString(xml, function (err, result) {
  return (res = result.project);
});
console.log(res);
let projects = res.map((e) => {
  try {
    theme = String(e.themes[0].theme[0].id[0]);
  } catch {
    theme = "none:";
  }
  let projObj = {
    id: e.id[0],
    name: e.title[0],
    summary: e.summary[0],
    url: e.contactUrl[0],
    imageUrl: e.image[0],
    CountryId: e.countries[0].country[0].iso3166CountryCode[0],
    ThemeId: theme,
    OrganizationId: e.organization[0].id[0],
  };
  return projObj;
});

console.log(Object.keys(res.image[0]));

// let themeObj = {
//   id: res.themes[0].theme[0].id[0],
//   name: res.themes[0].theme[0].name[0],
// };
// console.log("themes: ", themeObj);

// let orgObj = {
//   id: res.organization[0].id[0],
//   name: res.organization[0].name[0],
// };
// console.log("orgs: ", orgObj);

// let countriesObj = {
//   ISO: res.countries[0].country[0].iso3166CountryCode[0],
//   name: res.countries[0].country[0].name[0],
// };
// console.log("countries:", countriesObj);

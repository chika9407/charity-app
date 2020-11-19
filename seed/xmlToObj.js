const fs = require("fs");
const path = require("path");
const parseString = require("xml2js").parseString;
var models = require("../models");

// parse doc into object res
var xml = fs.readFileSync(
  path.join(__dirname, "./active_projects.xml"), ////full doc
  // path.join(__dirname, "./projectExample.xml"), //short sample doc
  "UTF-8"
);

parseString(xml, function (err, result) {
  return (res = result.projects.project);
});

console.log("file read");

//make sure optional fields don't throw errors
function checkField(field, ifNone = "none") {
  let str = "";
  try {
    str = String(field[0]) + " ";
  } catch {
    str = ifNone;
  }
  return str;
}

//write files for each object
function makeFile(dataName, data) {
  fs.writeFileSync(
    path.join(__dirname, `./${dataName}Obj.js`),
    `function returnAll() {
      const ${dataName} =${JSON.stringify(data)};
      return ${dataName};
    }
    exports.returnAll = returnAll;`
  );
  console.log(`${dataName} file written`);
}

//create project object
let projects = res.map((e) => {
  let themeStr = "";
  //not all projects have a theme
  try {
    themeStr = String(e.themes[0].theme[0].id[0]);
  } catch {
    themeStr = "none";
  }
  let projObj = {
    id: e.id[0],
    name: e.title[0],
    summary: e.summary[0],
    url: checkField(e.contactUrl),
    imageUrl: e.image[0].imagelink[2].url[0],
    CountryId: e.countries[0].country[0].iso3166CountryCode[0],
    ThemeId: themeStr,
    OrganizationId: e.organization[0].name[0],
    address:
      e.contactAddress[0] +
      " " +
      checkField(e.contactAddress2, "") +
      e.contactCity[0] +
      " " +
      e.contactCountry[0] +
      " " +
      checkField(e.contactPostal, "") +
      checkField(e.contactState, ""),
    latlon: checkField(e.latitude) + checkField(e.longitude),
    funding: checkField(e.funding),
    goal: checkField(e.goal),
  };
  return projObj;
});

console.log("project object created");

//create array of unique countries
let countriesSet = Array.from(
  new Set(
    res.map((e) => {
      return (
        String(e.countries[0].country[0].iso3166CountryCode[0]) +
        ":" +
        String(e.countries[0].country[0].name[0])
      );
    })
  )
);
//put in object
const countries = [];
for (let i = 0; i < countriesSet.length; i++) {
  let idAndName = countriesSet[i].split(":");
  let countryObj = {
    id: idAndName[0],
    name: idAndName[1],
  };
  countries.push(countryObj);
}
console.log("country object created");

// create array of unique themes
let noThemeCount = 0;
let themeSet = Array.from(
  new Set(
    res.map((e) => {
      let themeStr = "";
      //not all projects have a theme
      try {
        themeStr =
          String(e.themes[0].theme[0].id[0]) +
          ":" +
          String(e.themes[0].theme[0].name[0]);
      } catch {
        noThemeCount++;
        themeStr = "none: noTheme";
      }
      return themeStr;
    })
  )
);
//put in object
const themes = [];
for (let i = 0; i < themeSet.length; i++) {
  let idAndName = themeSet[i].split(":");
  let themeObj = {
    id: idAndName[0],
    name: idAndName[1],
  };
  themes.push(themeObj);
}
console.log("theme object created");

makeFile("themes", themes);
makeFile("countries", countries);
makeFile("projects", projects);

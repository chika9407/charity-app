const fs = require("fs");
const path = require("path");
const parseString = require("xml2js").parseString;
var models = require("../models");

// parse full doc into object res
var xml = fs.readFileSync(
  path.join(__dirname, "./active_projects.xml"),
  // path.join(__dirname, "./projectExample.xml"),
  "UTF-8"
);

parseString(xml, function (err, result) {
  return (res = result.projects.project);
});

let projects = res.map((e) => {
  try {
    theme = String(e.themes[0].theme[0].id[0]);
  } catch {
    theme = "none";
  }
  try {
    urlStr = String(e.contactUrl[0]);
  } catch {
    urlStr = "none";
  }
  let projObj = {
    id: e.id[0],
    name: e.title[0],
    summary: e.summary[0],
    url: urlStr,
    imageUrl: e.image[0].imagelink[2].url[0],
    CountryId: e.countries[0].country[0].iso3166CountryCode[0],
    ThemeId: theme,
    OrganizationId: e.organization[0].id[0],
  };
  return projObj;
});

console.log(JSON.stringify(projects));

fs.writeFileSync(
  path.join(__dirname, "./projectsObj.js"),
  JSON.stringify(projects)
);

//create array of unique orgs
let orgsSet = Array.from(
  new Set(
    res.map((e) => {
      return (
        String(e.organization[0].id[0]) +
        ":" +
        String(e.organization[0].name[0])
      );
    })
  )
);
//put in object
const organizations = [];
for (let i = 0; i < orgsSet.length; i++) {
  let idAndName = orgsSet[i].split(":");
  let orgObj = {
    id: idAndName[0],
    name: idAndName[1],
  };
  organizations.push(orgObj);
}
fs.writeFileSync(
  path.join(__dirname, "./orgsObj.js"),
  JSON.stringify(organizations)
);

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
fs.writeFileSync(
  path.join(__dirname, "./countryObj.js"),
  JSON.stringify(countries)
);

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
console.log(JSON.stringify(themes));
fs.writeFileSync(
  path.join(__dirname, "./themesObj.js"),
  JSON.stringify(themes)
);

// and load arrays of objects into the db
// models.Themes.bulkCreate(themes)
// models.Countries.bulkCreate(countries);
// models.Organizations.bulkCreate(orgs);
// models.Projects.bulkCreate(cprojects);

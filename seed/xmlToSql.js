const fs = require("fs");
const path = require("path");
const parseString = require("xml2js").parseString;

// var xml = fs.readFileSync(path.join(__dirname, "./active_projects.xml"), "UTF-8");
var xml = fs.readFileSync(
  path.join(__dirname, "./active_projects.xml"),
  "UTF-8"
);

parseString(xml, function (err, result) {
  return (res = result.projects.project);
});

let projData = res.map((e) => {
  let projObj = {
    id: parseInt(e.id),
    title: String(e.title),
    theme: String(e.themeName),
    orgId: parseInt(e.organization[0].id),
    region: String(e.region),
  };
  return projObj;
});

console.log(projData[0]);

// fs.writeFileSync(path.join(__dirname, "./projects.sql"), res);

// for each project we need:
// 	-project id
// 	-project name
// 	-theme id
// 		-theme name
// 	-organization id
// 		-org name
// 		-org country id
// 			-country name
// 			-region name
// 				-region id
// 	-region id

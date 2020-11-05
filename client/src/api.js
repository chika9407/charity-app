//import XMLParser from "react-xml-parser";
//import { response } from "express";

export default {
  //fetch all Projects from the API

  async getProjects() {
    // call Global Giving API

    const APIkey = "90faea83-2c92-44b7-b864-020af87ad518";

    const APIcall = `https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=${APIkey}&nextProjectId=354`;

    try {
      const response = await fetch(APIcall, {
        headers: {
          Accept: "application/json",
        },
      });
      //console.log(response);
      if (!response.ok) {
        console.log("hello");
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
      /*await ((data) => {
        var xml = new XMLParser().parseFromString(data);
        console.log(xml);
      });*/
    } catch (err) {
      console.log(err);
    }
  },
};

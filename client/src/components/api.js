//import XMLParser from "react-xml-parser";
//import { response } from "express";

export default {
  async getProjects() {
    //fetch all Projects from the API
    // call Global Giving API

    const APIkey = "90faea83-2c92-44b7-b864-020af87ad518";

    const APIcall = `https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=${APIkey}&nextProjectId=354`;

    try {
      const response = await fetch(APIcall, {
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
      return data
    } catch (err) {
      console.log(err);
    }
  },

  async getAllRegions() {
    const APIkey = "90faea83-2c92-44b7-b864-020af87ad518";
    const APIcall = `https://api.globalgiving.org/api/public/projectservice/regions/?api_key=${APIkey}`;
    try {
      const response = await fetch(APIcall, {
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      // console.log("data",data)
      return data
    } catch (err) {
      console.log(err);
    }
  },

  async getProjectsByCountry(country) {
    const APIkey = "90faea83-2c92-44b7-b864-020af87ad518";
    const APIcall = `https://api.globalgiving.org/api/public/projectservice/countries/${country}/projects?api_key=${APIkey}`;
    try {
      const response = await fetch(APIcall, {
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      // console.log(data);
      return data
    } catch (err) {
      console.log(err);
    }
  },

  async getAllThemesByName() {
    const APIkey = "90faea83-2c92-44b7-b864-020af87ad518";
    const APIcall = `https://api.globalgiving.org/api/public/projectservice/themes?api_key=${APIkey}`;
    try {
      const response = await fetch(APIcall, {
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      // console.log("data.themes.theme",data.themes.theme)
      return data
    } catch (err) {
      console.log(err);
    }
  },

  async getProjectsByTheme(themeId) {
    const APIkey = "90faea83-2c92-44b7-b864-020af87ad518";
    const APIcall = `https://api.globalgiving.org/api/public/projectservice/themes/${themeId}/projects/active?api_key=${APIkey}`;
    try {
      const response = await fetch(APIcall, {
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      // console.log(data);
      return data
    } catch (err) {
      console.log(err);
    }
  },
};

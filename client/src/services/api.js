//import axios from "axios";
export default {
  async getProjects() {
    //fetch all Projects from the API
    //latest git update attempt

    const APIkey = "90faea83-2c92-44b7-b864-020af87ad518";

    const APIcall = `https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=${APIkey}&nextProjectId=354`;

    try {
      const response = await fetch(`/projects`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  /*async getAllRegions() {
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
      return data;
    } catch (err) {
      console.log(err);
    }
  },*/

  /*async getProjectsByCountry(country) {
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
      return data;
    } catch (err) {
      console.log(err);
    }
  },*/

  async getAllThemesByName() {
    const APIkey = "90faea83-2c92-44b7-b864-020af87ad518";
    const APIcall = `https://api.globalgiving.org/api/public/projectservice/themes?api_key=${APIkey}`;
    try {
      const response = await fetch(`/themes`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      // console.log("data.themes.theme",data.themes.theme)
      console.log(data);
      return data;
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
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  async getFilteredProjects(key = "", countryISO = "", themeId = "") {
    const APIkey = "90faea83-2c92-44b7-b864-020af87ad518";
    let keyword = "*";

    if (!!key) {
      keyword = key;
    }

    let countryAndTheme = "";
    if (!!countryISO && !!themeId) {
      countryAndTheme =
        "&filter=" + "country:" + countryISO + "," + "theme:" + themeId;
    } else if (!!countryISO || !!themeId) {
      countryAndTheme =
        "&filter=" +
        (!!countryISO ? "country:" + countryISO : "theme:" + themeId);
    } else {
      countryAndTheme = "";
    }

    const APIcall = `https://api.globalgiving.org/api/public/services/search/projects?api_key=${APIkey}&q=${keyword}${countryAndTheme}`;

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
      return data;
    } catch (err) {
      console.log(err.message);
    }
  },

  async getFeaturedProjects() {
    const APIkey = "90faea83-2c92-44b7-b864-020af87ad518";

    const APIcall = `https://api.globalgiving.org/api/public/projectservice/featured/projects?api_key=${APIkey}`;

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
      return data;
    } catch (err) {
      console.log(err.message);
    }
  },

  async addToFavorites(ProjectId) {
    //grab UserID from token

    try {
      const response = await fetch(`/favorites`, {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ProjectId }),
      });
      if (!response.ok) {
        throw new Error();
      }
      console.log(response);
      const data = await response.json();
      console.log(data);
      //const results = data.ProjectId;
      //console.log(results);
      return data;
    } catch (err) {
      console.log(err.message);
    }
  },

  async getUserFavorites() {
    //grab UserID from token

    try {
      const response = await fetch(`/favorites/projects`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      //console.log(response.data);
      const data = await response.json();
      console.log(data);
      const results = data.Projects;
      console.log(results);
      return results;
    } catch (err) {
      console.log(err.message);
    }
  },

  async getUserName() {
    try {
      const response = await fetch(`/favorites/projects`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      //console.log(response.data);
      const data = await response.json();
      console.log(data);
      const results = data.username;
      console.log(results);
      return results;
    } catch (err) {
      console.log(err.message);
    }
  },
};

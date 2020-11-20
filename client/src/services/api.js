export default {
  async getProjects() {
    //const APIcall = `https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=${APIkey}&nextProjectId=354`;

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

  async getAllThemesByName() {
    try {
      const response = await fetch(`/filters/themes`, {
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

  async getAllCountries() {
    try {
      const response = await fetch(`/filters/countries`, {
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

  // async getFilteredProjects(key = "", countryISO = "", themeId = "") {
  //   let keyword = "*";

  //   if (!!key) {
  //     keyword = key;
  //   }

  //   let countryAndTheme = "";
  //   if (!!countryISO && !!themeId) {
  //     countryAndTheme =
  //       "&filter=" + "country:" + countryISO + "," + "theme:" + themeId;
  //   } else if (!!countryISO || !!themeId) {
  //     countryAndTheme =
  //       "&filter=" +
  //       (!!countryISO ? "country:" + countryISO : "theme:" + themeId);
  //   } else {
  //     countryAndTheme = "";
  //   }

  //   const APIcall = `https://api.globalgiving.org/api/public/services/search/projects?api_key=${APIkey}&q=${keyword}${countryAndTheme}`;

  //   try {
  //     const response = await fetch(APIcall, {
  //       headers: {
  //         Accept: "application/json",
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error();
  //     }
  //     const data = await response.json();
  //     // console.log(data);
  //     return data;
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // },

  async getFilteredProjects(keyword = 0, countryId = 0, themeId = 0) {
    try {
      const response = await fetch(
        `/filters/search/${themeId}/${countryId}/${keyword}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log("filtered project search", data);
      return data;
    } catch (err) {
      console.log(err.message);
    }
  },

  async getNearby(lat, lon) {
    console.log("reached api get nearby");

    try {
      const response = await fetch(`filters/location/${lat}/${lon}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log("location search", data);
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
      //const results = data.ProjectId;
      //console.log(results);
      return data;
    } catch (err) {
      console.log(err.message);
    }
  },

  async deleteFromFavorites(ProjectId) {
    //grab UserID from token

    try {
      const response = await fetch(`/favorites`, {
        method: "DELETE",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ProjectId }),
      });
      if (response.ok) return;
      else throw new Error();
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

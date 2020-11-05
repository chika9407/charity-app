import XMLParser from "react-xml-parser";
//import { response } from "express";

export default {
  //fetch all Projects from the API

  async getProjects() {
    //e.preventDefault();
    // call Global Giving API
    // const { location, loading, weather } = this.state;

    const APIkey = "90faea83-2c92-44b7-b864-020af87ad518";
    //const APIcall = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}&units=metric`;

    const APIcall = `https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=${APIkey}&nextProjectId=354`;
    //this.setState({ loading: true });
    //const { loading, weather } = this.state;

    /*try {
      const results = await fetch(APIcall).then((data) => {
        var xml = new XMLParser().parseFromString(data);
        console.log(xml);
      });
      if (!response.ok) {
        response.json().then((json) => {
          throw new Error(json);
        });
      }
    } catch (err) {
      console.log(err.message);
    }*/

    try {
      const response = await fetch(APIcall, {
        headers: {
          Accept: "application/json",
        },
      });
      console.log(response);
      if (!response.ok) {
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

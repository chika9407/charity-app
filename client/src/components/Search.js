import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "./api";
import CountryDict from "./CountryDict.js";

//make calls to the api to get regions, (later counrties) themes, for now ids (later name)
//so get all regions and put in state, api.getAllRegions(); use to populate regional selector
//get all themes api.getAllThemesByName(); and use to populate theme selector 

//then worry about the theme selection calling the api again for the region or theme selected

  //api.getProjects();
  //api.getProjectsByCountry(country_input);
  //api.getAllThemesByName();
  //api.getProjectsByTheme(themeId);
  //api.getAllRegions();

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: [],
      themes: [],
      countries:[],
      country_input: "",
      theme_input: "",
    };
  }
  
  async componentDidMount() {
    //grabs themes and regions from api to populate select options
    let themesData = await api.getAllThemesByName();
    this.setState({
      themes: themesData.themes.theme
    });
    let regionsData = await api.getAllRegions();
    this.setState({
      regions: regionsData.regions.region
    });
    let countriesData = CountryDict.countriesAndISO()
    this.setState({
      countries: countriesData
    });

  }

  async test() {
  let keywords = "pakistan+flood"
  let country = "PK"
  let theme = "ecdev"
  let searchResults= await api.getFilteredProjects(keywords, country, theme)
  console.log("results", searchResults)
  }

  render() {
    console.log(this.state.countries)

    this.test()

    let themes = this.state.themes
    let regions = this.state.regions

    let themeOptions = !!themes? themes.map(e=>
      <option value={e.name}> {e.name}</option>): "no themes in state"
    let regionOptions = !!regions? regions.map(e=>
      <option value={e.name}> {e.name}</option>): "no regions in state"

    return (
      <div className="container-xl">
        <div className="mt-4 text-white">Search page</div>
        <form>
          <div class="row mt-3">
            <div class="col-sm">
              <div className="text-white">
                <h5> Goal </h5>
              </div>

              <div className="select-outline ">
                <select
                  className=" form-group form-control mdb-select  md-outline colorful-select dropdown-primary shadow"
                  name="fitLevel"
                  //value={this.state.fitLevel}
                  // onChange={(e) => this.handleInput(e)}
                >
                  <option disabled selected>
                    theme
                  </option>
                  {themeOptions}
                </select>
              </div>
            </div>
            <div class="col-sm">
              <div className="text-white">
                <h5> Regions</h5>
              </div>

              <div className="select-outline ">
                <select
                  className=" form-group form-control mdb-select  md-outline colorful-select dropdown-primary shadow"
                  name="fitLevel"
                  //value={this.state.fitLevel}
                  // onChange={(e) => this.handleInput(e)}
                >
                  <option disabled selected>
                    select a region
                  </option>
                  {regionOptions}
                </select>
              </div>
            </div>
            <div class="col-sm">
              <div className="text-white">
                <h5> Project </h5>
              </div>

              <div className="select-outline ">
                <select
                  className=" form-group form-control mdb-select  md-outline colorful-select dropdown-primary shadow"
                  name="fitLevel"
                  //value={this.state.fitLevel}
                  // onChange={(e) => this.handleInput(e)}
                >
                  <option disabled selected>
                    enter a project 
                  </option>
                  <option value="selection1"> selection 1</option>
                  <option value="selection2">selection 2</option>
                  <option value="selection3">selection 3</option>
                </select>
              </div>
            </div>
            <div class="col-2 text-center">
              <div className="text-white">
                <h5>Find</h5>
              </div>
              <button
                className="btn btn-warning shadow"
                //onClick={(e) => this.search(e)}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Search);

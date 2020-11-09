import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "./api";
import CountryDict from "./CountryDict.js";
//lated git push attempt 

//need to get selected country, theme, keywords sent to api

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
      keyword_input:"",
      projects: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    //grabs themes from api and countries with ISO codes from dict to populate select options
    let themesData = await api.getAllThemesByName();
    this.setState({
      themes: themesData.themes.theme,
    });
    let regionsData = await api.getAllRegions();
    this.setState({
      regions: regionsData.regions.region,
    });
    let countriesData = CountryDict.countriesAndISO()
    this.setState({
      countries: countriesData
    });

  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(`name:${name}, value:${value}`)

    this.setState({
      [name]: value
    });
  }

  async filterSearch(event) {
    event.preventDefault();
    let keywords = this.state.keyword_input
    let country = this.state.country_input
    let theme = this.state.theme_input
    console.log(`keywords:${keywords}, country:${country}, theme:${theme}`)
    let searchResults= await api.getFilteredProjects(keywords, country, theme)
    console.log("results", searchResults)
    this.setState({
      projects: searchResults
    })
  }

  render() {

    let themes = this.state.themes
    let regions = this.state.regions
    let countries = this.state.countries

    let themeOptions = !!themes? themes.map(e=>
      <option value={e.id}> {e.name}</option>): "no themes in state"
    let regionOptions = !!regions? regions.map(e=>
      <option value={e.name}> {e.name}</option>): "no regions in state"
    let countryOptions = !!countries? countries.map(e=>
      <option value={e.code}> {e.name}</option>): "no countries in state"

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
              <select value={this.state.value} onChange={this.handleChange}
                  className=" form-group form-control mdb-select  md-outline colorful-select dropdown-primary shadow"
                  name="theme_input"
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
                <h5> Countries</h5>
              </div>

              <div className="select-outline ">
              <select value={this.state.value} onChange={this.handleChange}
                  className=" form-group form-control mdb-select  md-outline colorful-select dropdown-primary shadow"
                  name="country_input"
                >
                  <option disabled selected>
                    select a country
                  </option>
                  {countryOptions}
                </select>
              </div>
            </div>
            <div class="col-sm">
              <div className="text-white">
                <h5> Project </h5>
              </div>

              <div className="select-outline ">
              <input value={this.state.value} onChange={this.handleChange}
                  name="keyword_input"
                  type="text"
                  className="form-control mb-2"
                  placeholder="keyword"
                />
              </div>
            </div>
            <div class="col-2 text-center">
              <div className="text-white">
                <h5>Find</h5>
              </div>
              <button
                className="btn btn-warning shadow"
                onClick={(event) => this.filterSearch(event)}
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

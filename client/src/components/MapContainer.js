import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import CountryDict from "./CountryDict.js";
import api from "./api";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const mapStyles = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 41.3851,
  lng: 2.1734,
};

let service = null;

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      country_input: "",
      suggestions: [],
      places: [],
      projects: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    let countriesData = CountryDict.countriesAndISO();
    this.setState({
      countries: countriesData,
    });
  }

  savePlace = (place) => {
    this.setState({ places: [...this.state.places, place] });
  };

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.search();
    }
  };

  onMarkerClick = (props, marker, e) => {
    console.log(props, marker, e);
  };

  initPlaces(mapProps, map) {
    const { google } = mapProps;
    service = new google.maps.places.PlacesService(map);
  }

  async filterSearch(event) {
    event.preventDefault();
    this.setState({
      searchStatus: "loading projects...",
    });

    let keywords = "*";
    let country = this.state.country_input;
    let theme = "";

    console.log(`keywords:${keywords}, country:${country}, theme:${theme}`);

    try {
      let searchResults = await api.getFilteredProjects(
        keywords,
        country,
        theme
      );
      this.setState({
        projects: searchResults.search.response.projects.project,
      });
      this.setState({
        searchStatus: "results",
      });
      console.log(this.state.projects);
    } catch (err) {
      console.log(err.message);
      this.setState({
        searchStatus: "no projects match the query",
      });
    }
  }

  render() {
    let countries = this.state.countries;
    let projects = this.state.projects;

    const { suggestions, places } = this.state;

    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < places.length; i++) {
      bounds.extend(places[i].geometry.location);
    }
    let countryOptions = !!countries
      ? countries.map((e) => <option value={e.code}> {e.name}</option>)
      : "loading countries...";

    let projectResults = !!projects.length ? (
      projects.map((e) => (
        <div className="container-xl mt-2" key={e.id}>
          <div className="row">
            <div className="card border-warning mb-3">
              <h5 className="card-header">{e.title}</h5>
              <div className="card-body">
                <div class="row">
                  <div class="col">
                    <div className="text-left mt-3">
                      <button
                        className=" btn btn-dark shadow"
                        onClick={() => this.favorite(e.id)}
                      >
                        Add to favorites
                      </button>
                    </div>
                  </div>
                  <div class="col ">
                    <ul>
                      <li>
                        <a href={e.contactUrl}>{e.contactUrl}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="mt-4 text-white">loading projects...</div>
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <form class="container  sticky-top bg-secondary mt-4  rounded pt-1">
              <div class="row mt-3 ">
                <div class="col-sm">
                  <div className="text-white">
                    <h5> Countries</h5>
                  </div>
                  <div className="select-outline ">
                    <select
                      value={this.state.value}
                      onChange={this.handleChange}
                      className="border border-warning form-group form-control mdb-select  md-outline colorful-select dropdown-primary shadow"
                      name="country_input"
                    >
                      <option disabled selected>
                        select a country
                      </option>
                      {countryOptions}
                    </select>
                  </div>
                </div>
                <div class="col-2 text-center">
                  <div className="text-white ">
                    <h5> Find</h5>
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
            <h3>Suggestions</h3>
            <ul className="list-group">{projectResults}</ul>
          </div>
          <div className="col">
            <Map
              google={this.props.google}
              onReady={this.initPlaces}
              zoom={14}
              style={mapStyles}
              bounds={bounds}
              initialCenter={center}
            >
              {places.map((marker, i) => (
                <Marker
                  onClick={this.onMarkerClick}
                  name={marker.name}
                  position={marker.geometry.location}
                  key={i}
                />
              ))}
            </Map>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey,
})(MapContainer);

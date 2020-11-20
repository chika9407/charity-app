import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import api from "../services/api";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat_input: null,
      lon_input: null,
      projects: null,
      selectedProject: null,
      userLocation: { lat: null, lon: null },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getUserLocation();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: [value],
    });
  }
  async locSearch(event) {
    event.preventDefault();
    this.setState({
      userLocation: { lat: this.state.lat_input, lon: this.state.lon_input },
    });
    try {
      let projectsData = await api.getNearby(
        this.state.lat_input,
        this.state.lon_input
      );
      this.setState({
        projects: projectsData,
      });
    } catch (err) {
      console.log(err);
    }
  }

  getUserLocation() {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      this.setState({
        userLocation: { lat: latitude, lon: longitude },
      });
      this.getNearbyProjects(latitude, longitude);
    };
    const err = (message) => {
      console.log(message);
    };
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(success, err);
    }
  }

  async getNearbyProjects(lat, lon) {
    try {
      let projectsData = await api.getNearby(lat, lon);
      this.setState({
        projects: projectsData,
      });
    } catch (err) {
      console.log(err);
    }
  }
  showProjects() {}

  select = (project) => {
    console.log("select clicked");
    this.setState({
      selectedProject: project,
    });
    console.log("selected", this.state.selectedProject);
  };

  render() {
    const mapStyles = {
      width: "100%",
      height: "400px",
    };

    const center =
      this.state.userLocation.lat === null
        ? { lat: 0, lng: 0 }
        : {
            lat: this.state.userLocation.lat,
            lng: this.state.userLocation.lon,
          };

    this.state.projects === null
      ? console.log("projects not loaded")
      : console.log(this.state.projects);

    let marker =
      this.state.selectedProject === null ? (
        ""
      ) : (
        <Marker
          name={this.state.selectedProject.name}
          position={{
            lat: this.state.selectedProject.lat,
            lng: this.state.selectedProject.lon,
          }}
          key={this.state.selectedProject.id}
        />
      );

    const latRange = [];

    for (var i = -80; i <= 80; i++) {
      latRange.push(i);
    }
    let latOptions = latRange.map((e, i) => (
      <option value={latRange[i]}>{latRange[i]}</option>
    ));

    const lonRange = [];

    for (var i = -180; i <= 180; i++) {
      lonRange.push(i);
    }
    let lonOptions = lonRange.map((e) => <option value={e}>{e}</option>);

    // var bounds = new this.props.google.maps.LatLngBounds();
    // for (var i = 0; i < this.state.selectedProjects.length; i++) {
    //   bounds.extend({
    //     lat: this.state.selectedProjects[i].lat,
    //     lng: this.state.selectedProjects[i].lng,
    //   });
    // }

    return (
      <div className="container-xl">
        <div className="row mt-5">
          <div className="col-5">
            <form class="container bg-secondary mt-4  rounded pt-1">
              <div class="col-sm">
                <div className="text-white">
                  <h5> Latitude </h5>
                </div>

                <div className="select-outline  ">
                  <select
                    value={this.state.value}
                    onChange={this.handleChange}
                    className=" border border-warning form-group form-control mdb-select  md-outline colorful-select dropdown-primary shadow"
                    name="lat_input"
                  >
                    <option value={0}>select</option>
                    {latOptions}
                  </select>
                </div>
              </div>
              <div class="col-sm">
                <div className="text-white">
                  <h5> longitude</h5>
                </div>

                <div className="select-outline ">
                  <select
                    value={this.state.value}
                    onChange={this.handleChange}
                    className="border border-warning form-group form-control mdb-select  md-outline colorful-select dropdown-primary shadow"
                    name="lon_input"
                  >
                    <option value={0}>select</option>
                    {lonOptions}
                  </select>
                </div>
              </div>
              <div class="col-2 text-center">
                <div className="text-white ">
                  <h5> Find</h5>
                </div>
                <button
                  className="btn btn-warning shadow"
                  onClick={(event) => this.locSearch(event)}
                >
                  SUBMIT
                </button>
              </div>
            </form>
            <div className="card">
              <ul className="list-group">
                {this.state.projects === null
                  ? "no projects"
                  : this.state.projects.map((project) => (
                      <li
                        key={project.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <div>
                            <strong>{project.name}</strong>
                          </div>
                          <span className="text-muted">{project.address}</span>
                          <div>
                            <strong>
                              <a href={project.url}>{project.url}</a>
                            </strong>
                          </div>
                        </div>

                        <button
                          className="btn btn-outline-primary"
                          onClick={() => this.select(project)}
                        >
                          {this.state.selectedProject
                            ? project.id === this.state.selectedProject.id
                              ? "Selected"
                              : "Select"
                            : "Select"}
                        </button>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
          <div className="col">
            <div className="card">
              {this.state.userLocation.lat === null ? (
                "no location data"
              ) : (
                <Map
                  google={this.props.google}
                  zoom={6}
                  style={mapStyles}
                  center={{
                    lat: this.state.userLocation.lat,
                    lng: this.state.userLocation.lon,
                  }}
                >
                  {marker}
                </Map>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCFyKaFulGi1pbr2WKiQFLpcrK-CDLCPvM",
})(MapContainer);

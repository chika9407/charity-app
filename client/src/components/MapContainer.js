import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import api from "../services/api";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: null,
      selectedProject: null,
      userLocation: { lat: null, lon: null },
    };
  }

  componentDidMount() {
    this.getUserLocation();
  }

  getUserLocation() {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      console.log("lat lon", latitude, longitude);
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
    let projectsData = await api.getNearby(lat, lon);
    this.setState({
      projects: projectsData,
    });
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

    // var bounds = new this.props.google.maps.LatLngBounds();
    // for (var i = 0; i < this.state.selectedProjects.length; i++) {
    //   bounds.extend({
    //     lat: this.state.selectedProjects[i].lat,
    //     lng: this.state.selectedProjects[i].lng,
    //   });
    // }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="form-inline d-flex justify-content-between mb-4">
              <input
                type="text"
                value={this.state.input}
                className="form-control flex-grow-1"
                placeholder="Search for places on Google Maps"
              />
              <button className="btn btn-primary ml-2">Search</button>
            </div>
            <h3>Suggestions</h3>
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
          <div className="col">
            {this.state.userLocation.lat === null ? (
              "no location data"
            ) : (
              <Map
                google={this.props.google}
                zoom={6}
                style={mapStyles}
                initialCenter={center}
              >
                {marker}
              </Map>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCFyKaFulGi1pbr2WKiQFLpcrK-CDLCPvM",
})(MapContainer);

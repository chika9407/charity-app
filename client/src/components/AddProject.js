import React, { Component } from "react";
import api from "./api";

export default class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      theme: "",
      region: "",
      country: "",
      organization: "",
      showAlert: false,
    };
  }

  //fetch name and all project info to populate the state


  //post the project to DB

  addProject = (e) => {
    e.preventDefault();

    const { name,theme, region, country, organization } = this.state;

    const category_id = categories.find((e) => e.name === category).id;

    await api.addProject(name, themeId, regionId, countryCode, organizationID);

    this.setState({ showAlert: true });
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.addProject}></button>
      </div>
    );
  }
}

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../services/api";

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteProjects: [],
      username: "",
    };
  }

  async getUserFavorites() {
    try {
      const favoriteProjects = await api.getUserFavorites();
      console.log(favoriteProjects);
      this.setState({
        favoriteProjects,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  async getUserName() {
    let name = await api.getUserName();
    this.setState({ username: name.toUpperCase() });
  }

  async componentDidMount() {
    try {
      await this.getUserFavorites();
      await this.getUserName();
    } catch (err) {
      console.log(err.message);
    }
  }

  donate = () => {
    console.log("$$ click!");
    this.props.history.push(`/donate`);
  };

  render() {
    const { favoriteProjects, username } = this.state;
    console.log(favoriteProjects);
    console.log(username);
    return (
      <div className="container-xl">
        <div className="row mt-4 text-white">
          <h3>Welcome to Your Dashboard, {username}</h3>
        </div>
        <ul className="text-white">
          {favoriteProjects &&
            favoriteProjects.map((project, i) => (
              <li key={i}>
                {" "}
                {project.name}
                <button
                  className="ml-3 btn btn-warning shadow"
                  onClick={this.donate}
                >
                  Donate $
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(Favorite);

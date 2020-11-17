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
        <div>
          {favoriteProjects &&
            favoriteProjects.map((project, i) => (
              <div className="container-xl mt-2" key={i}>
                <div className="row">
                  <div className="card border-warning mb-3">
                    <h5 className="card-header">{project.name}</h5>
                    <div className="card-body">
                      <div class="row">
                        <div class="col">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            class="img-fluid"
                            alt="Responsive image"
                          ></img>
                          <div className="text-left mt-3">
                            <button
                              className="ml-3 btn btn-warning shadow"
                              onClick={this.donate}
                            >
                              Donate $
                            </button>
                          </div>
                        </div>
                        <div class="col ">
                          <p>{project.summary}</p>
                          <ul>
                            <li>
                              <a href={project.url}>{project.url}</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Favorite);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../services/api";

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteProjects: [],
      username: "",
      showAlert: false,
    };
  }

  async getUserFavorites() {
    try {
      const favoriteProjects = await api.getUserFavorites();
      console.log(favoriteProjects);
      const sortedFavoriteprojects = favoriteProjects
        .sort((a, b) => b.UserProjects.createdAt - a.UserProjects.createdAt)
        .reverse();
      this.setState({
        favoriteProjects: sortedFavoriteprojects,
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
  async deleteFromFavorites(ProjectId) {
    try {
      await api.deleteFromFavorites(ProjectId);
      await this.getUserFavorites();
      this.setState({ showAlert: true });
    } catch (err) {
      console.log(err.message);
    }
  }

  donate = () => {
    console.log("$$ click!");
    this.props.history.push(`/donate`);
  };

  render() {
    const { favoriteProjects, username, showAlert } = this.state;
    console.log(favoriteProjects);
    return (
      <div className="container-xl">
        <div className="row mt-5">
          <h3 className=" text-white">Welcome to Your Dashboard: {username}</h3>
        </div>
        <div>
          {showAlert && (
            <div className="alert alert-success sticky-top" role="alert">
              Deleted from favorites successfully!
            </div>
          )}
          {favoriteProjects &&
            favoriteProjects.map((project, i) => (
              <div className="mt-2" key={i}>
                <div className="row  ">
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
                          <div className=" mt-3">
                            <button
                              className=" btn btn-warning shadow"
                              onClick={this.donate}
                            >
                              Donate $
                            </button>
                          </div>
                          <div className=" mt-3">
                            <button
                              className=" btn btn-warning shadow"
                              onClick={() =>
                                this.deleteFromFavorites(project.id)
                              }
                            >
                              Delete from Favorites
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

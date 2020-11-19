import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../services/api";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themes: [],
      countries: [],
      country_input: "",
      theme_input: "",
      keyword_input: "",
      projects: [],
      searchStatus: "loading...",
      showAlert: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    //grabs themes from api,countries ISO codes, and featured projects
    let defaultProjects = await api.getFilteredProjects("teach", "TH", "edu");
    let themesData = await api.getAllThemesByName();
    let countriesData = await api.getAllCountries();
    this.setState({
      projects: defaultProjects,
    });
    this.setState({
      themes: themesData,
    });
    this.setState({
      countries: countriesData,
    });
    this.setState({
      searchStatus: "Theme: edu, Country: TH, Keyword: teach",
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  //only fetches 10 at a time, can deal with later
  async filterSearch(event) {
    event.preventDefault();
    this.setState({
      searchStatus: "loading projects . . .",
    });

    let keywords = this.state.keyword_input || 0;
    let country = this.state.country_input || 0;
    let theme = this.state.theme_input || 0;

    console.log(`keywords:${keywords}, country:${country}, theme:${theme}`);

    try {
      let searchResults = await api.getFilteredProjects(
        keywords,
        country,
        theme
      );

      this.setState({
        projects: searchResults,
      });

      this.setState({
        searchStatus:
          searchResults.length > 0
            ? `Theme: ${theme}, Country${country}, Keyword: ${keywords}`
            : "No results",
      });
    } catch (err) {
      console.log(err.message);
      this.setState({
        searchStatus: "Sorry no projects match the query",
      });
    }
  }

  favorite = async (ProjectId) => {
    try {
      let favorites = await api.addToFavorites(ProjectId);
      console.log(favorites);
      console.log("added to Favorites successfully!");
      this.setState({ showAlert: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    let status = this.state.searchStatus;
    let { themes, countries, projects, showAlert } = this.state;
    console.log(themes);

    console.log("projects in state are:", this.state.projects);

    let themeOptions = !!themes
      ? themes.map((e) => <option value={e.id}> {e.name}</option>)
      : "loading themes ...";

    let countryOptions = !!countries
      ? countries.map((e) => <option value={e.id}> {e.name}</option>)
      : "loading countries...";

    let projectResults =
      !!projects && !!projects.length ? (
        projects.map((e) => (
          <div className="container-xl mt-1" key={e.id}>
            <div className="row">
              <div className="card border-warning mb-3">
                <h5 className="card-header">{e.name}</h5>
                <div className="card-body">
                  <div class="row">
                    <div class="col">
                      <img
                        src={e.imageUrl}
                        alt={e.name}
                        class="img-fluid"
                        alt="Responsive image"
                      ></img>
                      <div className="text-left mt-3">
                        <button
                          className=" btn btn-dark shadow"
                          onClick={() => this.favorite(e.id)}
                        >
                          Add to favorites +
                        </button>
                      </div>
                    </div>
                    <div class="col ">
                      <p>{e.summary}</p>
                      <ul>
                        <li>
                          <a href={e.url}>{e.url}</a>
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
        <div className="mt-4 text-white">{status}</div>
      );

    return (
      <div className="container-xl">
        <form class="container bg-secondary mt-4  rounded pt-1">
          <div class="row mt-3 ">
            <div class="col-sm">
              <div className="text-white">
                <h5> Goal </h5>
              </div>

              <div className="select-outline  ">
                <select
                  value={this.state.value}
                  onChange={this.handleChange}
                  className=" border border-warning form-group form-control mdb-select  md-outline colorful-select dropdown-primary shadow"
                  name="theme_input"
                >
                  <option value={0}>select</option>
                  {themeOptions}
                </select>
              </div>
            </div>
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
                  <option value={0}>select</option>
                  {countryOptions}
                </select>
              </div>
            </div>
            <div class="col-sm">
              <div className="text-white">
                <h5> Project title</h5>
              </div>

              <div className="select-outline ">
                <input
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="keyword_input"
                  type="text"
                  className="border border-warning form-control mb-2"
                  placeholder="keyword"
                />
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
        <div className="mt-4 text-white">{status}</div>
        <div>{projectResults}</div>
      </div>
    );
  }
}

export default withRouter(Search);

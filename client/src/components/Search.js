import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Search extends Component {
  render() {
    return (
      <div className="container-xl">
        <div className="mt-4 text-white">Search page ???</div>
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
                    Contribute towards . . . . . . . . . . .
                  </option>
                  <option value="selection1"> selection 1</option>
                  <option value="selection2">selection 2</option>
                  <option value="selection3">selection 3</option>
                </select>
              </div>
            </div>
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
                    Contribute towards . . . . . . . . . . .
                  </option>
                  <option value="selection1"> selection 1</option>
                  <option value="selection2">selection 2</option>
                  <option value="selection3">selection 3</option>
                </select>
              </div>
            </div>
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
                    Contribute towards . . . . . . . . . . .
                  </option>
                  <option value="selection1"> selection 1</option>
                  <option value="selection2">selection 2</option>
                  <option value="selection3">selection 3</option>
                </select>
              </div>
            </div>
            <div class="col-2 text-center">
              <div className="text-white">
                <h5> Make a change </h5>
              </div>
              <button
                className="btn btn-warning shadow"
                //onClick={(e) => this.addUser(e)}
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

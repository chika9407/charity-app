import React, { Component } from "react";

export default class ThankYou extends Component {
  render() {
    return (
      <div className="container-xl">
        <h2 className=" text-white text-center  mt-5">
          Thank you for your donation !
        </h2>
        <div className="text-center  ">
          <a href="/favorite" className="btn btn-warning mt-2 shadow">
            Back to your Dashboard
          </a>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import Plot from "react-plotly.js";

class Plotly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      X1: [],
      X2: [],
      X3: [],
      X1f: [],
      X2f: [],
      X3f: [],
      id: [],
      idf: [],
      uX1: [],
      uX2: [],
      uX3: [],
      uid: [],
      fraudsize: 6,
      nonfraudsize: 6,
      error: null,
      rows: []
    };
  }
  sizeChange(newsize) {
    this.setState({ fraudsize: newsize });
  }
  addPoint(point) {
    var uX1 = [],
      uX2 = [],
      uX3 = [];
    uX1.push(point.X1);
    uX2.push(point.X2);
    uX3.push(point.X3);
    this.setState({
      uX1: uX1,
      uX2: uX2,
      uX3: uX3
    });
  }
  componentDidMount() {
    fetch("http://localhost:3000/api/fraudplot")
      .then(res => res.json())
      .then(
        result => {
          var X1 = [],
            X2 = [],
            X3 = [],
            X1f = [],
            X2f = [],
            X3f = [],
            id = [],
            idf = [];
          result.message.map(row => {
            if (row.isFraud === "TRUE") {
              X1f.push(row.X1);
              X2f.push(row.X2);
              X3f.push(row.X3);
              idf.push(row._id);
            } else if (row.isFraud === "FALSE") {
              X1.push(row.X1);
              X2.push(row.X2);
              X3.push(row.X3);
              id.push(row._id);
            }
          });
          this.setState({
            X1: X1,
            X2: X2,
            X3: X3,
            X1f: X1f,
            X2f: X2f,
            X3f: X3f,
            id: id,
            idf: idf
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            error
          });
        }
      );
  }
  render() {
    var isFraud = {
      x: this.state.X1f,
      y: this.state.X2f,
      z: this.state.X3f,
      text: "Fraud",
      mode: "markers",
      name: "Fraud",
      marker: {
        size: this.state.fraudsize,
        opacity: 0.8,
        color: "rgb(255, 51, 51)"
      },
      line: {
        color: "rgb(255, 51, 51)",
        width: 0.5
      },
      type: "scatter3d"
    };
    var notFraud = {
      x: this.state.X1,
      y: this.state.X2,
      z: this.state.X3,
      text: "Not Fraud",
      mode: "markers",
      name: "Not Fraud",
      marker: {
        size: this.state.nonfraudsize,
        color: "rgb(204, 204, 204)",
        line: {
          color: "rgb(204, 204, 204)",
          width: 0.5
        },
        opacity: 0.8
      },
      type: "scatter3d"
    };
    var userPoints = {
      x: this.state.uX1,
      y: this.state.uX2,
      z: this.state.uX3,
      text: "Selected",
      mode: "markers",
      name: "Selected",
      marker: {
        size: 6,
        opacity: 0.8,
        color: "rgb(0,0,255)"
      },
      line: {
        color: "rgb(0,0,255)",
        width: 0.5
      },
      type: "scatter3d"
    };
    const { error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          <h2>3D Fraud Plot</h2>
          <Plot
            data={[notFraud, isFraud, userPoints]}
            layout={{
              width: 1000,
              height: 800,
              margin: {
                l: 0,
                r: 0,
                b: 0,
                t: 0
              }
            }}
          />
        </div>
      );
    }
  }
}

export default Plotly;

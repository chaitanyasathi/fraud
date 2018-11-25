import React, { Component } from "react";
import Plot from "react-plotly.js";
import Table from "./Table";
import Plotly from "./Plotly";
import { Grid, Row, Col, Clearfix, Button, Panel } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ""
    };
    this.increaseSize = this.increaseSize.bind(this);
    this.decreaseSize = this.decreaseSize.bind(this);
    this.tableFunc = this.tableFunc.bind(this);
  }
  increaseSize() {
    this.plotref.sizeChange("20");
  }
  decreaseSize() {
    this.plotref.sizeChange("12");
  }
  tableFunc(point) {
    this.plotref.addPoint(point);
  }
  render() {
    const wellStyles = { maxWidth: 200, margin: "0 auto", float: "none" };
    const centerCol = { margin: "0 auto", float: "none" };

    return (
      <div>
        <h4>{this.state.data}</h4>
        <Grid fluid={false}>
          <Row className="show-grid">
            <Col sd={6} md={6}>
              <Plotly
                size={20}
                ref={plotref => {
                  this.plotref = plotref;
                }}
              />
            </Col>
            <Clearfix visibleSmBlock />
            <Col sd={6} md={6} style={centerCol}>
              <div style={wellStyles}>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={this.increaseSize}
                  block
                >
                  Increase Size
                </Button>
                <Button bsSize="large" onClick={this.decreaseSize} block>
                  Decrease Size
                </Button>
              </div>
            </Col>
          </Row>
          <br />
          <Row className="show-grid">
            <Table tableFunc={this.tableFunc} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;

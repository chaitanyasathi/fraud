import React, { Component } from "react";
import "./App.css";

import _ from "lodash";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Table extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true
    };
    this.fetchData = this.fetchData.bind(this);
    this.getPages = this.getPages.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }
  onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: e => {
        this.props.tableFunc(rowInfo.row);
      }
    };
  };
  getPages(state, instance) {
    fetch("http://localhost:3000/api/fraudlength")
      .then(res => res.json())
      .then(
        result => {
          this.setState({ pages: parseInt(result.length / state.pageSize) });
          this.fetchData(state, instance);
        },
        error => {
          console.log("Error");
        }
      );
  }
  fetchData(state, instance) {
    this.setState({ loading: true });
    var sortid = [];
    var sortdesc = [];
    var sortobject = {};
    var filterobject = {};
    var params = {};
    state.sorted.map(d => {
      sortid.push(d.id);
      if (d.desc === false) {
        sortdesc.push(1);
        sortobject[d.id] = 1;
      } else {
        sortdesc.push(-1);
        sortobject[d.id] = -1;
      }
      sortdesc.push(d.id);
    });
    state.filtered.map(d => {
      filterobject[d.id] = new RegExp("^" + d.value + "$", "i");
    });
    params["pageNo"] = state.page + 1;
    params["size"] = state.pageSize;
    params["sortobject"] = sortobject;
    params["filter"] = state.filtered;

    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    fetch("http://localhost:3000/api/fraud", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            data: result.message,
            pages: this.state.pages,
            loading: false
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            loading: false,
            error
          });
        }
      );
  }
  render() {
    const { data, pages, loading } = this.state;
    return (
      <div>
        <ReactTable
          columns={[
            {
              Header: "Device",
              accessor: "device"
            },
            {
              Header: "Session",
              accessor: "session"
            },
            {
              Header: "Fraud",
              accessor: "isFraud"
            },
            {
              Header: "X1",
              accessor: "X1"
            },
            {
              Header: "X2",
              accessor: "X2"
            },
            {
              Header: "X3",
              accessor: "X3"
            }
          ]}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={data}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.getPages} // Request new data when things change
          defaultPageSize={20}
          getTrProps={this.onRowClick}
          filterable
          onFilteredChange={this.testfunction}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default Table;

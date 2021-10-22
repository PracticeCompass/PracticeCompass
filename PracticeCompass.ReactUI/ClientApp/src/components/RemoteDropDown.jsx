/* eslint-disable */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { connect } from "react-redux";
// const textField = 'ContactName';
// const keyField = 'CustomerID';
// const placeholder =this.props.placeholder? this.props.placeholder:'Select';
const pageSize = 10;
// const emptyItem = ;

// const loadingData = [];
// while (loadingData.length < pageSize) {
//     loadingData.push({ ...{ ['textField']: 'loading ...' } });
// }

class RemoteDropDown extends React.Component {
  baseUrl = `https://odatasampleservices.azurewebsites.net/V4/Northwind/Northwind.svc/`;
  init = { method: "GET", accept: "application/json", headers: [] };
  dataCaching = [];
  pendingRequest;
  requestStarted = false;

  state = {
    data: [],
    skip: 0,
    total: 0,
    value: null,
    filter: "",
    minLength: 3,
    emptyItem: { [this.props.textField]: "loading ..." },
  };

  componentDidMount() {
    this.requestData(0, "");
  }

  async requestData(skip, filter) {
    if (this.requestStarted) {
      clearTimeout(this.pendingRequest);
      this.pendingRequest = setTimeout(() => {
        this.requestData(skip, filter);
      }, 50);
      return;
    }

    const url =
      this.baseUrl +
      `Customers?$filter=contains(ContactName,'${filter}')&$skip=${skip}&$top=${pageSize}&$count=true`;

    this.requestStarted = true;
    fetch(this.props.getBaseUrl(filter), this.init)
      .then((response) => response.json())
      .then((response) => {
        //TO:DO return all count
        const total = response.length;
        const items = [];
        response.forEach((element, index) => {
          // const { CustomerID, ContactName } = element;
          // const item = {
          //     [this.props.dataItemKey]: element[this.props.dataItemKey],
          //     [this.props.textField]:element[this.props.textField]
          // };
          items.push(element);
          this.dataCaching[index + skip] = element;
        });

        if (skip === this.state.skip) {
          this.setState({
            data: items,
            total: total,
          });
        }
        this.requestStarted = false;
      });
  }

  onFilterChange = (event) => {
    let filter = event.filter.value;
    if(filter.length==0){
      filter="";
    }
    else if (filter.length < this.state.minLength) return;
    this.resetCach();
    this.requestData(0, filter);

    this.setState({
      data: [],
      skip: 0,
      filter: filter,
    });
  };
  pageChange = (event) => {
    const skip = event.page.skip;
    const filter = this.state.filter;

    if (this.shouldRequestData(skip)) {
      this.requestData(skip, filter || "");
    }

    const data = this.getCachedData(skip);
    this.state.skip = skip;
    this.state.data = data;
    this.setState({
      data: data,
    });
  };

  // onChange = (event) => {
  //     const value = event.target.value;
  //     if (value && value[this.props.textField] === this.state.emptyItem[this.props.textField]) {
  //         return;
  //     }
  //     this.setState({
  //         value: value
  //     });
  // }

  render() {
    return (
      <ComboBox
        data={this.state.data}
        className={this.props.className ?? "unifyHeight"}
        value={this.props.value}
        onChange={this.props.onChange}
        textField={this.props.textField}
        dataItemKey={this.props.dataItemKey}
        // placeholder={this.props.placeholder}
        filterable={true}
        onFilterChange={this.onFilterChange}
        virtual={{
          pageSize: pageSize,
          skip: this.state.skip,
          total: this.state.total,
        }}
        onPageChange={this.pageChange}
        style={{ width: this.props.width }}
      />
    );
  }

  componentWillUnmount() {
    this.resetCach();
  }

  shouldRequestData(skip) {
    for (let i = 0; i < pageSize; i++) {
      if (!this.dataCaching[skip + i]) {
        return true;
      }
    }
    return false;
  }

  getCachedData(skip) {
    const data = [];
    for (let i = 0; i < pageSize; i++) {
      data.push(this.dataCaching[i + skip] || { ...emptyItem });
    }
    return data;
  }

  resetCach() {
    this.dataCaching.length = 0;
  }
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(RemoteDropDown);

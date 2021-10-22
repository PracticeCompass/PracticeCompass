import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import ProcessClaims from "../containers/processClaims/ProcessClaims";
import UnSubmitted from "../containers/processClaims/unSubmitted/UnSubmitted";
import Rejections from "../containers/processClaims/rejections/Rejections";
import Denials from "../containers/processClaims/denials/Denials";
import Search from "../containers/processClaims/search/Search";
import ProcessPatients from "../containers/processPatients/ProcessPatients";
import Patients from "../containers/processPatients/patients/Patients";
import Physicians from "../containers/lists/physicians/Physicians";
import Transactions from "../containers/lists/transactions/Transactions";
import PatientMore from "../containers/processPatients/more/PatientsMore";
import Insurance from "../containers/lists/insurance/Insurance";
import ApplyPayments from "../containers/applyPayments/ApplyPayments";
import FindPayments from "../containers/applyPayments/findPayments/findPayments";
import AutomationTasks from "../containers/automationTasks/AutomationTasks";
import Claims from "../containers/automationTasks/Claims";
import ERA from "../containers/automationTasks/ERA";

import DrawerContainer from "./DrawerContainer";
import "./styles.css";
class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <DrawerContainer>
            <Switch>
              <Route exact={true} path="/" component={ProcessClaims} />
              <Route
                exact={true}
                path="/processclaims"
                component={ProcessClaims}
              />
              <Route
                exact={true}
                path="/processclaims/Generate Claims"
                component={UnSubmitted}
              />
              <Route
                exact={true}
                path="/processclaims/rejections"
                component={Rejections}
              />
              <Route
                exact={true}
                path="/processclaims/denials"
                component={Denials}
              />
              <Route
                exact={true}
                path="/processclaims/search"
                component={Search}
              />
              <Route
                exact={true}
                path="/processpatients"
                component={ProcessPatients}
              />
              <Route
                exact={true}
                path="/processpatients/patients"
                component={Patients}
              />
              <Route
                exact={true}
                path="/lists/insurance"
                component={Insurance}
              />
              <Route
                exact={true}
                path="/lists/physicians"
                component={Physicians}
              />
              <Route
                exact={true}
                path="/lists/transactions"
                component={Transactions}
              />
              <Route
                exact={true}
                path="/processpatients/more"
                component={PatientMore}
              />
              <Route
                exact={true}
                path="/applypayments"
                component={ApplyPayments}
              />
              <Route
                exact={true}
                path="/applypayments/findPayments"
                component={FindPayments}
              />
              <Route
                exact={true}
                path="/automationTasks"
                component={AutomationTasks}
              />
              <Route
                exact={true}
                path="/automationTasks/claims"
                component={Claims}
              />
              <Route exact={true} path="/automationTasks/era" component={ERA} />
            </Switch>
          </DrawerContainer>
        </HashRouter>
      </React.Fragment>
    );
  }
}
export default Main;

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { patientsReducer } from "./patient";
import { filtersReducer } from "./filter";
import { uiReducer } from "./ui";
import { PatientDetailsReducer } from "./PatientDetails";
import { claimListReducer } from "./claimList";
import { paymentsReducer } from "./payments";
import { claimDetailsReducer } from "./claimDetails";
import { accountsReducer } from "./account";
import { lookupsReducer } from "./lookups";
import { charageDetailsReducer } from "./chargeDetail";
import { insuranceReducer } from "./Insurance";
import { gridColumnsReducer } from "./GridColumns";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { physiciansReducer } from "./Physicians";
import { eraReducer } from "./era"
import { plansReducer } from "./Plans";
import { lookupCodesReducer } from "./LookupCode";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { fileManagerReducer } from "./fileManager";
const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    patients: patientsReducer,
    ui: uiReducer,
    filter: filtersReducer,
    patientDetails: PatientDetailsReducer,
    claimList: claimListReducer,
    claimDetails: claimDetailsReducer,
    account: accountsReducer,
    payments: paymentsReducer,
    charageDetails: charageDetailsReducer,
    insurances: insuranceReducer,
    gridColumns: gridColumnsReducer,
    lookups: lookupsReducer,
    physicians: physiciansReducer,
    plans: plansReducer,
    era: eraReducer,
    fileManager: fileManagerReducer,
    lookups: lookupCodesReducer,
    authentication,
    registration,
    users,
    alert,
  });
export default rootReducer;

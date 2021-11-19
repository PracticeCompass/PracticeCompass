import config from "../../config";
import { uiStopLoading, uiStartLoading } from "./ui";
import axios from "axios";
import {
  GET_PHYSICIANS,
  GET_PHYSICIANS_FAILS
} from "../actionTypes/actionTypes";


export const getPhysicians =
  (searchCriteria) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      var data = getState();
      let backUpData = [...data.patients.patients];
      //await dispatch(setPatients([]));
      if (searchCriteria == null) return;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/physician/PhysiciansGridGet?ProviderID=${searchCriteria.ProviderID}&firstName=${searchCriteria.firstName}&lastName=${searchCriteria.lastName}&ZIP=${searchCriteria.ZIP}&skip=${searchCriteria.skip}&SortColumn=${searchCriteria.SortColumn ? searchCriteria.SortColumn : ""}&SortDirection=${searchCriteria.SortDirection ? searchCriteria.SortDirection : ""}`,
      });
      await dispatch(setPhysicians(resp.data || []));
    } catch (error) {
      await dispatch(setPhysicians([]));
      console.log("error ==> ", error);
      dispatch({
        type: GET_PHYSICIANS_FAILS,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
  export const setPhysicians = (Physicians) => {
    return {
      type: GET_PHYSICIANS,
      payload: Physicians,
    };
  };




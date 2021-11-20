import config from "../../config";
import { uiStopLoading, uiStartLoading } from "./ui";
import axios from "axios";
import {
  GET_PHYSICIANS,
  GET_PHYSICIANS_FAILS,
  GET_POSITION_FAILS,
  GET_POSITION
} from "../actionTypes/actionTypes";


export const getPhysicians =
  (searchCriteria) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      if (searchCriteria == null) return;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/physician/PhysiciansGridGet?PositionCode=${searchCriteria.PositionCode}&ProviderID=${searchCriteria.ProviderID}&firstName=${searchCriteria.firstName}&lastName=${searchCriteria.lastName}&ZIP=${searchCriteria.ZIP}&skip=${searchCriteria.skip}&SortColumn=${searchCriteria.SortColumn ? searchCriteria.SortColumn : ""}&SortDirection=${searchCriteria.SortDirection ? searchCriteria.SortDirection : ""}`,
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
  export const getPositions =
  (name) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/physician/PositionGet?name=${name}`,
      });
      await dispatch(setPositions(resp.data || []));
    } catch (error) {
      await dispatch(setPositions([]));
      console.log("error ==> ", error);
      dispatch({
        type: GET_POSITION_FAILS,
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

  export const setPositions = (positions) => {
    return {
      type: GET_POSITION,
      payload: positions,
    };
  };




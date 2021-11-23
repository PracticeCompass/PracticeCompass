import config from "../../config";
import { uiStopLoading, uiStartLoading } from "./ui";
import axios from "axios";
import {
  GET_PLANS_FAILS,
  GET_PLANS
} from "../actionTypes/actionTypes";


export const getPlans =
  (searchCriteria) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      if (searchCriteria == null) return;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/plan/PlansGridGet?PlanID=${searchCriteria.PlanID}&ZIP=${searchCriteria.ZIP}&skip=${searchCriteria.skip}&SortColumn=${searchCriteria.SortColumn ? searchCriteria.SortColumn : ""}&SortDirection=${searchCriteria.SortDirection ? searchCriteria.SortDirection : ""}`,
      });
      await dispatch(setPlans(resp.data || []));
    } catch (error) {
      await dispatch(setPlans([]));
      console.log("error ==> ", error);
      dispatch({
        type: GET_PLANS_FAILS,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };

  export const getPlanDetails=
  (ProviderID) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/physician/PhysicianDetailsGet?providerId=${ProviderID}`,
      });
      return resp.data ;
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: GET_PLANS_FAILS,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };

  export const setPlans = (plans) => {
    return {
      type: GET_PLANS,
      payload: plans,
    };
  };






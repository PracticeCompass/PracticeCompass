import config from "../../config";
import { uiStopLoading, uiStartLoading } from "./ui";
import axios from "axios";
import {
  GET_PLANS_FAILS,
  GET_PLANS,
  GET_PLANS_GROUP,
  GET_PLANS_GROUP_FAILS
} from "../actionTypes/actionTypes";


export const getPlans =
  (searchCriteria) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      if (searchCriteria == null) return;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/plan/PlansGridGet?PlanID=${searchCriteria.PlanID}&ZIP=${searchCriteria.ZIP}&skip=${searchCriteria.skip}&SortColumn=${searchCriteria.SortColumn ? searchCriteria.SortColumn : ""}&SortDirection=${searchCriteria.SortDirection ? searchCriteria.SortDirection : ""}&PlanGroup=${searchCriteria.PlanGroup ? searchCriteria.PlanGroup : ""}`,
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
  (PlanID,groupNumber) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/plan/PlanDetailsGet?planId=${PlanID}&groupNumber=${groupNumber}`,
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
  export const getPlanGroup=
  (search) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      await dispatch(setPlanGroup([]));
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/plan/PlanGroupGet?search=${search}`,
      });
      await dispatch(setPlanGroup(resp.data || []));
    } catch (error) {
      await dispatch(setPlanGroup([]));
      console.log("error ==> ", error);
      dispatch({
        type: GET_PLANS_GROUP_FAILS,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
  export const resetPlanGroupList = () => async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      await dispatch(setPlanGroup([]));
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: GET_PLANS_GROUP_FAILS,
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
  export const setPlanGroup = (planGroups) => {
    return {
      type: GET_PLANS_GROUP,
      payload: planGroups,
    };
  };







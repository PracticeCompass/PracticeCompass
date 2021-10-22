import axios from "axios";
import {
  FILTER_DELETE,
  FILTER_DELETE_FAILED,
  FILTER_INSERT,
  FILTER_INSERT_FAILED,
  FILTER_UPDATE,
  FILTER_UPDATE_FAILED,
  FILTERS_GET,
  FILTERS_GET_FAILED,
  FILTERS_PATIENTS,
  FILTERS_INSURANCES,
  FILTERS_GUARANTORS
} from "../actionTypes/actionTypes";
import { uiStopLoading, uiStartLoading } from "./ui";
import config from "../../../src/config";
export const getFilters = (entity) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    await dispatch(setFilters([]));
    if (entity !== undefined) {
      //TO:DO call API
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/Filters/FiltersGet?Entity=${entity}`,
      });
      await dispatch(setFilters(resp.data || []));
    }
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: FILTERS_GET_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const FilterDelete = (filterId) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    await dispatch(deleteFilter(false));
    if (filterId !== undefined) {
      //TO:DO call API
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/Filters/FilterDelete?filterId=${filterId}`,
      });
      await dispatch(deleteFilter(resp.data || false));
      return resp.data || false;
    }
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: FILTER_DELETE_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const FilterInsert =
  (displayName, body, entity, order, userId) => async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      await dispatch(insertFilter(false));
      //if (filterId !== undefined) {
      //TO:DO call API
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/Filters/FilterInsert?DisplayName=${displayName}&Body=${body}&Entity=${entity}&Order=${order}&userid=${userId}`,
      });
      await dispatch(insertFilter(resp.data || false));
      return resp.data || false;
      //}
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: FILTER_INSERT_FAILED,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
export const FilterUpdate =
  (filterId, displayName, body, entity, order, userId) =>
    async (dispatch, getState) => {
      try {
        dispatch(uiStartLoading());
        await dispatch(updateFilter(false));
        //if (filterId !== undefined) {
        //TO:DO call API
        const resp = await axios({
          method: "GET",
          url: `${config.baseUrl}/Filters/FilterUpdate?filterId=${filterId}&DisplayName=${displayName}&Body=${body}&Entity=${entity}&Order=${order}&userid=${userId}`,
        });
        await dispatch(updateFilter(resp.data || false));
        return resp.data || false;
        //}
      } catch (error) {
        console.log("error ==> ", error);
        dispatch({
          type: FILTER_UPDATE_FAILED,
          payload: error,
        });
      } finally {
        dispatch(uiStopLoading());
      }
    };


export const setFilters = (filters) => {
  return {
    type: FILTERS_GET,
    payload: filters,
  };
};

export const deleteFilter = (filterdeleteStatus) => {
  return {
    type: FILTER_DELETE,
    payload: filterdeleteStatus,
  };
};
export const insertFilter = (filterinsertStatus) => {
  return {
    type: FILTER_INSERT,
    payload: filterinsertStatus,
  };
};
export const updateFilter = (filterUpdateStatus) => {
  return {
    type: FILTER_UPDATE,
    payload: filterUpdateStatus,
  };
};


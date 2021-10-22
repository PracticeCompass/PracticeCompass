import config from "../../config";
import { uiStopLoading, uiStartLoading } from "./ui";
import axios from "axios";
import {
  GET_INSURANCE_RECORD_FAILED
} from "../actionTypes/actionTypes";



export const GetInsuranceRecord =
  (PlanID) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());      
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/Insurance/GetInsuranceRecord?PlanId=${PlanID}`,
      });
          return resp.data;
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: GET_INSURANCE_RECORD_FAILED,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };




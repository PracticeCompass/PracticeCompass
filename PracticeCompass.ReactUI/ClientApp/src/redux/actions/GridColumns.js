import config from "../../config";
import { uiStopLoading, uiStartLoading } from "./ui";
import axios from "axios";
import {
  GET_GRID_COLUMNS_FAILED,
  SAVE_GRID_COLUMNS_FAILED,
} from "../actionTypes/actionTypes";

const UserId = 8;
export const GetGridColumns = (Name) => async (dispatch, getState) => {
  try {
    if (Name == null || Name == "") return;
    dispatch(uiStartLoading());

    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/GridColumns/GridColumnsGet?Name=${Name}&UserId=${UserId}`,
    });

    return resp.data;
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: GET_GRID_COLUMNS_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};

export const SaveGridColumns =
  (Name, Columns) => async (dispatch, getState) => {
    try {
      if (Name == null || Name == "") return;
      dispatch(uiStartLoading());
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/GridColumns/SaveGridColumns?Name=${Name}&UserId=${UserId}&Columns=${Columns}`,
      });
      return resp.data;
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: SAVE_GRID_COLUMNS_FAILED,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };

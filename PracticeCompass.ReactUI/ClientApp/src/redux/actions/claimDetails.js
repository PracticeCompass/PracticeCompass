import axios from "axios";
import {
  SET_CLAIM_DETAILS,
  SET_CHARGES,
  GET_CLAIM_DETAILS_FAILED,
  GET_CHARGES_FAILED,
  CLAIM_NOTE,
  CLAIM_NOTE_FAILED,
  GET_CLAIM_SUBMISSION_HISTORY_FAILED,
  SET_CLAIM_SUBMISSION_HISTORY,
} from "../actionTypes/actionTypes";
import { uiStopLoading, uiStartLoading } from "./ui";
import config from "../../config";
export const ChargeGridGet = (claimID) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    await dispatch(setCharges([]));
    if (claimID == null) return;
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/ClaimDetails/ChargeGridGet?ClaimSID=${claimID}`,
    });
    await dispatch(setCharges(resp.data || []));
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: GET_CHARGES_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const ClaimSubmissionHistoryGet =
  (claimID) => async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      await dispatch(setClaimSubmissionHistory([]));
      if (claimID == null) return;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/ClaimDetails/ClaimSubmissionHistoryGet?ClaimSID=${claimID}`,
      });
      await dispatch(setClaimSubmissionHistory(resp.data || []));
      return resp.data;
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: GET_CLAIM_SUBMISSION_HISTORY_FAILED,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
export const GetClaimDetails =
  (claimID, PracticeID) => async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      //await dispatch(setInsurance([]));
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/ClaimDetails/ClaimDetailsGet?ClaimSID=${claimID}&PracticeID=${PracticeID}`,
      });
      await dispatch(setClaimDetails(resp.data || []));
      return resp.data && resp.data[0] ? resp.data[0] : null;
      // await dispatch(setInsurance(resp.data || []));
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: GET_CLAIM_DETAILS_FAILED,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
export const GetClaimNotes = (claimID) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    //await dispatch(setClaimNotes([]));
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/ClaimDetails/ClaimNotesGet?ClaimSID=${claimID}`,
    });
    await dispatch(setClaimNotes(resp.data || []));
  } catch (error) {
    await dispatch(setClaimNotes([]));
    console.log("error ==> ", error);
    dispatch({
      type: CLAIM_NOTE_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const setCharges = (charges) => {
  return {
    type: SET_CHARGES,
    payload: charges,
  };
};
export const setClaimSubmissionHistory = (submissionHistory) => {
  return {
    type: SET_CLAIM_SUBMISSION_HISTORY,
    payload: submissionHistory,
  };
};
export const setClaimDetails = (claimDetails) => {
  return {
    type: SET_CLAIM_DETAILS,
    payload: claimDetails,
  };
};
export const setClaimNotes = (notes) => {
  return {
    type: CLAIM_NOTE,
    payload: notes,
  };
};

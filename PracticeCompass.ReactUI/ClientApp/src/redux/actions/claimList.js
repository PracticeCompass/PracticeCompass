import axios from "axios";
import {
    GET_CLAIM_FILTER_FAILED,
    SET_CLAIM_FILTER,
    SET_GUARANTOR_LIST,
    GET_GUARANTOR_lIST_FAILED,
    SET_CLAIMS,
    GET_CLAIMS_FAILED,
    GETRESET_GUARANTOR_lIST_FAILED,
    SET_CLAIM_DETAILS,
    SET_PHYSICIAN_LIST,
    SET_PHYSICIAN_LIST_FAILED,
    SUBMIT_CLAIMS_FAILED,
    Parse_ERAMessages_FAILED,
} from "../actionTypes/actionTypes";
import { uiStopLoading, uiStartLoading } from "./ui";
import config from "../../../src/config";
export const getclaimListFilters = (filter) => async (dispatch, getState) => {
    try {
        if (filter !== undefined) {
            dispatch(uiStartLoading());
            // await dispatch(setGuarantorList([]));
            //TO:DO call API
            const resp = await axios({
                method: "GET",
                url: `${config.baseUrl}/Filters/FiltersGet?Entity=claim&DisplayName=${filter}`,
            });
            await dispatch(setClaimListFilter(resp.data || []));
        }
    } catch (error) {
        await dispatch(setGuarantorList([]));
        console.log("error ==> ", error);
        dispatch({
            type: GET_CLAIM_FILTER_FAILED,
            payload: error,
        });
    } finally {
        dispatch(uiStopLoading());
    }
};
export const getguarantorList =
    (name, refreshData = true, skip = 0) =>
        async (dispatch, getState) => {
            try {
                let backUpData = [...getState().claimList.guarantorList];
                dispatch(uiStartLoading());
                //await dispatch(setGuarantorList([]));
                //TO:DO call API
                const resp = await axios({
                    method: "GET",
                    url: `${config.baseUrl}/ClaimList/GuarantorGet?entity=${name === null ? "" : name
                        }&skip=${skip}`,
                });
                let copyData = resp.data;
                if (!refreshData) copyData = backUpData.concat(resp.data);
                await dispatch(setGuarantorList(copyData || []));
            } catch (error) {
                await dispatch(setGuarantorList([]));
                console.log("error ==> ", error);
                dispatch({
                    type: GET_GUARANTOR_lIST_FAILED,
                    payload: error,
                });
            } finally {
                dispatch(uiStopLoading());
            }
        };
export const resetGuarantorList = () => async (dispatch, getState) => {
    try {
        dispatch(uiStartLoading());
        await dispatch(setGuarantorList([]));
    } catch (error) {
        console.log("error ==> ", error);
        dispatch({
            type: GETRESET_GUARANTOR_lIST_FAILED,
            payload: error,
        });
    } finally {
        dispatch(uiStopLoading());
    }
};
export const getclaims =
    (searchCriteria, refreshData = true) =>
        async (dispatch, getState) => {
            try {
                dispatch(uiStartLoading());
                let backUpData = [...getState().claimList.claims];
                //await dispatch(setClaims([]));
                const resp = await axios({
                    method: "GET",
                    url: `${config.baseUrl}/ClaimList/ClaimGridGet?PatientID=${searchCriteria.PatientID
                        }&PracticeID=${searchCriteria.PracticeID}&DOSType=${searchCriteria.DOSType
                        }&PhysicianID=${searchCriteria.PhysicianID}&GuarantorID=${searchCriteria.GurantorID
                        }&DOSvalue=${searchCriteria.DOSvalue ? searchCriteria.DOSvalue : ""
                        }&ToDOSvalue=${searchCriteria.ToDOSvalue ? searchCriteria.ToDOSvalue : ""
                        }&PatientClass=${searchCriteria.PatientClass ? searchCriteria.PatientClass : ""
                        }&InsuranceType=${searchCriteria.InsuranceType}&InsuranceID=${searchCriteria.InsurancID
                        }&BillNumber=${searchCriteria.BILLNUMBER ? searchCriteria.BILLNUMBER : ""
                        }&ClaimIcnNumber=${searchCriteria.ClaimIcnNumber}&ClaimValue=${searchCriteria.ClaimValue
                        }&Age=${searchCriteria.Age}&Batch=${searchCriteria.Batch
                        }&CoverageOrder=${searchCriteria.InsuranceOrder}&InsuranceStatus=${searchCriteria.InsuranceStatus
                        }&IncludeCompletedClaims=${searchCriteria.completedClaims
                        }&IncludeCashClaims=${searchCriteria.CashClaims}&IncludeVoidedClaims=${searchCriteria.VoidedClaims
                        }&Rejections=${searchCriteria.Rejections}&Denials=${searchCriteria.Denials
                        }&PastDue=${searchCriteria.PastDue}&TimelyFilling=${searchCriteria.TimelyFilling}&Skip=${searchCriteria.Skip
                        }&SortColumn=${searchCriteria.SortColumn ? searchCriteria.SortColumn : ""
                        }&SortDirection=${searchCriteria.SortDirection ? searchCriteria.SortDirection : ""
                        }`,
                });
                let copyData = resp.data;
                if (!refreshData) copyData = backUpData.concat(resp.data); //resp.data.concat(backUpData);
                await dispatch(setClaims(copyData || []));
            } catch (error) {
                await dispatch(setClaims([]));
                console.log("error ==> ", error);
                dispatch({
                    type: GET_CLAIMS_FAILED,
                    payload: error,
                });
            } finally {
                dispatch(uiStopLoading());
            }
        };
export const getPhysicianList =
    (name, refreshData, skip) => async (dispatch, getState) => {
        try {
            dispatch(uiStartLoading());
            let backUpData = [...getState().claimList.physicians];
            //await dispatch(setPhysicians([]));
            //TO:DO call API
            const resp = await axios({
                method: "GET",
                url: `${config.baseUrl}/ClaimList/PhysicianGet?sortname=${name === null ? "" : name
                    }&skip=${skip}`,
            });
            //await dispatch(setPhysicians(resp.data || []));
            let copyData = resp.data;
            if (!refreshData) copyData = backUpData.concat(resp.data);
            await dispatch(setPhysicians(copyData || []));
        } catch (error) {
            await dispatch(setPhysicians([]));
            console.log("error ==> ", error);
            dispatch({
                type: SET_PHYSICIAN_LIST_FAILED,
                payload: error,
            });
        } finally {
            dispatch(uiStopLoading());
        }
    };
export const resetPhysicianList = () => async (dispatch, getState) => {
    try {
        dispatch(uiStartLoading());
        await dispatch(setPhysicians([]));
    } catch (error) {
        console.log("error ==> ", error);
        dispatch({
            type: SET_PHYSICIAN_LIST_FAILED,
            payload: error,
        });
    } finally {
        dispatch(uiStopLoading());
    }
};
export const ParseERAMessages = () => async (dispatch, getState) => {
    try {
        dispatch(uiStartLoading());
        const resp = await axios({
            method: "GET",
            url: `${config.baseUrl}/ClaimList/ParseERAMessages`,
        });
    } catch (error) {
        console.log("error ==> ", error);
        dispatch({
            type: Parse_ERAMessages_FAILED,
            payload: error,
        });
    } finally {
        dispatch(uiStopLoading());
    }
};
export const SubmitClaims = (claims) => async (dispatch, getState) => {
    try {
        if (claims !== undefined) {
            dispatch(uiStartLoading());
            //await dispatch(setClaimListFilter([]));
            //TO:DO call API
            const resp = await axios({
                method: "GET",
                url: `${config.baseUrl}/ClaimList/SubmitClaims?ClaimSID=${claims}`,
            });
            //await dispatch(setClaimListFilter(resp.data || []));
        }
    } catch (error) {
        console.log("error ==> ", error);
        dispatch({
            type: SUBMIT_CLAIMS_FAILED,
            payload: error,
        });
    } finally {
        dispatch(uiStopLoading());
    }
};
export const setClaims = (claims) => {
    return {
        type: SET_CLAIMS,
        payload: claims,
    };
};
export const setClaimDetails = (claimDetails) => {
    return {
        type: SET_CLAIM_DETAILS,
        payload: claimDetails,
    };
};
export const setGuarantorList = (guarantorList) => {
    return {
        type: SET_GUARANTOR_LIST,
        payload: guarantorList,
    };
};
export const setClaimListFilter = (claimListFilter) => {
    return {
        type: SET_CLAIM_FILTER,
        payload: claimListFilter,
    };
};
export const setPhysicians = (Physicians) => {
    return {
        type: SET_PHYSICIAN_LIST,
        payload: Physicians,
    };
};

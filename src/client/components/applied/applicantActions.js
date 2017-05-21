import * as types from './applicantActionTypes';
import { addError } from '../global/errorActions';

function requestApplicants() {
  return { type: types.REQUEST_APPLICANTS };
}

function receiveApplicants(applicants) {
  return {type: types.RECEIVE_APPLICANTS, applicants};
}

function receiveApplicantsFail(err) {
  return {type: types.RECEIVE_APPLICANTS_FAIL};
}

export function fetchApplicants() {
  return function(dispatch) {
    dispatch(requestApplicants());
    return fetch('/api/applicants')
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(res.statusText);
      })
      .then(applicants => dispatch(receiveApplicants(applicants)))
      .catch(err => {
        dispatch(receiveApplicantsFail(err));
        dispatch(addError(err));
      });
  };
}

export function updateApplicant(applicantId, status) {
  return function(dispatch) {
    return fetch(`/api/applicants/${applicantId}/${status}`, {method: 'PUT'})
      .then(res => {
        if (res.ok) {
          return dispatch(fetchApplicants());
        }
        throw new Error(res.statusText);
      })
      .catch(err => console.log('in the action',err));
  };
}
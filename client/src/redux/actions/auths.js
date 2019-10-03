import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  VALIDATE_FAILURE,
  VALIDATE_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  //SET_CURRENT_USER,
  ADMIN_LOGIN_FAILURE,
  ADMIN_LOGIN_SUCCESS,
  //GET_ERRORS,
  REGISTRATION_FIELD_CHANGE
} from '../types';

//validate

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => {history.push('/')
     dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data
     })
     }) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: REGISTER_FAILURE,
        payload: err
      })
    );
};
//receive otp for phone and email
export const validate = params => dispatch => {
  axios
    .post('/api/users/validate', params)
    .then(res => {
      dispatch({
        type: VALIDATE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: VALIDATE_FAILURE });
    });
};

//Login
export const loginUser = userData => dispatch => {
  axios
    .post('http://localhost:5000/api/users/login', userData)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: err });
      console.log(err);
    });
};

//AdminLogin
export const loginAdmin = (userData, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/users/login', userData)
    .then(res => {history.push('/admin')
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: ADMIN_LOGIN_FAILURE, payload: err });
      console.log(err);
    });
};

export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
  localStorage.removeItem('entrazactoken');
  setAuthToken(false);
};

/* export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
 */
export const emailvalidate = dispatch => {
  axios.post('/getotp');
};

export const registrationFieldChange = data => dispatch => {
  dispatch({ type: REGISTRATION_FIELD_CHANGE, payload: data });
};

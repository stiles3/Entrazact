import { combineReducers } from 'redux';
import auths from './auths';
import errors from './errors';
import registration from './registration';
export default combineReducers({
  auth: auths,
  errors: errors,
  registration
});

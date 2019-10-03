import { REGISTRATION_FIELD_CHANGE } from '../types';

const initialState = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  phontotp: '',
  email_otp: '',
  password: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_FIELD_CHANGE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

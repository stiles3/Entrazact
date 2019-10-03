import {
          AUTH_ERROR,
          LOGIN_FAILURE,
          LOGIN_SUCCESS,
          LOGOUT_SUCCESS,
          REGISTER_FAILURE,
          REGISTER_SUCCESS,
          VALIDATE_FAILURE,
          VALIDATE_SUCCESS,
          VALIDATING,
          SET_CURRENT_USER,
          ADMIN_LOGIN_FAILURE,
          ADMIN_LOGIN_SUCCESS
       }
       from '../types'

      const isEmpty = require("is-empty");

       const initialState = {
        isAuthenticated: false,
        token: localStorage.getItem('entrazactoken'),
        user: {},
        loading: false,
        isAdmin:false
      };

      export default function (state = initialState, action) {
        switch(action.type){
            case VALIDATING:
              return {
                ...state,
                isLoading: true
              }
            case VALIDATE_SUCCESS:
              return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                validated: true,
                phone_number: action.payload['phone_number'],
                register:action.payload['register'],
                login:action.payload['login']
              }
            
            case LOGIN_SUCCESS:
                localStorage.setItem('entrazactoken', action.payload.token)
                return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    isLoading: false,
                    isAdmin:false
                }

           case ADMIN_LOGIN_SUCCESS:
              localStorage.setItem('entrazactoken', action.payload.token)
              return {
                  ...state,
                  ...action.payload,
                  isAuthenticated: true,
                  isLoading: false,
                  isAdmin: true
              }

            case REGISTER_SUCCESS:
                    
                    localStorage.setItem('entrazactoken', action.payload.token)
                    return {
                        ...state,
                        ...action.payload,
                        isAuthenticated: true,
                        isLoading: false,
                        register:true
                    }
                    case SET_CURRENT_USER:
                      return {
                        ...state,
                        isAuthenticated: !isEmpty(action.payload),
                        user: action.payload
                      };
            case AUTH_ERROR:
            case LOGIN_FAILURE:
            case LOGOUT_SUCCESS:
            case ADMIN_LOGIN_FAILURE:
            case VALIDATE_FAILURE:
            case REGISTER_FAILURE:
                localStorage.removeItem('entrazactoken')
                return {
                    ...state,
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                    isAdmin:null
                }
          
            default:
              return state
        }
      }
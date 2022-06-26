import * as ActionTypes from './ActionTypes';


export const Auth = (state={
  isLoading: false,
  errMess:null,
  isAuthenticated:localStorage.getItem('token')?true:false,
  token:localStorage.getItem('token'),
  expiresIn: localStorage.getItem('expiresIn'),
  user:localStorage.getItem('creds')?JSON.parse(localStorage.getItem('creds')):null,
}, action) =>{
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {...state,
                isLoading:true,
                isAuthenticated:false,
                expiresIn: undefined,
                user: action.creds
              }
    case ActionTypes.LOGIN_SUCCESS:
      return {...state,
                isLoading:false,
                errMess:null,
                isAuthenticated:true,
                user:JSON.parse(localStorage.getItem('creds')),
                expiresIn: localStorage.getItem('expiresIn'),
                token:action.token
              }
    case ActionTypes.LOGIN_FAILED:
      return {...state,
                isLoading:false,
                errMess:action.message,
                isAuthenticated:false,
                expiresIn:undefined
              }
    case ActionTypes.LOGOUT_REQUEST:
      return {...state,
                isLoading:true,
                isAuthenticated:true
              }
    case ActionTypes.LOGOUT_SUCCESS:
      localStorage.clear();
      return {...state,
                isLoading:false,
                errMess:null,
                isAuthenticated:false,
                token:null,
                expiresIn:undefined,
                user:null
              }
    case ActionTypes.LOGOUT_FAILED:
          break;
    default:
      return state;
  }
}

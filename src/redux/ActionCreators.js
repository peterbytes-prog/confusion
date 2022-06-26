import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) =>({
  type:ActionTypes.ADD_COMMENT,
  payload:comment
});

export const postComment = (dishId,rating,author,comment) => (dispatch) => {
  const newComment = {
    dishId:dishId,
    rating:rating,
    author: author,
    comment:comment,
  }
  newComment.date = new Date().toISOString();
  const bearer ='Bearer '+localStorage.getItem('token');
  return fetch(baseUrl+'comments',{
    method:'POST',
    body:JSON.stringify(newComment),
    headers:{
      'Content-Type':'application/json',
      'Authorization': bearer
    },
    credentials: 'same-origin'
  })
  .then(response=>{
    if(response.ok){
      return response;
    }else{
      var error = new Error('Error '+response.status+': '+ response.statusText);
      error.response = response;
      throw error;
    }
  }, error=>{
    var errmess = new Error(error.message);
    throw errmess;
  })
  .then(response => response.json())
  .then(response => {alert(JSON.stringify(response)); dispatch(addComment(response))})
  .catch(error=>{console.log('Post comments',error.message); alert('Your comment could not be posted\nError: '+error.message)})
}

export const postFeedback = (formValues) => (dispatch) =>{
  const values = {...formValues,date:new Date().toISOString()};
  return fetch(baseUrl+'feedback',{
    method:'POST',
    body:JSON.stringify(values),
    headers:{
      'Content-Type':'application/json'
    },
    credentials: 'same-origin'
  })
  .then(response=>{
    if(response.ok){
      return response;
    }else{
      var error = new Error('Error '+response.status+': '+ response.statusText);
      error.response = response;
      throw error;
    }
  }, error=>{
    var errmess = new Error(error.message);
    throw errmess;
  })
  .then(response => response.json())
  .then(response => {alert(JSON.stringify(response));})
  .catch(error=>{console.log('Post feedback',error.message); alert('Your feedback could not be posted\nError: '+error.message)})
}

//thunk function to dispatch several action object
export const fetchDishes = () =>(dispatch) =>{
  dispatch(dishesLoading(true));
  return fetch(baseUrl+'dishes')
    .then(response=>{
      if(response.ok){
        return response;
      }else{
        var error = new Error('Error '+response.status+': '+ response.statusText);
        error.response = response;
        throw error;
      }
    }, error=>{
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch( error =>dispatch(dishesFailed(error.message)));
}
export const dishesLoading = () =>({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) =>({
  type: ActionTypes.DISHES_FAILED,
  payload:errmess
})

export const addDishes = (dishes) =>({
  type: ActionTypes.ADD_DISHES,
  payload:dishes
});

export const fetchComments = () =>(dispatch) =>{
  return fetch(baseUrl+'comments')
    .then(response=>{
      if(response.ok){
        return response;
      }else{
        var error = new Error('Error '+response.status+': '+ response.statusText);
        error.response = response;
        throw error;
      }
    }, error=>{
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => {console.log('comment resp', response); return response.json()})
    .then(comments => dispatch(addComments(comments)))
    .catch( error =>dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) =>({
  type: ActionTypes.COMMENTS_FAILED,
  payload:errmess
})

export const addComments = (comments) =>({
  type: ActionTypes.ADD_COMMENTS,
  payload:comments
})
//
export const fetchPromos = () =>(dispatch) =>{
  dispatch(promosLoading(true));
  return fetch(baseUrl+'promotions')
    .then(response=>{
      if(response.ok){
        return response;
      }else{
        var error = new Error('Error '+response.status+': '+ response.statusText);
        error.response = response;
        throw error;
      }
    }, error=>{
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch( error =>dispatch(promosFailed(error.message)));
}
export const promosLoading = () =>({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) =>({
  type: ActionTypes.PROMOS_FAILED,
  payload:errmess
})

export const addPromos = (promos) =>({
  type: ActionTypes.ADD_PROMOS,
  payload:promos
})

export const fetchLeaders = () =>(dispatch)=> {
  dispatch(leadersLoading(true));
  return fetch(baseUrl + 'leaders')
      .then(response=>{
        if(response.ok){
          return response;
        }else{
          var error = new Error('Error '+response.status+': '+ response.statusText);
          error.response = response;
          throw error;
        }
      }, error=>{
        var errmess = new Error(error.message);
        throw errmess;
      })
      .then(response => response.json())
      .then(leaders => dispatch(addLeaders(leaders)))
      .catch( error =>dispatch(leadersFailed(error.message)));
}

const leadersLoading = (bool)=>({
  type: ActionTypes.LEADERS_LOADING,
})
const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload:leaders
})
export const leadersFailed = (errmess) =>({
  type: ActionTypes.LEADERS_FAILED,
  payload:errmess
})


//auth Logining
export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds
  }
}

export  const recieveLogin = ( response ) =>{
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token
  }
}

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILED,
    message
  }
}

export const loginUser = ( creds ) => (dispatch) => {
  dispatch(requestLogin(creds))
  return fetch(baseUrl+'users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  })
  .then(response => {
      if (response.ok){
        return response;
      }else{
        var error = new Error('Error '+response.status)
        error.message = response;
        throw error
      }
    }, error => {
      throw error;
    })
  .then(response => response.json())
  .then( response => {
    if( response.success ){
        localStorage.setItem('token', response.token);
        localStorage.setItem('creds', JSON.stringify({...creds, _id:response._id}));
        localStorage.setItem('expiresIn', new Date(Date.now() + 3600000)); //expires in 1hr
        dispatch(recieveLogin(response));
    }
    else{
        var error = new Error('Error '+ response.status);
        error.message = response;
        throw error;
    }
  })
  .catch( error => dispatch(loginError(error.message)))
}

// Auth logout
export const requestLogout = () =>{
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  }
}
export const logoutUser = () => (dispatch) => {
  dispatch({type: ActionTypes.LOGOUT_REQUEST});
  localStorage.clear()
  dispatch({type: ActionTypes.LOGOUT_SUCCESS});
}


// SIGNUP's
export const requestSignup = () => {
  return ({
    type:  ActionTypes.SIGNUP_REQUEST,
  })
}
export const recieveSignup = ( response ) => {
  return ({
    type:  ActionTypes.SIGNUP_SUCCESS
  })
}
export const signUpError = ( message ) => {
  return ({
    type: ActionTypes.SIGNUP_FAILED,
    message
  })
}

export const signupUser = ( creds ) => ( dispatch ) => {
  dispatch(requestSignup());

  fetch(baseUrl + 'users/login', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  })
  .then(response => {
    if(response.ok){
      return response;
    }else{
      let error = new Error('Error '+response.status);
      error.message = response;
      throw error;
    }
  }, err => {
    throw err
  })
  .then(response => response.json())
  .then(response =>{
    if(response.success){
        dispatch(recieveSignup(response));
    }else{
      var error = new Error('Error '+ response.status);
      error.message = response;
      throw error;
    }
  })
  .catch( error => dispatch(signUpError(error.message)))
}


import {
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_START,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    ACTIVE_USERS,
    ACTIVE_FAIL,
    CLEAR_AUTH,
    CLEAR_AUTH_ERROR,
    CLEAR_ACTIVE_USER,
    CHAT_MESSAGE

} from '../types'


const Initial_State = {
    username : '',
    name : '',
    _id : '',
    requestingLogin : false,
    signedUp : false,
    requestingSignup : false,
    signupErrors : [{
        errorType : '',
        errorLog  : '',
        errorMessage : ''
    }],
   loginErrors : [{
        errorType : '',
        errorLog  : '',
        errorMessage : ''
    }],
    loggedIn : false,
    activeUsers : [],
    activeUsersError : [{
        errorType : '',
        errorLog  : '',
        errorMessage : ''  
    }],
    clearAuthError : [{
        errorType : '',
        errorLog  : '',
        errorMessage : ''  
    }],
    chat : ''
}


const header = { 

    [LOGIN_START] : (state,action) => {
              return {
                  ...state,
                  requestingLogin : true
              }
    },
    [LOGIN_FAIL] : (state,action) => {
        const {errorLog,errorMessage,errorType} = action.payload
            return {
                ...state,
                requestingLogin : false,
                loginErrors : [
                    ...state.loginErrors,
                    errorLog,errorMessage,errorType
                ]
            }
    }  ,
    [CLEAR_AUTH] : (state,action) => {
        const {errorLog,errorMessage,errorType} = action.payload
        return {
            ...state,
            loggedIn :false,username:'',name:'',_id:'',activeUsers:[],loginErrors:[
                ...state,errorLog,errorMessage,errorType
            ]
        }
    }
    ,
    [LOGIN_SUCCESS] : (state,action) => {
        const {username,name,_id} = action.payload

        return {
            ...state,
            username,name,_id,requestingLogin : false,loggedIn : true
        }
             
    },
    [CHAT_MESSAGE] : (state,action) => {
        const {chatMessage} = action.payload
        return {
            ...state,
            chat : chatMessage
        }
    },
     [SIGNUP_START] : (state,action) => {
         return {
             ...state,
             requestingSignup:true
         }
     },
     [SIGNUP_SUCCESS] : (state,action) => {
            return {
                ...state,
                requestingSignup : false,
                signedUp : true
            }
     },
     [SIGNUP_FAIL] : (state,action) => {
         const {errorLog,errorMessage,errorType} = action.payload
         return {
             ...state,
             requestingSignup : false,
             signedUp:false,
             signupErrors : [
                ...state.signupErrors,
             errorLog,errorMessage,errorType
             ]
         }
     },
     [ACTIVE_USERS] : (state,action) => {
         const {allActiveUsers} = action.payload
         return {
             ...state,
             activeUsers :[
                 ...state.activeUsers,
                 allActiveUsers
             ]
         }
     },
     [CLEAR_AUTH_ERROR] : (state,action) => {
        const {errorLog,errorMessage,errorType} = action.payload
        return {
            ...state,
            clearAuthError : [
                ...state.clearAuthError,
                errorLog,errorMessage,errorType
            ]
        }
     },
     [CLEAR_ACTIVE_USER] : (state,action) => {
         return {
            ...state,
            activeUsers :[] 
         }
     } 
     ,
     [ACTIVE_FAIL] : (state,action) => {
         const {errorLog,errorMessage,errorType} = action.payload
         return {
             ...state,
             activeUsersError : [
                 ...state.activeUsersError,
                 errorLog,errorMessage,errorType
             ]
         }
     }
}


export default (state = Initial_State,action) => {
       if(header[action.type]){
            return header[action.type](state,action)
       }
       return state
}
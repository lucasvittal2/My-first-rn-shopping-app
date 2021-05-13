import {LOGIN,SIGNUP,AUTHENTICATE, LOGOUT, SET_DID_TRY_AL} from "../actions/auth";



const initialState = {
    token:null,
    userId:null,
    didTryAutoLogin: false
};

export default (state = initialState, action)=>{
    console.log('token ' + action.token);
    switch(action.type){

        case SET_DID_TRY_AL:
            return {
                ...state,
                didTryAutoLogin:true
            };

        
        case AUTHENTICATE:
            
            return{
                token: action.token,
                userId: action.userId,
                didTryAutoLogin:true
            }
        // case SIGNUP:
        //     return{
        //         token: action.token,
        //         userId: action.userId
        //     }
        case LOGOUT:
            console.log("logout!!");
            return {...initialState, didTryAutoLogin:true};
        default:
            return state;
    }
}

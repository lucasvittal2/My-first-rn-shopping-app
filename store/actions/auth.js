import {AsyncStorage} from 'react-native'

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL  = 'SET_DID_TRY_AL';
let timer;


export const setDidTryAl = ()=>{
  return{
    type:SET_DID_TRY_AL
  };
}
export const authenticate  = (userId,token,expiryTime)=>{
  console.log('token ' + token);
  return dispatch=>{
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token:token
    });
  }
}


export const signup = (email,password)=>{
    return async dispatch=>{
        const response = fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqaFTGwVsRt0uCBWVHYZ_QJVy_VN42t-Y',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
        ).then(()=>{
          const resData =  (response).json();
          console.log('resData  ' + resData);
          if (!response.ok) {
            const errorResData = (response).json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
              message = 'This email exists already!';
            }
            throw new Error(message);
          }
      
          
          // console.log('$$$$$');
          // console.log(resData);
          dispatch(authenticate (resData.localId,resData.idToken,parseInt(resData.expiresIn)*1000));
        });
        
      };
    };

export const login = (email,password)=>{
  return async dispatch=>{
      const response =   fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqaFTGwVsRt0uCBWVHYZ_QJVy_VN42t-Y',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    ).then(()=>{
      const errorResData = (response).json()
      const resData = (response).json();
      console.log('$$$$$$$$');
      console.log('resData  ' + resData);
      console.log('$$$$$$$$');

      if (!response.ok) {


       
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_NOT_FOUND') {
          message = 'This email could not be found!';
        } else if (errorId === 'INVALID_PASSWORD') {
          message = 'This password is not valid!';
        }
        throw new Error(message);
      }
  
      const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000).toISOString();
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);  
      
      //dispatch(authenticate (resData.localId,resData.idToken,parseInt(resData.expiresIn)*1000));
    });
      
    };

    
  };

  export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    
    return { type: LOGOUT };
  };
  
  const clearLogoutTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
  };
  
  const setLogoutTimer = expirationTime=>{
    return dispatch=>{
     timer  = setTimeout(()=>{
        dispatch(logout());
      },expirationTime/1000)  
    }
   
  };

  const saveDataToStorage = (token, userId,expirationDate)=>{
    AsyncStorage.setItem('userData',JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    }))
  }

  
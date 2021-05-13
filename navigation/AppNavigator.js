import React from 'react';
import {useSelector} from 'react-redux';
import {ProductsNavigator} from "./ShopNavigator"
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import {ShopNavigator, AuthNavigator} from './ShopNavigator'
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = props => {
 
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

 console.log("isAuth: " + isAuth)
  


  return (
    <NavigationContainer>
      
        { isAuth && <ShopNavigator/>}
        {!isAuth && didTryAutoLogin && <AuthNavigator/>}
        {!isAuth && !didTryAutoLogin && <StartupScreen/>}
    </NavigationContainer>

  );
};

export default AppNavigator;
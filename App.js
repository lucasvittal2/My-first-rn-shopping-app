import React,{useState} from 'react';
import { Text, View } from 'react-native';
import {createStore,combineReducers, compose, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {composeWithDevTools} from 'redux-devtools-extension';
import cartReducer from './store/reducers/cart';

import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import AppNavigator from './navigation/AppNavigator';



const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders:ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.warn('')}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
    
  );
}
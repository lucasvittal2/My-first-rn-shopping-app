import React,{useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet, Text,AsyncStorage} from 'react-native';
import {useDispatch} from 'react-redux';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth'

const StartScreen = props=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        const tryLogin = async ()=>{
            const userData = AsyncStorage.getItem('userData');
            if(!userData){
               // props.navigation.navagite('Auth');
                dispatch(authActions.setDidTryAl());
                return;
            }
            const transformedData = (userData);
            const {token,userId} = transformedData;
            //const expirationDate= new Date(expiryDate);
            
            if( !token || !userId){
                console.log('**3**');
               // props.navigation.navigate('Auth')
               dispatch(authActions.setDidTryAl());
                return;
            }
            

            const expirationTime = expirationDate.getTime() - new Date().getTime();
           // props.navigation.navigate('Shop');
            dispatch(authActions.Authenticate(userId,token,expirationTime));
            
        };

        tryLogin();
    },
        [dispatch]);
    return(
        <View style={styles.screen}>
            <Text>Loading...</Text>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default StartScreen;
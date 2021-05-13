import React,{useState,useEffect,useCallback, useReducer} from 'react';
import {View,ScrollView,StyleSheet, Alert, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../../store/actions/products'
import Input from '../../components/UI/Input';
import { isLoading } from 'expo-font';
import  Colors  from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state,action)=>{
    if(action.type=== FORM_INPUT_UPDATE){

        const updatedValues = {
            ...state.inputValues,
            [action.inputId]:action.value
        };
        const updatedValidites = {
            ...state.inputValidites,
            [action.inputId]: action.isValid
        }
        let updatedFormIsValid = true;
        for(const key in updatedValidites){
            updatedFormIsValid = updatedFormIsValid && updatedValidites[key];

        }
        return {
            updatedFormIsValid:updatedFormIsValid,
            inputValues: updatedValues
        };

    }
   
    return state;
};

const EditProductsScreen = props=>{

    const [insLoading, setIsLoading] = useState(false);
    const [error, setErrorState] = useState();
;
    const dispatch = useDispatch();
    const [formState,dispatchFormState]=useReducer(formReducer,{inputValues:{
        title:editedProduct? editedProduct.title:'',
        imageUrl:editedProduct? editedProduct.imageUrl:'',
        description: editedProduct? editedProduct.description:'',
        price:''
    }, inputValidites:{
        title: editedProduct? true:false,
        imageUrl: editedProduct? true:false,
        description: editedProduct? true:false,
        price: editedProduct? true:false,

    }, 
    updatedFormIsValid: editedProduct? true:false
});
    const prodId = props.route.params? props.route.productId: null;
 
    const editedProduct = useSelector(state=>state.products.userProducts.find(prod=>prod.id===prodId));


   

    

    // if(prodId){
       
    //     dispatch(
    //         productsActions.updateProduct(
    //           prodId,
    //           formState.inputValues.title,
    //           formState.inputValues.description,
    //           formState.inputValues.imageUrl
    //         )
    //       );
    // }
    // else{
        
    //     dispatch(
    //         productsActions.createProduct(
    //           formState.inputValues.title,
    //           formState.inputValues.description,
    //           formState.inputValues.imageUrl,
    //           +formState.inputValues.price
    //         )
           
    //       );
         
    // }

    useEffect(()=>{
        if(error){
            Alert.alert('An error occurred!',error,[{text:'Okay'}]);
        }
    },[error])

    const submitHandler = useCallback( async () => {

        // if(!formState.inputValidites.title ){
        //     Alert.alert('wrong Input', 'Please check the error on the form',[
        //         {text:'Okay'}
        //     ]);
        //     return; //cancel the execution
        // }
        setErrorState(null);
        setIsLoading(true);
        try{
            if (editedProduct) {
                await dispatch(
                   productsActions.updateProduct(prodId, 
                       formState.inputValues.title, 
                       formState.inputValues.description,  
                       formState.inputValues.imageUrl
                   )
                 );
               } else {
              
                 await dispatch(
                    productsActions.createProduct( 
                       formState.inputValues.title,  
                       formState.inputValues.description,  
                       formState.inputValues.imageUrl,  
                       +formState.inputValues.price)
                 );
       
               }
               props.navigation.goBack();
        }catch(err){
            setErrorState(err.message);

        }
        
        setIsLoading(false);
      
       
      }, [dispatch, prodId, formState]);
    
      useEffect(() => {
        props.navigation.setOptions({
            headerRight:()=>(
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                    title="Save"
                    iconName='md-checkmark'
                    onPress={submitHandler}
                    />
                </HeaderButtons>
            )
        }
        );
      }, [submitHandler]);

      const inputChangeHandler  = useCallback((inputIdentifier,inputValues, inputValidity)=>{
         
          
          dispatchFormState({
              type:FORM_INPUT_UPDATE,
              value: inputValues,
              isValid:inputValidity,
              inputId: inputIdentifier
            });
        },[
            dispatchFormState
        ]);
    
    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator
                size="large"
                color={Colors.primary}
                />
            </View>
        );
    }
    
    return(
        <KeyboardAvoidingView 
        style={{flex: 1}} 
        behavior='padding' 
        keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                    id='title'
                    label="Title"
                    errorText="Please enter a valid title"
                    keyboardType="default"
                    autoCapitalize="senteces"
                    autoCorrect
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue ={editedProduct? editedProduct.title:''}
                    initiallyValid = {!!editedProduct}
                    required

                    
                    />

                
                    <Input
                    id='imageUrl'
                    label="Image Url"
                    errorText="Please enter a valid image url!"
                    keyboardType="default"
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue ={editedProduct? editedProduct.imageUrl:''}
                    initiallyValid = {!!editedProduct}
                    required

                    
                    />
                    {editedProduct? null: 
                    (   <Input
                        id='price'

                        label="Price"
                        errorText="Please enter a valid price"
                        keyboardType="decimal"
                        autoCapitalize="senteces"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        min = {0.1}

        
                        
                        />
                    )}
                    <Input
                    id='description'

                    label="Description"
                    errorText="Please enter a valid description"
                    keyboardType="default"
                    onInputChange={inputChangeHandler}
                    autoCapitalize="senteces"
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    initialValue ={editedProduct? editedProduct.description:''}
                    initiallyValid = {!!editedProduct}
                    required
                    minLenght={5}

                    
                    />
            </View>
            </ScrollView>
        </KeyboardAvoidingView>

       
    );
};
export const screenOptions = navData=>{
    
    
    const routeParams = navData.route.params? navData.route.params:{};
    return{
        headerTitle:navData.route.params.productId?'Edit Product':'Add Product'
        
}
}

const styles =StyleSheet.create({
  
    form:{
        margin:20
    },
    formControl:{},
    label:{
        fontFamily:'open-sans-bold',
        marginVertical:8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1

    },
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default EditProductsScreen;
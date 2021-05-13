import { ActionSheetIOS } from "react-native";
import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import ProductsOverviewScreen from "../../screens/shop/ProductOverviewScreen";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT='CREATE_PRODUCT';
export const UPDATE_PRODUCT='UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';




export const fetchProducts = ()=>{
    return async (dispatch,getState)=>{
        const userId = getState().userId;

        try{
            const response = await fetch('https://rn-complete-guide-e1739-default-rtdb.firebaseio.com/products.json'); 

        if(!response.ok){
            //throw new Error('Something went wrong!');
        }
        
        const  resData = await response.json();
       
        const loadedProducts = [...PRODUCTS];

        for( const key in resData){
            loadedProducts.push(new Product(
                key, 
                action.userProducts, 
                resData[key].title, 
                resData[key].imageUrl, 
                resData[key].description, 
                resData[key].price
                )
            );
        }
        dispatch({type:SET_PRODUCTS, products:loadedProducts, userProducts: loadedProducts.filter(prod=> prod.ownerId === userId)});
        }
        catch(err){
            //send to custom anlytics server
            if(loadedProducts !==0){
                //throw err;
            }
        } 
        

    };
}


export const deleteProduct = productId =>{
    
    return async (dispatch,getState)=>{
        const token = getState().auth.token;
       const response = await fetch(
            `https://rn-complete-guide-e1739-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
                {
                method:'DELETE'
                }
        
            ); 
        dispatch({type:DELETE_PRODUCT, pid: productId});
        if(!response.ok){
          //  throw new Error("Something went wrong!")
        }
    }
   
}

export const createProduct = (title, description,imageUrl,price)=>{
   return  async (dispatch,getState)=>{
       console.log({
           title,title, description,imageUrl,price
       })
    const token = getState().auth.token;7
    const userId = getState().auth.userId;
    const response = await fetch(`https://rn-complete-guide-e1739-default-rtdb.firebaseio.com/products.json?auth=${token}`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            title,
            description,
            imageUrl,
            price,
            onwerId: userId
        })
    }); 
    
    const  resData = await response.json();
    console.log(resData);
    dispatch({
            type:CREATE_PRODUCT,
            pid:id,
            productData:{
                id:resData.name,
                title,
                description,
                imageUrl,
                price,
                onwerId:userId
            }
        });
    } 
}

export const updateProduct =   (id,title, description,imageUrl)=>{
    return async (dispatch,getState)=>{

        console.log(getState());
        const token = getState().auth.token;
       const response  = await fetch(`https://rn-complete-guide-e1739-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
       {
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            title,
            description,
            imageUrl
        })
    }); 



        dispatch({
            type:CREATE_PRODUCT,
            pid:id,
            productData:{
                title,
                description,
                imageUrl
                }
            });
            if(!response.ok){
                //throw new Error("Something went wrong!")
            }
        };
    }
    

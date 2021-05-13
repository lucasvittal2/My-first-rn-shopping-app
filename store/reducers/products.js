import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from '../actions/products';


const initialState = {
    availableProducts: [],
    userProducts: []
};

export default (state = initialState, action) => {

    switch(action.type){


        case SET_PRODUCTS:
            
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            };
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                action.productData.ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
                );
                return{
                    ...state,
                    availableProducts:state.availableProducts.concat(newProduct),
                    userProducts: state.userProducts.concat(newProduct)
                }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod=>prod.id===action.pid);
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price

                 
                 );
                 const updatedUserProducts = [
                     ...state.userProducts
                 ];
                 updatedUserProducts[productIndex] = updatedProduct;
                 const avaibleProductIndex = state.availableProducts.findIndex(
                     prod=>prod.id === action.pid
                 );
                 const updatedAvaibleProducts = [
                     ...state.availableProducts
                 ];
                 updatedAvaibleProducts[productIndex]=updatedProduct;
                 return {
                     ...state,
                     availableProducts: updatedUserProducts
                 }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(products=>products.id!== action.pid),
                availableProducts: state.availableProducts.filter(products=>products.id!== action.pid)
            };
    }
    

    return state;
};
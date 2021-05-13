import React from 'react';
import {ScrollView,View, Text, Image,StyleSheet, Button} from 'react-native';
import  Colors  from '../../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cart';

const ProductDetailsScreen = props=>{


    const productId =props.route.params.productId;
    const seletedProduct = useSelector(state=> state.products.availableProducts.find(prod=>prod.id===productId));

    const dispatch = useDispatch();

    return(
       <ScrollView>
           <Image style = {styles.image} source ={{uri:seletedProduct.imageUrl}}/>
           <View style={styles.actions}>
            <Button title="add to Cart" onPress={()=>{                
                (cartActions.addToCart(seletedProduct));
            }} color={Colors.primary}/>
            <Text style={styles.price}>${seletedProduct.price.toFixed(2)}</Text>
            <Text styles={styles.description}>{seletedProduct.description}</Text>
           </View>
       </ScrollView>
    );
}


export const screenOptions = navData=>{
    return{
        headerTitle: navData.route.params.productId
}

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:300
    },
    actions:{
        marginVertical:10,
        alignItems:'center'
    }, 
    price:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:20
    },
    description:{
        fontSize:14,
        textAlign:'center',
        marginHorizontal:20
    }
});


export default ProductDetailsScreen;

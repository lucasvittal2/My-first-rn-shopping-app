import React,{useState} from 'react';
import {View,Text,FlatList,StyleSheet,Button, ActivityIndicator} from 'react-native';
import Colors from '../../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import Card from '../../components/UI/Card'

const CartScreen = props=>{

    const [isLoading,setIsLoading] = useState(false);
    const cartTotalAmount = useSelector(state=>state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
          transformedCartItems.push({
            productId: key,
            productTitle: state.cart.items[key].productTitle,
            productPrice: state.cart.items[key].productPrice,
            quantity: state.cart.items[key].quantity,
            sum: state.cart.items[key].sum
          });
        }
        return transformedCartItems.sort((a,b)=>a.productId > b.productId?1:-1);
      });
      const dispatch = useDispatch();

      const sendOrderHandler= async ()=>{
        
       setIsLoading(true);  
       await  dispatch(orderActions.addOrder(cartItems,cartTotalAmount));
       console.log('%%%')
       setIsLoading(false);
                    
      }

    return(
        <View >
                <Text>WOKING CART</Text>
                <Card style={styles.summary}>
                    <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)<0?0:Math.round (cartTotalAmount.toFixed(2))*100/100}</Text></Text>
                    
                   
                    {isLoading? 
                    <ActivityIndicator 
                    size='small' 
                    color={Colors.primary}
                    /> : 
                    <Button 
                    title='Order Now' 
                    onPress={sendOrderHandler} 
                    />
                    }
                </Card>
                <View>
                    <FlatList 
                    data={cartItems}
                     keyExtractor={item=>item.productId}
                      renderItem={itemData=>(<CartItem
                       quantity={itemData.item.quantity}
                       title={itemData.item.productTitle}
                       amount={itemData.item.sum}
                      
                       onRemove={()=>{
                            console.log("on removing...");
                            return dispatch(cartActions.removeFromCart(itemData.item.productId));
                       }}
                       />)
                    } 
                       />
                </View>
        </View>


    );
}
export const screenOptions  = {
    headerTitle: 'Your Cart'
};

styles = StyleSheet.create({
    screen:{
        margin:20,

    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding:10,

    },
    summaryText:{
        // fontFamily:'open-sans-bold',
        fontSize:18,
    },
    amount:{
        color:Colors.accent
    }
});


export default CartScreen;
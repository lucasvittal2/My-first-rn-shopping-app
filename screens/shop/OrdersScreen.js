import React, {useEffect, useState} from 'react';
import { FlatList,Platform,StyleSheet,View, ActivityIndicator,Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';


const OrdersScreen = props=>{
    const [isLoading, setIsLoading]  = useState(false);
    const orders = useSelector(state=>state.orders.orders);
    const dispatch = useDispatch();

    
    

    useEffect( async ()=>{
    setIsLoading(true);
    
    await dispatch(ordersActions.fetchOrders()).
    setIsLoading(false);
      
    },[dispatch])
    
   
    if(orders.length ===0){
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>
          No order found, maybe start ordering some?
        </Text>
      </View>
    }
    else if(isLoading){
      return (
        <View  style={styles.centered}>
          <ActivityIndicator size='large' color={Colors.primary}/>
        </View>
      );
    }
    
    return <FlatList 
    data={orders} 
    keyExtractor={item => item.id}
     renderItem={itemData=><OrderItem 
      amount={itemData.item.totalAmount}
      date={itemData.item.readableDate}
      items={itemData.item.items}
      />}

      
      />
}

export const screenOptions = navData => {
    return {
      headerTitle: 'Your Orders',
      headerLeft: ()=>(
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
    };
  };

const styles= StyleSheet.create({
  centered:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});
export default OrdersScreen;




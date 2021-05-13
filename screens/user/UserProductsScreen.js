import React from 'react';
import { FlatList,Platform,Button,Alert } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';



const UserProductScreen = props=>{
    const userProducts = useSelector(state=>state.products.userProducts);
    const dispatch = useDispatch();
    const editProductHandler = (id)=>{
        props.navigation.navigate('EditProduct', {productId:id});
    };
    const deleteHandler = (id)=>{
      Alert.alert('Are you sure?', 'Do you reallly want to delete this item?',[
          {text:'No',style:'default'},
          {text:'yes',style:'destructive', onPress:()=>{
            dispatch(productsActions.deleteProduct(id));
              
          }}
      ])
  };
  if( userProducts.lengtj ===0){
    return (
      (<View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
        <Text >
          No products found! Maybe create some
        </Text>
      </View>)
    )
  }
    return (<FlatList 
    data={userProducts}
     keyExtractor={item=>item.id} 
     renderItem={itemData => {
       
      return(
       <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button color={Colors.primary} title="Edit" onPress={() => {
              editProductHandler(itemData.item.id)
          }} />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
        );
    }}

     />);
};

export const screenOptions  = navData=>{
    return {
    headerTitle: "Your Products",
    headerLeft: ()=>(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}> 
        <Item
            title="Cart"
            iconName="md-cart"
            onPress={() => {
                
                navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight:(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}> 
        <Item
            title="Cart"
            iconName="md-create"
            onPress={() => {
                
                navData.navigation.navigate('EditProduct');
            }}
          />
        </HeaderButtons>
      )
      
    }
}

export default UserProductScreen;
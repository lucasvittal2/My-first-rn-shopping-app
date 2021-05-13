import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Platform, Button} from 'react-native';
//import {Ionicons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
          <View style={styles.itemData}>
            <Text style={styles.quantity}>{props.quantity} </Text>
            <Text style={styles.mainText}>{props.title}</Text>
          </View>
          <View style={styles.itemData}>
            <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
            
            {props.deletable && <TouchableOpacity  style={styles.deleteButton}>
            <Button title="Remove" color='red' onPress={props.onRemove}/>
            </TouchableOpacity>
            }
          </View>
        </View>
      );
  };

const styles = StyleSheet.create({
    cartItem:{
        padding:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20

    },
    itemData:{
        flexDirection:'row',
        alignItems:'center',

    },
    quantity:{
        fontFamily:'open-sans',
        color:"#888",
        fontSize:16
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:16
    },
    amount:{ 
        fontFamily:'open-sans-bold',
        fontSize:16
    },
    deleteButton:{
        marginLeft:20,

    }
});


export default CartItem;
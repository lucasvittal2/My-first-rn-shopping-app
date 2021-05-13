import React from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import Card from '../UI/Card';

const ProductItem = props=>{

    let TouchableCmp = TouchableOpacity;
    if(Platform.OS ==='android' && Platform.Version >=21){
        TouchableCmp = TouchableNativeFeedback
    }
    return (
        
            <Card style={styles.product}>
                <View>
                    <View style={styles.touchable}>
                        
                        <TouchableCmp onPress={props.onSelect} useForeground>
                            <View>
                                <View style={styles.imageContainer}>
                                    <Image source={{uri:props.image}} style={styles.image}/>
                                </View>
                                <View style={styles.details}>
                                    <Text style={styles.title}>{props.title}</Text>
                                    <Text style={styles.price}>${props.price? props.price.toFixed(2):0.00}</Text>
                                </View>
                                
                                <View style={styles.actions}>
                                   {props.children}

                                </View>
                        </View>
                        </TouchableCmp>
                    </View>
                </View>
            </Card>
        
    );
}


const styles = StyleSheet.create({
    product:{
        
        height:320,
        margin:20,
        overflow:'hidden'
    },
    image:{
        width:'100%',
        height:'95%'
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:18,
        marginVertical:4
    },
    price:{
        fontFamily:'open-sans-bold',
        fontSize:14,
        color:'#888'
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'10%',
        paddingHorizontal:20,
        paddingVertical:0,
        fontFamily:'open-sans'

    },
    details:{
        alignItems:'center'
    },
    imageContainer:{
        width:'100%',
        height:'70%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    },
    touchable:{
        borderRadius:10,
        overflow:'hidden'

    }
});


export default ProductItem;
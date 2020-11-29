import React, {Component} from 'react'
import { View, Text, StyleSheet,Dimensions, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import {AntDesign} from 'react-native-vector-icons'

export default class CardHeader extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={this.styles.headerContainer}>
                <TouchableOpacity onPress={this.props.onPressL}>
                    <AntDesign size={35} style={{
                        color:(this.props.color_left ? this.props.color_left : 'black')
                        }} name="arrowleft"/>
                </TouchableOpacity>
                    <Text style={this.styles.headerBtn2}>{this.props.mes}</Text>
                <TouchableOpacity onPress={this.props.onPressR}>    
                    <AntDesign size={35} style={{
                        color:(this.props.colorR? this.props.colorR: 'black')
                        }} name="arrowright"/>
                </TouchableOpacity>
                </View>
        );
    }

    styles = StyleSheet.create({
        headerContainer: {
            width:this.props.width ? this.props.width : Dimensions.get('window').width *0.8,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems: 'center', 
            borderColor:'#ccc', 
            borderTopStartRadius: 10,
            borderTopEndRadius: 10, 
            borderWidth: 1,
            maxWidth:this.props.maxWidth ? this.props.maxWidth :  Dimensions.get('window').width *0.8
        },
        headerBtn1: {
            padding:10, 
            borderRightWidth:1,
            borderTopLeftRadius:10, 
            
        },
        headerBtn2: {
            padding:10, 
            backgroundColor: 'white',
            fontSize:18
        },
        headerBtn3: {
            padding:10,
            backgroundColor: 'white'
        }


    });

}


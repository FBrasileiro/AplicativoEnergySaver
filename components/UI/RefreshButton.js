import React, {Component} from 'react'
import { View,Text, TouchableOpacity } from 'react-native'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import Colors from '../../constants/Colors'

export default class RefreshButton extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{justifyContent:'space-between', flexDirection:'row', alignContent:'center'}}>
                <Text style={{fontSize:20, paddingVertical:10, marginLeft:20,paddingHorizontal:40}}>{this.props.children}</Text>
                <TouchableOpacity activeOpacity={0.8}
                 style={{
                    backgroundColor:Colors.bg1, 
                    borderRadius:30, 
                    borderColor:'black', borderWidth:1, 
                    padding:5, flexDirection:'row', 
                    justifyContent:'flex-end',
                    width:29,
                    height:29
                }} onPress={this.props.onPress}>
                    <View>
                    <MaterialCommunityIcons size={15} name='reload'/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }



}

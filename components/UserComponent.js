import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Card from '../components/UI/Card'
export default class ShowUser extends Component{
    constructor(props){
        super(props)
    }

    styles = StyleSheet.create({
        card:{
            borderColor: 'black',
            borderWidth: 1,
            padding: 10
        }
    })

    render(){
        return(
            <Card>
                <View style={{alignContent: 'center', justifyContent:'space-between'}}>
                    <Text>TESTE</Text>

                    <Text>TESTE</Text>
                </View>
                
            </Card>
            
        )
        
    }

}
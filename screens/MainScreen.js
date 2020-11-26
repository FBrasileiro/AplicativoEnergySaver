import React, {Component, useState, useEffect} from 'react';
import {logout} from '../store/actions/auth'

import {View, Text, StyleSheet, Button, FlatList} from 'react-native';
import api from '../api'
import ShowUser from '../components/UserComponent'


export default class MainScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            data_u: {},
        }
    }

    componentDidMount(){
        this.set()
        // this.getData()
    }

    getData = async () => {
        let response = await api.get('debug/data')
        console.log("RESPONSE: ", response.data)

        this.setState({ data_u: response.data.message})

        console.log("STATE DATA: ", this.state.data_u);
    }

    set = async () => {
        await this.setState({teste: 'aaaa'})
        console.log(this.state.teste)
        
    }
    logoutHandler = () => {
        logout(this.props.navigation);
    }

    

    render(){
        return(
            <View style={{padding:50, flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <ShowUser />
            <Button title="Logout" onPress={this.logoutHandler}/>
            </View>
        );
    }
}
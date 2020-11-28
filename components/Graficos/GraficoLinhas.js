import React, {Component} from 'react'
import { Dimensions } from 'react-native'
import {LineChart} from 'react-native-chart-kit'

export default class GraficoLinhas extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <LineChart data={{
                labels:['J','F','M', 'A','M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
                datasets:[{
                    data: this.props.data,
                    strokeWidth: 2,
                }]
            }}
            width={Dimensions.get('window').width * 0.8 }
            height={220}
            chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
            }}
            style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            
        );

    }
}
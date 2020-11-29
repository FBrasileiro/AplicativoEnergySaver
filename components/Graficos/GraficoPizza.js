import React, {Component} from 'react'
import { Dimensions } from 'react-native'
import { LineChart, ProgressChart, PieChart } from 'react-native-chart-kit'
import Colors from '../../constants/Colors'

export default class GraficoPizza extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <PieChart
                data={this.props.data}
                width={Dimensions.get('window').width *0.8}
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
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                />
        );
    }
}
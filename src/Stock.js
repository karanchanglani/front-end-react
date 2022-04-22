import React from 'react';
import Plot from 'react-plotly.js';


class Stock extends React.Component {
    // contructor method to store state
    constructor(props){ 
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: []
        }
    }

    componentDidMount(){
        this.fetchStock();
    }

    fetchStock(){
        const pointerToThis = this;
        console.log(pointerToThis);
        const API_key = '1F39W6NEG5ZWFPYR';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=compact&apikey=${API_key}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];


        fetch(API_Call).then(
            function(response){
                return response.json(); // returning data in json format
            }
        ).then(
            function(data){
                console.log(data);

                for(var key in data['Time Series (Daily)']){
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Times Series (Daily)']
                    [key]['1.open']);
                }

                pointerToThis.setState({
                    stockChartXValues: stockChartXValuesFunction,
                    stockChartYValues:stockChartYValuesFunction
                });
            }
        )
    }
    
    
    render(){
        return(
            <div>
                <h1>IBM STOCK</h1>
                <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 800, height: 500, title: 'IBM STOCK PRICES'}}
        />
            </div>
        )
    }
}

export default Stock;
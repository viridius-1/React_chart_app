import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Spinner} from 'react-bootstrap';
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
BarElement,
Title,
Tooltip,
Legend,
} from 'chart.js';

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
BarElement,
Title,
Tooltip,
Legend
);


export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            items: {},
            DataisLoaded: false
        };
    }

    async componentDidMount() {
        fetch(
                "https://imdb8.p.rapidapi.com/actors/get-awards?nconst=nm0001667", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "imdb8.p.rapidapi.com",
                    "x-rapidapi-key": "acda28562bmsh67cfc64f8bda89fp1d9af4jsn84e3c8f1417a"
                }
            })
            .then((res) => res.json())
            .then((json) => {
                let result = json.resource.awards.map(function(a){return {year: a.year, awards: a.instanceWithinYear}})
                let res = [];

                result.forEach(function (a) {
                    if (!this[a.year]) {
                        this[a.year] = { year: a.year, awards: 0 };
                        res.push(this[a.year]);
                    }
                    this[a.year].awards += a.awards;
                }, Object.create(null));

                res = res.map(a=> a.awards)
                    
                this.setState({
                    items: {
                        labels: [...new Set(json.resource.awards.map(val => val.year))],
                        datasets: [
                            {
                                label: 'Number of awards won',
                                backgroundColor: 'rgba(75,192,192,1)',
                                borderColor: 'rgba(0,0,0,1)',
                                borderWidth: 2,
                                data: res
                            }
                        ]
                    },
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        return (
            <div>
                {
                    DataisLoaded
                    ? 
                    <Bar
                        data={items}
                        options={{
                            title:{
                                display:true,
                                text:'Number of awards won',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            }
                        }}
                    /> 
                    :
                    <Spinner animation="border" variant="primary" /> 
                }
            </div>
        );
    }
}
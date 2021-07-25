import {useEffect} from 'react';
import Wrapper from "../components/Wrapper";
import * as c3 from 'c3';
import axios from 'axios';

const Dashboard = () => {
    useEffect(() => {
        (
            async () => {
                const chart = c3.generate({
                    bindto: '#chart',
                    data: {
                        x: 'x',
                        xFormat: '%d-%m-%Y', // how the date is parsed
                        columns: [
                            ['x'],
                            ['Sales'],
                        ],
                        types: {
                            Sales: 'bar'
                        }
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                format: '%d-%m-%Y' // how the date is displayed
                            }
                        }
                    }
                });

                const {data} = await axios.get('chart-sales');

                chart.load({
                    columns: [
                        ['x', ...data.map((r: any) => r.date)],
                        ['Sales', ...data.map((r: any) => r.sum)]
                    ]
                })
            }
        )()
    }, []);

    return (
        <Wrapper>
            <h2>Daily Sales</h2>
            <div id="chart"/>
        </Wrapper>
    )
}

export default Dashboard;
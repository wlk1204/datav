import React from 'react';
import axios from 'axios';
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, Legend } from 'recharts';

import styles from './index.less';

class ReChartsOthersChart extends React.Component {
  constructor(props) {
    super(props);
    this.widthNum = 0.25;
    this.heightNum = 0.25;
    this.state = {
      barchartData: [],
      width: null,
      height: null,
      data: [{ name: 'A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'G', uv: 3490, pv: 4300, amt: 2100 }],
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.getDimension();
    });
    this.getDimension();
    this.loop();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  loop = () => {
    this.getData();
    this.timer = setInterval(() => {
      this.getData();
    }, 10000)
  }

  getData = () => {
    axios.get('http://rap2api.taobao.org/app/mock/124060/line')
      .then((response) => {
        this.setState({
          data: response.data.line,
        })
      })
      .catch((err) => {
        console.log(err)
      });
  }

  getDimension = () => {
    const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
    );

    const height = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0,
    );
    this.setState({
      width, height,
    })
  }

  basic = () => {
    const { width, height, data } = this.state;
    return (
      <div className={styles.every} style={{ margin: `${height * 0.01}px ${width * 0.01}px` }}>
        <h2>ScatterChart</h2>
        <ScatterChart
          style={{ border: '1px solid #eee' }}
          width={width * this.widthNum}
          height={height * this.heightNum}
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="pv" name="stature" unit="天" />
          <YAxis dataKey="uv" name="weight" unit="kg" />
          <ZAxis dataKey="amt" range={[64, 144]} name="score" unit="km" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="A school" data={data} fill="#8884d8" />
          {/* <Scatter name="B school" data={data} fill="#82ca9d" /> */}
        </ScatterChart>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.recharts_others}>
        {this.basic()}
      </div>
    )
  }
}

export default ReChartsOthersChart;

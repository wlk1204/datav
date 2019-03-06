import React from 'react';
import { Button } from 'antd';
import axios from 'axios';

import BarChart from '../../../components/d3-component/barchart';
import BarChart2 from '../../../components/d3-component/barchart2';
import styles from './index.less';

class D3 extends React.Component {
  constructor(props) {
    super(props);
    this.widthNum = 0.25;
    this.heightNum = 0.25;
    this.state = {
      barchartData: [{
        country: '中国',
        number: 600,
      }, {
        country: '美国',
        number: 400,
      }, {
        country: '法国',
        number: 500,
      }, {
        country: '巴西',
        number: 300,
      }, {
        country: '俄罗斯',
        number: 400,
      }, {
        country: '韩国',
        number: 300,
      }, {
        country: '英国',
        number: 280,
      }, {
        country: '澳大利亚',
        number: 320,
      }, {
        country: '新西兰',
        number: 400,
      }, {
        country: '荷兰',
        number: 200,
      }, {
        country: '德国',
        number: 700,
      }, {
        country: '意大利',
        number: 800,
      }],
      width: null,
      height: null,
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

  loop = () => {
    this.getData();
    this.timer = setInterval(() => {
      this.getData();
    }, 30000)
  }

  getData = () => {
    axios.get('http://rap2api.taobao.org/app/mock/21415/num')
      .then((resp) => {
        this.setState({
          barchartData: resp.data.data,
        })
      })
      .catch((err) => {
        console.log(err)
      });
  }

  barchart = () => {
    const { barchartData, width, height } = this.state;
    return (
      <div className={styles.every} style={{ margin: `${height * 0.01}px ${width * 0.01}px` }}>
        <h2>BarChart</h2>
        <BarChart style={{ width: `${width * this.widthNum}px`, height: `${height * this.widthNum}px`, border: '1px solid #eee', padding: `${width * 0.01}px` }} data={barchartData} width={width * this.widthNum} height={height * this.widthNum} />
      </div>
    );
  }

  barchart2 = () => {
    const { barchartData, width, height } = this.state;
    return (
      <div className={styles.every} style={{ margin: `${height * 0.01}px ${width * 0.01}px` }}>
        <h2>BarChart2</h2>
        <BarChart2 style={{ width: `${width * this.widthNum}px`, height: `${height * this.widthNum}px`, border: '1px solid #eee', padding: `${width * 0.01}px` }} data={barchartData} width={width * this.widthNum} height={height * this.widthNum} />
      </div>
    );
  }

  render() {
    return (
      <div id="d3" className={styles.d3}>
        {this.barchart()}
        {this.barchart2()}
      </div>
    )
  }
}

export default D3;

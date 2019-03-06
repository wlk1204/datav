import React from 'react';
import axios from 'axios';

import styles from './index.less';
import PieChart from '../../../components/d3-component/piechart';
import PieChart2 from '../../../components/d3-component/piechart-2';

class D3 extends React.Component {
  constructor(props) {
    super(props);
    this.widthNum = 0.25;
    this.heightNum = 0.25;
    this.state = {
      piechartData: [{
        name: 'A', num: 30,
      }, {
        name: 'B', num: 60,
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
    this.firstTime = setTimeout(() => {
      this.loop();
    }, 8000)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.firstTime) {
      clearInterval(this.firstTime);
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
    }, 10000)
  }

  getData = () => {
    axios.get('http://rap2api.taobao.org/app/mock/124060/pie')
      .then((resp) => {
        this.setState({
          piechartData: resp.data.data,
        })
      })
      .catch((err) => {
        console.log(err)
      });
  }

  basic = () => {
    const { width, height, piechartData } = this.state;
    return (
      <div className={styles.every} style={{ margin: `${height * 0.01}px ${width * 0.01}px` }}>
        <h2>Basic</h2>
        <PieChart
          style={{ width: `${width * this.widthNum}px`, height: `${height * this.widthNum}px`, border: '1px solid #eee', padding: `${width * 0.01}px` }}
          width={width * this.widthNum}
          height={height * this.heightNum}
          data={piechartData}
        />
      </div>
    );
  }

  piechart = () => {
    const { width, height, piechartData } = this.state;
    return (
      <div className={styles.every} style={{ margin: `${height * 0.01}px ${width * 0.01}px` }}>
        <h2>PieChart</h2>
        <PieChart2
          style={{ width: `${width * this.widthNum}px`, height: `${height * this.widthNum}px`, border: '1px solid #eee', padding: `${width * 0.01}px` }}
          width={width * this.widthNum}
          height={height * this.heightNum}
          data={piechartData}
        />
      </div>
    );
  }

  render() {
    return (
      <div id="d3" className={styles.d3}>
        {this.basic()}
        {this.piechart()}
        {/* <svg className="a-svg" width="2000" height="200">
          <line style={{ stroke:'rgb(255,0,0)', strokeWidth:2 }} x1="10" y1="10" x2="10" y2="100"></line>
          <line style={{ stroke:'rgb(255,0,0)', strokeWidth:2 }} x1="1048" y1="10" x2="1048" y2="100"></line>
        </svg> */}
      </div>
    )
  }
}

export default D3;

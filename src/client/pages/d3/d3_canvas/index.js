import React from 'react';
import D3Canva from '../../../components/d3-component/d3_canvas';
import D3Canva1 from '../../../components/d3-component/d3_canvas1';
import styles from './index.less';

class D3Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.widthNum = 0.25;
    this.heightNum = 0.25;
    this.state = {
      width: null,
      height: null,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.getDimension();
    });
    this.getDimension();
    // this.loop();
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

  canvas = () => {
    const { width, height } = this.state;
    return (
      <div className={styles.every} style={{ margin: `${height * 0.01}px ${width * 0.01}px` }}>
        <h2>D3Canvas-konva</h2>
        <D3Canva style={{ width: `${width * this.widthNum}px`, height: `${height * this.widthNum}px`, border: '1px solid #eee', padding: `${width * 0.01}px` }} width={width * this.widthNum} height={height * this.widthNum} />
      </div>
    );
  }

  canvas1 = () => {
    const { width, height } = this.state;
    return (
      <div className={styles.every} style={{ margin: `${height * 0.01}px ${width * 0.01}px` }}>
        <h2>D3Canvas-fabric</h2>
        <D3Canva1 style={{ width: `${width * this.widthNum}px`, height: `${height * this.widthNum}px`, border: '1px solid #eee', padding: `${width * 0.01}px` }} width={width * this.widthNum} height={height * this.widthNum} />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.d3}>
        {this.canvas()}
        {this.canvas1()}
      </div>
    );
  }
}

export default D3Canvas;

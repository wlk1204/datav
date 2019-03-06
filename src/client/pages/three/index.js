import React from 'react';

import styles from './index.less';
import Demo1 from '../../components/three-component/three-1';

class Three extends React.Component {
  constructor(props) {
    super(props);
    this.widthNum = 0.3;
    this.heightNum = 0.3;
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

  three1 = () => {
    const { width, height } = this.state;
    return (
      <div className={styles.every} style={{ margin: `${height * 0.01}px ${width * 0.01}px` }}>
        <h2>three-1</h2>
        <Demo1 style={{ width: `${width * this.widthNum}px`, height: `${height * this.widthNum}px`, border: '1px solid #eee', padding: `${width * 0.01}px` }} width={width * this.widthNum} height={height * this.widthNum} />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.three}>
        {this.three1()}
      </div>
    )
  }
}

export default Three;

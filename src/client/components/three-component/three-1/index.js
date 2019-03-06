import React from 'react';
import render from './render.js';

class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.preData = [];
  }

  componentDidMount() {
    this.getNum();
  }

  getNum = () => {
    this.timer = requestAnimationFrame(this.getNum);
    const { width, height } = this.props;
    if (width && height) {
      cancelAnimationFrame(this.timer);
      const { width, height } = this.props
      this.option = { width: width * 0.9, height: height * 0.9 };
      render.init(this.option);
      render.update();
    }
  }

  render() {
    const { width, height, style } = this.props;
    return (
      <div style={style} id="cent" ref={(node) => { this.barChart = node; }} />
    );
  }
}

export default Demo1;

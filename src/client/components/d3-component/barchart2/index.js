import React from 'react';
import { fromJS } from 'immutable';
import render from './render';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    render.drawChart(this.barChart, this.props.data, this.option);
  }

  shouldComponentUpdate(nextProps) {
    if (!fromJS(nextProps).equals(fromJS(this.props))) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    render.animate(this.barChart, this.props.data, this.option);
  }

  render() {
    const { width, height, style } = this.props;
    this.option = { width: width * 0.9, height: height * 0.9 };
    return (
      <div style={style} ref={(node) => { this.barChart = node; }} />
    );
  }
}

export default BarChart;

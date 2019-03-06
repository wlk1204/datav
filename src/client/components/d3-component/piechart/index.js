import React from 'react';
import { fromJS } from 'immutable';
import render from './render';

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.oldData = [];
  }

  componentDidMount() {
    render.drawChart(this.pieChart, this.props.data, this.option);
  }

  shouldComponentUpdate(nextProps) {
    if (!fromJS(nextProps).equals(fromJS(this.props))) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    render.animate(this.pieChart, this.oldData, this.props.data, this.option);
    this.oldData = this.props.data || [];
  }

  render() {
    const { width, height, style } = this.props;
    this.option = { width: width * 0.9, height: height * 0.9, colors: ['#4AE0FF', '#4A7BFF'] };
    return (
      <div style={style} ref={(node) => { this.pieChart = node; }} />
    );
  }
}

export default PieChart;

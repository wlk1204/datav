import React from 'react';
import { fromJS } from 'immutable';
import render from './render';

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.oldData = [];
    this.data = [{
      name: 'A', num: 30,
    }, {
      name: 'B', num: 60,
    }];
  }

  componentDidMount() {
    const { data } = this.props;
    render.draw(this.chart, this.data, this.option);
  }

  shouldComponentUpdate(nextProps) {
    if (!fromJS(nextProps).equals(fromJS(this.props))) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const { data } = this.props;
    render.animate(this.chart, this.oldData, this.data, this.option);
    this.oldData = data || [];
  }

  render() {
    const { width, height, style } = this.props;
    this.option = { width: width * 0.9, height: height * 0.9, colors: ['#4AE0FF', '#4A7BFF'] };
    return (
      <div style={style} ref={(node) => { this.chart = node; }} />
    );
  }
}

export default PieChart;

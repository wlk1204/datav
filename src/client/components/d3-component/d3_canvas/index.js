import React from 'react';
import { fromJS } from 'immutable';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import render from './render';

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.oldData = [];
  }

  componentDidMount() {
    const { data } = this.props;
    // render.draw(this.chart, data, this.option);
  }

  shouldComponentUpdate(nextProps) {
    if (!fromJS(nextProps).equals(fromJS(this.props))) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const { data } = this.props;
    // render.animate(this.chart, this.oldData, data, this.option);
    this.oldData = data || [];
  }

  render() {
    const { width, height, style } = this.props;
    this.option = { width: width * 0.9, height: height * 0.9, colors: ['#4AE0FF', '#4A7BFF'] };
    return (
      <div style={style} ref={(node) => { this.chart = node; }}>
        <Stage width={width * 0.9} height={height * 0.9}>
          <Layer>
            <Text text="Try click on rect" />
            <ColoredRect />
          </Layer>
        </Stage>
      </div>
    );
  }
}

/* eslint-disable */
class ColoredRect extends React.Component {
  state = {
    color: 'green',
  };

  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor(),
    });
  };

  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

export default PieChart;

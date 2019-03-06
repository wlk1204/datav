import * as d3 from 'd3';
import { fabric } from 'fabric';

const render = {};

render.draw = (id, data, options) => {
  d3.select(id).selectAll('#canvas1').remove();
  const { width = 0, height = 0 } = options || {};
  if (!data) {
    return null;
  }
  d3.select(id).append('canvas')
    .attr('width', width)
    .attr('height', height)
    .attr('id', 'canvas1');
}

render.animate = (id, oldData, data, options) => {
  const { width = 0, height = 0 } = options || {};
  d3.select(id).select('#canvas1')
    .attr('width', width)
    .attr('height', height);
  const canvas = new fabric.Canvas('canvas1');
  const scale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, height]);
  const rect1 = new fabric.Rect({
    top: height,
    left: 10,
    width: 30,
    height: 0,
    fill: '#77c392',
  });
  const rect2 = new fabric.Rect({
    top: height,
    left: 60,
    width: 30,
    height: 0,
    fill: '#7d79d2',
  });
  canvas.add(rect1);
  canvas.add(rect2);
  rect1.animate('height', scale(data[0].num), {
    duration: 1000,
    onChange: canvas.renderAll.bind(canvas),
    // easing: fabric.util.ease.easeInBack,
  });
  rect2.animate('height', scale(data[1].num), {
    duration: 1000,
    onChange: canvas.renderAll.bind(canvas),
    // easing: fabric.util.ease.easeInBack,
  });
  rect1.animate('top', height - scale(data[0].num), {
    duration: 1000,
    onChange: canvas.renderAll.bind(canvas),
    // easing: fabric.util.ease.easeInBack,
  });
  rect2.animate('top', height - scale(data[1].num), {
    duration: 1000,
    onChange: canvas.renderAll.bind(canvas),
    // easing: fabric.util.ease.easeInBack,
  });
}

export default render;

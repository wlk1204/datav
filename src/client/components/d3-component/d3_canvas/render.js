import * as d3 from 'd3';

const render = {};

render.draw = (id, data, options) => {
  d3.select(id).selectAll('#canvas1').remove();
  const { width = 0, height = 0 } = options || {};
  // if (!data) {
  //   return null;
  // }
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
}

export default render;

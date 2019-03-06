import * as d3 from 'd3';

const render = {};

render.drawChart = (id, data, options) => {
  d3.select(id).selectAll('.barchart').remove();
  const { width = 0, height = 0 } = options || {};
  if (!data) {
    return null;
  }
  d3.select(id).append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'barchart')
};

render.animate = (id, data, options) => {
  const { width = 0, height = 0 } = options || {};
  d3.select(id).select('.barchart')
    .attr('width', width)
    .attr('height', height);

  const update = d3.select(id).select('.barchart').selectAll('g').data(data);
  const enter = update.enter();
  const exit = update.exit();

  const linear = d3.scaleLinear()
    .domain([0, 1000])
    .range([0, height]);
  const duration = 1000;

  update.transition()
    .attr('transform', (d, i) => `translate(${(i + 1) * width * 0.07}, 0)`)
  update.select('rect').transition() // update
    .duration(duration)
    .attr('height', (d, i) => linear(d.number))
    .attr('y', (d, i) => height - linear(d.number))
  // update.select('text').transition()
  //   .attr('style', `font-size: ${height * 0.02}px`) // 文字大小
  //   .attr('transform', `translate(0, -${height * 0.01})`) // 文字偏移量

  // exit.select('rect').transition() // exit
  //   .duration(1000)
  //   .attr('width', 0)
  //   .remove()
  // exit.select('text').transition()
  //   .duration(1000)
  //   .style('fill', '#fff')
  //   .remove()
  // d3.timer(() => exit.remove(), 1000);

  const g = enter.append('g') // enter
    .attr('transform', (d, i) => `translate(${(i + 1) * width * 0.07}, 0)`) // 矩形之间的间距
  g.append('rect')
    .attr('width', 20) // 矩形宽
    .attr('height', 0) // 矩形高
    .attr('fill', '#06D6A0')
    .attr('y', height)
    .transition()
    .duration(duration)
    .attr('height', (d, i) => linear(d.number))
    .attr('y', (d, i) => height - linear(d.number))
  // g.append('text')
  //   .text(d => d.country)
  //   .attr('style', `font-size: ${height * 0.02}px; color: #fff`) // 文字大小
  //   .attr('transform', `translate(0, -${height * 0.01})`) // 文字偏移量
  //   .transition()
  //   .duration(duration)
  //   .style('fill', '#000');
}

export default render;

// const datajson = require('./assets/geo.json');
// import datajson from './assets/geoa.json'
// console.log(datajson);
import * as d3 from 'd3';
import * as topojson from 'topojson';
console.log(topojson);

const svg = d3.select('#mainsvg');
const width = +svg.attr('width');
const height = +svg.attr('height');
const margin = {
  top: 60,
  right: 30,
  bottom: 60,
  left: 30,
}
const innerWidth = width - margin.left - margin.right;
const innerHeigth = height - margin.top - margin.bottom;
const g = svg.append('g')
  .attr('id', 'maingroup')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const projection = d3.geoNaturalEarth1();
const geo = d3.geoPath().projection(projection);

d3.json('./assets/geoa.json').then(data => {
  console.log(data.objects.countries)
  let worldmeta = topojson.feature(data,
    data.objects.countries);
  g.selectAll('path')
    .data(worldmeta.features)
    .join('path')
    .attr('d', geo)
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
})
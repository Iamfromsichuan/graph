// const datajson = require('./assets/geo.json');
// import datajson from './assets/geoa.json'
// console.log(datajson);
import * as d3 from 'd3';
import * as topojson from 'topojson';
import d3tip from 'd3-tip';

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
/**
 * 
 * const tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(d => `<strong>Country: </strong>
  <span class='details'>${d.properties.name}<br></span>
  <strong>Population: </strong>
  <span class='details'>${format(d.population)}</span>`);
 */
const projection = d3.geoNaturalEarth1();
const geo = d3.geoPath().projection(projection);

const tip = d3tip()
  .attr('class', 'd3-tip').html(d => d.properties.name);

svg.call(tip);

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
    .on('mouseover', function (d) {
      console.log(this);
      d3.select(this)
        .attr('opacity', 0.5)
        .attr('stroke', 'white')
        .attr('stroke-width', 4)
    })
    .on('mouseout', function (d) {
      d3.select(this)
        .attr('opacity', 1)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
    })
    .on('click', (data, index, element) => {
      tip.show(data, element[index])
    })
})
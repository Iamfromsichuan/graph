import * as d3 from 'd3';

const xValue = d => d['日期']; //Math.log(d['确诊人数'] + 1);
const yValue = d => d['现有确诊']; // Math.log(d['新增确诊'] + 1);
const duration = 1000;
let xScale;
let yScale;
let alldates;
var color = {
  "武汉": "#ff1c12",
  "黄石": "#de5991",
  "十堰": "#759AA0",
  "荆州": "#E69D87",
  "宜昌": "#be3259",
  "襄阳": "#EA7E53",
  "鄂州": "#EEDD78",
  "荆门": "#9359b1",
  "孝感": "#47c0d4",
  "黄冈": "#F49F42",
  "咸宁": "#AA312C",
  "恩施州": "#B35E45",
  "随州": "#4B8E6F",
  "仙桃": "#ff8603",
  "天门": "#ffde1d",
  "潜江": "#1e9d95",
  "神农架": "#7289AB"
}

const init = data => {
  const svg = d3.select('#mainsvg');
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  const margin = {
    top: 60,
    right: 30,
    bottom: 60,
    left: 140,
  }
  const innerWidth = width - margin.left - margin.right;
  const innerHeigth = height - margin.top - margin.bottom;

  xScale = d3.scaleTime()
    .domain([d3.min(data, xValue), d3.max(data, xValue)])
    .range([0, innerWidth])
    .nice();
  yScale = d3.scaleLinear()
    .domain([d3.min(data, yValue), d3.max(data, yValue)].reverse())
    .range([0, innerHeigth])
    .nice();

  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth);
  const g = svg.append('g')
    .attr('id', 'maingroup')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  g.append('g').call(yAxis);

  const xAixs = d3.axisBottom(xScale)
    .ticks(Math.floor(alldates.length / 4))
    // .tickFormat(d3.timeFormat('%m-%d'))
    .tickSize(-innerHeigth);
  g.append('g').call(xAixs)
    .attr('transform', `translate(${0}, ${innerHeigth})`);

  g.append('text').text('累计确诊人数（对数）')
    .attr('transform', `translate(${innerWidth / 2}, ${innerHeigth + margin.top / 2})`)
    .attr('text-anchor', 'middle')

  g.append('text').text('新增人数（对数）')
    .attr('transform', `translate(0, ${(innerHeigth + margin.top) / 2})  rotate(-90deg)`)
    .attr('text-anchor', 'middle')
}

const renderUpate = seq => {
  const g = d3.select('#maingroup');

  const circleupdates = g.selectAll('circle')
    .data(seq, d => d['地区']);
  const enterenter = circleupdates
    .enter()
    .append('circle')
    .attr('cx', d => xScale(xValue(d)))
    .attr('cy', d => yScale(yValue(d)))
    .attr('r', 10)
    .attr('fill', d => color[d['地区']])
    .attr('opcity', 0.8);
  circleupdates.merge(enterenter)
    .transition()
    .ease(d3.easeLinear)
    .duration(duration)
    .attr('cx', d => xScale(xValue(d)))
    .attr('cy', d => yScale(yValue(d)));
}

d3.csv('./pro.csv').then(data => {


  data = data.filter(d => d['省份'] !== '总计');
  data = data.filter(d => d['省份'] !== '湖北');

  alldates = Array.from(new Set(
    data.map(d => d['日期'])
  ))

  data.forEach(d => {
    d['确诊人数'] = +(d['确诊人数']);
    
    d['日期'] = new Date(d['日期'])
    console.log(d['日期']);
  })

  let provinces = {};

  let allkeys = Array.from(new Set(
    data.map(d => d['省份'])
  ))

  console.log(alldates);

  allkeys.forEach(key => {
    provinces[key] = [];
  })

  data.forEach(d => {
    provinces[d['省份']].push(d);
  })

  allkeys.forEach(key => {
    provinces[key] = provinces[key].sort((a, b) => b['日期'] - a['日期']);
  })

  init(data);

  let c = 0;
  //   let timer = setInterval(() => {
  //     if (c > alldates.length) {
  //       clearInterval(timer);
  //       timer = null;
  //     } else {
  //       renderUpate(sequential[c]);
  //       c++;
  //       console.log(sequential[c]);
  //       console.log(timer);
  //     }
  //   }, duration)

})
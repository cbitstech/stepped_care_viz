var m = [80, 80, 80, 80]; // margins
var w = 1000 - m[1] - m[3]; // width
var h = 400 - m[0] - m[2]; // height

function getDate(d) {
    return new Date(d.date);
}

var minDate = getDate(itemList[0]),
    maxDate = getDate(itemList[itemList.length-1]);
var x = d3.time.scale()
    .domain([minDate, maxDate]).range([0, w]);
x.tickFormat(d3.time.format("%m-%d"));
var y = d3.scale.linear().domain([0, 10]).range([h, 0]);


var line = d3.svg.line()
 .x(function(d) {
	return x(new Date(d.date)); 
 })
 .y(function(d) {
   return y(d.x);
 });

// Add an SVG element with the desired dimensions and margin.
var graph = d3.select("#chart").append("svg:svg")
.attr("width", w + m[1] + m[3])
.attr("height", h + m[0] + m[2])
.append("svg:g")
.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

// create yAxis
var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
// Add the x-axis.
graph.append("svg:g")
.attr("class", "x axis")
.attr("transform", "translate(0," + h + ")")
.call(xAxis);


// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
// Add the y-axis to the left
graph.append("svg:g")
.attr("class", "y axis")
.attr("transform", "translate(-25,0)")
.call(yAxisLeft);

var clip = graph.append("defs").append("svg:clipPath")
.attr("id", "clip")
.append("svg:rect")
.attr("id", "clip-rect")
.attr("x", "0")
.attr("y", "0")
.attr("width", w)
.attr("height", h);


function drawLine() {
  graph.selectAll(".path").remove(); //remove previous line
  var path = graph.append("svg:path").attr("class","path").attr("clip-path", "url(#clip)").attr("d", line(itemList)); //redraw new line
};

drawLine();

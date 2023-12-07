//Get data from the API
let dates = []
let gdp = []

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(response => response.json())
.then(data => {
    //Get the dates and gdp data from JSON
    for (let i = 0; i < data.data.length; i++) {
        dates.push(data.data[i][0]);
        gdp.push(data.data[i][1]);
    }

    //Declare a new SVG element to build the graph on
    const svg = d3.select("body")
                    .append("svg")
                    .attr("width", "1000px")
                    .attr("height", "700px");
    const padding = 50;                
       
    //Convert the string date array to a number array of years                
    let years = dates.map((item) => (Number(item.slice(0, 4))));

    //Create y and x scales
    const yScale = d3.scaleLinear();
    const xScale = d3.scaleLinear();

    yScale.domain([d3.min(gdp), d3.max(gdp)])
    yScale.range([700-padding, padding]);

    xScale.domain([d3.min(years), d3.max(years)]);
    xScale.range([padding, 1000 - padding]);

    //Create the y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("transform", "translate(" + padding + ", 0)")
        .attr("id", "y-axis")
        .call(yAxis);

    //Create the x-axis
    const xAxis = d3.axisBottom(xScale);
    svg.append("g")
        .attr("transform", "translate(0, 650)")
        .attr("id", "x-axis")
        .call(xAxis);
        
    //Reverse y scale for graphing
    yScale.range([padding, 700 - padding]);

    //Spit bars
    svg.selectAll("rect")
        .data(gdp)
        .enter()
        .append("rect")
        .attr("x", (d, i) => padding + i * (900.0 / gdp.length))
        .attr("y", (d) => 650 - yScale(d))
        .attr("width", (900.0 / gdp.length))
        .attr("height", (d) => yScale(d))
        .attr("fill", "navy")
        .attr("class", "bar")
        .attr("data-date", (d, i) => dates[i])
        .attr("data-gdp", (d) => d)

    //Add tooltip   
    svg.selectAll("rect")
        .data(gdp)
        .enter()
        .append("title")
        .text((d) => d)

});
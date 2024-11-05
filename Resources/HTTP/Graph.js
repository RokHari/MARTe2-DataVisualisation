class Graph extends MARTeObject {

    /**
     * NOOP
     */
    constructor() {
        super();
    }

    /**
     * Create the graph.
     *
     * @param {Object} target The target HTML container where to display the data.
     */
    prepareDisplay(target) {
        // Initialize the echarts instance
        this.myChart = echarts.init(target);

        // Specify the configuration items for the chart
        var option = {
            yAxis: {
                type: 'value',
                animation: false
            },
            xAxis: {
                type: 'value',
                animation: false
            },
            series: [{
                type: 'line',
                showSymbol: false,
                animation: false,
                encode: {x: 'time', y: 'val'}
            }]
        };
        this.myChart.setOption(option);
        
        // Set default values.
        this.sourceData = {
            time: [],
            val: []
        };
        this.maxDataPoints = 100;
        this.refresh(500);
        // Redraw the graph every time data is received.
        this.drawRate = 1;
        this.dataCounter = 0;
    }

    /**
     * Append data to the graph.
     *
     * @param {Object} jsonData the data as received by the server.
     */
    displayData(jsonData) {
        if (this.xSignalPath === undefined || this.ySignalPath === undefined) {
            // Nothing to do if signals were not set.
            return;
        }
        
        // Remove data points if limit was reached.
        if (this.sourceData.val.length == this.maxDataPoints) {
            this.sourceData.val.shift();
            this.sourceData.time.shift();
        }
        
        // Get the signal from the received JSON.
        let xNode = jsonData;
        for (let i = 0; i < this.xSignalPath.length; ++i) {
            xNode = xNode[this.xSignalPath[i]];
        }
        let yNode = jsonData;
        for (let i = 0; i < this.ySignalPath.length; ++i) {
            yNode = yNode[this.ySignalPath[i]];
        }
        
        // Append data.
        this.sourceData.time.push(xNode);
        this.sourceData.val.push(yNode);
        
        if (++this.dataCounter < this.drawRate) {
            // Wait for more data to arrive before redrawing the graph.
            return;
        }
        this.dataCounter = 0;
        
        // Redraw the graph
        this.myChart.setOption({
            xAxis: {
                min: this.sourceData.time[0],
                max: this.sourceData.time[this.sourceData.time.length - 1]
            },
            dataset: [{
                source: this.sourceData
            }]
        });
    }

    /**
     * Set signal for X component of data points.
     *
     * @param {string[]} path Signal path (example: ["InputSignals", "Time"])
     */
    setXSignalPath(path) {
        this.xSignalPath = path;
    }

    /**
     * Set signal for Y component of data points.
     *
     * @param {string[]} path Signal path (example: ["InputSignals", "Time"])
     */
    setYSignalPath(y) {
        this.ySignalPath = y;
        // Update graph title to Y signal.
        this.myChart.setOption({
            title: {
                text: y[y.length - 1]
            }
        });
    }

    /**
     * Set the maximum number of data points on the graph.
     *
     * @param {number} count Max data points.
     */
    setMaxDataPoints(count) {
        this.maxDataPoints = count;
    }

    /**
     * Set the data retrieval rate.
     *
     * @param {number} period Period in milliseconds.
     */
    setDataPollingPeriod(period) {
        this.refresh(period);
    }

    /**
     * Set rate at which the graph is redrawn relative to data polling period.
     *
     * @param {number} count Redraw graph after receiving `count` amount of data.
     */
    setDrawRate(count) {
        this.drawRate = count;
    }

    /**
     * Update the graph's appearance/behaviour. See Apache ECharts documentation for available options.
     *
     * @param {Object} option Options to be forwarded to the graph.
     */
    setGraphOption(option) {
        this.myChart.setOption(option);
    }
}

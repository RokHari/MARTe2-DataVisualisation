# Data Visualisation

Simple demonstration of how to visual MARTe2's introspection data on a graph using Apache ECharts library.

## Running the Example

Export the two needed environment variables:
`export MARTe2_DIR=<MARTe2 path>`
`export MARTe2_Components_DIR=<MARTe2-components path>`
Navigate to `Startup` directory within the project and run the command:
`/Main.sh -l RealTimeLoader -f ../Configurations/Visualisation.cfg -m StateMachine:START`
Open a browser and point to `http://127.0.0.1:8085/?path=Visualisation.html`.

## Project Structure

`Startup/` - Script for running the example.
`Configurations/` - MARTe2 configuration which produces 3 sine waves with different frequencies.
`Resources/HTTP/` - HTML and javascript files needed to display data in a browser (including Apache ECharts library).


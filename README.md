# Data Visualisation

Simple demonstration of how to visual MARTe2's introspection data on a graph using Apache ECharts library.

## Prerequisites

Installed `MARTe2` and `MARTe2-components` and environmental variables pointing to the installed/build location.

For example:
```
$ git clone https://github.com/aneto0/MARTe2.git
$ cd MARTe2
$ make -f Makefile.x86-linux
$ export MARTe2_DIR=$(pwd)
$ cd ..
$ git clone https://github.com/aneto0/MARTe2-components.git
$ cd MARTe2-components
$ make -f Makefile.x86-linux
$ export MARTe2_Components_DIR=$(pwd)
```

## Running the Example

Export the two needed environment variables:

Navigate to `Startup` directory within the project and run the command:

`./Main.sh -l RealTimeLoader -f ../Configurations/Visualisation.cfg -m StateMachine:START`

Open a browser and navigate to `http://127.0.0.1:8085/?path=Visualisation.html`.

## Project Structure

`Startup/` - Script for running the example.

`Configurations/` - MARTe2 configuration which produces 3 sine waves with different frequencies.

`Resources/HTTP/` - HTML and javascript files needed to display data in a browser (including Apache ECharts library).


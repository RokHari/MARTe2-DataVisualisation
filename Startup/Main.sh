#!/bin/bash
#Arguments -f FILENAME -m MESSAGE | -s STATE [-d cgdb|strace]

MDS=0
DEBUG=""
INPUT_ARGS=$*
while test $# -gt 0
do
    case "$1" in
        -d|--debug)
        DEBUG="$2"
        ;;
    esac
    shift
done

if [ -z ${MARTe2_DIR+x} ]; then
echo "Please set the MARTe2_DIR environment variable"; exit;
fi
if [ -z ${MARTe2_Components_DIR+x} ]; then
echo "Please set the MARTe2_Components_DIR environment variable"; exit;
fi

LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$MARTe2_DIR/Build/x86-linux/Core/
LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$MARTe2_Components_DIR/Build/x86-linux/Components/DataSources/LinuxTimer/
LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$MARTe2_Components_DIR/Build/x86-linux/Components/GAMs/IOGAM/
LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$MARTe2_Components_DIR/Build/x86-linux/Components/GAMs/WaveformGAM/

echo $LD_LIBRARY_PATH
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH

if [ "$DEBUG" = "cgdb" ]
then
    cgdb --args $MARTe2_DIR/Build/x86-linux/App/MARTeApp.ex $INPUT_ARGS
else
    taskset 1 $MARTe2_DIR/Build/x86-linux/App/MARTeApp.ex $INPUT_ARGS
fi



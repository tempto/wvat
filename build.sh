#!/bin/bash

echo_err() { 
    echo "$@" 1>&2; 
}


if [ $# -ne 1 ]
then
    echo_err "Invalid call, please provide the build mode (windows/unix)."
    echo_err "usage: build.sh <windows|unix>"
    exit 1
fi

if [[ $1 == "windows" ]]
then
    echo "Building for windows..."
    npx oclif-dev pack:win && echo -e "\nBuild complete! Check dist/win/ folder"
elif [[ $1 == "unix" ]]
then 
    echo "Building for unix..."
    npx oclif-dev pack && echo -e "\nBuild complete! Check dist/ folder"
else
    echo_err "Invalid call, only windows or unix build modes accepted."
    exit 2
fi
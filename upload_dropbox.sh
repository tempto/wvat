#!/bin/bash

echo_err() { 
    echo "$@" 1>&2; 
}

if [ $# -ne 3 ]
then
    echo_err "usage: upload_dropbox.sh <ACCESS_TOKEN> <SRC_FILEPATH> <DST_FILEPATH>"
    exit 1
fi

echo "OAUTH_ACCESS_TOKEN=$1" > .dropbox-config

./dropbox_uploader.sh -f .dropbox-config upload $2 $3

rm .dropbox-config
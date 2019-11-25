#!/bin/bash

wvat_version=$(jq -r ".version" package.json)

amass_version=$(curl -s https://api.github.com/repos/OWASP/Amass/releases/latest | 
        jq -r ".name")

downloadAmass() {
    curl -s https://api.github.com/repos/OWASP/Amass/releases/latest | 
        jq -r ".assets[] | select(.name | test(\"$spruce_type\")) | .browser_download_url" |
        wget -i - -O tmp/amass.zip
        unzip tmp/amass.zip -d tmp/
        rm tmp/amass.zip
}

bundlex64() {
    wvat_tar=wvat-v"$wvat_version"-linux-x64.tar.gz
    spruce_type=linux_amd64
    downloadAmass
    amass_folder=amass_"$amass_version"_linux_amd64
    cp tmp/"$amass_folder"/amass tmp/linux-x64/wvat/bin
    rm -r tmp/"$amass_folder"/
    tar -zcvf tmp/"$wvat_tar" -C tmp/linux-x64/ wvat
    cp tmp/"$wvat_tar" dist/wvat-v"$wvat_version"/
    rm tmp/"$wvat_tar"
}

bundlex64
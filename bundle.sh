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

bundleAux() {
    wvat_tar=wvat-v"$wvat_version"-"$wvat_arch".tar.gz
    downloadAmass
    amass_folder=amass_"$amass_version"_"$spruce_type"
    cp tmp/"$amass_folder"/amass"$win_exe" tmp/"$wvat_arch"/wvat/bin
    rm -r tmp/"$amass_folder"/
    tar -zcvf tmp/"$wvat_tar" -C tmp/"$wvat_arch"/ wvat
    cp tmp/"$wvat_tar" dist/wvat-v"$wvat_version"/
    rm tmp/"$wvat_tar"
}

bundlex64() {
    wvat_arch=linux-x64
    spruce_type=linux_amd64
    bundleAux
}

bundleArm() {
    wvat_arch=linux-arm
    spruce_type=linux_arm
    bundleAux
}

bundleWinx64() {
    wvat_arch=win32-x64
    spruce_type=windows_amd64
    win_exe=.exe
    bundleAux
}

bundleDarwinx64() {
    wvat_arch=darwin-x64
    spruce_type=macos_amd64
    bundleAux
}

bundleWinx64Exe() {
    wvat_arch=win32-x64
    spruce_type=windows_amd64
    downloadAmass
    amass_folder=amass_"$amass_version"_"$spruce_type"
    cp tmp/"$amass_folder"/amass.exe dist/win/
    rm -r tmp/"$amass_folder"/
    rm dist/win/wvat-v"$wvat_version"-x86.exe
}

bundlex64
bundleArm
bundleWinx64
bundleDarwinx64
bundleWinx64Exe
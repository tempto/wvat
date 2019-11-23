#!/bin/bash

spruce_type=linux_amd64

getReleaseURL() {
    curl -s https://api.github.com/repos/OWASP/Amass/releases/latest | 
        jq -r ".assets[] | select(.name | test(\"$spruce_type\")) | .browser_download_url"
}

getReleaseURL


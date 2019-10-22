const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
const CVE_REGEX = /^(CVE-)?\d{4}-\d{4,}$/;

const isValidURL = (url_candidate) => URL_REGEX.test(url_candidate);

const isValidCVE = (cve_candidate) => CVE_REGEX.test(cve_candidate);

module.exports = {
    isValidCVE,
    isValidURL,
};

/**
 * Sets up a timeout for the application
 * @param {function} callback Function to call after timeout
 * @param {number} time Time (in seconds) until timeout
 */
const handleTimeout = (callback, time) => {
    setTimeout(callback, time * 1000);
};

module.exports = handleTimeout;

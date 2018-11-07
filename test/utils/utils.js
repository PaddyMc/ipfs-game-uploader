const { until } = require('selenium-webdriver')

delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

findElement = async (driver, by, timeout = 10000) => {
  return driver.wait(until.elementLocated(by), timeout)
}

findElements = async (driver, by, timeout = 10000) => {
  return driver.wait(until.elementsLocated(by), timeout)
}

encodeExtension = (file) => {
  var stream = require('fs').readFileSync(file);
  return new Buffer(stream).toString('base64');
}

module.exports = {
  delay,
  findElement,
  findElements,
  encodeExtension
}
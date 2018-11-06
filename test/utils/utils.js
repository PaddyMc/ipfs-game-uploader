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

module.exports = {
  delay,
  findElement,
  findElements,
}
require('chromedriver')
require('geckodriver')

const assert = require('assert');
const webdriver = require('selenium-webdriver')
const fs = require("fs")
const { By, until } = webdriver
const {
  delay,
  findElement,
  findElements,
} = require('./utils/utils')

const smallDelay = 1000;

// var driver = new webdriver.Builder()
//       .withCapabilities( { 'browserName' : 'chrome' } )
//       .build();

const urlOfDApp = "localhost:3000"
const driver = new webdriver.Builder()
                  .forBrowser('chrome')
                  .setFirefoxOptions( /* … */)
                  .setChromeOptions( /* … */)
                  .build();

describe('Run e2e tests', () => {
  before(async () => {
    await driver.get(urlOfDApp);
  });

  after(async () => {
    await driver.quit()
    let constants = await fs.readFileSync('./src/constants/constants.js', 'utf8')
    constants = constants.replace(/'.*'/, null);
    fs.writeFileSync('./src/constants/constants.js', constants, 'utf8');
  });
  
  // beforeEach(async () =>{

  // });

  describe('Tests navigation throughout app', () => {
    it("Opens app and verifies title", async () =>{
      let title = await driver.getTitle()
      assert.equal(title, "Home", "incorrect title")
    });

    it("Checks menu buttons", async () => {
      let menuButtons = await findElements(driver, By.css('.menubutton'))
      assert.equal(menuButtons.length, 4, "four menu buttons")
    });

    it("Moves through app and verify headers", async () => {
      await delay(smallDelay)
      let menuButtons = await findElements(driver, By.css('.menubutton'))
      await menuButtons[1].click()

      await delay(smallDelay)
      let title = await driver.getTitle()
      assert.equal(title, "Games", "incorrect title games")
      
      menuButtons = await findElements(driver, By.css('.menubutton'))
      await menuButtons[2].click()
      
      await delay(smallDelay)
      title = await driver.getTitle()
      assert.equal(title, "Game Uploader", "incorrect title uploader")
      
      menuButtons = await findElements(driver, By.css('.menubutton'))
      await menuButtons[3].click()
      
      await delay(smallDelay)
      title = await driver.getTitle()
      assert.equal(title, "Profile", "incorrect title profile")
    });
  });

  describe('Tests the upload screen', () => {

  });

  describe('Tests the game screen', () => {

  });

});

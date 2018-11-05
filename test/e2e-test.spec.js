require('chromedriver')
require('geckodriver')

const assert = require('assert');
const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox')
const { By, until } = webdriver

const {
  delay,
  findElement,
  findElements,
} = require('./utils')

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
  });
  
  beforeEach(function(){
    this.retries(2)
  });

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
      let menuButtons = await findElements(driver, By.css('.menubutton'))
      await menuButtons[1].click()

      let title = await driver.getTitle()
      assert.equal(title, "Games", "incorrect title games")
      
      menuButtons = await findElements(driver, By.css('.menubutton'))
      await menuButtons[2].click()
      
      title = await driver.getTitle()
      assert.equal(title, "Game Uploader", "incorrect title uploader")
      
      menuButtons = await findElements(driver, By.css('.menubutton'))
      await menuButtons[3].click()
      
      title = await driver.getTitle()
      assert.equal(title, "Profile", "incorrect title profile")

    });
  });

  describe('Uploads smart contract', () => {

  });

  describe('Tests the upload screen', () => {

  });

  describe('Tests the game screen', () => {

  });

});
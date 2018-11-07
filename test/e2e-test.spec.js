require('chromedriver')
require('geckodriver')

const assert = require('assert');
const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox')

const fs = require("fs")
const { By, until } = webdriver
const { createAccountAndSendEth, deploySmartContract } = require('./utils/smartcontract-utils')
const { setUpMetaMask } = require('./utils/metamask-utils')
const {
  delay,
  findElement,
  findElements,
  encodeExtension,
} = require('./utils/utils')

//deploySmartContract()

const urlOfDApp = "localhost:3000"

// MetaMask dependencies
const pathToMetaMaskExtension = "./test/5.0.0_0.crx"
const mnemonic = "sentence brick snake cabin animal hurdle snack shed bid typical soda other"
const privateKeyPromise = createAccountAndSendEth()

let chromeOpts = new chrome.Options()
chromeOpts.addExtensions(encodeExtension(pathToMetaMaskExtension))
const driver = new webdriver.Builder()
                  .forBrowser('chrome')
                  .setFirefoxOptions( /* … */)
                  .setChromeOptions(chromeOpts)
                  .build();

const smallDelay = 1000;

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

  describe('Sets up metamask', () => {
    setUpMetaMask(driver, mnemonic, privateKeyPromise, smallDelay)
  })

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

  describe('Tests the game screen', async () => {
    it("Open the Game screen", async () => {
      await delay(smallDelay)
      let menuButtons = await findElements(driver, By.css('.menubutton'))
      await menuButtons[1].click()
      assert.ok(true)
    });
  });

  // describe('Tests the upload screen', async () => {

  // });

  // describe('Tests the profile screen', async () => {

  // });

  // describe('Tests the funders screen', async () => {

  // });
});

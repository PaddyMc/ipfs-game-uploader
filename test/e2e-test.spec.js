require('chromedriver')
require('geckodriver')

const assert = require('assert');
const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox')

const fs = require("fs")
const { By, until } = webdriver
const { createAccountAndSendEth } = require('./utils/smartcontract-utils')
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
      assert.equal(menuButtons.length, 5, "four menu buttons")
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
    });

    it("Verifies there is one game", async () => {
      let gameInfoContainers = await findElements(driver, By.css('.gameloader-info-container'))
      assert.equal(gameInfoContainers.length, 1, "incorrect amount of games in smartcontract")
    });
    
    it("Clicks game link and verifies game rendered", async () => {
      await delay(smallDelay)
      let link = await findElement(driver, By.css('.gameloader-link'))
      await link.click()
      let gameContainer = await findElement(driver, By.css('.game'))

      await assert.ok(gameContainer, "did not change page")
    });

    it("Funds a game owner", async () => {
      await delay(smallDelay)
      let button = await findElement(driver, By.xpath("//button[contains(text(), 'Fund Game Uploader')]"))
      await button.click()
      await delay(smallDelay * 4)
      let windows = await driver.getAllWindowHandles()
      const extension = windows[1]
      await driver.switchTo().window(extension)
      await delay(smallDelay)
      button = await findElement(driver, By.xpath("//button[contains(text(), 'Confirm')]"))
      await button.click()
      windows = await driver.getAllWindowHandles()
      const dApp = windows[0]
      await driver.switchTo().window(dApp)
      await delay(smallDelay)

      // Verifies amount uploaded
    });

    it("Returns to game link", async () => {
      await delay(smallDelay)
      let returnButton = await findElement(driver, By.css('.returnbutton'))
      await returnButton.click()

      // varify return is clicked
    });
  });

  // describe('Tests the upload screen', async () => {

  // });

  // describe('Tests the profile screen', async () => {

  // });

  // describe('Tests the funders screen', async () => {

  // });
});

const webdriver = require('selenium-webdriver')

const {
  delay,
  findElement,
  findElements,
} = require('./utils')

const { By, until } = webdriver

setUpMetaMask = (driver, mnemonic, privateKey, smallDelay) => {
  describe('Sets up metamask', async () => {
    it("Opens and validates metamask", async () => {
      let windows = await driver.getAllWindowHandles()
      const metamask = windows[1]
      await driver.switchTo().window(metamask)
      await delay(smallDelay)
      let button = await findElement(driver, By.xpath("//button[contains(text(), 'Try it now')]"))
      await button.click()
      await delay(smallDelay)
      await driver.close()
      await delay(smallDelay)
      windows = await driver.getAllWindowHandles()
      const metamaskFullScreen = windows[1]
      await driver.switchTo().window(metamaskFullScreen)
      const continueBtn = await findElement(driver, By.css('.welcome-screen__button'))
      await continueBtn.click()

      // imports seed phrase
      const restoreSeedLink = await findElement(driver, By.css('.create-password__import-link'))
      await restoreSeedLink.click()
      await delay(smallDelay)

      const seedTextArea = await findElement(driver, By.css('textarea'))
      await seedTextArea.sendKeys(mnemonic)
      await delay(smallDelay)

      const passwordInputs = await driver.findElements(By.css('input'))
      await delay(smallDelay)

      await passwordInputs[0].sendKeys('hope2222')
      await passwordInputs[1].sendKeys('hope2222')
      await driver.findElement(By.css('.first-time-flow__button')).click()
      await delay(smallDelay)
    });

    it('clicks through all intro screens', async () => {
      await delay(smallDelay * 5)
      const bottomOfTos = await findElement(driver, By.linkText('Attributions'))
      await driver.executeScript('arguments[0].scrollIntoView(true)', bottomOfTos)
      await delay(smallDelay)
      const acceptTos = await findElement(driver, By.css('.tou button'))
      driver.wait(until.elementIsEnabled(acceptTos))
      await acceptTos.click()
      await delay(smallDelay)
      // clicks through the privacy notice
      let nextScreen = await findElement(driver, By.css('.tou button'))
      await nextScreen.click()
      await delay(smallDelay)
      // clicks through the phishing notice
      const noticeElement = await driver.findElement(By.css('.markdown'))
      await driver.executeScript('arguments[0].scrollTop = arguments[0].scrollHeight', noticeElement)
      await delay(smallDelay)
      nextScreen = await findElement(driver, By.css('.tou button'))
      await nextScreen.click()
      await delay(smallDelay)
      // connects to app
      let button = await findElement(driver, By.xpath("//button[contains(text(), 'Connect')]"))
      await button.click()
    })

    it('switches to localhost & import private key', async () => {
      await delay(smallDelay * 2)
      const networkDropdown = await findElement(driver, By.css('.network-name'))
      await networkDropdown.click()
      await delay(smallDelay)

      const [localhost] = await findElements(driver, By.xpath(`//span[contains(text(), 'Localhost')]`))
      await localhost.click()
      await delay(smallDelay * 2)

      const menuIcon = await findElement(driver, By.css('.account-menu__icon'))
      await menuIcon.click()

      const menuButton = await findElements(driver, By.css('.menu__item--clickable'))
      await menuButton[2].click()
      // imports private key
      await delay(smallDelay * 2)

      // if code breaks here after testing restart ganache
      let valuePrivateKey
      privateKey.then((result)=> {
        valuePrivateKey = result
      })
      const privateKeyInput = await findElement(driver, By.css('.new-account-import-form__input-password'))
      await privateKeyInput.sendKeys(valuePrivateKey)

      let button = await findElement(driver, By.xpath("//button[contains(text(), 'Import')]"))
      await button.click()
    })

    it('switches back to DApp to continue testing', async () => {
      await delay(smallDelay * 2)
      await driver.close()
      let windows = await driver.getAllWindowHandles()
      const dApp = windows[0]
      await driver.switchTo().window(dApp)
      await delay(smallDelay)
    })
  });
}

module.exports = {
  setUpMetaMask
}
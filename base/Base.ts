import { browser, ElementFinder } from "protractor";

export class Base {

    private elementState = browser.ExpectedConditions;
    private timeOut = 60000;

    public async click(element: ElementFinder) {
        await browser.wait(this.elementState.elementToBeClickable(element), this.timeOut, "Failed to click the element");
        await element.click();
    }

    public async getTextOfElement(element) {
        await this.visibilityOfElemt(element);
        return await element.getText();
    }

    public async clearAndType(element: ElementFinder, testData: string) {
        await this.visibilityOfElemt(element);
        await element.clear()
        await element.sendKeys(testData);
    }

    public async visibilityOfElemt(element) {
        await browser.wait(this.elementState.visibilityOf(element), this.timeOut, "Element is not visible");
    }

    public async mouseClick(element: ElementFinder) {
        await browser.actions()
            .mouseMove(await element.getWebElement())
            .click()
            .perform();
    }
}
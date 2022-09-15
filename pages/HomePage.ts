import { $, $$ } from "protractor";
import { Base } from "../base/Base";
import { expect } from "chai";

export class HomePage extends Base {

    getTripTypeBtn() {
        return $('div[role="button"] span[role="listbox"]');
    }

    getOriginField() {
        return $('input[data-test-origin]');
    }

    getDestinationField() {
        return $('input[data-test-destination]');
    }

    getStartDate() {
        return $('span[aria-label="Start date calendar input"]');
    }

    getEndDate() {
        return $("span[aria-label='End date calendar input']")
    }

    getCurrentMonth() {
        return $$("div.wHSr-monthName").get(0);
    }

    getPreviousMonth() {
        return $("button[aria-label='Previous month']");
    }

    getCalendarDateOption(value) {
        return $(`div[aria-label='${value}']`);
    }

    getTourTypeBtn(type) {
        return $(`li[aria-label='${type}']`);
    }

    async getMultipleFromLocationField() {
        return $$("input[placeholder='From?']");
    }

    async getMultipleToLocationField() {
        return $$("input[placeholder='To?']");
    }

    async getMultipleDatesFeild() {
        return $$("span[aria-label='Start date calendar input']")
    }

    async getMultipleFlightsField() {
        return $$('div[role="button"] span[role="listbox"]')
    }

    getTravellerBtn() {
        return $$("span[class='S9tW-title']").get(0);
    }

    getAddPassengerPlusBtn() {
        return $$('div.UKFa-mod-variant-default button[aria-label="Decrement"]');
    }

    getAddAdultErrorMsg() {
        return $("span.cAWq-message");
    }

    getRemoveBtn() {
        return $("div[aria-label='Remove']");
    }

    getCitySearchResult() {
        return $("span.JyN0-airportCode");
    }

    getSearchBtn() {
        return $("button[aria-label='Search']");
    }

    async isOriginFieldDisplay() {
        return (await this.getOriginField().isPresent()).valueOf();
    }

    async isDestinationFieldDisplayed() {
        return (await this.getDestinationField().isPresent()).valueOf();
    }

    async isStartDateFieldDisplayed() {
        return (await this.getStartDate().isPresent()).valueOf();
    }

    async isEndDateFieldDisplayed() {
        return (await this.getEndDate().isPresent()).valueOf();
    }

    async verifyRoundTripText(string) {
        expect(await this.getTextOfElement(this.getTripTypeBtn())).to.equal(string);
    }

    async getLengthOfStartLocationField() {
        return (await this.getMultipleFromLocationField()).length;
    }

    async getLengthOfEndLocationField() {
        return (await this.getMultipleToLocationField()).length;
    }

    async getLengthOfDatesField() {
        return (await this.getMultipleDatesFeild()).length;
    }

    async getLengthOfFlightsField() {
        return (await this.getMultipleFlightsField()).length;
    }

    async addAdults(count: number) {
        if (count > 0)
            for (let i = 0; i < count; i++) {
                await this.getAddPassengerPlusBtn().get(1).click();
            }
    }

    async addChilds(count: number) {
        if (count > 0)
            for (let i = 0; i < count; i++) {
                await this.getAddPassengerPlusBtn().get(9).click();
            }
    }

    async addSeniors(count: number) {
        if (count > 0)
            for (let i = 0; i < count; i++) {
                await this.getAddPassengerPlusBtn().get(5).click();
            }
    }

    async addYouth(count: number) {
        if (count > 0)
            for (let i = 0; i < count; i++) {
                await this.getAddPassengerPlusBtn().get(7).click();
            }
    }

    async clickOnTourTypeOptions(string) {
        await this.click(this.getTourTypeBtn(string))
    }

    async verifyAddMoreAdultsError() {
        expect(await this.getTextOfElement(this.getAddAdultErrorMsg())).to.equal("Searches cannot have more than 9 adults");
    }

    async enterOriginDetails(nameOfCity: string) {
        await this.clearAndType(this.getOriginField(), nameOfCity);
    }

    async enterDestinationDetails(nameOfCity: string) {
        await this.clearAndType(this.getDestinationField(), nameOfCity);
    }

    async isCityAvailable(stateCode: string) {
        await this.visibilityOfElemt(this.getCitySearchResult());
        return this.getCitySearchResult().isPresent().valueOf();
    }

    async selectCityFromList(stateCode: string) {
        await this.click(this.getCitySearchResult());
    }

    async clickTravellerBtn() {
        await this.click(this.getTravellerBtn());
    }

    async clickStartDateBtn() {
        await this.mouseClick(this.getStartDate())
    }

    async clickEndDateBtn() {
        await this.mouseClick(this.getEndDate())
    }

    async clickOnPreviousMonth() {
        await this.mouseClick(this.getPreviousMonth());
    }

    async clickCalendarDate(value){
        this.click(this.getCalendarDateOption(value))
    }
}
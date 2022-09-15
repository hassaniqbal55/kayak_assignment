import { HomePage } from "../pages/HomePage";
import { Flights } from "../pages/Flights";
import { expect } from "chai";
import { browser } from "protractor";

export class Helper {

    homePage = new HomePage();
    flights = new Flights();

    async setDepartureAndReturnDate(daysDifference, startEnd) {

        var today = new Date();
        var expectedDate = new Date(today.setDate(today.getDate() + daysDifference));

        var dateToBeSlected = expectedDate.toLocaleString("default", { month: "long" }) + " " + expectedDate.getDate() + ", " + expectedDate.getFullYear();

        if (startEnd == "Start") {
            await this.homePage.clickStartDateBtn();
        } else {
            await this.homePage.clickEndDateBtn();

        }

        const month = await this.homePage.getCurrentMonth().getText();
        if (!month.includes(today.toLocaleString("default", { month: "long" }))) {
            await this.homePage.clickOnPreviousMonth();
        }

        await this.homePage.clickCalendarDate(dateToBeSlected);
    }

    /**
    * This function is used to get flight Price and verify
    * flight times have difference between cheap, quick and
    * best flights price.
    */
    async verifyPriceDifference() {

        var bestPrice = await this.flights.getBestFlightPriceData();
        var cheapPrice = await this.flights.getCheapFlightPriceData();
        var quickPrice = await this.flights.getQuickFlightPriceData();

        bestPrice = await this.removeDollarAndComma(bestPrice);
        cheapPrice = await this.removeDollarAndComma(cheapPrice);
        quickPrice = await this.removeDollarAndComma(quickPrice);

        let bestFlightPrice = await this.convertStringToInt(bestPrice);
        let cheapFlightPrice = await this.convertStringToInt(cheapPrice);
        let quickFlightPrice = await this.convertStringToInt(quickPrice);

        expect(bestFlightPrice).greaterThan(0);
        expect(cheapFlightPrice).greaterThan(0);
        expect(quickFlightPrice).greaterThan(0);

        expect(bestFlightPrice).greaterThanOrEqual(cheapFlightPrice);
        expect(bestFlightPrice).lessThanOrEqual(quickFlightPrice);

        expect(cheapFlightPrice).lessThanOrEqual(bestFlightPrice);
        expect(cheapFlightPrice).lessThanOrEqual(quickFlightPrice);

        expect(quickFlightPrice).greaterThanOrEqual(bestFlightPrice);
        expect(quickFlightPrice).greaterThanOrEqual(cheapFlightPrice);

    }

    /**
     * This function is used to get flight times and verify
     * flight times have difference between cheap, quick and
     * best flights time.
     */
    async verifyTimeDifference() {

        var bestTime = await this.flights.getBestFlightDurationData();
        var cheapTime = await this.flights.getCheapFlightDurationData();
        var quickTime = await this.flights.getQuickFlightDurationData();

        bestTime = await this.getHoursFromString(bestTime)
        cheapTime = await this.getHoursFromString(cheapTime)
        quickTime = await this.getHoursFromString(quickTime)

        let bestFlightTime = await this.convertStringToInt(bestTime);
        let cheapFlightTime = await this.convertStringToInt(cheapTime);
        let quickFlightTime = await this.convertStringToInt(quickTime);

        expect(bestFlightTime).greaterThanOrEqual(0);
        expect(cheapFlightTime).greaterThanOrEqual(0);
        expect(quickFlightTime).greaterThanOrEqual(0);

        expect(quickFlightTime).lessThanOrEqual(bestFlightTime);
        expect(quickFlightTime).lessThanOrEqual(cheapFlightTime);

        expect(bestFlightTime).lessThanOrEqual(quickFlightTime);
        expect(bestFlightTime).lessThanOrEqual(cheapFlightTime);

        expect(cheapFlightTime).greaterThanOrEqual(bestFlightTime);
        expect(cheapFlightTime).greaterThanOrEqual(quickFlightTime);

    }

    async removeDollarAndComma(string) {
        return await string.replace('$', '').replace(',', '');
    }

    async convertStringToInt(string) {
        return await parseInt(string);
    }

    async getHoursFromString(string) {
        return await string.substring(0, string.indexOf('h') + 1).replace('h', '');
    }

    async readDataFromFile(scenario) {

        const origin = scenario.origin
        const destination = scenario.destination
        const passengerObject = scenario.passengers
        const adultCount = passengerObject.adult
        const seniorCount = passengerObject.senior
        const youthCount = passengerObject.youth
        const childCount = passengerObject.child
        const departureDate = scenario.departureDate
        const arrivalDate = scenario.arrivalDate

        await this.homePage.getTripTypeBtn().click();
        await this.homePage.clickOnTourTypeOptions("Round-trip");
        await this.homePage.verifyRoundTripText("Round-trip");
        await this.homePage.getRemoveBtn().click();

        await this.homePage.enterOriginDetails(origin);

        expect(await this.homePage.isCityAvailable(origin)).to.be.true;
        await this.homePage.selectCityFromList(origin);

        await this.homePage.enterDestinationDetails(destination);
        expect(await this.homePage.isCityAvailable(destination)).to.be.true;
        await this.homePage.selectCityFromList(destination);

        await this.homePage.clickTravellerBtn();
        await this.homePage.addAdults(adultCount);
        await this.homePage.addChilds(childCount);
        await this.homePage.addYouth(youthCount);
        await this.homePage.addSeniors(seniorCount);

        const startDate = await this.findDepartureAndArrivalDate(departureDate);
        console.log("Start difference " + startDate);
        await this.setDepartureAndReturnDate(startDate, "Start");

        const endDate = await this.findDepartureAndArrivalDate(arrivalDate);
        console.log("End difference " + endDate);
        await this.setDepartureAndReturnDate(endDate, "End");

        await this.homePage.getSearchBtn().click();

        await browser.waitForAngular();
        
    }

    async findDepartureAndArrivalDate(date) {
        const newDate = date.split('/');
        var today = new Date();
        return newDate[1] - today.getDate();
    }
}
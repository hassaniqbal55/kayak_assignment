import { it, beforeEach } from "mocha";
import { HomePage } from "../../pages/HomePage";
import { Helper } from "../../helper/helper";
import { browser } from "protractor";
import { expect } from "chai";
const TESTDATA = require('./test.json');

const homePage = new HomePage();
const helper = new Helper();

describe("Kayak Flights Search", async () => {

  beforeEach(async () => {
    await browser.get("https://www.kayak.com/");
    await browser.manage().window().maximize();
  });

  it("Verify Start and End Dates and Origin and Destination Fields", async () => {

    await homePage.verifyRoundTripText("Round-trip");
    expect(await homePage.isOriginFieldDisplay()).to.be.true;
    expect(await homePage.isDestinationFieldDisplayed()).to.be.true;
    expect(await homePage.isStartDateFieldDisplayed()).to.be.true;
    expect(await homePage.isEndDateFieldDisplayed()).to.be.true;

  });

  it("Verify one way tour search field selected", async () => {

    await homePage.getTripTypeBtn().click();
    await homePage.clickOnTourTypeOptions("One-way");
    await homePage.verifyRoundTripText("One-way");
    expect(await homePage.isOriginFieldDisplay()).to.be.true;
    expect(await homePage.isDestinationFieldDisplayed()).to.be.true;
    expect(await homePage.isEndDateFieldDisplayed()).to.be.false;
    expect(await homePage.isStartDateFieldDisplayed()).to.be.true;

  });

  it("Verify round trip search fields selected", async () => {

    await homePage.getTripTypeBtn().click();
    await homePage.clickOnTourTypeOptions("Round-trip");
    await homePage.verifyRoundTripText("Round-trip");
    expect(await homePage.isOriginFieldDisplay()).to.be.true;
    expect(await homePage.isDestinationFieldDisplayed()).to.be.true;
    expect(await homePage.isStartDateFieldDisplayed()).to.be.true;
    expect(await homePage.isEndDateFieldDisplayed()).to.be.true;

  });

  it("Verify multi city search fields are displayed", async () => {

    await homePage.getTripTypeBtn().click();
    await homePage.clickOnTourTypeOptions("Multi-city");
    await homePage.verifyRoundTripText("Multi-city");

    expect(await homePage.getLengthOfStartLocationField()).to.eq(3);

    expect(await homePage.getLengthOfEndLocationField()).to.eq(3);

    expect(await homePage.getLengthOfDatesField()).to.eq(3);

    expect(await homePage.getLengthOfFlightsField()).to.greaterThanOrEqual(3);

  });

  it("Verify error message for more then 9 adults.", async () => {

    await homePage.clickTravellerBtn();
    await homePage.addAdults(9);
    await homePage.verifyAddMoreAdultsError();

  });

  it("Verify search is working fine for different flights", async () => {

    await homePage.getTripTypeBtn().click();
    await homePage.clickOnTourTypeOptions("Round-trip");
    await homePage.verifyRoundTripText("Round-trip");
    await homePage.getRemoveBtn().click();

    await homePage.enterOriginDetails("PAR");

    expect(await homePage.isCityAvailable("PAR")).to.be.true;
    await homePage.selectCityFromList("PAR");

    await homePage.enterDestinationDetails("NYC");
    expect(await homePage.isCityAvailable("NYC")).to.be.true;
    await homePage.selectCityFromList("NYC");

    await homePage.clickTravellerBtn();
    await homePage.addAdults(3);
    await homePage.addChilds(2);

    await helper.setDepartureAndReturnDate(3, "Start");

    await helper.setDepartureAndReturnDate(6, "End");
    expect(await homePage.getTravellerBtn().getText()).to.equal("6 travelers");

    await homePage.getSearchBtn().click();

    await browser.waitForAngular();
    await helper.verifyPriceDifference();
    await helper.verifyTimeDifference();

  });

  it.only('Read from json file and verify the data', async () => {
    let arrayOfScenarios = TESTDATA.scenario;
    for (let i = 0; i < arrayOfScenarios.length; i++) {
      await browser.get("https://www.kayak.com/");
      await helper.readDataFromFile(arrayOfScenarios[i])
    }
  })

});
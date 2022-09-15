import { $ } from "protractor";
import { Base } from "../base/Base";

export class Flights extends Base {

    getFlightBestPrice(){
        return $('a[data-sort="bestflight_a"] span.js-price');
    }

    getFlightCheapPrice(){
        return $('a[data-sort="price_a"] span.js-price');
    }

    getFlightQuickPrice(){
        return $('a[data-sort="duration_a"] span.js-price');
    }

    getFlightBestDuration(){
        return $('a[data-sort="bestflight_a"] span.js-duration');
    }

    getFlightCheapDuration(){
        return $('a[data-sort="price_a"] span.js-duration');
    }

    getFlightQuickDuration(){
        return $('a[data-sort="duration_a"] span.js-duration');
    }

    async getBestFlightDurationData(){
        return await this.getTextOfElement(this.getFlightBestDuration());
    }

    async getBestFlightPriceData(){
        return await this.getTextOfElement(this.getFlightBestPrice());
    }

    async getCheapFlightDurationData(){
        return await this.getTextOfElement(this.getFlightCheapDuration());
    }

    async getCheapFlightPriceData(){
        return await this.getTextOfElement(this.getFlightCheapPrice());
    }

    async getQuickFlightDurationData(){
        return await this.getTextOfElement(this.getFlightQuickDuration());
    }

    async getQuickFlightPriceData(){
        return await this.getTextOfElement(this.getFlightQuickPrice());
    }

}
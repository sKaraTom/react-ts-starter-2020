import { ApiClient } from "./ApiClient";

export class MeteoService {

    private apiClient: ApiClient
    private API_KEY : string = "a341bc9b218fc60d29a58fa7bcde3369";
    private END_URL = "&units=metric&lang=fr&appid="+ this.API_KEY;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    public getCityWeather(zipOrCity:any, countryCode: string) {
        const concat: string = zipOrCity + "," + countryCode
        let url:string = isNaN(zipOrCity)? "q=" : "zip="
        url = url + concat + this.END_URL
        return this.apiClient.get(url).then(res => {
            console.log(res.data)
        })

    }

}
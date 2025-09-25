import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HeaderInfo, PredictNextMonth, FactorsAffectingRegions, CasesPerRegion, TopFiveCountries, TopFiveRegions, MakePredictions, PredictSixMonths } from "../models/monthly-predictions-model";

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    
    constructor(
        private http: HttpClient
    ) {}

    public BASE_URL = `https://dengue-fever-prediction-apis.onrender.com`

    getPredictionsForNextMonth(): Observable<HeaderInfo<PredictNextMonth>>{
        return this.http.get<HeaderInfo<PredictNextMonth>>(`${this.BASE_URL}/predict-next-month-enhanced`, {});
    }   

    getRegionFactors(): Observable<HeaderInfo<FactorsAffectingRegions[]>>{
        return this.http.get<HeaderInfo<FactorsAffectingRegions[]>>(`${this.BASE_URL}/region_factors`, {});
    }

    getCasesPerRegion(): Observable<CasesPerRegion>{
        return this.http.get<CasesPerRegion>(`${this.BASE_URL}/region-cases`, {});

    }

    getTopFiveAffectedCountries(): Observable<TopFiveCountries>{
        return this.http.get<TopFiveCountries>(`${this.BASE_URL}/top_five_countries`, {});
    }

    getTopFiveAffectedRegions(): Observable<TopFiveRegions>{
        return this.http.get<TopFiveRegions>(`${this.BASE_URL}/top_five_regions`, {});
    }

    predictNextSixMonths(): Observable<PredictSixMonths>{
        return this.http.get<PredictSixMonths>(`${this.BASE_URL}/predict-next-6-months`, {});
    }

    
    makePredictions(): Observable<MakePredictions>{
        const payload = {
            country: "Ghana",
            avg_temp_c: 35.7,
            precipitation_mm: 100.2,
            air_quality_index: 70,
            uv_index: 50,
            population_density: 20,
            target_date: 2029-10-29
        }
        return this.http.post<MakePredictions>(`${this.BASE_URL}/predict`, {payload});
    }
}

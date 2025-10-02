import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HeaderInfo, PredictNextMonth, FactorsAffectingRegions, CasesPerRegion, TopFiveCountries, TopFiveRegions, MakePredictions, PredictSixMonths } from "../models/monthly-predictions-model";

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private http = inject(HttpClient)

    public BASE_URL = `https://dengue-fever-prediction-apis.onrender.com`

    getPredictionsForNextMonth(): Observable<HeaderInfo<PredictNextMonth>>{
        return this.http.get<HeaderInfo<PredictNextMonth>>(`${this.BASE_URL}/predict_next_month`, {});
    }   

    getRegionFactors(): Observable<HeaderInfo<FactorsAffectingRegions[]>>{
        return this.http.get<HeaderInfo<FactorsAffectingRegions[]>>(`${this.BASE_URL}/region_factors`, {});
    }

    getCasesPerRegion(): Observable<CasesPerRegion>{
        return this.http.get<CasesPerRegion>(`${this.BASE_URL}/region_cases`, {});

    }

    getTopFiveAffectedCountries(): Observable<TopFiveCountries>{
        return this.http.get<TopFiveCountries>(`${this.BASE_URL}/top_five_countries`, {});
    }

    getTopFiveAffectedRegions(): Observable<TopFiveRegions>{
        return this.http.get<TopFiveRegions>(`${this.BASE_URL}/top_five_regions`, {});
    }

    predictNextSixMonths(): Observable<PredictSixMonths>{
        return this.http.get<PredictSixMonths>(`${this.BASE_URL}/predict_next_six_months`, {});
    }

    
makePredictions(
  payload: {
  country: string;
  avg_temp_c: number;
  precipitation_mm: number;
  air_quality_index: number;
  uv_index: number;
  population_density: number;
  target_date?: Date | string;
}
): Observable<MakePredictions> {
  return this.http.post<MakePredictions>(`${this.BASE_URL}/predict`, payload);
}

}

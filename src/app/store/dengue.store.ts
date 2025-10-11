import { FactorsAffectingRegions, HeatMapData, MakePredictions, MakePredictionsResponse, PredictNextMonth, PredictSixMonths, TopFiveCountries, TopFiveRegions } from "../models/monthly-predictions-model";
import { signalStore, withState, withComputed } from "@ngrx/signals";
import { dengueMethods } from "./dengue.methods";
import { computed } from "@angular/core";

export type DengueState = {
    nextMonthPrediction: PredictNextMonth;
    factorsAffectingRegions: FactorsAffectingRegions[];
    topFiveAffectedCountries: TopFiveCountries;
    topFiveAffectedRegions: TopFiveRegions;
    predictNextSixMonths: PredictSixMonths;
    makePredictions: MakePredictions;
    heatMapData: HeatMapData;
    loading: boolean;
    MakePredictionsResponse: MakePredictionsResponse;
}

export function createInitialState(): DengueState {
    return {
        nextMonthPrediction: {
                current_month: "",
                data_source: "",
                message: "",
                month: "",
                predicted_cases: 0,
                raw_prediction: 0,
                weather_conditions: {
                    air_quality_index: 0,
                    avg_temp_c: 0,
                    precipitation_mm: 0,
                    uv_index: 0
                },
                year: 0
        },
        factorsAffectingRegions: [],
        topFiveAffectedCountries: {
            cases: "",
            country: ""
        },
        topFiveAffectedRegions: {
            cases: "",
            region: ""
        },
       predictNextSixMonths: {
        data: {
            current_month: "",
            current_year: "",
            message: "",
            prediction_date: "",
            predictions: [
            {
                confidence: "",
                data_source: "",
                month: "",
                month_number: 0,
                months_ahead: 0,
                predicted_cases: 0,
                raw_prediction: 0,
                weather_conditions: {
                air_quality_index: 0,
                avg_temp_c: 0,
                precipitation_mm: 0,
                population_density: 0
                },
                year: ""
    }
]
        }
            
       },
       makePredictions: {
        country: "",
        avg_temp_c: 0,
        precipitation_mm: 0,
        air_quality_index: 0,
        uv_index: 0,
        population_density: 0,
        target_date: ""
       },
       heatMapData:{
        heatmap_points: [
            {
                country: "",
                intensity: 0,
                lat: 0,
                lng: 0
            }
        ]
            
        },
        loading: false,
        MakePredictionsResponse: {
          predicted_cases: 0,
          target_date: ""
        }
    }

}


export const DengueStore = signalStore({providedIn: 'root'}, 
    withState(createInitialState()),
    dengueMethods,
)
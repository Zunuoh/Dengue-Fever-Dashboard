export interface HeaderInfo<T> {
    header: {
        responseCode: string;
    responseMessage: string;
    },
    data: T
}
export type PredictNextMonth = {
        current_month: string;
        data_source: string;
        message: string;
        month: string;
        predicted_cases: number;
        raw_prediction: number;
        weather_conditions: {
            air_quality_index: number;
            avg_temp_c: number;
            precipitation_mm: number;
            uv_index: number;
        };
        year: number;
}

export type FactorsAffectingRegions = {
    average_value: number;
    factor: string;
    region: string
}

export type CasesPerRegion = {
    Region: string;
    Total_Cases: number;
}

export type TopFiveCountries = {
    cases: string
    country: string;
}

export type TopFiveRegions = {
    cases: string
    region: string;
}

export type MakePredictions = {
  country: string,
  avg_temp_c: number
  precipitation_mm: number,
  air_quality_index: number,
  uv_index: number,
  population_density: number,
  target_date: Date | string
}

export type MakePredictionsResponse = {
  predicted_cases: number,
  target_date: string
}


export type PredictSixMonths = {
  data: {
    current_month: string,
    current_year: string,
    message: string,
    prediction_date: string,
    predictions: Array<{  
      confidence: string,
      data_source: string,
      month: string,
      month_number: number,
      months_ahead: number,
      predicted_cases: number,
      raw_prediction: number,
      weather_conditions: {
        air_quality_index: number,
        avg_temp_c: number,
        precipitation_mm: number,
        population_density: number
      },
      year: string
    }>
  }
}

export type HeatMapData = {
  heatmap_points: [
    {
      country: string,
      intensity: number,
      lat: number,
      lng: number
    }
  ]
}


export type PredictSixMonthsResponse = HeaderInfo<PredictNextMonth>

export type RegionFactorsResponse = HeaderInfo<FactorsAffectingRegions[]>

export type HeatMapDataResponse =  HeaderInfo<HeatMapData>
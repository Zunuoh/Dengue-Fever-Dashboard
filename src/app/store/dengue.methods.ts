import { patchState, signalStoreFeature, type, withMethods } from "@ngrx/signals"
import { DengueState } from "./dengue.store"
import {rxMethod} from '@ngrx/signals/rxjs-interop'
import { catchError, exhaustMap, map, pipe, tap, throwError } from "rxjs"
import { ApiService } from "../services/api.service"
import { inject } from "@angular/core"

export const dengueMethods = signalStoreFeature(
    { state: type<DengueState>()},
    withMethods((store, apiService = inject(ApiService)) => ({
        fetchNextMonth: rxMethod<void>(
            pipe(
                tap(() => patchState(store)),
                exhaustMap(() => apiService.getPredictionsForNextMonth().pipe(
                    tap((response) => {
                        patchState(store, {
                            nextMonthPrediction: response.data
                        })
                    })
                )),
            )
        ),
        factorsAffectingRegions: rxMethod<void>(
            pipe(
                tap(() => {
                    console.log
                    patchState(store, {
                    })
                }),
                exhaustMap(() => apiService.getRegionFactors().pipe(
                    tap((response) => {
                        // console.log(response)
                        patchState(store, {
                            factorsAffectingRegions: response.data
                        })
                    })
                )
            )
        ),
        ),
        getTopFiveAffectedCountries: rxMethod<void>(
            pipe(
                tap(() => {
                    console.log
                    patchState(store, {
                    })
                }),
                exhaustMap(() => apiService.getTopFiveAffectedCountries().pipe(
                    tap((response) => {
                        console.log(response)
                        patchState(store, {
                            topFiveAffectedCountries: response
                        })
                    })
                )
            )
        ),
        ),
        getTopFiveAffectedRegions: rxMethod<void>(
            pipe(
                tap(() => {
                    console.log
                    patchState(store, {
                    })
                }),
                exhaustMap(() => apiService.getTopFiveAffectedRegions().pipe(
                    tap((response) => {
                        console.log(response)
                        patchState(store, {
                            topFiveAffectedRegions: response
                        })
                    })
                )
            )
        ),
        ),
        getPredictionForNextSixMonths: rxMethod<void>(
            pipe(
                tap(() => {
                    patchState(store, {
                    })
                }),
                exhaustMap(() => apiService.predictNextSixMonths().pipe(
                    tap((response) => {
                        console.log(response)
                        patchState(store, {
                            predictNextSixMonths: response
                        })
                    })
                )
            )
        ),
        ),
        getPrediction: rxMethod<{
            country: string,
            avg_temp_c: number,
            precipitation_mm: number,   
            air_quality_index: number,
            uv_index: number,
            population_density: number,
            target_date?: Date | string
        }>(
            pipe(
    tap(() => patchState(store, { loading: true })),
    exhaustMap((payload) =>
      apiService.makePredictions(payload).pipe(
        tap((response) => {
          patchState(store, { MakePredictionsResponse: response, loading: false });
        }),
        catchError((error) => {
          patchState(store, { loading: false });
          console.error('Prediction failed', error);
          return throwError(() => error);
        }),
        map((response) => response)
      )
    )
  )
        ),
        getHeatMapData: rxMethod<void>(
            pipe(
                tap(() => {
                    patchState(store, {
                    })
                }),
                exhaustMap(() => apiService.getHeatMapData().pipe(
                    tap((response) => {
                        console.log(response)
                        patchState(store, {
                            heatMapData: response.data
                        })
                    })
                )
            )
        ),
        ),
        
        

    }))
)
# Forecast Feature Report

## Overview
The backend forecast feature generates price predictions for a commodity using historical price records stored in the database. The current implementation uses a backend-side forecasting flow that combines an ARIMA-style model with a trend-based fallback for smaller datasets.

## How it works
1. The API receives a commodity ID and an optional forecast horizon.
2. The backend fetches historical price records for that commodity, ordered by date.
3. The price series is passed into the forecasting engine.
4. The generated future values are stored as forecast rows in the Forecast table for that commodity.

## Main backend components
- Controller: backend/src/modules/forecast/forecast.controller.ts
- Service: backend/src/modules/forecast/forecast.service.ts
- Forecasting engine: backend/src/modules/forecast/arima.ts
- Routes: backend/src/modules/forecast/forecast.routes.ts
- Schema/validation: backend/src/modules/forecast/forecast.schema.ts

## API endpoint
POST /api/forecasts/generate

Example request body:
```json
{
  "commodityId": "<uuid>",
  "horizon": 3
}
```

## Behavior
- Uses historical price data from the PriceRecord table.
- Generates one forecast row per future step.
- Replaces existing forecasts for the same commodity when a new generation run is triggered.
- Returns the newly generated forecast list for the commodity.

## Constraints
- At least 3 historical price records are required to generate a forecast.
- Horizon is limited to 1–12 steps.
- Forecasting is based only on historical price values and does not yet include external factors such as weather, seasonality, supply disruptions, or demand changes.
- Confidence values are currently heuristic and should be treated as a rough indication rather than a guaranteed statistical measure.
- This is a backend-only implementation for now.

## Validation and verification
- A regression test exists for the forecasting logic in backend/src/modules/forecast/arima.test.ts.
- The backend build has been verified successfully.

import test from 'node:test';
import assert from 'node:assert/strict';
import { forecastArima } from './arima';

test('forecastArima produces increasing future values for an upward trend', () => {
  const series = [10, 12, 13, 15, 16, 18];
  const forecast = forecastArima(series, 3);

  assert.equal(forecast.length, 3);
  assert.ok(forecast[0] > series[series.length - 1]);
  assert.ok(forecast[2] > forecast[0]);
  assert.ok(forecast.every((value) => Number.isFinite(value) && value > 0));
});

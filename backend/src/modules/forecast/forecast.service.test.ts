import test from 'node:test';
import assert from 'node:assert/strict';
import { buildForecastItems } from './forecast.service';

test('buildForecastItems creates dated forecast entries for the requested horizon', () => {
  const commodityId = '11111111-1111-1111-1111-111111111111';
  const baseDate = new Date('2026-07-13T00:00:00.000Z');

  const items = buildForecastItems({
    commodityId,
    predictedPrices: [12.34, 12.56, 12.78],
    baseDate,
    series: [10.2, 10.8, 11.3, 11.7],
    horizon: 3,
  });

  assert.equal(items.length, 3);
  assert.equal(items[0].commodityId, commodityId);
  assert.equal(items[0].predictedPrice, 12.34);
  assert.ok(items[1].forecastDate.getTime() > items[0].forecastDate.getTime());
  assert.ok(items[0].confidence >= 0 && items[0].confidence <= 1);
});

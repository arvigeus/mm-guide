import { test } from 'node:test';
import assert from 'node:assert/strict';
import { places, demoLocation } from '../src/data/places.ts';
import { distanceKm, findPlaces } from '../src/lib/explore.ts';

test('search accepts Vietnamese accents and plain Latin spelling', () => {
  assert.equal(findPlaces(places, 'quang ninh', 'All', demoLocation)[0]?.slug, 'quang-ninh-museum');
  assert.equal(findPlaces(places, 'ĐẢO TI TỐP', 'All', demoLocation)[0]?.slug, 'ti-top-island');
});
test('search and category filters combine and can return no matches', () => {
  assert.equal(findPlaces(places, 'museum', 'Beaches', demoLocation).length, 0);
  assert.equal(findPlaces(places, '', 'Beaches', demoLocation).length, 2);
  assert.equal(findPlaces(places, 'zzzzzz', 'All', demoLocation).length, 0);
});
test('nearby results change with the visitor location', () => {
  const local = findPlaces(places, '', 'All', demoLocation, true);
  assert(local.length > 0 && local.length < places.length);
  assert.equal(local[0].slug, 'bai-chay-beach');
  assert.equal(findPlaces(places, '', 'All', { lat: 52.52, lng: 13.405 }, true).length, 0);
});
test('distance uses geographic coordinates and results are nearest first', () => {
  assert.equal(distanceKm(demoLocation, demoLocation), 0);
  assert(Math.abs(distanceKm({ lat: 0, lng: 0 }, { lat: 0, lng: 1 }) - 111.195) < 0.01);
  const museum = places.find(place => place.slug === 'quang-ninh-museum')!;
  assert.equal(findPlaces(places, '', 'All', museum.coordinates)[0].slug, museum.slug);
});

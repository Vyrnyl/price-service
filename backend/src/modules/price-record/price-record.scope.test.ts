import test from 'node:test';
import assert from 'node:assert/strict';
import { resolvePriceRecordScope } from './price-record.scope';

test('officers only see their own price records', () => {
  const scope = resolvePriceRecordScope({
    userId: 'officer-123',
    role: 'OFFICER',
    email: 'officer@example.com',
  });

  assert.deepEqual(scope, { userId: 'officer-123' });
});

test('admins keep access to all price records', () => {
  const scope = resolvePriceRecordScope({
    userId: 'admin-123',
    role: 'ADMIN',
    email: 'admin@example.com',
  });

  assert.equal(scope, undefined);
});

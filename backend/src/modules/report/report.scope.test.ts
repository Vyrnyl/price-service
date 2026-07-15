import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveReportScope } from './report.scope';

test('officers only see their own reports', () => {
  const scope = resolveReportScope({
    userId: 'officer-123',
    role: 'OFFICER',
    email: 'officer@example.com',
  });

  assert.deepEqual(scope, { generatedBy: 'officer-123' });
});

test('admins keep access to all reports', () => {
  const scope = resolveReportScope({
    userId: 'admin-123',
    role: 'ADMIN',
    email: 'admin@example.com',
  });

  assert.equal(scope, undefined);
});

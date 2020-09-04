import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | songs', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /songs', async function(assert) {
    await visit('/songs');

    assert.equal(currentURL(), '/songs');
  });
});

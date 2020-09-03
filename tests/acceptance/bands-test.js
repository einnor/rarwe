import { module, test } from 'qunit';
import { visit, click, fillIn, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | Bands', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('List bands', async function(assert) {
    assert.expect(3);
    this.server.create('band', { name: 'Radiohead' });
    this.server.create('band', { name: 'Long Distance Calling' });
    await visit('/');

    const bandLinks = document.querySelectorAll('.mb-2 > a');
    assert.equal(bandLinks.length, 2, 'All band links are rendered');
    assert.ok(bandLinks[0].textContent.includes('Radiohead'), 'First band link contains the band name');
    assert.ok(bandLinks[1].textContent.includes('Long Distance Calling'), 'The other band link contains the band name');
  });

  test('Create a band', async function(assert) {
    assert.expect(3);
    this.server.create('band', { name: 'Royal Blood' });
    await visit('/');
    await click('a[href="/bands/new"]');
    await fillIn('input', 'Caspian');
    await click('button');
    await waitFor('p.text-center');
    const bandLinks = document.querySelectorAll('.mb-2 > a');
    assert.equal(bandLinks.length, 2, 'All band links are rendered', 'A new band link is rendered');
    assert.ok(bandLinks[1].textContent.includes('Caspian'), 'The new band link is rendered as the last item');
    assert.ok(document.querySelector('.border-b-4.borderpurple-400').textContent.includes('Songs'), 'The Songs tab is active');
  });
});

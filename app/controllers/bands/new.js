import Controller from '@ember/controller';
import { action } from '@ember/object';
import Band from 'rarwe/models/band';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class BandsNewController extends Controller {
  @service catalog;
  @service router;

  @action
  async saveBand() {
    const response = await fetch('/bands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        data: {
          type: 'bands',
          attributes: {
            name: this.name
          }
        }
      })
    });
    const json = await response.json();
    const { id, attributes } = json.data;
    const record = new Band({ id, ...attributes });
    this.catalog.add('band', record);
    this.router.transitionTo('bands.band.songs', id);
  }
}

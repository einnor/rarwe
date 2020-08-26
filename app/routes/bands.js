import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Band from 'rarwe/models/band';
import fetch from 'fetch';

export default class BandsRoute extends Route {
  @service catalog;

  async model() {
    const response = await fetch('/bands');
    const json = await response.json();
    for (let item of json.data) {
      const { id, attributes, relationships } = item;
      const rels = {};
      for (let relationshipName in relationships) {
        rels[relationshipName] = relationships[relationshipName].links.related;
      }
      const record = new Band({ id, ...attributes }, rels);
      this.catalog.add('band', record);
    }
    return this.catalog.bands;
  }
}

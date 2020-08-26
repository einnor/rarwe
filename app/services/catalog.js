import Service from '@ember/service';
import Band from 'rarwe/models/band';
// import { tracked } from '@glimmer/tracking';
import { tracked } from 'tracked-built-ins';

function extractRelationships(object) {
  const relationships = {};
  for (let relationshipName in object) {
    relationships[relationshipName] = object[relationshipName].links.related;
  }
  return relationships;
}

export default class CatalogService extends Service {
  storage = {};

  constructor() {
    super(...arguments);
    this.storage.bands = tracked([]);
    this.storage.songs = tracked([]);
  }

  add(type, record) {
    const collection = type === 'band' ? this.bands : this.songs;
    collection.push(record);
  }

  get bands() {
    return this.storage.bands;
  }

  get songs() {
    return this.storage.songs;
  }

  find(type, filterFn) {
    const collection = type === 'band' ? this.bands : this.songs;
    return collection.find(filterFn);
  }
}

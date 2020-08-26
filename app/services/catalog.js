import Service from '@ember/service';
import Band from 'rarwe/models/band';
import Song from 'rarwe/models/song';
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

  async fetchAll(type) {
    if (type === 'bands') {
      const response = await fetch('/bands');
      const json = await response.json();
      for (let item of json.data) {
        const { id, attributes, relationships } = item;
        const rels = extractRelationships(relationships);
        const record = new Band({ id, ...attributes}, rels);
        this.add('band', record);
      }
      return this.bands;
    }
    if (type === 'songs') {
      const response = await fetch('/songs');
      const json = await response.json();
      for (let item of json.data) {
        const { id, attributes, relationships } = item;
        const rels = extractRelationships(relationships);
        const record = new Song({ id, ...attributes}, rels);
        this.add('song', record);
      }
      return this.songs;
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

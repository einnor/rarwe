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
      this.loadAll(json);
      return this.bands;
    }
    if (type === 'songs') {
      const response = await fetch('/songs');
      const json = await response.json();
      this.loadAll(json);
      return this.songs;
    }
  }

  loadAll(json) {
    const records = [];
    for (let item of json.data) {
      records.push(this._loadResource(item));
    }
    return records;
  }

  _loadResource(data) {
    const record;
    const { id, type, attributes, relationships } = data;
    if (type === 'bands') {
      const rels = extractRelationships(relationships);
      record = new Band({ id, ...attributes }, rels);
      this.add('band', record);
    }
    if (type === 'songs') {
      const rels = extractRelationships(relationships);
      record = new Song({ id, ...attributes }, rels);
      this.add('song', record);
    }
    return record;
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

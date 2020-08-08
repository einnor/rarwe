import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CatalogService extends Service {
  @tracked storage = {};

  constructor() {
    super(...arguments);
    this.storage.bands = [];
    this.storage.songs = [];
  }

  add(type, record) {
    const collection = type === 'band' ? this.bands : this.songs;
    collection.push(record);
  }

  get bands() {
    return this.storage.bands;
  }
}

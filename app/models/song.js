import { tracked } from '@glimmer/tracking';

export default class Song {
  title = '';
  @tracked rating = 0;
  band = '';
  constructor({ id, title, rating, band }, relationships = {}) {
    this.id = id;
    this.title = title;
    this.rating = rating;
    this.band = band;
    this.relationships = relationships;
  }
}
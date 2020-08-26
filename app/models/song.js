export default class Song {
  title = '';
  rating = 0;
  band = '';
  constructor({ title, rating, band }, relationships = {}) {
    this.title = title;
    this.rating = rating;
    this.band = band;
    this.relationships = relationships;
  }
}
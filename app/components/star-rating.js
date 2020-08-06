import Component from '@glimmer/component';

export default class StarRatingComponent extends Component {
  get maxRating() {
    return this.args.maxRating ?? 5;
    }
}

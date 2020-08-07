import Controller from '@ember/controller';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import { Band } from 'rarwe/routes/bands';

export default class BandsNewController extends Controller {
  @action
  saveBand() {
    new Band({ name: this.name, slug: dasherize(this.name) })
  }
}

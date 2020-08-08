import Controller from '@ember/controller';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import { Band } from 'rarwe/routes/bands';
import { inject as service } from '@ember/service';

export default class BandsNewController extends Controller {
  @service catalog;

  @action
  saveBand() {
    const band = new Band({ name: this.name, slug: dasherize(this.name)});
    this.catalog.add('band', band);
  }
}

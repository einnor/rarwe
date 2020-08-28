import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BandsNewController extends Controller {
  @service catalog;
  @service router;

  constructor() {
    super(...arguments);
    this.router.on('routeWillChange', transition => {
      if (this.confirmedLeave) {
        return;
      }
      if (transition.from.name === 'bands.new') {
        if (this.name) {
          const leave = window.confirm('You have unsaved changes. Are you sure?');
          if (leave) {
            this.confirmedLeave = true;
          } else {
            transition.abort();
          }
        }
      }
    });
  }

  @action
  async saveBand() {
    const band = await this.catalog.create('band', { name: this.name });
    this.router.transitionTo('bands.band.songs', band.id);
  }
}

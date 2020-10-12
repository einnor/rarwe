import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

function wait(delay) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  });
}

export default class BandsRoute extends Route {
  @service catalog;

  async model() {
    await wait(3000);
    return this.catalog.fetchAll('bands');
  }
}

angular.module('meli-test').controller('LandingController',
  ['siteService', 'meliConstants', '$state',
    function (siteService, meliConstants, $state) {
      this.options = meliConstants.sites;

      this.go = () => {
        const id = this.selected.id + this.productId;
        $state.go('centered.metrics', {itemid: id});
      };
    }
  ]);

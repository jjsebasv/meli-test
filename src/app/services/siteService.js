angular.module('meli-test').factory('siteService',
  ['httpRequestService',
    function(httpRequestService) {
      return {
        getAllSites: () => {
          return httpRequestService.defaultRequest('GET', `sites/`, null);
        }
      };
    }]);

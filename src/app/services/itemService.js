angular.module('meli-test').factory('itemService',
  ['httpRequestService',
    function(httpRequestService) {

      return {
        getItem: (itemId) => {
          return httpRequestService.defaultRequest('GET', `items/${itemId}`, null);
        },

        getAllOfSameFiltered: (siteId, categoryId, condition, state) => {
          return httpRequestService.defaultRequest(
            'GET',
            `sites/${siteId}/search?category=${categoryId}&condition=${condition}&state=${state}`,
            null
          );
        },

        getAllOfSameNotFiltered: (siteId, categoryId) => {
          return httpRequestService.defaultRequest(
            'GET',
            `sites/${siteId}/search?category=${categoryId}`,
            null
          );
        }
      };
    }]);

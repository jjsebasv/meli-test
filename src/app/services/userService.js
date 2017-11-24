angular.module('meli-test').factory('userService',
  ['httpRequestService',
    function(httpRequestService) {

      return {
        getUser: (userId) => {
          return httpRequestService.defaultRequest('GET', `users/${userId}`, null);
        }
      };
    }]);

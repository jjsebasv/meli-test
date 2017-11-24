angular.module('meli-test').factory('httpRequestService',
  ['configuration', '$http',
    function(configuration, $http) {
      return {
        defaultRequest: (requestMethod, requestUrl, requestData) => {
          return $http({
            method: requestMethod,
            url: `${configuration.apiUrl}/${requestUrl}`,
            headers: {
              'content-type': 'application/json'
            },
            data: requestData
          });
        }
      };
    }]);

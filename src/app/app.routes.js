angular.module('meli-test').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // For any unmatched urls
    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').go('centered.landing');
    });

    // Now set up the states
    $stateProvider
      .state('centered', {
        abstract: true,
        views: {
          main: {
            templateUrl: '../app/components/centered/centered.html'
          }
        }
      })
      .state('centered.landing', {
        url: '/landing',
        views: {
          content: {
            templateUrl: '../app/components/centered/landing/landing.html',
            controller: 'LandingController',
            controllerAs: 'landingCtrl'
          }
        }
      })
      .state('centered.metrics', {
        url: '/metrics/:itemid',
        views: {
          content: {
            templateUrl: '../app/components/centered/metrics/metrics.html',
            controller: 'MetricsController',
            controllerAs: 'metricsCtrl'
          }
        }
      });

    $locationProvider.html5Mode(true);
  }
]);

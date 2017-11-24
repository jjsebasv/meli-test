'use strict';

angular.module('meli-test').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

  // For any unmatched urls
  $urlRouterProvider.otherwise(function ($injector) {
    $injector.get('$state').go('centered.landing');
  });

  // Now set up the states
  $stateProvider.state('centered', {
    abstract: true,
    views: {
      main: {
        templateUrl: '../app/components/centered/centered.html'
      }
    }
  }).state('centered.landing', {
    url: '/landing',
    views: {
      content: {
        templateUrl: '../app/components/centered/landing/landing.html',
        controller: 'LandingController',
        controllerAs: 'landingCtrl'
      }
    }
  }).state('centered.metrics', {
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
}]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAucm91dGVzLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRsb2NhdGlvblByb3ZpZGVyIiwib3RoZXJ3aXNlIiwiJGluamVjdG9yIiwiZ2V0IiwiZ28iLCJzdGF0ZSIsImFic3RyYWN0Iiwidmlld3MiLCJtYWluIiwidGVtcGxhdGVVcmwiLCJ1cmwiLCJjb250ZW50IiwiY29udHJvbGxlciIsImNvbnRyb2xsZXJBcyIsImh0bWw1TW9kZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsUUFBUUMsTUFBUixDQUFlLFdBQWYsRUFBNEJDLE1BQTVCLENBQW1DLENBQ2pDLGdCQURpQyxFQUNmLG9CQURlLEVBQ08sbUJBRFAsRUFFakMsVUFBVUMsY0FBVixFQUEwQkMsa0JBQTFCLEVBQThDQyxpQkFBOUMsRUFBaUU7O0FBRS9EO0FBQ0FELHFCQUFtQkUsU0FBbkIsQ0FBNkIsVUFBQ0MsU0FBRCxFQUFlO0FBQzFDQSxjQUFVQyxHQUFWLENBQWMsUUFBZCxFQUF3QkMsRUFBeEIsQ0FBMkIsa0JBQTNCO0FBQ0QsR0FGRDs7QUFJQTtBQUNBTixpQkFDR08sS0FESCxDQUNTLFVBRFQsRUFDcUI7QUFDakJDLGNBQVUsSUFETztBQUVqQkMsV0FBTztBQUNMQyxZQUFNO0FBQ0pDLHFCQUFhO0FBRFQ7QUFERDtBQUZVLEdBRHJCLEVBU0dKLEtBVEgsQ0FTUyxrQkFUVCxFQVM2QjtBQUN6QkssU0FBSyxVQURvQjtBQUV6QkgsV0FBTztBQUNMSSxlQUFTO0FBQ1BGLHFCQUFhLGlEQUROO0FBRVBHLG9CQUFZLG1CQUZMO0FBR1BDLHNCQUFjO0FBSFA7QUFESjtBQUZrQixHQVQ3QixFQW1CR1IsS0FuQkgsQ0FtQlMsa0JBbkJULEVBbUI2QjtBQUN6QkssU0FBSyxrQkFEb0I7QUFFekJILFdBQU87QUFDTEksZUFBUztBQUNQRixxQkFBYSxpREFETjtBQUVQRyxvQkFBWSxtQkFGTDtBQUdQQyxzQkFBYztBQUhQO0FBREo7QUFGa0IsR0FuQjdCOztBQThCQWIsb0JBQWtCYyxTQUFsQixDQUE0QixJQUE1QjtBQUNELENBekNnQyxDQUFuQyIsImZpbGUiOiJhcHAvYXBwLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtZWxpLXRlc3QnKS5jb25maWcoW1xuICAnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJyxcbiAgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAvLyBGb3IgYW55IHVubWF0Y2hlZCB1cmxzXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgoJGluamVjdG9yKSA9PiB7XG4gICAgICAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKS5nbygnY2VudGVyZWQubGFuZGluZycpO1xuICAgIH0pO1xuXG4gICAgLy8gTm93IHNldCB1cCB0aGUgc3RhdGVzXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZSgnY2VudGVyZWQnLCB7XG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vYXBwL2NvbXBvbmVudHMvY2VudGVyZWQvY2VudGVyZWQuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ2NlbnRlcmVkLmxhbmRpbmcnLCB7XG4gICAgICAgIHVybDogJy9sYW5kaW5nJyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL2FwcC9jb21wb25lbnRzL2NlbnRlcmVkL2xhbmRpbmcvbGFuZGluZy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMYW5kaW5nQ29udHJvbGxlcicsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdsYW5kaW5nQ3RybCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ2NlbnRlcmVkLm1ldHJpY3MnLCB7XG4gICAgICAgIHVybDogJy9tZXRyaWNzLzppdGVtaWQnLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vYXBwL2NvbXBvbmVudHMvY2VudGVyZWQvbWV0cmljcy9tZXRyaWNzLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ01ldHJpY3NDb250cm9sbGVyJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ21ldHJpY3NDdHJsJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gIH1cbl0pO1xuIl19

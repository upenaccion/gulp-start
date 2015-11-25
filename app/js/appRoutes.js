app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
  $urlRouterProvider.otherwise("/");
  $stateProvider
  .state('login',{
    url:"/",
    template:'<login-directive></login-directive>',
    data: {
      displayName: false
    }
  })
  .state('dashboard',{
    url:"/dashboard",
    template:'<dash-directive></dash-directive>',
    data: {
      displayName: 'Dashboard'
    }
  })
  .state('dashboard.employee',{
    url:"/employee",
    template:'<emp-directive></emp-directive>',
    data: {
      displayName: 'Employee'
    }
  });
  $locationProvider.html5Mode(true);
});
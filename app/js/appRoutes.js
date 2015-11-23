app.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise("/");
  $stateProvider
  .state('login',{
    url:"/",
    template:'<login-directive></login-directive>'
  })
  .state('home',{
    url:"/home",
    template:'<home-directive></home-directive>'
  })
  .state('home.dashboard',{
    template:'<dash-directive></dash-directive>'
  });
  /** $locationProvider $locationProvider.html5Mode(true); for pretty url **/
});
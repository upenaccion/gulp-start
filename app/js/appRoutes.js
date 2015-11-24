app.config(function($stateProvider,$urlRouterProvider){
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
  /** $locationProvider $locationProvider.html5Mode(true); for pretty url **/
});
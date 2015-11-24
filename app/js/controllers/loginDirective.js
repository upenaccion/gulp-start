/** loginDirective.js */
app.directive('loginDirective',[function(){
  return {
    restrict:'E',
    templateUrl:'views/shared/login.tpl.html',
    controllerAs:'login',
    controller:function($state){ /** login controller */
      var self = this;
      self.print = 'from login controller';
      self.logIn = function(){ /** login function */
        $state.go('dashboard');
      };
    }
  };
}]);
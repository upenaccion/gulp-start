/** homeDirective.js */
app.directive('homeDirective',[function(){
  return {
    restrict:'E',
    templateUrl:'views/shared/home.tpl.html',
    controllerAs:'home',
    controller:function($state){ /** home controller */
      var self = this;
      self.print = 'something from parent controller home';
      $state.go('home.dashboard');
    }
  };
}]);
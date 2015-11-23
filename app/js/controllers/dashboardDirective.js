/** dashboardDirective.js */
app.directive('dashDirective',[function(){
   return {
     restrict:'E',
     templateUrl:'views/shared/dashboard.tpl.html',
     controllerAs:'dashboard',
     controller:function(){ /** dashboard controller */
         var self = this;
         self.print = 'Dashboard partial views will be injected here';
     }
  };
}]);
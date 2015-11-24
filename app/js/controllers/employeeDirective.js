/** employeeDirective.js */
app.directive('empDirective',[function(){
   return {
     restrict:'E',
     templateUrl:'views/shared/employee.tpl.html',
     controllerAs:'employee',
     controller:function(){ /** employee controller */
         var self = this;
         self.print = 'Employee partial views will be injected in Dashboard';
     }
  };
}]);
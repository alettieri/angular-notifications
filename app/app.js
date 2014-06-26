
/// <reference path="../bower_components/angular/angular.js" />

(function(angular){
	
	
	ApplicationController.$inject =['NotificationService'];
	function ApplicationController(NotificationService) {
		
		this.showNotification = function() {
			
			NotificationService.info("Notification Content", "Title");
		}
		
	}
	
	
	
	
	angular.module('app', ['directive.notification']).controller('ApplicationController', ApplicationController);
	
	
})(window.angular);
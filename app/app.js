

var Edits, App, AppController, EditsController;


AppController = function(){

};

EditsController = function(notificationService){

	this.message = "Hello Edits";

	this.status = function() {
		console.log(notificationService);
	};

};


App = angular.module('app',['app.edits']);


Edits = angular.module('app.edits', ['ngRoute', 'dir']);


Edits.config(function($routeProvider){

	$routeProvider.when('/edits', {

		controller: 'EditsController',
		controllerAs: 'editsCtrl',
		templateUrl: '/edits.html'

	});

});


var NotificationController = function(notificationService) {

	


};


var notificationService = function(notificationSettings) {

	var notification = this;

	notification.messages = [];


	// notification messages
	// Message
	// Error - uses message
	// Alert - uses message
	// Warning - uses message
	// Info - uses message

	function createMessage( msg ) {

		msg = angular.extend( {}, {

			type: 'default',
			msgText: '',
			asHtml: false,
			duration: 1000

		}, msg );

		notification.messages.push(message);

	}

	angular.forEach( notificationSettings.messageTypes, function(messageType){
		
		notification[messageType] = function(msgText, asHtml) {
			
			var msg = {

				asHtml 		: asHtml,
				msgText 	: msgText,
				type 		: messageType.type,
				duration 	: messageType.duration

			};
			
			createMessage(msg);
		};

	});

	notification.getMessage = function() {
		return notification.message;
	};


	notification.removeMessage = function(msg) {
		var idx = notification.message.indexOf(msg);

		if( idx ) {
			notification.messages.splice( idx, 1 );
		}

	};

	return notification;


};


angular.module('dir',[])

.constant('notificationSettings', {

	messageTypes: [
		{
			type: 'message',
			duration: 1000
		},
		{
			type: 'info',
			duration: 1000
		},
		{
			type: 'error',
			duration: 1000
		},
		{
			type: 'warning',
			duration: 1000
		},
		{
			type: 'alert',
			duration: 1000
		}

	]

})

.controller('NotificationController', NotificationController)

.factory('notificationService', notificationService)

.directive('notifcation', function(){


	return {


		restrict: 'EA',
		scope: {},
		controller: 'NotificationController',
		templateUrl: '/notifications.html',

		link: function(scope, element, attrs, ctrl ) {
			console.log(arguments);

		}


	};




});
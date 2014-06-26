(function (angular) {
	'use strict';

	/**
	 * Notification Service
	 * 
	 * Shared service which exposes notification methods and the notification queue.
	 * It's also responsible for hididng notifications after a certain period of time.
	 * 
	 */
	NotificationService.$inject = ['notificationSettings', '$timeout'];

	function NotificationService(settings, $timeout) {
		
		var Service = this,
			//
			// Get our service types
			//
			notificationTypes = settings.notificationTypes,
			//
			// Get our notification defaults
			//
			notificationDefaults = settings.notificationDefaults,
			//
			// Our notification queue
			//
			notificationQueue = []
		;


		angular.extend(Service, {

			/**
			 * Creates notification and adds it to the notification queue
			 * @param {Object} notification
			 */
			createNotification: function (type, content, title) {
				
				var notification = angular.extend({}, notificationDefaults, {
					title: title,
					type: type,
					content: content
				});

				
				/**
				 * Timeout handler, to remove notification from the queue
				 */
				function removeAfterTimeout() {
					this.remove(notification);
				}

				// Timeout the notification here, then remove it
				// Use the notificationTypes[type].duration for the timer
				$timeout(removeAfterTimeout.bind(this), notificationTypes[type].duration);

				// Add the notification to the queue
				notificationQueue.push(notification);

				return notification;
			},
			/**
			 * Returns notificationQueue
			 * @return {Array}
			 */
			getAll: function () {
				return notificationQueue;
			},
			/**
			 * Finds the index of the notification in the queue, then deletes it
			 * @param {Object} notification
			 */
			remove: function (notification) {

				var idx = notificationQueue.indexOf(notification);

				if (idx >= 0) {
					notificationQueue.splice(idx, 1);
				}
			}


		});
		
		//
		// Create a function for each service type
		// service.info
		// service.error
		// service.warning
		// service.succes
		//
		angular.forEach(notificationTypes, function (type, id) {

			Service[id] = function (content, title) {
				return Service.createNotification.call(Service, id, content, title);
			};

		});



		return Service;
	}

	/**
	 * Notification Controller
	 * Exposed controller within the directive 
	 */
	NotificationController.$inject = ['NotificationService'];
	function NotificationController(NotificationService) {

		//
		// Get the list of notifications
		// Our directive will be bound to this array 
		//
		this.notifications = NotificationService.getAll();
		//
		// Add a remove handler, to delete a directive when the 'x' is clicked
		//
		this.remove = function (notification) {
			NotificationService.remove(notification);
		};
	}

	/**
	 * Notification Directive
	 */
	
	function NotificationDirective() {

		
		// Directive link handler
		var link = function (scope, element, attrs, ctrl) {
			
			// Add the notification-container class to the directive element
			element.addClass('notification-container');
			
		}

		return {

			restrict: 'A',

			scope: {},

			controller: "NotificationController",

			controllerAs: 'notificationsCtrl',

			templateUrl: '/notification/notification.tpl.html',

			link: link
		}

	}

	
	angular.module('directive.notification', []).constant('notificationSettings', {
		//
		// Type of notifications we'll support and their duration on the screen
		//
		notificationTypes: {
			info: { duration: 2500 },
			warning: { duration: 5000 },
			error: { duration: 5000  },
			success: { duration: 2500 }
		},
		//
		// Default notification template
		//
		notificationDefaults: {
			type: '',
			title: '',
			content: ''	
		}

	})
		//
		// Register Notification Controller
		//
		.controller("NotificationController", NotificationController)
		//
		// Register Notification Service
		//
		.factory('NotificationService', NotificationService)
		//
		// Register Notification Directive
		//
		.directive('dirNotification', NotificationDirective);


})(window.angular);
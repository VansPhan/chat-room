(function() {
	angular
	.module("web-sockets", ["ngResource"])
	.factory("MessageFactory", [ "$resource", Message ])
	.controller("wsController", [
		"$scope",
		"MessageFactory",
		wsControllerFunction
	])
	function Message($resource) {
		return $resource("/api/messages", {}, {
			method: { update: "PUT" }
		});
	}
	function wsControllerFunction($scope, MessageFactory) {
		var socket = io();
		var vm = this;

		MessageFactory.query().$promise.then(function (messages) {
			vm.messages = messages;
		});

		vm.newMessage = '';

	   vm.sendMessage = function () {
			socket.emit('chat message', vm.newMessage)
			vm.newMessage = '';
		}
		
		vm.delete = function(msg) {
			socket.emit('delete message', msg);
		}

		socket.on('chat message', function (msg) {
			if(msg) {
				$scope.$apply(function () {
					vm.messages.push({text: msg})
				})
			}
		});

		socket.on('delete message', function (msg) {
			$scope.$apply(function () {
				MessageFactory.query().$promise.then(function (messages) {
					vm.messages = messages;
				});
			})
		});
	
	}
}())
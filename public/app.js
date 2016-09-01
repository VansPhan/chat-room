(function() {
	angular
	.module("web-sockets", [])
	.controller("wsController", [
		"$scope",
		wsControllerFunction
	])

	function wsControllerFunction($scope) {
		var vm = this;
		vm.messages = []
		var socket = io();
      vm.send = function() {
      	socket.emit('chat message', vm.msg);
      	vm.msg = '';
		}
		socket.on('chat message', function(msg){
        $scope.$apply(function() {
          vm.messages.push(msg)
        })
      });
	}
}())
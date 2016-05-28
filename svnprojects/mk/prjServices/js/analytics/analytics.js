(function() {
    angular.module('myApp').directive('analytics', function() {
        return {
            templateUrl: 'js/analytics/analytics.html',
			link: function(scope, elem, attrs) {
				scope.activeVisitor = {};
				scope.pastVisitor = {};
				console.log(scope.ref);
				var analytics = scope.ref.child('analytics');
				var activeVisitors = analytics.child('activeUsers');
				var pastVisitors = analytics.child('pastVisitors');
				analytics.child('totalVisitors').on('value', function (snapshot) {
					console.log('total visitors: ', snapshot.val());
				});
				pastVisitors.on('child_added', function (snapshot) {
				  var n = snapshot.key();
				  var v = snapshot.val();
				  scope.pastVisitor[n] = v;
				  scope.pastVisitor[n].spent = ((v.leftAt - v.arrivedAt) / 1000);
				  scope.pastVisitor[n].arrivedAtVal = new Date(v.arrivedAt);
				  scope.pastVisitor[n].leftAtVal = new Date(v.leftAt);
				  scope.pastVisitor[n].key = n;
				});
				
				activeVisitors.on('child_added', function (snapshot) {
					var n = snapshot.key();
					var v = snapshot.val();
					scope.activeVisitor[n] = v;
					scope.activeVisitor[n].arrivedAtVal = new Date(v.arrivedAt);
					scope.activeVisitor[n].key = n;
				});
				activeVisitors.on('child_removed', function (snapshot) {
				  $('#active-visitor' + snapshot.key	()).remove(); 
				});
				
				var visitor = {
					path: window.location.pathname,
					arrivedAt: Firebase.ServerValue.TIMESTAMP,
					userAgent: navigator.userAgent
				};
				
				var activeVisitorRef = activeVisitors.push(visitor, function () {
					var visitorId = activeVisitorRef.key();
					activeVisitors.child(visitorId).once('value', function (snapshot) {
						visitor.arrivedAt = snapshot.child('arrivedAt').val();
						var pastVisitors = analytics.child('pastVisitors');
						visitor.leftAt = Firebase.ServerValue.TIMESTAMP;
						pastVisitors.child(visitorId).onDisconnect().set(visitor);
					});
				});
				activeVisitorRef.onDisconnect().remove();
          	}
        };	
    });
}());
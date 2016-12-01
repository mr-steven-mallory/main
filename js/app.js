// Initialize Firebase
var config = {
  apiKey: "AIzaSyC3ndOwJHbRbMqEFGgMIUrd-of0mMV1cxY",
  authDomain: "readyread-88987.firebaseapp.com",
  databaseURL: "https://readyread-88987.firebaseio.com",
  storageBucket: "readyread-88987.appspot.com",
  messagingSenderId: "845781920684"
};
firebase.initializeApp(config);

var app = angular.module("sampleApp", ["firebase"]);

/*
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
*/

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

app.controller("SampleCtrl", ["$scope", "Auth",
  function($scope, Auth) {
    $scope.auth = Auth;

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
    });
  }
]);

app.directive('draggable', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        //console.log("link called on", element[0]);
        if ($rootScope.packery === undefined || $rootScope.packery === null) {
          var draggable = new Draggabilly(element[0]);
          scope.element = element;

          $rootScope.packery = new Packery(element[0].parentElement, {
            isResizeBound: true,
            columnWidth: 270,
            itemSelector: '.drag-item'
          });

          $rootScope.packery.bindResize();
          $rootScope.packery.bindDraggabillyEvents(draggable);

          draggable.on('dragEnd', function(instance, event, pointer) {
            $timeout(function() {
              $rootScope.packery.layout();
            }, 200);
          });
        } 
        else {
          var draggable = new Draggabilly(element[0]);

          $rootScope.packery.bindDraggabillyEvents(draggable);

          draggable.on('dragEnd', function(instance, event, pointer) {
            $timeout(function() {
              $rootScope.packery.layout();
            }, 200);
          });
        }

        $timeout(function() {
          $rootScope.packery.reloadItems();
          $rootScope.packery.layout();
        }, 100);
      }
    };
  }
]);
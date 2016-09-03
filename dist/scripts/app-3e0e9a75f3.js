(function() {
  'use strict';

  angular
    .module('pcui', ['ngMessages', 'ngResource', 'ui.router', 'ngMaterial', 'toastr', 'firebase', 'ui.calendar', 'ui.bootstrap', 'ngMap', 'vAccordion', 'ngAnimate' , 'irontec.simpleChat' ]);

})();

(function() {
  'use strict';

  acmeMalarkey.$inject = ["malarkey"];
  angular
    .module('pcui')
    .directive('acmeMalarkey', acmeMalarkey);

  /** @ngInject */
  function acmeMalarkey(malarkey) {
    MalarkeyController.$inject = ["$log", "githubContributor"];
    var directive = {
      restrict: 'E',
      scope: {
        extraValues: '='
      },
      template: '&nbsp;',
      link: linkFunc,
      controller: MalarkeyController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
      var watcher;
      var typist = malarkey(el[0], {
        typeSpeed: 40,
        deleteSpeed: 40,
        pauseDelay: 800,
        loop: true,
        postfix: ' '
      });

      el.addClass('acme-malarkey');

      angular.forEach(scope.extraValues, function(value) {
        typist.type(value).pause().delete();
      });

      watcher = scope.$watch('vm.contributors', function() {
        angular.forEach(vm.contributors, function(contributor) {
          typist.type(contributor.login).pause().delete();
        });
      });

      scope.$on('$destroy', function () {
        watcher();
      });
    }

    /** @ngInject */
    function MalarkeyController($log, githubContributor) {
      var vm = this;

      vm.contributors = [];

      activate();

      function activate() {
        return getContributors().then(function() {
          $log.info('Activated Contributors View');
        });
      }

      function getContributors() {
        return githubContributor.getContributors(10).then(function(data) {
          vm.contributors = data;

          return vm.contributors;
        });
      }
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('pcui')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    NavbarController.$inject = ["moment"];
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment) {
      var vm = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();

(function() {
  'use strict';

  angular
      .module('pcui')
      .service('webDevTec', webDevTec);

  /** @ngInject */
  function webDevTec() {
    var data = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'jasmine.png'
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'protractor.png'
      },
      {
        'title': 'Angular Material Design',
        'url': 'https://material.angularjs.org/#/',
        'description': 'The Angular reference implementation of the Google\'s Material Design specification.',
        'logo': 'angular-material.png'
      },
      {
        'title': 'Sass (Node)',
        'url': 'https://github.com/sass/node-sass',
        'description': 'Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.',
        'logo': 'node-sass.png'
      }
    ];

    this.getTec = getTec;

    function getTec() {
      return data;
    }
  }

})();

(function() {
  'use strict';

  githubContributor.$inject = ["$log", "$http"];
  angular
    .module('pcui')
    .factory('githubContributor', githubContributor);

  /** @ngInject */
  function githubContributor($log, $http) {
    var apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';

    var service = {
      apiHost: apiHost,
      getContributors: getContributors
    };

    return service;

    function getContributors(limit) {
      if (!limit) {
        limit = 30;
      }

      return $http.get(apiHost + '/contributors?per_page=' + limit)
        .then(getContributorsComplete)
        .catch(getContributorsFailed);

      function getContributorsComplete(response) {
        return response.data;
      }

      function getContributorsFailed(error) {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();

(function(){
		ResidentInfoService.$inject = ["$http"];
	angular 
		.module('pcui')
		.factory('ResidentInfoService', ResidentInfoService)

		function ResidentInfoService($http){
			var services = {};

			services.getResidentInfo = function(id){
				return $http.get('https://frozen-reaches-83397.herokuapp.com//api/v1/residents/' + id)
			}

			return services
		}
})();
(function(){
		ResidentController.$inject = ["$scope", "$stateParams", "ResidentInfoService", "$firebaseObject"];
	angular 
		.module('pcui')
		.controller('ResidentController', ResidentController)

		function ResidentController($scope, $stateParams, ResidentInfoService, $firebaseObject){
			$scope.residentInfo;
			$scope.currentLocation = $firebaseObject(new Firebase('https://evolutiontech.firebaseio.com/residents/' + $stateParams.id + '/current_location'));
			
			
			


			ResidentInfoService.getResidentInfo($stateParams.id).then(function(response){
				$scope.residentInfo = response.data
			});





			
		};
})();
(function(){

	angular
		.module('pcui')
		.controller('MapController', ["NgMap", "$scope", function(NgMap, $scope){

			$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5hEVOsgZkdBXsBdF9t6psC5JuOxK2Agg";

			
			NgMap.getMap().then(function(map) {
		    console.log(map.getCenter());
		    console.log('markers', map.markers);
		    console.log('shapes', map.shapes);
		  });




		}]);

})();
(function(){
	LocationService.$inject = ["$firebaseObject"];
	angular
		.module('pcui')
		.factory('LocationService', LocationService)


	function LocationService($firebaseObject){
		var services = {}


		return services 
		
	}
})();
(function() {
  'use strict';

      MainController.$inject = ["$scope", "ResidentService", "$firebaseArray", "$window", "$mdBottomSheet"];
  angular
    .module('pcui')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, ResidentService, $firebaseArray, $window, $mdBottomSheet) {
    $scope.userName = $window.localStorage.name
    $scope.isLoading = true;
    $scope.messages;
    $scope.tasks;
    $scope.message = {}
    $scope.myId = $window.localStorage.name;
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5hEVOsgZkdBXsBdF9t6psC5JuOxK2Agg";
    $scope.houseList = ["1212 Quinnipiac Ave", "22 Linden", "980 Townsend Avenue", "The Cove"]
    $scope.house;
    ResidentService.query({user_id: window.localStorage.id}).$promise.then(function(response){
    	$scope.residents = response;
      $scope.isLoading = false;
    });


   
    $scope.changeUser = function(id){
      $scope.messages = $firebaseArray(new Firebase('https://evolutiontech.firebaseio.com/residents/' + id + '/chat'))
      $scope.tasks = $firebaseArray(new Firebase('https://evolutiontech.firebaseio.com/residents/' + id + '/tasks'))
      console.log($scope.tasks)
    }

    $scope.sendMessage = function(){
      var d = Date.now()
      $scope.messages.$add({text: $scope.message.text, userId: $scope.myId, time: d, seen: false })
      $scope.message.text = ''
    }

    // $scope.toggleTask = function(task){
    //   if(task.complete == false){
    //     task.complete = true;
    //   } else {
    //     task.complete = false
    //   }
    //    $scope.tasks.$save(task).then(function(ref){
    //     console.log(ref)
    //     })
    // }

     $scope.getSelectedText = function() {
        if ($scope.houseFilter !== undefined) {
          return $scope.houseFilter;
        } else {
          return "Filter by house";
        }
      };

      $scope.clearFilter = function(){
        $scope.houseFilter = '';
      }

           
      $scope.showListBottomSheet = function(task, $event) {
          console.log($event)
          $scope.task = task
          $mdBottomSheet.show({
            template: '<md-bottom-sheet class="md-list">'
                        +'<md-subheader>Manage Task</md-subheader>'
                         +'<md-list>'
                          +'<md-list-item>'
                           + '<md-button class="md-raised md-primary" ng-click="toggleTask(task)" ng-show="task.complete == false">'
                             + '<span class="md-inline-list-icon-label">Mark Task Complete</span>'
                           + '</md-button>'
                            + '<md-button class="md-raised md-warn" ng-click="toggleTask(task)" ng-show="task.complete">'
                             +'<span>Mark Task Incomplete</span>'
                            +'</md-button>'
                            +'<md-button class="md-raised reminder-button" ng-click="sendReminder(task)">'
                             + '<span>Send Reminder About This Task</span>'
                           + '</md-button>'
                          +'</md-list-item>'
                        +'</md-list>'
                      + '</md-bottom-sheet>',
            controller: 'BottomSheetController',
            locals: {task: $scope.task,
                    tasks: $scope.tasks,
                    messages: $scope.messages}
          }).then(function(clickedItem) {
           console.log(clickedItem)
          });
       };
      }
  
})();


(function(){
  BottomSheetController.$inject = ["task", "$scope", "tasks", "messages", "$mdBottomSheet"];
  angular
    .module('pcui')
    .controller('BottomSheetController', BottomSheetController)


  function BottomSheetController(task, $scope, tasks, messages, $mdBottomSheet){
    $scope.task = task
    $scope.tasks = tasks
    $scope.messages = messages;
    console.log(messages, task, tasks)

    $scope.toggleTask = function(task){
      if(task.complete == false){
        task.complete = true;
      } else {
        task.complete = false
      }
       $scope.tasks.$save(task).then(function(ref){
        
        })
       $mdBottomSheet.hide()
    }

    $scope.sendReminder = function(task){
      $scope.messages.$add({text: "You need to" + ' ' + task.name, time: Date.now(), userId: window.localStorage.name})
      $mdBottomSheet.hide()
    }
  }
})();


(function(){
  angular
    .module('pcui')
    .directive('schrollBottom', function(){
      return {
        scope: {
          schrollBottom: "="
        },
        link: function (scope, element) {
          scope.$watchCollection('schrollBottom', function (newValue) {
            if (newValue)
            {
              $(element).scrollTop($(element)[0].scrollHeight);
            }
          });
        }
      }
    })
})();


(function(){
	'use strict';

		ResidentService.$inject = ["$resource"];
	angular
		.module('pcui')
		.factory('ResidentService', ResidentService)

		function ResidentService($resource){
			return $resource('https://frozen-reaches-83397.herokuapp.com//api/v1/users/:user_id/residents', {user_id: '@user_id'})
		}
})();
(function() {
	'use strict';

	LoginCtrl.$inject = ["$scope", "$state", "$resource", "$mdDialog", "$window"];
	angular
		.module('pcui')
		.controller('LoginCtrl',  LoginCtrl)

	function LoginCtrl($scope, $state, $resource, $mdDialog, $window) {
		var showDialog = function(error){
		  $mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .title('Problem logging in')
	        .textContent(error)
	        .ariaLabel('Alert Dialog Demo')
	        .ok('Got it!')
	    	);
		}

		var loginSuccessCallback = function(response){
			var user = response.data
			$window.localStorage.id = user.id;
			$window.localStorage.email = user.uid;
			$window.localStorage.name = user.name;
			$state.go('home')
		}

		var loginErrorCallback = function(err){
			var error = err["data"]["errors"][0]
			showDialog(error);
			$scope.loading = false
		}
		$scope.user = {}
		$scope.loading = false;

		$scope.login = function(){
			$scope.loading = true;
			var UserSession = $resource('https://frozen-reaches-83397.herokuapp.com//api/v1/auth/sign_in.json');
			var userSession = new UserSession({email: $scope.user.email, password: $scope.user.password});
			userSession.$save(function(data){loginSuccessCallback(data)}, function(err){loginErrorCallback(err)})

		}

		// $scope.$on('devise:login', function(event, currentUser){
		// 	console.log(event, currentUser)
		// });

		// $scope.$on('devise:new-session', function(event, currentUser){
		// 	window.localStorage.clear();
		// 	window.localStorage.id = currentUser.id;
		// 	window.localStorage.email = currentUser.email;
		// 	$state.go('home')
		// })


	}
})();
(function(){
		ChatController.$inject = ["$scope", "$firebaseArray"];
	angular
		.module('pcui')
		.controller('ChatController', ChatController)

		function ChatController($scope, $firebaseArray){

			$scope.messages = $firebaseArray(new Firebase('https://evolutiontech.firebaseio.com/residents/1/chat'))

			var getMessages = function(id){
				// var ref = new Firebase('https://evolutiontech.firebaseio.com/residents/' + id + '/chat')
				//  $scope.messages = $firebaseArray(ref)
				//  console.log("rawr")

				console.log(id)
			}


		}
})();
(function(){
	CalendarController.$inject = ["$scope", "$firebaseArray", "ResidentService", "uiCalendarConfig"];
	angular
		.module('pcui')
		.controller('CalendarController', CalendarController)

	function CalendarController($scope, $firebaseArray, ResidentService, uiCalendarConfig){
		 

      
    $scope.events = $firebaseArray(new Firebase('https://evolutiontech.firebaseio.com/residents/1/calendar'))
    
    



    ResidentService.query({user_id: window.localStorage.id}).$promise.then(function(response){
      $scope.residents = response
      
    })


    $scope.updateOnDrop = function(event, delta, revertFunc) {
     array = $scope.uiConfig.calendar.events.events
     record = array.$getRecord(event.$id)
     record.start = event._start.valueOf()
     record.end = event._end.valueOf()

     array.$save(record)
     
     console.log(uiCalendarConfig.calendars.myCalendar.fullCalendar())
    };

    $scope.resizeDrop = function(event, jsEvent, ui, view, rawr, rawr1) {
     
     array = $scope.uiConfig.calendar.events.events
     record = array.$getRecord(event.$id)
     record.start = event._start.valueOf()
     record.end = event._end.valueOf()

     array.$save(record);
     console.log(uiCalendarConfig.calendars.myCalendar.fullCalendar('gotoDate', '01/01/2015'))
     uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView', 'month');
    };

  

      $scope.uiConfig = {
        calendar:{
          editable: true,
          header:{
            left: 'month agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next'
          },
          events:  {
            events: $scope.events
          },
          defaultView: 'agendaWeek',
          // dayClick: $scope.alertEventOnClick,
          eventDrop: $scope.updateOnDrop,
          eventResize: $scope.resizeDrop
        }
     }

 $scope.changeCalendar = function(id) {
      $scope.uiConfig.calendar.events = null;

      ref = new Firebase('https://evolutiontech.firebaseio.com/residents/' + id + '/calendar');
      
      $scope.uiConfig.calendar.events = {
        events: $firebaseArray(ref)
      }

    }
   
   

    // $scope.events.$add({
    //   title: 'Test Event',
    //   start: moment().add(1, 'month').valueOf(),
    //   end: moment().add(1, 'month').valueOf() + 100000
    // });

	};
})();
(function() {
  'use strict';

  runBlock.$inject = ["$log"];
  angular
    .module('pcui')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

(function() {
  'use strict';

  routerConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  angular
    .module('pcui')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html'
      })

      .state('resident', {
        url: '/residents/:id',
        templateUrl: 'app/resident-show/resident-show.html',
        controller: 'ResidentController'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      });
      

    $urlRouterProvider.otherwise('/login');
  }

})();

/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('pcui')
    .constant('malarkey', malarkey)
    .constant('moment', moment);

})();

(function() {
  'use strict';

  config.$inject = ["$logProvider", "toastrConfig", "$httpProvider"];
  angular
    .module('pcui')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
    $httpProvider.defaults.withCredentials = true;
  }


})();

angular.module("pcui").run(["$templateCache", function($templateCache) {$templateCache.put("app/calendar/calendar.html","<md-content class=calendar-view ng-controller=CalendarController><div layout=row><div flex=25><md-button class=md-raised ng-click=addEvent()>Add Event</md-button><div class=sources ng-repeat=\"resident in residents\"><div class=sources-container ng-click=changeCalendar(resident.id)>{{resident.first_name + \' \' + resident.last_name}}</div></div></div><div flex=75 class=calendar ui-calendar=uiConfig.calendar calendar=myCalendar ng-model=events></div></div></md-content>");
$templateCache.put("app/chat/chat.TMPL.html","");
$templateCache.put("app/login/login.html","<div class=baller-form-container><h2>Welcome to the future of TP<small>Please log in here.</small></h2><form class=baller-form ng-show=!loading><div class=baller-group><input type=text ng-model=user.email required> <span class=highlight></span> <span class=bar></span><label>Email</label></div><div class=baller-group><input type=password ng-model=user.password required> <span class=highlight></span> <span class=bar></span><label>Password</label></div><div class=baller-group><md-checkbox ng-model=user.remember_me aria-label=\"Checkbox 1\">Remember Me?</md-checkbox></div><md-button type=submit class=\"md-raised md-primary\" ng-click=login()>Login</md-button></form><md-progress-circular md-mode=indeterminate ng-show=loading align=center></md-progress-circular></div>");
$templateCache.put("app/main/main.html","<div ng-cloak><md-content class=main-page><md-tabs md-dynamic-height md-border-bottom><md-tab label=\"Resident Control\"><ng-include src=\"\'app/main/resident-tab.html\'\"></ng-include></md-tab><md-tab label=\"Resident Calendar\"><md-content class=md-padding><h1 class=md-display-2>Resident Calendar</h1><ng-include src=\"\'app/calendar/calendar.html\'\"></ng-include></md-content></md-tab><md-tab label=Map><md-content class=md-padding ng-controller=MapController><h1 class=md-display-2>Map</h1><div class=map-container><div map-lazy-load={{googleMapsUrl}}><map center=41,-87 zoom=15 marker=41,-87><marker position=[41,-87]></marker></map></div></div></md-content></md-tab></md-tabs></md-content></div>");
$templateCache.put("app/main/resident-detail.TMPL.html","<md-dialog aria-label=\"Mango (Fruit)\" ng-cloak><form><md-toolbar><div class=md-toolbar-tools><h2>Mango (Fruit)</h2><span flex></span><md-button class=md-icon-button ng-click=cancel()><md-icon aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content>Resident Info Here</div></md-dialog-content><md-dialog-actions layout=row><md-button href=http://en.wikipedia.org/wiki/Mango target=_blank md-autofocus>More on Wikipedia</md-button><span flex></span><md-button ng-click=\"answer(\'not useful\')\">Not Useful</md-button><md-button ng-click=\"answer(\'useful\')\" style=margin-right:20px>Useful</md-button></md-dialog-actions></form></md-dialog>");
$templateCache.put("app/main/resident-tab.html","<md-content class=md-padding ng-controller=MainController><h3 class=md-headline>Welcome, {{userName}}</h3><md-input-container id=search-input-container><input type=text id=search-input ng-model=searchText> <span class=highlight></span> <span class=bar></span><label>Search by any Field</label></md-input-container><md-input-container><label class=rawr>House Filter</label><md-select ng-model=houseFilter md-selected-text=getSelectedText() md-container-class=houses-container><md-optgroup label=Houses><md-option ng-value=clear ng-click=clearFilter()>Clear Filter</md-option><md-option ng-value=house ng-repeat=\"house in houseList\">{{house}}</md-option></md-optgroup></md-select></md-input-container><v-accordion class=vAccordion--default onexpand=\"console.log(index, id)\"><md-progress-linear md-mode=indeterminate ng-show=isLoading></md-progress-linear><v-pane ng-repeat=\"resident in residents | filter:searchText | filter:houseFilter\" expanded=resident.isExpanded><v-pane-header ng-click=changeUser(resident.id)><md-list-item class=residents-container layout=row><img class=\"md-avatar main-avatar\" ng-src=http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-hi.png><div flex=20><p>{{resident.first_name + \' \' + resident.last_name}}</p></div><div flex=20><p>Phase: {{resident.phase}}</p></div><div flex=60><p>House: {{resident.house_address}}</p></div></md-list-item></v-pane-header><v-pane-content><div class=resident-info id={{resident.id}} layout=row><div flex=40><h3 align=center>Chat</h3><div class=chat-container schroll-bottom=messages><md-list class=md-dense flex><md-list-item class=\"message md-2-line\" ng-repeat=\"message in messages\" ng-class=\"{other: message.userId != myId}\"><!--  <img ng-src=\"http://lorempixel.com/400/200\" class=\"md-avatar\">  --><div class=md-list-item-text><p>{{message.userId}}</p><h3>{{message.text}}</h3></div></md-list-item></md-list><div layout=row layout-align=\"center end\"><md-input-container class=item-input-wrapper><input type=text placeholder=\"Type your message\" ng-keyup=\"$event.keyCode == 13 && sendMessage()\" ng-model=message.text><md-button class=md-raised ng-click=sendMessage()>Send</md-button></md-input-container></div></div></div><div flex=40><h3 align=center>Tasks</h3><div class=tasks-container><md-list flex><md-list-item class=\"md-1-line singular-task\" ng-repeat=\"task in tasks\" ng-click=\"showListBottomSheet(task, $event)\"><i class=\"icon ion-close-circled md-avatar task-incomplete\" ng-show=\"task.complete == false\"></i> <i class=\"icon ion-checkmark-circled md-avatar task-complete\" ng-show=\"task.complete == true\"></i><h4>{{task.name}}</h4></md-list-item></md-list></div></div><div flex=20><h3 align=center>Actions</h3><md-button class=md-raised ui-sref=\"resident({id: resident.id})\">Details</md-button><!--  <h3 align=\"center\">Map</h3>\n\n          <div class=\"resident-map-container\">\n            <div map-lazy-load=\"https://maps.google.com/maps/api/js\" map-lazy-load-params=\"{{googleMapsUrl}}\">\n              <ng-map center=\"{{resident.location.latitude}}, {{resident.location.longitude}}\" zoom=\"15\">\n                <marker position=\"[{{resident.location.latitude}}, {{resident.location.longitude}}]\"></div>\n              </ng-map>\n            </div> --></div></div></v-pane-content></v-pane></v-accordion></md-content>");
$templateCache.put("app/main/template.TMPL.html","<md-bottom-sheet class=md-list><md-subheader>Manage Task</md-subheader><md-list><md-list-item><md-button class=\"md-raised md-primary\" ng-click=toggleTask(task) ng-show=\"task.complete == false\"><span class=md-inline-list-icon-label>Mark Task Complete</span></md-button><md-button class=\"md-raised md-warn\" ng-click=toggleTask(task) ng-show=task.complete><span>Mark Task Incomplete</span></md-button><md-button class=\"md-raised reminder-button\" ng-click=sendReminder(task)><span>Send Reminder About This Task</span></md-button></md-list-item></md-list></md-bottom-sheet>");
$templateCache.put("app/map/map.html","");
$templateCache.put("app/resident-show/resident-show.html","<md-content><div class=resident-show-container><h3 class=md-display-2>{{residentInfo.first_name + \' \' + residentInfo.last_name}}</h3><div layout=row><div flex class=resident-information><div class=resident-info-container><h3>Resident ID: {{residentInfo.id}}<br>Phone: {{residentInfo.phone_number}}<br>Phase: {{residentInfo.phase}}<br>Sober Date: {{residentInfo.sober_date | date:long}}<br>House Address: {{residentInfo.house_address}}<br></h3></div><div class=map-container><h3 class=md-display-1>Current Location</h3><ng-map center={{currentLocation.latitude}},{{currentLocation.longitude}}><marker position={{currentLocation.latitude}},{{currentLocation.longitude}}></marker></ng-map></div></div><div flex class=resident-picture><img class=resident-photo ng-src=http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-hi.png></div></div></div></md-content>");
$templateCache.put("app/components/navbar/navbar.html","<md-toolbar layout=row layout-align=\"center center\"><md-button href=https://github.com/Swiip/generator-gulp-angular>Gulp Angular</md-button><section flex layout=row layout-align=\"left center\"><md-button href=# class=md-raised>Home</md-button><md-button href=# class=md-raised>About</md-button><md-button href=# class=md-raised>Contact</md-button></section><md-button class=acme-navbar-text>Application was created {{ vm.relativeDate }}.</md-button></md-toolbar>");}]);
//# sourceMappingURL=../maps/scripts/app-3e0e9a75f3.js.map

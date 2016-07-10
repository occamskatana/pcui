!function(){"use strict";angular.module("pcui",["ngMessages","ngResource","ui.router","ngMaterial","toastr","firebase","ui.calendar","ui.bootstrap","ngMap","vAccordion","ngAnimate","irontec.simpleChat"])}(),function(){"use strict";function e(){function e(){return t}var t=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"}];this.getTec=e}angular.module("pcui").service("webDevTec",e)}(),function(){"use strict";function e(){function e(e){var t=this;t.relativeDate=e(t.creationDate).fromNow()}e.$inject=["moment"];var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0};return t}angular.module("pcui").directive("acmeNavbar",e)}(),function(){"use strict";function e(e){function t(t,n,a,o){var r,i=e(n[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});n.addClass("acme-malarkey"),angular.forEach(t.extraValues,function(e){i.type(e).pause()["delete"]()}),r=t.$watch("vm.contributors",function(){angular.forEach(o.contributors,function(e){i.type(e.login).pause()["delete"]()})}),t.$on("$destroy",function(){r()})}function n(e,t){function n(){return a().then(function(){e.info("Activated Contributors View")})}function a(){return t.getContributors(10).then(function(e){return o.contributors=e,o.contributors})}var o=this;o.contributors=[],n()}n.$inject=["$log","githubContributor"];var a={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:t,controller:n,controllerAs:"vm"};return a}e.$inject=["malarkey"],angular.module("pcui").directive("acmeMalarkey",e)}(),function(){"use strict";function e(e,t){function n(n){function o(e){return e.data}function r(t){e.error("XHR Failed for getContributors.\n"+angular.toJson(t.data,!0))}return n||(n=30),t.get(a+"/contributors?per_page="+n).then(o)["catch"](r)}var a="https://api.github.com/repos/Swiip/generator-gulp-angular",o={apiHost:a,getContributors:n};return o}e.$inject=["$log","$http"],angular.module("pcui").factory("githubContributor",e)}(),function(){angular.module("pcui").controller("MapController",["NgMap","$scope",function(e,t){t.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5hEVOsgZkdBXsBdF9t6psC5JuOxK2Agg",e.getMap().then(function(e){console.log(e.getCenter()),console.log("markers",e.markers),console.log("shapes",e.shapes)})}])}(),function(){function e(e){var t={};return t}e.$inject=["$firebaseObject"],angular.module("pcui").factory("LocationService",e)}(),function(){"use strict";function e(e,t,n,a){e.userName=a.localStorage.name,e.isLoading=!0,e.messages,e.tasks,e.message={},e.myId=a.localStorage.name,e.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5hEVOsgZkdBXsBdF9t6psC5JuOxK2Agg",e.houseList=["1212 Quinnipiac Ave","22 Linden","980 Townsend Avenue","The Cove"],e.house,t.query({user_id:window.localStorage.id}).$promise.then(function(t){e.residents=t,e.isLoading=!1}),e.changeUser=function(t){e.messages=n(new Firebase("https://evolutiontech.firebaseio.com/residents/"+t+"/chat")),e.tasks=n(new Firebase("https://evolutiontech.firebaseio.com/residents/"+t+"/tasks")),console.log(e.tasks)},e.sendMessage=function(){var t=Date.now();e.messages.$add({text:e.message.text,userId:e.myId,time:t}),e.message.text=""},e.toggleTask=function(t){0==t.complete?t.complete=!0:t.complete=!1,e.tasks.$save(t).then(function(e){console.log(e)})},e.getSelectedText=function(){return void 0!==e.houseFilter?e.houseFilter:"Filter by house"},e.clearFilter=function(){e.houseFilter=""}}e.$inject=["$scope","ResidentService","$firebaseArray","$window"],angular.module("pcui").controller("MainController",e)}(),function(){angular.module("pcui").directive("schrollBottom",function(){return{scope:{schrollBottom:"="},link:function(e,t){e.$watchCollection("schrollBottom",function(e){e&&$(t).scrollTop($(t)[0].scrollHeight)})}}})}(),function(){"use strict";function e(e){return e("https://frozen-reaches-83397.herokuapp.com/api/v1/users/:user_id/residents",{user_id:"@user_id"})}e.$inject=["$resource"],angular.module("pcui").factory("ResidentService",e)}(),function(){"use strict";function e(e,t,n,a,o){var r=function(e){a.show(a.alert().parent(angular.element(document.querySelector("#popupContainer"))).clickOutsideToClose(!0).title("Problem logging in").textContent(e).ariaLabel("Alert Dialog Demo").ok("Got it!"))},i=function(e){var n=e.data;o.localStorage.id=n.id,o.localStorage.email=n.uid,o.localStorage.name=n.name,t.go("home")},s=function(t){var n=t.data.errors[0];r(n),e.loading=!1};e.user={},e.loading=!1,e.login=function(){e.loading=!0;var t=n("https://frozen-reaches-83397.herokuapp.com/api/v1/auth/sign_in.json"),a=new t({email:e.user.email,password:e.user.password});a.$save(function(e){i(e)},function(e){s(e)})}}e.$inject=["$scope","$state","$resource","$mdDialog","$window"],angular.module("pcui").controller("LoginCtrl",e)}(),function(){function e(e,t){e.messages=t(new Firebase("https://evolutiontech.firebaseio.com/residents/1/chat"))}e.$inject=["$scope","$firebaseArray"],angular.module("pcui").controller("ChatController",e)}(),function(){function e(e,t,n,a){e.events=t(new Firebase("https://evolutiontech.firebaseio.com/residents/1/calendar")),n.query({user_id:window.localStorage.id}).$promise.then(function(t){e.residents=t}),e.updateOnDrop=function(t,n,o){array=e.uiConfig.calendar.events.events,record=array.$getRecord(t.$id),record.start=t._start.valueOf(),record.end=t._end.valueOf(),array.$save(record),console.log(a.calendars.myCalendar.fullCalendar())},e.resizeDrop=function(t,n,o,r,i,s){array=e.uiConfig.calendar.events.events,record=array.$getRecord(t.$id),record.start=t._start.valueOf(),record.end=t._end.valueOf(),array.$save(record),console.log(a.calendars.myCalendar.fullCalendar("gotoDate","01/01/2015")),a.calendars.myCalendar.fullCalendar("changeView","month")},e.uiConfig={calendar:{editable:!0,header:{left:"month agendaWeek agendaDay",center:"title",right:"today prev,next"},events:{events:e.events},defaultView:"agendaWeek",eventDrop:e.updateOnDrop,eventResize:e.resizeDrop}},e.changeCalendar=function(n){e.uiConfig.calendar.events=null,ref=new Firebase("https://evolutiontech.firebaseio.com/residents/"+n+"/calendar"),e.uiConfig.calendar.events={events:t(ref)}}}e.$inject=["$scope","$firebaseArray","ResidentService","uiCalendarConfig"],angular.module("pcui").controller("CalendarController",e)}(),function(){"use strict";function e(e){e.debug("runBlock end")}e.$inject=["$log"],angular.module("pcui").run(e)}(),function(){"use strict";function e(e,t){e.state("home",{url:"/",templateUrl:"app/main/main.html"}).state("login",{url:"/login",templateUrl:"app/login/login.html",controller:"LoginCtrl"}),t.otherwise("/login")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("pcui").config(e)}(),function(){"use strict";angular.module("pcui").constant("malarkey",malarkey).constant("moment",moment)}(),function(){"use strict";function e(e,t,n){e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=3e3,t.positionClass="toast-top-right",t.preventDuplicates=!0,t.progressBar=!0,n.defaults.withCredentials=!0}e.$inject=["$logProvider","toastrConfig","$httpProvider"],angular.module("pcui").config(e)}(),angular.module("pcui").run(["$templateCache",function(e){e.put("app/calendar/calendar.html","<md-content class=calendar-view ng-controller=CalendarController><div layout=row><div flex=25><md-button class=md-raised ng-click=addEvent()>Add Event</md-button><div class=sources ng-repeat=\"resident in residents\"><div class=sources-container ng-click=changeCalendar(resident.id)>{{resident.first_name + ' ' + resident.last_name}}</div></div></div><div flex=75 class=calendar ui-calendar=uiConfig.calendar calendar=myCalendar ng-model=events></div></div></md-content>"),e.put("app/chat/chat.TMPL.html",""),e.put("app/login/login.html",'<div class=baller-form-container><h2>Welcome to the future of TP<small>Please log in here.</small></h2><form class=baller-form ng-show=!loading><div class=baller-group><input type=text ng-model=user.email required> <span class=highlight></span> <span class=bar></span><label>Email</label></div><div class=baller-group><input type=password ng-model=user.password required> <span class=highlight></span> <span class=bar></span><label>Password</label></div><div class=baller-group><md-checkbox ng-model=user.remember_me aria-label="Checkbox 1">Remember Me?</md-checkbox></div><md-button type=submit class="md-raised md-primary" ng-click=login()>Login</md-button></form><md-progress-circular md-mode=indeterminate ng-show=loading align=center></md-progress-circular></div>'),e.put("app/main/main.html",'<div ng-cloak><md-content class=main-page><md-tabs md-dynamic-height md-border-bottom><md-tab label="Resident Control"><ng-include src="\'app/main/resident-tab.html\'"></ng-include></md-tab><md-tab label="Resident Calendar"><md-content class=md-padding><h1 class=md-display-2>Resident Calendar</h1><ng-include src="\'app/calendar/calendar.html\'"></ng-include></md-content></md-tab><md-tab label=Map><md-content class=md-padding ng-controller=MapController><h1 class=md-display-2>Map</h1><div class=map-container><div map-lazy-load={{googleMapsUrl}}><map center=41,-87 zoom=15 marker=41,-87><marker position=[41,-87]></marker></map></div></div></md-content></md-tab></md-tabs></md-content></div>'),e.put("app/main/resident-detail.TMPL.html",'<md-dialog aria-label="Mango (Fruit)" ng-cloak><form><md-toolbar><div class=md-toolbar-tools><h2>Mango (Fruit)</h2><span flex></span><md-button class=md-icon-button ng-click=cancel()><md-icon aria-label="Close dialog"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content>Resident Info Here</div></md-dialog-content><md-dialog-actions layout=row><md-button href=http://en.wikipedia.org/wiki/Mango target=_blank md-autofocus>More on Wikipedia</md-button><span flex></span><md-button ng-click="answer(\'not useful\')">Not Useful</md-button><md-button ng-click="answer(\'useful\')" style=margin-right:20px>Useful</md-button></md-dialog-actions></form></md-dialog>'),e.put("app/main/resident-tab.html",'<md-content class=md-padding ng-controller=MainController><h3 class=md-headline>Welcome, {{userName}}</h3><md-input-container id=search-input-container><input type=text id=search-input ng-model=searchText> <span class=highlight></span> <span class=bar></span><label>Search by any Field</label></md-input-container><md-input-container><label class=rawr>House Filter</label><md-select ng-model=houseFilter md-selected-text=getSelectedText() md-container-class=houses-container><md-optgroup label=Houses><md-option ng-value=clear ng-click=clearFilter()>Clear Filter</md-option><md-option ng-value=house ng-repeat="house in houseList">{{house}}</md-option></md-optgroup></md-select></md-input-container><v-accordion class=vAccordion--default onexpand="console.log(index, id)"><md-progress-linear md-mode=indeterminate ng-show=isLoading></md-progress-linear><v-pane ng-repeat="resident in residents | filter:searchText | filter:houseFilter" expanded=resident.isExpanded><v-pane-header ng-click=changeUser(resident.id)><div class=residents-container layout=row><div flex=20><p>{{resident.first_name + \' \' + resident.last_name}}</p></div><div flex=20><p>Phase: {{resident.phase}}</p></div><div flex=60><p>House: {{resident.house_address}}</p></div></div></v-pane-header><v-pane-content><div class=resident-info id={{resident.id}} layout=row><div flex=25><h3 align=center>Chat</h3><!-- <ng-include src="\'app/chat/chat.TMPL.html\'"></ng-include> --><div class=chat-container schroll-bottom=messages><div class=messages ng-repeat="message in messages"><div class=message ng-class="{other: message.userId == myId}"><p><strong ng-show="message.userId != myId">{{resident.first_name}}</strong></p><br><span>{{message.text}}</span></div></div><div layout=row layout-align="center end"><md-input-container class=item-input-wrapper><input type=text placeholder="Type your message" ng-keyup="$event.keyCode == 13 && sendMessage()" ng-model=message.text><md-button class=md-raised ng-click=sendMessage()>Send</md-button></md-input-container></div></div></div><div flex=30><!-- <h3 align="center">Map</h3>\n\n          <div class="resident-map-container">\n            <div map-lazy-load="https://maps.google.com/maps/api/js" map-lazy-load-params="{{googleMapsUrl}}">\n              <ng-map center="{{resident.location.latitude}}, {{resident.location.longitude}}" zoom="15">\n                <marker position="[{{resident.location.latitude}}, {{resident.location.longitude}}]"></div>\n              </ng-map>\n            </div>\n          </div> --><h3 align=center>Tasks</h3><div class=tasks-container><md-list flex><md-list-item class="md-1-line singular-task" ng-repeat="task in tasks" ng-click=toggleTask(task)><i class="icon ion-close-circled md-avatar task-incomplete" ng-show="task.complete == false"></i> <i class="icon ion-checkmark-circled md-avatar task-complete" ng-show="task.complete == true"></i><h4>{{task.name}}</h4></md-list-item></md-list></div></div></div></v-pane-content></v-pane></v-accordion></md-content>'),e.put("app/map/map.html",""),e.put("app/components/navbar/navbar.html",'<md-toolbar layout=row layout-align="center center"><md-button href=https://github.com/Swiip/generator-gulp-angular>Gulp Angular</md-button><section flex layout=row layout-align="left center"><md-button href=# class=md-raised>Home</md-button><md-button href=# class=md-raised>About</md-button><md-button href=# class=md-raised>Contact</md-button></section><md-button class=acme-navbar-text>Application was created {{ vm.relativeDate }}.</md-button></md-toolbar>')}]);
//# sourceMappingURL=../maps/scripts/app-c8183ac1c0.js.map

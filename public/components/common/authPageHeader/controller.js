"use strict";angular.module(window.APP.modules.main).directive("authPageHeader",function(){return{templateUrl:"/components/common/authPageHeader/view.html",restrict:"E",scope:{heading:"=headingText",sub:"=subText"},controller:["$rootScope","$scope",function(a,b){b.APP=a.APP}]}});
"use strict";angular.module(window.APP.modules.main).directive("logo",function(){return{templateUrl:"/components/common/logo/view.html",restrict:"E",replace:!0,scope:{color:"@color"},controller:["$scope",function(a){a.color?a.url="/assets/images/logo-48-"+a.color+".png":a.url="/assets/images/logo-48.png"}]}});
"use strict";angular.module(window.APP.modules.main).service("pageTitle",["APP","$rootScope","$filter",function(a,b,c){var d,e=function(){d=this,d.init()};return e.prototype={init:function(){d.titles={login:"LOGIN",signup:"SIGN_UP",logout:"LOGOUT","forgot-password":"FORGOT_PASSWORD","reset-password":"RESET_PASSWORD","page-successful":"SUCCESSFUL",home:"HOME",settings:"SETTINGS",settingCreate:"SETTINGS",settingDetails:"SETTINGS",groups:"GROUPS",groupCreate:"GROUPS",groupDetails:"GROUPS",users:"USERS",userCreate:"USERS",userDetails:"USERS"},b.$on("$stateChangeSuccess",function(a,b,e,f,g){d.change(c("translate")(d.titles[b.name]))})},change:function(b){document.title=b+" | "+a.title}},e}]);
"use strict";angular.module(window.APP.modules.user).controller("users",["$scope","$state","$stateParams","$filter","alertify","userAPI",function(a,b,c,d,e,f){function g(){h(a.query,function(b){a.users=b,i(a.query,function(b){a.count.users=b})})}function h(a,b){f.query(a,function(a){b&&b(a)})}function i(a,b){f.count(a,function(a){b&&b(a.total)})}function j(a,b){a.$delete(function(a){b&&b(a),e.success(d("translate")("X_HAS_BEEN_DELETED",a.email))})}a.query={query:void 0,sort:"email",page:1,limit:25},a.count={users:0},g(),a.search=function(b){b&&(a.query.sort=b),g()},a.canCreate=function(){return f.canCreate()},a["delete"]=function(b){b&&b.canDelete()&&confirm(d("translate")("CONFIRM_DELETE_X",b.email))&&j(b,function(b){a.users.forEach(function(c,d){c._id===b._id&&a.users.splice(d,1)})})}}]).controller("userDetails",["$scope","$state","$stateParams","$modal","$filter","alertify","userAPI","groupAPI",function(a,b,c,d,e,f,g,h){function i(a,c){g.get(a,function(a){c&&c(a)},function(a){b.go("users")})}function j(b,c){b.$save(function(a){c&&c(a),f.success(e("translate")("X_HAS_BEEN_CREATED",a.email))},function(b){b.data.validationErrors&&(a.validationErrors=b.data.validationErrors)})}function k(b,c){b.$update(function(a){c&&c(a),f.success(e("translate")("X_HAS_BEEN_UPDATED",a.email))},function(b){b.data.validationErrors&&(a.validationErrors=b.data.validationErrors)})}function l(a,b){a.$delete(function(a){b&&b(a),f.success(e("translate")("X_HAS_BEEN_DELETED",a.email))})}function m(a,b){h.query(a,function(a){b&&b(a)})}function n(a){g.getProfile(function(b){a&&a(b)},function(a){b.go("home")})}function o(b,c){g.updateProfile(b,function(a){c&&c(a),f.success(e("translate")("X_HAS_BEEN_UPDATED",a.email))},function(b){b.data.validationErrors&&(a.validationErrors=b.data.validationErrors)})}"userCreate"===b.current.name?(a.state="create",a.user=new g({email:void 0,password:void 0}),m({limit:0,page:0,sort:"name"},function(b){a.groups=b})):"userDetails"===b.current.name?(a.state="details",i({_id:c.userId},function(b){a.user=b,m({limit:0,page:0,sort:"name"},function(b){a.groups=b})})):(a.state="profile",n(function(b){a.user=b})),a.validationErrors={email:void 0,password:void 0},a.save=function(){a.form.$valid&&("create"===a.state?a.user.canCreate()&&j(a.user,function(c){a.form.$setPristine(),b.go("userDetails",{userId:c._id})}):"details"===a.state?a.user.canEdit()&&k(a.user,function(b){a.form.$setPristine(),a.user=b}):o(a.user,function(b){a.form.$setPristine(),a.user=b,a.USER.login(a.user)}))},a.changePassword=function(){if("profile"===a.state){d.open({backdrop:"static",templateUrl:"/components/user/views/changePasswordModal.html",resolve:{resources:["$ocLazyLoad",function(a){return a.load(["/apis/user.js"])}],userId:function(){return a.user._id}},controller:["$scope","$modalInstance","alertify","userAPI","userId",function(a,b,c,d,f){function g(b,f){d.changePassword(b,function(a){f&&f(a),c.success(e("translate")("X_HAS_BEEN_UPDATED",e("translate")("NEW_PASSWORD")))},function(b){b.data.validationErrors&&(a.validationErrors=b.data.validationErrors)})}a.user={_id:f,password:null,confirmPassword:null},a.validationErrors={password:null,confirmPassword:null},a.save=function(c){c&&g(a.user,function(a){b.close()})},a.cancel=function(){b.dismiss("cancel")}}]})}},a["delete"]=function(){a.user.canDelete()&&confirm(e("translate")("CONFIRM_DELETE_X",a.user.email))&&l(a.user,function(c){a.form.$setPristine(),b.go("users")})}}]);
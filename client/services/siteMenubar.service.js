'use strict';

angular
    .module(window.APP.modules.main)
    .service('siteMenubar', siteMenubar);

siteMenubar.$inject = ['$rootScope'];
function siteMenubar($rootScope) {
    var service = {
        init: init,
        animate: animate,
        open: open,
        hide: hide,
        unfold: unfold,
        fold: fold,
        toggle: toggle
    };

    return service;

    // functions
    function init() {
        $('html').removeClass('css-menubar').addClass('js-menubar');
        var breakpoint = Breakpoints.current();
        switch (breakpoint.name) {
            case 'lg':
                $('body').removeClass('site-menubar-fold').addClass('site-menubar-unfold');
                break;
            case 'md':
            case 'sm':
                $('body').removeClass('site-menubar-unfold').addClass('site-menubar-fold');
                break;
            case 'xs':
                $('body').removeClass('site-menubar-open').addClass('site-menubar-hide site-menubar-unfold');
                break;
        }
    }
    function animate(doing, callback) {
        $('body').addClass('site-menubar-changing');
        doing();
        setTimeout(function() {
            if (callback) {
                callback();
            }
            $('body').removeClass('site-menubar-changing');
        }, 500);
    }
    function open() {
        service.animate(function() {
            $('body').removeClass('site-menubar-hide').addClass('site-menubar-open site-menubar-unfold');
            $('html').addClass('disable-scrolling');
            $('.hamburger').removeClass('hided');
        });
    }
    function hide() {
        service.animate(function() {
            $('html').removeClass('disable-scrolling');
            $('body').removeClass('site-menubar-open').addClass('site-menubar-hide site-menubar-unfold');
            $('.hamburger').addClass('hided');
        }, function() {});
    }
    function unfold() {
        service.animate(function() {
            $('body').removeClass('site-menubar-fold').addClass('site-menubar-unfold');
        });
    }
    function fold() {
        service.animate(function() {
            $('body').removeClass('site-menubar-unfold').addClass('site-menubar-fold');
        });
    }
    function toggle() {
        var breakpoint = Breakpoints.current();
        switch (breakpoint.name) {
            case 'lg':
            case 'md':
            case 'sm':
                if ($('body').hasClass('site-menubar-unfold') && !$('body').hasClass('site-menubar-fold')) {
                    service.fold();
                } else {
                    service.unfold();
                }
                break;
            case 'xs':
                if ($('body').hasClass('site-menubar-hide') && !$('body').hasClass('site-menubar-open')) {
                    service.open();
                } else {
                    service.hide();
                }
                break;
        }
    }
}
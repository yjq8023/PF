/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
////拦截器
//angular.module('inspinia').factory('MyInterceptor', function($q) {
//    return {
//        // 可选，拦截成功的请求
//        request: function(config) {
//            // 进行预处理
//            console.log("拦截成功")
//            var cookie=document.cookie;
//            token=cookie.split(';')[0].split('=')[1];
//            config.headers.Authorization="Bearer "+token;
//            return config || $q.when(config);
//        },
//
//        // 可选，拦截失败的请求
//        requestError: function(rejection) {
//            // 对失败的请求进行处理
//            console.log("拦截失败")
//            if (canRecover(rejection)) {
//                return responseOrNewPromise
//            }
//            return $q.reject(rejection);
//        }
//    };
//});

function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider,$httpProvider) {
    //添加拦截器
    //$httpProvider.interceptors.push('MyInterceptor');


    $urlRouterProvider.otherwise("/login");
    //$urlRouterProvider.otherwise("/index/main");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html"
        })
        .state('index.conversation', {
            url: "/conversation",
            templateUrl: "views/main.html"
        })
        .state('index.log', {
            url: "/log",
            templateUrl: "views/main.html",

        })
        .state('index.cache', {
            url: "/cache",
            templateUrl: "views/minor.html",

        })
        .state('index.monitor', {
            url: "/monitor",
            templateUrl: "views/monitor.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js','js/plugins/iCheck/Sngularicheck.js']
                        }
                    ]);
                }
            }

        })
        .state('index.laneright', {
            url: "/laneright",
            templateUrl: "views/laneRight.html",

        })
        .state('laneright', {
            url: "/laneright",
            templateUrl: "views/laneRight.html",

        })
        .state('index.Secondary', {
            abstract: true,
            url:"/Secondary",
            templateUrl: "views/Secondary.html"
        })
        .state('index.Secondary.main', {
            url:"/Secondary/main",
            templateUrl: "views/main.html"
        })
        .state('index.Secondary.monitor', {
            url:"/Secondary/monitor",
            templateUrl: "views/monitor.html",

        })
        .state('index.clients', {
            url: "/clients",
            templateUrl: "views/clients.html",
            data: { pageTitle: 'Clients' }
        })
}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });

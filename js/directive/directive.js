/**
 * Created by Mr.yang on 2017/3/29.
 */
var app=angular.module('inspinia');
app.directive('search',function(){
    return {
        template:'<div class="col-sm-12" style="padding: 2px 7px"><div class="ibox border-bottom m-b-none"><div class="ibox-title"> <h5>搜索栏</h5> </div> </div> </div>',
        restrict:"AECM"
    }
});
app.directive('fullScroll',function fullScroll($timeout){
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
                element.slimscroll({
                    height: '100%',
                    railOpacity: 0.9
                });

            });
        }
    };
})

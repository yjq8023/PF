/**
 * Created by Mr.yang on 2017/3/23.
 */
var app=angular.module('inspinia');
//计算某个时间距离现在多少分钟
app.filter("timeFilter",function(){
    return function(n_date,e){
        //说明：把开始时间跟当前时间转换成毫秒值进行比较，得出结果在转换成时分秒
        if(e){
            s=new Date(e)
            var TimeDifference=Math.floor((n_date.getTime()-s.getTime())/1000)
            var T=Math.floor(TimeDifference/60/60)
            var M=Math.floor((TimeDifference/60)%60)
            var S=TimeDifference % 60;
            T= T<10?'0'+T:T;
            M= M<10?'0'+M:M;
            S= S<10?'0'+S:S;
            if(T=='00'){
                T=false
            }
            var obj={
                T:T,
                M:M,
                S:S,
                TimeDifference:TimeDifference
            }
            return obj
        }else{
            return {
                T:false,
                M:'00',
                S:'00'
            }
        }

    }
});
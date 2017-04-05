/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl($http,$scope,DataServers,$rootScope) {
    var _this=this;
    var user={
        name:'平方科技',
        name_small:'PF',
        authority:1
    }
    this.user=user;
    this.username='';
    this.password='';
    _this.nowTime=new Date();//同步当前时间
    setInterval(function(){
        _this.nowTime=new Date();
        $scope.$apply();
    },1000)
    //登录请求
    this.login=function(){
        window.location.href="index.html#/index/conversation"
    }
    DataServers.GetSessionList(_this)
    DataServers.GetStatusList(_this)
    DataServers.GetQueueList(_this)

    //创建与服务器连接的服务
    //$.connection.hub.url="http://139.199.225.84/signalr/hubs"
    //var proxy = $.connection.messageHub;
    //$.connection.qs={Type:'Broswer',Name:'Broswer'}
    //$.connection.qs="Type=Watch";
    //$.connection.hub.qs = "Type=Client";
    //获取会话缓存的服务数据
    //proxy.client.GetSessionList=function(datas){
    //    _this.SessionList=JSON.parse(datas);
    //    console.log(JSON.parse(datas))
    //    $scope.$apply();//告诉angular进行数据更新
    //}
    //$.connection.hub.start()
    ////获取车道缓存的服务数据
    //proxy.client.GetStatusList=function(datas){
    //    //把数据转成对象
    //    var data_old=JSON.parse(datas);
    //    //把数据拆分成进出两种
    //    var data_in=[]
    //    var data_out=[]
    //    for(var i=0;i<data_old.length;i++){
    //        data_old[i].lane_status=JSON.parse(data_old[i].lane_status);//lane_status是个字符串，转成对象
    //        data_old[i].Imgifshow=data_old[i].lane_status.ocr_trunk_no==data_old[i].lane_status.rfid_trunk_no?false:true;
    //        if(data_old[i].direction=='Out'){
    //            data_out.push(data_old[i]);
    //        }else{
    //            data_in.push(data_old[i]);
    //        }
    //    }
    //    //绑定到angular里
    //    _this.GetUserList=data_old
    //    _this.GetUserListIn=data_in
    //    _this.GetUserListOut=data_out
    //    console.log(_this.GetUserList)
    //    //console.log(_this.GetUserListIn)
    //    //console.log(_this.GetUserListOut)
    //    $scope.$apply();//angular进行数据更新
    //}
    ////修改日志缓存数据
    //$.connection.hub.start(function(){
    //    //该方法不传参用于确认用户修改的数据上传给服务器
    //    //传参可以则是直接上传
    //   _this.change= function(obj,changObj){
    //       if(obj){
    //           _this.setMessage(obj,changObj)//修改暂存数据
    //       }
    //        proxy.server.ChangeStatus($rootScope.message.message_content.lane_code, JSON.stringify($rootScope.message));//发送message对象
    //    }
    //});
    //proxy.client.ReciveRe = function (data) {
    //    console.log(data);//如果修改完成，接收修改执行结果
    //}
    //_this.setMessage=DataServer.setMessage

 }
//导航控制器
function navCtrl($http){
    var _this=this;
    _this.navList=[];//导航列表
    //页面初始化时获取导航列表数据
    _this.navInit=function(){
        $http({
            method:'get',
            url:'server/navlist.json'
        })
         .then(function(data){
            _this.navList=data.data;

        },function(err){
            console.log(err)
        })
    }
}
//列表页控制器
function list($scope){

};

//车道监控左屏控制器
function laneLeft($scope,DataServers){
    console.log('server方法调用')
    var _this=this;
    //判断车辆当前进度
    this.schedule=function(obj){
        var now={}
        obj=obj ||[]
        now.num=0
        now.display=''
        for(var i=0;i<obj.length;i++){
            if(obj[i].status){
                now.num+=1
                now.display=obj[i].display
            }
        }
        now.num=now.num/obj.length*100;
        return now
    }
    //修改车道类型
    _this.changeQueue=function(data,obj){
        DataServers.changeQueue(data,obj)
    }

};
//列表页控制器
function laneRight($scope){
    var _this=this;

};
angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('navCtrl', navCtrl)
    .controller('list', list)
    .controller('laneLeft', laneLeft)
    .controller('laneRight', laneRight)
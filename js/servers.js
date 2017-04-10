/**
 * Created by Mr.yang on 2017/3/30.
 */
//此服务是用于连接服务器，获取以及推送数据
//该服务是封装修改数据状态的对象
angular.module('inspinia').service('DataServers',function($rootScope,$filter,$window){
    var _this=this;
    //创建与服务器连接的服务
    //$.connection.hub.url="http://139.199.225.84:5000/signalr/hubs"
    $.connection.hub.url="http://119.23.136.251:5000/signalr/hubs"
    //$.connection.hub.url="http://10.1.1.100:5000/signalr/hubs"
    var proxy = $.connection.messageHub;
    $.connection.hub.qs = { Type: "Broswer", Name: "Mr.Yang" };//消息类型
    //$.connection.hub.logging =true;
    //获取会话缓存的服务数据,并绑定在传入的对象身上
    _this.GetSessionList=function(obj){
        proxy.client.GetSessionList=function(datas){
            obj.SessionList=JSON.parse(datas);
            //console.log(obj.SessionList)
            $rootScope.$apply();//告诉angular进行数据更新
        }
    }
    //获取车道状态的服务数据,并绑定在传入的对象身上
    _this.GetStatusList=function(obj){
        proxy.client.GetLaneList=function(datas){
            obj.StatusList=JSON.parse(datas);
            //console.log(JSON.parse(datas))
            $rootScope.$apply();//告诉angular进行数据更新
        }
    }
    //获取车道作业的服务数据,并绑定在传入的对象身上
    _this.GetQueueList=function(obj){
        proxy.client.GetQueueList=function(datas){
            //console.log(JSON.parse(datas))
            obj.QueueList=JSON.parse(datas);
            $rootScope.QueueList=JSON.parse(datas);
            //糅合状态跟作业的数据
            for(var i=0;i<obj.StatusList.length;i++){
                var arr=[];
                //查询对应车队所有作业
                for(var j=0;j<obj.QueueList.length;j++){
                    if(obj.StatusList[i].lane_code==obj.QueueList[j].lane_code){
                        arr.push(obj.QueueList[j])
                    }
                }
                //比较出最新作业
                if(arr.length>=1){
                    var maxArr=arr[0];
                    var Maxtime=new Date(arr[0].update_time)
                    Maxtime=Maxtime.getTime()
                    for(var s=0;s<arr.length;s++){
                        var time=new Date(arr[s].update_time)
                        time=time.getTime()
                        if(time>Maxtime){
                            maxArr=arr[s];
                        }
                    }
                    obj.StatusList[i].queue=maxArr
                }
            }
            //查询当前账户有没有锁定的作业
            for(var i=0;i<obj.QueueList.length;i++){
                if(obj.QueueList[i].is_lock===true && obj.QueueList[i].user==$rootScope.user.name){
                    var str=JSON.stringify(obj.QueueList[i])
                    var Obj=JSON.parse(str)
                    $rootScope.currentQueue=Obj
                    $window.localStorage.currentQueueID=Obj.queue_id
                }
            }
            console.log(obj.QueueList)
            console.log(obj.StatusList)
            //console.log($rootScope.currentQueue)
            $rootScope.$apply();//告诉angular进行数据更新
        }
    }
    //启动服务并且绑定修改数据的方法
    $.connection.hub.start(
        //修改作业信息,Data是当前车道数据，chang为修改的属性集合
        _this.changeQueue=function(Data,chang,type){
            if(Data){
                var str=JSON.stringify(Data)
                var Obj=JSON.parse(str)
                for(var key in Obj){
                    if(key == 'queue'){
                        delete Obj['queue']
                    }
                }
                for(var key in chang){
                    Obj[key]=chang[key]
                }
                //Obj=JSON.stringify(Obj)
                //console.log((Data.lane_code))
                var message={
                    "message_type": type,
                    "message_content": {
                        "lane_code":Data.lane_code,
                        "send_time":new Date().Format("yyyy/MM/dd hh:mm:ss")
                    }
                }
                if(type=='queue'){
                    message.message_content.queue_id=Obj.queue_id
                    message.message_content.action='update'
                    message.message_content.create_time=new Date().Format("yyyy/MM/dd hh:mm:ss")
                }
                message.message_content[type]=Obj
                proxy.server.SendMessage(Data.lane_code, JSON.stringify(message)).fail(function(error){
                    console.log(message.message_content[type].lane_name+'修改错误,当前发送的数据为');
                    console.log(message);
                })  //错误处理
                //console.log('本次请求的lane_code:'+message.message_content[type].lane_code);
                //console.log('本次请求的lane_id:'+message.message_content.queue_id);
                //console.log('本次请求的create_time:'+message.message_content.create_time);
            }
        }
    ).done(function(){
            console.log('服务器启动完成')

        });


})
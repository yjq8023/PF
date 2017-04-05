/**
 * Created by Mr.yang on 2017/3/30.
 */
//此服务是用于连接服务器，获取以及推送数据
//该服务是封装修改数据状态的对象
angular.module('inspinia').service('DataServers',function($rootScope){
    var _this=this;
    //创建与服务器连接的服务
    $.connection.hub.url="http://139.199.225.84:5001/signalr/hubs"
    var proxy = $.connection.messageHub;
    $.connection.qs={Type:'Broswer',Name:'Broswer'};//消息类型

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
        proxy.client.GetStatusList=function(datas){
            obj.StatusList=JSON.parse(datas);
            for(var i=0;i<obj.StatusList.length;i++){
                obj.StatusList[i].message_content=JSON.parse(obj.StatusList[i].message_content)
            }
            $rootScope.$apply();//告诉angular进行数据更新
        }
    }
    //获取车道作业的服务数据,并绑定在传入的对象身上
    _this.GetQueueList=function(obj){
        proxy.client.GetQueueList=function(datas){
            obj.QueueList=JSON.parse(datas);
            for(var i=0;i<obj.QueueList.length;i++){
                obj.QueueList[i].message_content=JSON.parse(obj.QueueList[i].message_content)
            }
            //糅合状态跟作业的数据
            for(var i=0;i<obj.StatusList.length;i++){
                for(var j=0;j<obj.QueueList.length;j++){
                    if(obj.StatusList[i].lane_code==obj.QueueList[j].lane_code){
                        obj.StatusList[i].queue=obj.QueueList[j].message_content[0];
                        break;
                    }
                }
            }
            //console.log('StatusList')
            //console.log(obj.StatusList)
            //console.log('QueueList')
            //console.log(obj.QueueList)
            $rootScope.$apply();//告诉angular进行数据更新
        }
    }
    //启动服务并且绑定修改数据的方法
    $.connection.hub.start(
        //修改作业信息,Data是当前车道数据，chang为修改的属性集合
        _this.changeQueue=function(Data,chang){
            if(Data){
                var str=JSON.stringify(Data)
                var Obj=JSON.parse(str)
                for(var key in Obj){
                    if(key == 'queue'){
                        delete Obj['queue']
                    }
                }
                for(var key in chang){
                    Obj.message_content[key]=chang[key]
                }
                Obj.message_content=JSON.stringify(Obj.message_content)
                proxy.server.ChangeStatus(Data.lane_code, JSON.stringify(Obj));//发送message对象
            }
        }
    ).done(function(){
            console.log('服务器启动完成')
        });
    proxy.client.ReciveRe = function (data) {
        console.log(data);//如果修改失败，打印执行结果
    }
})
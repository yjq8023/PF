//添加时间格式的方法
window.onload=function(){
    Date.prototype.Format = function(format){

        var o = {

            "M+" : this.getMonth()+1, //month

            "d+" : this.getDate(), //day

            "h+" : this.getHours(), //hour

            "m+" : this.getMinutes(), //minute

            "s+" : this.getSeconds(), //second

            "q+" : Math.floor((this.getMonth()+3)/3), //quarter

            "S" : this.getMilliseconds() //millisecond

        }

        if(/(y+)/.test(format)) {

            format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));

        }

        for(var k in o) {

            if(new RegExp("("+ k +")").test(format)) {

                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));

            }

        }

        return format;

    }
}
////该服务是封装修改数据状态的对象
//angular.module('inspinia').service('DataServer',function($rootScope){
//    var _this=this;
//    var lane={
//        "lane_code": "XM001",
//        "country_code": "CN",
//        "city_code": "XIAMEN",
//        "terminal_code": "SXCT",
//        "lane_name": "GI01",
//        "direction": "In",
//        "connection_id": "offline",
//        "update_time": "2017/3/21 15:59:50",
//        "lane_status": '{"has_truck":false,"lock_status":false,"user":null,"lane_type":"重车jj闸","led_display":null,"start_time":"2017-03-24T17:39:54.4321302+08:00","end_time":"2017-03-24T17:39:54.4321302+08:00","trunk_no":"粤A.12345","ocr_trunk_no":"粤A.12345","rfid_trunk_no":"粤A.12345","weight_bridge":30480.0,"barrier":"down","ic_card_no":"0000001","container_amount":1,"damage_check_amount":1,"damage_part_amount":1,"submit_amount":1,"processes":[{"step":1,"code":"lane_ready","display":"车道就绪","status":true},{"step":2,"code":"has_truck","display":"感应来车","status":true},{"step":3,"code":"truck_rfid","display":"车牌读卡","status":true},{"step":4,"code":"truck_ocr","display":"车牌识别","status":true},{"step":5,"code":"container_ocr","display":"箱号识别","status":true},{"step":6,"code":"read_ic_card","display":"司机读卡","status":true},{"step":7,"code":"damage_check","display":"箱体验残","status":true},{"step":8,"code":"submit_to_tos","display":"提交TOS","status":false},{"step":9,"code":"reply_from_tos","display":"TOS反馈","status":false},{"step":10,"code":"print_recipt","display":"打印小票","status":false},{"step":11,"code":"lift_barrier","display":"抬杆放行","status":false}],"truck_pic_url":"www.abc.com/pictures/yyyymmdd/laneno/hhmmss.jpg","truck_crop_pic_url":"www.abc.com/pictures/yyyymmdd/laneno/hhmmss.jpg","front_top_pic_url":"www.abc.com/pictures/yyyymmdd/laneno/hhmmss.jpg","back_top_pic_url":"www.abc.com/pictures/yyyymmdd/laneno/hhmmss.jpg","left_front_pic_url":"www.abc.com/pictures/yyyymmdd/laneno/hhmmss.jpg","left_back_pic_url":"www.abc.com/pictures/yyyymmdd/laneno/hhmmss.jpg","right_front_pic_url":"www.abc.com/pictures/yyyymmdd/laneno/hhmmss.jpg","right_back_pic_url":"www.abc.com/pictures/yyyymmdd/laneno/hhmmss.jpg","left_damage_pic_url":null,"right_damage_pic_url":"www.abc.com/pictures/yyyymmdd/laneno/hhmmss.jpg","top_damage_pic_url":"www.abc.com/pictures/yyyymmdd/laneno/hhmmss.jpg","containers":[{"position":null,"container_no":"ABCD1234567","ocr_container_no":null,"iso_code":"GO10","job_type":null,"damages":null,"send_email":null},{"position":null,"container_no":null,"ocr_container_no":null,"iso_code":null,"job_type":null,"damages":null,"send_email":null}]}'
//    }
//    $rootScope.message={
//        "message_type": "Status",
//        "message_content": lane
//    }
//    /**
//     * 该方法用于暂存用户修改数据在本地
//     * @param obj
//     * @param changObj
//     */
//    _this.setMessage=function(obj,changObj){
//        if(obj.lane_code){
//            //修改本地暂存修改对象
//            for(var key in obj){
//                $rootScope.message.message_content[key]=obj[key]
//            }
//            $rootScope.message.message_content.lane_status={}
//            for(var key in obj.lane_status){
//                $rootScope.message.message_content.lane_status[key]=obj.lane_status[key]
//            }
//            for(var key in changObj){
//                $rootScope.message.message_content.lane_status[key]=changObj[key]
//            }
//            $rootScope.message.message_content.lane_status=JSON.stringify($rootScope.message.message_content.lane_status)
//        }else{
//            console.log('修改数据不正确')
//        }
//    }
//})
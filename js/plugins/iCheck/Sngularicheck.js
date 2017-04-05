/**
 * Created by Mr.yang on 2017/3/24.
 */
$(function(){
    $('.monitorBox').on('click',".iradio_square-green",function(){
        $(this).toggleClass('checked')
        console.log($(this))
    })
})
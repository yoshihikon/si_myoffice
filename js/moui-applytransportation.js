'use strict'

/*
 * My OFFICE moui-applytransportation.js
 * 2016/9/29
 */

/* クラス */
function MOUI() {
};

/* 共通メソッド */
MOUI.openDialog = function(targetDialogId){
  $(targetDialogId).fadeIn('fast');
  $('#moui-screen').fadeIn('fast');
}

MOUI.closeDialog = function(targetDialogId){
  $(targetDialogId).fadeOut('fast');
  $('#moui-screen').fadeOut('fast');
}

MOUI.getUrlVars = function(){
    var vars = {}; 
    var param = location.search.substring(1).split('&');
    for(var i = 0; i < param.length; i++) {
        var keySearch = param[i].search(/=/);
        var key = '';
        if(keySearch != -1) key = param[i].slice(0, keySearch);
        var val = param[i].slice(param[i].indexOf('=', 0) + 1);
        if(key != '') vars[key] = decodeURI(val);
    } 
    return vars; 
}

/* 国内出張旅費後申請 */

MOUI.suicaDataArray = [];
MOUI.setTransportation = function(){
  
  //get param
  var vars = MOUI.getUrlVars();
  
  if(vars['suica'] != undefined){
    
    var suicaData = vars['suica'];
    
    var suicaDataArray = suicaData.split('+');
    
    MOUI.suicaDataArray = suicaDataArray;
    
    var length = suicaDataArray.length;
    
    for(var i=0; i < length; i++){
      var transportDataArray = suicaDataArray[i].split(',');
      
      var type = transportDataArray[0];
      var date = transportDataArray[1];
      var time = transportDataArray[2];
      var station_in = transportDataArray[3];
      var station_out = transportDataArray[4];
      var bill = transportDataArray[5];
      
      var appendHtml = '';
      if(type == '運賃支払'){
        appendHtml = '<li>' + 
                      '<label>' + 
                        '<input type="checkbox" name="checkbox-route" value="' + i + '" checked >' + 
                        '<span class="moui-date">' + date + '</span>' + 
                        '<span class="moui-station">' + station_in + '</span>' + 
                        '<span>⇢</span>' + 
                        '<span class="moui-station">' + station_out + '</span>' + 
                        '<span class="moui-bill">' + bill + '円</span>' + 
                      '</label>' + 
                    '</li>';
      }else if(type == 'バス'){
        appendHtml = '<li>' + 
                      '<label>' + 
                        '<input type="checkbox" name="checkbox-route" checked>' + 
                        '<span class="moui-date">' + date + '</span>' + 
                        '<span class="moui-station">バス</span>' + 
                        '<span></span>' + 
                        '<span class="moui-station"></span>' + 
                        '<span class="moui-bill">' + bill + '円</span>' + 
                      '</label>' + 
                    '</li>';
      }
      
      $('#moui-routelist').append(appendHtml);
    }
    
    $('[name="checkbox-route"]').on('click', function(){
      MOUI.calcBill();
      MOUI.setDate();
    });
    
  }
}

MOUI.calcBill = function(){
  var bill_sum = 0;
  
  var checkedArray = [];
  $('[name="checkbox-route"]:checked').each(function(){
    checkedArray.push($(this).val());
  });
  
  var length = checkedArray.length;
  for(var i = 0; i < length; i++){
    
    var transportDataArray = MOUI.suicaDataArray[checkedArray[i]].split(',');
    
    var type = transportDataArray[0];
    var datetime = transportDataArray[1];
    var station_in = transportDataArray[3];
    var station_out = transportDataArray[4];
    var bill = transportDataArray[5];
    
    bill_sum += parseInt(bill);
  }
  
  $('#text-bill').val(bill_sum);
}

MOUI.setDate = function(){
  
  var checkedArray = [];
  $('[name="checkbox-route"]:checked').each(function(){
    checkedArray.push($(this).val());
  });
  
  var length = checkedArray.length;
  
  var transportDataArray = MOUI.suicaDataArray[checkedArray[0]].split(',');
  var date1 = transportDataArray[1];
  $('#text-date2').val(date1);
  
  var transportDataArray = MOUI.suicaDataArray[checkedArray[length-1]].split(',');
  var date2 = transportDataArray[1];
  $('#text-date1').val(date2);
  
}

MOUI.applyTransportation = function(){
  window.close();
}
MOUI.cancelApplyTransportation = function(){
  window.close();
}
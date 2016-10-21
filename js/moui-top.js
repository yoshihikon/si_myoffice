'use strict'

/*
 * My OFFICE moui-top.js
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

/* トップ */
MOUI.setAccordion = function(){
  //init
  $('.moui-accordion-title').addClass('moui-close');
  $('.moui-accordion-contents').hide();
  
  //action
  $('.moui-accordion-title').on('click', function(){
    
    if($(this).hasClass('moui-close')){
      $(this).next().slideDown('fast');
      
      $(this).removeClass('moui-close');
      $(this).addClass('moui-open');
    }else{
      $(this).next().slideUp('fast');
      
      $(this).removeClass('moui-open');
      $(this).addClass('moui-close');
    }
    
  });
}

MOUI.suicaDataArray = [];
MOUI.setTransportation = function(){
  //init
  $('#moui-transportation').hide();
  
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
                        '<input type="checkbox" name="checkbox-route" value="' + i + '" >' + 
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
                        '<input type="checkbox" name="checkbox-route">' + 
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
    
    $('#moui-transportation').show();
    
    /*
    $('#action-apply-transportation').on('click', function(){
      location.href='apply_transportation.html?suica=' + suicaData;
    });
    */
  }
}

MOUI.applyTransportation = function(targetDialogId){
  
  MOUI.closeDialog('#moui-dialog-selecttrans');
  
  var selectedVars = '';
  
  var checkedArray = [];
  $('[name="checkbox-route"]:checked').each(function(){
    checkedArray.push($(this).val());
  });
  
  var length = checkedArray.length;
  for(var i = 0; i < length; i++){
    selectedVars += MOUI.suicaDataArray[checkedArray[i]] + "+";
  }
  var selectedVars = selectedVars.substr( 0, selectedVars.length-1 ) ;
  
  var url = '';
  if(selectedVars != ''){
    url='apply-transportation.html?suica=' + selectedVars;
  }else{
    url='apply-transportation.html';
  }
  
  window.open(url, 'MY OFFICE', 'width=700,height=600,resizable=no,scrollbars=yes');
  
}

MOUI.applyTransportationBasic = function(){
  var url =  url='apply-transportation.html';
  
  window.open(url, 'MY OFFICE', 'width=700,height=600,resizable=no,scrollbars=yes');
}

MOUI.setContentsTop = function(){
  $('.moui-applymenu').hide();
}

MOUI.selectMenu = function(thisObject, targetContentsId){
  //change menu
  $('.moui-menusection').find('a').each(function(){
    $(this).removeClass('moui-selected');
  });
  
  $(thisObject).addClass('moui-selected');
  
  //change contents
  $('.moui-dashboard').hide();
  $('.moui-applymenu').hide();
  
  $(targetContentsId).show();
}
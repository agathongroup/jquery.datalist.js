// This fork: https://github.com/agathongroup/jquery.datalist.js

// HTML5 datalist plugin v.0.1
// Copyright (c) 2010-The End of Time, Mike Taylor, http://miketaylr.com
// MIT Licensed: http://www.opensource.org/licenses/mit-license.php
//
// Enables cross-browser html5 datalist for inputs, by first testing
// for a native implementation before building one.
//
//
// USAGE: 
//$('input[list]').datalist();

/* 
<input type="search" list="suggestions">
<datalist id="suggestions">
  <!--[if !IE]><!-->
  <select><!--<![endif]-->
    <option label="DM" value="Depeche Mode">
    <option label="Moz" value="Morrissey">
    <option label="NO" value="New Order">
    <option label="TC" value="The Cure">
  <!--[if !IE]><!-->
  </select><!--<![endif]-->
</datalist>
*/

$.fn.datalist = function() {
  
  //first test for native placeholder support before continuing
  return ((typeof this[0].list === 'object' ) && (document.createElement('datalist') && !!window.HTMLDataListElement)) ? this : this.each(function() {
    //local vars
    var $this = $(this),
        //the main guts of the plugin
        datalist = $('#' + $this.attr('list')),
        
        //wrapper stuffs
        off = $this.offset(),
        ul = $("<ul>", {"class": "datalist", "css": 
          {'width': $this.width(),
           'position': 'absolute', 
           'left': off.left,
           'top': off.top + $this.height() + 6,
           'margin': 0, 
           'padding': '0 2px',
           'list-style': 'none',
           'border': '1px solid #ccc', 
           '-moz-box-shadow': '0px 2px 3px #ccc', 
           '-webkit-box-shadow': '0px 2px 3px #ccc', 
           'box-shadow': '0px 2px 3px #ccc', 
           'z-index':99, 
           'background':'#fff', 
           'cursor':'default'}
          }),
        lis = '';
        
    //return if matching datalist isn't found
    if (!datalist.length) {
        return;
    }
    
    //otherwise, build the structure
    datalist.find('option').each(function(i, opt) {
      lis += '<li>';
      lis += '<span class="value">'+opt.value+'</span>';
      lis += '<span class="label" style="float:right">'+opt.label+'</span>';
      lis += '</li>';
    });
    
    //fill the ul, add event handling, and insert it into the DOM
    ul.html(lis).hide().appendTo('body').delegate('li', 'mousedown', function(){
      $this.val($(this).find('span.value').text());
    });

    //show it on focus, hide it on blur
    $this.focus(function(){ ul.show(); }).blur(function(){ ul.hide(); });
    
  });
};
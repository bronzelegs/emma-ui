'use strict';

(function () {
  console.log('t d a v i s . d a v i s s o f t . c o m');
  console.log('all ur cod r us');
  console.log('Copyright (C) Terrance Davis 2015, 2016, 2017');
  console.log('scaffolding by yo webapp 2.0');
})();


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}


(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-59052020-1', 'auto');
ga('send', 'pageview');

// emmaui.js


(function () {
  console.log('emma.js');
  console.log('Copyright (C) Terrance Davis 2015, 2016, 2017');
  console.log('scaffolding by yo webapp 2.0');
  
})();

function resetMe() {
  $('#myConversation').text('');
}

console.log('loaded the emmaui');

function receiveMsg(s) {
  //
  var d = new Date(Date.now()).toTimeString().substr(0, 8);
  $('#myConversation').prepend('<div class="emma">' + d + '&nbsp' + s + '&nbsp' + $('#msgTextarea').val() + '</hr></div>');
  $('#myLastResponse').val(s);
}
/*  {
 
 var serverURI = 'http://localhost:8080/session';
 
 function sendMsg(txt, type, sessionid) {
 var auri = serverURI + '/?s=' + encodeURI(txt);
 console.log(auri);
 if (testing) {
 $.ajax(
 {
 url: auri
 })
 .done(function (data) {
 console.log('Sample of data:', data);
 receiveMsg(data.resp);
 });
 } else {
 receiveMsg(txt);
 $('#myLastResponse').text(txt);
 }
 }
 */

var defaultVersion = {
  'version': {
    'description': 'default api',
    'major': '0',
    'minor': '0',
    'iteration': '0',
    'release': 'a'
  }
};

function Version(ver) {
  if (ver == undefined) {
    ver = defaultVersion;
  }
  this.tag = ver['version'];
  this.description = this.tag.description;
  this.major =  this.tag.major;
  this.minor =  this.tag.minor;
  this.iteration = this.tag.iteration;
  this.release = this.tag.release;
}

Version.prototype.versionString = function(){
  return (this.major + '.' + this.minor + '.' + this.iteration + '.' + this.release);
};

Version.prototype.about = function () {
  return (this.description);
};

var emmaVer = new Version(defaultVersion);
var controlChanVer = new Version(defaultVersion);
var grammarVer = new Version(defaultVersion);
$('#grammar-vers-desc').text('grammar ' + grammarVer.about());
$('#grammar-vers-string').text(grammarVer.versionString());
var modelVer = new Version(defaultVersion);
$('#model-vers-desc').text('model ' + modelVer.about());
$('#model-vers-string').text(modelVer.versionString());
var reactiveChanVer = new Version(defaultVersion);
$('#reactive-vers-desc').text('reactive ' + reactiveChanVer.about());
$('#reactive-vers-string').text(reactiveChanVer.versionString());
var ontologyVer = new Version(defaultVersion);
$('#ontology-vers-desc').text('ontology ' + ontologyVer.about());
$('#ontology-vers-string').text(ontologyVer.versionString());


function emmaVersion() {
  var emmactrl = 'http://api.bronzelegs.com:3000/emma/version';
  
  var jqxhr = $.getJSON(emmactrl, function () {
      //alert('success');
    })
    .done(function (data) {
      //alert('second success');
      console.log(data);
      //alert(data);
      $('#awstest').text(JSON.stringify(data));
      controlChanVer = new Version(data['response']);
      $('#ctrl-chan-vers-desc').text(controlChanVer.about());
      $('#ctrl-chan-vers-string').text(controlChanVer.versionString());
    })
    .fail(function () {
      $('#awstest').text('server does not appear to be running');
      //alert('error');
    })
    .always(function () {
      //alert('finished');
    });
}


function sendMsg(txt, type, sessionid) {
  receiveMsg(txt);
  $('#myLastResponse').text(txt);
}

function clickedMe() {
  var textArea = $('#msgTextarea');
  var text = textArea.val();
  if (text.length) {
    var d = new Date(Date.now()).toTimeString().substr(0, 8);
    $('#myConversation').prepend('<div >' + d + '&nbsp' + textArea.val() + '</hr></div>');
    textArea.val('');
    sendMsg(text);
  }
}

function setLastResponse(txt) {
  $('#myLastResponse').text(txt);
}

function myMessagePanel() {
  console.log('myMessages');
  $('#messagePanel').toggle('slow');
}

function myInfoPanel() {
  console.log('myInfoPanel');
  $('#informationPanel').toggle('slow');
}

function myDataPanel() {
  console.log('myDataPanel');
  $('#dataPanel').toggle('slow');
}

function toggleHeader() {
  $('#emmaversion').slideToggle();
  $('#emmaheader').slideToggle();
}

var resetHeaderState = debounce(function () {
  toggleHeader();
}, 5000);

// start up
function startEmma() {
  console.log('Copyright (C) Terrance Davis 2015, 2016, 2017');
  console.log('emmaclient.js v1.0');
  emmaVersion();
  $('#emmaversion').slideUp().fadeOut();
  $('#informationPanel').toggle('slow');
  $('#messagePanel').toggle('slow');
  $('#dataPanel').toggle('slow');
  emmaVersion();
}

 


$( document ).ready(function() {
  startEmma();
  console.log( 'emma ready!' );
});

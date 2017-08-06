'use strict';

(function () {
  console.log('t d a v i s . d a v i s s o f t . c o m');
  console.log('all ur cod r us');
  console.log('Copyright (C) Terrance Davis 2015, 2016, 2017');
  console.log('scaffolding by yo webapp 2.0');
  console.log('emma.js');
  console.log('Copyright (C) Terrance Davis 2015, 2016, 2017');
  console.log('All rights reserved.');
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
// temporary api mocks

function resetMe() {
  $('#myConversation').text('');
}

function receiveMsg(s) {
  //
  var d = new Date(Date.now()).toTimeString().substr(0, 8);
  $('#myConversation').prepend('<div class="emma">' + d + '&nbsp' + s + '&nbsp' + $('#msgTextarea').val() + '</hr></div>');
  $('#myLastResponse').val(s);
}

//classes

var loginUserName = '';
var loginPassword = '';
var profileIsEditable = true;

var defaultVersion = {
  'version': {
    'description': 'default api',
    'major': '0',
    'minor': '0',
    'iteration': '0',
    'release': 'a',
    'timestamp': '01/01/2015.12:00'
  }
};

function Version(ver) {
  if (ver == undefined) {
    ver = defaultVersion;
  }
  this.tag = ver['version'];
  this.description = this.tag.description;
  this.major = this.tag.major;
  this.minor = this.tag.minor;
  this.iteration = this.tag.iteration;
  this.release = this.tag.release;
  this.timestamp = this.tag.timestamp;
}

var personalityProfile = {
  'userName': 'emma-zero',
  'firstName': 'Emma',
  'middleName': 'Lemon',
  'lastName': 'Peel',
  'email1': 'emma@davissoft.com',
  'about': 'machines should think, humans should learn.',
  'isABot': true
};

function Profile() {
  this.userName = '';
  this.firstName = '';
  this.middleName = '';
  this.lastName = '';
  this.emai11 = '';
  this.email2 = '';
  this.about = '';
  this.password = '';
  this.isABot = false;
}


Profile.prototype.clone = function (profile) {
  this.userName = profile.userName;
  this.firstName = profile.firstName;
  this.middleName = profile.middleName;
  this.lastName = profile.lastName;
  this.emai11 = profile.email1;
  this.email2 = profile.email2;
  this.about = profile.about;
  this.password = profile.password;
  this.isABot = profile.isABot;
};

var defaultProfile = {
  'userName': '',
  'firstName': '',
  'middleName': '',
  'lastName': '',
  'email1': '',
  'email2': '',
  'about': '',
  'password': '',
  'isABot': false
};

var activeProfile = defaultProfile;

function Session() {
  this._activeUser = '';
  this._personality = '';
  this.connected = false;
}


Session.prototype.setActiveUser = function (profile) {
  this._activeUser = profile;
};

Session.prototype.setPersonality = function (profile) {
  this._personality = profile;
};

function Version(ver) {
  if (ver == undefined) {
    ver = defaultVersion;
  }
  this.tag = ver['version'];
  this.description = this.tag.description;
  this.major = this.tag.major;
  this.minor = this.tag.minor;
  this.iteration = this.tag.iteration;
  this.release = this.tag.release;
  this.timestamp = this.tag.timestamp;
}

Version.prototype.versionString = function () {
  return (this.major + '.' + this.minor + '.' + this.iteration + '.' + this.release);
};

Version.prototype.timeStamp = function () {
  return this.timestamp;
};

Version.prototype.about = function () {
  return (this.description);
};

Version.prototype.getVersion = function (url, version) {
  var _url = (url === undefined) ? 'http://api.bronzelegs.com:3000/emma/version' : url;
  
  var jqxhr = $.getJSON(emmactrl, function () {
      //alert('success');
    })
    .done(function (data) {
      //alert('second success');
      console.log(data);
      //alert(data);
      $('#awstest').text(JSON.stringify(data));
      controlChanVer = new Version(data['response']);
      updateVersionData();
    })
    .fail(function () {
      $('#awstest').text('server does not appear to be running');
      //alert('error');
    })
    .always(function () {
      //alert('finished');
    });
};

// utility functions

function Versions() {
  this.emmaVer = new Version(defaultVersion);
  this.controlChanVer = new Version(defaultVersion);
  this.grammarVer = new Version(defaultVersion);
  this.modelVer = new Version(defaultVersion);
  this.reactiveVer = new Version(defaultVersion);
  this.ontologyVer = new Version(defaultVersion);
  this.uiVer = new Version(defaultVersion);
  this.cloudVer = new Version(defaultVersion);
  this.tmmVer = new Version(defaultVersion);
}

function updateVersionData() {
  
  $('#emmaVer').text(emmaVer.about() + ' ' + emmaVer.versionString() + ' ' + emmaVer.timeStamp());
  
  $('#ctrl-chan-vers-desc').text(controlChanVer.about());
  $('#ctrl-chan-vers-string').text(controlChanVer.versionString());
  $('#ctrl-chan-timestamp').text(controlChanVer.timeStamp());
  
  $('#grammar-vers-desc').text('grammar ' + grammarVer.about());
  $('#grammar-vers-string').text(grammarVer.versionString());
  $('#grammar-timestamp').text(grammarVer.timeStamp());
  
  $('#model-vers-desc').text('model ' + modelVer.about());
  $('#model-vers-string').text(modelVer.versionString());
  $('#model-timestamp').text(modelVer.timeStamp());
  
  $('#reactive-vers-desc').text('reactive ' + reactiveVer.about());
  $('#reactive-vers-string').text(reactiveVer.versionString());
  $('#reactive-timestamp').text(reactiveVer.timeStamp());
  
  $('#ontology-vers-desc').text('ontology ' + ontologyVer.about());
  $('#ontology-vers-string').text(ontologyVer.versionString());
  $('#ontology-timestamp').text(ontologyVer.timeStamp());
  
  $('#ui-vers-desc').text('UI ' + uiVer.about());
  $('#ui-vers-string').text(uiVer.versionString());
  $('#ui-timestamp').text(uiVer.timeStamp());
  
  $('#cloud-vers-desc').text('cloud ' + cloudVer.about());
  $('#cloud-vers-string').text(cloudVer.versionString());
  $('#cloud-timestamp').text(cloudVer.timeStamp());
  
  $('#tmm-vers-desc').text('MindOfMan ' + tmmVer.about());
  $('#tmm-vers-string').text(tmmVer.versionString());
  $('#tmm-timestamp').text(tmmVer.timeStamp());
}

function updateVersionSelector(selectorStub, version) {
  $('#' + selectorStub + '-vers-desc').text('MindOfMan ' + version.about());
  $('#' + selectorStub + '-vers-string').text(version.versionString());
  $('#' + selectorStub + '-timestamp').text(version.timeStamp());
}

function getEmmaVersion() {
  var emmactrl = 'http://api.bronzelegs.com:3000/emma/version';
  
  var jqxhr = $.getJSON(emmactrl, function () {
    })
    .done(function (data) {
      console.log('version data' + data);
      $('#awstest').text(JSON.stringify(data));
      controlChanVer = new Version(data['response']);
      updateVersionData();
    })
    .fail(function () {
    })
    .always(function () {
    });
}

function getVersion(url, version, selector) {
  var jqxhr = $.getJSON(url, function () {
    })
    .done(function (data) {
      console.log('version data' + data);
      version = new Version(data['response']);
      updateVersionSelector(selector);
    })
    .fail(function () {
      $('#awstest').text('server does not appear to be running');
    })
    .always(function () {
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
  $('#messagePanel').fadeToggle('slow');
}

function myInfoPanel() {
  console.log('myInfoPanel');
  $('#informationPanel').fadeToggle('slow');
}

function myDataPanel() {
  console.log('myDataPanel');
  $('#dataPanel').fadeToggle('slow');
}

function toggleHeader() {
  $('#mindofman').slideToggle('slow');
}

var resetHeaderState = debounce(function () {
  toggleHeader();
}, 5000);



var emmaVer = new Version(defaultVersion);
var controlChanVer = new Version(defaultVersion);
var grammarVer = new Version(defaultVersion);
var modelVer = new Version(defaultVersion);
var reactiveVer = new Version(defaultVersion);
var ontologyVer = new Version(defaultVersion);
var uiVer = new Version(defaultVersion);
var cloudVer = new Version(defaultVersion);
var tmmVer = new Version(defaultVersion);


function getProfiles() {
  var profilesctrl = 'http://api.bronzelegs.com:3100/profiles/';
  
  var jqxhr = $.getJSON(profilesctrl, function () {
    })
    .done(function (data) {
      console.log(data);
      $('#awstest').text(JSON.stringify(data));
      controlChanVer = new Version(data['response']);
      updateVersionData();
    })
    .fail(function () {
    })
    .always(function () {
    });
}

function getProfile(id) {
  var profilectrl = 'http://api.bronzelegs.com:3100/profiles/' + id.trim();
  
  var jqxhr = $.getJSON(profilectrl, function () {
    })
    .done(function (data) {
      console.log(data);
      updateActiveProfile(data);
    })
    .fail(function () {
    })
    .always(function () {
    });
}

function updateProfiles(id, profile) {
  var profilesctrl = 'http://api.bronzelegs.com:3100/profiles/' + id;
  
  $.ajax({
      url: profilesctrl, type: 'put', data: JSON.stringify(profile), headers: {}, dataType: 'json'
    })
    .done(function (data) {
      console.log(data);
      return true;
    })
    .fail(function () {
      console.log('failed?');
      return false;
    })
    .always(function () {
    });
}

function updateActiveProfile(data) {
  activeProfile = data.profile;
}

function OnProfileEdit(profile) {
  setModalData(profile);
  $('#profileForm :input').prop('disabled', true);
  $('#profileFormSaveButton').addClass('invisible');
  $('#profileFormSaveButton').prop('disabled', true);
  profileIsEditable = (typeof profile.isABot === 'undefined');
  if (profileIsEditable) {
    $('#profileForm :input').prop('disabled', false);
  }
  
  $('#profileModal').modal()
}

function OnPasswordEdit(profile) {
  setModalData(profile);
  if ($('#passwordFormSaveButton').addClass('invisible')) {
    alert('passed');
  }
  //$('#passwordEditModal').prop('disabled', true);
  
  $('#passwordModal').modal();
}

function setModalData(profile) {
  var _userName =profile.userName == '' ? 'new user' : profile.userName;
  $('#profile-title').text('Profile of ' + _userName);
  $('#userName').val(profile.userName);
  $('#firstName').val(profile.firstName);
  $('#middleName').val(profile.middleName);
  $('#lastName').val(profile.lastName);
  $('#email1').val(profile.email1);
  $('#email2').val(profile.email2);
  $('#about').val(profile.about);
}

function doLogin() {
  loginUserName = $('#loginUserName').val();
  loginPassword = $('#loginPassword').val();
  console.log(loginUserName + ' ' + loginPassword);
  postLoginInit();
  return false;
}

function getModalData(profile) {
  profile.userName = $('#userName').val().trim();
  profile.firstName = $('#firstName').val().trim();
  profile.middleName = $('#middleName').val().trim();
  profile.lastName = $('#lastName').val().trim();
  profile.email1 = $('#email1').val().trim();
  profile.email2 = $('#email2').val().trim();
  profile.about = $('#about').val().trim();
  return profile;
}

function doProfileSave() {
  getModalData(activeProfile);
  if (updateProfiles(activeProfile.userName, activeProfile)) {
    
  } else {
    
  }
  
}

function OnCreateAccount() {
  var newProfile = new Profile();
  var retVal = false;
  
  var passwordPromise = OnPasswordModal(newProfile);
  
  passwordPromise.then(function (retVal) {
    console.log('ret from password ' + retVal);
    if (retVal){
      console.log(newProfile);
    }
  })
  .then ( function(retVal) {
    var profilePromise = OnProfileModal(newProfile);
    profilePromise.then(function (retVal) {
      console.log('ret from profile ' + retVal);
      
    });
  });
}


function OnProfileModal(profile) {
  var dfd = jQuery.Deferred();
  
  var $profileForm =  $('#profileForm :input');
  var $profileDlg = $('#profileModal');
  var $profileSaveButton = $('#profileSaveButton');
  var $profileCloseButton = $('#profileCloseButton');
  var $profileError = $('#profileError');
  var $profileFirstName = $('#firstName');
  var $profileEmail = $('#email1');
  
  $profileError.addClass('invisible');
  $profileForm.prop('disabled', true);
  $profileSaveButton.addClass('invisible');
  $profileSaveButton.prop('disabled', true);
  
  setModalData(profile);
  
  profileIsEditable = (profile.isABot === false);
  if (profileIsEditable) {
    $profileForm.prop('disabled', false);
  }
  
  $profileError.addClass('invisible');
  $profileDlg.modal('show');

  $profileSaveButton.off('click').click(function () {
    // at least first name and email
    if (($profileFirstName.val().length) && ($profileEmail.val().length)){
      dfd.resolve(true);
      $profileDlg.modal('hide');
      return true;
    } else {
      $profileError.removeClass('invisible');
    }
  });
  $profileCloseButton.off('click').click(function () {
    $profileDlg.modal('hide');
    dfd.reject(false);
    return false;
  });
  return dfd.promise();
}

function OnPasswordModal(profile) {
  var dfd = jQuery.Deferred();
  var $passwordDlg = $('#passwordModal');
  var $passwordError = $('#passwordError');
  var $passwordSaveButton = $('#passwordSaveButton');
  var $passwordCancelButton = $('#passwordCancelButton');
  var $passwordUserName= $('#passwordUserName');
  var $passwordinput= $('#passwordinput');
  var $passwordinputclone = $('#passwordinputclone');
  
  $passwordError.addClass('invisible');
  $passwordDlg.modal('show');
  
  $passwordSaveButton.off('click').click(function () {
    var pw1 = $passwordinput.val();
    var pw2 = $passwordinputclone.val();
    if (pw1 === pw2) {
      profile.userName = $passwordUserName.val();
      profile.password = pw1;
      dfd.resolve(true);
      $passwordDlg.modal('hide');
      return true;
    } else {
      $passwordError.removeClass('invisible');
    }
  });
  
  $passwordCancelButton.off('click').click(function () {
    $passwordDlg.modal('hide');
    dfd.reject(false);
    return false;
  });
  return dfd.promise();
}


/*
 <a href="#" class="text-muted">Muted link</a>
 <a href="#" class="text-primary">Primary link</a>
 <a href="#" class="text-success">Success link</a>
 <a href="#" class="text-info">Info link</a>
 <a href="#" class="text-warning">Warning link</a>
 <a href="#" class="text-danger">Danger link</a>
 
 */
function doMsgModal(title, text) {
  
  $('#msg-modal-title').text(title);
  $('#msg-modal-text').text(text);
  $('#msgModal').modal();
}

function ConfirmModal(title, msg) {
  var dfd = jQuery.Deferred();
  var $confirmDlg = $('#confirmModal');
  $confirmDlg.modal('show');
  $('#confirm-modal-title').text(title);
  $('#confirm-modal-text').text(confirm);
  $('#confirmYesButton').off('click').click(function () {
    $confirmDlg.modal('hide');
    //dfd.resolve(1);
    $('#passwordEditModal').modal();
    return 1;
  });
  $('#confirmNoButton').off('click').click(function () {
    $confirm.modal('hide');
    return 0;
  });
  return dfd.promise();
}

function doConfirmModal(title, message, headerColor) {
  var a = ConfirmModal(title, message, headerColor);
  a.then(function (b) {
    console.log(b);
    alert(b)
  })
}


function doErrorModal(title, text, desc) {
  $('#error-modal-title').text(title);
  $('#error-modal-text').text(text);
  $('#error-modal-desc').text(desc);
  $('#errorModal').modal();
}

function doLogoutModal() {
  doErrorModal('Je ne canna dunna', 'That code is not in my system right now', 'It probably will be soon')
}

// start up
function init() {
  console.log('Copyright (C) Terrance Davis 2015, 2016, 2017');
  console.log('emmaclient.js v1.0');
  getEmmaVersion();
  setTimeout(function () {
    $('#mindofman').slideUp().fadeOut();
  }, 5000);
  $('#content').slideUp().fadeOut();
  $('#informationPanel').fadeToggle('slow');
  $('#messagePanel').fadeToggle('slow');
  $('#dataPanel').fadeToggle('slow');
  
  var $profileSaveButton = $('#profileSaveButton');
  $('#profileForm').bind('change keyup', function () {
    if (profileIsEditable) {
      $profileSaveButton.removeClass('invisible');
      $('#profileForm').prop('disabled', false);
      $profileSaveButton.prop('disabled', false);
    }
  });
  
  $('#passwordForm').bind('change keyup', function () {
    if (profileIsEditable) {
      $('#passwordSaveButton').removeClass('invisible');
    }
  });
}

function postLoginInit() {
  $('#content').removeClass('invisible').slideDown('slow').fadeIn();
  $('#loginPanel').addClass('invisible').slideUp('slow').fadeOut();
}

$(document).ready(function () {
  init();
  getProfile('tdavis0525');
  console.log('emma ready!');
  //doMsgModal('test', 'this is a test');
  //doConfirmModal('confirm', 'still a test');
  //doErrorModal('error','sterilize!')
});

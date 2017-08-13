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

var personalityProfile = {
  'userName': 'emma-zero',
  'image': 'images/lg-animated.gif',
  'firstName': 'Emma',
  'middleName': 'Lemon',
  'lastName': 'Peel',
  'email1': 'emma@davissoft.com',
  'about': 'machines should think, humans should learn.',
  'isABot': true
};

var defaultProfile = {
  'userName': 'new user',
  'image': 'images/defaultAvatarImage.png',
  'firstName': '',
  'middleName': '',
  'lastName': '',
  'email1': '',
  'email2': '',
  'about': '',
  'password': '',
  'isABot': false
};

function Profile(profile = defaultProfile) {
  this.userName = profile.userName;
  this.image = profile.image;
  this.firstName = profile.firstName;
  this.middleName = profile.middleName;
  this.lastName = profile.lastName;
  this.email1 = profile.email1;
  this.email2 = profile.email2;
  this.about = profile.about;
  this.password = profile.password;
  this.isABot = profile.isABot;
};

Profile.prototype.copy = function (profile) {
  this.userName = profile.userName;
  this.image = profile.image;
  this.firstName = profile.firstName;
  this.middleName = profile.middleName;
  this.lastName = profile.lastName;
  this.email1 = profile.email1;
  this.email2 = profile.email2;
  this.about = profile.about;
  this.password = profile.password;
  this.isABot = profile.isABot;
}

Profile.prototype.getProfile = function (userName = this.userName) {
  var dfd = jQuery.Deferred();
  var profilectrl = 'http://api.bronzelegs.com:3100/profiles/' + userName.trim();
  var that = this;
  var jqxhr = $.getJSON(profilectrl, function () {
    })
    .done(function (data) {
      if (data.profile != null){
        that.copy(data.profile);
        dfd.resolve(data);
        return true;
      } else {
        dfd.reject(data);
        return false;
      }
    })
    .fail(function (error) {
      dfd.reject(error);
      return false;
    })
    .always(function (data) {
      console.log('get profile: ', JSON.stringify(data));
    });
  return dfd.promise();
};

Profile.prototype.updateProfile = function (userName = this.userName) {
  var dfd = jQuery.Deferred();
  var profilectrl = 'http://api.bronzelegs.com:3100/profiles/' + userName.trim();
  var that = this;
  var p = JSON.stringify(this);
  $.ajax({
      url: profilectrl,
      type: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      data: p
    })
    .done(function (data) {
      if (data.profile != null){
        dfd.resolve(data);
        return true;
      } else {
        dfd.reject(data);
        return false;
      }
    })
    .fail(function (error) {
      dfd.reject(error)
      return false;
    })
    .always(function (data) {
      console.log('updateProfile: ', JSON.stringify(data));
    });
  return dfd.promise();
};

Profile.prototype.addProfile = function(profile = this){
  var dfd = jQuery.Deferred();
  var tmmapi = 'http://api.bronzelegs.com:3100/profiles';
  var jqxhr = $.ajax({
      url: tmmapi,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(profile)
    })
    .done(function (data) {
      if (data.profile != null){
        dfd.resolve(data);
        return true;
      } else {
        dfd.reject(data);
        return false;
      }
    })
    .fail(function () {
      return false;
    })
    .always(function (data) {
      console.log('data sent was ' + JSON.stringify(data));
    });
  return dfd.promise();
};

function Session() {
  this._activeUser = '';
  this._personality = '';
  this.connected = false;
}

function setActiveProfile(profile) {
  activeProfile = profile;
}

var activeProfile = defaultProfile;

Session.prototype.setActiveUser = function (profile) {
  this._activeUser = profile;
};

Session.prototype.setPersonality = function (profile) {
  this._personality = profile;
};

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

function Version(ver = defaultVersion.version) {
  this.description = ver.description;
  this.major = ver.major;
  this.minor = ver.minor;
  this.iteration = ver.iteration;
  this.release = ver.release;
  this.timestamp = ver.timestamp;
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
      controlChanVer = new Version(data['response'].version);
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
  var _empty = new Version();
  this.emmaVer = empty.clone(defaultVersion);
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
  $('#' + selectorStub + '-vers-desc').text('MindOfMan ' + about());
  $('#' + selectorStub + '-vers-string').text(versionString());
  $('#' + selectorStub + '-timestamp').text(timeStamp());
}

function getEmmaVersion() {
  var emmactrl = 'http://api.bronzelegs.com:3000/emma/version';
  
  var jqxhr = $.getJSON(emmactrl, function () {
    })
    .done(function (data) {
      
      controlChanVer = new Version(data.response.version);
      updateVersionData();
    })
    .fail(function () {
    })
    .always(function (data) {
      console.log('version data' + data);
    });
}

function getVersion(url, version, selector) {
  var jqxhr = $.getJSON(url, function () {
    })
    .done(function (data) {
      console.log('version data' + data);
      version = new Version(data.response.version);
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


var emmaVer = new Version();
var controlChanVer = new Version();
var grammarVer = new Version();
var modelVer = new Version();
var reactiveVer = new Version();
var ontologyVer = new Version();
var uiVer = new Version();
var cloudVer = new Version();
var tmmVer = new Version();


function getProfiles() {
  var profilesctrl = 'http://api.bronzelegs.com:3100/profiles/';
  
  var jqxhr = $.getJSON(profilesctrl, function () {
    })
    .done(function (data) {
      console.log(data);
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
      //setActiveProfile(data);
    })
    .fail(function () {
    })
    .always(function () {
    });
}

function updateProfile(profile = activeProfile){
  getModalData(profile);
  OnUpdateProfile(profile);
  var $profileModal = $('#profileModal');
  $profileModal.modal('hide');
}
function OnUpdateProfile(profile = activeProfile) {
  var dfd = jQuery.Deferred();
  var profilectrl = 'http://api.bronzelegs.com:3100/profiles/' + profile.userName.trim();
  $.ajax({
      url: profilectrl,
      type: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(profile)
    })
    .done(function (data) {
      if (data.profile != null){
        dfd.resolve(data);
        return true;
      } else {
        dfd.reject(data);
        return false;
      }
    })
    .fail(function (error) {
      dfd.reject(error)
      return false;
    })
    .always(function (data) {
      console.log('updateProfile: ', JSON.stringify(data));
    });
  return dfd.promise();
}

function UpdateProfile(id, profile) {
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


function setActiveProfile(profile) {
  activeProfile = profile;
}

function OnProfileEdit(profile) {
  setModalData(profile);
  var $profileFormInput = $('#profileForm :input');
  var $profileSaveButton = $('#profileSaveButton');
  
  if (profile.isABot) {
    $profileFormInput.prop('disabled', true);
    $profileSaveButton.addClass('invisible');
    $profileSaveButton.prop('disabled', true);
  } else {
    $profileFormInput.prop('disabled', false);
    $profileSaveButton.removeClass('invisible');
  }
  
  $profileFormInput.bind('change keyup', function () {
    $profileSaveButton.prop('disabled', false);
  });
  
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
  var _userName = profile.userName == '' ? 'new user' : profile.userName;
  $('#profile-title').text('Profile of ' + _userName);
  $('#userName').val(profile.userName);
  $('#firstName').val(profile.firstName);
  $('#middleName').val(profile.middleName);
  $('#lastName').val(profile.lastName);
  $('#email1').val(profile.email1);
  $('#email2').val(profile.email2);
  $('#about').val(profile.about);
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

function OnCreateAccount() {
  var newProfile = new Profile();
  var retVal = false;
  
  var passwordPromise = OnPasswordModal(newProfile);
  
  passwordPromise.then(function (retVal) {
      console.log('ret from password ' + retVal);
      if (retVal) {
        console.log(newProfile);
      }
    })
    .then(function (retVal) {
      var profilePromise = OnProfileModal(newProfile);
      profilePromise.then(function (retVal) {
        console.log('ret from profile ' + retVal);
        getModalData(newProfile);
        OnAddProfile(newProfile);
        changeUser(newProfile);
        postLoginInit();
      });
    });
}


function OnProfileModal(profile) {
  var dfd = jQuery.Deferred();
  
  var $profileForm = $('#profileForm :input');
  var $profileDlg = $('#profileModal');
  var $profileSaveButton = $('#profileSaveButton');
  var $profileCloseButton = $('#profileCloseButton');
  var $profileError = $('#profileError');
  var $profileFirstName = $('#firstName');
  var $profileEmail = $('#email1');
  
  setModalData(profile);
  
  $profileSaveButton.removeClass('invisible');
  $profileSaveButton.prop('disabled', false);
  
  $profileError.addClass('invisible');
  $profileDlg.modal('show');
  
  $profileSaveButton.off('click').click(function () {
    // at least first name and email
    if (($profileFirstName.val().length) && ($profileEmail.val().length)) {
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
  var $userExists = $('#userExists');
  var $passwordSaveButton = $('#passwordSaveButton');
  var $passwordCancelButton = $('#passwordCancelButton');
  var $passwordUserName = $('#passwordUserName');
  var $passwordModalName = $('#passwordModalName');
  var $passwordinput = $('#passwordinput');
  var $passwordinputclone = $('#passwordinputclone');
  
  var newUserName = profile.userName;
  var userExists = false;
  
  $passwordError.addClass('invisible');
  $userExists.addClass('invisible');
  $passwordModalName.text(newUserName);
  $passwordDlg.modal('show');
  
  $passwordSaveButton.off('click').click(function () {
    newUserName = $passwordUserName.val();
    userExists = OnNewUserExists(newUserName);
    
    if (!userExists) {
      var pw1 = $passwordinput.val();
      var pw2 = $passwordinputclone.val();
      if (passwordCheck(pw1, pw2)) {
        profile.userName = newUserName;
        profile.password = pw1;
        dfd.resolve(true);
        $passwordDlg.modal('hide');
        return true;
      } else {
        $passwordError.removeClass('invisible');
      }
    } else {
      $userExists.removeClass('invisible');
    }
  });
  
  $passwordCancelButton.off('click').click(function () {
    $passwordDlg.modal('hide');
    dfd.reject(false);
    return false;
  });
  return dfd.promise();
}

function passwordCheck(pw1, pw2) {
  return ((pw1 === pw2) && (pw1.length > 8) && (pw1.length < 16) )
}

function OnNewUserExists(userName) {
  // check to see if the profile exists
  getProfileById(userName)
    .done(function (data) {
      console.log(data);
      return (data.profile != null);
    })
    .fail(function () {
      console.log('failed')
      return false;
    });
}

function OnLogin() {
  var $loginError = $('#loginError');
  var $loginFailed = $('#loginFailed');
  $loginFailed.addClass('invisible');
  $loginError.addClass('invisible');
  var loginUserName = $('#loginUserName').val();
  var loginPassword = $('#loginPassword').val();
  if ((loginUserName.length < 1) || (loginPassword.length < 1)) {
    $loginError.removeClass('invisible');
  } else {
    console.log(loginUserName + ' ' + loginPassword);
    OnServerLogin(loginUserName, loginPassword)
      .done(function (data) {
        console.log(data);
        OnGetProfileById(loginUserName)
          .done(function (data) {
            console.log(JSON.stringify(data));
            changeUser(data.profile);
          });
        postLoginInit();
        return true;
      })
      .fail(function () {
        console.log('failed');
        $loginFailed.removeClass('invisible');
        return false;
      });
  }
}

function OnGetProfileById(id) {
  var dfd = jQuery.Deferred();
  var profilectrl = 'http://api.bronzelegs.com:3100/profiles/' + id.trim();
  var jqxhr = $.getJSON(profilectrl, function () {
    })
    .done(function (data) {
      console.log('data now is' + JSON.stringify(data));
      dfd.resolve(data);
      return true;
    })
    .fail(function (data) {
      dfd.reject(data);
      return false;
    });
  return dfd.promise();
}

function OnServerLogin(user, password) {
  var dfd = jQuery.Deferred();
  var credentials = {'user': '', 'password': ''};
  credentials.user = user;
  credentials.password = password;
  var tmmapi = 'http://api.bronzelegs.com:3100/login/';
  var jqxhr = $.ajax({
      url: tmmapi,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(credentials)
    })
    .done(function (data) {
      console.log('data now is' + JSON.stringify(data));
      if (data.response == 'ok') {
        dfd.resolve(data);
        return true;
      } else {
        dfd.reject(data);
        return false;
      }
    })
    .fail(function (data) {
      dfd.reject(data);
      return false;
    });
  return dfd.promise();
}

function OnAddProfile(profile) {
  var dfd = jQuery.Deferred();
  
  console.log(profile);
  var tmmapi = 'http://api.bronzelegs.com:3100/profiles';
  var jqxhr = $.ajax({
      url: tmmapi,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(profile)
    })
    .done(function (data) {
      console.log('data now is' + JSON.stringify(data));
      return true;
    })
    .fail(function () {
      return false;
    })
    .always(function (data) {
      console.log('data sent was ' + JSON.stringify(data));
    });
  return dfd.promise;
}

/*
 <a href="#" class="text-muted">Muted link</a>
 <a href="#" class="text-primary">Primary link</a>
 <a href="#" class="text-success">Success link</a>
 <a href="#" class="text-info">Info link</a>
 <a href="#" class="text-warning">Warning link</a>
 <a href="#" class="text-danger">Danger link</a>
 
 */

function OnErrorModal(title, text, desc) {
  var dfd = jQuery.Deferred();
  var $errorModal = $('#errorModal');
  var $errorModalTitle = $('#errorModalTitle');
  var $errorModalText = $('#errorModalText');
  var $errorModalDesc = $('#errorModalDesc');
  var $errorModalClose = $('#errorModalClose');
  $errorModalTitle.text(title);
  $errorModalText.text(text);
  $errorModalDesc.text(desc);
  $errorModal.modal();
  $errorModalClose.click(function () {
    $errorModal.modal('hide');
    dfd.resolve(true);
  });
  return dfd.promise;
}

function OnMsgModal(title, text, desc) {
  var dfd = jQuery.Deferred();
  var $msgModal = $('#msgModal');
  var $msgModalTitle = $('#msgModalTitle');
  var $msgModalText = $('#msgModalText');
  var $msgModalDesc = $('#msgModalDesc');
  var $msgModalClose = $('#msgModalClose');
  $msgModalTitle.text(title);
  $msgModalText.text(text);
  $msgModalDesc.text(text);
  $msgModal.modal();
  $msgModalClose.click(function () {
    $msgModal.modal('hide');
    dfd.resolve(true);
  });
  return dfd.promise;
}

function OnConfirmModal(title, msg, desc) {
  var dfd = jQuery.Deferred();
  var $confirmModal = $('#confirmModal');
  var $confirmModalTitle = $('#confirmModalTitle');
  var $confirmModalText = $('#confirmModalText');
  var $confirmModalDesc = $('#confirmModalDesc');
  $confirmModalTitle.text(title);
  $confirmModalText.text(msg);
  $confirmModalDesc.text(desc);
  $confirmModal.modal('show');
  $('#confirmYesButton').off('click').click(function () {
    $confirmModal.modal('hide');
    dfd.resolve(1);
    return true;
  });
  $('#confirmNoButton').off('click').click(function () {
    $confirmModal.modal('hide');
    dfd.reject(false);
    return false;
  });
  return dfd.promise();
}

function OnNewConfirmModal(title, message, desc) {
  var confirm = OnConfirmModal(title, message, desc)
    .then(function (ret) {
      console.log('yes', ret);
    })
    .then(function (error) {
      console.log('no', error);
    });
}


function doLogoutModal() {
  OnErrorModal('Je ne canna dunna', 'That code is not in my system right now', 'It probably will be soon')
}

// start up
function init() {
  console.log('Copyright (C) Terrance Davis 2015, 2016, 2017');
  console.log('emmaclient.js v1.0');
  getEmmaVersion();
  setTimeout(function () {
    $('#mindofman').slideUp().fadeOut();
  }, 20000);
  $('#content').slideUp().fadeOut();
  $('#informationPanel').fadeToggle('slow');
  $('#messagePanel').fadeToggle('slow');
  $('#dataPanel').fadeToggle('slow');
  
}

function changeUser(profile) {
  setActiveProfile(profile);
  $('#profileImage').attr('src', profile.image);
  
}

function postLoginInit() {
  $('#content').removeClass('invisible').slideDown('slow').fadeIn();
  $('#loginPanel').addClass('invisible').slideUp('slow').fadeOut();
}

$(document).ready(function () {
  init();
  getProfile('tdavis0525');
  console.log('emma ready!');
});

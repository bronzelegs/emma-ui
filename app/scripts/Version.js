function Version( verData){
  this.url = (url === undefined) ? 'http://api.bronzelegs.com:3000/emma/version': url;
  this.version = ( verData === undefined) ? new VersionData(defaultVersion) : verData;
}

Version.prototype.versionString = function () {
  return (this.version.major + '.' + this.version.minor + '.' + this.version.iteration + '.' + this.version.release);
};

Version.prototype.timeStamp = function () {
  return this.version.timestamp;
};

Version.prototype.about = function () {
  return (this.version.description);
};

Version.prototype.getVersion = function(url) {
  
  var jqxhr = $.getJSON(this.url, function () {
      //alert('success');
    })
    .done(function (data) {
      console.log(data);
      $('#awstest').text(JSON.stringify(data));
      this.version = new VersionData(data['response']);
    })
    .fail(function () {
      console.log('server does not appear to be running for ' + _url);
    })
    .always(function () {
      //alert('finished');
    });
};

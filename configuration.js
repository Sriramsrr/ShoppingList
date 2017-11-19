'use strict';

var nconf = require('nconf').file({file:getUserHome()+'/sound-config.json'});

function SaveSetting(key,value){
    nconf.set(key,value);
    nconf.save();
}

function GetSetting(key){
    nconf.load();
    return nconf.get(key);
}

function getUserHome(){
    return process.env[(process.platform=='win32')?'USERPROFILE':'HOME'];
}

module.exports={
  savesetting : SaveSetting,
  getsetting : GetSetting
};
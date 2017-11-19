'use strict';


var {Tray} = require('electron').remote;
var {Menu} = require('electron').remote;
var path = require('path');
var trayIcon = null;

var soundBtn = document.querySelectorAll('.button-sound');

soundBtn.forEach(function(btn){
    var music = btn.attributes['data-sound'].value;
    initBtnSound(btn,music);
});

function initBtnSound(btn,music){
    var audio = new Audio(__dirname+'/wav/'+music+'.wav');
    btn.addEventListener('click',function(){
        audio.currentTime = 0;
        audio.play();
    });
}



var ipcRenderer = require('electron').ipcRenderer;

var close = document.querySelector(".close");

var settings = document.querySelector('.config');

settings.addEventListener('click',function(){
    ipcRenderer.send('new-window');
});

close.addEventListener('click',function(){
    ipcRenderer.send('close-app');
});

ipcRenderer.on('shortcut',function(e,i){
   // console.log("***"+arg);
    var event = new MouseEvent('click');
    soundBtn[i].dispatchEvent(event);
    //console.log(soundBtn[i]);
});

if (process.platform === 'darwin') {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-iconTemplate.png'));
}
else {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-icon-alt.png'));
}
var trayMenuTemplate = [
    {
        label: 'Sound machine',
        enabled: false
    },
    {
        label: 'Settings',
        click: function () {
            ipcRenderer.send('new-window');
        }
    },
    {
        label: 'Quit',
        click: function () {
            ipcRenderer.send('close-app');
        }
    }
];
var trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);
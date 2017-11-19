'use strict';

var {app,BrowserWindow,globalShortcut} = require('electron');
//var browserWindow = require('browser-window');
var ipcMain = require('electron').ipcMain;
var configuration = require('./configuration');


var mainWindow = null;
var settingsWindow = null;


app.on('ready',function(){
    mainWindow = new BrowserWindow({
        frame:false,
        resizable:false,
        height:600,
        width:350
    });

    console.log('file://'+__dirname+'main.html');
    mainWindow.loadURL('file://'+__dirname+'/main.html');

    if(!configuration.getsetting('shortcutkeys')){
        configuration.savesetting('shortcutkeys',['ctrl','alt']);
    }

    RegisterShortcut();
});

function RegisterShortcut(){
    globalShortcut.unregisterAll();

    var shortcutKeySetting = configuration.getsetting('shortcutkeys');
    var shortcutPrefix = shortcutKeySetting.length === 0 ? '' : shortcutKeySetting.join('+')+'+';

    globalShortcut.register(shortcutPrefix+0,function(){
        mainWindow.webContents.send('shortcut','0');
    });
    globalShortcut.register(shortcutPrefix+1,function(){
        mainWindow.webContents.send('shortcut','1');
    });
    globalShortcut.register(shortcutPrefix+2,function(){
        mainWindow.webContents.send('shortcut','2');
    });

}

ipcMain.on('set-global-shortcuts',function(){
    RegisterShortcut();
});

ipcMain.on('close-app', function() {
    app.quit();
});

ipcMain.on('new-window',function(){
    if(settingsWindow){
        return;
    }

    settingsWindow = new BrowserWindow({
        frame : false,
        height : 200,
        resizable : true,
        width : 200
    });

    settingsWindow.loadURL('file://'+__dirname+'/settings.html');

    settingsWindow.on('closed',function(){
        settingsWindow = null;
    })
});

ipcMain.on('close-settings-window', function () {
    if (settingsWindow) {
        settingsWindow.close();
    }
});
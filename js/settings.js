'use strict';

var configuration = require('./configuration');
var ipcRenderer = require('electron').ipcRenderer;

var modifierCheckbox = document.querySelectorAll('.global-shortcut');

var close = document.querySelector('.close');

close.addEventListener('click',function(){
    ipcRenderer.send('close-settings-window');
})

for (var i=0 ; i<modifierCheckbox.length; i++){
    var shortcutkey = configuration.getsetting('shortcutkeys');
    var modifier = modifierCheckbox[i].attributes['data-modifier-key'].value;

    modifierCheckbox[i].checked = shortcutkey.indexOf(modifier) !== -1;

    modifierCheckbox[i].addEventListener('click', function (e) {
        bindModifierCheckboxes(e);
    });
}

function bindModifierCheckboxes(e) {
    var shortcutKeys = configuration.getsetting('shortcutkeys');
    var modifierKey = e.target.attributes['data-modifier-key'].value;

    if (shortcutKeys.indexOf(modifierKey) !== -1) {
        var shortcutKeyIndex = shortcutKeys.indexOf(modifierKey);
        shortcutKeys.splice(shortcutKeyIndex, 1);
    }
    else {
        shortcutKeys.push(modifierKey);
    }

    configuration.savesetting('shortcutKeys', shortcutKeys);
    ipcRenderer.send('set-global-shortcuts');
}
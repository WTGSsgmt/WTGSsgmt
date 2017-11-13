"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _electron = require("electron");

var _createWindow = require("./createWindow");

var _createWindow2 = _interopRequireDefault(_createWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setAppMenu() {
    var template = [{
        label: 'File',
        submenu: [{
            // role: 'newwindow',
            accelerator: "CmdOrCtrl+N",
            label: "New Window",
            click: _createWindow2.default
        }, { type: "separator" }, {
            role: 'close',
            accelerator: "CmdOrCtrl+W",
            label: "Close"
        }]
    }, {
        label: 'Edit',
        submenu: [{ role: 'undo' }, { role: 'redo' }, { type: 'separator' }, { role: 'cut', accelerator: "CmdOrCtrl+X", label: "Cut" }, { role: 'copy', accelerator: "CmdOrCtrl+C", label: "Copy" }, { role: 'paste', accelerator: "CmdOrCtrl+V", label: "Paste" }, { role: 'pasteandmatchstyle' }, { role: 'delete' }, { role: 'selectall', accelerator: "CmdOrCtrl+A", label: "Select All" }]
    }, {
        label: 'View',
        submenu: [{
            label: "Reload",
            role: 'reload',
            accelerator: "CmdOrCtrl+R",
            click: function click(item, focusedWindow) {
                return focusedWindow && focusedWindow.reload();
            }
        },
        // {role: 'forcereload'},
        {
            label: "Toggle DevTools",
            // role: 'toggledevtools',
            accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
            click: function click(item, focusedWindow) {
                return focusedWindow && focusedWindow.toggleDevTools();
            }
        }, { type: 'separator' }, { role: 'resetzoom' }, { role: 'zoomin' }, { role: 'zoomout' }, { type: 'separator' }, { role: 'togglefullscreen' }]
    }, {
        role: 'window',
        submenu: [{ role: 'minimize' }, { role: 'close' }]
    }, {
        role: 'help',
        submenu: [{
            label: 'Learn More',
            click: function click() {
                require('electron').shell.openExternal('https://electron.atom.io');
            }
        }]
    }];

    // mac特有の処理
    if (process.platform === 'darwin') {
        // テンプレート先頭にメインメニューを追加
        template.unshift({
            label: _electron.app.getName(),
            submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'services', submenu: [] }, { type: 'separator' }, { role: 'hide' }, { role: 'hideothers' }, { role: 'unhide' }, { type: 'separator' }, { role: 'quit' }]
        });

        // テンプレート末尾にウィンドウメニューを追加
        template.push({
            role: "window",
            submenu: [{ role: "minimize" }, { role: "zoom" }]
        });

        // // Edit menu
        // template[2].submenu.push(
        //     {type: 'separator'},
        //     {
        //         label: 'Speech',
        //         submenu: [
        //             {role: 'startspeaking'},
        //             {role: 'stopspeaking'}
        //         ]
        //     }
        // );
        //
        // // Window menu
        // template[4].submenu = [
        //     {role: 'close'},
        //     {role: 'minimize'},
        //     {role: 'zoom'},
        //     {type: 'separator'},
        //     {role: 'front'}
        // ]
    }

    // テンプレートからMenuオブジェクトを作成
    var appMenu = _electron.Menu.buildFromTemplate(template);

    // 作成したMenuオブジェクトをアプリケーションに設定
    _electron.Menu.setApplicationMenu(appMenu);
}
exports.default = setAppMenu;
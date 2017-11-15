/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 250);
/******/ })
/************************************************************************/
/******/ ({

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _electron = __webpack_require__(36);

var _createWindow = __webpack_require__(74);

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
                __webpack_require__(36).shell.openExternal('https://electron.atom.io');
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

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(36);

var _createWindow = __webpack_require__(74);

var _createWindow2 = _interopRequireDefault(_createWindow);

var _setAppMenu = __webpack_require__(115);

var _setAppMenu2 = _interopRequireDefault(_setAppMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.app.on("ready", function () {
    (0, _setAppMenu2.default)();
    (0, _createWindow2.default)();
});

_electron.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        _electron.app.quiet();
    }
});

_electron.app.on("activate", function (_e, hasVisibleWindows) {
    if (hasVisibleWindows === false) {
        (0, _createWindow2.default)();
    }
});

/***/ }),

/***/ 36:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _electron = __webpack_require__(36);

var win = void 0;
function createWindow() {
    win = new _electron.BrowserWindow({ width: 1200, height: 600 });
    win.loadURL("file://" + __dirname + "/../../index.html");
    win.webContents.openDevTools();
    win.on("close", function () {
        win = null;
    });
}
exports.default = createWindow;

/***/ })

/******/ });
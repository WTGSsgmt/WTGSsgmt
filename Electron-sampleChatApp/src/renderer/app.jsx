import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import Rooms from "./Rooms";
import Room from "./Room";
import fbConfig from "../main/config.js";

// from "firebase"ではないところは注意．
// 明示的にWebブラウザ用のモジュールを読み込まないと，認証向けの機能が含まれない．
import firebase from "firebase/firebase-browser";

// Routingの定義
const appRouting = (
  <Router history={hashHistory}>
    <Route path="/">
        {/* ログイン画面の描画 */}
        <Route path="login" component={Login} />
        {/* ユーザー登録画面の描画 */}
        <Route path="signup" component={Signup} />
        {/* メイン画面の描画 */}
        <Route path="rooms" component={Rooms} >
            <Route path=":roomId" component={Room} />
        </Route>
    </Route>
  </Router>
);

// Routingの初期化
if (!location.hash.length) {
    location.hash = "#/login"
}

// Initialize Firebase
firebase.initializeApp(fbConfig);

// Applicationの描画
render(appRouting, document.getElementById("app"));

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _RoomItem = require("./RoomItem");

var _RoomItem2 = _interopRequireDefault(_RoomItem);

var _firebaseBrowser = require("firebase/firebase-browser");

var _firebaseBrowser2 = _interopRequireDefault(_firebaseBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ICON_CHAT_STYLE = {
    fontSize: 120,
    color: "#DDD"
};

var FORM_STYLE = {
    display: "flex"
};

var BUTTON_STYLE = {
    marginLeft: 10
};

var Rooms = function (_React$Component) {
    _inherits(Rooms, _React$Component);

    function Rooms(props) {
        _classCallCheck(this, Rooms);

        var _this = _possibleConstructorReturn(this, (Rooms.__proto__ || Object.getPrototypeOf(Rooms)).call(this, props));

        _this.state = {
            roomName: "",
            rooms: []
        };
        _this.db = _firebaseBrowser2.default.database();
        _this.handleOnChangeRoomName = _this.handleOnChangeRoomName.bind(_this);
        _this.handleOnSubmit = _this.handleOnSubmit.bind(_this);
        return _this;
    }

    _createClass(Rooms, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            // コンポーネントの初期化時にチャットルームの一覧を取得
            console.log("ルーム一覧取得");
            this.fetchRooms();
        }
    }, {
        key: "handleOnChangeRoomName",
        value: function handleOnChangeRoomName(e) {
            this.setState({
                roomName: e.target.value
            });
        }
    }, {
        key: "handleOnSubmit",
        value: function handleOnSubmit(e) {
            var _this2 = this;

            var roomName = this.state.roomName;

            e.preventDefault();
            if (!roomName.length) {
                return;
            }
            // Firebaseデータベースに新規チャットルームのデータ作成
            var newRoomRef = this.db.ref("/chatrooms").push();
            var newRoom = {
                description: roomName
            };
            // 作成したチャットルームのdescriptionを更新
            newRoomRef.update(newRoom).then(function () {
                // 状態を更新
                _this2.setState({ roomName: "" });
                // チャットルーム一覧を再取得
                return _this2.fetchRooms().then(function () {
                    // 右ペインを作成した詳細画面に遷移させる
                    _reactRouter.hashHistory.push("/rooms/" + newRoomRef.key);
                });
            });
        }
    }, {
        key: "handleLogout",
        value: function handleLogout() {
            var _this3 = this;

            _firebaseBrowser2.default.auth().signOut().then(function () {
                _reactRouter.hashHistory.push("/login");
                console.log("success logout");
            }).catch(function (err) {
                _this3.setState({ errors: [err.message] });
                console.log(err.message);
            });
        }

        // チャットルーム一覧の取得処理

    }, {
        key: "fetchRooms",
        value: function fetchRooms() {
            var _this4 = this;

            // Firebaseデータベースからチャットルームを20件種等
            return this.db.ref("/chatrooms").limitToLast(20).once("value").then(function (snapshot) {
                var rooms = [];
                snapshot.forEach(function (item) {
                    // データーベースから取得したデータをオブジェクトして取り出す
                    rooms.push(Object.assign({ key: item.key }, item.val()));
                });
                // 取得したオブジェクトの配列をコンポーネントのstateにセット
                _this4.setState({ rooms: rooms });
            });
        }

        // 左ペインチャットルーム一覧の描画処理

    }, {
        key: "renderRoomList",
        value: function renderRoomList() {
            var roomId = this.props.params.roomId;
            var _state = this.state,
                rooms = _state.rooms,
                roomName = _state.roomName;

            return _react2.default.createElement(
                "div",
                { className: "list-group" },
                rooms.map(function (r) {
                    return _react2.default.createElement(_RoomItem2.default, { room: r, key: r.key, selected: r.key === roomId });
                }),
                _react2.default.createElement(
                    "div",
                    { className: "list-group-header" },
                    _react2.default.createElement(
                        "form",
                        { style: FORM_STYLE, onSubmit: this.handleOnSubmit },
                        _react2.default.createElement("input", {
                            type: "text",
                            className: "form-control",
                            placeholder: "New Room",
                            onChange: this.handleOnChangeRoomName,
                            value: roomName
                        }),
                        _react2.default.createElement(
                            "button",
                            { className: "btn btn-default", style: BUTTON_STYLE },
                            _react2.default.createElement("span", { className: "icon icon-plus" })
                        )
                    ),
                    _react2.default.createElement(
                        "button",
                        { className: "btn btn-default", style: BUTTON_STYLE, onClick: this.handleLogout },
                        "\u30ED\u30B0\u30A2\u30A6\u30C8"
                    )
                )
            );
        }

        // 右ペインの描画処理

    }, {
        key: "renderRoom",
        value: function renderRoom() {
            if (this.props.children) {
                return this.props.children;
            } else {
                return _react2.default.createElement(
                    "div",
                    { className: "text-center" },
                    _react2.default.createElement(
                        "div",
                        { style: ICON_CHAT_STYLE },
                        _react2.default.createElement("span", { className: "icon icon-chat" })
                    ),
                    _react2.default.createElement(
                        "p",
                        null,
                        "join a chat room form the sidebar or create your chat room."
                    )
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "pane-group" },
                _react2.default.createElement(
                    "div",
                    { className: "pane-sm sidebar" },
                    this.renderRoomList()
                ),
                _react2.default.createElement(
                    "div",
                    { className: "pane" },
                    this.renderRoom()
                )
            );
        }
    }]);

    return Rooms;
}(_react2.default.Component);

exports.default = Rooms;
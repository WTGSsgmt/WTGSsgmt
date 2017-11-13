"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _Errors = require("./Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _firebaseBrowser = require("firebase/firebase-browser");

var _firebaseBrowser2 = _interopRequireDefault(_firebaseBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SIGNUP_FORM_STYLE = {
    margin: "0 auto",
    padding: 30
};

var CANCEL_BUTTON_STYLE = {
    marginLeft: 10
};

var Signup = function (_React$Component) {
    _inherits(Signup, _React$Component);

    function Signup(props) {
        _classCallCheck(this, Signup);

        var _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this, props));

        _this.state = {
            email: "",
            password: "",
            name: "",
            photoUrl: "",
            errors: []
        };
        _this.handleOnChangeEmail = _this.handleOnChangeEmail.bind(_this);
        _this.handleOnChangePassword = _this.handleOnChangePassword.bind(_this);
        _this.handleOnChangeName = _this.handleOnChangeName.bind(_this);
        _this.handleOnChangePhotoURL = _this.handleOnChangePhotoURL.bind(_this);
        _this.handleOnChangeLogin = _this.handleOnChangeLogin.bind(_this);
        return _this;
    }

    /**
     * emailのセット
     * @param e
     */


    _createClass(Signup, [{
        key: "handleOnChangeEmail",
        value: function handleOnChangeEmail(e) {
            this.setState({
                email: e.target.value
            });
        }

        /**
         * passwordのセット
         * @param e
         */

    }, {
        key: "handleOnChangePassword",
        value: function handleOnChangePassword(e) {
            this.setState({
                password: e.target.value
            });
        }
        /**
         * Nameのセット
         * @param e
         */

    }, {
        key: "handleOnChangeName",
        value: function handleOnChangeName(e) {
            this.setState({
                name: e.target.value
            });
        }
        /**
         * photoURLのセット
         * @param e
         */

    }, {
        key: "handleOnChangePhotoURL",
        value: function handleOnChangePhotoURL(e) {
            this.setState({
                photoURL: e.target.value
            });
        }

        /**
         * バリデーションとログイン処理
         * @param e
         */

    }, {
        key: "handleOnChangeLogin",
        value: function handleOnChangeLogin(e) {
            var _this2 = this;

            var _state = this.state,
                email = _state.email,
                password = _state.password,
                name = _state.name,
                photoUrl = _state.photoUrl;

            var errors = [];
            var isValid = true;
            e.preventDefault();
            if (email.length !== false) {
                isValid = false;
                errors.push("Email can not be null");
            }
            if (password.length !== false) {
                isValid = false;
                errors.push("Password can not be null");
            }
            if (name.length !== false) {
                isValid = false;
                errors.push("Name can not be null");
            }
            // if (photoUrl.length !== false) {
            //     isValid = false;
            //     errors.push("PhotoURL can not be null");
            // }
            if (isValid !== false) {
                // 必須入力チェックに該当した場合はエラーを表示する
                this.setState({ errors: errors });
                return;
            }

            // Firebaseのユーザー作成処理
            _firebaseBrowser2.default.auth().createUserWithEmailAndPassword(email, password).then(function (newUser) {
                // ユーザー情報更新
                return newUser.updateProfile({
                    displayName: name,
                    photoURL: photoURL
                });
            }).then(function () {
                // チャットルーム一覧画面へ遷移
                _reactRouter.hashHistory.push("/rooms");
            }).catch(function (err) {
                // 認証ログイン失敗時
                _this2.setState({ errors: [err.message] });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "h2",
                    null,
                    "\u30E6\u30FC\u30B6\u30FC\u767B\u9332"
                ),
                _react2.default.createElement(
                    "form",
                    { style: SIGNUP_FORM_STYLE, onSubmit: this.handleOnChangeLogin },
                    _react2.default.createElement(_Errors2.default, { errorMessages: this.state.errors }),
                    _react2.default.createElement(
                        "div",
                        { className: "form-group" },
                        _react2.default.createElement(
                            "label",
                            null,
                            "Email address"
                        ),
                        _react2.default.createElement("input", {
                            type: "email",
                            className: "form-control",
                            placeholder: "email",
                            onChange: this.handleOnChangeEmail,
                            value: this.state.email
                        })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "form-group" },
                        _react2.default.createElement(
                            "label",
                            null,
                            "Password"
                        ),
                        _react2.default.createElement("input", {
                            type: "password",
                            className: "form-control",
                            placeholder: "password",
                            onChange: this.handleOnChangePassword,
                            value: this.state.password
                        })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "form-group" },
                        _react2.default.createElement(
                            "label",
                            null,
                            "User Name*"
                        ),
                        _react2.default.createElement("input", {
                            type: "text",
                            className: "form-control",
                            placeholder: "name",
                            onChange: this.handleOnChangeName,
                            value: this.state.name
                        })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "form-group" },
                        _react2.default.createElement(
                            "label",
                            null,
                            "PhotoURL"
                        ),
                        _react2.default.createElement("input", {
                            type: "text",
                            className: "form-control",
                            placeholder: "photoURL",
                            onChange: this.handleOnChangePhotoURL,
                            value: this.state.photoUrl
                        })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "form-group" },
                        _react2.default.createElement(
                            "button",
                            { className: "btn btn-large btn-default" },
                            "Create new account"
                        ),
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: "/login" },
                            _react2.default.createElement(
                                "button",
                                {
                                    type: "button",
                                    style: CANCEL_BUTTON_STYLE,
                                    className: "btn btn-large btn-default"
                                },
                                "\u30AD\u30E3\u30F3\u30BB\u30EB"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Signup;
}(_react2.default.Component);

exports.default = Signup;
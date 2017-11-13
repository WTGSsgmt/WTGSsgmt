import React from "react";
import { Link, hashHistory } from "react-router";
import Errors from "./Errors";
import firebase from "firebase/firebase-browser";

const SIGNUP_FORM_STYLE = {
    margin: "0 auto",
    padding: 30
};

const CANCEL_BUTTON_STYLE = {
    marginLeft: 10
};
export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            photoUrl: "",
            errors: [],
        };
        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.handleOnChangeName = this.handleOnChangeName.bind(this);
        this.handleOnChangePhotoURL = this.handleOnChangePhotoURL.bind(this);
        this.handleOnChangeLogin = this.handleOnChangeLogin.bind(this);
    }

    /**
     * emailのセット
     * @param e
     */
    handleOnChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    /**
     * passwordのセット
     * @param e
     */
    handleOnChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    /**
     * Nameのセット
     * @param e
     */
    handleOnChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    /**
     * photoURLのセット
     * @param e
     */
    handleOnChangePhotoURL(e) {
        this.setState({
            photoURL: e.target.value
        });
    }

    /**
     * バリデーションとログイン処理
     * @param e
     */
    handleOnChangeLogin(e) {
        const {email, password, name, photoUrl} = this.state;
        const errors = [];
        let isValid = true;
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
            this.setState({errors});
            return;
        }

        // Firebaseのログイン処理
        firebase.auth().createUserWithEmailAndPassword(email, password).then(newUser => {
            // ユーザー情報更新
            return newUser.updateProfile({
                displayName: name,
                photoURL
            });
        }).then(() => {
            // チャットルーム一覧画面へ遷移
            hashHistory.push("/rooms");
        }).catch(err => {
            // 認証ログイン失敗時
            this.setState({errors: [err.message]});
        });
    }

    render() {
        return (
            <form style={SIGNUP_FORM_STYLE} onSubmit={this.handleOnChangeLogin}>
                <Errors errorMessages={this.state.errors}/>
                <div className="form-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="email"
                        onChange={this.handleOnChangeEmail}
                        value={this.state.email}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        onChange={this.handleOnChangePassword}
                        value={this.state.password}
                    />
                </div>
                <div className="form-group">
                    <label>User Name*</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="name"
                        onChange={this.handleOnChangeName}
                        value={this.state.name}
                    />
                </div>
                <div className="form-group">
                    <label>PhotoURL</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="photoURL"
                        onChange={this.handleOnChangePhotoURL}
                        value={this.state.photoUrl}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-large btn-default">Create new account</button>
                    <Link to="/login">
                        <button
                            type="button"
                            style={CANCEL_BUTTON_STYLE}
                            className="btn btn-large btn-default"
                        >Cancel</button>
                    </Link>
                </div>
            </form>
        );
    }
}
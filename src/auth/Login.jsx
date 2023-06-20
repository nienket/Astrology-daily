import React, { useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
// import AuthDetails from "./AuthDetails";
import { auth } from "../configs/firebase.configs";
import AppInput from "../common/input";
import AppButton from "../common/button";
// import TextInner from "../components/textInner";
import { FaGoogle } from "react-icons/fa";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLoginSuccess, postUser } from "../store/actions/user.action";
import { getUserDoc } from "../connectFirestore/GetUser";
function Login() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = (e) => {
    e.preventDefault();
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(postUser(userCredential.user.accessToken));
        // history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setAuthUser(currentUser);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
    // eslint-disable-next-line
  }, []);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          dispatch(postLoginSuccess(currentUser.providerData[0]));
          localStorage.setItem(
            "userObject",
            JSON.stringify(currentUser.providerData[0])
          );
          // history.push("/");
        }
      });
      return () => {
        unsubscribe();
      };
      // eslint-disable-next-line
    }, []);
  if (authUser !== null) {
    getUserDoc(authUser.uid, (userData) => {
      dispatch(postLoginSuccess(userData));
      localStorage.setItem("userObject", JSON.stringify(userData));
      userData.userRole === "admin" && history.push("/dashboard");
    });
  }
  return (
    <div className="et_builder_inner_content et_pb_gutters3">
      {/* <TextInner child="Login" htmlType="h1" /> */}
      <div className="section_sticky">
        <div className="row_0 row">
          <div className="column_0 column">
            <div className="image_sticky">
              <span>
                <img
                  decoding="async"
                  src="http://zaib.sandbox.etdevs.com/divi/wp-content/uploads/sites/2/2020/08/astrology-illustrations-05-copy.png"
                  alt=""
                />
              </span>
            </div>
            <div className="et_pb_module et_pb_text et_pb_text_0  et_pb_text_align_left et_pb_bg_layout_light">
              <div className="et_pb_text_inner">
                <h2>Login</h2>
              </div>
            </div>
            <div className="et_pb_module et_pb_text et_pb_text_1  et_pb_text_align_center et_pb_bg_layout_light" style={{padding:"20px 100px"}}>
              <div className="et_pb_text_inner">
                <div
                  id="et_pb_contact_form_0"
                  className="et_pb_module et_pb_contact_form_0 et_pb_contact_form_container clearfix"
                >
                  <div className="et_pb_text_inner">
                    <h3
                      style={{
                        color: "rgb(254, 127, 92)",
                        fontFamily: "Philosopher",
                        paddingBottom: "20px",
                      }}
                    >
                      {error && error}
                    </h3>
                  </div>
                  <div className="et_pb_contact">
                    <form
                      className="et_pb_contact_form clearfix"
                      onSubmit={login}
                    >
                      <AppInput
                        type="email"
                        children="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <AppInput
                        type="password"
                        children="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="et_contact_bottom_container">
                        <AppButton
                          type="submit"
                          children="login"
                          btnType="button_1"
                          // htmlType="a"
                        />
                      </div>
                      {/* <AuthDetails /> */}
                    </form>
                    <div style={{ display: "flex", paddingTop: "50px" }}>
                      <AppButton
                        children="Login"
                        btnType="button_2"
                        Icon={FaGoogle}
                        htmlType="a"
                        onClick={googleSignIn}
                      />
                      <div style={{ padding: "5px" }}></div>
                      <AppButton
                        children="Register"
                        btnType="button_2"
                        htmlType="link"
                        url="/register"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;

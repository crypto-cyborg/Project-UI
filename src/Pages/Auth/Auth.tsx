import foto from "../../Assets/Images/Trading.jpg";
import LanguageSwitcher from "../../Components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../Store/Reducers/store';
import * as authSlice from '../../Store/Reducers/authSlice';
import { useAuth } from "../../Store/Hooks/useAuthHook";
import animationData from "../../Assets/Videos/BtnLoading.json";
import Lottie from "lottie-react";
import "./Auth.scss";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import '../../App.scss'
import 'react-toastify/dist/ReactToastify.css';
import video from '../../Assets/Videos/GetApi.mov'

const Auth: React.FC = () => {
    const authState = useSelector((state: RootState) => state.auth);
    const { t } = useTranslation("common");
    const dispatch = useDispatch();
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const { Login, Register } = useAuth();

    const openVideo = () => {
        setIsVideoOpen(true);
    };

    const closeVideo = () => {
        setIsVideoOpen(false);
    };

    return (
        <div className="auth">
            <LanguageSwitcher />

            <div
                className="background-img"
                style={{ backgroundImage: `url(${foto})` }}
            >
                <div className="overlay"></div>
                {isVideoOpen && (
                    <div className={`video-modal ${isVideoOpen ? 'active' : ''}`}>
                        <div className="video-container">
                            <video
                                src={video}
                                title="Video"
                                controls
                                autoPlay
                            ></video>
                            <button className="close-btn" onClick={closeVideo}><i className="bx bx-x"></i></button>
                        </div>
                    </div>
                )}
                <div className="container">
                    <div className="content">
                        <h2 className="gradient-text">Hash Techie</h2>
                        <h3 className="header-text">
                            {t("Auth.Welcome")} <br />
                            {/* <span className="highlight-text">{t("Auth.Title")}</span> */}
                        </h3>
                        {/* <p className="description">{t("Auth.Description")}</p> */}
                    </div>
                    <div className="form-container">
                        <div className="form">
                            <h2 className="custom-text">
                                {authState.isRegister
                                    ? `${t("Auth.SignUp")}`
                                    : `${t("Auth.SignIn")}`}
                            </h2>

                            <div className={`inputs-container ${authState.isRegister ? "register-page" : ""}`}>
                                {authState.isRegister &&
                                    <div className="input-container">
                                        <span className="custom-position">
                                            <i className='bx bxs-id-card' ></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={authState.registerData.FirstName}
                                            onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, FirstName: e.target.value }))}
                                            className="input"
                                            required
                                        />
                                        <label
                                            htmlFor="firstName"
                                            className={`input-label ${authState.registerData.FirstName ? "focused" : ""
                                                }`}
                                        >
                                            {t("Auth.FirstName")}
                                        </label>
                                    </div>
                                }

                                {authState.isRegister &&
                                    <div className="input-container">
                                        <span className="custom-position">
                                            <i className='bx bxs-id-card' ></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={authState.registerData.LastName}
                                            onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, LastName: e.target.value }))}
                                            className="input"
                                            required
                                        />
                                        <label
                                            htmlFor="lastName"
                                            className={`input-label ${authState.registerData.LastName ? "focused" : ""
                                                }`}
                                        >
                                            {t("Auth.LastName")}
                                        </label>
                                    </div>
                                }

                                <div className="input-container">
                                    <span className="custom-position" >
                                        <i className='bx bxs-user' ></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="username"
                                        value={authState.registerData.Username}
                                        onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, Username: e.target.value }))}
                                        className="input"
                                        required
                                    />
                                    <label
                                        htmlFor="username"
                                        className={`input-label ${authState.registerData.Username ? "focused" : ""
                                            }`}
                                    >
                                        {t("Auth.Username")}
                                    </label>
                                </div>

                                {authState.isRegister &&
                                    <div className="input-container">
                                        <span className="custom-position">
                                            <i className='bx bxs-envelope' ></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="email"
                                            value={authState.registerData.Email}
                                            onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, Email: e.target.value }))}
                                            className="input"
                                            required
                                        />
                                        <label
                                            htmlFor="email"
                                            className={`input-label ${authState.registerData.Email ? "focused" : ""
                                                }`}
                                        >
                                            {t("Auth.Email")}
                                        </label>
                                    </div>
                                }

                                <div className="input-container">
                                    <span className="custom-position">
                                        <i className='bx bxs-lock-alt'></i>
                                    </span>
                                    <input
                                        type="password"
                                        id="password"
                                        value={authState.registerData.Password}
                                        onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, Password: e.target.value }))}
                                        className="input"
                                        required
                                    />
                                    <label
                                        htmlFor="password"
                                        className={`input-label ${authState.registerData.Password ? "focused" : ""
                                            }`}
                                    >
                                        {t("Auth.Password")}
                                    </label>
                                </div>

                                {authState.isRegister &&
                                    <div className="input-container">
                                        <span className="custom-position">
                                            <i className='bx bxs-lock-alt' ></i>
                                        </span>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            value={authState.registerData.ConfirmPassword}
                                            onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, ConfirmPassword: e.target.value }))}
                                            className="input"
                                            required
                                        />
                                        <label
                                            htmlFor="confirmPassword"
                                            className={`input-label ${authState.registerData.ConfirmPassword ? "focused" : ""
                                                }`}
                                        >
                                            {t("Auth.ConfirmPassword")}
                                        </label>
                                    </div>
                                }

                                {authState.isRegister &&
                                    <div className="input-container">
                                        <span className="custom-position">
                                            <i className='bx bx-key' ></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="secretKey"
                                            value={authState.registerData.SecretKey}
                                            onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, SecretKey: e.target.value }))}
                                            className="input"
                                            required
                                        />
                                        <label
                                            htmlFor="secretKey"
                                            className={`input-label ${authState.registerData.SecretKey ? "focused" : ""
                                                }`}
                                        >
                                            {t("Auth.SecretKey")}
                                        </label>
                                    </div>
                                }

                                {authState.isRegister &&
                                    <div className="input-container">
                                        <span className="custom-position">
                                            <i className='bx bx-key' ></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="apiKey"
                                            value={authState.registerData.ApiKey}
                                            onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, ApiKey: e.target.value }))}
                                            className="input"
                                            required
                                        />
                                        <label
                                            htmlFor="apiKey"
                                            className={`input-label ${authState.registerData.ApiKey ? "focused" : ""
                                                }`}
                                        >
                                            {t("Auth.APIKey")}
                                        </label>
                                    </div>
                                }
                            </div>

                            <div className="btn-texts">
                                {!authState.isRegister &&
                                    <div className="forgot-password">
                                        <a>{t("Auth.ForgotPassword")}</a>
                                    </div>
                                }

                                {authState.isRegister &&
                                    <div className="video">
                                        <a onClick={openVideo}>{t("Auth.Video")}</a>
                                    </div>
                                }
                            </div>

                            <button
                                className="signİnUpBtn"
                                disabled={authState.isLoading}
                                onClick={() =>
                                    authState.isRegister
                                        ? Register(authState.registerData)
                                        : Login({
                                            Username: authState.registerData.Username,
                                            Password: authState.registerData.Password,
                                        })
                                }
                            >
                                {authState.isLoading ? (
                                    <Lottie className="btnAnimation" animationData={animationData} />
                                ) : (
                                    authState.isRegister ? t("Auth.SignUp") : t("Auth.SignIn")
                                )}
                            </button>

                            <div className="auth-switch">
                                <p>
                                    {authState.isRegister
                                        ? `${t("Auth.HasAccountText")}`
                                        : `${t("Auth.NoAccountText")}`}
                                    <a
                                        onClick={(e) => {
                                            dispatch(authSlice.setIsRegister(!authState.isRegister));
                                        }}
                                    >
                                        {authState.isRegister
                                            ? `${t("Auth.SignIn")}`
                                            : `${t("Auth.SignUp")}`}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Auth;
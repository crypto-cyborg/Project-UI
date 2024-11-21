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

const Auth: React.FC = () => {
    const authState = useSelector((state: RootState) => state.auth);
    const { t } = useTranslation("common");
    const dispatch = useDispatch();
    const { Login, Register } = useAuth();

    return (
        <div className="auth">
            <LanguageSwitcher />

            <div
                className="background-img"
                style={{ backgroundImage: `url(${foto})` }}
            >
                <div className="overlay"></div>

                <div className="container">
                    <div className="content">
                        <h2 className="gradient-text">Hash Techie</h2>
                        <h3 className="header-text">
                            {t("Auth.Welcome")} <br />
                            <span className="highlight-text">{t("Auth.Title")}</span>
                        </h3>
                        <p className="description">{t("Auth.Description")}</p>
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
                                            value={authState.registerData.firstName}
                                            onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, firstName: e.target.value }))}
                                            className="input"
                                            required
                                        />
                                        <label
                                            htmlFor="firstName"
                                            className={`input-label ${authState.registerData.firstName ? "focused" : ""
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
                                            value={authState.registerData.lastName}
                                            onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, lastName: e.target.value }))}
                                            className="input"
                                            required
                                        />
                                        <label
                                            htmlFor="lastName"
                                            className={`input-label ${authState.registerData.lastName ? "focused" : ""
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
                                        value={authState.registerData.username}
                                        onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, username: e.target.value }))}
                                        className="input"
                                        required
                                    />
                                    <label
                                        htmlFor="username"
                                        className={`input-label ${authState.registerData.username ? "focused" : ""
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
                                            value={authState.registerData.email}
                                            onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, email: e.target.value }))}
                                            className="input"
                                            required
                                        />
                                        <label
                                            htmlFor="email"
                                            className={`input-label ${authState.registerData.email ? "focused" : ""
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
                                        value={authState.registerData.password}
                                        onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, password: e.target.value }))}
                                        className="input"
                                        required
                                    />
                                    <label
                                        htmlFor="password"
                                        className={`input-label ${authState.registerData.password ? "focused" : ""
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
                                            value={authState.registerData.confirmPassword}
                                            onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, confirmPassword: e.target.value }))}
                                            className="input"
                                            required
                                        />
                                        <label
                                            htmlFor="confirmPassword"
                                            className={`input-label ${authState.registerData.confirmPassword ? "focused" : ""
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
                                            value={authState.registerData.secretKey}
                                            onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, secretKey: e.target.value }))}
                                            className="input"
                                            required
                                        />
                                        <label
                                            htmlFor="secretKey"
                                            className={`input-label ${authState.registerData.secretKey ? "focused" : ""
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
                                            value={authState.registerData.apiKey}
                                            onChange={(e) => dispatch(authSlice.setRegisterData({ ...authState.registerData, apiKey: e.target.value }))}
                                            className="input"
                                            required
                                        />
                                        <label
                                            htmlFor="apiKey"
                                            className={`input-label ${authState.registerData.apiKey ? "focused" : ""
                                                }`}
                                        >
                                            {t("Auth.APIKey")}
                                        </label>
                                    </div>
                                }
                            </div>

                            <div className="forgot-password">
                                <a>{t("Auth.ForgotPassword")}</a>
                            </div>

                            <button
                                className="signİnUpBtn"
                                disabled={authState.isLoading}
                                onClick={() =>
                                    authState.isRegister
                                        ? Register(authState.registerData) 
                                        : Login({
                                            username: authState.registerData.username, 
                                            password: authState.registerData.password,
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
        </div>
    );
};

export default Auth;
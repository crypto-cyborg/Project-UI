import { Link } from "react-router-dom";
import BgVideo from '../../Assets/Videos/Background.mp4';
import { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../Assets/Videos/AnimationNew.json';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../../Components/LanguageSwitcher/LanguageSwitcher";
import Accordion from "../../Components/Accordion/Accordion";

import './Home.scss';
import StepCard from "../../Components/StepCard/StepCard";

export default function Home() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { t } = useTranslation("common");

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.7;
        }
    }, []);

    return (
        <div className="home">
            <div className="main">
                <LanguageSwitcher />

                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="video"
                >
                    <source src={BgVideo} type="video/mp4" />
                </video>

                <div className="film-overlay"></div>

                <div className="main-container">
                    <h1>{t("Home.Main.Title1")}</h1>
                    <h2>{t("Home.Main.Title2")}</h2>
                    <h3>{t("Home.Main.Description1")}</h3>

                    <div className="button-container">
                        <Link to="/auth" className="button">
                            {t("Home.Main.AccountCreateButton")}
                        </Link>

                        <p className="description">{t("Home.Main.Description2")}</p>
                    </div>
                </div>
            </div>
            {/* 
            <div className="features">
                <h2 className="title sm:title">{t("Home.SecondPage.Title")}</h2>
                <p className="description">{t("Home.SecondPage.Description")}</p>

                <div className="card-container">
                    <FeatureCard
                        icon="bx-grid-alt"
                        title={t("Home.SecondPage.FeatureCards.Card1.Title")}
                        description={t("Home.SecondPage.FeatureCards.Card1.Description")}
                        linkText={t("Home.SecondPage.FeatureCards.Card1.Button")}
                        iconColor="text-blue-400"
                    />
                    <FeatureCard
                        icon="bx-bell"
                        title={t("Home.SecondPage.FeatureCards.Card2.Title")}
                        description={t("Home.SecondPage.FeatureCards.Card2.Description")}
                        linkText={t("Home.SecondPage.FeatureCards.Card2.Button")}
                        iconColor="text-red-400"
                    />
                    <FeatureCard
                        icon="bx-cog"
                        title={t("Home.SecondPage.FeatureCards.Card3.Title")}
                        description={t("Home.SecondPage.FeatureCards.Card3.Description")}
                        linkText={t("Home.SecondPage.FeatureCards.Card3.Button")}
                        iconColor="text-purple-400"
                    />
                    <FeatureCard
                        icon="bx-headphone"
                        title={t("Home.SecondPage.FeatureCards.Card4.Title")}
                        description={t("Home.SecondPage.FeatureCards.Card4.Description")}
                        linkText={t("Home.SecondPage.FeatureCards.Card4.Button")}
                        iconColor="text-yellow-400"
                    />
                    <FeatureCard
                        icon="bx-money-withdraw"
                        title={t("Home.SecondPage.FeatureCards.Card5.Title")}
                        description={t("Home.SecondPage.FeatureCards.Card5.Description")}
                        linkText={t("Home.SecondPage.FeatureCards.Card5.Button")}
                        iconColor="text-green-400"
                    /> 
                </div>
            </div> */}

            <div className="reklam">
                <div className="reklam-container">
                    <div className="reklam-info">
                        <div className="text-highlight">
                            <i className="bx bxs-graduation"></i>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-style">{t("Home.Between.Title")}</h3>
                            <p className="text-muted">{t("Home.Between.Description")}</p>
                        </div>
                        <div className="flex-space">
                            <Link className="button-1" to="/auth">{t("Home.Between.TryButton")}</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="step">
                <div className="step-container">
                    <div className="container">
                        <div>
                            <h2 className="text-title">{t("Home.ThirdPage.Title")}</h2>
                            <p className="text-muted">{t("Home.ThirdPage.Description")}</p>

                            <div className="animation">
                                <Lottie animationData={animationData} style={{ width: 600, height: 300 }} />
                            </div>

                            <div className="steps">
                                <StepCard
                                    icon="bx bx-plus"
                                    title={t("Home.ThirdPage.StepCards.Card1")}
                                />
                                <StepCard
                                    icon="bx bx-line-chart"
                                    title={t("Home.ThirdPage.StepCards.Card2")}
                                />
                                <StepCard
                                    icon="bx bx-dock-left"
                                    title={t("Home.ThirdPage.StepCards.Card3")}
                                />
                                <StepCard
                                    icon="bx bx-check"
                                    title={t("Home.ThirdPage.StepCards.Card4")}
                                />
                            </div>
                        </div>

                        <div className="button-container">
                            <button className="button">{t("Home.ThirdPage.TryButton")}</button>
                            <p className="description">{t("Home.ThirdPage.MiniDescription")}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section">
                <h2 className="title">{t("Home.FourthPage.Title")}</h2>
                <p className="description">{t("Home.FourthPage.Description")}</p>

                <Accordion question={t("Home.FourthPage.Questions.Question1.Question")} answer={t("Home.FourthPage.Questions.Question1.Answer")} />
                <Accordion question={t("Home.FourthPage.Questions.Question2.Question")} answer={t("Home.FourthPage.Questions.Question2.Answer")} />
                <Accordion question={t("Home.FourthPage.Questions.Question3.Question")} answer={t("Home.FourthPage.Questions.Question3.Answer")} />
                <Accordion question={t("Home.FourthPage.Questions.Question4.Question")} answer={t("Home.FourthPage.Questions.Question4.Answer")} />
                <Accordion question={t("Home.FourthPage.Questions.Question5.Question")} answer={t("Home.FourthPage.Questions.Question5.Answer")} />
            </div>
        </div>
    );
}
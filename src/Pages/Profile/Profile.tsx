import React, { useEffect } from 'react';
import { useProfile } from '../../Store/Hooks/useProfileHooks';
import { AppDispatch, RootState } from '../../Store/Reducers/store';
import { useSelector, useDispatch } from 'react-redux';
import photo from '../../Assets/Images/Profile.jpg'
import './Profile.scss';

import {
    AreaChart,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
} from "recharts";

const Profile: React.FC = () => {
    const profileState = useSelector((state: RootState) => state.profile);
    const chartState = useSelector((state: RootState) => state.chart);
    const authState = useSelector((state: RootState) => state.auth);
    const { Initialize, GetUserPositions } = useProfile();
    const dispatch = useDispatch<AppDispatch>();

    const handleCopy = () => {
        const walletId = profileState.Wallet?.Id;
        if (walletId) {
            navigator.clipboard.writeText(walletId);
        }
    };

    useEffect(() => {
        Initialize(authState.User.Id);
        GetUserPositions(authState.User.Id);
    }, [authState.User]);

    return (
        <div className='profile'>
            <div className='column1'>
                <div className="profile-data">
                    <div className="profile-header">
                        <img className="profile-image" src={photo} />
                        <div className="profile-info">
                            <h2>{authState.User.FirstName} {authState.User.LastName}</h2>
                            <p>@{authState.User.Username}</p>
                            <p>{authState.User.Email}</p>
                            <p className={authState.User.IsEmailConfirmed ? 'email-confirmed' : 'email-not-confirmed'}>
                                {authState.User.IsEmailConfirmed ? 'Email Confirmed' : 'Email Not Confirmed'}
                            </p>
                        </div>
                    </div>
                </div>


                <div className='personal-statistics'>
                    <div className='header'>
                        <h2>Personal Statistics</h2>
                        <i className="bx bx-dots-horizontal-rounded"></i>
                    </div>
                    <div className='personal-statistics-chart'>
                        <div className='personal-statistics-data'>
                            <div className='data-header'>
                                <h2>Today</h2>
                                <div className='filter'>
                                    <div className='filter-buttons'>
                                        {['1d', '7d', '1m', '3m', '1y'].map((option, index) => (
                                            <button key={index}>{option}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <h3>$100</h3>
                        </div>
                        <ResponsiveContainer width="100%" height="100%" style={{paddingLeft: '50px'}}>
                            <AreaChart data={profileState.Wallet?.Transactions || []}>
                                <CartesianGrid vertical={false} horizontal={true} stroke="#1D1E22" />
                                <XAxis
                                    dataKey="Time"
                                    tick={{ fill: "#555457" }}
                                    axisLine={false}
                                    dy={15}
                                    tickFormatter={(time) => new Date(time).toLocaleDateString()}
                                />
                                <YAxis tick={{ fill: "#555457" }} tickFormatter={(value) => `${value}$`} axisLine={false} dx={-15} />
                                <Tooltip
                                    contentStyle={{
                                        border: "none",
                                        borderRadius: "10%",
                                        backgroundColor: "#1D1E22",
                                        color: "#1D1E22"
                                    }}
                                    formatter={(value) => [`${value}$`, ""]}
                                    separator=""
                                />

                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="white" stopOpacity={0.4} />
                                        <stop offset="40%" stopColor="white" stopOpacity={0.3} />
                                        <stop offset="70%" stopColor="white" stopOpacity={0.1} />
                                        <stop offset="100%" stopColor="white" stopOpacity={0} />
                                    </linearGradient>
                                </defs>

                                <Area
                                    type="monotone"
                                    dataKey="Amount" 
                                    stroke="#fff"
                                    fill="url(#colorValue)"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={true}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className='column2'>
                <div className='wallet'>
                    <div className='header'>

                        <h2>Wallet</h2>
                        <i className="bx bx-dots-horizontal-rounded"></i>
                    </div>

                    <div className='wallet-container'>
                        <div className='wallet-id'>
                            <div className='wallet-data'>
                                <p>{`${profileState.Wallet?.Id.substring(0, 8)}...${profileState.Wallet?.Id.substring(profileState.Wallet?.Id.length - 6)}`}</p>
                                <button onClick={handleCopy}><i className='bx bx-copy'></i></button>
                            </div>

                            <div className='wallet-balance'>
                                <h2>Wallet balance</h2>
                                <p>
                                    ${profileState.Wallet?.Accounts.reduce((acc, account) => {
                                        const price = account.Currency.Ticker === 'USDT'
                                            ? 1
                                            : chartState.prices.find(p => p.symbol === `${account.Currency.Ticker}USDT`)?.price;

                                        if (price && !isNaN(account.Balance)) {
                                            return acc + (Number(account.Balance) * price);
                                        }
                                        return acc;
                                    }, 0).toFixed(2)}$
                                </p>
                            </div>

                            <div className='wallet-buttons'>
                                <div className='button'>
                                    <button><i className='bx bx-arrow-to-bottom'></i></button>
                                    <p>Receive</p>
                                </div>
                                <div className='button'>
                                    <button><i className='bx bx-right-top-arrow-circle'></i></button>
                                    <p>Send</p>
                                </div>
                                <div className='button'>
                                    <button><i className='bx bx-transfer-alt' ></i></button>
                                    <p>Trade</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="transactions">
                    <div className="header">
                        <h2>Transaction History</h2>
                        <i className="bx bx-dots-horizontal-rounded"></i>
                    </div>
                    <div className="tabs">
                        <button>Receive</button>
                        <button>Send</button>
                        <button>Assets</button>
                    </div>
                    <div className="transaction-list">
                        {profileState.Wallet?.Accounts.map((account, index) => (
                            <div key={index} className="transaction">
                                <div className="icon">
                                    <i className='bx bxl-airbnb' ></i>
                                </div>
                                <div className="details">
                                    <h4>{account.Currency.Ticker}</h4>
                                    <p>{account.Id}</p>
                                </div>
                                <div className="amount">
                                    <p>
                                        ${account.Currency.Ticker === 'USDT'
                                            ? (Number(account.Balance) || 0).toFixed(2)
                                            : isNaN(account.Balance * (chartState.prices[index]?.price || 0))
                                                ? 0
                                                : (account.Balance * (chartState.prices[index]?.price || 0)).toFixed(2)}$
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
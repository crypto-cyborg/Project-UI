import React from 'react';
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

const data = [
    { date: "Aug 21", value: 3.5 },
    { date: "Sep 21", value: 3.8 },
    { date: "Oct 21", value: 1.5 },
    { date: "Nov 21", value: 4.8 },
    { date: "Dec 21", value: 4.6 },
    { date: "Jan 22", value: 5.4 },
    { date: "Feb 22", value: 4.2 },
    { date: "Mar 22", value: 6.1 },
    { date: "Apr 22", value: 4.0 },
    { date: "May 22", value: 7.8 },
    { date: "Jun 22", value: 3.5 },
    { date: "Jul 22", value: 6.2 },
];

const Profile: React.FC = () => {
    const profileState = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch<AppDispatch>();
    const guid = 'ec0bf459-c826-4246-9ec7-3eb6b4cc6230';

    const handleCopy = () => {
        navigator.clipboard.writeText(guid).then(() => {
            alert('GUID скопирован в буфер обмена!');
        }).catch((error) => {
            console.error('Ошибка копирования:', error);
        });
    };

    return (
        <div className='profile'>
            <div className='column1'>
                <div className='profile-data'>

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
                        <ResponsiveContainer width="100%" height='100%'>
                            <AreaChart data={data}>
                                <CartesianGrid vertical={false} horizontal={true} stroke="#1D1E22" />
                                <XAxis dataKey="date" tick={{ fill: "#555457" }} axisLine={false} dy={15} />
                                <YAxis tick={{ fill: "#555457" }} tickFormatter={(value) => `${value}$`} axisLine={false} dx={-15} />
                                <Tooltip contentStyle={{ border: 'none', borderRadius: '10%', backgroundColor: "#1D1E22", color: "#1D1E22" }} formatter={(value) => [`${value}$`, ""]} separator={""} />

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
                                    dataKey="value"
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
                                <p>{`${guid.substring(0, 8)}...${guid.substring(guid.length - 6)}`}</p>
                                <button onClick={handleCopy}><i className='bx bx-copy'></i></button>
                            </div>

                            <div className='wallet-balance'>
                                <h2>Wallet balance</h2>
                                <p>$45.231</p>
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
                        <button>Sell</button>
                        <button>Buy</button>
                    </div>
                    <div className="transaction-list">
                        <div className="transaction">
                            <div className="icon">
                                <i className='bx bxl-airbnb' ></i>
                            </div>
                            <div className="details">
                                <h4>ETH</h4>
                                <p>2022-07-01 08:25:30</p>
                            </div>
                            <div className="amount">
                                <p>1.49</p>
                                <span className="status pending">Pending</span>
                            </div>
                        </div>
                        <div className="transaction">
                            <div className="icon">
                                <i className='bx bxl-airbnb' ></i>
                            </div>
                            <div className="details">
                                <h4>BNB</h4>
                                <p>2022-07-06 17:55:01</p>
                            </div>
                            <div className="amount">
                                <p>13.25</p>
                                <span className="status completed">Completed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
import { useSelector } from 'react-redux';
import './Analytics.scss';

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from 'recharts';
import { RootState } from '../../Store/Reducers/store';
import { useEffect, useState } from 'react';
import { useProfile } from '../../Store/Hooks/useProfileHooks';

interface Data {
    name: string;
    value: number;
}

const data: Data[] = [
    { name: 'Corporate Card', value: 2600 },
    { name: 'Debit Card', value: 6436 },
    { name: 'Cash', value: 5682 },
];

const items = [
    { text: 'Sell', color: '#6F4BC6' },
    { text: 'Buy', color: '#E6E0F1' },
    { text: 'Bot', color: '#A48CD9' },
];

const COLORS = ['#6F4BC6', '#E6E0F1', '#A48CD9'];

export default function Analytics() {
    const profileState = useSelector((state: RootState) => state.profile);
    const [searchTerm, setSearchTerm] = useState('');
    const { Initialize, GetUserPositions } = useProfile();
    const authState = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        Initialize(authState.User.Id);
        GetUserPositions(authState.User.Id);
    }, [authState.User]);

    return (
        <div className='analytics'>
            <div className='deal-data'>
                <div className='header'>
                    <h1>Over View</h1>
                    <div className='buttons'>
                        <div className='button'>
                            <button><i className='bx bx-calendar'></i></button>
                        </div>
                        <div className='button'>
                            <button><i className='bx bx-dots-horizontal-rounded'></i></button>
                        </div>
                    </div>
                </div>

                <div className='financial-overview'>
                    <div className="income-card">
                        <div className="income-header">
                            <span className="income-label">Income</span>
                            <span className="income-change">+4.4%</span>
                        </div>
                        <div className="income-amount">$56,242.00</div>
                    </div>
                    <div className="income-card">
                        <div className="income-header">
                            <span className="income-label">Loss</span>
                            <span className="loss-change">+4.4%</span>
                        </div>
                        <div className="income-amount">$56,242.00</div>
                    </div>

                    <div className="income-card">
                        <div className="income-header">
                            <span className="income-label">Total</span>
                            <span className="income-change">+4.4%</span>
                        </div>
                        <div className="income-amount">$56,242.00</div>
                    </div>
                </div>

                <div className='pie-chart'>
                    <h2>Scheduled Payments</h2>
                    <div className='chart-data'>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {items.map((item, index) => (
                                <li
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '8px',
                                        color: 'white'
                                    }}
                                >
                                    <span
                                        style={{
                                            width: '12px',
                                            height: '12px',
                                            backgroundColor: item.color,
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            marginRight: '8px',
                                        }}
                                    ></span>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                        <div className='chart'>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={60}
                                        outerRadius={115}
                                        fill="#8884d8"
                                        paddingAngle={0}
                                        stroke="none"
                                    >
                                        {data.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            <div className='deals'>
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Symbol</th>
                            <th>Currency</th>
                            <th>Amount</th>
                            <th>Entry Price</th>
                            <th>Stop Loss</th>
                            <th>Take Profit</th>
                            <th>Leverage</th>
                            <th>Open Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profileState.Positions.filter(position =>
                            !position.IsClosed &&
                            (searchTerm.trim() === "" || position.Symbol.toUpperCase().includes(searchTerm.toUpperCase()))
                        ).map((position, index) => (
                            <tr key={index}>
                                <td>{position.Id}</td>
                                <td>{position.Symbol}</td>
                                <td>{position.Currency.Name}</td>
                                <td className="amount">{position.Amount}</td>
                                <td className="entry-price">${position.EntryPrice}</td>
                                <td className="stop-loss">{position.StopLoss > 0 ? position.StopLoss : "-"}</td>
                                <td className="take-profit">{position.TakeProfit > 0 ? position.TakeProfit : "-"}</td>
                                <td className="leverage">{position.Leverage}</td>
                                <td>{new Date(position.OpenDate).toLocaleString()}</td>
                                <td className={position.IsClosed ? "status completed" : "status pending"}>
                                    {position.IsClosed ? "Closed" : "Open"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
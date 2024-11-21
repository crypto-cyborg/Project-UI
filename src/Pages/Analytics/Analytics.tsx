import './Analytics.scss';

export default function Analytics() {
    return (
        <div className='analytics'>
            <div className='column1'>
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
                </div>
                <div className='deals'>

                </div>
            </div>
            <div className='column2'>

            </div>
        </div>
    );
}
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/Reducers/store';
import useChartHook from '../../Store/Hooks/useChartHook';
import * as chartSlice from '../../Store/Reducers/chartSlice';
import { setIsDropdownOpen, setActiveTab, setCandleInterval, setIsBalanceDropdownOpen, setBalanceType } from '../../Store/Reducers/chartSlice';
import "./Chart.scss"
import "./Header.scss"
import "./Main.scss"
import "./Buy-Sell-Orders.scss"

const chartProps = {
  layout: {
    background: {
      color: '#18191D'
    },
    textColor: '#8A8A8B'
  },
  grid: {
    vertLines: {
      color: '#1E1F23',
    },
    horzLines: {
      color: '#1E1F23',
    },
  },
};

export default function Chart() {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartState = useSelector((state: RootState) => state.chart);
  const { Buy, SearchChange, PairClick } = useChartHook(chartContainerRef, chartProps);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='chart'>
      <div className='header'>
        <div className="container">
          <input
            type="search"
            name="search"
            value={chartState.searchQuery}
            onChange={SearchChange}
            placeholder="Search (e.g. BTCUSDT)"
            className="search"
          />
          {chartState.showDropdown && (
            <ul className="showDropdown">
              {chartState.filteredPairs.map((pair, index) => (
                <li
                  key={index}
                  onClick={() => PairClick(pair)}
                  className="element"
                >
                  {pair}
                </li>
              ))}
            </ul>
          )}
          <button className="search-icon">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
          <div className='panel'>
            <div className="relative-1">
              <div
                onClick={() => dispatch(setIsDropdownOpen(!chartState.isDropdownOpen))}
                className="dropdown-button"
              >
                <span>{chartState.candleInterval}</span>
                <svg
                  className={`interval ${chartState.isDropdownOpen ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path fill="currentColor" d="M7 10l3-3 3 3H7z" />
                </svg>
              </div>
              {chartState.isDropdownOpen && (
                <div className="dropdown">
                  <ul className="grid">
                    {["1m", "3m", "5m", "30m", "2h", "6h", "8h", "12h", "3d", "1w", "1M"].map(
                      (interval) => (
                        <li
                          key={interval}
                          className="element"
                          onClick={() => dispatch(setCandleInterval(interval))}
                        >
                          {interval}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative-2">
              <div
                onClick={() => dispatch(setIsBalanceDropdownOpen(!chartState.isBalanceDropdownOpen))}
                className="dropdown-button"
              >
                <span>{chartState.balanceType}</span>
                <svg
                  className={`balance-type ${chartState.isBalanceDropdownOpen ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path fill="currentColor" d="M7 10l3-3 3 3H7z" />
                </svg>
              </div>
              {chartState.isBalanceDropdownOpen && (
                <div className="dropdown">
                  <ul className="padding">
                    {["Real", "Demo"].map((type) => (
                      <li
                        key={type}
                        className="element"
                        onClick={() => {
                          dispatch(setBalanceType(type));
                          dispatch(setIsBalanceDropdownOpen(false));
                        }}
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button
              onClick={() =>
                dispatch(
                  chartSlice.setChartType(
                    chartState.chartType === 'candlestick' ? 'area' : 'candlestick'
                  )
                )
              }
              className="chartType"
            >
              {chartState.chartType === 'candlestick' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 4v16m6-10v10m6-14v14"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3v18h18"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className='main-container'>
        <div
          ref={chartContainerRef}
          style={{
            width: '70vw',
            height: '80vh',
            margin: '5px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#1a1f2b',
            position: 'relative', 
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: '#131417',
              height: '7%', 
              width: '100%',
              position: 'absolute', 
              top: 0,
              left: 0,
              zIndex: 20,
              borderRadius: '10px 10px 0 0', 
              borderBottom: '1px solid #374151', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  
            }}
          >
              <div style={{color: 'white'}}>Chart</div>
          </div>
        </div>

        <div className='buy-sell'>
          <div className="buy-sell-container">
            <div className="tabs">
              {['Spot', 'Cross', 'Isolated', 'Grid'].map((tab) => (
                <button
                  key={tab}
                  className={`tab ${chartState.activeTab === tab ? 'active' : ''}`}
                  onClick={() => dispatch(setActiveTab(tab))}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="inputs-container">
              <label className="container-name">
                Price
              </label>
              <div className="input-container">
                <div className="input-wrapper">
                  <input
                    type="text"
                    readOnly
                    value={chartState.currentPrice}
                    className="price-input"
                  />
                  <div className="currency">
                    <span>USD</span>
                  </div>
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="input"
                  />
                  <label className="input-placeholder">
                    Amount
                  </label>
                </div>
              </div>
            </div>
            <div className="inputs-container">
              <label className="container-name">
                Take Profit
              </label>
              <div className="input-container">
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="input"
                  />
                  <label className="input-placeholder">
                    Limit
                  </label>
                </div>
                <div className="input-wrapper">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className="input"
                      style={{ paddingRight: '2rem' }}
                    />
                    <label className="input-placeholder">
                      Offset
                    </label>
                  </div>
                  <div className="percent">
                    <span style={{ color: "#cbd5e1" }}>%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="inputs-container">
              <label className="container-name">
                Stop Loss
              </label>
              <div className="input-container">
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="input"
                  />
                  <label className="input-placeholder">
                    Trigger
                  </label>
                </div>
                <div className="input-wrapper">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className="input"
                      style={{ paddingRight: '2rem' }}
                    />
                    <label className="input-placeholder">
                      Offset
                    </label>
                  </div>
                  <div className="percent">
                    <span style={{ color: "#cbd5e1" }}>%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="inputs-container">
              <div className="input-container">
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="input"
                  />
                  <label className="input-placeholder">
                    Limit
                  </label>
                </div>
              </div>
            </div>
            <div className="buttons-container">
              <button
                onClick={() => Buy('BUY')}
                className="buy-button">
                Buy
              </button>
              <button
                onClick={() => Buy('SELL')}
                className="sell-button">
                Sell
              </button>
            </div>
          </div>
          <div className="chart-price">
            <div className="symbol">
              {chartState.symbol}
            </div>
            <div className="price-container">
              <span
                className={`price ${chartState.currentPriceChange >= 0 ? 'positive' : 'negative'}`}
              >
                {chartState.currentPrice}
              </span>
              <span
                className={`price-change ${chartState.currentPriceChange >= 0 ? 'positive' : 'negative'}`}
              >
                {chartState.currentPriceChange >= 0 ? `+${chartState.currentPriceChange}%` : `${chartState.currentPriceChange}%`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='buy-sell-orders'>
        <div className="order-card">
          <div className="order-section">
            <h3 className="buy-title">Buy Orders</h3>
            <div className="order-header">
              <span>Price</span>
              <span>Amount</span>
              <span>Total</span>
            </div>
            <ul>
              {chartState.buyOrders.map((order, index) => {
                const price = parseFloat(order[0]);
                const quantity = parseFloat(order[1]);
                const total = (price * quantity).toFixed(2);

                return (
                  <li key={index}>
                    <span>{price.toFixed(5)}</span>
                    <span>{quantity.toFixed(5)}</span>
                    <span>{total}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="order-section">
            <h3 className="sell-title">Sell Orders</h3>
            <div className="order-header">
              <span>Price</span>
              <span>Amount</span>
              <span>Total</span>
            </div>
            <ul className='sell-section'>
              {chartState.sellOrders.map((order, index) => {
                const price = parseFloat(order[0]);
                const quantity = parseFloat(order[1]);
                const total = (price * quantity).toFixed(2);

                return (
                  <li key={index}>
                    <span>{price.toFixed(5)}</span>
                    <span className="sell-amount">{quantity.toFixed(5)}</span>
                    <span className="sell-total">{total}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
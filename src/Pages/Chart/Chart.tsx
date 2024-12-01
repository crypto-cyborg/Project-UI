import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/Reducers/store';
import useChartHook from '../../Store/Hooks/useChartHook';
import * as chartSlice from '../../Store/Reducers/chartSlice';
import './Chart.scss'
import './Header.scss'
import './Main.scss'
import './Orders.scss'
import { useProfile } from '../../Store/Hooks/useProfileHooks';

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
  const profileState = useSelector((state: RootState) => state.profile);
  const { Buy, Sell, OpenPosition, SearchChange, PairClick } = useChartHook(chartContainerRef, chartProps);
  const { Initialize, GetUserPositions } = useProfile();
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (chartState.balanceType === 'Demo' && profileState.Wallet === null) {
      Initialize(authState.User.Id);
      GetUserPositions(authState.User.Id);
    }
  }, [chartState.balanceType]);

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
                  onClick={() => PairClick(pair.symbol)}
                  className="element"
                >
                  {pair.symbol}
                </li>
              ))}
            </ul>
          )}
          <div className='panel'>
            <div className="relative-1">
              <div
                onClick={() => dispatch(chartSlice.setIsDropdownOpen(!chartState.isDropdownOpen))}
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
                          onClick={() => dispatch(chartSlice.setCandleInterval(interval))}
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
                onClick={() => dispatch(chartSlice.setIsBalanceDropdownOpen(!chartState.isBalanceDropdownOpen))}
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
                          dispatch(chartSlice.setBalanceType(type));
                          dispatch(chartSlice.setIsBalanceDropdownOpen(false));
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
            <div style={{ color: 'white' }}>Chart</div>
          </div>
        </div>

        <div className='buy-sell'>
          <div className="buy-sell-container">
            <div className="tabs">
              {['Spot', 'Margin', 'Bot'].map((tab) => (
                <button
                  key={tab}
                  className={`tab ${chartState.activeTab === tab ? 'active' : ''}`}
                  onClick={() => dispatch(chartSlice.setActiveTab(tab))}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* <div className="secondary-tabs">
              {['Limit', 'Market',].map((tab) => (
                <button
                  key={tab}
                  className={`tab ${chartState.activeSecondaryTab === tab ? 'active' : ''}`}
                  onClick={() => dispatch(chartSlice.setActiveSecondaryTab(tab))}
                >
                  {tab}
                </button>
              ))}
            </div> */}
            <div className="inputs-container">
              <label className="container-name">
                Price
              </label>
              <div className="input-container">
                <div className="input-wrapper">
                  <input
                    type="number"
                    readOnly
                    value={chartState.activeSecondaryTab === 'Limit' ? chartState.tradingState.Price : chartState.currentPrice}
                    className="price-input"
                  />
                  <div className="currency">
                    <span>USD</span>
                  </div>
                </div>
                <div className="input-wrapper">
                  <input
                    type="number"
                    className="input"
                    value={chartState.tradingState.Quantity}
                    onChange={e => dispatch(chartSlice.setTradingStateQuantity(parseFloat(e.target.value)))}
                  />
                  <label className="input-placeholder">
                    Amount
                  </label>
                </div>
              </div>
            </div>
            <div className="inputs-container">
              <div className="input-container">
                <div className="input-wrapper">
                  <input
                    type="number"
                    className="input"
                    value={chartState.tradingState.Total}
                    onChange={(e) => dispatch(chartSlice.setTradingStateTotal(parseFloat(e.target.value)))}
                  />
                  <label className="input-placeholder">
                    Total
                  </label>
                </div>
              </div>
            </div>
            {chartState.activeTab == 'Margin' &&
              <div className="inputs-container">
                <label className="container-name">
                  Take Profit / Stop Loss
                </label>
                <div className="input-container">
                  <div className="input-wrapper">
                    <input
                      type="number"
                      className="input"
                      value={chartState.tradingState.TakeProfit}
                      onChange={e => dispatch(chartSlice.setTradingStateTakeProfit(parseFloat(e.target.value)))}
                    />
                    <label className="input-placeholder">
                      Limit
                    </label>
                  </div>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      className="input"
                      value={chartState.tradingState.StopLoss}
                      onChange={e => dispatch(chartSlice.setTradingStateStopLoss(parseFloat(e.target.value)))}
                    />
                    <label className="input-placeholder">
                      Limit
                    </label>
                  </div>
                </div>
              </div>
            }
            {chartState.activeTab != 'Spot' &&
              <div className="inputs-container">
                <div className="input-container">
                  <div className="input-wrapper">
                    <input
                      type="number"
                      className="input"
                      value={chartState.tradingState.Leverage}
                      onChange={(e) => dispatch(chartSlice.setTradingStateLeverage(parseFloat(e.target.value)))}
                    />
                    <label className="input-placeholder">
                      Leverage
                    </label>
                  </div>
                </div>
              </div>
            }
            <div className="buttons-container">
              <button
                onClick={() =>
                  chartState.activeTab === "Margin"
                    ? OpenPosition({
                      UserId: authState.User.Id,
                      Ticker: chartState.symbol.QuoteAsset,
                      Amount: chartState.tradingState.Quantity,
                      Symbol: chartState.symbol.Symbol,
                      IsLong: true,
                      StopLoss: chartState.tradingState.StopLoss,
                      TakeProfit: chartState.tradingState.TakeProfit,
                      Leverage: chartState.tradingState.Leverage,
                    })
                    : Buy({
                      UserId: authState.User.Id,
                      BaseAsset: chartState.symbol.BaseAsset,
                      QuoteAsset: chartState.symbol.QuoteAsset,
                      Symbol: chartState.symbol.Symbol,
                      Price: 10,
                      Quantity: chartState.tradingState.Quantity,
                    })
                }
                className="buy-button">
                {chartState.activeTab === "Bot" ? "Start" : "Buy"}
              </button>
              <button
                onClick={() =>
                  chartState.activeTab === "Margin"
                    ? OpenPosition({
                      UserId: authState.User.Id,
                      Ticker: chartState.symbol.QuoteAsset,
                      Amount: chartState.tradingState.Quantity,
                      Symbol: chartState.symbol.Symbol,
                      IsLong: true,
                      StopLoss: chartState.tradingState.StopLoss,
                      TakeProfit: chartState.tradingState.TakeProfit,
                      Leverage: chartState.tradingState.Leverage,
                    })
                    : Sell({
                      UserId: authState.User.Id,
                      BaseAsset: chartState.symbol.BaseAsset,
                      QuoteAsset: chartState.symbol.QuoteAsset,
                      Symbol: chartState.symbol.Symbol,
                      Price: 10,
                      Quantity: chartState.tradingState.Quantity,
                    })}
                className="sell-button">
                {chartState.activeTab === "Bot" ? "Stop" : "Sell"}
              </button>
            </div>
          </div>
          <div className="chart-price">
            <div className="symbol">
              {chartState.symbol.Symbol}
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
      <div className='orders'>
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
                <ul>
                  {chartState.buyOrders.map((order, index) => {
                    const price = order.price;
                    const quantity = order.quantity;
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
                  const price = order.price;
                  const quantity = order.quantity;
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
        <div className="my-orders">
          <div className="header">
            <h1>Orders</h1>
            <div className="header-right">
              <input
                type="search"
                name="search"
                placeholder="Search (e.g. Elnur_0)"
                className="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="transaction-list">
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
                    <td>{position.Amount}</td>
                    <td>${position.EntryPrice}</td>
                    <td>{position.StopLoss > 0 ? position.StopLoss : "-"}</td>
                    <td>{position.TakeProfit > 0 ? position.TakeProfit : "-"}</td>
                    <td>{position.Leverage}</td>
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
      </div>
    </div>
  );
}
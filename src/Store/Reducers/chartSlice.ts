import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Candle, Marker } from '../../Data/DTOs/Chart.dto';
import { OpenPositionAction, SpotBuyAction, SpotSellAction } from '../Actions/chartAction';

interface Order {
  price: number;
  quantity: number;
}

interface Pair {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
}

interface TradingState {
  Price: number;
  Quantity: number;
  Total: number;
  StopLoss: number;
  TakeProfit: number;
  Leverage: number;
}

interface Symbol {
  Symbol: string;
  BaseAsset: string;
  QuoteAsset: string;
}

interface Price {
  symbol: string;
  price: number;
}

interface ChartState {
  tradingState: TradingState;
  candles: Candle[];
  markers: Marker[];
  chartType: 'candlestick' | 'area';
  searchQuery: string;
  symbol: Symbol;
  pairs: Pair[];
  filteredPairs: Pair[];
  showDropdown: boolean;
  currentPrice: number;
  previousPrice: number;
  candleInterval: string;
  isDropdownOpen: boolean;
  activeTab: string;
  activeSecondaryTab: string;
  currentPriceChange: number;
  buyOrders: Order[];
  sellOrders: Order[];
  balance: number;
  prices: Price[];
  isBalanceDropdownOpen: boolean;
  balanceType: string;
}

const initialState: ChartState = {
  tradingState: {
    Price: 0,
    Quantity: 0,
    Total: 0,
    StopLoss: 0,
    TakeProfit: 0,
    Leverage: 0,
  },
  candles: [],
  markers: [],
  chartType: 'candlestick',
  searchQuery: 'BTCUSDT',
  symbol: {
    Symbol: 'BTCUSDT',
    BaseAsset: 'BTC',
    QuoteAsset: 'USDT'
  },
  pairs: [],
  filteredPairs: [],
  showDropdown: false,
  currentPrice: 0,
  previousPrice: 0,
  candleInterval: '1m',
  isDropdownOpen: false,
  activeTab: 'Spot',
  activeSecondaryTab: 'Limit',
  currentPriceChange: 0,
  buyOrders: [],
  sellOrders: [],
  balance: 100,
  prices: [],
  isBalanceDropdownOpen: false,
  balanceType: 'Real',
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setTradingStatePrice(state, action: PayloadAction<number>) {
      state.tradingState.Price = action.payload;
    },
    setTradingStateQuantity(state, action: PayloadAction<number>) {
      if (!Number.isNaN(action.payload) && action.payload >= 0) {
        state.tradingState.Quantity = action.payload;
        state.tradingState.Total = parseFloat((state.tradingState.Price * state.tradingState.Quantity).toFixed(5));
      }
      else {
        if (state.tradingState.Quantity < 10) {
          state.tradingState.Quantity = 0;
          state.tradingState.Total = 0;
        }
      }
    },
    setTradingStateStopLoss(state, action: PayloadAction<number>) {
      if (!Number.isNaN(action.payload) && action.payload >= 0) {
        state.tradingState.StopLoss = action.payload;
      }
      else {
        if (state.tradingState.StopLoss < 10) {
          state.tradingState.StopLoss = 0;
        }
      }
    },
    setTradingStateTakeProfit(state, action: PayloadAction<number>) {
      if (!Number.isNaN(action.payload) && action.payload >= 0) {
        state.tradingState.TakeProfit = action.payload;
      }
      else {
        if (state.tradingState.TakeProfit < 10) {
          state.tradingState.TakeProfit = 0;
        }
      }
    },
    setTradingStateLeverage(state, action: PayloadAction<number>) {
      if (!Number.isNaN(action.payload) && action.payload >= 0) {
        state.tradingState.Leverage = action.payload;
      }
      else {
        if (state.tradingState.Leverage < 10) {
          state.tradingState.Leverage = 0;
        }
      }
    },
    setTradingStateTotal(state, action: PayloadAction<number>) {
      if (!Number.isNaN(action.payload) && action.payload >= 0) {
        state.tradingState.Total = action.payload;

        if (state.activeSecondaryTab == 'Limit') {
          state.tradingState.Quantity = parseFloat((state.tradingState.Total / state.tradingState.Price).toFixed(5));
        } else {
          state.tradingState.Quantity = parseFloat((state.tradingState.Total / state.currentPrice).toFixed(5));
        }
      }
      else {
        if (state.tradingState.Total < 10) {
          state.tradingState.Quantity = 0;
          state.tradingState.Total = 0;
        }
      }
    },
    setCandles(state, action: PayloadAction<Candle[]>) {
      state.candles = action.payload;
    },
    setMarkers(state, action: PayloadAction<Marker[]>) {
      state.markers = action.payload;
    },
    setChartType(state, action: PayloadAction<'candlestick' | 'area'>) {
      state.chartType = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSymbol(state, action: PayloadAction<string>) {
      const symbol = action.payload;
      const foundPair = state.pairs.find((pair) => pair.symbol === symbol);

      if (foundPair) {
        state.symbol = {
          Symbol: foundPair.symbol,
          BaseAsset: foundPair.baseAsset,
          QuoteAsset: foundPair.quoteAsset,
        };
      }
    },
    setPairs(state, action: PayloadAction<Pair[]>) {
      state.pairs = action.payload;
    },
    setFilteredPairs(state, action: PayloadAction<Pair[]>) {
      state.filteredPairs = action.payload;
    },
    setShowDropdown(state, action: PayloadAction<boolean>) {
      state.showDropdown = action.payload;
    },
    setBuyOrders(state, action: PayloadAction<Order[]>) {
      state.buyOrders = action.payload;
    },
    setSellOrders(state, action: PayloadAction<Order[]>) {
      state.sellOrders = action.payload;
    },
    setCurrentPrice(state, action: PayloadAction<number>) {
      state.previousPrice = state.currentPrice;
      state.currentPrice = action.payload;
      state.currentPriceChange =
        state.previousPrice > 0
          ? Math.round(((state.currentPrice - state.previousPrice) / state.previousPrice) * 100 * 1000) / 1000
          : 0;
    },
    setIsDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isDropdownOpen = action.payload;
    },
    setCandleInterval(state, action: PayloadAction<string>) {
      state.candleInterval = action.payload;
      state.isDropdownOpen = false;
    },
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
    setActiveSecondaryTab(state, action: PayloadAction<string>) {
      state.activeSecondaryTab = action.payload;
    },
    setIsBalanceDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isBalanceDropdownOpen = action.payload;
    },
    setBalanceType(state, action: PayloadAction<string>) {
      state.balanceType = action.payload;
    },
    setPrice(state, action: PayloadAction<Price>) {
      const { symbol, price } = action.payload;
    
      const updatedPrices = state.prices.map((item) =>
        item.symbol === symbol ? { ...item, price } : item
      );
    
      const priceExists = state.prices.some((item) => item.symbol === symbol);
      if (!priceExists) {
        updatedPrices.push({ symbol, price });
      }
    
      state.prices = updatedPrices;
    },    
  },
  extraReducers: (builder) => {
    builder
      .addCase(SpotBuyAction.pending, () => {
      })
      .addCase(SpotBuyAction.fulfilled, () => {
      })
      .addCase(SpotBuyAction.rejected, () => {
      })
      .addCase(SpotSellAction.pending, () => {
      })
      .addCase(SpotSellAction.fulfilled, () => {
      })
      .addCase(SpotSellAction.rejected, () => {
      })
      .addCase(OpenPositionAction.pending, () => {
      })
      .addCase(OpenPositionAction.fulfilled, () => {
      })
      .addCase(OpenPositionAction.rejected, () => {
      })
  }
});

export const {
  setTradingStatePrice,
  setTradingStateQuantity,
  setTradingStateTotal,
  setTradingStateLeverage,
  setTradingStateStopLoss,
  setTradingStateTakeProfit,
  setCandles,
  setMarkers,
  setChartType,
  setSearchQuery,
  setSymbol,
  setPairs,
  setFilteredPairs,
  setShowDropdown,
  setCurrentPrice,
  setCandleInterval,
  setIsDropdownOpen,
  setActiveTab,
  setActiveSecondaryTab,
  setBuyOrders,
  setSellOrders,
  setIsBalanceDropdownOpen,
  setBalanceType,
  setPrice,
} = chartSlice.actions;

export default chartSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Candle, Marker } from '../../Data/DTOs/Chart.dto';

interface ChartState {
  candles: Candle[];
  markers: Marker[];
  chartType: `candlestick` | `area`;
  searchQuery: string;
  symbol: string;
  pairs: string[];
  filteredPairs: string[];
  showDropdown: boolean;
  currentPrice: number;
  previousPrice: number;
  candleInterval: string;
  isDropdownOpen: boolean;
  activeTab: string;
  currentPriceChange: number;
  buyOrders: [],
  sellOrders: [],
  balance: number,
  isBalanceDropdownOpen: boolean,
  balanceType: string,
}

const initialState: ChartState = {
  candles: [],
  markers: [],
  chartType: `candlestick`,
  searchQuery: `BTCUSDT`,
  symbol: `BTCUSDT`,
  pairs: [],
  filteredPairs: [],
  showDropdown: false,
  currentPrice: 0,
  previousPrice: 0,
  candleInterval: `1m`,
  isDropdownOpen: false,
  activeTab: `Spot`,
  currentPriceChange: 0,
  buyOrders: [],
  sellOrders: [],
  balance: 100,
  isBalanceDropdownOpen: false,
  balanceType: `Real`,
};

const chartSlice = createSlice({
  name: `chart`,
  initialState,
  reducers: {
    setCandles(state, action: PayloadAction<Candle[]>) {
      state.candles = action.payload;
    },
    setMarkers(state, action: PayloadAction<Marker[]>) {
      state.markers = action.payload;
    },
    setChartType(state, action: PayloadAction<any>) {
      state.chartType = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSymbol(state, action: PayloadAction<string>) {
      state.symbol = action.payload;
    },
    setPairs(state, action: PayloadAction<string[]>) {
      state.pairs = action.payload;
    },
    setFilteredPairs(state, action: PayloadAction<string[]>) {
      state.filteredPairs = action.payload;
    },
    setShowDropdown(state, action: PayloadAction<boolean>) {
      state.showDropdown = action.payload;
    },
    setBuyOrders: (state, action) => {
      state.buyOrders = action.payload;
    },
    setSellOrders: (state, action) => {
      state.sellOrders = action.payload;
    },
    setCurrentPrice(state, action: PayloadAction<number>) {
      state.previousPrice = state.currentPrice;
      state.currentPrice = action.payload;
      state.currentPriceChange = state.previousPrice > 0
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
    setIsBalanceDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isBalanceDropdownOpen = action.payload;
    },
    setBalanceType(state, action: PayloadAction<string>) {
      state.balanceType = action.payload;
    },
  }
});

export const {
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
  setBuyOrders,
  setSellOrders,
  setIsBalanceDropdownOpen,
  setBalanceType
} = chartSlice.actions;

export default chartSlice.reducer;
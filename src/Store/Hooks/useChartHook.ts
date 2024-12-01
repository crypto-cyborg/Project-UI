import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Reducers/store';
import * as chartSlice from '../Reducers/chartSlice';
import { Candle, Marker } from '../../Data/DTOs/Chart.dto';
import * as LightweightCharts from 'lightweight-charts';
import { SpotBuyAction, SpotSellAction, OpenPositionAction } from '../Actions/chartAction';
import { Margin, Spot } from '../../Data/DTOs/Trading.dto';
import { toast } from 'react-toastify';

const useChartHook = (chartContainerRef: React.RefObject<HTMLDivElement>, chartProps: any) => {
  const chartState = useSelector((state: RootState) => state.chart);
  const dispatch = useDispatch<AppDispatch>();

  const [candleSeries, setCandleSeries] = useState<any | null>(null);
  const [areaSeries, setAreaSeries] = useState<any | null>(null);

  useEffect(() => {
    if (!candleSeries || !areaSeries) return;
    
    const websocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${chartState.symbol.Symbol.toLowerCase()}@depth20@1000ms`
    );

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const buyOrders = data.bids.slice(0, 50).map(([price, quantity]: [string, string]) => ({
        price: parseFloat(price),
        quantity: parseFloat(quantity),
      }));

      const sellOrders = data.asks.slice(0, 50).map(([price, quantity]: [string, string]) => ({
        price: parseFloat(price),
        quantity: parseFloat(quantity),
      }));

      dispatch(chartSlice.setBuyOrders(buyOrders));
      dispatch(chartSlice.setSellOrders(sellOrders));
    };

    return () => {
      websocket.close();
    };
  }, [chartState.symbol.Symbol, candleSeries, areaSeries, dispatch]);

  useEffect(() => {
    const fetchPairs = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
        const data = await response.json();

        const pairs = data.symbols.map((symbol: any) => ({
          symbol: symbol.symbol,
          baseAsset: symbol.baseAsset,
          quoteAsset: symbol.quoteAsset,
        }));

        dispatch(chartSlice.setPairs(pairs));
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchPairs();
  }, [dispatch]);
  
  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = LightweightCharts.createChart(chartContainerRef.current, {
        ...chartProps,
        width: chartContainerRef.current.clientWidth,
      });

      const candleSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderUpColor: '#26a69a',
        borderDownColor: '#ef5350',
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });
      setCandleSeries(candleSeries);

      const areaSeriesLocal = chart.addAreaSeries({
        topColor: 'rgba(38, 166, 154, 0.56)',
        bottomColor: 'rgba(38, 166, 154, 0.04)',
        lineColor: 'rgba(38, 166, 154, 1)',
        lineWidth: 2,
      });
      setAreaSeries(areaSeriesLocal);

      const fetchCandles = async () => {
        try {
          const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${chartState.symbol.Symbol}&interval=${chartState.candleInterval}&limit=1000`
          );
          const data = await response.json();    

          const initialCandles: Candle[] = data.map((d: any) => ({
            time: d[0] / 1000 as LightweightCharts.Time,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
          }));

          dispatch(chartSlice.setCandles(initialCandles));
          if (chartState.chartType === 'candlestick') {
            candleSeries.setData(initialCandles);
          } else {
            areaSeriesLocal.setData(
              initialCandles.map((candle) => ({ time: candle.time, value: candle.close }))
            );
          }

        } catch (error) {
          console.error('Error fetching candle data:', error);
        }
      };

      fetchCandles();

      return () => {
        chart.remove();
      };
    }
  }, [chartState.chartType, chartState.symbol.Symbol, chartState.candleInterval, dispatch, chartContainerRef, chartProps]);

  useEffect(() => {
    if (!candleSeries || !areaSeries || chartState.candles.length === 0) return;

    const websocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${chartState.symbol.Symbol.toLowerCase()}@kline_${chartState.candleInterval}`
    );

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const candleData = data.k;

      const newCandle: Candle = {
        time: candleData.t / 1000 as LightweightCharts.Time,
        open: parseFloat(candleData.o),
        high: parseFloat(candleData.h),
        low: parseFloat(candleData.l),
        close: parseFloat(candleData.c),
      };

      dispatch(chartSlice.setCurrentPrice(newCandle.close));

      if (chartState.tradingState.Price == 0 && chartState.activeSecondaryTab == 'Limit') {
        dispatch(chartSlice.setTradingStatePrice(newCandle.close))
      }  

      const updatedCandles = UpdateCandles(candleSeries, areaSeries, chartState.candles, newCandle);
      dispatch(chartSlice.setCandles(updatedCandles));
    };

    return () => {
      websocket.close();
    };
  }, [candleSeries, areaSeries, chartState.candles, chartState.chartType, chartState.symbol.Symbol, dispatch]);

  // const Buy = useCallback((button: string) => {
  //   if (chartState.candles.length === 0) return;

  //   const lastCandle = chartState.candles[chartState.candles.length - 1];

  //   const existingBuyMarker = chartState.markers.find(marker => marker.time === lastCandle.time && marker.shape === 'arrowUp');
  //   const existingSellMarker = chartState.markers.find(marker => marker.time === lastCandle.time && marker.shape === 'arrowDown');

  //   if ((button === 'BUY' && existingBuyMarker) || (button === 'SELL' && existingSellMarker)) {
  //     return;
  //   }

  //   let newMarker: Marker;

  //   if (button === 'SELL') {
  //     newMarker = {
  //       time: lastCandle.time,
  //       position: 'aboveBar',
  //       color: '#ef5350',
  //       shape: 'arrowDown',
  //       text: '',
  //     };
  //   } else {
  //     newMarker = {
  //       time: lastCandle.time,
  //       position: 'belowBar',
  //       color: '#26a69a',
  //       shape: 'arrowUp',
  //       text: '',
  //     };
  //   }

  //   const updatedMarkers = [...chartState.markers, newMarker];
  //   dispatch(chartSlice.setMarkers(updatedMarkers));

  //   candleSeries?.setMarkers(updatedMarkers);
  // }, [chartState.candles, chartState.markers, dispatch]);

  const Buy = async (buyData: Spot) => {
    if (buyData.Quantity <= 0) {
      toast.error("The amount cannot be less than or equal to zero.", {
        position: "bottom-right",
      });
    } else {
      await dispatch(SpotBuyAction(buyData));
    }
  };

  const Sell = async (sellData: Spot) => {
    if (sellData.Quantity <= 0) {
      toast.error("The amount cannot be less than or equal to zero.", {
        position: "bottom-right",
      });
    } else {
      await dispatch(SpotSellAction(sellData));
    }
  };
  
  const OpenPosition = async (positionData: Margin) => {
    if (positionData.Amount <= 0) {
      toast.error("The amount cannot be less than or equal to zero.", {
        position: "bottom-right",
      });
    } else {
      await dispatch(OpenPositionAction(positionData));
    }
  };

  const UpdateCandles = useCallback(
    (candleSeries: any, areaSeries: any, prevCandles: Candle[], newCandle: Candle): Candle[] => {
      if (prevCandles.length === 0) return [newCandle];

      const lastCandle = prevCandles[prevCandles.length - 1];

      if (Number(newCandle.time) === Number(lastCandle.time)) {
        const updatedCandles = [...prevCandles.slice(0, -1), newCandle];
        if (chartState.chartType === 'candlestick') {
          candleSeries?.update(newCandle);
        } else {
          areaSeries?.update({ time: newCandle.time, value: newCandle.close });
        }
        return updatedCandles;
      } else {
        if (chartState.chartType === 'candlestick') {
          candleSeries?.update(newCandle);
        } else {
          areaSeries?.update({ time: newCandle.time, value: newCandle.close });
        }
        return [...prevCandles, newCandle];
      }
    },
    [chartState.chartType]
  );

  const SearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toUpperCase();
    dispatch(chartSlice.setSearchQuery(query));

    if (query.length > 0) {
      const filtered = chartState.pairs.filter(pair => pair.symbol.includes(query));
      dispatch(chartSlice.setFilteredPairs(filtered));
      dispatch(chartSlice.setShowDropdown(true));
    } else {
      dispatch(chartSlice.setShowDropdown(false));
    }
  };

  const PairClick = (pair: string) => {
    dispatch(chartSlice.setSymbol(pair));
    dispatch(chartSlice.setTradingStatePrice(0));
    dispatch(chartSlice.setTradingStateTotal(0));
    dispatch(chartSlice.setTradingStateQuantity(0));
    dispatch(chartSlice.setSearchQuery(pair));
    dispatch(chartSlice.setShowDropdown(false));
  };

  return { Buy, Sell, OpenPosition, SearchChange, PairClick };
};

export default useChartHook;
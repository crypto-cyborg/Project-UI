import { useDispatch, useSelector } from 'react-redux';
import './App.scss'
import Sidebar from './Components/Sidebar/Sidebar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch, RootState } from './Store/Reducers/store';
import { useAuth } from './Store/Hooks/useAuthHook';
import { useEffect } from 'react';
import * as chartSlice from './Store/Reducers/chartSlice';

function App() {
  const authState = useSelector((state: RootState) => state.auth);
  const { GetUserAccountInfoAction } = useAuth();
  const profileState = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (authState.isLoggedIn) {
      GetUserAccountInfoAction();
    }
  }, []);

  useEffect(() => {
    const fetchPricesViaWebSocket = async () => {
      try {
        const symbols = profileState.Wallet?.Accounts
        .filter((account) => account.Currency.Ticker !== 'USDT') 
        .map((account) => `${account.Currency.Ticker}USDT`); 

        const streams = symbols?.map(symbol => `${symbol.toLowerCase()}@ticker`).join('/');
        const socketUrl = `wss://stream.binance.com:9443/ws/${streams}`;

        const socket = new WebSocket(socketUrl);

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          dispatch(chartSlice.setPrice({
            symbol: data.s,
            price: data.c
          }));
        };
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchPricesViaWebSocket();
  }, [profileState.Wallet]);

  return (
    <>
      <Sidebar />
      <ToastContainer />
    </>
  )
}

export default App
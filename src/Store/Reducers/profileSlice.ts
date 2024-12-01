import { createSlice } from '@reduxjs/toolkit';
import { GetUserPositionsAction, InitializeAction } from '../Actions/profileAction';
import { Position, Wallet } from '../../Data/Models/Profile.model';

interface ProfileData {
    Wallet: Wallet | null;
    Positions: Position[];
    transactionPopUp: boolean;
}

const initialState: ProfileData = {
    Wallet: null,
    Positions: [],
    transactionPopUp: false,
};

const profileSlice = createSlice({
    name: `profile`,
    initialState,
    reducers: {
        setTransactionPopUp: (state, action) => {
            state.transactionPopUp = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(InitializeAction.pending, () => {
            })
            .addCase(InitializeAction.fulfilled, (state, action: any) => {
                var wallet = action.payload.wallet;

                state.Wallet = {
                    Id: wallet.id,
                    Accounts: wallet.accounts.map((account: any) => ({
                        Id: account.id,
                        Balance: account.balance.toString(),
                        Currency: {
                            Id: account.currency.id,
                            Name: account.currency.name,
                            Ticker: account.currency.ticker,
                        },
                        WalletId: account.walletId,
                    })),
                    Transactions: wallet.transactions.map((transaction: any) => ({
                        Id: transaction.id,
                        Currency: {
                            Id: transaction.currency.id,
                            Name: transaction.currency.name,
                            Ticker: transaction.currency.ticker,
                        },
                        Amount: transaction.amount,
                        Time: transaction.time,
                        ReceiverId: transaction.receiverId,
                        SenderId: transaction.senderId,
                        WalletId: transaction.walletId,
                        TradeType: transaction.tradeType,
                        TransactionType: transaction.transactionType
                    })),
                };
            })
            .addCase(InitializeAction.rejected, () => {
            })
            .addCase(GetUserPositionsAction.pending, () => {
            })
            .addCase(GetUserPositionsAction.fulfilled, (state, action: any) => {
                var positions = action.payload;

                state.Positions = positions.map((position: any) => ({
                    Id: position.id,
                    Amount: position.amount,
                    CloseDate: position.closeDate,
                    Currency: {
                        Id: position.currency.id,
                        Name: position.currency.name,
                        Ticker: position.currency.ticker,
                    },
                    EntryPrice: position.entryPrice,
                    IsClosed: position.isClosed,
                    IsLong: position.isLong,
                    Leverage: position.leverage,
                    OpenDate: position.openDate,
                    StopLoss: position.stopLoss,
                    Symbol: position.symbol,
                    TakeProfit: position.takeProfit,
                    UserId: position.userId
                }));
            })
            .addCase(GetUserPositionsAction.rejected, () => {
            })
    }
});

export const { } = profileSlice.actions;
export default profileSlice.reducer;
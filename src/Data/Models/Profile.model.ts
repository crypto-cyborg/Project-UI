export interface Wallet {
    Id: string;
    Accounts: Account[];
    Transactions: Transaction[];
}

interface Account {
    Id: string;
    Balance: number;
    Currency: Currency;
    WalletId: string;
}

interface Transaction {
    Id: string;
    Currency: Currency;
    Amount: number;
    Time: string;
    ReceiverId: string;
    SenderId: string;
    WalletId: string;
    TradeType: string;
    TransactionType: string;
}

export interface Position {
    Id: string;
    Amount: number;
    CloseDate: string | null;
    Currency: Currency;
    EntryPrice: number;
    IsClosed: boolean;
    IsLong: boolean;
    Leverage: number;
    OpenDate: string;
    StopLoss: number;
    Symbol: string;
    TakeProfit: number;
    UserId: string;
}

interface Currency {
    Id: number;
    Name: string;
    Ticker: string;
}
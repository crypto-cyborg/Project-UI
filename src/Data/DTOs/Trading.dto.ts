export interface Spot {
    UserId: string;
    BaseAsset: string;
    QuoteAsset: string;
    Symbol: string;
    Price: number;
    Quantity: number;
}

export interface Margin {
    UserId: string;
    Ticker: string;
    Amount: number;
    Symbol: string;
    IsLong: boolean;
    StopLoss: number;
    TakeProfit: number;
    Leverage: number;
}
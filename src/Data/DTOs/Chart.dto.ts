import * as LightweightCharts from 'lightweight-charts';

export interface Candle {
    time: LightweightCharts.Time;
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface Marker {
    time: LightweightCharts.Time;
    position: 'aboveBar' | 'belowBar';
    color: string;
    shape: 'circle' | 'square' | 'arrowUp' | 'arrowDown';
    text: string;
}
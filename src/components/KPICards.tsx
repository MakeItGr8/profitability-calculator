import React from 'react';
import { CalculatorResults, formatCurrency, formatPercent } from '../utils/calculator';
import { TrendingUp, DollarSign, Percent, Package } from 'lucide-react';

interface KPICardsProps {
    results: CalculatorResults;
}

export const KPICards: React.FC<KPICardsProps> = ({ results }) => {
    const isProfitable = results.netProfit > 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card
                title="Net Profit (EBIT)"
                value={formatCurrency(results.netProfit)}
                icon={<DollarSign className="w-5 h-5" />}
                trend={isProfitable ? 'positive' : 'negative'}
                subtext="Nach allen Kosten"
            />
            <Card
                title="Marge"
                value={formatPercent(results.marginPercent)}
                icon={<Percent className="w-5 h-5" />}
                trend={results.marginPercent > 10 ? 'positive' : results.marginPercent > 0 ? 'neutral' : 'negative'}
                subtext="Vom Nettoumsatz"
            />
            <Card
                title="ROAS"
                value={results.roas.toFixed(2)}
                icon={<TrendingUp className="w-5 h-5" />}
                trend={results.roas > results.breakEvenRoas ? 'positive' : 'negative'}
                subtext={`Break-Even: ${results.breakEvenRoas.toFixed(2)}`}
            />
            <Card
                title="Benötigte Bestellungen"
                value={Math.ceil(results.totalOrders).toLocaleString()}
                icon={<Package className="w-5 h-5" />}
                trend="neutral"
                subtext="Pakete zu versenden"
                highlight
            />
        </div>
    );
};

const Card = ({ title, value, icon, trend, subtext }: any) => {
    const trendColor = trend === 'positive' ? 'text-[#00FF94] bg-[#00FF94]/10 border-[#00FF94]/20'
        : trend === 'negative' ? 'text-[#FF0055] bg-[#FF0055]/10 border-[#FF0055]/20'
            : 'text-slate-400 bg-white/5 border-white/10';

    const borderColor = trend === 'positive' ? 'border-[#00FF94]/30 shadow-[0_0_15px_rgba(0,255,148,0.1)]'
        : trend === 'negative' ? 'border-[#FF0055]/30 shadow-[0_0_15px_rgba(255,0,85,0.1)]'
            : 'border-white/10';

    return (
        <div className={`p-5 rounded-xl border ${borderColor} bg-[#151621]/50 backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-lg`}>
            <div className="flex justify-between items-start mb-3">
                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</span>
                <div className={`p-2 rounded-lg border ${trendColor}`}>
                    {icon}
                </div>
            </div>
            <div className={`text-3xl font-bold font-display ${trend === 'negative' ? 'text-[#FF0055]' : 'text-white'}`}>
                {value}
            </div>
            {subtext && (
                <div className="mt-2 text-xs text-slate-500 font-mono">
                    {subtext}
                </div>
            )}
        </div>
    );
};

import React from 'react';
import { CalculatorResults, formatCurrency } from '../utils/calculator';

interface PnLTableProps {
    results: CalculatorResults;
}

export const PnLTable: React.FC<PnLTableProps> = ({ results }) => {
    return (
        <div className="bg-[#151621]/40 rounded-xl border border-white/5 overflow-hidden h-full backdrop-blur-sm">
            <div className="px-6 py-4 border-b border-white/5 bg-white/5">
                <h3 className="font-semibold text-white flex items-center gap-2">
                    Gewinn- und Verlustrechnung
                </h3>
            </div>
            <div className="p-6">
                <table className="w-full text-sm">
                    <tbody className="divide-y divide-white/5">
                        <Row label="Bruttoumsatz (Gross Sales)" value={results.grossSales} bold color="text-white" />
                        <Row label="Retouren" value={-results.returnAmount} color="text-[#FF0055]" />
                        <Row label="Umsatzsteuer (19%)" value={-results.tax} color="text-slate-500" />

                        <Row label="Nettoumsatz (Net Revenue)" value={results.netRevenue} bold className="bg-white/5" color="text-white" />

                        <Row label="Wareneinsatz (COGS)" value={-results.totalCogs} color="text-slate-400" subtext="Produktkosten" />
                        <Row label="Versandkosten (Fulfillment)" value={-results.totalShipping} color="text-[#FF0055]" subtext="Hinweg für alle Pakete" />
                        <Row label="Payment Fees" value={-results.paymentFees} color="text-slate-400" />

                        <Row label="Deckungsbeitrag 1 (CM1)" value={results.contributionMargin1} bold className="bg-[#00F0FF]/5" color="text-[#00F0FF]" />

                        <Row label="Marketing Ad Spend" value={-results.adSpend} color="text-slate-400" />
                        <Row label="Fixkosten / OpEx" value={-results.opex} color="text-slate-400" />

                        <Row
                            label="EBIT (Net Profit)"
                            value={results.ebit}
                            bold
                            className={results.ebit > 0 ? "bg-[#00FF94]/10" : "bg-[#FF0055]/10"}
                            color={results.ebit > 0 ? "text-[#00FF94]" : "text-[#FF0055]"}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Row = ({ label, value, bold, color, className, subtext }: any) => (
    <tr className={`transition-colors hover:bg-white/5 ${className}`}>
        <td className="py-3 pl-3">
            <div className={`flex flex-col ${bold ? 'font-semibold text-white' : 'text-slate-400'}`}>
                <span>{label}</span>
                {subtext && <span className="text-xs text-slate-600 font-normal">{subtext}</span>}
            </div>
        </td>
        <td className={`py-3 pr-3 text-right font-mono ${bold ? 'font-bold' : ''} ${color || 'text-slate-200'}`}>
            {formatCurrency(value)}
        </td>
    </tr>
);

import { useState, useMemo } from 'react';
import { CalculatorInputs, calculateMetrics } from './utils/calculator';
import { InputSection } from './components/InputSection';
import { KPICards } from './components/KPICards';
import { PnLTable } from './components/PnLTable';
import { BarChart3, Zap } from 'lucide-react';

function App() {
    const [inputs, setInputs] = useState<CalculatorInputs>({
        grossRevenue: 100000,
        discount: 0,
        returnRate: 15,
        adSpend: 20000,
        opex: 5000,
        baseAov: 100,
        cogsPercent: 30,
        shippingCostPerPackage: 4.50
    });

    const results = useMemo(() => calculateMetrics(inputs), [inputs]);

    const handleInputChange = (key: keyof CalculatorInputs, value: number) => {
        setInputs(prev => ({ ...prev, [key]: value }));
    };

    const applyScenario = (type: 'A' | 'B') => {
        if (type === 'A') {
            // High Volume / Sale
            setInputs(prev => ({
                ...prev,
                discount: 41,
                returnRate: 0, // As per prompt
                baseAov: 159,
                adSpend: 35000, // "Higher"
                shippingCostPerPackage: 4.50
            }));
        } else {
            // Conservative
            setInputs(prev => ({
                ...prev,
                discount: 25,
                returnRate: 9,
                baseAov: 86,
                adSpend: 15000, // "Lower"
                shippingCostPerPackage: 4.50
            }));
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white flex items-center gap-3 tracking-tight">
                            <div className="p-2 bg-gradient-to-br from-[#00F0FF] to-[#7000FF] rounded-xl text-white shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                Profitability Calculator
                            </span>
                        </h1>
                        <p className="text-slate-400 mt-2 text-lg">Simuliere Unit Economics und Rabatt-Strategien</p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => applyScenario('A')}
                            className="px-4 py-2 bg-[#151621] border border-white/10 rounded-lg text-sm font-medium text-slate-300 hover:text-[#7000FF] hover:border-[#7000FF]/50 hover:shadow-[0_0_20px_rgba(112,0,255,0.15)] transition-all flex items-center gap-2 backdrop-blur-sm"
                        >
                            <Zap className="w-4 h-4" />
                            Szenario A: Aggressiv
                        </button>
                        <button
                            onClick={() => applyScenario('B')}
                            className="px-4 py-2 bg-[#151621] border border-white/10 rounded-lg text-sm font-medium text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all flex items-center gap-2 backdrop-blur-sm"
                        >
                            <div className="w-4 h-4 rounded-full border-2 border-current" />
                            Szenario B: Konservativ
                        </button>
                    </div>
                </div>

                {/* KPIs */}
                <KPICards results={results} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Inputs */}
                    <div className="lg:col-span-7 space-y-6">
                        <InputSection inputs={inputs} onChange={handleInputChange} />

                        {/* Context Card */}
                        <div className="bg-gradient-to-br from-[#00F0FF]/10 to-[#7000FF]/10 border border-white/10 rounded-xl p-6 text-slate-200 backdrop-blur-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/20 blur-[50px] rounded-full -mr-16 -mt-16 pointer-events-none" />
                            <h3 className="font-semibold mb-2 flex items-center gap-2 text-[#00F0FF]">
                                <Zap className="w-4 h-4" /> Unit Economics Insight
                            </h3>
                            <p className="text-sm opacity-90 leading-relaxed relative z-10">
                                Bei <strong className="text-white">{inputs.discount}% Rabatt</strong> sinkt der effektive Warenkorb auf <strong className="text-white">{formatCurrency(results.effectiveAov)}</strong>.
                                Um <span className="text-white">{formatCurrency(inputs.grossRevenue)}</span> Umsatz zu erreichen, werden <strong className="text-white">{Math.ceil(results.totalOrders).toLocaleString()} Bestellungen</strong> benötigt.
                                Das verursacht <strong className="text-rose-400">{formatCurrency(results.totalShipping)}</strong> an Versandkosten.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: P&L */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-8">
                            <PnLTable results={results} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper for inline format in the insight card
const formatCurrency = (val: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val);

export default App;

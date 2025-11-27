import React from 'react';
import { CalculatorInputs } from '../utils/calculator';

interface InputSectionProps {
    inputs: CalculatorInputs;
    onChange: (key: keyof CalculatorInputs, value: number) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ inputs, onChange }) => {
    return (
        <div className="space-y-6 bg-[#151621]/40 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                ⚙️ Konfiguration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Haupt-Finanzen */}
                <div className="space-y-5">
                    <h3 className="text-xs font-bold text-[#00F0FF] uppercase tracking-[0.2em] mb-4">Haupt-Finanzen</h3>

                    <InputGroup
                        label="Geplanter Bruttoumsatz"
                        value={inputs.grossRevenue}
                        onChange={(v: number) => onChange('grossRevenue', v)}
                        unit="€"
                        step={1000}
                    />

                    <InputGroup
                        label="Marketing Ad Spend"
                        value={inputs.adSpend}
                        onChange={(v: number) => onChange('adSpend', v)}
                        unit="€"
                        step={100}
                    />

                    <InputGroup
                        label="Fixkosten / OpEx"
                        value={inputs.opex}
                        onChange={(v: number) => onChange('opex', v)}
                        unit="€"
                        step={100}
                    />
                </div>

                {/* Treiber */}
                <div className="space-y-5">
                    <h3 className="text-xs font-bold text-[#7000FF] uppercase tracking-[0.2em] mb-4">Unit Economics Treiber</h3>

                    <RangeGroup
                        label="Rabatt"
                        value={inputs.discount}
                        onChange={(v: number) => onChange('discount', v)}
                        min={0} max={80} unit="%"
                        color="text-[#FF0055]"
                    />

                    <RangeGroup
                        label="Retourenquote"
                        value={inputs.returnRate}
                        onChange={(v: number) => onChange('returnRate', v)}
                        min={0} max={50} unit="%"
                        color="text-slate-300"
                    />

                    <RangeGroup
                        label="Basis-Warenkorb (UVP)"
                        value={inputs.baseAov}
                        onChange={(v: number) => onChange('baseAov', v)}
                        min={20} max={300} unit="€"
                        color="text-[#00F0FF]"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup
                            label="Einkauf (COGS)"
                            value={inputs.cogsPercent}
                            onChange={(v: number) => onChange('cogsPercent', v)}
                            unit="% v. UVP"
                            step={1}
                        />
                        <InputGroup
                            label="Versand / Paket"
                            value={inputs.shippingCostPerPackage}
                            onChange={(v: number) => onChange('shippingCostPerPackage', v)}
                            unit="€"
                            step={0.1}
                        />
                    </div>
                </div>
            </div >
        </div >
    );
};

const InputGroup = ({ label, value, onChange, unit, step = 1 }: any) => (
    <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">{label}</label>
        <div className="relative rounded-lg shadow-sm group">
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                step={step}
                className="block w-full rounded-lg border-white/10 bg-[#0B0C15]/50 text-white pl-4 pr-12 py-2.5 focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] sm:text-sm transition-all"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <span className="text-slate-500 sm:text-sm">{unit}</span>
            </div>
        </div>
    </div>
);

const RangeGroup = ({ label, value, onChange, min, max, unit, color }: any) => (
    <div>
        <div className="flex justify-between mb-2">
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</label>
            <span className={`text-sm font-bold font-mono ${color || 'text-white'}`}>{value}{unit}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full accent-[#00F0FF]"
        />
    </div>
);

export interface CalculatorInputs {
    grossRevenue: number;
    discount: number;
    returnRate: number;
    adSpend: number;
    opex: number;
    baseAov: number;
    cogsPercent: number;
    shippingCostPerPackage: number;
}

export interface CalculatorResults {
    totalOrders: number;
    effectiveAov: number;
    grossSales: number;
    returnAmount: number;
    netSales: number;
    tax: number;
    netRevenue: number;
    totalCogs: number;
    totalShipping: number;
    paymentFees: number;
    contributionMargin1: number;
    adSpend: number;
    opex: number;
    ebit: number;
    netProfit: number;
    marginPercent: number;
    roas: number;
    breakEvenRoas: number;
}

export const calculateMetrics = (inputs: CalculatorInputs): CalculatorResults => {
    const {
        grossRevenue,
        discount,
        returnRate,
        adSpend,
        opex,
        baseAov,
        cogsPercent,
        shippingCostPerPackage,
    } = inputs;

    // 1. Calculate Effective AOV (Price after discount)
    const effectiveAov = baseAov * (1 - discount / 100);

    // 2. Calculate Total Orders needed to hit Gross Revenue target
    // Formula: Orders = Gross Revenue / Effective AOV
    // Avoid division by zero
    const totalOrders = effectiveAov > 0 ? grossRevenue / effectiveAov : 0;

    // 3. Calculate Returns
    const returnedOrders = totalOrders * (returnRate / 100);
    const returnAmount = returnedOrders * effectiveAov; // Revenue lost due to returns

    // 4. Net Sales (Gross - Returns)
    // Note: grossRevenue input is treated as the "Gross Sales" target before returns in this logic,
    // based on "Anzahl Bestellungen = Bruttoumsatz / ..."
    const grossSales = grossRevenue;
    const netSales = grossSales - returnAmount;

    // 5. Tax (VAT 19%)
    // Net Revenue (Netto) = Net Sales / 1.19
    // Tax = Net Sales - Net Revenue
    const netRevenue = netSales / 1.19;
    const tax = netSales - netRevenue;

    // 6. COGS
    // Based on ORIGINAL MSRP (Base AOV)
    const cogsPerOrder = baseAov * (cogsPercent / 100);
    const totalCogs = totalOrders * cogsPerOrder;

    // 7. Shipping
    // Outbound shipping for ALL orders (including those returned)
    const totalShipping = totalOrders * shippingCostPerPackage;

    // 8. Payment Fees
    // Assumption: 1.5% of Gross Sales + 0.25€ per transaction? 
    // Let's stick to a simple % for now as per plan, maybe 1.5% of Gross Transaction Value
    const paymentFees = grossSales * 0.015;

    // 9. Contribution Margin 1 (Deckungsbeitrag 1)
    // = Net Revenue - COGS - Shipping - Payment Fees
    const contributionMargin1 = netRevenue - totalCogs - totalShipping - paymentFees;

    // 10. EBIT / Net Profit
    // = CM1 - Ad Spend - OpEx
    const ebit = contributionMargin1 - adSpend - opex;
    const netProfit = ebit; // Assuming EBIT is the final "Net Profit" requested before taxes on income etc.

    // 11. KPIs
    const marginPercent = netRevenue > 0 ? (netProfit / netRevenue) * 100 : 0;
    const roas = adSpend > 0 ? netSales / adSpend : 0; // Usually ROAS is Revenue / Ad Spend. Net Sales is a safer bet than Gross.

    // Break Even ROAS
    // How much revenue do we need to cover costs?
    // This is complex to calc exactly in reverse without solving the equation, 
    // but typically BE ROAS = 1 / (Margin before Ad Spend)
    // Let's calculate CM1 Margin % (CM1 / Net Revenue)
    // Actually, standard BE ROAS formula: 1 / (Gross Margin %)
    // Gross Margin here = (Net Revenue - COGS - Shipping - Payment Fees) / Net Revenue
    // Let's use that.
    const cm1Margin = netRevenue > 0 ? contributionMargin1 / netRevenue : 0;
    const breakEvenRoas = cm1Margin > 0 ? 1 / cm1Margin : 0;

    return {
        totalOrders,
        effectiveAov,
        grossSales,
        returnAmount,
        netSales,
        tax,
        netRevenue,
        totalCogs,
        totalShipping,
        paymentFees,
        contributionMargin1,
        adSpend,
        opex,
        ebit,
        netProfit,
        marginPercent,
        roas,
        breakEvenRoas
    };
};

export const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val);
};

export const formatNumber = (val: number) => {
    return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(val);
};

export const formatPercent = (val: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(val / 100);
};

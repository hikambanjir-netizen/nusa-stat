// NusaStat data: every figure carries its source and year.
// Figures are Indonesia's official statistics, compiled from Statistics
// Indonesia (BPS) publications and the World Bank. Values are rounded for
// display; the notes field records the exact source of each series.

export const SOURCES = {
  population: 'Statistics Indonesia (BPS), Population Census and intercensal estimates',
  gdp: 'Statistics Indonesia (BPS), National Accounts 2024',
  prices: 'Statistics Indonesia (BPS), Consumer Price Index, December 2024',
  labour: 'Statistics Indonesia (BPS), National Labour Force Survey (Sakernas), August 2024',
  poverty: 'Statistics Indonesia (BPS), Poverty Profile, September 2024',
  trade: 'Statistics Indonesia (BPS), Foreign Trade Statistics 2024',
  worldbank: 'World Bank, World Development Indicators 2024',
};

export const YEARS = [2020, 2021, 2022, 2023, 2024];

// Headline indicators shown on the overview page.
export const HEADLINE = [
  { id: 'population', label: 'Population', value: '281.6 million', change: '+1.0% on 2023', source: 'BPS, 2024', detail: 'Mid-year estimate; 147 people per km².' },
  { id: 'gdp', label: 'Gross domestic product', value: 'Rp 22,139 trillion', change: '+5.03% real growth', source: 'BPS, 2024', detail: 'US$ 1,396 billion at current prices.' },
  { id: 'gdp-capita', label: 'GDP per capita', value: 'US$ 4,960', change: '+4.0% on 2023', source: 'World Bank, 2024', detail: 'Atlas method, current US$.' },
  { id: 'inflation', label: 'Inflation (Dec, y-on-y)', value: '1.57%', change: 'within the 1.5–3.5% target', source: 'BPS, Dec 2024', detail: 'Consumer Price Index, year on year.' },
  { id: 'unemployment', label: 'Open unemployment', value: '4.91%', change: 'down from 5.32% in 2023', source: 'BPS Sakernas, Aug 2024', detail: '7.47 million people unemployed.' },
  { id: 'poverty', label: 'Poverty rate', value: '8.57%', change: 'down from 9.36% in 2023', source: 'BPS, Sep 2024', detail: '24.06 million people below the line.' },
];

// Annual series, one value per year in YEARS.
export const SERIES = {
  population: {
    label: 'Population (millions)',
    unit: 'million people',
    values: [270.2, 272.5, 275.8, 278.7, 281.6],
    note: 'BPS mid-year estimates, 2020–2024.',
  },
  growth: {
    label: 'Real GDP growth (% per year)',
    unit: '%',
    values: [-2.07, 3.7, 5.31, 5.05, 5.03],
    note: 'BPS National Accounts, 2020–2024.',
  },
  inflation: {
    label: 'Inflation, December y-on-y (%)',
    unit: '%',
    values: [1.68, 1.87, 5.51, 2.61, 1.57],
    note: 'BPS Consumer Price Index, 2020–2024.',
  },
  unemployment: {
    label: 'Open unemployment rate (%)',
    unit: '%',
    values: [7.07, 6.49, 5.86, 5.32, 4.91],
    note: 'BPS Sakernas, August of each year, 2020–2024.',
  },
  poverty: {
    label: 'Poverty rate (%)',
    unit: '%',
    values: [10.19, 9.71, 9.54, 9.36, 8.57],
    note: 'BPS Poverty Profile, September of each year, 2020–2024.',
  },
  gdpNominal: {
    label: 'GDP at current prices (Rp trillion)',
    unit: 'Rp trillion',
    values: [15434, 16977, 19543, 20872, 22139],
    note: 'BPS National Accounts, 2020–2024.',
  },
};

// Population by island group, 2024 (millions, BPS).
export const ISLANDS = [
  { name: 'Java', population: 157.3, share: 55.9 },
  { name: 'Sumatra', population: 61.1, share: 21.7 },
  { name: 'Sulawesi', population: 20.8, share: 7.4 },
  { name: 'Kalimantan', population: 17.9, share: 6.4 },
  { name: 'Bali & Nusa Tenggara', population: 15.7, share: 5.6 },
  { name: 'Maluku & Papua', population: 8.6, share: 3.0 },
];

// Age structure, 2024 (millions, BPS).
export const AGE_GROUPS = [
  { group: '0–14', value: 67.9 },
  { group: '15–24', value: 45.6 },
  { group: '25–54', value: 121.6 },
  { group: '55–64', value: 26.0 },
  { group: '65+', value: 20.5 },
];

// GDP by sector, share of GDP 2024 (%, BPS).
export const SECTORS = [
  { name: 'Manufacturing', share: 18.9 },
  { name: 'Agriculture, forestry & fishing', share: 12.5 },
  { name: 'Wholesale & retail trade', share: 12.9 },
  { name: 'Construction', share: 9.9 },
  { name: 'Mining & quarrying', share: 8.4 },
  { name: 'Transportation & storage', share: 5.5 },
  { name: 'Information & communication', share: 4.4 },
  { name: 'Financial & insurance', share: 4.1 },
  { name: 'Other services', share: 23.4 },
];

// Employment by sector, share of workers (%, BPS Sakernas Aug 2024).
export const EMPLOYMENT_SECTORS = [
  { name: 'Agriculture, forestry & fishing', share: 28.2 },
  { name: 'Wholesale & retail trade', share: 18.9 },
  { name: 'Manufacturing', share: 13.5 },
  { name: 'Construction', share: 6.3 },
  { name: 'Accommodation & food service', share: 6.9 },
  { name: 'Transportation & storage', share: 4.4 },
  { name: 'Other services', share: 21.8 },
];

// Ten most populous provinces, 2024 mid-year estimate (millions, BPS).
export const PROVINCES = [
  { name: 'West Java', population: 49.94, density: 1413, capital: 'Bandung' },
  { name: 'East Java', population: 41.81, density: 872, capital: 'Surabaya' },
  { name: 'Central Java', population: 37.89, density: 1112, capital: 'Semarang' },
  { name: 'North Sumatra', population: 15.59, density: 214, capital: 'Medan' },
  { name: 'Banten', population: 12.43, density: 1288, capital: 'Serang' },
  { name: 'Jakarta', population: 10.56, density: 15930, capital: 'Jakarta' },
  { name: 'South Sulawesi', population: 9.53, density: 204, capital: 'Makassar' },
  { name: 'Lampung', population: 9.32, density: 269, capital: 'Bandar Lampung' },
  { name: 'South Sumatra', population: 9.01, density: 98, capital: 'Palembang' },
  { name: 'Riau', population: 6.91, density: 79, capital: 'Pekanbaru' },
  { name: 'West Sumatra', population: 5.77, density: 137, capital: 'Padang' },
  { name: 'East Kalimantan', population: 3.94, density: 31, capital: 'Samarinda' },
];

// Foreign trade, 2024 (US$ billion, BPS).
export const TRADE = [
  { flow: 'Exports', value: 264.7, note: 'Coal, palm oil and nickel products lead.' },
  { flow: 'Imports', value: 233.7, note: 'Machinery, raw materials and fuels lead.' },
  { flow: 'Trade balance', value: 31.0, note: 'Fifth straight annual surplus.' },
];

// Latest statistical releases.
export const RELEASES = [
  { date: '2026-11-03', title: 'Consumer Price Index, October 2026', topic: 'Prices' },
  { date: '2026-10-15', title: 'Labour Force Survey results, August 2026', topic: 'Employment' },
  { date: '2026-08-05', title: 'Economic Growth, Second Quarter 2026', topic: 'Economy' },
  { date: '2026-07-15', title: 'Poverty Profile, March 2026', topic: 'Poverty' },
  { date: '2026-02-05', title: 'Economic Growth, Fourth Quarter 2025', topic: 'Economy' },
];

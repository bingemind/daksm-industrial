/**
 * config.js — Single Source of Truth
 *
 * All product data and calculator constants live here.
 * The UI reads this file; to update products or specs,
 * edit here — the page updates everywhere automatically.
 *
 * Sections:
 *   1. PRODUCT_DATA   — Array of valve product objects
 *   2. CALCULATOR_CONSTANTS — Weight/torque/Cv lookup tables per valve type & NPS
 */

'use strict';

/* ================================================================
   1. PRODUCT_DATA
   Each object represents one valve product line card.
   Fields used by renderProducts() in app.js.
================================================================= */

const PRODUCT_DATA = [
  {
    id:          'ball-valve',
    name:        'Ball Valve',
    series:      'BV Series',
    category:    'Rotary Control',
    description: 'Full-bore and reduced-bore ball valves engineered for zero-leakage shut-off in oil & gas, petrochemical, and high-pressure process lines. Available in floating and trunnion-mounted designs.',
    image:       '/public/images/products/ball-valve.webp',
    specs: {
      sizes:     ['½"', '¾"', '1"', '1½"', '2"', '3"', '4"', '6"', '8"', '10"', '12"', '16"', '20"', '24"'],
      classes:   [150, 300, 600, 900, 1500, 2500],
      materials: ['ASTM A216 WCB (Carbon Steel)', 'ASTM A351 CF8M (SS 316)', 'Duplex 2205', 'Super Duplex 2507'],
      ends:      ['Flanged RF/FF/RTJ', 'Butt-Weld', 'Socket-Weld', 'Threaded NPT/BSP'],
    },
    standards:   ['API 6D', 'API 608', 'ASME B16.34', 'ISO 17292', 'BS 5351'],
    features: [
      'Fire-safe design per API 607 / API 6FA',
      'Anti-static device (ESD)',
      'Double-block-and-bleed (DBB) configuration available',
      'Fugitive emission tested per ISO 15848',
      'Gear operator / actuator-ready stem',
    ],
    badge: 'Best Seller',
  },
  {
    id:          'gate-valve',
    name:        'Gate Valve',
    series:      'GV Series',
    category:    'Linear Isolation',
    description: 'Wedge and parallel-gate isolation valves designed for full-open / full-closed service. Minimal pressure drop when fully open. Ideal for pipeline isolation in refineries and power plants.',
    image:       '/public/images/products/gate-valve.webp',
    specs: {
      sizes:     ['½"', '¾"', '1"', '1½"', '2"', '3"', '4"', '6"', '8"', '10"', '12"', '16"', '20"', '24"'],
      classes:   [150, 300, 600, 900, 1500, 2500],
      materials: ['ASTM A216 WCB', 'ASTM A351 CF8M', 'ASTM A217 WC6 (Cr-Mo)', 'ASTM A217 C12A'],
      ends:      ['Flanged RF/RTJ', 'Butt-Weld', 'Extended body BW'],
    },
    standards:   ['API 600', 'ASME B16.34', 'BS 1414', 'MSS SP-70'],
    features: [
      'Bolted / pressure-seal bonnet options',
      'OS&Y (Outside Screw & Yoke) stem design',
      'Flexible wedge and solid wedge available',
      'Gear-operated for sizes ≥ 6"',
      'Cryogenic service extension available',
    ],
    badge: null,
  },
  {
    id:          'globe-valve',
    name:        'Globe Valve',
    series:      'GL Series',
    category:    'Flow Regulation',
    description: 'High-performance globe valves for precise throttling and flow regulation in steam, oil, gas, and chemical service. Superior shutoff capability with minimal seat erosion.',
    image:       '/public/images/products/globe-valve.webp',
    specs: {
      sizes:     ['½"', '¾"', '1"', '1½"', '2"', '3"', '4"', '6"', '8"', '10"', '12"'],
      classes:   [150, 300, 600, 900, 1500, 2500],
      materials: ['ASTM A216 WCB', 'ASTM A351 CF8M', 'ASTM A217 WC9 (Cr-Mo)', 'Inconel 625 trim'],
      ends:      ['Flanged RF/RTJ', 'Butt-Weld', 'Socket-Weld'],
    },
    standards:   ['API 623', 'ASME B16.34', 'BS 1873', 'MSS SP-80'],
    features: [
      'Needle, plug, and composition disc options',
      'Renewable seat and disc',
      'Bellows-sealed stem (zero fugitive emissions)',
      'Y-pattern and angle-pattern configurations',
      'High-temperature/cryogenic service variants',
    ],
    badge: 'New',
  },
];


/* ================================================================
   2. CALCULATOR_CONSTANTS
   Lookup table for the Valve Specification Calculator (calculator.js).

   Structure:
     VALVE_TYPE → {
       NPS_INCH (number key) → {
         weight_kg    : approximate weight at Class 150 baseline
         torque_nm    : approximate operating torque at Class 150
         cv           : flow coefficient (Cv) at full open
         weight_class_factor : weight multiplier per pressure class step
         torque_class_factor : torque multiplier per pressure class step
       }
     }

   Class steps (indices 0-5): [150, 300, 600, 900, 1500, 2500]
   Applied formula:
     final_weight = weight_kg  * weight_class_factor[classIndex]
     final_torque = torque_nm  * torque_class_factor[classIndex]
================================================================= */

const CALCULATOR_CONSTANTS = {

  // Pressure class index map — used by calculator.js
  CLASS_INDEX: {
    150:  0,
    300:  1,
    600:  2,
    900:  3,
    1500: 4,
    2500: 5,
  },

  // Multipliers applied on top of the base (Class 150) value
  WEIGHT_CLASS_FACTORS: [1.00, 1.20, 1.55, 1.85, 2.30, 3.10],
  TORQUE_CLASS_FACTORS: [1.00, 1.15, 1.40, 1.65, 2.05, 2.80],

  // ---- Ball Valve (BV Series) ----
  BALL_VALVE: {
    0.5:  { weight_kg:   1.2,  torque_nm:    10,  cv:    20 },
    0.75: { weight_kg:   1.8,  torque_nm:    15,  cv:    35 },
    1:    { weight_kg:   2.5,  torque_nm:    22,  cv:    65 },
    1.5:  { weight_kg:   4.0,  torque_nm:    38,  cv:   130 },
    2:    { weight_kg:   6.5,  torque_nm:    60,  cv:   230 },
    3:    { weight_kg:  14.0,  torque_nm:   140,  cv:   580 },
    4:    { weight_kg:  24.0,  torque_nm:   260,  cv:  1100 },
    6:    { weight_kg:  55.0,  torque_nm:   620,  cv:  2800 },
    8:    { weight_kg: 105.0,  torque_nm:  1200,  cv:  5200 },
    10:   { weight_kg: 180.0,  torque_nm:  2200,  cv:  8800 },
    12:   { weight_kg: 280.0,  torque_nm:  3600,  cv: 13500 },
    16:   { weight_kg: 520.0,  torque_nm:  7000,  cv: 26000 },
    20:   { weight_kg: 890.0,  torque_nm: 13000,  cv: 44000 },
    24:   { weight_kg:1350.0,  torque_nm: 22000,  cv: 66000 },
  },

  // ---- Gate Valve (GV Series) ----
  GATE_VALVE: {
    0.5:  { weight_kg:   1.5,  torque_nm:    12,  cv:    25 },
    0.75: { weight_kg:   2.2,  torque_nm:    18,  cv:    45 },
    1:    { weight_kg:   3.0,  torque_nm:    28,  cv:    80 },
    1.5:  { weight_kg:   5.5,  torque_nm:    50,  cv:   170 },
    2:    { weight_kg:   9.0,  torque_nm:    80,  cv:   310 },
    3:    { weight_kg:  20.0,  torque_nm:   175,  cv:   760 },
    4:    { weight_kg:  36.0,  torque_nm:   330,  cv:  1450 },
    6:    { weight_kg:  80.0,  torque_nm:   780,  cv:  3600 },
    8:    { weight_kg: 150.0,  torque_nm:  1500,  cv:  6800 },
    10:   { weight_kg: 260.0,  torque_nm:  2800,  cv: 11500 },
    12:   { weight_kg: 400.0,  torque_nm:  4600,  cv: 17500 },
    16:   { weight_kg: 730.0,  torque_nm:  8800,  cv: 34000 },
    20:   { weight_kg:1200.0,  torque_nm: 16500,  cv: 57000 },
    24:   { weight_kg:1850.0,  torque_nm: 28000,  cv: 86000 },
  },

  // ---- Globe Valve (GL Series) ----
  GLOBE_VALVE: {
    0.5:  { weight_kg:   1.8,  torque_nm:    18,  cv:    11 },
    0.75: { weight_kg:   2.5,  torque_nm:    26,  cv:    20 },
    1:    { weight_kg:   3.5,  torque_nm:    38,  cv:    35 },
    1.5:  { weight_kg:   6.0,  torque_nm:    65,  cv:    80 },
    2:    { weight_kg:  10.0,  torque_nm:   105,  cv:   145 },
    3:    { weight_kg:  22.0,  torque_nm:   240,  cv:   360 },
    4:    { weight_kg:  40.0,  torque_nm:   440,  cv:   680 },
    6:    { weight_kg:  90.0,  torque_nm:  1050,  cv:  1700 },
    8:    { weight_kg: 170.0,  torque_nm:  2000,  cv:  3200 },
    10:   { weight_kg: 290.0,  torque_nm:  3700,  cv:  5400 },
    12:   { weight_kg: 450.0,  torque_nm:  6000,  cv:  8200 },
  },

  // NPS size options presented to the user in the calculator UI
  NPS_OPTIONS: [
    { label: '½"',  value: 0.5  },
    { label: '¾"',  value: 0.75 },
    { label: '1"',  value: 1    },
    { label: '1½"', value: 1.5  },
    { label: '2"',  value: 2    },
    { label: '3"',  value: 3    },
    { label: '4"',  value: 4    },
    { label: '6"',  value: 6    },
    { label: '8"',  value: 8    },
    { label: '10"', value: 10   },
    { label: '12"', value: 12   },
    { label: '16"', value: 16   },
    { label: '20"', value: 20   },
    { label: '24"', value: 24   },
  ],

  // Pressure class options for the calculator UI
  CLASS_OPTIONS: [150, 300, 600, 900, 1500, 2500],
};

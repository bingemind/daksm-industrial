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
    image:       'public/images/products/ball-valve.png',
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
    id:          'butterfly-valve',
    name:        'Butterfly Valve',
    series:      'BFV Series',
    category:    'Rotary Control',
    description: 'Concentric and double-offset butterfly valves for large diameter pipelines. Ideal for isolation and throttling in water, HVAC, and industrial process applications. Wafer and lug body styles available.',
    image:       'public/images/products/butterfly-valve.jpg',
    specs: {
      sizes:     ['2"', '3"', '4"', '6"', '8"', '10"', '12"', '16"', '20"', '24"', '36"', '48"', '60"', '72"'],
      classes:   [150, 300, 600],
      materials: ['Cast Iron', 'Ductile Iron', 'Carbon Steel', 'Stainless Steel'],
      ends:      ['Wafer', 'Lug', 'Flanged'],
    },
    standards:   ['API 609', 'BS 5155', 'EN 593', 'API 598'],
    features: [
      'Concentric, double-offset, and triple-offset designs',
      'Low pressure drop across full bore',
      'Lever, gear, pneumatic, or electric actuation',
      'Soft and metal seat options',
      'High-cycle service rating',
    ],
    badge: null,
  },
  {
    id:          'gate-valve',
    name:        'Gate Valve',
    series:      'GV Series',
    category:    'Linear Isolation',
    description: 'Wedge and parallel-gate isolation valves designed for full-open / full-closed service. Minimal pressure drop when fully open. Ideal for pipeline isolation in refineries and power plants.',
    image:       'public/images/products/gate-valve.jpg',
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
    image:       'public/images/products/globe-valve.jpg',
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
    badge: null,
  },
  {
    id:          'non-return-valve',
    name:        'Non Return Valve',
    series:      'NRV Series',
    category:    'Flow Direction',
    description: 'Check valves preventing reverse flow and protecting pumps, compressors, and process equipment. Swing check, tilting disc, dual plate, and piston lift configurations available.',
    image:       'public/images/products/non-return-valve.png',
    specs: {
      sizes:     ['½"', '¾"', '1"', '1½"', '2"', '3"', '4"', '6"', '8"', '10"', '12"', '16"', '20"', '24"'],
      classes:   [150, 300, 600, 900, 1500, 2500],
      materials: ['Carbon Steel (A216 WCB)', 'Stainless Steel', 'Alloy Steel'],
      ends:      ['Flanged', 'Butt Weld', 'Wafer'],
    },
    standards:   ['API 594', 'API 6D', 'BS 5153', 'API 598'],
    features: [
      'Automatic (self-acting) — no actuator needed',
      'Swing, tilting disc, dual plate, piston lift designs',
      'Low head loss across valve',
      'Spring-assisted closing option',
      'Horizontal and vertical installation',
    ],
    badge: null,
  },
  {
    id:          'diaphragm-valve',
    name:        'Diaphragm Valve',
    series:      'DV Series',
    category:    'Process Control',
    description: 'Flexible diaphragm flow control for corrosive, abrasive, and contamination-sensitive applications. Body never contacts process fluid — zero leakage paths.',
    image:       'public/images/products/diaphragm-valve.jpg',
    specs: {
      sizes:     ['½"', '¾"', '1"', '1½"', '2"', '3"', '4"', '6"', '8"', '10"', '12"'],
      classes:   [150],
      materials: ['Cast Iron', 'Carbon Steel', 'Stainless Steel', 'PVDF', 'PP'],
      ends:      ['Flanged', 'Threaded', 'Butt Weld'],
    },
    standards:   ['BS 5156', 'ISO 16138', 'API 598'],
    features: [
      'Weir and straight-through (full bore) designs',
      'Natural Rubber, EPDM, PTFE, Neoprene diaphragms',
      'Ideal for slurries and abrasive media',
      'Handwheel and pneumatic actuation',
      'Bubble-tight shut-off at low pressures',
    ],
    badge: null,
  },
  {
    id:          'plug-valve',
    name:        'Plug Valve',
    series:      'PV Series',
    category:    'Rotary Control',
    description: 'Lubricated and non-lubricated plug valves for natural gas distribution, refinery, and petrochemical service. Multi-port designs available for flow diversion.',
    image:       'public/images/products/plug-valve.png',
    specs: {
      sizes:     ['½"', '¾"', '1"', '1½"', '2"', '3"', '4"', '6"', '8"', '10"', '12"', '16"', '20"', '24"'],
      classes:   [150, 300, 600, 900],
      materials: ['Carbon Steel', 'Cast Iron', 'Ductile Iron', 'Stainless Steel'],
      ends:      ['Flanged', 'Threaded', 'Butt Weld'],
    },
    standards:   ['API 599', 'BS 5353', 'API 598'],
    features: [
      'Quarter-turn operation',
      'Lubricated and sleeved (non-lubricated) options',
      '2-way, 3-way, and 4-way multi-port designs',
      'Compact and lightweight vs gate/globe valves',
      'Actuator-ready stem',
    ],
    badge: null,
  },
  {
    id:          'strainer',
    name:        'Strainer',
    series:      'ST Series',
    category:    'Pipeline Protection',
    description: 'Y-type and basket strainers protecting pumps, meters, control valves, and downstream equipment from pipeline debris. Interchangeable screens in various mesh sizes.',
    image:       'public/images/products/strainer.png',
    specs: {
      sizes:     ['½"', '¾"', '1"', '1½"', '2"', '3"', '4"', '6"', '8"', '10"', '12"', '16"', '20"', '24"'],
      classes:   [150, 300, 600, 900, 1500],
      materials: ['Carbon Steel', 'Stainless Steel', 'Cast Iron'],
      ends:      ['Flanged', 'Screwed', 'Socket Weld'],
    },
    standards:   ['ASME B16.34', 'API 598'],
    features: [
      'Y-type and basket (bucket) configurations',
      'Stainless Steel 304/316 interchangeable screens',
      '20 mesh to 100 mesh options',
      'Blow-down connection option for on-line cleaning',
      'Steam, water, oil, gas, and chemical service',
    ],
    badge: null,
  },
  {
    id:          'industrial-gaskets',
    name:        'Industrial Gaskets',
    series:      'GK Series',
    category:    'Sealing Solutions',
    description: 'Spiral wound, ring type joint, and sheet gaskets for all pipeline flange types. Manufactured to ASME, API, and DIN standards for reliable sealing across all pressure classes.',
    image:       'public/images/products/industrial-gaskets.png',
    specs: {
      sizes:     ['½" NB', '¾" NB', '1" NB', '1½" NB', '2" NB', '3" NB', '4" NB', '6" NB', '8" NB', '12" NB', '24" NB', '36" NB', '48" NB', '60" NB'],
      classes:   [150, 300, 600, 900, 1500, 2500],
      materials: ['Compressed Asbestos Fibre (CAF)', 'Non-Asbestos Fibre', 'Stainless Steel 304/316', 'Graphite'],
      ends:      ['Full Face', 'Raised Face', 'Ring Type Joint'],
    },
    standards:   ['ASME B16.20', 'ASME B16.21', 'API 601'],
    features: [
      'Spiral wound, RTJ, and sheet gasket types',
      'Up to 500°C service temperature (material dependent)',
      'Available for ANSI, DIN, and BS flanges',
      'Inner and outer rings for spiral wound gaskets',
      'Custom sizes available on request',
    ],
    badge: null,
  },
  {
    id:          'gland-packings',
    name:        'Non-Asbestos Gland Packings',
    series:      'GP Series',
    category:    'Sealing Solutions',
    description: 'Braided gland packings for valve stems, pump shafts, and rotating equipment. PTFE, graphite, aramid, and carbon fibre compositions. Non-asbestos, RoHS compliant.',
    image:       'public/images/products/gland-packings.png',
    specs: {
      sizes:     ['3mm', '4mm', '5mm', '6mm', '8mm', '10mm', '12mm', '16mm', '20mm', '25mm', '32mm', '38mm', '50mm'],
      classes:   [],   // rated by bar (up to 350 bar) — shown in features
      materials: ['Braided PTFE', 'Graphite', 'Aramid Fibre', 'Carbon Fibre', 'Synthetic Yarn'],
      ends:      ['Ring Sets', 'Metre Lengths', 'Coils'],
    },
    standards:   ['Non-asbestos compliant', 'RoHS compliant'],
    features: [
      'PTFE service: -200°C to +260°C',
      'Graphite service: up to +600°C',
      'Up to 350 bar depending on grade',
      'Supplied as ring sets, coils, or cut lengths',
      'Low coefficient of friction — easy valve operation',
    ],
    badge: null,
  },
  {
    id:          'cold-welding-compound',
    name:        'Cold Welding Compound',
    series:      'CW Series',
    category:    'Repair Solutions',
    description: 'Two-component metal-filled epoxy for repairing cracks, holes, and worn surfaces without welding equipment or hot work permits. Emergency repair for valves, pipes, pumps, and castings.',
    image:       'public/images/products/cold-welding-compound.jpg',
    specs: {
      sizes:     ['250g kit', '500g kit', '1kg kit'],
      classes:   [],   // not applicable — temperature resistance shown in standards
      materials: ['Steel-filled epoxy', 'Aluminium-filled', 'Titanium-filled', 'Ceramic variants'],
      ends:      ['Two-component', 'Mix ratio 2:1'],
    },
    standards:   ['No hot work permit required', 'Sets in 30–60 min at 25°C'],
    features: [
      'No welding equipment or hot work permit needed',
      'Sets in 30–60 minutes at room temperature',
      'Full cure in 24 hours at 25°C',
      'Over 800 kg/cm² compressive strength',
      'Steel, aluminium, titanium, ceramic variants',
    ],
    badge: null,
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

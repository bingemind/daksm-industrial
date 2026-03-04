/**
 * calculator.js — Valve Specification Calculator
 *
 * A self-contained component with:
 *   - Pure functional calculation logic (no side effects)
 *   - DOM rendering of the UI form
 *   - Real-time result updates on input change
 *
 * Dependencies: config.js (CALCULATOR_CONSTANTS) must load before this file.
 *
 * Usage: Call Calculator.init() after the DOM is ready.
 *        The component targets the element with id="calculator-mount".
 */

'use strict';

const Calculator = (() => {

  /* ================================================================
     PURE CALCULATION FUNCTIONS
     These functions take inputs and return outputs — no DOM access.
     Easy to unit-test and reason about.
  ================================================================= */

  /**
   * Look up the data table for a given valve type string.
   * Returns the correct sub-object from CALCULATOR_CONSTANTS.
   *
   * @param {string} valveType  - 'BALL_VALVE' | 'GATE_VALVE' | 'GLOBE_VALVE'
   * @returns {Object|null}
   */
  const getValveTable = (valveType) => {
    const tables = {
      BALL_VALVE:  CALCULATOR_CONSTANTS.BALL_VALVE,
      GATE_VALVE:  CALCULATOR_CONSTANTS.GATE_VALVE,
      GLOBE_VALVE: CALCULATOR_CONSTANTS.GLOBE_VALVE,
    };
    return tables[valveType] ?? null;
  };

  /**
   * Calculate valve specifications given the three inputs.
   *
   * @param {string} valveType     - 'BALL_VALVE' | 'GATE_VALVE' | 'GLOBE_VALVE'
   * @param {number} npsInches     - NPS size as a number (e.g. 0.5, 2, 6)
   * @param {number} pressureClass - ASME class (e.g. 150, 300, 600, 1500, 2500)
   * @returns {{ weight_kg: number, torque_nm: number, cv: number, error?: string }}
   */
  const calculate = (valveType, npsInches, pressureClass) => {
    const table = getValveTable(valveType);
    if (!table) return { error: `Unknown valve type: ${valveType}` };

    const baseData = table[npsInches];
    if (!baseData) {
      return { error: `Size ${npsInches}" is not available for this valve type.` };
    }

    const classIndex = CALCULATOR_CONSTANTS.CLASS_INDEX[pressureClass];
    if (classIndex === undefined) {
      return { error: `Pressure class ${pressureClass} is not valid.` };
    }

    const weightFactor = CALCULATOR_CONSTANTS.WEIGHT_CLASS_FACTORS[classIndex];
    const torqueFactor = CALCULATOR_CONSTANTS.TORQUE_CLASS_FACTORS[classIndex];

    return {
      weight_kg: +(baseData.weight_kg * weightFactor).toFixed(1),
      torque_nm: +(baseData.torque_nm * torqueFactor).toFixed(0),
      cv:        baseData.cv, // Cv is not class-dependent for these estimates
    };
  };

  /**
   * Format a number with thousand separators, no decimals for large values.
   * e.g. 1350.0 → "1,350"   |   6.5 → "6.5"
   *
   * @param {number} n
   * @returns {string}
   */
  const formatNumber = (n) =>
    n >= 100
      ? Math.round(n).toLocaleString('en-US')
      : n.toLocaleString('en-US', { maximumFractionDigits: 1 });


  /* ================================================================
     DOM RENDERING
  ================================================================= */

  /**
   * Build the calculator form HTML string.
   * Uses data from CALCULATOR_CONSTANTS (config.js) for option lists.
   *
   * @returns {string} HTML
   */
  const buildFormHTML = () => {
    const valveTypes = [
      { value: 'BALL_VALVE',  label: 'Ball Valve'  },
      { value: 'GATE_VALVE',  label: 'Gate Valve'  },
      { value: 'GLOBE_VALVE', label: 'Globe Valve' },
    ];

    const npsOptions = CALCULATOR_CONSTANTS.NPS_OPTIONS.map(
      ({ label, value }) =>
        `<option value="${value}">${label}</option>`
    ).join('');

    const classOptions = CALCULATOR_CONSTANTS.CLASS_OPTIONS.map(
      (cls) => `<option value="${cls}">Class ${cls}</option>`
    ).join('');

    const valveOptions = valveTypes.map(
      ({ value, label }) => `<option value="${value}">${label}</option>`
    ).join('');

    return `
      <div class="grid lg:grid-cols-2 gap-10 items-start">

        <!-- LEFT: Input form -->
        <div>
          <form id="calc-form" novalidate aria-label="Valve specification calculator">

            <!-- Valve Type -->
            <div class="mb-6">
              <label class="calc-label" for="calc-valve-type">
                Valve Type
              </label>
              <div class="calc-select-wrap">
                <select id="calc-valve-type" name="valveType"
                        class="calc-select" aria-required="true">
                  ${valveOptions}
                </select>
                <svg class="calc-select-arrow" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <!-- NPS Size -->
            <div class="mb-6">
              <label class="calc-label" for="calc-nps">
                Nominal Pipe Size (NPS)
              </label>
              <div class="calc-select-wrap">
                <select id="calc-nps" name="nps"
                        class="calc-select" aria-required="true">
                  ${npsOptions}
                </select>
                <svg class="calc-select-arrow" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <!-- Pressure Class -->
            <div class="mb-8">
              <label class="calc-label" for="calc-class">
                Pressure Class (ASME)
              </label>
              <div class="calc-select-wrap">
                <select id="calc-class" name="pressureClass"
                        class="calc-select" aria-required="true">
                  ${classOptions}
                </select>
                <svg class="calc-select-arrow" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <!-- Disclaimer -->
            <p class="text-xs text-muted leading-relaxed">
              <strong class="text-content-secondary">Note:</strong>
              Values shown are engineering estimates for preliminary sizing.
              Contact our team for certified datasheet specifications.
            </p>
          </form>
        </div>

        <!-- RIGHT: Results panel -->
        <div id="calc-results" aria-live="polite" aria-label="Calculation results">
          <!-- Populated dynamically by updateResults() -->
        </div>

      </div>
    `;
  };

  /**
   * Build the results panel HTML from a calculation result object.
   *
   * @param {Object} result   - Return value of calculate()
   * @param {string} label    - Human-readable valve + size + class string
   * @returns {string} HTML
   */
  const buildResultsHTML = (result, label) => {
    if (result.error) {
      return `
        <div class="flex items-center gap-3 p-5 rounded-xl border border-red-300 bg-red-50
                    dark:border-red-800 dark:bg-red-950/30 text-red-700 dark:text-red-400">
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667
                     1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464
                     0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <span class="text-sm">${result.error}</span>
        </div>
      `;
    }

    const metrics = [
      {
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                 d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3
                    1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0
                    16H9m3 0h3"/>`,
        label: 'Approx. Weight',
        value: `${formatNumber(result.weight_kg)} kg`,
        sub:   `(${formatNumber(result.weight_kg * 2.205)} lbs)`,
      },
      {
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                 d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0
                    0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>`,
        label: 'Operating Torque',
        value: `${formatNumber(result.torque_nm)} N·m`,
        sub:   `(${formatNumber(result.torque_nm * 0.7376)} ft·lb)`,
      },
      {
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                 d="M13 10V3L4 14h7v7l9-11h-7z"/>`,
        label: 'Flow Coefficient Cv',
        value: formatNumber(result.cv),
        sub:   'at full open position',
      },
    ];

    return `
      <div class="rounded-2xl border border-border bg-surface-secondary p-6">
        <!-- Result header -->
        <div class="flex items-center gap-2 mb-5 pb-4 border-b border-border-subtle">
          <span class="w-2 h-2 rounded-full bg-accent"></span>
          <h3 class="font-mono text-xs text-muted uppercase tracking-widest">
            Specification Estimate
          </h3>
        </div>
        <p class="text-sm font-medium text-content mb-6">${label}</p>

        <!-- Metric cards -->
        <div class="space-y-4">
          ${metrics.map(({ icon, label: metricLabel, value, sub }) => `
            <div class="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border">
              <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" aria-hidden="true">
                  ${icon}
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-xs text-muted mb-0.5">${metricLabel}</div>
                <div class="font-display font-bold text-xl text-content leading-none">
                  ${value}
                </div>
                <div class="text-xs text-muted mt-0.5">${sub}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Contact CTA -->
        <div class="mt-6 pt-5 border-t border-border-subtle">
          <a href="#contact"
             class="btn-primary flex items-center justify-center gap-2 w-full
                    px-5 py-3 rounded-xl text-white font-semibold text-sm">
            Request Certified Datasheet
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    `;
  };

  /**
   * Read the current form values, run the calculation, and update the results panel.
   */
  const updateResults = () => {
    const typeEl  = document.getElementById('calc-valve-type');
    const npsEl   = document.getElementById('calc-nps');
    const classEl = document.getElementById('calc-class');

    if (!typeEl || !npsEl || !classEl) return;

    const valveType     = typeEl.value;
    const npsInches     = parseFloat(npsEl.value);
    const pressureClass = parseInt(classEl.value, 10);

    // Human-readable label for the results header
    const valveLabel = typeEl.options[typeEl.selectedIndex].text;
    const npsLabel   = npsEl.options[npsEl.selectedIndex].text;
    const label      = `${valveLabel} — ${npsLabel} NPS — Class ${pressureClass}`;

    const result  = calculate(valveType, npsInches, pressureClass);
    const panel   = document.getElementById('calc-results');
    if (panel) {
      panel.innerHTML = buildResultsHTML(result, label);
    }
  };

  /**
   * Inject the calculator HTML into #calculator-mount and wire up event listeners.
   */
  const init = () => {
    const mount = document.getElementById('calculator-mount');
    if (!mount || typeof CALCULATOR_CONSTANTS === 'undefined') return;

    mount.innerHTML = buildFormHTML();

    // Run an initial calculation with the default (first) option values
    updateResults();

    // Re-calculate on any select change — live feedback
    const form = document.getElementById('calc-form');
    if (form) {
      form.addEventListener('change', updateResults);
    }
  };

  // Expose only the public API
  return { init, calculate, formatNumber };

})();


/* ================================================================
   AUTO-INIT on DOMContentLoaded
   (app.js also calls DOMContentLoaded, but the order between
    the two scripts doesn't matter — each runs independently.)
================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  Calculator.init();
});

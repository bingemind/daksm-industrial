/**
 * app.js — Main Application Logic
 *
 * Responsibilities:
 *   1. Theme toggle  — Precision (light) ↔ Powerhouse (dark), persisted to localStorage
 *   2. Navbar scroll — applies .is-scrolled class for the glass/shadow effect
 *   3. Mobile menu   — open / close with aria attributes
 *   4. Active nav    — highlights the current section link on scroll
 *   5. renderProducts() — generates product cards from PRODUCT_DATA (config.js)
 *
 * Dependencies: config.js must be loaded before this file.
 */

'use strict';

/* ================================================================
   1. THEME TOGGLE
   Reads the user's saved preference from localStorage on page load,
   then handles the toggle button click.

   How it works:
   - The <html> element gets class="dark" for Powerhouse mode.
   - All CSS variables in :root and .dark switch automatically.
   - The hero background image changes via the CSS var --hero-image-url.
   - No JavaScript image-swapping needed.
================================================================= */

const ThemeManager = (() => {
  const STORAGE_KEY = 'daksm-theme';
  const DARK_CLASS  = 'dark';
  const html        = document.documentElement;

  /** Returns true if the current theme is dark ("Powerhouse"). */
  const isDark = () => html.classList.contains(DARK_CLASS);

  /** Apply a theme by name: 'dark' | 'light' */
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      html.classList.add(DARK_CLASS);
    } else {
      html.classList.remove(DARK_CLASS);
    }
    _updateToggleUI();
  };

  /** Flip the current theme and save the new preference. */
  const toggle = () => {
    const next = isDark() ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  /** Sync all toggle buttons' aria-checked and label. */
  const _updateToggleUI = () => {
    const dark = isDark();
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.setAttribute('aria-checked', dark ? 'true' : 'false');
    });
    // Update the visible label next to the toggle (if present)
    const label = document.getElementById('theme-label');
    if (label) {
      label.textContent = dark ? 'Powerhouse' : 'Precision';
    }
  };

  /** Read saved preference or fall back to system preference. */
  const init = () => {
    const saved  = localStorage.getItem(STORAGE_KEY);
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
    applyTheme(saved ?? system);

    // Wire up all toggle buttons (desktop + mobile)
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', toggle);
    });

    // Also respond to OS theme changes (when no saved preference)
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
  };

  return { init, toggle, isDark, applyTheme };
})();


/* ================================================================
   2. NAVBAR SCROLL BEHAVIOUR
   Adds .is-scrolled after the user scrolls past the navbar height.
   This triggers the glass/shadow CSS defined in custom.css.
================================================================= */

const NavbarScroll = (() => {
  const THRESHOLD = 60; // px from top before activating the scrolled state

  const init = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const update = () => {
      navbar.classList.toggle('is-scrolled', window.scrollY > THRESHOLD);
    };

    // Passive listener — no paint blocking
    window.addEventListener('scroll', update, { passive: true });
    update(); // run once on load in case page loads mid-scroll
  };

  return { init };
})();


/* ================================================================
   3. MOBILE MENU
   Toggles the hidden mobile nav panel and updates aria attributes.
================================================================= */

const MobileMenu = (() => {
  const init = () => {
    const btn  = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    const toggle = () => {
      const isOpen = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden', isOpen);
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');

      // Swap hamburger ↔ X icon
      const iconOpen  = btn.querySelector('.icon-menu');
      const iconClose = btn.querySelector('.icon-close');
      if (iconOpen && iconClose) {
        iconOpen.classList.toggle('hidden', !isOpen);
        iconClose.classList.toggle('hidden', isOpen);
      }
    };

    btn.addEventListener('click', toggle);

    // Close the menu when any nav link inside it is clicked
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  };

  return { init };
})();


/* ================================================================
   4. ACTIVE NAV LINK (IntersectionObserver)
   Highlights the nav link whose target section is in the viewport.
================================================================= */

const ActiveNav = (() => {
  const init = () => {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-link[href^="#"]');
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            links.forEach((link) => {
              const matches = link.getAttribute('href') === `#${id}`;
              link.classList.toggle('is-active', matches);
            });
          }
        });
      },
      {
        // Trigger when the section crosses the 30% mark from the top
        rootMargin: '-20% 0px -70% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));
  };

  return { init };
})();


/* ================================================================
   5. RENDER PRODUCTS
   Reads PRODUCT_DATA from config.js and renders product cards into
   the #products-grid element. Called on DOMContentLoaded.

   To update products, edit PRODUCT_DATA in config.js — no HTML changes needed.
================================================================= */

const renderProducts = () => {
  const grid = document.getElementById('products-grid');
  if (!grid || typeof PRODUCT_DATA === 'undefined') return;

  grid.innerHTML = PRODUCT_DATA.slice(0, 3).map((product) => `
    <article
      class="product-card group relative flex flex-col rounded-2xl overflow-hidden
             border border-border bg-surface hover:shadow-lg transition-all duration-300
             hover:-translate-y-1"
      data-product-id="${product.id}"
      aria-label="${product.name} — ${product.series}"
    >
      <!-- Badge (optional) -->
      ${product.badge ? `
        <div class="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-semibold
                    bg-accent text-white">
          ${product.badge}
        </div>
      ` : ''}

      <!-- Product Image -->
      <div class="relative h-52 bg-surface-secondary overflow-hidden">
        <img
          src="${product.image}"
          alt="${product.name} — ${product.series}"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
        />
        <!-- Fallback placeholder when image is missing -->
        <div class="absolute inset-0 hidden items-center justify-center bg-surface-tertiary">
          <svg class="w-16 h-16 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158
                 a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0
                 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782
                 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
        </div>
      </div>

      <!-- Card Body -->
      <div class="flex flex-col flex-1 p-6">
        <!-- Category tag -->
        <span class="inline-block mb-2 text-xs font-medium tracking-widest uppercase text-accent">
          ${product.category}
        </span>

        <!-- Title & Series -->
        <h3 class="font-display font-bold text-xl text-content mb-1">
          ${product.name}
        </h3>

        <!-- Description -->
        <p class="text-sm text-content-secondary leading-relaxed mb-5 flex-1">
          ${product.description}
        </p>
        <!-- CTA -->
        <a
          href="products/detail.html?id=${product.id}"
          class="btn-primary inline-flex items-center justify-center gap-2 w-full
                 px-5 py-3 rounded-xl text-white font-semibold text-sm"
          aria-label="View details for ${product.name}"
        >
          View Details
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </article>
  `).join('');
};


/* ================================================================
   6. SCROLL-TRIGGERED ANIMATIONS
   Uses IntersectionObserver to add the animate-fade-up class to
   elements marked with .will-animate as they enter the viewport.
================================================================= */

const ScrollAnimations = (() => {
  const init = () => {
    const targets = document.querySelectorAll('.will-animate');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target); // animate once only
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
  };

  return { init };
})();


/* ================================================================
   BOOT — Initialise all modules when the DOM is ready
================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  NavbarScroll.init();
  MobileMenu.init();
  ActiveNav.init();
  ScrollAnimations.init();
  renderProducts(); // reads PRODUCT_DATA from config.js
});

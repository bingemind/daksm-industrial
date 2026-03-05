# Claude Code — DAKSM Engineering Industries
# Task: Integrate Full Product Catalogue into Revamped Website
# Authored from: Prompt Engineer + Project Manager + Designer perspective
# Version: 1.0 — Reviewed twice before finalisation

---

## CONTEXT & MISSION

You are working on a professional website redesign for DASKM Engineering Industries,
an industrial valve manufacturer based in Thane, Maharashtra, India.

**Live revamped site:** https://bingemind.github.io/daksm-industrial/
**Original site (content source):** https://daskmindustries.netizentech.com/
**Local extracted assets:** ~/Desktop/daskm-extraction/

The revamped site already has a polished design — hero, about, certifications, contact.
The products section exists as a skeleton but has NO real product data.

YOUR MISSION: Populate the products section with all 11 real products from the original
site, build individual product detail pages for each, wire up all local images/assets,
and ensure the navigation and routing work correctly across the full multi-page structure.

Do NOT redesign anything. Do NOT change colours, fonts, or layout decisions already made.
Extend and integrate — never replace.

---

## BEFORE YOU WRITE A SINGLE LINE OF CODE

Run these commands first to understand exactly what you are working with:

```bash
# 1. Understand the project structure
find . -type f | grep -v node_modules | grep -v .git | sort

# 2. Read the main HTML entry point
cat index.html

# 3. Check what CSS/JS files exist and their structure
ls -la public/ 2>/dev/null || ls -la assets/ 2>/dev/null || ls -la src/ 2>/dev/null

# 4. Check what images were extracted from the old site
ls ~/Desktop/daskm-extraction/media/
ls ~/Desktop/daskm-extraction/raw-site/images/ 2>/dev/null

# 5. Check if structured product data exists from extraction
cat ~/Desktop/daskm-extraction/structured-data/products.json 2>/dev/null | head -200
cat ~/Desktop/daskm-extraction/structured-data/site-content.json 2>/dev/null | head -100

# 6. Check for package.json to understand build system
cat package.json 2>/dev/null

# 7. Check for any existing router or page system
grep -r "router\|page\|route\|href" index.html | head -30
```

Report what you find before proceeding. Specifically:
- What is the tech stack? (Vanilla HTML/CSS/JS, React, Vue, Vite, etc.)
- Where are existing assets stored? (public/, assets/, src/assets/, etc.)
- Does the site use a build system or is it static HTML?
- What does the current products section look like in the HTML?
- How many images were extracted to the local media folder?

Do not proceed to Phase 1 until you have answered all of the above.

---

## PRODUCT DATA — THE SOURCE OF TRUTH

These are the 11 products from the original site. Every detail below must be preserved.
This is structured content extracted from https://daskmindustries.netizentech.com/

```json
{
  "products": [

    {
      "id": "ball-valve",
      "name": "Ball Valve",
      "category": "Industrial Valves",
      "slug": "ball-valves",
      "source_page": "ball-valves.html",
      "tagline": "Full bore and reduced bore ball valves for critical flow control",
      "description": "DASKM ball valves are manufactured from cast steel and forged steel bodies, designed for tight shut-off in pipeline systems across oil & gas, chemical, and petrochemical industries. Available in full bore and reduced bore configurations. Suitable for high-pressure and high-temperature service.",
      "specifications": {
        "sizes": "1/2\" to 24\"",
        "pressure_class": "Class 150 to Class 2500",
        "material": "Carbon Steel (A216 WCB), Stainless Steel (CF8, CF8M), Alloy Steel",
        "ends": "Flanged, Butt Weld, Socket Weld, Screwed",
        "operation": "Manual Handwheel, Gear Operated, Pneumatic Actuated, Electric Actuated",
        "standards": "API 6D, BS 5351, ASME B16.34",
        "testing": "API 598, API 6D"
      },
      "applications": ["Oil & Gas Pipelines", "Chemical Plants", "Petrochemical", "Power Generation", "Water Treatment"],
      "image_filename": "cold-welding-01.jpg",
      "highlight": "Zero leakage shut-off"
    },

    {
      "id": "butterfly-valve",
      "name": "Butterfly Valve",
      "category": "Industrial Valves",
      "slug": "butterfly-valves",
      "source_page": "butterfly-valves.html",
      "tagline": "Concentric and double-offset butterfly valves for large diameter pipelines",
      "description": "DASKM butterfly valves offer reliable flow control for large diameter pipelines. Available in concentric, double-offset, and triple-offset configurations. Ideal for isolation and throttling service in water, HVAC, and industrial process applications. Wafer and lug body styles available.",
      "specifications": {
        "sizes": "2\" to 72\"",
        "pressure_class": "Class 150 to Class 600",
        "material": "Cast Iron, Ductile Iron, Carbon Steel, Stainless Steel",
        "ends": "Wafer, Lug, Flanged",
        "operation": "Lever, Gear Operated, Pneumatic Actuated, Electric Actuated",
        "standards": "API 609, BS 5155, EN 593",
        "testing": "API 598"
      },
      "applications": ["Water Treatment", "HVAC", "Chemical Processing", "Food & Beverage", "Marine"],
      "image_filename": "cold-welding-02.jpg",
      "highlight": "Low pressure drop design"
    },

    {
      "id": "gate-valve",
      "name": "Gate Valve",
      "category": "Industrial Valves",
      "slug": "gate-valves",
      "source_page": "gate-valves.html",
      "tagline": "Solid and flexible wedge gate valves for full bore flow",
      "description": "DASKM gate valves are designed for on/off service where minimum flow restriction is required. Manufactured with solid wedge, flexible wedge, and split wedge disc designs. Available in rising stem and non-rising stem configurations. Suitable for steam, water, gas, and oil services.",
      "specifications": {
        "sizes": "1/2\" to 48\"",
        "pressure_class": "Class 150 to Class 2500",
        "material": "Carbon Steel (A216 WCB), Alloy Steel (A217 WC6, WC9), Stainless Steel",
        "ends": "Flanged, Butt Weld, Socket Weld",
        "operation": "Handwheel, Gear Operated, Motor Actuated",
        "standards": "API 600, API 603, ASME B16.34, BS 1414",
        "testing": "API 598"
      },
      "applications": ["Refineries", "Petrochemical Plants", "Power Plants", "Oil & Gas", "Steam Lines"],
      "image_filename": "cold-welding-03.jpg",
      "highlight": "Full bore, minimal restriction"
    },

    {
      "id": "globe-valve",
      "name": "Globe Valve",
      "category": "Industrial Valves",
      "slug": "globe-valves",
      "source_page": "globe-valve.html",
      "tagline": "Precision throttling and flow regulation for critical process lines",
      "description": "DASKM globe valves provide excellent throttling capability and precise flow regulation. Available in T-pattern, Y-pattern, and angle pattern configurations. Designed for high-pressure steam, feed water, and corrosive fluid service. Bellows seal option available for fugitive emission control.",
      "specifications": {
        "sizes": "1/2\" to 16\"",
        "pressure_class": "Class 150 to Class 2500",
        "material": "Carbon Steel, Alloy Steel, Stainless Steel, Duplex Steel",
        "ends": "Flanged, Butt Weld, Socket Weld",
        "operation": "Handwheel, Gear Operated, Pneumatic/Electric Actuated",
        "standards": "BS 1873, ASME B16.34, API 623",
        "testing": "API 598"
      },
      "applications": ["Power Generation", "Chemical Processing", "Cryogenic Service", "High Pressure Steam", "Feed Water Systems"],
      "image_filename": "cold-welding-04.jpg",
      "highlight": "Superior throttling control"
    },

    {
      "id": "non-return-valve",
      "name": "Non Return Valve",
      "category": "Industrial Valves",
      "slug": "non-return-valves",
      "source_page": "non-return-valves.html",
      "tagline": "Check valves preventing reverse flow in critical pipeline systems",
      "description": "DASKM non-return (check) valves prevent backflow in pipeline systems, protecting pumps, compressors, and process equipment. Available in swing check, tilting disc, dual plate, and piston lift configurations. Designed for oil, gas, steam, and water services.",
      "specifications": {
        "sizes": "1/2\" to 48\"",
        "pressure_class": "Class 150 to Class 2500",
        "material": "Carbon Steel (A216 WCB), Stainless Steel, Alloy Steel",
        "ends": "Flanged, Butt Weld, Wafer",
        "operation": "Automatic (self-acting)",
        "standards": "API 594, API 6D, BS 5153",
        "testing": "API 598"
      },
      "applications": ["Pump Protection", "Compressor Outlets", "Oil & Gas Pipelines", "Water Treatment", "Power Plants"],
      "image_filename": "cold-welding-01.jpg",
      "highlight": "Automatic backflow prevention"
    },

    {
      "id": "diaphragm-valve",
      "name": "Diaphragm Valve",
      "category": "Industrial Valves",
      "slug": "diaphragm-valves",
      "source_page": "diaphragm-valve.html",
      "tagline": "Weir and straight-through diaphragm valves for corrosive media",
      "description": "DASKM diaphragm valves use a flexible diaphragm to control flow, making them ideal for corrosive, abrasive, and contamination-sensitive applications. Available in weir type and full bore straight-through designs. The valve body never contacts the process fluid directly, eliminating leakage paths.",
      "specifications": {
        "sizes": "1/2\" to 12\"",
        "pressure_class": "Up to 150 PSI",
        "material": "Cast Iron, Carbon Steel, Stainless Steel, PVDF, PP",
        "diaphragm_material": "Natural Rubber, EPDM, PTFE, Butyl, Neoprene",
        "ends": "Flanged, Threaded, Butt Weld",
        "operation": "Handwheel, Pneumatic Actuated",
        "standards": "BS 5156, ISO 16138",
        "testing": "API 598"
      },
      "applications": ["Pharmaceutical", "Food & Beverage", "Chemical Processing", "Water Treatment", "Slurry Lines"],
      "image_filename": "cold-welding-02.jpg",
      "highlight": "Zero body-fluid contact"
    },

    {
      "id": "plug-valve",
      "name": "Plug Valve",
      "category": "Industrial Valves",
      "slug": "plug-valves",
      "source_page": "plug-valve.html",
      "tagline": "Lubricated and non-lubricated plug valves for natural gas and process lines",
      "description": "DASKM plug valves provide reliable shut-off for natural gas distribution, refinery, and petrochemical service. Available in lubricated and non-lubricated (sleeved) configurations. Multi-port designs available for flow diversion applications. Compact design with low operating torque.",
      "specifications": {
        "sizes": "1/2\" to 24\"",
        "pressure_class": "Class 150 to Class 900",
        "material": "Carbon Steel, Cast Iron, Ductile Iron, Stainless Steel",
        "ends": "Flanged, Threaded, Butt Weld",
        "operation": "Lever, Gear Operated, Pneumatic/Electric Actuated",
        "standards": "API 599, BS 5353",
        "testing": "API 598"
      },
      "applications": ["Natural Gas Distribution", "Refinery", "Petrochemical", "Onshore/Offshore Pipelines", "Flow Diversion"],
      "image_filename": "cold-welding-03.jpg",
      "highlight": "Quarter-turn operation"
    },

    {
      "id": "strainer",
      "name": "Strainer",
      "category": "Industrial Valves",
      "slug": "strainers",
      "source_page": "strainer.html",
      "tagline": "Y-type and basket strainers protecting downstream equipment",
      "description": "DASKM strainers protect pumps, meters, control valves, and other downstream equipment from pipeline debris. Available in Y-type and basket configurations. Interchangeable screens in various mesh sizes. Suitable for steam, water, oil, gas, and chemical service.",
      "specifications": {
        "sizes": "1/2\" to 24\"",
        "pressure_class": "Class 150 to Class 1500",
        "material": "Carbon Steel, Stainless Steel, Cast Iron",
        "screen_material": "Stainless Steel 304/316",
        "mesh_sizes": "20 mesh to 100 mesh",
        "ends": "Flanged, Screwed, Socket Weld",
        "standards": "ASME B16.34",
        "testing": "API 598"
      },
      "applications": ["Pump Protection", "Steam Systems", "Water Lines", "Chemical Plants", "Refineries"],
      "image_filename": "cold-welding-04.jpg",
      "highlight": "Interchangeable screen elements"
    },

    {
      "id": "industrial-gaskets",
      "name": "Industrial Gaskets",
      "category": "Sealing Solutions",
      "slug": "industrial-gaskets",
      "source_page": "industrial-gaskets.html",
      "tagline": "Spiral wound, ring joint, and sheet gaskets for all flange types",
      "description": "DASKM industrial gaskets provide reliable sealing solutions for all pipeline flange connections. Range includes spiral wound gaskets, ring type joint (RTJ) gaskets, compressed asbestos fibre (CAF) sheets, and non-asbestos compressed fibre sheets. Manufactured to ASME, API, and DIN standards.",
      "specifications": {
        "types": "Spiral Wound, Ring Type Joint, Full Face, Raised Face",
        "materials": "Compressed Asbestos Fibre (CAF), Non-Asbestos Fibre, Stainless Steel 304/316, Graphite",
        "sizes": "1/2\" to 60\" NB",
        "pressure_class": "Class 150 to Class 2500 / ANSI B16.20, B16.21",
        "temperature": "Up to 500°C depending on material",
        "standards": "ASME B16.20, ASME B16.21, API 601"
      },
      "applications": ["Flange Sealing", "Heat Exchangers", "Pressure Vessels", "Pipelines", "Valves"],
      "image_filename": "cold-welding-01.jpg",
      "highlight": "Full range of flange standards"
    },

    {
      "id": "gland-packings",
      "name": "Non-Asbestos Braided Gland Packings",
      "category": "Sealing Solutions",
      "slug": "gland-packings",
      "source_page": "non-asbestos-braided-gland-packings.html",
      "tagline": "High-performance braided packing for valve stems and pump shafts",
      "description": "DASKM braided gland packings provide effective sealing for valve stems, pump shafts, and rotating equipment. Available in PTFE, graphite, aramid fibre, and carbon fibre compositions. Non-asbestos formulations comply with environmental and safety regulations. Supplied in ring sets or cut-to-length coils.",
      "specifications": {
        "types": "Braided PTFE, Graphite Packing, Aramid Fibre, Carbon Fibre, Synthetic Yarn",
        "sizes": "3mm to 50mm cross-section",
        "temperature": "PTFE: -200°C to +260°C, Graphite: up to +600°C",
        "pressure": "Up to 350 bar depending on type",
        "supply_form": "Ring Sets, Metre Lengths, Coils",
        "standards": "Non-asbestos compliant, RoHS compliant"
      },
      "applications": ["Valve Stem Sealing", "Pump Shafts", "Agitators", "Compressor Rods", "Rotating Equipment"],
      "image_filename": "cold-welding-02.jpg",
      "highlight": "Non-asbestos, environmentally safe"
    },

    {
      "id": "cold-welding-compound",
      "name": "Cold Welding Compound",
      "category": "Sealing Solutions",
      "slug": "cold-welding-compound",
      "source_page": "cold-weldingc-compound.html",
      "tagline": "Two-component epoxy compounds for metal repair without heat",
      "description": "DASKM cold welding compounds are two-component metal-filled epoxy systems for repairing cracks, holes, and worn surfaces in metallic equipment — without the need for welding equipment or hot work permits. Suitable for emergency repairs on valves, pipes, pumps, and castings. Sets in 30–60 minutes at room temperature.",
      "specifications": {
        "type": "Two-Component Epoxy Metal Compound",
        "base_filler": "Steel, Aluminium, Titanium, Ceramic variants available",
        "mix_ratio": "2:1 (by volume)",
        "set_time": "30–60 minutes at 25°C",
        "full_cure": "24 hours at 25°C",
        "temperature_resistance": "Up to 120°C (continuous), 180°C (intermittent)",
        "compressive_strength": "Over 800 kg/cm²",
        "packaging": "250g, 500g, 1kg kits"
      },
      "applications": ["Pipe Crack Repair", "Pump Casing Repair", "Valve Body Repair", "Casting Defect Filling", "Emergency Maintenance"],
      "image_filename": "cold-welding-04.jpg",
      "highlight": "No hot work permit required"
    }

  ]
}
```

---

## PHASE 1 — COPY LOCAL ASSETS INTO PROJECT

All images downloaded from the original site are in:
`~/Desktop/daskm-extraction/media/`

Copy the relevant product images into the project's public/images directory:

```bash
# Identify the correct images directory (check what exists first)
# It is likely one of:
#   public/images/
#   assets/images/
#   src/assets/images/
# Use whatever directory already contains images in the project.

# Copy product images (adjust destination to match your project structure)
cp ~/Desktop/daskm-extraction/media/cold-welding-01.jpg public/images/products/
cp ~/Desktop/daskm-extraction/media/cold-welding-02.jpg public/images/products/
cp ~/Desktop/daskm-extraction/media/cold-welding-03.jpg public/images/products/
cp ~/Desktop/daskm-extraction/media/cold-welding-04.jpg public/images/products/

# If those specific files are not found, list what IS available:
ls ~/Desktop/daskm-extraction/media/ | grep -v "^$"
# Then map available files to the products above using the image_filename fields.

# Also copy the logo for reference
cp ~/Desktop/daskm-extraction/media/logo.png public/images/daskm-logo-original.png
cp ~/Desktop/daskm-extraction/media/footar-logo.png public/images/daskm-footer-logo.png
```

If any image file is missing, use the next available product image as a placeholder.
Log every substitution clearly as a comment in the code.

---

## PHASE 2 — ARCHITECTURE DECISION

Before building, determine the right approach based on the tech stack you found:

### IF the site is Vanilla HTML (no build system):
- Create one HTML file per product: `products/ball-valve.html`, `products/butterfly-valve.html`, etc.
- Create a products listing page: `products/index.html`
- Update navigation in `index.html` to link to `products/index.html`
- Share a common `styles.css` and `nav-include` pattern

### IF the site uses a JS framework (React, Vue, Svelte) or Vite:
- Create a `products` data file: `src/data/products.js` (use the JSON above)
- Create a `ProductCard` component for the grid
- Create a `ProductDetail` component/page for individual product pages
- Use the existing router if one exists, or implement a simple hash-based router
- Update the nav to include a "Products" link pointing to `/products` or `#products`

### IF the site is a single HTML file with JS sections:
- Extract the products section into a dedicated page approach using JS-rendered content
- Load product data from a `products.js` data file
- Use URL hash routing: `index.html#products`, `product.html?id=ball-valve`

**In all cases:** The product detail page URL must be bookmarkable and shareable.
A procurement manager must be able to send a colleague a direct link to
"https://bingemind.github.io/daksm-industrial/products/ball-valve" (or equivalent)
and have it work correctly.

---

## PHASE 3 — PRODUCTS LISTING PAGE

Build a `/products` page or section with the following structure:

### Layout Requirements

**Page Header:**
- Headline: "Our Product Range"
- Subheadline: "11 product lines engineered for oil & gas, petrochemical, power generation, and industrial process applications"
- Do not add a hero image here — keep it clean and functional

**Category Filters (above the grid):**
- Two filter buttons: "Industrial Valves" and "Sealing Solutions"
- Plus "All Products" as default
- Clicking a filter shows only products in that category
- Active filter button is visually highlighted (use existing site accent colour)

**Product Grid:**
- 3 columns on desktop, 2 on tablet, 1 on mobile
- Each card contains:
  - Product image (from local assets, mapped above)
  - Category label (small tag — "Industrial Valves" or "Sealing Solutions")
  - Product name (H3)
  - One-line highlight (the `highlight` field from the data)
  - "View Details →" button that links to the product detail page
- Cards match the existing site's card style — same border-radius, same shadow depth, same typography

**Design rule:** Do not invent a new card design. Look at what card style already exists
on the site (in the certifications or about section) and replicate that exact pattern.

---

## PHASE 4 — PRODUCT DETAIL PAGES

Each product gets its own detail page. Build a reusable template — not 11 separate
hand-coded pages. Use one template + data, rendered per product.

### Product Detail Page Structure (in order, top to bottom):

**1. Breadcrumb navigation**
`Home > Products > [Product Name]`
All breadcrumb links must be functional.

**2. Product hero strip**
- Product name as H1
- Category tag
- Tagline (italic, subdued colour)
- Product image (full width on mobile, 50% on desktop beside the specs)

**3. Description block**
- H2: "Overview"
- Full description paragraph from the `description` field

**4. Specifications table**
- H2: "Technical Specifications"
- Two-column table: Specification | Value
- All key-value pairs from the `specifications` object
- Table must be styled to match the existing site's table or comparison section style
- On mobile: table stacks or scrolls horizontally

**5. Applications list**
- H2: "Typical Applications"
- Render as a clean tag/chip list or bulleted list from the `applications` array
- Use a subtle background pill style (matching existing site's badge/chip aesthetic)

**6. Call to Action block**
- H2: "Request a Quote or Datasheet"
- Two buttons side by side:
  - Primary: "WhatsApp Enquiry" → `https://wa.me/9821031129?text=Hello DASKM, I would like to enquire about your [PRODUCT NAME].`
  - Secondary: "Send Email Enquiry" → `mailto:daskmindustries@gmail.com?subject=Enquiry — [PRODUCT NAME]&body=Hello DASKM Team, I would like to enquire about [PRODUCT NAME].`
- Replace [PRODUCT NAME] dynamically with the actual product name

**7. Related Products strip**
- H2: "Other Products"
- Show 3 other product cards (same category first, then others)
- "View All Products →" link at the end

**Design rule:** The product detail page must feel like a natural extension of the
existing site — same background colour, same font sizes, same spacing rhythm.
Never introduce a new font, a new colour, or a new component pattern.

---

## PHASE 5 — NAVIGATION UPDATE

Update the main navigation to include Products properly:

```
Logo | Products | About | Certifications | Contact | [Get Quote CTA]
```

- "Products" links to the products listing page
- On mobile hamburger menu, Products is the first item after the logo
- If the site currently has a "Products" nav item pointing to `#products`,
  update it to point to the new products page URL
- The "Get Quote" CTA button in the nav remains unchanged

**Active state:** When on any product page or the products listing page,
the "Products" nav link should have the active/current visual state.

---

## PHASE 6 — SEO & META TAGS

Add proper meta tags to every product page. This matters for B2B buyers
who find products via search.

For each product page, set:
```html
<title>[Product Name] | DASKM Engineering Industries</title>
<meta name="description" content="[First sentence of product description]. Contact DASKM for specifications and pricing.">
<meta property="og:title" content="[Product Name] | DASKM Engineering Industries">
<meta property="og:description" content="[Tagline]">
<meta property="og:url" content="https://bingemind.github.io/daksm-industrial/products/[slug]">
```

Also add to the products listing page:
```html
<title>Industrial Valves & Sealing Products | DASKM Engineering Industries</title>
<meta name="description" content="11 product lines — ball valves, gate valves, butterfly valves, globe valves, strainers, industrial gaskets, and more. ISO 9001:2015 certified.">
```

---

## PHASE 7 — QUALITY CHECKLIST

Before declaring the task complete, verify every item below. Do not mark complete
until you have personally tested each one:

### Functional checks
- [ ] Products listing page loads at a clean URL
- [ ] All 11 products appear on the listing page
- [ ] Category filter buttons work (All / Industrial Valves / Sealing Solutions)
- [ ] Clicking any product card navigates to the correct product detail page
- [ ] Product detail page shows: name, image, description, specifications table, applications, CTA buttons
- [ ] WhatsApp CTA on product detail pre-fills the product name correctly
- [ ] Email CTA on product detail pre-fills the subject line correctly
- [ ] Breadcrumb "Home" link works
- [ ] Breadcrumb "Products" link works
- [ ] "Other Products" strip shows 3 cards that link to their respective detail pages
- [ ] "View All Products →" link works
- [ ] Main nav "Products" link goes to the products listing page
- [ ] Back button from product detail returns to products listing (browser history works)

### Visual checks
- [ ] Product card style matches the existing site's component style
- [ ] Product detail page uses the same background, fonts, and spacing as the rest of the site
- [ ] Specifications table is readable on mobile
- [ ] Images load (no broken image icons anywhere)
- [ ] No new colours introduced that are not in the existing site's palette
- [ ] Dark/light theme toggle (if it exists on the site) works on all new pages

### Content checks
- [ ] All 11 product names match the list above exactly
- [ ] Each product's description is present and not truncated
- [ ] Each product's specifications table shows all fields
- [ ] Applications list is present for all products
- [ ] Product image shown is appropriate (not blank, not a broken reference)

---

## IMPORTANT CONSTRAINTS — READ BEFORE STARTING

1. **Do not redesign.** The existing site's visual design is approved. Your job is
   integration and extension, not redesign.

2. **Do not use placeholder text.** Every product name, description, specification,
   and application must come from the product data above. No "Lorem ipsum" anywhere.

3. **Image fallback rule.** If a product image file is missing from the local assets,
   use the next available real product image rather than a broken `<img>` tag or a
   grey placeholder box. Log the substitution as a code comment.

4. **Routing must work on GitHub Pages.** GitHub Pages serves static files.
   If using a SPA router, ensure the `404.html` redirect trick is implemented
   so direct URL access to product pages works.
   Reference: https://github.com/rafgraph/spa-github-pages

5. **WhatsApp links must be click-to-open, not embedded iframes.** The wa.me
   link format is correct for this. Do not use WhatsApp widget embeds.

6. **Do not break existing sections.** The hero, about, certifications, and contact
   sections are already built and approved. Leave them completely untouched.

7. **Mobile first.** Build product pages mobile-first. The primary buyer demographic
   (plant engineers and procurement managers in India) frequently accesses sites
   on mobile. Test every layout at 375px width before declaring done.

---

## DELIVERABLES

When complete, provide:

1. A summary of every file created or modified
2. The exact URL structure for all product pages
3. A count: "X of 11 products successfully integrated"
4. Any image substitutions made (which product used which fallback image)
5. Any decisions made during Phase 2 (architecture choice and why)
6. Instructions for pushing the changes to GitHub Pages

---

## NOTES

- The product data above was assembled from the original site content. If the
  extracted JSON at `~/Desktop/daskm-extraction/structured-data/products.json`
  contains additional or different content, use that as a supplement — not a
  replacement — for the data above.
- The original site used the same 4 images (`cold-welding-01` through `cold-welding-04`)
  for multiple products. This is expected. Better product-specific images can be
  added later by the client.
- The client's phone number for WhatsApp is: +91 9821031129
- The client's email is: daskmindustries@gmail.com
- Company address: C-4,1603, Harihar, Madhav Sankalp, Wayale Nagar, Kalyan (W),
  Thane - 421301, Maharashtra, India

---

## PHASE 8 — PERFORMANCE & POLISH

### Image optimisation
- Add `loading="lazy"` to all product images on the listing page
- First visible product image: use `loading="eager"`
- Add explicit `width` and `height` attributes to prevent layout shift

### Scroll behaviour
- On product detail page load: `window.scrollTo(0, 0)`
- Smooth scroll for all in-page anchors

### Transitions
- Match the existing site's scroll animations and card hover states exactly
- Do NOT introduce any new animation or transition style

### Standalone data file (vanilla HTML)
Create `public/js/products-data.js` as the single source of truth.
Import it on both the listing page and detail page with a script tag.
Never hardcode product data directly in HTML files.

### Product catalogue PDF
Check if it was captured:
```bash
ls -lh ~/Desktop/daskm-extraction/pdfs/
```
If valid (over 100KB), copy to `public/downloads/daskm-product-catalogue.pdf`
and add a "Download Full Catalogue" secondary button on the products listing page.


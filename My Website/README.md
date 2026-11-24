# 🌊 Ocean Life Discovery Website

> **Academic Laboratory Project: Web Systems & Information Engineering**  
> **Topic:** Marine species, ocean ecosystems, underwater galleries, and awareness sections.  
> **Compliance:** Strict adherence to Times New Roman, 10px base font size, justified alignment, HTML5 semantics, external CSS Flexbox/Grid, 7 interactive JavaScript features, DOM manipulation, form validation, and well-formed XML data modeling.

---

## 📌 Project Overview

The **Ocean Life Discovery Website** is a comprehensive educational and empirical web portal dedicated to marine biodiversity, vertical oceanographic stratification, sub-surface optical photogrammetry, and global anthropogenic threat mitigation.

### 🌟 Key Features

1. **5 Interconnected HTML5 Pages:**
   - [`index.html`](index.html): Hero portal, project overview, core pillars, and bathymetric physical profile table.
   - [`species.html`](species.html): Taxonomic species catalog with live search, category filtering, specimen modals, and an integrated XML database viewer.
   - [`ecosystems.html`](ecosystems.html): Marine biomes breakdown with an **Interactive Bathymetric Depth & Hydrostatic Pressure Simulator**.
   - [`gallery.html`](gallery.html): Sub-surface optical photogrammetry registry with an **Interactive Modal Lightbox** supporting keyboard controls and metadata extraction.
   - [`awareness.html`](awareness.html): Planetary threat matrix, **Interactive Ocean Literacy Quiz** with algorithmic scoring, and a **Validated Citizen Science Stewardship Form** with real-time error feedback and confirmation modal.

2. **Styling & Typography Specification:**
   - **Font Family:** `'Times New Roman', Times, serif`
   - **Font Size:** `10px` base (with proportional root scaling for legibility)
   - **Alignment:** `justify` (`text-align: justify; text-justify: inter-word;`)
   - **Layout Systems:** Modern CSS Flexbox (navigation, controls, forms, footers) and CSS Grid (species cards, biomes, galleries, readout dashboards).

3. **JavaScript Interactive Capabilities (DOM Manipulation):**
   - **Feature 1:** Real-time search query filtering and taxonomic category isolation with dynamic card count updates.
   - **Feature 2:** Native W3C `DOMParser` asynchronous XML data processor rendering structured biological records into an interactive HTML table.
   - **Feature 3:** Live Bathymetric Depth & Hydrostatic Pressure Simulator with mathematical calculations ($P = 1 + d/10\text{ atm}$, psi conversion, irradiance attenuation, and dynamic CSS background gradient darkening).
   - **Feature 4:** Full-featured optical Lightbox Modal with Next/Prev looping, image zoom, metadata bar, and keyboard shortcuts (`Escape`, `ArrowLeft`, `ArrowRight`).
   - **Feature 5:** Interactive Ocean Literacy Quiz with instant answer evaluation, score percentage calculation, and dynamic diagnostic feedback.
   - **Feature 6:** Client-side Form Validation with RFC email regex, string length verification, category selection validation, checkbox requirement, live character counter, and dynamic confirmation modal with unique reference codes (`OCD-2026-XXXXXX`).

4. **Structured XML Biological Database (`marine_data.xml`):**
   - Well-formed hierarchical XML structure adhering to W3C standards.
   - Demonstrates taxonomic modeling across marine classes (Mammalia, Reptilia, Actinopterygii, Chondrichthyes, Mollusca, Cnidaria).

---

## 📂 Project Directory Structure

```text
c:\Users\ASUS\OneDrive\Desktop\My Website\
├── index.html            # Home page: Introduction, Highlights & Ocean Strata Table
├── species.html          # Marine Species Directory & XML Data Explorer
├── ecosystems.html       # Ocean Ecosystems & Interactive Depth Simulator
├── gallery.html          # Underwater Galleries & Interactive Lightbox Modal
├── awareness.html        # Conservation, Eco-Quiz & Validated Pledge Form
├── marine_data.xml       # Well-Formed XML Marine Database (10 Species Records)
├── PROJECT_REPORT.html   # Complete Printable Lab Project Report with Front Page & Code
├── README.md             # Project Documentation & GitHub Deployment Guide
├── css/
│   └── style.css         # External Master Stylesheet (Times New Roman, 10px, Justify)
└── js/
    └── script.js         # Master JavaScript Engine (Interactive Features & Validation)
```

---

## 🚀 How to Run the Website Locally

### One-click in VS Code

1. Open the project folder in VS Code.
2. Press `Ctrl+Shift+B`, or open **Terminal → Run Build Task**.
3. Choose **Run Ocean Life Website** if prompted.
4. Your default browser opens at `http://127.0.0.1:5500`.
5. Press `Ctrl+C` in the VS Code terminal to stop the server.

The task uses Python 3's built-in HTTP server. If `py` or `python` is not recognized, install Python 3 and enable **Add Python to PATH**.

1. **Directly in Any Browser:**
   - Double-click `index.html` to open the website in Chrome, Firefox, Edge, or Safari.
   - All interactive features (including the XML parser, depth simulator, lightbox, quiz, and form validation) are fully functional out of the box.

2. **Using a Local Development Server (Recommended):**
   ```bash
   # Using Python 3 built-in server:
   python -m http.server 8000
   # Open browser at: http://localhost:8000
   ```

---

## 🌐 Uploading to GitHub (Guideline 7)

The local folder has already been initialized and committed with Git. Follow these simple steps to push to your GitHub account:

```bash
# 1. Open Terminal/PowerShell in this directory:
cd "c:\Users\ASUS\OneDrive\Desktop\My Website"

# 2. Add your GitHub remote repository (replace with your repo URL):
git remote add origin https://github.com/<YOUR_USERNAME>/ocean-life-discovery.git

# 3. Rename branch to main and push:
git branch -M main
git push -u origin main
```

### 🛰️ Enabling Free GitHub Pages Hosting:
1. Navigate to your repository on GitHub.
2. Go to **Settings** &rarr; **Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Select `main` branch and `/ (root)` folder, then click **Save**.
5. Your website will be live at `https://<YOUR_USERNAME>.github.io/ocean-life-discovery/`!

---

## 📑 Lab Report Document (`PROJECT_REPORT.html`)
Open [`PROJECT_REPORT.html`](PROJECT_REPORT.html) in your browser. It includes:
- Formal academic Front Page (Title, Student Name, Roll No, Evaluation Matrix).
- Project Compliance Matrix mapping to all 8 assignment guidelines.
- Screenshot output representations with formal figure captions:
  - `fig1: Caption of the figure - Home Page (index.html) ...`
  - `fig2: Caption of the figure - Marine Species Directory (species.html) ...`
  - `fig3: Caption of the figure - XML Database Integration (species.html) ...`
  - `fig4: Caption of the figure - Ocean Ecosystems Page (ecosystems.html) ...`
  - `fig5: Caption of the figure - Underwater Galleries Page (gallery.html) ...`
  - `fig6: Caption of the figure - Awareness Portal (awareness.html) ...`
  - `fig7: Caption of the figure - Form Validation Subsystem (awareness.html) ...`
- Complete, verbatim source code listings for all files.
- Single-click **Print / Save as PDF** button formatted for standard A4 margins.

---
*Developed for Academic Laboratory Project Submission &bull; Ocean Life Discovery Project &bull; Year 2026*

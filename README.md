# PollyDevelopment // Google Review NFC Tags Showcase

> **Google Review NFC tags voor bedrijven in Nederland en België**  
> Ontworpen volgens de **Awwwards & The Kitchen** standaard (`dqnamo.com/kitchen`) met tastbaar skeuomorfisme 2.0, interactieve 3D hardware physics, smartphone tap simulatie en zero-latency Web Audio micro-haptics.

🌐 **Live Deployment:** [https://nfctester.pages.dev](https://nfctester.pages.dev)  
📦 **Originele Pagina:** [https://googlereview.pollydevelopment.nl/](https://googlereview.pollydevelopment.nl/)

---

## ⚡ Direct Starten (1-Klik op macOS)

- **Optie 1 (Aanbevolen):** Dubbelklik op **`start-local.command`** in deze map.  
  *(Opent automatisch de terminal, start Next.js Turbopack en opent `http://localhost:3001` in je browser).*
- **Optie 2:** Via de terminal:
  ```bash
  npm install
  npm run dev
  ```
  Open daarna [http://localhost:3000](http://localhost:3000) (of de poort die Next.js toewijst) in je browser.

---

## 💎 Belangrijkste Features & Componenten

1. **Interactieve Smartphone Tap Demo (`InteractiveTapDemoPhone.tsx`):**
   - 3-tier motion architectuur: scroll-scrubbing + magnetische sine-wave levitatie + realtime muiscursor 3D tilt.
   - Glanslicht shimmer-sweep over het oppervlak bij binnenkomst en kleurwisselingen.
   - Virtuele smartphone met statusbar, dynamic island en 13.560 MHz inductie-radar.
   - Bij een tap verschijnt de native notificatie en opent de 5-sterren review dialoog met confetti en akoestische micro-haptics.

2. **Hardware Telemetrie & Impact Index (`ImpactMetricsRibbon.tsx`):**
   - 4 live telemetrie-meters met cursor-volgende `SpotlightCard` dynamische verlichting:
     - `+38% REVIEW GROEI`: Gemeten toename binnen 30 dagen bij retail en horeca.
     - `< 15 MS INDUCTIESNELHEID`: Zero-latency HF inductieoverdracht zonder aparte app.
     - `100.000+ SCANS GEGARANDEERD`: Industriële EEPROM retentie met hardwarematige write-lock.
     - `0 KB DATA RETENTIE`: Directe deep-link naar de Google dialoog (geen tussenliggende servers).

3. **3D Showroom & Huisstijl Studio (`ReviewProductShowroom.tsx`):**
   - Schakel tussen **NFC Stickers** (30×30 mm of rond Ø 45 mm), **Google Review Kaarten** (CR80 PVC) en **Tafeldisplays** (acryl staand).
   - Realtime kleurwisselaar (Salie, Inkt, Klei, Obsidian), dynamische bedrijfsnaam, logo vector en QR-code switches.
   - **The Kitchen Bonprinter:** Print tastbare kassabonnen en orderbevestigingen met scheurrand.

4. **Interactieve 3-Staps Bento Grid (`InteractiveStepsBento.tsx`):**
   - **Stap 01 (Koppeling):** NXP NTAG215 IC architectuur met permanente write-lock status en oplagestaffels (10, 25, 50+ stuks).
   - **Stap 02 (13.560 MHz Inductie):** Roterende `BorderBeam` lichtstraal en interactieve `[ Test 13.560 MHz Tik ↗ ]` knop met synthetische audio.
   - **Stap 03 (5-Sterren Review):** Interactieve Google Review widget met klikbare gouden sterren en directe feedback.

5. **RF Oscillograaf & Specificatie Matrix (`HardwareOscilloscope.tsx`):**
   - Realtime Canvas Oscillograaf die de 13.560 MHz sinusgolf en ASK-datamodulatie toont met live puls-trigger.
   - Complete specificatiematrix met `[ Kopieer Specs ]` knop.

6. **Joey & Luc Direct Dial Cockpit (`DirectContactTeam.tsx`):**
   - Statusindicator: `● VANDAAG BEREIKBAAR VOOR ADVIES & OFFERTES`.
   - Inzetbare metallic badges (`J.` en `L.`) met compressieve 3D `TactileButton` knoppen (`Bel 06 23916558` en `Bel 06 10635256`).
   - Directe voorgeprogrammeerde WhatsApp-knoppen en klembord-kopieeracties.

7. **Geanimeerde FAQ Accordeon (`FaqAccordion.tsx`):**
   - Soepele `framer-motion` accordeons met categorie-tabs (`ALLE VRAGEN`, `NFC & HARDWARE`, `HUISSTIJL & OPMAAK`, `BESTELLEN & SERVICE`).
   - Synthetische mechanische micro-haptics bij openen en sluiten.

---

## 🛠️ Bouwen voor Productie

```bash
npm run build
```

Hosting verloopt direct via Cloudflare Pages via:
```bash
npx wrangler pages deploy out --project-name=nfctester --branch=main
```

---

## 📜 Licentie & Handelsmerken

PollyDevelopment is een onafhankelijke aanbieder van maatwerk NFC-hardware. Google en het Google-logo zijn geregistreerde handelsmerken van Google LLC.

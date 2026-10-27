# PollyDevelopment // Google Review NFC Tags Showcase

> **Google Review NFC tags voor bedrijven in Nederland en België**  
> Ontworpen volgens de **Awwwards & The Kitchen** standaard (`dqnamo.com/kitchen`) met tastbaar skeuomorfisme 2.0, interactieve 3D hardware physics, smartphone tap simulatie en zero-latency Web Audio micro-haptics.

---

## ⚡ Direct Starten (1-Klik op macOS)

- **Optie 1 (Aanbevolen):** Dubbelklik op **`start-local.command`** in deze map.  
  *(Opent automatisch de terminal, start Next.js Turbopack en opent `http://localhost:3001` in je browser).*
- **Optie 2:** Via de terminal:
  ```bash
  npm run dev
  ```
  Open daarna [http://localhost:3001](http://localhost:3001) in je browser.

---

## 💎 Pagina's & Features

1. **Homepage (`/`):**
   - **Interactieve Smartphone Tap Demo:** Virtuele telefoon met statusbar, dynamic island en real-time NFC-inductie. Bij een tik verschijnt de native notificatie en opent het 5-sterren review formulier met feestelijke confetti en audio micro-haptics.
   - **3D Hardware Studio:** Schakel tussen **NFC Review Stickers** (30×30 mm of rond Ø 45 mm), **Google Review Kaarten** (CR80 PVC) en **Review Tafeldisplays** (acryl staand).
   - **Huisstijl Customizer:** Kies tussen Salie, Inkt, Klei en Obsidian, bewerk de bedrijfsnaam in real-time, wissel logo en QR-code, en flip het product 180° in 3D.
   - **Foto vs. 3D Model:** Wissel direct tussen originele productfoto's en het 3D specimen.
   - **The Kitchen Bonprinter:** Print tastbare orderbevestigingen en proefdruk-bonnen via `ReceiptPrinter`.
   - **Direct bellen:** Directe actieknoppen voor Joey (+31 6 2391 6558) en Luc (+31 6 1063 5256).
   - **FAQ Accordion:** Alle veelgestelde vragen over compatibiliteit, Google-koppeling en levering.

2. **Productfoto’s (`/producten`):**
   - Fotogalerij met de oorspronkelijke hoge-resolutie studio-opnames van alle drie de producten.

---

## 🛠️ Bouwen voor Productie

```bash
npm run build
npm run start
```

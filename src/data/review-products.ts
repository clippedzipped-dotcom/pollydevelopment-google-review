export interface ReviewProduct {
  id: "sticker" | "card" | "display";
  number: string;
  title: string;
  tagline: string;
  description: string;
  formFactor: string;
  dimensions: string;
  chipType: string;
  material: string;
  mounting: string;
  priceNote: string;
  originalImage: string;
  imageAlt: string;
  defaultTitle: string;
  defaultSubtitle: string;
  specs: { label: string; value: string }[];
}

export type ReviewColorSwatch = "sage" | "ink" | "clay" | "obsidian";

export interface ColorSwatchConfig {
  id: ReviewColorSwatch;
  name: string;
  dutchName: string;
  primaryBg: string;
  secondaryBg: string;
  accent: string;
  text: string;
  textColor: string;
  border: string;
  tagline: string;
  cardGradient: string;
}

export const COLOR_SWATCHES: Record<ReviewColorSwatch, ColorSwatchConfig> = {
  sage: {
    id: "sage",
    name: "Salie Groen",
    dutchName: "salie",
    primaryBg: "#506654",
    secondaryBg: "#3D4F40",
    accent: "#8CAE93",
    text: "#EDF2EB",
    textColor: "text-[#EDF2EB]",
    border: "border-[#67826C]",
    tagline: "Natuurlijk, warm & gastvrij. Ideaal voor horeca, boetieks en salons.",
    cardGradient: "from-[#506654] via-[#435747] to-[#36473A]",
  },
  ink: {
    id: "ink",
    name: "Inkt Zwart",
    dutchName: "inkt",
    primaryBg: "#171F1C",
    secondaryBg: "#0F1412",
    accent: "#A4C2A9",
    text: "#F4F6F2",
    textColor: "text-[#F4F6F2]",
    border: "border-[#2A3732]",
    tagline: "Strak, professioneel en modern. Voor zakelijke dienstverlening en retail.",
    cardGradient: "from-[#1F2723] via-[#161B19] to-[#0E1110]",
  },
  clay: {
    id: "clay",
    name: "Klei Terracotta",
    dutchName: "klei",
    primaryBg: "#855743",
    secondaryBg: "#6B4433",
    accent: "#E29B7D",
    text: "#FBF5F2",
    textColor: "text-[#FBF5F2]",
    border: "border-[#A06C55]",
    tagline: "Ambachtelijk, aards en authentiek. Populair bij bakkers, studio's en koffiebars.",
    cardGradient: "from-[#8C5E48] via-[#754C39] to-[#5C392A]",
  },
  obsidian: {
    id: "obsidian",
    name: "Obsidian Gold",
    dutchName: "obsidian",
    primaryBg: "#0C0F0D",
    secondaryBg: "#060807",
    accent: "#FBBC04",
    text: "#FFFFFF",
    textColor: "text-white",
    border: "border-yellow-600/40",
    tagline: "Luxe matzwart met goudfolie accenten. Hoogste contrast en premium uitstraling.",
    cardGradient: "from-[#181C19] via-[#0E110F] to-[#050706]",
  },
};

export const REVIEW_PRODUCTS: Record<"sticker" | "card" | "display", ReviewProduct> = {
  sticker: {
    id: "sticker",
    number: "01",
    title: "NFC review stickers",
    tagline: "Een vaste plek voor feedback.",
    description:
      "Zelfklevend en waterdicht afgewerkt. Voor de balie, deur of het raam. Een tik met een geschikte smartphone opent direct jouw Google reviewlink.",
    formFactor: "Rond Ø 45 mm of Vierkant 30 × 30 mm",
    dimensions: "Ø 45 mm × 1.2 mm (epoxy dome)",
    chipType: "NXP NTAG215 (High-Frequency 13.56 MHz)",
    material: "Waterbestendig Vinyl / Epoxy met 3M anti-metaal laag",
    mounting: "3M 300LSE Industriële Zelfklevende Laag",
    priceNote: "Prijs op aanvraag",
    originalImage: "/images/products/review-sticker.png",
    imageAlt: "Originele productfoto van PollyDevelopment NFC review sticker",
    defaultTitle: "JOUW MENING.",
    defaultSubtitle: "MAAKT VERSCHIL.",
    specs: [
      { label: "CHIP MODULE", value: "NXP NTAG215 (ISO 14443-A)" },
      { label: "FREQUENTIE", value: "13.56 MHz High-Frequency" },
      { label: "AFMETING", value: "Ø 45 mm of 30 × 30 mm" },
      { label: "AFWERKING", value: "Waterdicht Epoxy Dome (IP68)" },
      { label: "ANTI-METAAL", value: "Geïntegreerde ferrietlaag" },
      { label: "COMPATIBILITEIT", value: "iOS 11+ & Android NFC" },
    ],
  },
  card: {
    id: "card",
    number: "02",
    title: "Google Review kaarten",
    tagline: "Klein gebaar. Direct contact.",
    description:
      "Een stevige PVC-kaart in pinpasformaat. Leg hem op de balie of geef je klant de kaart om direct te tappen. Opdruk en oplage in overleg.",
    formFactor: "CR80 Pinpasformaat (ISO/IEC 7810 ID-1)",
    dimensions: "85.60 × 53.98 × 0.84 mm",
    chipType: "NXP NTAG215 / NTAG216 (13.56 MHz)",
    material: "Matte Premium PVC / Policarbonaat met UV-coating",
    mounting: "Draagbaar / Tafelstandaard / Toonbank",
    priceNote: "Prijs op aanvraag",
    originalImage: "/images/products/review-card.png",
    imageAlt: "Originele productfoto van PollyDevelopment Google Review kaart",
    defaultTitle: "GOED GEDAAN?",
    defaultSubtitle: "LAAT HET HOREN.",
    specs: [
      { label: "FORMAAT", value: "CR80 (85.60 × 53.98 × 0.84 mm)" },
      { label: "SUBSTRAAT", value: "High-Grade PVC / Polycarbonaat" },
      { label: "CHIP", value: "NXP NTAG215 (504 Bytes EEPROM)" },
      { label: "LEESBEREIK", value: "0 – 45 mm Contactloos" },
      { label: "STANDAARD", value: "ISO/IEC 14443-A Type 2/4" },
      { label: "BEVEILIGING", value: "Hardware Write-Lock Protected" },
    ],
  },
  display: {
    id: "display",
    number: "03",
    title: "Review tafeldisplays",
    tagline: "Niet te missen op de balie.",
    description:
      "Een Google Review NFC stand voor de kassa, receptie of tafel. Een zichtbare uitnodiging voor bezoekers van horeca, retail en praktijken.",
    formFactor: "L-Shape Staand Tafel- & Baliedisplay",
    dimensions: "120 × 80 × 50 mm (Voet 45 mm)",
    chipType: "Dubbele NXP NTAG215 Spoel + High-Contrast QR",
    material: "Hoogglans Geëxtrudeerd Acryl / Bamboe Hout",
    mounting: "Vrijstaand met rubber antislip voetjes",
    priceNote: "Prijs op aanvraag",
    originalImage: "/images/products/review-display.png",
    imageAlt: "Originele productfoto van PollyDevelopment Review tafeldisplay",
    defaultTitle: "BLIJ MET ONS?",
    defaultSubtitle: "DEEL JE ERVARING.",
    specs: [
      { label: "FORMAAT", value: "120 × 80 × 50 mm L-Display" },
      { label: "MATERIAAL", value: "3 mm Kristalhelder Acryl" },
      { label: "NFC ANTENNE", value: "Grote 50 mm HF Spoel" },
      { label: "QR CODE", value: "Laser-gescherpte contrast print" },
      { label: "BALIE-VOET", value: "Siliconen antislip dempers" },
      { label: "ONDERHOUD", value: "Krasbestendig & desinfecteerbaar" },
    ],
  },
};

export const REVIEW_FAQS = [
  {
    q: "Werkt het met iedere smartphone?",
    a: "Je klant heeft een smartphone met NFC-ondersteuning nodig (alle iPhones vanaf iPhone 7/XS en vrijwel alle moderne Android toestellen). NFC staat op iOS altijd actief. Voor toestellen zonder NFC bevat elk product een haarscherpe QR-code als directe fallback.",
  },
  {
    q: "Moet mijn klant een aparte app installeren?",
    a: "Nee, absoluut niet! Een tik met de telefoon activeert direct de ingebouwde browser van iOS of Android. De klant komt direct terecht op het reviewformulier van jouw Google Bedrijfsprofiel. Om een review te plaatsen is enkel een Google-account nodig.",
  },
  {
    q: "Kunnen de NFC tags in mijn eigen huisstijl?",
    a: "Ja, 100%. We bedrukken de producten volledig in jouw huisstijl: je eigen bedrijfskleuren, vectorlogo en eventueel aangepaste teksten. In de interactieve studio hierboven kun je alvast experimenteren met kleuren, logo's en QR-codes.",
  },
  {
    q: "Welke Google Review tag past het beste bij mijn bedrijf?",
    a: "Een sticker is ideaal voor een vaste plek zoals een entreedeur, raam, menukaart of balie. Een review kaart geef je gemakkelijk mee met de rekening of toonbank. Een tafeldisplay valt direct op bij de kassa, receptie of op horecatafels. Bel ons gerust voor advies!",
  },
  {
    q: "Wat kosten de Google Review NFC tags?",
    a: "De prijs hangt af van het gekozen product, de oplage en de gewenste bedrukking. We leveren zowel kleine oplages (vanaf 1 stuk voor ZZP'ers) als grote volumes voor ketens met meerdere vestigingen. Bel Joey of Luc voor een vrijblijvende prijsopgave op maat.",
  },
  {
    q: "Leveren jullie ook in België?",
    a: "Zeker! Wij leveren aan ondernemers in heel Nederland én België. Bel Joey (+31 6 2391 6558) of Luc (+31 6 1063 5256) om je wensen en de levertijd te bespreken.",
  },
  {
    q: "Hoe werkt het bestelproces?",
    a: "Heel eenvoudig: bel Joey of Luc of stuur een bericht via WhatsApp. Wij helpen je met het opzoeken van je officiële Google Review-link, controleren je logo en sturen je vooraf een digitaal drukvoorbeeld. Pas na jouw akkoord gaan de tags in productie.",
  },
];

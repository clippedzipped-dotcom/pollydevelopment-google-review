"use client";

import React, { useState, useRef, type ChangeEvent } from "react";
import {
  ReviewColorSwatch,
  REVIEW_PRODUCTS,
  COLOR_SWATCHES,
} from "@/data/review-products";
import { GoogleReviewCard3D } from "@/components/review/GoogleReviewCard3D";
import {
  ReceiptPrinter,
  type ReceiptPrinterStage,
} from "@/components/kitchen/ReceiptPrinter";
import {
  Phone,
  MessageSquare,
  Printer,
  Check,
  Sparkles,
  CheckCircle2,
  Utensils,
  Scissors,
  Stethoscope,
  ShoppingBag,
  Wrench,
  Upload,
  X,
  Layers,
  Building2,
  Lock,
} from "lucide-react";
import {
  playMechanicalClick,
  playTabSwitch,
  playConfirmSound,
  playPrinterSound,
  triggerHaptic,
} from "@/helpers/sound-effects";
import { cn } from "@/helpers/classname-helper";

interface ReviewProductShowroomProps {
  onOpenTapDemo?: () => void;
  className?: string;
}

const TIERS = [
  { id: "sample", label: "1 - 5 stuks", sub: "Proefserie" },
  { id: "popular", label: "10 - 25 stuks", sub: "Meest gekozen" },
  { id: "scale", label: "50+ stuks", sub: "Filialen / Horeca" },
];

interface BranchCase {
  id: string;
  name: string;
  icon: React.ElementType;
  sampleBusiness: string;
  recommendedProduct: "sticker" | "card" | "display";
  recommendedColor: ReviewColorSwatch;
  metric: string;
  rating: string;
  story: string;
  backdrop: "studio" | "wood" | "marble" | "metal";
}

const BRANCH_CASES: BranchCase[] = [
  {
    id: "horeca",
    name: "Horeca & Terras",
    icon: Utensils,
    sampleBusiness: "Café de Waag",
    recommendedProduct: "display",
    recommendedColor: "clay",
    metric: "+148 reviews in 3 mnd",
    rating: "4.9 ★ (342)",
    story: "Tafeldisplays op bar & terrastafels: gasten tikken hun telefoon terwijl ze afrekenen.",
    backdrop: "wood",
  },
  {
    id: "salon",
    name: "Kapsalon & Barber",
    icon: Scissors,
    sampleBusiness: "Maison Victor Salon",
    recommendedProduct: "card",
    recommendedColor: "sage",
    metric: "83% tikt direct af",
    rating: "5.0 ★ (188)",
    story: "De stylist houdt de NFC pas voor bij het pinnen. Geen papieren kaartjes meer die kwijtraken.",
    backdrop: "marble",
  },
  {
    id: "zorg",
    name: "Zorg & Tandarts",
    icon: Stethoscope,
    sampleBusiness: "Tandartspraktijk DentCare",
    recommendedProduct: "display",
    recommendedColor: "obsidian",
    metric: "+210 reviews · #1 regio",
    rating: "4.9 ★ (412)",
    story: "Bij de balie bij het plannen van een vervolgafspraak. Patiënten vinden het supergemakkelijk.",
    backdrop: "marble",
  },
  {
    id: "retail",
    name: "Retail & Boetiek",
    icon: ShoppingBag,
    sampleBusiness: "Studio Atelier No. 12",
    recommendedProduct: "sticker",
    recommendedColor: "sage",
    metric: "4x meer recensies",
    rating: "5.0 ★ (129)",
    story: "NFC stickers op de inpakbalie en op herbruikbare tassen. Discreet en stijlvol.",
    backdrop: "metal",
  },
  {
    id: "garage",
    name: "Garage & Vakman",
    icon: Wrench,
    sampleBusiness: "Autobedrijf Van Dijk",
    recommendedProduct: "card",
    recommendedColor: "ink",
    metric: "65 reviews in 6 wkn",
    rating: "4.8 ★ (94)",
    story: "NFC pasje in de sleuteloverdracht-map bij het ophalen van de auto na het onderhoud.",
    backdrop: "metal",
  },
];

const BACKDROPS = [
  {
    id: "studio",
    name: "Studio Donker",
    label: "Studio",
    desc: "Neutraal studio licht",
    containerClass: "bg-gradient-to-b from-black/80 to-[#0A0D0B] border-white/10",
  },
  {
    id: "wood",
    name: "Warm Eikenhout",
    label: "Eikenhout",
    desc: "Bar / houten tafel",
    containerClass: "bg-[radial-gradient(ellipse_at_top,_#26170f_0%,_#150c07_65%,_#0a0503_100%)] border-amber-900/40",
  },
  {
    id: "marble",
    name: "Nero Marmer",
    label: "Nero Marmer",
    desc: "Luxe natuursteen",
    containerClass: "bg-[radial-gradient(circle_at_25%_25%,_#1c221e_0%,_#0e1311_60%,_#060807_100%)] border-zinc-700/50",
  },
  {
    id: "metal",
    name: "Geborsteld RVS",
    label: "Geborsteld RVS",
    desc: "Toonbank / metaal",
    containerClass: "bg-[linear-gradient(135deg,_#1a201c_0%,_#0e1310_50%,_#080b09_100%)] border-zinc-600/40",
  },
] as const;

const LOGO_PRESETS = [
  {
    id: "atelier",
    name: "Atelier Luxe",
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%231a201c"/><circle cx="50" cy="50" r="38" fill="none" stroke="%23A4C2A9" stroke-width="2" stroke-dasharray="4 2"/><path d="M50 24 L56 36 L70 38 L60 48 L62 62 L50 55 L38 62 L40 48 L30 38 L44 36 Z" fill="%23A4C2A9"/><text x="50" y="80" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="11" fill="%23FFFFFF" letter-spacing="2">ATELIER</text></svg>',
  },
  {
    id: "cafe",
    name: "Café Craft",
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%232b1b14"/><circle cx="50" cy="50" r="36" fill="none" stroke="%23dfba95" stroke-width="2.5"/><path d="M34 42 h32 v14 a16 16 0 0 1 -32 0 z" fill="%23dfba95"/><path d="M66 45 h6 a6 6 0 0 1 0 12 h-6" fill="none" stroke="%23dfba95" stroke-width="3"/><path d="M42 34 Q45 28 42 22 M50 34 Q53 28 50 22 M58 34 Q61 28 58 22" stroke="%23dfba95" stroke-width="2" fill="none" stroke-linecap="round"/><text x="50" y="82" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="10" fill="%23dfba95" letter-spacing="1.5">CAFÉ</text></svg>',
  },
  {
    id: "health",
    name: "Zorg & Tand",
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%230f1d19"/><rect x="42" y="24" width="16" height="40" rx="4" fill="%2367826C"/><rect x="30" y="36" width="40" height="16" rx="4" fill="%2367826C"/><circle cx="50" cy="44" r="5" fill="%23A4C2A9"/><text x="50" y="82" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="10" fill="%23A4C2A9" letter-spacing="2">DENTCARE</text></svg>',
  },
] as const;

export function ReviewProductShowroom({
  onOpenTapDemo,
  className,
}: ReviewProductShowroomProps) {
  const [selectedProductId, setSelectedProductId] = useState<"sticker" | "card" | "display">("card");
  const [selectedColor, setSelectedColor] = useState<ReviewColorSwatch>("sage");
  const [selectedTier, setSelectedTier] = useState(TIERS[1]);
  const [showLogo, setShowLogo] = useState(true);
  const [showQr, setShowQr] = useState(true);
  const [businessName, setBusinessName] = useState("Jouw Zaak");
  const [viewMode, setViewMode] = useState<"3d" | "photo">("3d");

  // Interactive additions
  const [activeBranchId, setActiveBranchId] = useState<string | null>("salon");
  const [activeBackdropId, setActiveBackdropId] = useState<"studio" | "wood" | "marble" | "metal">("marble");
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [customLogoFileName, setCustomLogoFileName] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [linkCheckerInput, setLinkCheckerInput] = useState("");
  const [linkCheckerVerified, setLinkCheckerVerified] = useState(false);
  const [linkCheckerType, setLinkCheckerType] = useState<"url" | "name" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Receipt printer state
  const [receiptStage, setReceiptStage] = useState<ReceiptPrinterStage>("complete");

  const product = REVIEW_PRODUCTS[selectedProductId];
  const swatch = COLOR_SWATCHES[selectedColor];
  const activeBranch = BRANCH_CASES.find((b) => b.id === activeBranchId);
  const activeBackdrop = BACKDROPS.find((b) => b.id === activeBackdropId) || BACKDROPS[0];

  const handleProductSelect = (id: "sticker" | "card" | "display") => {
    playTabSwitch();
    triggerHaptic("light");
    setSelectedProductId(id);
  };

  const handleColorSelect = (color: ReviewColorSwatch) => {
    playMechanicalClick();
    triggerHaptic("light");
    setSelectedColor(color);
  };

  const handleBranchSelect = (branch: BranchCase) => {
    playTabSwitch();
    triggerHaptic("medium");
    setActiveBranchId(branch.id);
    setSelectedProductId(branch.recommendedProduct);
    setSelectedColor(branch.recommendedColor);
    setBusinessName(branch.sampleBusiness);
    setActiveBackdropId(branch.backdrop);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      alert("Kies een afbeeldingsbestand van maximaal 8MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setCustomLogoUrl(url);
    setCustomLogoFileName(file.name);
    setShowLogo(true);
    playConfirmSound();
    triggerHaptic("success");
  };

  const handleSelectLogoPreset = (presetUrl: string, presetName: string) => {
    setCustomLogoUrl(presetUrl);
    setCustomLogoFileName(presetName);
    setShowLogo(true);
    playMechanicalClick();
    triggerHaptic("light");
  };

  const handleClearCustomLogo = () => {
    setCustomLogoUrl(null);
    setCustomLogoFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    playMechanicalClick();
    triggerHaptic("light");
  };

  const handleVerifyLink = () => {
    playMechanicalClick();
    triggerHaptic("light");
    const trimmed = linkCheckerInput.trim();
    if (trimmed.length > 2) {
      setLinkCheckerVerified(true);
      if (trimmed.includes("http") || trimmed.includes("g.page") || trimmed.includes("maps") || trimmed.includes("goo.gl")) {
        setLinkCheckerType("url");
      } else {
        setLinkCheckerType("name");
      }
    }
  };

  const handlePrintQuote = () => {
    playPrinterSound();
    triggerHaptic("medium");
    setReceiptStage("processing");
    setTimeout(() => {
      setReceiptStage("printing");
      setTimeout(() => {
        setReceiptStage("complete");
        playConfirmSound();
        triggerHaptic("success");
      }, 1600);
    }, 500);
  };

  return (
    <div className={cn("w-full space-y-12", className)}>
      {/* SECTION INTRO */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">
            <span className="size-1.5 rounded-full bg-[#A4C2A9]" />
            <span>DE COLLECTIE · DRIE VORMEN HELEMAAL VAN JOU</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[0.95]">
            JOUW HUISSTIJL.<br />
            <span className="font-serif italic font-normal text-[#A4C2A9] lowercase capitalize tracking-normal">
              Tangible Hardware.
            </span>
          </h2>
        </div>
        <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
          Beweeg de producten in 3D, upload je eigen logo, probeer verschillende toonbank-ondergronden en ontdek hoe jouw branche organisch meer 5-sterren reviews verzamelt.
        </p>
      </div>

      {/* 1. INTERACTIVE BRANCHE SELECTOR & SOCIAL PROOF */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Building2 className="size-3 text-[#A4C2A9]" />
            <span>KIES JOUW BRANCHE VOOR EEN RELEVANT VOORBEELD:</span>
          </span>
          {activeBranch && (
            <span className="text-[#A4C2A9] font-bold">
              {activeBranch.metric}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {BRANCH_CASES.map((bc) => {
            const Icon = bc.icon;
            const isSelected = activeBranchId === bc.id;
            return (
              <button
                key={bc.id}
                type="button"
                onClick={() => handleBranchSelect(bc)}
                className={cn(
                  "p-3 rounded-2xl border text-left transition-all cursor-pointer relative group flex flex-col justify-between min-h-[82px] active:scale-[0.98]",
                  isSelected
                    ? "bg-[#18211B] border-[#4A644F] ring-1 ring-[#A4C2A9]/50 shadow-lg"
                    : "bg-black/50 border-white/10 hover:border-white/25 hover:bg-white/5"
                )}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={cn(
                      "p-1.5 rounded-lg border",
                      isSelected
                        ? "bg-[#253629] border-[#4A644F] text-[#A4C2A9]"
                        : "bg-white/5 border-white/10 text-zinc-400 group-hover:text-white"
                    )}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest font-bold">
                    {bc.rating}
                  </span>
                </div>
                <div>
                  <div className="font-mono text-[11px] font-bold text-white uppercase tracking-tight leading-tight">
                    {bc.name}
                  </div>
                  <div className="font-mono text-[9px] text-[#A4C2A9] mt-0.5 truncate">
                    {bc.metric}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Branch Case Highlight */}
        {activeBranch && (
          <div className="p-3 rounded-xl bg-[#141A16] border border-[#2B392E] font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#A4C2A9] shrink-0" />
              <span className="text-zinc-300">
                Praktijkvoorbeeld <strong className="text-white">{activeBranch.name}</strong> ({activeBranch.sampleBusiness}): &ldquo;{activeBranch.story}&rdquo;
              </span>
            </div>
            <span className="text-[10px] text-[#A4C2A9] uppercase font-bold shrink-0">
              Meetbaar resultaat: {activeBranch.metric}
            </span>
          </div>
        )}
      </div>

      {/* PRODUCT FORM FACTOR INDEX TABS */}
      <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs pt-2">
        {(Object.keys(REVIEW_PRODUCTS) as ("sticker" | "card" | "display")[]).map((key) => {
          const p = REVIEW_PRODUCTS[key];
          const isSelected = selectedProductId === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleProductSelect(key)}
              data-cursor={`[BEKIJK ${p.title.toUpperCase()}]`}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all cursor-pointer font-bold tracking-wider uppercase active:scale-[0.98]",
                isSelected
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                  : "bg-black/60 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
              )}
            >
              <span className="text-[10px] opacity-60">{p.number} /</span>
              <span>{p.title}</span>
            </button>
          );
        })}
      </div>

      {/* STUDIO CONTROLS & CUSTOMIZER PANEL */}
      <div className="p-6 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-md shadow-2xl grid md:grid-cols-12 gap-6 items-start">
        {/* 01: Color Swatches */}
        <div className="md:col-span-4 space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 flex items-center justify-between">
            <span>01 / KIES EEN KLEUR</span>
            <span className="text-white font-bold">{swatch.name}</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(COLOR_SWATCHES) as ReviewColorSwatch[]).map((cKey) => {
              const sw = COLOR_SWATCHES[cKey];
              const isSelected = selectedColor === cKey;
              return (
                <button
                  key={cKey}
                  type="button"
                  onClick={() => handleColorSelect(cKey)}
                  data-cursor={`[KLEUR ${sw.dutchName.toUpperCase()}]`}
                  className={cn(
                    "p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.97]",
                    isSelected
                      ? "ring-2 ring-white border-white shadow-md bg-white/10"
                      : "border-zinc-800 hover:border-zinc-600 bg-zinc-900/50"
                  )}
                >
                  <div
                    className="size-5 rounded-full border border-black/40 shadow-inner"
                    style={{ backgroundColor: sw.primaryBg }}
                  />
                  <span className="font-mono text-[9px] uppercase font-bold text-zinc-300">
                    {sw.dutchName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 02: Opdruk & Logo Uploader */}
        <div className="md:col-span-5 space-y-2">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            <span>02 / OPDRUK &amp; EIGEN LOGO</span>
            {customLogoUrl && (
              <span className="text-[#A4C2A9] font-bold flex items-center gap-1 text-[9px]">
                <Sparkles className="size-2.5" /> EIGEN LOGO ACTIEF
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setShowLogo(!showLogo);
                playMechanicalClick();
                triggerHaptic("light");
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl border font-mono text-xs font-bold transition-all cursor-pointer active:scale-[0.98]",
                showLogo
                  ? "bg-white/10 text-white border-white/25 shadow-sm"
                  : "bg-black/40 text-zinc-500 border-zinc-800 hover:text-zinc-300"
              )}
            >
              <div
                className={cn(
                  "size-3.5 rounded border flex items-center justify-center",
                  showLogo ? "bg-[#506654] border-[#67826C] text-white" : "border-zinc-600"
                )}
              >
                {showLogo && <Check className="size-2.5 stroke-[3]" />}
              </div>
              <span>Logo</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setShowQr(!showQr);
                playMechanicalClick();
                triggerHaptic("light");
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl border font-mono text-xs font-bold transition-all cursor-pointer active:scale-[0.98]",
                showQr
                  ? "bg-white/10 text-white border-white/25 shadow-sm"
                  : "bg-black/40 text-zinc-500 border-zinc-800 hover:text-zinc-300"
              )}
            >
              <div
                className={cn(
                  "size-3.5 rounded border flex items-center justify-center",
                  showQr ? "bg-[#506654] border-[#67826C] text-white" : "border-zinc-600"
                )}
              >
                {showQr && <Check className="size-2.5 stroke-[3]" />}
              </div>
              <span>QR-Code</span>
            </button>

            {/* Upload Button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-[#A4C2A9]/50 hover:border-[#A4C2A9] bg-[#A4C2A9]/10 text-white font-mono text-xs font-bold transition-all cursor-pointer active:scale-[0.98]"
              title="Upload je eigen PNG, JPG of SVG logo om direct in 3D te zien"
            >
              <Upload className="size-3.5 text-[#A4C2A9]" />
              <span>Upload Logo</span>
            </button>

            {customLogoUrl && (
              <button
                type="button"
                onClick={handleClearCustomLogo}
                className="p-2 rounded-xl border border-red-500/30 hover:border-red-500 bg-red-500/10 text-red-300 font-mono text-xs cursor-pointer transition-colors"
                title="Herstel standaard logo"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Quick Logo Presets for instant testing */}
          <div className="flex items-center gap-1.5 pt-1">
            <span className="font-mono text-[9px] text-zinc-500 uppercase">Presets:</span>
            {LOGO_PRESETS.map((lp) => (
              <button
                key={lp.id}
                type="button"
                onClick={() => handleSelectLogoPreset(lp.url, lp.name)}
                className="px-2 py-0.5 rounded border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-mono text-[8.5px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                {lp.name}
              </button>
            ))}
          </div>
        </div>

        {/* 03: Bedrijfsnaam Input */}
        <div className="md:col-span-3 space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block">
            03 / BEDRIJFSNAAM
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Jouw Zaak"
            className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-black/40 font-mono text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20"
          />
        </div>

        {/* Studio Status Notification line */}
        <div className="md:col-span-12 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#A4C2A9]" />
            <span>
              Voorbeeld: <strong className="text-white">{swatch.dutchName}</strong>, {showLogo ? (customLogoUrl ? "met eigen logo" : "met standaard logo") : "zonder logo"} en {showQr ? "met" : "zonder"} QR-code. Formaat: {product.formFactor}.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "3d" ? "photo" : "3d")}
            className="text-zinc-300 hover:text-white underline cursor-pointer"
          >
            {viewMode === "3d" ? "Bekijk originele productfoto ↗" : "Terug naar 3D studio ↗"}
          </button>
        </div>
      </div>

      {/* MAIN SPECIMEN SHOWCASE: 3D Card vs Technical Blueprint Grid */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: 3D Hardware Specimen Viewport */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingOver(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDraggingOver(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingOver(false);
              const file = e.dataTransfer.files?.[0];
              if (!file) return;
              if (!file.type.startsWith("image/")) {
                alert("Sleep een PNG, JPG of SVG afbeeldingsbestand om direct als logo te bekijken.");
                return;
              }
              if (file.size > 8 * 1024 * 1024) {
                alert("Kies een afbeeldingsbestand van maximaal 8MB.");
                return;
              }
              const url = URL.createObjectURL(file);
              setCustomLogoUrl(url);
              setCustomLogoFileName(file.name);
              setShowLogo(true);
              playConfirmSound();
              triggerHaptic("success");
            }}
            className={cn(
              "w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[490px] transition-all duration-500 border",
              isDraggingOver ? "ring-2 ring-[#A4C2A9] border-[#A4C2A9]" : activeBackdrop.containerClass
            )}
          >
            {/* Drag & Drop Visual Overlay */}
            {isDraggingOver && (
              <div className="absolute inset-4 z-40 rounded-2xl border-2 border-dashed border-[#A4C2A9] bg-[#0E1210]/95 backdrop-blur-md flex flex-col items-center justify-center gap-3 text-center p-6 select-none pointer-events-none">
                <div className="size-16 rounded-2xl bg-[#1C261F] border border-[#A4C2A9]/40 flex items-center justify-center text-[#A4C2A9] shadow-2xl animate-bounce">
                  <Upload className="size-8" />
                </div>
                <div>
                  <div className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    Laat je logo los
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 mt-1">
                    Direct in 3D zichtbaar op jouw review hardware
                  </div>
                </div>
              </div>
            )}

            {/* Top Scene Caption & Countertop Simulator */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-zinc-400 mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <Layers className="size-3 text-[#A4C2A9]" />
                <span className="uppercase tracking-wider">BALIE-ONDERGROND:</span>
              </div>
              <div className="flex items-center gap-1">
                {BACKDROPS.map((bd) => (
                  <button
                    key={bd.id}
                    type="button"
                    onClick={() => {
                      setActiveBackdropId(bd.id);
                      playMechanicalClick();
                      triggerHaptic("light");
                    }}
                    className={cn(
                      "px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer select-none",
                      activeBackdropId === bd.id
                        ? "bg-white text-black font-bold shadow-sm"
                        : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10"
                    )}
                  >
                    {bd.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Model & Spec Badge */}
            <div className="w-full flex items-center justify-between font-mono text-[9px] text-zinc-400 mb-2">
              <span>MODEL · {product.number} {product.title.toUpperCase()}</span>
              <span>13.560 MHz HF NFC · NTAG213</span>
            </div>

            {/* The 3D Component */}
            <GoogleReviewCard3D
              product={product}
              colorSwatch={selectedColor}
              businessName={businessName}
              showLogo={showLogo}
              showQr={showQr}
              customLogoUrl={customLogoUrl}
              viewMode={viewMode}
              onToggleViewMode={() => setViewMode(viewMode === "3d" ? "photo" : "3d")}
              onTapSuccess={onOpenTapDemo || handlePrintQuote}
              className="my-auto w-full"
            />

            {/* Bottom Caption */}
            <div className="mt-6 text-center font-mono text-[9px] text-zinc-400">
              Beweeg de muis (of kantel smartphone) voor holografische reflectie · Tik op de kaart voor NFC-simulatie
            </div>
          </div>

          {/* Reassuring Google Place & NDEF Lock Notice */}
          <div className="w-full mt-4 p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <Lock className="size-3.5 text-[#A4C2A9]" />
                <span className="uppercase tracking-wider text-[11px]">Hardware NDEF Lock &amp; Link Assistent</span>
              </div>
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest hidden sm:inline">KOSTELOOS INBEGREPEN</span>
            </div>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed">
              Nog geen Google Review shortlink? Geen zorgen: Joey &amp; Luc halen de officiële Google Place ID op en vergrendelen deze permanent op de chip. Zo kan niemand jouw review tag overschrijven.
            </p>
            <div className="flex gap-2 pt-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={linkCheckerInput}
                  onChange={(e) => {
                    setLinkCheckerInput(e.target.value);
                    setLinkCheckerVerified(false);
                  }}
                  placeholder="Typ je Google Maps bedrijfsnaam of review link (optioneel)"
                  className="w-full px-3 py-1.5 rounded-lg border border-white/15 bg-black/40 text-white placeholder-zinc-500 text-[11px] font-mono focus:outline-none focus:border-[#A4C2A9]"
                />
              </div>
              <button
                type="button"
                onClick={handleVerifyLink}
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors active:scale-95"
              >
                Controleer
              </button>
            </div>

            {!linkCheckerInput && businessName && businessName !== "Jouw Zaak" && (
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setLinkCheckerInput(businessName);
                    setLinkCheckerVerified(true);
                    setLinkCheckerType("name");
                    playMechanicalClick();
                    triggerHaptic("light");
                  }}
                  className="text-[9.5px] text-zinc-400 hover:text-white underline cursor-pointer"
                >
                  Of test direct met &ldquo;{businessName}&rdquo; ↗
                </button>
              </div>
            )}

            {linkCheckerVerified && (
              <div className="flex items-start gap-2.5 text-[10px] text-[#A4C2A9] bg-[#161F18] border border-[#2B3B2E] p-3 rounded-xl font-mono leading-relaxed">
                <CheckCircle2 className="size-4 shrink-0 text-[#A4C2A9] mt-0.5" />
                <div>
                  {linkCheckerType === "url" ? (
                    <div>
                      <strong className="text-white block mb-0.5">Directe Google Review link gedetecteerd!</strong>
                      <span>Joey &amp; Luc programmeren en vergrendelen deze shortlink hardwarematig (NDEF read-only lock) op jouw tags. Niemand kan jouw chip wissen of overschrijven.</span>
                    </div>
                  ) : (
                    <div>
                      <strong className="text-white block mb-0.5">Bedrijfsnaam herkend!</strong>
                      <span>Joey &amp; Luc halen kosteloos jouw officiële Google Place ID op en sturen vooraf een digitaal drukvoorbeeld ter goedkeuring via WhatsApp of mail.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Technical Blueprint & Direct Ordering */}
        <div className="lg:col-span-5 space-y-6">
          {/* Blueprint Specs Card */}
          <div className="p-6 rounded-3xl border border-zinc-800 bg-[#0A0D0B] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 font-mono text-xs">
              <span className="font-bold text-white uppercase tracking-wider">
                {product.title}
              </span>
              <span className="text-[#A4C2A9] font-bold">
                {product.priceNote}
              </span>
            </div>

            <p className="font-sans text-sm text-zinc-300 leading-relaxed">
              <strong>{product.tagline}</strong> {product.description}
            </p>

            {/* Technical Spec Sheet Rows */}
            <div className="divide-y divide-zinc-900 font-mono text-xs pt-1">
              {product.specs.map((spec, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider">
                    {spec.label}
                  </span>
                  <span className="text-zinc-200 text-right font-medium">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Direct Dial CTAs for Joey and Luc */}
            <div className="pt-3 space-y-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+31623916558"
                  onClick={() => playMechanicalClick()}
                  className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-white hover:text-black hover:border-white transition-all text-left flex flex-col justify-between group shadow-sm cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 group-hover:text-zinc-600 font-mono mb-1">
                    <span>SALES &amp; ADVIES</span>
                    <Phone className="size-3 group-hover:text-zinc-900" />
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Bel Joey</span>
                    <span className="font-mono text-[9px] text-zinc-400 group-hover:text-zinc-600">
                      +31 6 2391 6558
                    </span>
                  </div>
                </a>

                <a
                  href="tel:+31610635256"
                  onClick={() => playMechanicalClick()}
                  className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-white hover:text-black hover:border-white transition-all text-left flex flex-col justify-between group shadow-sm cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 group-hover:text-zinc-600 font-mono mb-1">
                    <span>DESIGN &amp; HUISSTIJL</span>
                    <Phone className="size-3 group-hover:text-zinc-900" />
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Bel Luc</span>
                    <span className="font-mono text-[9px] text-zinc-400 group-hover:text-zinc-600">
                      +31 6 1063 5256
                    </span>
                  </div>
                </a>
              </div>

              {/* Indicatief Aantal Selector */}
              <div className="space-y-1.5 pt-1">
                <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                  <span>INDICATIEF AANTAL</span>
                  <span className="text-white font-bold">{selectedTier.label}</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {TIERS.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => {
                        setSelectedTier(tier);
                        playMechanicalClick();
                        triggerHaptic("light");
                      }}
                      className={cn(
                        "px-2 py-2 rounded-xl border font-mono text-[9px] uppercase transition-all cursor-pointer text-center",
                        selectedTier.id === tier.id
                          ? "bg-white text-zinc-950 font-bold border-white shadow-sm"
                          : "bg-black/50 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                      )}
                    >
                      <div className="truncate font-bold">{tier.label}</div>
                      <div className="text-[7.5px] opacity-75 font-normal truncate">{tier.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Tactile WhatsApp Quotation CTA & Free Proof Lead Magnet */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    handlePrintQuote();
                    playMechanicalClick();
                    triggerHaptic("medium");
                    const logoDetail = customLogoFileName ? ` (met eigen logo: ${customLogoFileName})` : "";
                    const branchDetail = activeBranch ? ` voor ${activeBranch.name}` : "";
                    const url = `https://wa.me/31623916558?text=${encodeURIComponent(
                      `Hallo Joey en Luc! Ik wil graag een vrijblijvende offerte aanvragen voor ${selectedTier.label} (${selectedTier.sub}) Google Review NFC tags (${product.title}, kleur ${swatch.name}${logoDetail}) voor ${businessName}${branchDetail}.`
                    )}`;
                    window.open(url, "_blank");
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#F5F6F2] hover:bg-white text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:translate-y-0.5 cursor-pointer"
                >
                  <MessageSquare className="size-4" />
                  <span>VRAAG VRIJBLIJVEND OFFERTE AAN</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playMechanicalClick();
                    triggerHaptic("medium");
                    const logoDetail = customLogoFileName ? ` (met logo: ${customLogoFileName})` : "";
                    const url = `https://wa.me/31610635256?text=${encodeURIComponent(
                      `Hallo Luc! Ik stuur hierbij graag mijn logo voor een gratis digitaal drukvoorbeeld van de Google Review NFC tags (${product.title}, kleur ${swatch.name}${logoDetail}) voor ${businessName}.`
                    )}`;
                    window.open(url, "_blank");
                  }}
                  className="w-full py-2.5 px-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="size-3.5 text-[#A4C2A9]" />
                  <span>Gratis digitaal proefontwerp met logo ↗</span>
                </button>

                {/* Trust & Value Guarantees */}
                <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-zinc-800 font-mono text-[9px] text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3 text-[#A4C2A9] shrink-0" />
                    <span>Geen abonnement (eenmalig)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3 text-[#A4C2A9] shrink-0" />
                    <span>Proefontwerp binnen 2 uur</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3 text-[#A4C2A9] shrink-0" />
                    <span>Plug &amp; Play voorgeprogrammeerd</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3 text-[#A4C2A9] shrink-0" />
                    <span>Levenslange chipgarantie</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 px-1">
                  <span>* Print automatisch specificatiebon</span>
                  <a
                    href={`https://wa.me/31623916558?text=${encodeURIComponent(
                      `Hallo Joey en Luc! Ik heb interesse in de Google Review NFC tags (${product.title}, kleur ${swatch.name}) voor ${businessName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playMechanicalClick()}
                    className="text-zinc-400 hover:text-white underline cursor-pointer"
                  >
                    Direct appen ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Thermal Receipt Order Specimen (The Kitchen pattern) */}
          <div className="p-5 rounded-3xl border border-zinc-800 bg-black/60 shadow-xl space-y-3">
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Printer className="size-3.5 text-[#A4C2A9]" />
                <span className="font-bold text-white">ORDER SPECIFICATIE BON</span>
              </span>
              <button
                type="button"
                onClick={handlePrintQuote}
                className="text-[9px] px-2 py-0.5 rounded border border-zinc-700 hover:border-zinc-500 text-zinc-300 transition-colors cursor-pointer"
              >
                [PRINT BON]
              </button>
            </div>

            <ReceiptPrinter.Root stage={receiptStage} feedMotion="stepped">
              <ReceiptPrinter.Machine className="p-3 bg-[#111411]">
                <ReceiptPrinter.Screen className="p-2 mb-2 bg-black/90">
                  <ReceiptPrinter.Status />
                </ReceiptPrinter.Screen>
                <ReceiptPrinter.Output className="min-h-[14rem]">
                  <ReceiptPrinter.Paper className="p-4 text-zinc-900 bg-[#FAF9F5] shadow-xl text-[10px] space-y-2 font-mono">
                    <div className="text-center pb-2 border-b border-dashed border-zinc-400">
                      <span className="font-bold block tracking-widest text-[11px]">
                        POLLYDEVELOPMENT · REVIEW TAGS
                      </span>
                      <span className="text-[9px] text-zinc-600 block">
                        AMSTERDAM · NEDERLAND &amp; BELGIË
                      </span>
                      <span className="text-[8px] text-zinc-500 block">
                        TEL JOEY: 06 23916558 · TEL LUC: 06 10635256
                      </span>
                    </div>

                    <div className="space-y-1 text-[9px]">
                      <div className="flex justify-between">
                        <span className="text-zinc-600">PRODUCT:</span>
                        <span className="font-bold text-black uppercase">{product.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">BRANCHE:</span>
                        <span className="font-bold text-black uppercase">{activeBranch ? activeBranch.name : "MAATWERK"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">KLEUR:</span>
                        <span className="font-bold text-black uppercase">{swatch.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">AANTAL:</span>
                        <span className="font-bold text-black uppercase">{selectedTier.label} ({selectedTier.sub})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">OPDRUK:</span>
                        <span>{customLogoFileName ? `Logo (${customLogoFileName.slice(0, 10)})` : (showLogo ? "Logo" : "Geen")} · {showQr ? "QR-Code" : "Geen QR"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">ONDERGROND:</span>
                        <span className="text-black uppercase">{activeBackdrop.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">KLANT:</span>
                        <span className="font-bold text-black uppercase">{businessName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">STATUS:</span>
                        <span className="font-bold text-zinc-900">OFFERTE OP AANVRAAG</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-dashed border-zinc-400 text-center text-[8px] text-zinc-500">
                      * ALLE ORDERS OP MAAT INCLUSIEF DIGITAAL PROEFVOORBEELD *
                    </div>
                  </ReceiptPrinter.Paper>
                </ReceiptPrinter.Output>
              </ReceiptPrinter.Machine>
            </ReceiptPrinter.Root>
          </div>
        </div>
      </div>
    </div>
  );
}

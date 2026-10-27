"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import { playMechanicalClick, triggerHaptic } from "@/helpers/sound-effects";
import { cn } from "@/helpers/classname-helper";

interface FaqItem {
  q: string;
  a: string;
  category: "all" | "tech" | "custom" | "order";
  tag: string;
}

const FAQS_DATA: FaqItem[] = [
  {
    q: "Werkt het met iedere smartphone?",
    a: "Je bezoeker heeft een smartphone met NFC-ondersteuning nodig (alle iPhones vanaf model 7/XS t/m 16 Pro, en vrijwel alle moderne Android toestellen). Op iOS staat NFC standaard ingeschakeld. Voor oudere toestellen bevat elk exemplaar een optische high-contrast QR-code als directe fallback.",
    category: "tech",
    tag: "NFC // SMARTPHONES",
  },
  {
    q: "Moet mijn bezoeker een aparte app installeren?",
    a: "Nee, absoluut niet! Een contactloze aanraking met de smartphone activeert direct de standaard ingebouwde browser. De klant belandt direct in het officiële Google review formulier met 5 sterren. Er is enkel een Google account vereist om de review te bevestigen.",
    category: "tech",
    tag: "GEEN APP // ZERO DOWNLOAD",
  },
  {
    q: "Kunnen de NFC tags in mijn eigen huisstijl worden geleverd?",
    a: "Ja, 100%. We bedrukken de producten exact in jouw huisstijl: je specifieke merkkleuren, vectorlogo en eventueel aangepaste teksten. In onze interactieve 3D showroom hierboven kun je alvast experimenteren met kleuren, logo's en QR-codes.",
    category: "custom",
    tag: "100% HUISSTIJL // DRUKWERK",
  },
  {
    q: "Welke Google Review tag past het beste bij mijn zaak?",
    a: "Een sticker is ideaal voor een vaste montage op een entreedeur, raam, menukaart of balie. Een review kaart geef je gemakkelijk mee met de rekening op een serveerplankje. Een tafeldisplay valt direct op bij de kassa, receptie of horecatafels. Bel Joey of Luc gerust voor gratis advies!",
    category: "custom",
    tag: "ADVIES // VORMFACTOREN",
  },
  {
    q: "Wat kosten de Google Review NFC tags?",
    a: "De prijs hangt af van het gekozen product, de oplage en de gewenste bedrukking. We leveren zowel kleine series (vanaf 1 stuk voor ZZP'ers en boetieks) als grotere volumes voor ketens met meerdere vestigingen. Bel Joey of Luc voor een vrijblijvende offerte op maat.",
    category: "order",
    tag: "TARIEVEN // STAFFELS",
  },
  {
    q: "Leveren jullie ook in België?",
    a: "Zeker! Wij leveren aan ondernemers in heel Nederland én België. Bel Joey (+31 6 2391 6558) of Luc (+31 6 1063 5256) om je wensen en de levertijd te bespreken.",
    category: "order",
    tag: "LEVERING // BENELUX",
  },
  {
    q: "Hoe verloopt het bestelproces?",
    a: "Heel eenvoudig: bel Joey of Luc of stuur een bericht via WhatsApp. Wij helpen je met het opzoeken van je officiële Google Review-link, controleren je vectorlogo en sturen je vooraf een digitaal drukvoorbeeld ter goedkeuring. Pas na jouw akkoord gaan de tags in productie.",
    category: "order",
    tag: "WORKFLOW // BINNEN 48 UUR",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<"all" | "tech" | "custom" | "order">("all");

  const filteredFaqs = FAQS_DATA.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const toggleFaq = (idx: number) => {
    playMechanicalClick(0.08);
    triggerHaptic("light");
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const handleCategorySwitch = (cat: "all" | "tech" | "custom" | "order") => {
    playMechanicalClick(0.06);
    triggerHaptic("light");
    setActiveCategory(cat);
    setOpenIndex(null);
  };

  return (
    <section id="faq" className="relative z-10 py-24 px-4 max-w-4xl mx-auto border-b border-white/10">
      {/* SECTION HEADER */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400 mb-2">
          <HelpCircle className="size-3 text-emerald-400" />
          <span>ALLES WAT JE MOET WETEN · FAQ</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
          VEELGESTELDE VRAGEN.
        </h2>
        <p className="font-sans text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
          Heldere antwoorden over NFC-compatibiliteit, hardware beveiliging en ons bestelproces.
        </p>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 font-mono text-xs">
        {[
          { key: "all", label: "ALLE VRAGEN" },
          { key: "tech", label: "NFC & HARDWARE" },
          { key: "custom", label: "HUISSTIJL & OPMAAK" },
          { key: "order", label: "BESTELLEN & SERVICE" },
        ].map((tab) => {
          const isSelected = activeCategory === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleCategorySwitch(tab.key as any)}
              className={cn(
                "px-3.5 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-[0.98]",
                isSelected
                  ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                  : "bg-black/60 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ACCORDION LIST */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={cn(
                "rounded-2xl border transition-all duration-200 overflow-hidden",
                isOpen
                  ? "border-emerald-500/50 bg-[#0c120e] shadow-[0_4px_25px_rgba(0,255,102,0.06)]"
                  : "border-zinc-800/80 bg-black/60 hover:border-zinc-700 hover:bg-black/80"
              )}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-zinc-800/80 text-emerald-400 w-max border border-zinc-700/60 font-bold">
                    {faq.tag}
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-zinc-100">
                    {faq.q}
                  </span>
                </div>

                <div
                  className={cn(
                    "size-7 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-200",
                    isOpen
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 rotate-180"
                      : "border-zinc-800 bg-zinc-900 text-zinc-400"
                  )}
                >
                  <ChevronDown className="size-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed border-t border-zinc-800/60 mt-1">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* CALLOUT TO JOEY & LUC */}
      <div className="mt-8 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <MessageSquare className="size-5 text-emerald-400 shrink-0" />
          <div className="font-sans text-xs sm:text-sm text-zinc-300">
            Heb je een specifieke vraag over jouw winkel, praktijk of horecazaak?
          </div>
        </div>
        <a
          href="https://wa.me/31623916558"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shrink-0 active:translate-y-0.5 shadow-sm"
        >
          Stel je vraag via WhatsApp ↗
        </a>
      </div>
    </section>
  );
}

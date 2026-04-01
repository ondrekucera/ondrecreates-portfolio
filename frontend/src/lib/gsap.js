// ─── Centrální GSAP setup ─────────────────────────────────────────────────────
//
// Importuj GSAP a GSAP pluginy POUZE z tohoto souboru.
// Pluginy jsou registrovány jednou při prvním importu modulu.
//
// Proč centrálně:
//   – registerPlugin je idempotentní, ale volat ho rozptýleně po celém projektu
//     je code smell a ztěžuje přehled o použitých pluginech
//   – dříve bylo voláno v helpers.js (utility soubor) jako side-effect importu
//
// Přidání nového pluginu:
//   1. Import níže
//   2. Přidej do gsap.registerPlugin(...)
//   3. Exportuj
// ─────────────────────────────────────────────────────────────────────────────

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger }  from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

export default gsap
export { ScrollTrigger }

# Design notes — 23 September 2026

## Brief

Rebuild the first plain cream-and-green prototype into a richer, original mathematics website in Uzbek. Research multiple sources to learn useful ideas without reproducing any one site's layout, brand, illustrations or wording. Keep this a frontend prototype suitable for exploring the whole experience.

## Research considered

- [Brilliant geometry](https://brilliant.org/topics/geometry/): short visual questions and approachable topic discovery.
- [Mathigon](https://mathigon.org/): geometry as a visible, interactive subject.
- [Polypad](https://polypad.amplify.com/): learning by manipulating mathematical objects.
- [Art of Problem Solving](https://artofproblemsolving.com/resources): problem-solving as the core learning activity.
- [NRICH](https://nrich.maths.org/thinking-mathematically-secondary-students): mathematical habits, investigation and reasoning.
- [STEP Support](https://step.maths.org/step-support-modules-overview): structured preparation and gradual challenge.
- [3Blue1Brown](https://www.3blue1brown.com/): visual intuition before formal explanation.
- [Quanta Math Map](https://mathmap.quantamagazine.org/): mathematics as a connected field to explore.

Brilliant and Mathigon were also inspected visually. Other sources were read through their public pages; Quanta's browser view did not load, so its visual layout was not used as a reference. These are research influences, not templates. No site screenshot, logo or stylesheet was imported into the application.

## Original direction

A bright mathematical studio: oversized typography, an original geometric sculpture, subject-specific coral / blue / violet / mint accents, a dark visual experiment and a warm contest banner. Quiet reading layouts follow the more expressive home page. Functional math interactions make the visual identity useful, not only decorative.

The layout, Uzbek interface copy, problem explanations and component styling were assembled for this project. Sample exercises use standard mathematical ideas and are not presented as official contest questions. No ready-made website template was installed.

## Art and libraries

`public/art/math-sculpture.png` is an original generated illustration. Generation brief: a sculptural violet geometric knot with a wireframe surface, an orange polyhedron, an amber sphere and a mint transparent prism, fine mathematical construction lines, on a pale lavender studio background. It is an illustration, not a photograph of a real mathematical model. No image generation runs in the website itself.

The official MathOlympiad.uz logo is the user-supplied square-root/M mark, with navy, violet and orange colors. Use `public/brand/matholympiad-logo.png` and `components/brand-mark.tsx` for future branding. The header and footer display the original image with tighter CSS framing; `app/icon.png` uses the same source for the browser icon. The original Desktop file is unchanged. This replaces the earlier infinity placeholder.

[Phosphor](https://phosphoricons.com/) supplies interface icons only. [Manrope](https://fonts.google.com/specimen/Manrope) is self-hosted through its Fontsource package. [KaTeX](https://katex.org/) renders formulas. [Motion](https://motion.dev/) provides restrained scroll reveals. Package licenses remain with the installed dependencies.

## Motion and accessibility

Animations are limited to hover feedback, subtle section reveals and a user-started square-layer demonstration. Reduced-motion preferences turn off CSS motion and reveal animations. The visual proof has a text equivalent, a keyboard-operable slider and a stop button. Forms have labels, results are announced politely, menus expose expanded state and a skip link reaches the main content.

## Deliberate boundaries

Only local numeric checking and example quizzes exist. Written proofs are compared with worked solutions, not graded automatically. Notes and results are temporary. Contest examples are labelled and cannot be entered. No backend, authentication, database, AI feature, production analytics or publication was added.


## Header, appearance and languages — 23 September 2026

The header is now 68px on desktop and 60px on phones, with grouped navigation, an active-page pill, light/dark control, language menu and login preview. Navigation collapses at 980px; phone users access the account preview from the menu. Preserve the official logo colors, using a white badge in dark mode.

The homepage uses warm paper, a fading coordinate grid, understated formula notes and an original circle/ellipse diagram behind the existing sculpture. Shared semantic colors cover the whole website in light and dark appearances. Motion respects reduced-motion preferences.

Uzbek remains the default language. Russian and English cover interface labels, instructions, navigation, marketing copy and feedback; educational data in lib/content.ts stays Uzbek as requested. A notice explains this on learning and contest pages. Theme and language are the only saved preferences. Account creation remains a visual preview with disabled inputs and no submission endpoint.

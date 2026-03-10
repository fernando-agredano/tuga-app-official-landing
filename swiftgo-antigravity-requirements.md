# SwiftGo Landing Page — Development Requirements for Antigravity

## 1. Project overview

### Project name
SwiftGo

### Project type
Premium marketing landing page / product launch experience

### Goal
Build a visually outstanding landing page for **SwiftGo**, a new food delivery platform inspired by products like Uber Eats and DiDi Food, but presented with a premium, modern, app-launch style experience.

This is **not** a generic corporate website and **not** a dashboard.  
It must feel like a polished, high-end product website for a mobile app that is ready to download.

### Brand context
- **Product name:** SwiftGo
- **Development studio / company:** Byte
- The phrase **“Powered by Byte”** must appear in a refined and intentional way in key parts of the experience.

---

## 2. Product positioning

SwiftGo should feel like:
- a modern consumer mobile product
- a premium tech brand
- a polished launch experience
- a high-trust platform for customers, restaurants, and drivers

The page should communicate:
- speed
- convenience
- premium UX
- modern technology
- reliability
- visual excellence

---

## 3. Experience objectives

The landing page must:
- create a strong first impression
- feel immersive from the first second
- showcase the app as a premium product
- drive users toward app download and platform exploration
- visually differentiate SwiftGo from generic delivery competitors
- feel modular, scalable, and production-ready

---

## 4. Mandatory technical stack

This project **must explicitly use** the following stack and implementation baseline:

### Core framework
- **Next.js 15+**
- **React 19+**
- **TypeScript**

### Styling
- **Tailwind CSS**
- **CSS variables** for design tokens where helpful

### Component / UI foundation
- **shadcn/ui**
- **Radix UI primitives**

### Motion and animation
- **GSAP** for premium animation choreography
- **Lenis** for smooth scrolling and scroll feel
- **Framer Motion** may be used selectively for simple micro-interactions, but **GSAP is the primary motion engine**

### Visual enhancement libraries
Use selectively and intentionally:
- **Aceternity UI**
- **Magic UI**
- **Origin UI**

These libraries should be used only when they add real visual value.  
Do not create an inconsistent UI by mixing styles carelessly.

### Forms / validation
- **react-hook-form**
- **zod**

### Icons
- **lucide-react**

### State
- lightweight local client state only where needed
- no complex global store unless clearly justified

### Data
- static content and mock structured content
- no backend required for this phase
- no database required for this phase

---

## 5. Animation and motion requirements

This project must take motion seriously.

### GSAP usage requirements
GSAP should be used for:
- splash screen intro
- hero reveal sequencing
- section entrance choreography
- scroll-driven reveals
- parallax or depth effects where tasteful
- feature card motion
- app mockup movement
- CTA emphasis moments
- footer reveal or end-of-page polish

### Lenis usage requirements
Lenis must be used to create:
- premium smooth scrolling
- refined page movement
- better perceived fluidity
- more cinematic transitions between sections

### Motion style rules
Motion must feel:
- premium
- subtle
- controlled
- elegant
- product-grade

Avoid:
- noisy animation
- excessive bouncing
- flashy gimmicks
- heavy-handed motion that hurts performance or clarity

---

## 6. Core visual direction

The page must be:
- dark-mode first
- premium
- modern
- highly polished
- cinematic but usable
- modular and scalable
- visually memorable

### Reference direction
The visual feel should be closer to:
- Apple product pages
- Stripe product marketing
- Linear
- Arc Browser
- Vercel launch pages
- premium app showcase websites

### Avoid
Do not produce:
- generic startup landing page layouts
- simple template-like hero + features + footer
- flat sections with weak hierarchy
- visually empty compositions
- low-density generic cards
- bland marketing site patterns

---

## 7. Branding requirements

### SwiftGo brand direction
SwiftGo should visually communicate:
- fast delivery
- fluid movement
- confidence
- modern urban lifestyle
- mobile-first convenience

### Powered by Byte
The phrase **“Powered by Byte”** must appear elegantly in at least these places:
1. splash / loading screen
2. one brand or technology section
3. footer

Optional additional placement:
- app showcase caption
- pre-footer trust block
- loading transition close

It should feel premium and understated, not noisy.

---

## 8. First-visit splash screen requirement

When a user enters the landing page for the first time, the site must display a short premium splash / loading screen.

### Splash screen goals
- feel like entering a mobile app or premium digital product
- create memorability
- reinforce the brand
- create anticipation before the hero appears

### Splash screen content
Must include:
- SwiftGo wordmark or logo
- “Powered by Byte”
- subtle loading motion
- elegant fade / scale / reveal
- transition into hero section

### Splash screen constraints
- should be brief
- should not feel annoying
- should not block the user for too long
- must feel intentional and high-quality

Recommended feel:
- 1 to 2 seconds perceived duration
- if revisits are considered, behavior can be lighter or skipped after first load

---

## 9. Information architecture and section structure

The landing page must include the following sections.

### 9.1 Splash / intro loader
A premium first-visit experience with SwiftGo and Powered by Byte.

### 9.2 Hero section
Must include:
- strong headline
- short supporting value proposition
- primary CTA
- secondary CTA
- premium mobile app mockup(s)
- layered composition
- animated visual entrance
- clear product positioning

### 9.3 How it works
Show the main journey in a visually rich way:
- discover
- order
- track
- receive

Should not be a boring 4-card row.  
Needs visual storytelling and motion.

### 9.4 Product experience showcase
Present the app as a premium mobile experience through:
- mobile screen mockups
- highlights of ordering flow
- real-time tracking
- smart discovery
- checkout simplicity
- performance / speed feel

### 9.5 Benefits / features
Core value propositions for the customer.

Suggested themes:
- fast ordering
- real-time delivery tracking
- curated restaurants
- seamless checkout
- personalized discovery

### 9.6 For customers
Why end users should use SwiftGo.

### 9.7 For restaurants
Why restaurant partners should join SwiftGo.

### 9.8 For drivers
Why delivery drivers should work with SwiftGo.

### 9.9 Trust / technology / Byte section
A premium section that communicates technical confidence and includes:
- performance feel
- reliability
- scale potential
- “Powered by Byte”

### 9.10 Final CTA section
Drive action clearly:
- download app
- join as restaurant
- join as driver

### 9.11 Footer
Must be premium, dark, clean, and include:
- navigation
- social / legal placeholders if needed
- “Powered by Byte”

---

## 10. UX and composition requirements

### Composition rules
The site must:
- feel like a real product launch experience
- use strong section rhythm
- use clear hierarchy
- alternate visual density intelligently
- combine typography, motion, mockups, and spacing in a premium way

### Layout rules
- modular section-based composition
- reusable section patterns
- clear vertical rhythm
- layered backgrounds where appropriate
- polished content-width management
- responsive layouts with visual integrity across screen sizes

### CTA rules
The page must have strong but elegant calls to action.  
Buttons should feel premium, not generic.

### Mockup rules
App screens should be treated as premium visual assets:
- floating phones
- layered depth
- slight parallax
- premium framing
- animated reveal

---

## 11. Responsive requirements

The landing page must be fully responsive.

### Devices to support
- desktop
- laptop
- tablet
- mobile

### Responsive expectations
- maintain premium composition across breakpoints
- avoid simply stacking everything with no adaptation
- preserve hierarchy and motion intent
- make hero and mockups feel designed on mobile too

---

## 12. Accessibility requirements

The site must maintain strong accessibility fundamentals:
- semantic structure
- keyboard-usable controls
- sufficient contrast
- motion that does not harm usability
- readable typography
- focus states where interactive elements exist

If strong motion is used, consider graceful behavior for reduced motion preferences where possible.

---

## 13. Performance requirements

Even with premium motion, the site should remain performant.

### Expectations
- optimize animations
- avoid unnecessary client-side bloat
- lazy load heavy elements when justified
- avoid overusing multiple visual libraries at the same time
- maintain smooth scroll and fluid animation responsibly

Performance should support the premium feel, not fight it.

---

## 14. Content direction

### Tone
- premium
- concise
- aspirational
- modern
- confident

### Suggested positioning language
SwiftGo should feel:
- fast
- intuitive
- refined
- urban
- always moving

“Powered by Byte” should reinforce product credibility.

---

## 15. Technical architecture expectations

The implementation should be modular and clean.

### Recommended structure
- app/
- components/
  - ui/
  - shared/
  - layout/
  - marketing/
- features/
- lib/
- hooks/
- types/
- config/
- theme/

### Architectural rules
- keep sections modular
- keep animation logic organized and reusable
- separate content, visual components, and motion behavior where practical
- avoid monolithic page files
- keep implementation scalable for future additions

---

## 16. Recommended section/component breakdown

Suggested components:
- SplashLoader
- HeroSection
- AppMockupShowcase
- HowItWorksSection
- FeaturesSection
- CustomersSection
- RestaurantsSection
- DriversSection
- BytePoweredSection
- FinalCTASection
- Footer
- Reusable animated wrappers
- Reusable section headers
- Reusable CTA blocks
- Reusable device mockup components

---

## 17. Copy / content placeholders

The implementation may use placeholder content where final marketing copy is not yet defined, but the tone should align with the brand direction.

### Core brand text
- App name: SwiftGo
- Signature line: Powered by Byte

Optional placeholder tagline directions:
- Delivery at the speed of now.
- Fast feels better.
- Your food, delivered smarter.

---

## 18. Out of scope for this phase

Do not include:
- backend
- authentication
- real API integrations
- real app store integration
- analytics setup
- CMS
- database
- dashboard UI
- restaurant management system
- driver management system
- checkout backend

This phase is focused on a premium landing page experience only.

---

## 19. Acceptance criteria

The deliverable should be considered successful if it:
- clearly presents SwiftGo as a premium mobile delivery product
- includes a memorable first-visit splash screen
- includes “Powered by Byte” in strategic branded locations
- uses GSAP meaningfully
- uses Lenis for smooth scrolling
- feels visually exceptional and modern
- avoids generic landing page patterns
- uses modular architecture
- is responsive and polished
- is implementation-ready for a Next.js production-style frontend

---

## 20. Final directive for Antigravity

This project must be treated as a **premium product launch landing page**, not as a generic website.

The implementation should prioritize:
- visual impact
- premium design quality
- modular frontend structure
- refined motion
- GSAP-led animation quality
- Lenis smooth scroll
- strong app showcase composition
- elegant integration of “Powered by Byte”

The result should feel like a modern, high-end digital product experience.

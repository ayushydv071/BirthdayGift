# Website Specification — Romantic & Playful Birthday Website

A single-page, slide-by-slide romantic birthday website built as a self-contained HTML file (`index.html`) with inline CSS + JS and Google Fonts. It features an interactive 3D page-turn system, in-card contextual progression buttons, floating ribbon pull-tabs, story milestone timeline navigation, touch swipe with 3D card tilt physics, password-protected entry, flying white pigeon air delivery, background music with toggle, Web Audio synthesizer fallback, and interactive mini-games.

---

## 1. Overall Art Direction

- **Mood**: An intimate, handwritten "letter/journal" aesthetic mixed with fun, playful interactive micro-games.
- **Two-Tone Dynamic Theme**:
  - **Light blush-pink palette** (Slides 0, 1, 2, 6) for happy, nostalgic, and warm closing chapters.
  - **Deep velvet dark-rose palette** (Slides 3, 4, 5) for emotional confession and vulnerable thoughts.
  - Smooth background gradient morphing as the user progresses through chapters.

### Interactive Navigation & 3D Transitions
1. **In-Card Story Progression**: Every chapter ends with an organic next-step button (e.g. `"Next Memory 📸 →"`, `"Read what's in my heart 🗝️ →"`, `"Something confusing 💔 →"`, `"Final birthday wish 🌟 →"`).
2. **Story Milestone Timeline Bar**: Bottom navigation with glowing active pills and chapter icons (`🕊️ Letter` | `🎂 Wish` | `📸 Memory` | `💌 Confession` | `🫂 Hug` | `🤙🏻 Promise` | `🎁 Gift`).
3. **3D Deck & Paper Flip Transitions**: Dynamic 3D perspective (`perspective: 1400px; rotateY()`) with realistic depth, soft blur, and elevation.
4. **Tactile Touch Drag**: Cards dynamically tilt in 3D following the user's finger swipe.
5. **Floating Ribbon Tabs**: Elegant pull-tabs on desktop/tablet with glowing hover states.

---

## 2. Chapter Breakdown (7 Slides Total)

### 🔐 Password Protection Screen (Entry Overlay)
- `🎁 You found a secret...`
- `"This website is only for you ❤️"`
- Password input with show/hide toggle (Default password: `BIRTHDAY123`)
- `[ 🔓 Unlock ]` button with cute error handling and shake effect.

### Slide 0 — Cover (Light Theme) — *Flying White Pigeon Air Delivery* 🕊️
- **Animation**: A graceful white pigeon/dove swoops across the screen flapping its wings, carrying an envelope in its beak, and drops it softly onto the letter card with a sparkle burst.
- **Heading**: *"Here is something for you ❤️"*
- **Content**:
  - *"Ek chhoti si chitthi, tumhare naam."*
  - *"Kuch baatein bolne se zyada, likhne mein achhi lagti hain... Ye unhi mein se ek hai."*
- **Interaction**: Tapping the envelope or `"Kholo 💌"` plays an ambient chime, unlocks/starts background music, and unfolds into Slide 1.
- **Replay**: Includes a `"Replay Pigeon 🕊️"` button to watch the dove delivery again!

### Slide 1 — Hero / Birthday Wish & Pop-The-Balloons (Light Theme)
- **Eyebrow**: `FIRST THINGS FIRST`
- **Heading**: **"Happy Birthday ❤️🫶🏻"** (Playfair Display bold, gradient fill)
- **Message**: *"Happy birthday to you, special one. Wishing you good health, countless reasons to smile, and may all your heartfelt dreams come true!"*
- **Interactive Mini-Games**:
  - **Pop-the-Balloons**: 3 clickable balloons that pop with sound & glitter confetti, revealing hidden compliments (*"Cutest smile in the world 🌸"*, *"Endless happiness & peace 💖"*, *"My absolute favorite person 🤍"*).
  - **Interactive Birthday Cake**: Tapping the cake blows out the candle flame with a chime and triggers a heart confetti shower.
- **In-Card Nav**: `[ Next Memory 📸 → ]`

### Slide 2 — Nostalgia Polaroid & Runaway "No" Game (Light Theme)
- **Visual**: Polaroid photo card rotated -3° with washi tape pins and vector camera/daisies art.
- **Caption**: *"You remember tuition ke bahar woh random eye contacts, ek dusre ko dekh ke phir casually ignore kar dena… those little moments were actually really sweet. 🤍"*
- **Playful Mini-Game**: *"Sach sach batao... do you feel the same? 👀❤️"*
  - Button 1: `"Haan sach me! 🙈"` (Clickable → triggers confetti + *"I knew it!! You feel the same way too 😉🤍"*).
  - Button 2: `"Nahi bilkul nahi 😜"` (**The Runaway Button** — dodges the mouse/touch with funny taunts: *"Arey pakad ke dikhao! 🏃‍♂️"*, *"Nice try! 😂"*, *"Galat button hai 😝"*, *"Haan hi dabana padega! ❤️"*).
- **In-Card Nav**: `[ Read what's in my heart 🗝️ → ]`

### Slide 3 — Main Confession & Secret Letter Unfold (Dark Theme)
- **Theme**: Morphing background to deep velvet rose.
- **Eyebrow**: `AB SEEDHE DIL SE`
- **Animation**: Staggered ink reveal (sentence-by-sentence unblur & fade-in). Tap card to reveal instantly.
- **Interactive Button**: `"I have one more message for you... (Click to read) 💌"`
  - Smoothly opens an unfolded handwritten vintage paper letter modal with the deeper confession.
- **In-Card Nav**: `[ One more thought... 💭 → ]`

### Slide 4 — Reassurance & Virtual Hug Charger (Dark Theme)
- **Eyebrow**: `EK CHHOTI SI REQUEST`
- **Animation**: Sequential thought cards fading up smoothly.
- **Interactive Game**: **"Virtual Hug Charger 🫂"**
  - Hold the glowing heart button for 3 seconds to charge the hug meter → releases an explosion of floating hearts and delivers a virtual hug.
- **In-Card Nav**: `[ Something confusing 💔 → ]`

### Slide 5 — Vulnerable & Pinky Promise Stamp (Deep Dark Theme)
- **Eyebrow**: `BAS EK CONFUSION`
- **Animation**: Signal flicker reveal on intimate thoughts.
- **Interaction**: `"🤙🏻 Click to make a Pinky Promise"` → Stamps a promise seal: *"✨ Pinky Promise Sealed: Clearer talks & zero ghosting! 🤙🏻❤️"*.
- **In-Card Nav**: `[ Final birthday wish 🌟 → ]`

### Slide 6 — Closing Wish & Mystery Gift Box (Light Theme Returns)
- **Heading**: *"Bas itna sa keh sakti hoon... Happy Birthday, mere favorite person. 🤎"*
- **Interactive Mystery Gift Box**: `"🎁 Click me for one last secret"` → unwraps with sparkles revealing a final heartfelt blessing.
- **Interactive Reaction**: `"Send a heart to the universe ❤️"` counter button with floating hearts.
- **Action**: `"Phir se padho ↺"` button to restart deck from Slide 1.

---

## 3. Technical Specs
- **Single Self-Contained File**: `index.html` runs directly on double-click or any static host.
- **Audio Engine**: `<audio id="bg-audio">` supports local/custom MP3 files, with an embedded Web Audio melodic synthesizer fallback.
- **Mobile First (`100dvh`)**: Optimized touch swipe physics, elastic resistance, and responsive layout across all devices.
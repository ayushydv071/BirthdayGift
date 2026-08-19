# Website Specification — Romantic & Aesthetic Birthday Website

A single-page, slide-by-slide romantic birthday website built as a self-contained HTML file (`index.html`) with inline CSS + JS and Google Fonts (Playfair Display, Plus Jakarta Sans, Cormorant Garamond). It features an interactive 3D page-turn system, in-card contextual progression buttons, story milestone timeline navigation, touch swipe with 3D card tilt physics, password-protected entry, flying white dove air delivery, harmonic chord background music with toggle, and interactive mini-games.

---

## 1. Art Direction & Theme

- **Mood**: Intimate, elegant, heartfelt letter/journal aesthetic with refined micro-interactions.
- **Two-Tone Dynamic Theme**:
  - **Light Blushing Champagne palette** (Slides 0, 1, 5, 6) for warm, joyful, and nostalgic chapters.
  - **Deep Velvet Blackberry / Neutral Cashmere palette** (Slides 2, 3, 4) for emotional reassurance and vulnerable confession thoughts.
  - Smooth background gradient morphing as the user progresses through chapters.

### Interactive Navigation & Layout
1. **In-Card Story Progression**: Clean, modern next/previous buttons embedded in the card footer (`[ ← Previous ]`, `[ Next Memory → ]`), avoiding any overlapping ribbons or obstructive UI.
2. **Story Milestone Timeline Bar**: Bottom navigation dock with glowing active pills and chapter icons (`🕊️ Letter` | `🎂 Wish` | `✨ Promise` | `💌 Confession` | `🫂 Hug` | `📸 Memory` | `🎁 Gift`).
3. **Responsive Viewports**: All slides fit gracefully within `100dvh` across both mobile and desktop screens.

---

## 2. Chapter Breakdown (7 Slides Total)

### 🔐 Password Protection Screen (Entry Overlay)
- `PRIVATE ACCESS`
- `"This is only for you"`
- Password input with show/hide toggle (Default password: `BIRTHDAY123`)
- `[ 🔓 Unlock Letter ]` button.

### Slide 0 — Cover (Light Theme) — *Flying White Dove Air Delivery* 🕊️
- **Animation**: Graceful white dove swoops across the screen carrying an envelope and drops it softly onto the letter card with sparkle burst.
- **Eyebrow**: `A SPECIAL DELIVERY`
- **Heading**: *"Here is something for you"*
- **Content**: *"Hope you'll like this ✨"*
- **Interaction**: Tapping `"Open Letter"` unlocks/starts background music and unfolds into Slide 1. Includes `"Replay Dove"` button.

### Slide 1 — Birthday Wish & 3-Balloon Reveal (Light Theme)
- **Eyebrow**: `FIRST THINGS FIRST`
- **Heading**: **"Happy Birthday ❤️"**
- **Message**: *"Happy birthday to you, special one. Wishing you good health, countless reasons to smile, and may all your heartfelt dreams come true!"*
- **Interactive Mini-Games**:
  - **3-Balloon Grid**: Responsive 3-column SVG balloon layout that pops with sound & confetti, revealing hidden compliments (*"Cutest smile in the world 🌸"*, *"Endless happiness & peace ✨"*, *"fav ❤️"*).
  - **Interactive Birthday Cake**: Tapping the cake blows out the candle flame with confetti.
- **In-Card Nav**: `[ Next Thought → ]`

### Slide 2 — Vulnerable & Pinky Promise Stamp (Neutral Theme)
- **Animation**: Signal flicker reveal on intimate thoughts.
- **Interaction**: `"Click to make a Pinky Promise"` → Stamps promise: *"Pinky Promise: Clearer talks, always ✨❤️"*.
- **In-Card Nav**: `[ Read Letter → ]`

### Slide 3 — Main Confession & Secret Letter Unfold (Neutral Theme)
- **Theme**: Warm cashmere neutral background.
- **Animation**: Staggered ink unblur & fade-in reveal.
- **Interactive Button**: `"I have one more message for you (Click to read)"`
  - Opens vintage modal letter with sign-off: `~ Yours ❤️`.
- **In-Card Nav**: `[ Next Thought → ]`

### Slide 4 — Reassurance & Virtual Hug Charger (Neutral Theme)
- **Animation**: Sequential thought cards fading up smoothly.
- **Interactive Game**: **"Virtual Hug Charger"**
  - Hold heart button for 3 seconds to charge the hug meter → delivers virtual hug.
- **In-Card Nav**: `[ A Memory → ]`

### Slide 5 — Nostalgia Polaroid & Runaway Button Game (Tuition Slide - Light Theme)
- **Visual**: Polaroid photo card with washi tape pin.
- **Caption**: *"You remember tution ke bahar woh random eye contacts, ek dusre ko dekh ke phir casually ignore kar dena… those little moments were actually really sweet. 🤍"*
- **Playful Mini-Game**: *"Do you remember those moments too?"*
  - Button 1: `"Yes, definitely!"` (Clickable → triggers confetti + *"I knew it! You remember too ❤️✨"*).
  - Button 2: `"Not at all"` (**The Runaway Button** — dodges the cursor/touch).
- **In-Card Nav**: `[ Final Birthday Wish → ]`

### Slide 6 — Closing Wish & Mystery Gift Box (Light Rose Theme)
- **Heading**: *"Happy Birthday, cutieeee❤️"*
- **Interactive Mystery Gift Box**: `"Click for one last secret ✨"` → unwraps with sparkles.
- **Interactive Reaction**: `"Send love to the universe"` counter button with floating hearts.
- **Action**: `"Read from start"` button to restart deck.

---

## 3. Technical Specs
- **Single Self-Contained File**: `index.html` runs directly on double-click or any static host.
- **Audio Engine**: `<audio id="bg-audio">` supports local MP3 files, with an embedded Web Audio harmonic synthesizer (arpeggiated Cmaj9 - Am9 - Fmaj7 - G6 chords) fallback.
- **Mobile First (`100dvh`)**: Touch swipe physics, responsive 3-column grid for balloons, and non-overlapping controls.
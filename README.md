# Birthday Surprise Website 💌

An intimate, romantic, and playful interactive birthday website designed like a private journal/scrapbook. It features password protection, background music, floating heart animations, candle blowout, balloon pops, runaway games, secret unfolded letters, and an interactive virtual hug charger.

---

## ✨ Features

- 🔐 **Password-Protected Entry Screen**: Private access overlay that unlocks only with the secret password.
- 📱 **Mobile-Friendly & Responsive Design**: Custom crafted for portrait viewing on phones with fluid touch swipe gestures.
- 📸 **Photo Memories & Polaroid Animation**: Nostalgic instant photo frame with camera flash lighting.
- 💌 **Heartfelt Birthday Message & Confession**: Staggered ink reveals and an unfoldable vintage secret letter modal.
- 🕯️ **Interactive Animations & Mini-Games**:
  - Pop-the-Balloons with hidden compliments
  - Cake candle blowout with confetti explosions
  - The Runaway *"No"* button game with funny taunts
  - 3-Second Virtual Hug Charger
  - Pinky Promise stamp
  - Mystery Gift Box reveal
- 🎵 **Romantic Background Music Engine**: Plays custom MP3 audio with an ambient Web Audio music-box synthesizer fallback.

---

## 💻 Local Setup

To test and preview the website on your computer:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run local dev server**:
   ```bash
   npm run dev
   ```
   This will start a local server at `http://localhost:3000` (or similar).

> ⚠️ **IMPORTANT NOTE ON LOCALHOST:**
> `localhost` is strictly for testing on your own computer. Do **NOT** use `localhost` in your QR code, because it will not open on any other device or phone.

---

## 🔐 Change Password

The password is kept in a single, clearly marked configuration variable inside `index.html`.

1. Open [`index.html`](./index.html) in your code editor.
2. Locate the configuration block at around line **615**:
   ```javascript
   // =========================================================================
   // 🔐 CONFIGURATION: CHANGE YOUR SECRET PASSWORD HERE
   // =========================================================================
   const SITE_PASSWORD = "BIRTHDAY123"; // <-- Change this to your chosen password!
   // =========================================================================
   ```
3. Replace `"BIRTHDAY123"` with your secret password (e.g. `"MYLOVE2026"`).
4. Save the file.

---

## 📸 Add Photos

1. Place your photo image file (e.g., `memory.jpg`, `photo.png`) in the root project folder.
2. Open [`index.html`](./index.html) and locate Slide 2 (Memory / Polaroid section at around line **440**):
   ```html
   <div class="polaroid-photo">
     <!-- Replace the SVG illustration with your image: -->
     <img src="memory.jpg" alt="Our Favorite Memory" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;" />
   </div>
   ```
3. Save the file.

---

## 🎵 Add Music

1. Place your chosen `.mp3` song file (e.g., `our-song.mp3`) in the project directory.
2. Open [`index.html`](./index.html) and find the `<audio>` element at around line **372**:
   ```html
   <audio id="bg-audio" loop preload="auto" src="our-song.mp3"></audio>
   ```
3. Set the `src` attribute to your audio file name (e.g., `src="our-song.mp3"`).
4. When the recipient opens the site and taps *"Kholo 💌"*, the song will fade in smoothly!

---

## ✏️ Customize Birthday Content

You can easily customize all text, messages, and memories inside [`index.html`](./index.html):

| What to Change | Where in `index.html` |
|---|---|
| **Cover Title & Subtext** | Slide 0 (`#start-btn` section around line 390) |
| **Birthday Greeting & Wish** | Slide 1 (Heading & text around lines 410–425) |
| **Balloon Compliments** | Slide 1 (`.interactive-balloon` `data-msg` attributes around line 430) |
| **Polaroid Memory & Story** | Slide 2 (`.polaroid-caption` around line 470) |
| **Main Confession Letter** | Slide 3 (`#confession-ink-box` around lines 500–515) |
| **Secret Unfolded Note** | Modal section (`#secret-modal` around lines 595–610) |
| **Reassurance & Promise** | Slide 4 & Slide 5 (`.chunk-para` & `#promise-result` around lines 530–565) |
| **Closing Wish & Final Gift** | Slide 6 (`.main-title` & `#surprise-card` around lines 570–590) |

---

## 🚀 Deploy to Vercel

Follow these step-by-step instructions to deploy your website online for free:

1. **Push your project to GitHub**:
   - Create a new private or public repository on [GitHub](https://github.com).
   - Initialize git and push your project files (`index.html`, `package.json`, `vercel.json`, `README.md`, and any photos/audio).
2. **Sign in to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. **Import the Repository**:
   - Click **"Add New..."** → **"Project"**.
   - Select your birthday website repository from the list and click **"Import"**.
4. **Deploy**:
   - Vercel will automatically detect the static project settings.
   - Click **"Deploy"**.
5. **Copy Your Production URL**:
   - Once deployment completes in seconds, copy the live production URL (e.g., `https://my-birthday-surprise.vercel.app`).
6. **Test on Your Phone**:
   - Open the live URL on your phone's browser to test the password screen, music, and touch gestures.

*(Note: If you use environment variables in the future, configure them in Vercel's Project Settings rather than committing secrets to GitHub).*

---

## 📱 Generate QR Code

To share the website with the birthday person via a physical gift card or letter:

1. Copy your final **live production URL** (for example: `https://my-birthday-surprise.vercel.app`).
2. Go to any free QR code generator (e.g., [qr-code-generator.com](https://www.qr-code-generator.com/) or [qrcode-monkey.com](https://www.qrcode-monkey.com/)).
3. Paste the **production URL** into the generator.
4. *(Optional)* Customize the QR code with a heart color or logo.
5. Download and print or save the QR code image.
6. When the birthday person scans the QR code with their phone camera, it will instantly open the **Password Screen** on their phone!

> ⚠️ **Reminder:** Always test the printed QR code by scanning it with your phone before gifting.

---

## 🔒 Important Security Note

> **"Frontend-only password protection is suitable for a personal/private surprise website but should not be considered strong security. Anyone with sufficient technical knowledge may be able to inspect the frontend code."**

# VIBE (All-in-one hub) Mobile – Interactive HTML Prototype

Front-end-only clickable prototype of the VIBE mobile app (formerly PLAYTOP), with the same onboarding flow as the reference screen recording. Built for a management demo.

**No backend, database, API, OTP or authentication service is used. Every login/registration is simulated in the browser.**

## Run it

Double-click `index.html` (or open it in Chrome / an Android browser). No server or build step is needed.

**Opening animation:** the app starts with the VIBE intro video (`assets/video/vibe-intro.mp4`). Tap **Skip**, or press Esc/Enter, to jump straight in, and use the speaker button to turn sound on. Browsers only autoplay video when it is muted. If the video can't play, an animated VIBE logo is shown instead, and the app then opens on the Customer / LCO screen.

- On desktop, the app is shown inside a phone frame (390 × 844).
- On a phone, it fills the screen. The Android back button works, and so does **Esc** on desktop.
- Fonts load from Google Fonts when online. Offline, the app falls back to the system font and still works.

## Share it online (GitHub Pages)

1. On github.com, click **+ → New repository**. Name it `vibe-demo`, set it to **Public**, and click **Create repository**.
2. Click **uploading an existing file**. Drag in everything **inside** this folder (`index.html`, `css`, `js`, `assets`, `README.md`), not the folder itself. Then click **Commit changes**.
3. Open **Settings → Pages**. Set **Source** to "Deploy from a branch", **Branch** to `main`, and the folder to `/ (root)`. Click **Save**.
4. After 1–2 minutes, the link appears at the top of the Pages settings: `https://<your-username>.github.io/vibe-demo/`.

To update the live demo, upload the changed files again (same steps 1–2 on the existing repo). The site refreshes within a minute or two.

## Demo flow (matches the reference video)

```
App opens on ► Choose an option: Customer | LCO ──► Continue
   ├─ LCO ──────────► Partner/LCO login (LCO code + mobile) ─► Success ─► Home
   └─ Customer ─────► Log in / Register: Broadband | Cable TV | Guest ──► Login
                         ├─ Broadband ─► Join as Broadband User
                         │                 ├─ Registered number ─► Login with mobile only ─► Home
                         │                 └─ New number ───────► User ID field appears ─► Register (User ID + mobile, once) ─► Home
                         ├─ Cable TV ──► Join as Cable User
                         │                 ├─ Registered number ─► Login with mobile only ─► Home
                         │                 └─ New number ───────► VSC field appears ─► Register (VSC + mobile, once) ─► Home
                         ├─ Guest ─────► Join as Guest (mobile only: Register first time, Login after) ─► Home
                         │                 (playing a channel asks the guest to subscribe or preview)
                         └─ "Sign up?" ► Registration form
```

You can go back from any screen before login to change your selection. After login, Home replaces the login screens, so Back does not return to the form.

### Cable TV, Broadband & Guest: register once, then log in with mobile

| User type | First-time registration | After that |
|---|---|---|
| Cable TV | **VSC number** + mobile | Mobile only |
| Broadband | **User ID** + mobile | Mobile only |
| Guest | Mobile only | Mobile only |

- Guests never need a VSC number or User ID. The button reads **Register** for a new number and **Login** for one that's already registered.
- The Cable TV and Broadband screens ask only for the **mobile number** at first.
- If the number hasn't been registered for that service, the VSC number or User ID field opens, and the user registers once.
- From then on, that number logs in with **mobile only**. The hint says, for example, "✓ Registered Broadband user – no User ID needed".
- "New user? Register with …" and "Already registered? Login with mobile number" switch between the two forms.
- Registrations are kept separately per service. A number registered for Broadband still needs a VSC number the first time it's used for Cable TV.
- Registered numbers are saved in this browser (`localStorage`), so they still work after a reload. No server is involved.
- To show the first-time registration again, use **Profile → Reset demo registrations**.

## Home (live TV guide)

The layout matches the production app screenshot:

- **Header:** logo with "& OTT Partners", and pill buttons for **OTT**, **Search** and **Profile**.
- **Second row:** **LTS**, **Genre (8)** and **Language (15)**.
- **Genre rows:** Sports, Entertainment, Movies, News, Kids, Music, Devotional and Infotainment. Each card shows a LIVE badge, programme progress, channel name, time slot and language.
- **What each control does:**
  - **OTT** and **LTS** open option sheets.
  - **Genre** and **Language** filter the guide. Active filters appear as chips you can tap to clear.
  - **Search** filters channels and shows as you type.
  - **See All** opens the full genre grid.
  - Tapping any card, or the yellow TV button, opens a simulated player. It has pause/play and channel switching.
  - **Profile** shows the user's mobile and VSC/LCO details, plus **Change user type** and **Logout**.
- Time slots are generated from the current time, so the guide always looks live.

## Demo inputs

| Field | Rule |
|---|---|
| Mobile number | 10 digits, starting with 6–9. For example: `9876543210` |
| VSC number (Cable TV) | 8–16 digits. For example: `1234567890` |
| User ID (Broadband) | 4–20 letters, numbers or `. _ -`. For example: `roy.bb_01` |
| LCO code | 3 letters + 3–5 digits. For example: `LCO1234` |

Invalid input shakes the field and shows an error message and a toast.

## Structure

```
playtor-demo/
├── index.html          # Shell: device frame, toast, sheet and loader containers
├── css/style.css       # All styling (palette sampled from the video)
├── js/app.js           # Router, screens, validation, toasts, dashboard
├── assets/
│   ├── logo/vibe-logo.png    # full logo with "ALL-IN-ONE HUB" (transparent)
│   ├── logo/vibe-mark.png    # "VIBE" word only, used in the home header
│   ├── video/vibe-intro.mp4  # opening animation (10 s)
│   ├── icons/favicon.png
│   └── images/         # (optional) drop real posters here
└── README.md
```

## Customising

- **Brand/logo:** replace `assets/logo/vibe-logo.png` and `vibe-mark.png`. They're set by the `LOGO` and `MARK` constants in `js/app.js`.
- **Opening animation:** replace `assets/video/vibe-intro.mp4`.
- **Colours:** edit the CSS variables at the top of `css/style.css` (`--accent`, `--card`, `--card-border`, …).
- **Channels:** the `GENRES` array in `js/app.js` sets each genre's name, displayed count and channels (channel, programme, language, colours). Thumbnails are CSS gradients with the programme title, so no image files are needed.
- **Languages / OTT partners:** the `LANGUAGES` and `OTT` arrays.
- **VSC rule:** `EXTRA.vsc` in `js/app.js`. Change `valid` if your VSC format differs.

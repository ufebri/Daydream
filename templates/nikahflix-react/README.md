# 🟥 Nikahflix – React Wedding Invitation

**Nikahflix** is a Netflix-inspired wedding invitation template built with **React + Vite**, and extended by the DayDream project as a dynamic, auto-generated, static site.

---

## ✨ Features

- 🎬 Themed like Netflix (NikahFlix vibes)
- 💬 Tamu bisa kirim ucapan via Supabase (real-time)
- ⚡ Dynamic data via JSON inject (`public/data.json`)
- 🧱 Fully static build (`npm run build`) – ready for Netlify/Vercel
- 📱 Mobile responsive
- 🎨 Customizable theme color & names

---

## 🔧 Development Setup

```bash
npm install
npm run dev
```

Project will run at [http://localhost:5173](http://localhost:5173)

---

## 📦 Inject Data via `data.json`

Place this file in `public/data.json`:

```json
{
  "pegantin": {
    "pria": { "panggilan": "Agus" },
    "wanita": { "panggilan": "Wati" }
  },
  "tanggal_pernikahan": "20 Juli 2025",
  "thumbnail_image_url": "/images/bg.jpg",
  "breaking_news": {
    "image_url": "/images/news.jpg"
  }
}
```

> File ini akan digenerate otomatis oleh sistem DayDream saat order masuk.

---

## 🪄 Powered by DayDream Generator

This template is maintained as part of [DayDream](https://github.com/ufebri/daydream), a generator system for building personalized static wedding invites at scale.

---

© 2025 NikahFlix by DayDream

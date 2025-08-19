# 🎬 YouTube Playlist Length Checker

A **Next.js + Tailwind CSS** web app that calculates the **total duration** of any YouTube playlist.  
It also shows the **number of videos** and the **watch time at different speeds** (1.25x, 1.5x, 1.75x, 2x).

**🌐 Live Demo:** [https://youtube-playlist-length-checker.vercel.app/](https://youtube-playlist-length-checker.vercel.app/)

---

## 🚀 Features
- ✅ Enter a YouTube playlist link and get the total watch time  
- ✅ Displays playlist **title** and **number of videos**  
- ✅ Calculates **watch time at different speeds** (1.25x, 1.5x, 1.75x, 2x)  
- ✅ Modern UI built with **Tailwind CSS**  
- ✅ Fully responsive and fast (thanks to **Next.js 14 App Router**)  
- ✅ Real-time duration calculation using YouTube Data API v3

---

## 📸 Screenshot

![App Screenshot](./Screenshot.png)

---

## 🛠️ Tech Stack
- [Next.js 15](https://nextjs.org/) (React Framework with App Router)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [YouTube Data API v3](https://developers.google.com/youtube/v3) (Data fetching)
- [Vercel](https://vercel.com/) (Deployment)

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 18+ installed
- YouTube Data API v3 key (get it from [Google Cloud Console](https://console.cloud.google.com/))

### Steps

1. **Clone the repository:**
```bash
git clone https://github.com/captainTushar/youtube-playlist-length-checker.git
cd youtube-playlist-length-checker
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env.local` file in the root directory:
```bash
YOUTUBE_API_KEY=your_youtube_api_key_here
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment

This app is deployed on [Vercel](https://vercel.com/). To deploy your own instance:

1. Fork this repository
2. Connect your Vercel account to your GitHub
3. Add your `YOUTUBE_API_KEY` to Vercel's environment variables
4. Deploy!

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/captainTushar/youtube-playlist-length-checker/issues).

---
⭐ **Star this repo if you found it helpful!**

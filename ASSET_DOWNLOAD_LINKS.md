# SWIFTROOMS Asset Download Links

Quick reference guide for downloading and accessing all media assets.

---

## 🎥 YOUTUBE VIDEOS - DOWNLOAD INSTRUCTIONS

### Hero Videos

#### Desktop Background Video
- **YouTube URL:** https://www.youtube.com/watch?v=aP4L7jnKxYA  //banner video desktop
- **Embed URL:** https://www.youtube.com/embed/aP4L7jnKxYA
- **Download:** Use youtube-dl, 4K Video Downloader, or similar tools
- **Recommended Format:** MP4, 720p
- **File Size:** ~50-100MB (estimated)

#### Mobile Background Video  
- **YouTube URL:** https://www.youtube.com/watch?v=wwrYl-50v2E  //banner video mobile
- **Embed URL:** https://www.youtube.com/embed/wwrYl-50v2E
- **Download:** Use youtube-dl, 4K Video Downloader, or similar tools
- **Recommended Format:** MP4, 360p
- **File Size:** ~20-40MB (estimated)

---

### Social Proof Videos

#### Video 1: Dubai Showroom Tour
- **YouTube URL:** https://www.youtube.com/watch?v=iY7D1xLpTgk
- **Direct Link:** https://youtu.be/iY7D1xLpTgk
- **Download Command:** `youtube-dl https://www.youtube.com/watch?v=iY7D1xLpTgk`

#### Video 2: Free Plan & Design Service
- **YouTube URL:** https://www.youtube.com/watch?v=2PiuZIhVJ6g
- **Direct Link:** https://youtu.be/2PiuZIhVJ6g
- **Download Command:** `youtube-dl https://www.youtube.com/watch?v=2PiuZIhVJ6g`

#### Video 3: Palm Jumeirah Bifold
- **YouTube URL:** https://www.youtube.com/watch?v=UKKHuFRtLuI
- **Direct Link:** https://youtu.be/UKKHuFRtLuI
- **Download Command:** `youtube-dl https://www.youtube.com/watch?v=UKKHuFRtLuI`

#### Video 4: Damac Hills Bifold
- **YouTube URL:** https://www.youtube.com/watch?v=rV0EnA0DinE
- **Direct Link:** https://youtu.be/rV0EnA0DinE
- **Download Command:** `youtube-dl https://www.youtube.com/watch?v=rV0EnA0DinE`

#### Video 5: 10-Year Quality
- **YouTube URL:** https://www.youtube.com/watch?v=lRxS5tV1EZ4
- **Direct Link:** https://youtu.be/lRxS5tV1EZ4
- **Download Command:** `youtube-dl https://www.youtube.com/watch?v=lRxS5tV1EZ4`

---

## 📦 DOWNLOAD ALL VIDEOS (Batch Script)

### Using youtube-dl (Command Line)

```bash
# Install youtube-dl first
# pip install youtube-dl

# Download all SWIFTROOMS videos
youtube-dl -f 'bestvideo[height<=720]+bestaudio/best[height<=720]' \
  https://www.youtube.com/watch?v=aP4L7jnKxYA \
  https://www.youtube.com/watch?v=wwrYl-50v2E \
  https://www.youtube.com/watch?v=iY7D1xLpTgk \
  https://www.youtube.com/watch?v=2PiuZIhVJ6g \
  https://www.youtube.com/watch?v=UKKHuFRtLuI \
  https://www.youtube.com/watch?v=rV0EnA0DinE \
  https://www.youtube.com/watch?v=lRxS5tV1EZ4
```

### Using yt-dlp (Modern Alternative)

```bash
# Install yt-dlp
# pip install yt-dlp

# Download all videos in MP4 format
yt-dlp -f 'bv*[height<=720]+ba/b[height<=720]' --merge-output-format mp4 \
  https://www.youtube.com/watch?v=aP4L7jnKxYA \
  https://www.youtube.com/watch?v=wwrYl-50v2E \
  https://www.youtube.com/watch?v=iY7D1xLpTgk \
  https://www.youtube.com/watch?v=2PiuZIhVJ6g \
  https://www.youtube.com/watch?v=UKKHuFRtLuI \
  https://www.youtube.com/watch?v=rV0EnA0DinE \
  https://www.youtube.com/watch?v=lRxS5tV1EZ4
```

---

## 🖼️ FIGMA ASSETS - EXPORT INSTRUCTIONS

All images are stored in Figma with the `figma:asset` scheme. To export:

### Method 1: Via Figma UI
1. Open the Figma file containing SWIFTROOMS assets
2. Select each image asset
3. Right-click → Export → PNG (2x for high quality)
4. Download to local folder

### Method 2: Via Figma API
Use the Figma API to programmatically download assets by their IDs.

### Product Images Export List

```
Product 1: Aluminum Sliding Doors
Asset ID: d6422ad60ba0d7acbef896831a31188dca8bc66a.png

Product 2: UPVC Windows and Doors  
Asset ID: d76e6c1b22e3f7ed8fc8e68c24b7ccfae1eb3155.png

Product 3: Bi-Fold Doors
Asset ID: a873a74894e42cdff9ecd2c1fb02a14d38a18687.png

Product 4: Aluminum Windows
Asset ID: 0f08c2480ba1dad0ecba17dddf82fcfe35766557.png

Product 5: Skylights and Garden Rooms
Asset ID: 265343b936147e3cea1b239d59964ed5e2657d8a.png
```

### Gallery Images Export List

```
Gallery 1: SWIFTROOMS
Asset ID: 543f4bf8a25135f8a5309f98469cc735abb51163.png

Gallery 2: LUXURY HOME
Asset ID: d5f8b1fa2f31142d3146b34b31993458dfa20d62.png

Gallery 3: CONTEMPORARY VILLA
Asset ID: fb642fa8b0498c0c18344a88c44a5659d3d9a1a7.png

Gallery 4: JUMEIRAH GOLF ESTATES
Asset ID: b652f7273996c3088ffbdf6b375a00ac50d72203.png

Gallery 5: DUBAI HILLS
Asset ID: 1cac0798dde90459c7d50ecdaa36c478c66f709a.png

Gallery 6: PALM JUMEIRAH
Asset ID: 22dea6c44e167d98c69bc78a430be9dee74811ba.png

Gallery 7: THE MEADOWS
Asset ID: 47aeaa3e673d1d2bb9b8c4e57078e17afa3e3b37.png

Gallery 8: PHILLIAS FOGGS
Asset ID: 639a0701a47d0ff247dfd6029da5b3d5e4976a0d.png

Gallery 9: THE SPRINGS
Asset ID: e49332f3e7c1bcb35ae200ff9618a5d4cde800e5.png

Gallery 10: AL BARARI - THE NEST
Asset ID: 464d9fe1b70fd273266d99bf2014729adeaada53.png

Gallery 11: UMM SEQUIMM
Asset ID: 2a076fc1e8f572becd354b35b7727696183b5436.png

Gallery 12: DAMAC HILLS (1)
Asset ID: c568cc5308d6af54e01491f1a0397cfe754bf68d.png

Gallery 13: DAMAC HILLS (2)
Asset ID: 7bc7f4a248e23f904fc8529f0c110383f1db67c0.png

Gallery 14: ARABIAN RANCHES
Asset ID: 4db06d323b51658b3160642751a1dff35e2e6663.png
```

### Brand Logo Images Export List

```
Brand 4: 4GEX Logo
Asset ID: 5cd65b8dd83a95980f42df07cc16764bc2c77eb0.png

Brand 5: VETRO Logo
Asset ID: 17f0f5e44208889069e3800833da01d1785f5802.png
```

---

## 🎨 SVG VECTOR EXPORT

SVG logos (SCHÜCO, Deceuninck, CORTIZO) are stored as path data in:
- **File:** `/src/imports/svg-odqll2j1e4.ts`

To export as standalone SVG files:
1. Copy the SVG component code from `/src/app/components/BrandsSection.tsx`
2. Create individual `.svg` files with proper XML headers
3. Save with brand names: `schuco-logo.svg`, `deceuninck-logo.svg`, `cortizo-logo.svg`

---

## 🌐 ALTERNATIVE DOWNLOAD METHODS

### For YouTube Videos

**Online Tools:**
- https://ytmp3.cc/
- https://www.y2mate.com/
- https://savefrom.net/
- https://9convert.com/

**Desktop Software:**
- 4K Video Downloader
- Freemake Video Downloader
- VLC Media Player (Network Stream)

**Browser Extensions:**
- Video DownloadHelper (Firefox/Chrome)
- Easy Video Downloader (Chrome)

---

## 📱 MOBILE APP DOWNLOADS

### iOS (iPhone/iPad)
- **App:** Documents by Readdle
- **Method:** Use built-in browser to download videos

### Android
- **App:** TubeMate
- **App:** VidMate
- **Method:** Direct download from YouTube app alternatives

---

## 💾 RECOMMENDED FILE ORGANIZATION

```
SWIFTROOMS_Assets/
├── Videos/
│   ├── Hero/
│   │   ├── desktop_aP4L7jnKxYA.mp4
│   │   └── mobile_wwrYl-50v2E.mp4
│   └── SocialProof/
│       ├── showroom_iY7D1xLpTgk.mp4
│       ├── design_2PiuZIhVJ6g.mp4
│       ├── palmjumeirah_UKKHuFRtLuI.mp4
│       ├── damachills_rV0EnA0DinE.mp4
│       └── quality_lRxS5tV1EZ4.mp4
├── Images/
│   ├── Products/
│   │   ├── aluminum_sliding_doors.png
│   │   ├── upvc_windows_doors.png
│   │   ├── bifold_doors.png
│   │   ├── aluminum_windows.png
│   │   └── skylights.png
│   ├── Gallery/
│   │   ├── jumeirah_golf_estates.png
│   │   ├── dubai_hills.png
│   │   ├── palm_jumeirah.png
│   │   ├── the_meadows.png
│   │   ├── the_springs.png
│   │   ├── al_barari.png
│   │   ├── damac_hills_1.png
│   │   ├── damac_hills_2.png
│   │   └── arabian_ranches.png
│   └── Brands/
│       ├── 4gex_logo.png
│       └── vetro_logo.png
└── Logos/
    ├── schuco_logo.svg
    ├── deceuninck_logo.svg
    └── cortizo_logo.svg
```

---

## 🔑 ASSET EXPORT CHECKLIST

### Videos
- [ ] Desktop hero video (aP4L7jnKxYA)
- [ ] Mobile hero video (wwrYl-50v2E)
- [ ] Showroom tour (iY7D1xLpTgk)
- [ ] Design service (2PiuZIhVJ6g)
- [ ] Palm Jumeirah (UKKHuFRtLuI)
- [ ] Damac Hills (rV0EnA0DinE)
- [ ] Quality showcase (lRxS5tV1EZ4)

### Product Images
- [ ] Aluminum Sliding Doors
- [ ] UPVC Windows & Doors
- [ ] Bi-Fold Doors
- [ ] Aluminum Windows
- [ ] Skylights & Garden Rooms

### Gallery Images (14 total)
- [ ] All 14 portfolio project images

### Brand Logos
- [ ] SCHÜCO (SVG)
- [ ] Deceuninck (SVG)
- [ ] CORTIZO (SVG)
- [ ] 4GEX (PNG)
- [ ] VETRO (PNG)

---

## 📞 SUPPORT

For questions about asset access:
- **Email:** info@swiftroomsuae.com
- **Phone:** +971 4 457 1004
- **WhatsApp:** +971 50 397 7703

---

**Last Updated:** March 24, 2026  
**Total Download Size:** ~500MB-1GB (estimated for all videos + images)

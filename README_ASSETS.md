# 📦 SWIFTROOMS Landing Page - Complete Assets Package

**Project:** SWIFTROOMS High-Converting Landing Page  
**Company:** UAE-based Aluminum Structure Company  
**Generated:** March 24, 2026  
**Version:** 1.0.0

---

## 📚 Documentation Index

This package contains comprehensive documentation for all media assets, images, videos, logos, and branding materials used in the SWIFTROOMS landing page.

### 📄 Available Documentation Files

1. **SWIFTROOMS_ASSETS_EXPORT.md**
   - Complete detailed export of all assets
   - Technical specifications for each file
   - Import paths and usage locations
   - File sizes and formats

2. **ASSETS_QUICK_REFERENCE.json**
   - Machine-readable asset database
   - Easy lookup for developers
   - Structured data format
   - API-ready format

3. **ASSET_DOWNLOAD_LINKS.md**
   - Direct download instructions
   - YouTube video URLs
   - Batch download scripts
   - Figma export guides

4. **ASSET_USAGE_MAP.md**
   - Visual page layout diagram
   - Asset placement guide
   - Component-level mapping
   - Responsive behavior notes

5. **README_ASSETS.md** (This File)
   - Overview and navigation
   - Quick start guide
   - Summary statistics

---

## 🎯 Quick Summary

### Total Assets: 79+

#### Videos (7 total)
- **2** Hero Section Videos (YouTube)
  - Desktop: 1280x720 (HD)
  - Mobile: 640x360 (Medium)
  
- **5** Social Proof Videos (YouTube)
  - Showroom tours
  - Client testimonials
  - Project showcases

#### Images (21 total)
- **5** Product Images (PNG)
  - Aluminum Sliding Doors
  - UPVC Windows & Doors
  - Bi-Fold Doors
  - Aluminum Windows
  - Skylights & Garden Rooms

- **14** Gallery/Portfolio Images (PNG)
  - Luxury locations (Palm Jumeirah, Dubai Hills, etc.)
  - Before/after showcases
  - High-end residential projects

- **2** Brand Logos (PNG)
  - 4GEX
  - VETRO

#### Vector Graphics (50+)
- **3** SVG Brand Logos
  - SCHÜCO
  - Deceuninck
  - CORTIZO

- **48+** Decorative SVG Elements
  - CAD-style floating elements
  - Background animations
  - Ornamental graphics

---

## 🚀 Quick Start Guide

### For Developers

1. **Read Technical Specs:**
   ```bash
   cat SWIFTROOMS_ASSETS_EXPORT.md
   ```

2. **Access Asset Database:**
   ```bash
   cat ASSETS_QUICK_REFERENCE.json
   ```

3. **View Component Mapping:**
   ```bash
   cat ASSET_USAGE_MAP.md
   ```

### For Designers

1. **Export Figma Assets:**
   - See `ASSET_DOWNLOAD_LINKS.md` → "Figma Assets Export"
   - Follow step-by-step export instructions
   - Use provided Asset IDs for quick lookup

2. **Download Videos:**
   - See `ASSET_DOWNLOAD_LINKS.md` → "YouTube Videos"
   - Use provided download scripts
   - Recommended format: MP4, 720p

### For Content Managers

1. **Understand Asset Placement:**
   - Open `ASSET_USAGE_MAP.md`
   - See visual page layout diagram
   - Identify sections needing updates

2. **Update Asset References:**
   - Use `ASSETS_QUICK_REFERENCE.json` for lookups
   - Cross-reference with component files
   - Test responsive behavior

---

## 📊 Asset Statistics

### By Type
| Type           | Count | Est. Size  |
|----------------|-------|------------|
| Videos         | 7     | 500MB-1GB  |
| Product Images | 5     | 10-15MB    |
| Gallery Images | 14    | 25-35MB    |
| Brand Logos    | 5     | 3-4MB      |
| SVG Elements   | 48+   | <5MB       |
| **TOTAL**      | **79+** | **~550MB-1.1GB** |

### By Section
| Section        | Assets | Types                    |
|----------------|--------|--------------------------|
| Hero           | 2      | Videos                   |
| Products       | 5      | Images                   |
| Brands         | 5      | SVG + PNG Logos          |
| Social Proof   | 5      | Videos                   |
| Gallery        | 14     | Images                   |
| Decorative     | 48+    | SVG Elements             |

### By Format
| Format | Count | Usage                        |
|--------|-------|------------------------------|
| PNG    | 21    | Photos, Logos                |
| MP4    | 7     | Videos (via YouTube)         |
| SVG    | 51+   | Logos, Decorative Graphics   |

---

## 🎨 Brand Assets

### Primary Brand
- **Name:** SWIFTROOMS
- **Color:** #007969 (Teal/Green)
- **Location:** United Arab Emirates

### Typography
1. **Exo** - Headings & Titles
2. **Barlow** - Body Text
3. **Inter** - UI Elements
4. **Rajdhani** - Accents

### Partner Brands
1. SCHÜCO (Premium Windows)
2. Deceuninck (UPVC Systems)
3. CORTIZO (Aluminum Solutions)
4. 4GEX (Glass Systems)
5. VETRO (Specialty Glass)

---

## 🎥 Video Asset Details

### Hero Section

**Desktop Video**
- ID: `aP4L7jnKxYA`
- URL: https://www.youtube.com/watch?v=aP4L7jnKxYA
- Quality: HD720
- Purpose: Desktop background (>1024px)

**Mobile Video**
- ID: `wwrYl-50v2E`
- URL: https://www.youtube.com/watch?v=wwrYl-50v2E
- Quality: Medium
- Purpose: Mobile background (<1024px)

### Social Proof Videos

1. **Showroom Tour** (`iY7D1xLpTgk`)
2. **Design Service** (`2PiuZIhVJ6g`)
3. **Palm Jumeirah** (`UKKHuFRtLuI`)
4. **Damac Hills** (`rV0EnA0DinE`)
5. **Quality Showcase** (`lRxS5tV1EZ4`)

---

## 🖼️ Image Asset Categories

### Products (5 Images)
1. Aluminum Sliding Doors
2. UPVC Windows & Doors
3. Bi-Fold Doors
4. Aluminum Windows
5. Skylights & Garden Rooms

### Portfolio Locations (14 Images)
- Jumeirah Golf Estates
- Dubai Hills
- Palm Jumeirah
- The Meadows
- The Springs
- Al Barari
- Damac Hills (2 projects)
- Arabian Ranches
- Umm Sequimm
- Contemporary Villa
- Luxury Home
- Phillias Foggs
- SWIFTROOMS Showroom

---

## 🔧 Technical Implementation

### Figma Asset Import
```typescript
import assetName from "figma:asset/[ASSET_ID].png";
```

### YouTube Video Embed
```html
<iframe 
  src="https://www.youtube.com/embed/[VIDEO_ID]?autoplay=1&mute=1&loop=1"
  allow="autoplay; fullscreen"
/>
```

### SVG Logo Import
```typescript
import svgPaths from '../../imports/svg-[ID]';
<path d={svgPaths.pathId} fill="white" />
```

### Responsive Image Component
```tsx
import { ImageWithFallback } from './figma/ImageWithFallback';
<ImageWithFallback src={assetName} alt="Description" />
```

---

## 📞 Contact Information

### SWIFTROOMS Contacts
- **Main Office:** +971 4 457 1004
- **WhatsApp:** +971 50 397 7703
- **Email:** info@swiftroomsuae.com
- **Yaseen:** 056 307 1536
- **Murad:** +971 55 505 7319

### Social Media
- **Instagram:** @swiftrooms, @swiftrooms.murad
- **Location Tag:** @addressmontgomerie

---

## 📁 File Structure

```
/
├── SWIFTROOMS_ASSETS_EXPORT.md     # Detailed asset catalog
├── ASSETS_QUICK_REFERENCE.json     # Structured data format
├── ASSET_DOWNLOAD_LINKS.md         # Download instructions
├── ASSET_USAGE_MAP.md              # Visual page layout
└── README_ASSETS.md                # This overview file

/src/app/
├── App.tsx                         # Hero video references
└── components/
    ├── ProductsSection.tsx         # Product images (5)
    ├── GallerySection.tsx          # Portfolio images (14)
    ├── BrandsSection.tsx           # Brand logos (5)
    ├── SocialProofSection.tsx      # Social videos (5)
    └── HeroSection.tsx             # Background videos (2)

/src/imports/
├── svg-*.ts                        # SVG path files (48+)
└── *.tsx                           # Figma component imports
```

---

## ✅ Asset Checklist

Use this checklist when exporting or updating assets:

### Videos
- [ ] Desktop hero video (HD quality)
- [ ] Mobile hero video (Medium quality)
- [ ] 5 social proof videos
- [ ] All videos have proper captions/hashtags
- [ ] Videos are embedded (not downloaded)

### Images
- [ ] 5 product images exported at 2x
- [ ] 14 gallery images with alt text
- [ ] All images optimized for web
- [ ] Proper naming convention used

### Logos
- [ ] 3 SVG logos (inline code)
- [ ] 2 PNG logos (high-res)
- [ ] All logos have transparent backgrounds
- [ ] Proper attribution/licensing

### Documentation
- [ ] Asset IDs documented
- [ ] Usage locations mapped
- [ ] Download links verified
- [ ] Technical specs complete

---

## 🔄 Update History

### Version 1.0.0 (March 24, 2026)
- Initial asset export
- All 79+ assets documented
- Complete video catalog
- Gallery images mapped
- Brand logos cataloged
- Technical documentation complete

---

## 📖 Additional Resources

### Internal Documentation
- `/src/app/components/` - Component source files
- `/src/imports/` - Figma imports and SVG paths
- `package.json` - Dependencies and versions

### External Resources
- **YouTube Channel:** SWIFTROOMS official
- **Figma File:** Original design source
- **Google Fonts:** Typography resources

---

## 🛠️ Tools & Software

### Recommended for Asset Management
- **Figma:** Original design and export
- **YouTube:** Video hosting
- **4K Video Downloader:** Video downloads
- **yt-dlp:** Command-line video downloads
- **ImageOptim:** Image compression
- **SVGO:** SVG optimization

---

## 🎯 Next Steps

1. **Review Documentation**
   - Read all 5 documentation files
   - Familiarize with asset locations
   - Understand technical implementation

2. **Export Assets** (if needed)
   - Follow `ASSET_DOWNLOAD_LINKS.md` instructions
   - Use provided batch scripts
   - Organize in recommended folder structure

3. **Implement/Update**
   - Reference `ASSET_USAGE_MAP.md` for placement
   - Use `ASSETS_QUICK_REFERENCE.json` for lookups
   - Test across devices (desktop/mobile)

4. **Quality Assurance**
   - Verify all assets load correctly
   - Test responsive behavior
   - Check video autoplay functionality
   - Validate lazy loading

---

## 🔒 License & Rights

- **Proprietary Assets:** SWIFTROOMS project
- **Videos:** SWIFTROOMS YouTube channel
- **Partner Logos:** Used with permission
- **Fonts:** Licensed via Google Fonts / custom
- **Code:** Project-specific implementation

**Do not redistribute without authorization.**

---

## 💡 Tips & Best Practices

### For Optimal Performance
1. Use lazy loading for images below the fold
2. Implement responsive images with srcset
3. Compress images without quality loss
4. Use YouTube's adaptive quality settings
5. Inline critical SVGs, lazy-load decorative ones

### For Maintenance
1. Keep asset IDs consistent
2. Document any changes to assets
3. Update this documentation when adding assets
4. Test across browsers and devices
5. Monitor file sizes and load times

### For Updates
1. Export at 2x resolution for retina displays
2. Maintain consistent naming conventions
3. Update both code and documentation
4. Test backward compatibility
5. Archive old versions

---

## 📞 Support

For questions about assets or documentation:

**Email:** info@swiftroomsuae.com  
**Phone:** +971 4 457 1004  
**WhatsApp:** +971 50 397 7703

---

**End of Asset Documentation**

*Last Updated: March 24, 2026*  
*Project: SWIFTROOMS Landing Page*  
*Total Assets: 79+ (Videos, Images, Logos, SVGs)*  
*Total Size: ~550MB - 1.1GB*

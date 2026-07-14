import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, MessageCircle, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Figma-hosted project imagery (same assets as the previous showcase)
import imgComponent42 from "figma:asset/b652f7273996c3088ffbdf6b375a00ac50d72203.png";
import imgComponent44 from "figma:asset/1cac0798dde90459c7d50ecdaa36c478c66f709a.png";
import imgComponent45 from "figma:asset/22dea6c44e167d98c69bc78a430be9dee74811ba.png";
import imgComponent46 from "figma:asset/47aeaa3e673d1d2bb9b8c4e57078e17afa3e3b37.png";
import imgGroup143726098 from "figma:asset/639a0701a47d0ff247dfd6029da5b3d5e4976a0d.png";
import imgComponent48 from "figma:asset/e49332f3e7c1bcb35ae200ff9618a5d4cde800e5.png";
import imgComponent49 from "figma:asset/464d9fe1b70fd273266d99bf2014729adeaada53.png";
import imgComponent50 from "figma:asset/2a076fc1e8f572becd354b35b7727696183b5436.png";
import imgComponent51 from "figma:asset/c568cc5308d6af54e01491f1a0397cfe754bf68d.png";
import imgComponent53 from "figma:asset/4db06d323b51658b3160642751a1dff35e2e6663.png";

// WhatsApp deep-link (same number/message used across the landing page)
const WHATSAPP_EXPERT_URL =
  'https://wa.me/971505269149?text=Hi%20Swiftrooms%2C%20I%27d%20like%20to%20speak%20with%20an%20expert%20about%20windows%2C%20doors%20or%20a%20glass%20room%20for%20my%20villa.';

type ProjectType = 'Villa' | 'Apartment' | 'Garden Room' | 'Commercial';

interface Project {
  id: number;
  url: string;
  location: string;
  description: string;
  type: ProjectType;
  product: string;
}

// Curated visual showcase — a selection of completed Swiftrooms projects across
// recognisable UAE communities. Kept to a focused set of top picks; this is a
// visual trust-building menu, not a full portfolio hub.
const projects: Project[] = [
  {
    id: 4,
    url: imgComponent42,
    location: 'Jumeirah Golf Estates',
    description: 'Luxury aluminium structure project',
    type: 'Villa',
    product: 'Sliding Doors',
  },
  {
    id: 5,
    url: imgComponent44,
    location: 'Dubai Hills',
    description: 'Premium residential aluminium installation',
    type: 'Villa',
    product: 'Glass Room',
  },
  {
    id: 6,
    url: imgComponent45,
    location: 'Palm Jumeirah',
    description: 'Exclusive aluminium doors and windows',
    type: 'Apartment',
    product: 'Bifold Doors',
  },
  {
    id: 7,
    url: imgComponent46,
    location: 'The Meadows',
    description: 'High-end aluminium structure solutions',
    type: 'Villa',
    product: 'Aluminium Windows',
  },
  {
    id: 8,
    url: imgGroup143726098,
    location: "Phileas Fogg's",
    description: 'Custom aluminium installation for a hospitality venue',
    type: 'Commercial',
    product: 'Glass Room',
  },
  {
    id: 9,
    url: imgComponent48,
    location: 'The Springs',
    description: 'Modern aluminium architectural design',
    type: 'Villa',
    product: 'uPVC Systems',
  },
  {
    id: 10,
    url: imgComponent49,
    location: 'Al Barari — The Nest',
    description: 'Premium aluminium structures',
    type: 'Villa',
    product: 'Skylights',
  },
  {
    id: 11,
    url: imgComponent50,
    location: 'Umm Suqeim',
    description: 'Contemporary garden room installation',
    type: 'Garden Room',
    product: 'Glass Room',
  },
  {
    id: 12,
    url: imgComponent51,
    location: 'Damac Hills',
    description: 'Luxury aluminium doors and windows',
    type: 'Villa',
    product: 'Sliding Doors',
  },
  {
    id: 14,
    url: imgComponent53,
    location: 'Arabian Ranches',
    description: 'Premium aluminium architectural solutions',
    type: 'Villa',
    product: 'Bifold Doors',
  },
];

// Interactive filter menu — only surface categories that actually have projects.
const FILTERS: { label: string; type: ProjectType | 'All' }[] = [
  { label: 'All Projects', type: 'All' },
  { label: 'Villas', type: 'Villa' },
  { label: 'Apartments', type: 'Apartment' },
  { label: 'Garden Rooms', type: 'Garden Room' },
  { label: 'Commercial', type: 'Commercial' },
];

function scrollToLeadForm() {
  const formSection = document.getElementById('contact-form');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => window.dispatchEvent(new Event('openLeadForm')), 500);
  }
}

interface ProjectCardProps {
  project: Project;
  /** Mobile carousel cards get a fixed width; desktop grid cards flex to the grid. */
  variant: 'grid' | 'carousel';
}

function ProjectCard({ project, variant }: ProjectCardProps) {
  const isCarousel = variant === 'carousel';
  return (
    <motion.article
      data-card
      // Framer's `layout` retransforms cards on reflow, which fights native
      // horizontal scroll — so only the desktop grid animates layout.
      layout={!isCarousel}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={isCarousel ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-black/5 ${
        isCarousel
          ? 'snap-center shrink-0 w-[78vw] max-w-[320px] aspect-[3/4]'
          : 'aspect-[4/5]'
      }`}
    >
      <ImageWithFallback
        src={project.url}
        alt={`${project.location} — ${project.description}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />

      {/* Readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

      {/* Type tag — top left */}
      <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1 font-accent text-[10px] lg:text-[11px] font-semibold uppercase tracking-[.12em] text-[#007969] shadow-sm backdrop-blur">
        {project.type}
      </span>

      {/* Product tag — top right */}
      <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-[#007969]/90 px-3 py-1 font-body text-[10px] lg:text-[11px] font-medium text-white shadow-sm backdrop-blur">
        {project.product}
      </span>

      {/* Location + description overlay — bottom */}
      <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
        <div className="flex items-center gap-1.5 text-white/80">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="font-accent text-[10px] lg:text-[11px] uppercase tracking-[.14em]">
            United Arab Emirates
          </span>
        </div>
        <h3 className="mt-1 font-heading text-lg lg:text-xl font-semibold text-white tracking-wide">
          {project.location}
        </h3>
        <p className="mt-0.5 max-h-0 overflow-hidden font-body text-sm leading-relaxed text-white/85 opacity-0 transition-all duration-500 ease-out group-hover:max-h-24 group-hover:opacity-100">
          {project.description}
        </p>
      </div>
    </motion.article>
  );
}

// Native scroll-snap carousel for mobile. Uses real overflow scrolling (no
// scroll hijacking, no transform-based track) so vertical page scrolling stays
// smooth and swiping never freezes.
function MobileCarousel({ items }: { items: Project[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const rafRef = useRef<number | null>(null);

  // Reset to the first card whenever the filtered set changes.
  useEffect(() => {
    setActive(0);
    scrollerRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  }, [items]);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = scrollerRef.current;
      if (!el) return;
      const viewportCenter = el.getBoundingClientRect().left + el.clientWidth / 2;
      const cards = el.querySelectorAll<HTMLElement>('[data-card]');
      let closest = 0;
      let min = Infinity;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - viewportCenter);
        if (dist < min) {
          min = dist;
          closest = i;
        }
      });
      setActive(closest);
    });
  }, []);

  const scrollToIndex = (i: number) => {
    const card = scrollerRef.current?.querySelectorAll<HTMLElement>('[data-card]')[i];
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div className="md:hidden">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-4 [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ WebkitOverflowScrolling: 'touch', scrollPaddingInline: '1rem' }}
      >
        {items.map((project) => (
          <ProjectCard key={project.id} project={project} variant="carousel" />
        ))}
      </div>

      {/* Pagination dots — tap to jump */}
      <div className="mt-1 flex items-center justify-center gap-1.5">
        {items.map((project, i) => (
          <button
            key={project.id}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to project ${i + 1}`}
            className="flex h-11 items-center justify-center px-0.5"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                active === i ? 'h-1.5 w-6 bg-[#007969]' : 'h-1.5 w-1.5 bg-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      <p className="text-center font-body text-xs text-gray-400">← Swipe to browse →</p>
    </div>
  );
}

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<ProjectType | 'All'>('All');

  const filtered = useMemo(
    () => (activeFilter === 'All' ? projects : projects.filter((p) => p.type === activeFilter)),
    [activeFilter],
  );

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-16 lg:py-24"
    >
      {/* Subtle brand glow accents */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
        <div className="absolute top-24 left-10 h-40 w-40 rounded-full bg-[#007969]/10 blur-3xl" />
        <div className="absolute bottom-24 right-10 h-48 w-48 rounded-full bg-[#007969]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 lg:px-16">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-medium text-[#1c1c1e] sm:text-4xl">
            Real Projects Across the UAE
          </h2>
          <div className="divider-brand mx-auto my-3" />
          <p className="font-body text-sm text-[#3a3a3c] lg:text-base">
            Explore a selection of completed Swiftrooms installations across luxury villas,
            residential spaces and commercial projects.
          </p>

          <motion.a
            href="https://www.instagram.com/swiftrooms.ae/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 font-body text-xs text-[#007969] transition-colors lg:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="h-4 w-4 lg:h-5 lg:w-5" />
            <span className="tracking-tight">@swiftrooms</span>
            <span className="text-[10px] text-[#6b7280] lg:text-xs">• Follow us for more</span>
          </motion.a>
        </motion.div>

        {/* Interactive filter menu */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:mt-10 lg:gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.type;
            return (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.type)}
                aria-pressed={isActive}
                className={`relative min-h-[44px] rounded-full px-4 py-2 font-accent text-[11px] font-semibold uppercase tracking-[.12em] ring-1 ring-inset transition-colors duration-200 lg:text-xs ${
                  isActive
                    ? 'text-white ring-transparent'
                    : 'text-[#3a3a3c] ring-[#00796933] hover:text-[#007969] hover:ring-[#00796966]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="gallery-filter-pill"
                    className="absolute inset-0 rounded-full bg-[#007969] shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Desktop: premium masonry-style grid */}
        <motion.div
          layout
          className="mt-8 hidden md:grid grid-cols-2 gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} variant="grid" />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mobile: swipeable carousel (native scroll — no scroll-locking) */}
        <MobileCarousel items={filtered} />

        {/* Conversion CTAs — keep users inside the landing page journey */}
        <motion.div
          className="mt-12 text-center lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 font-heading text-lg font-medium text-[#1c1c1e] sm:text-xl lg:text-2xl">
            Inspired by these projects?
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={scrollToLeadForm} className="btn-brand w-full text-base sm:w-auto lg:text-lg">
              Get Free Quote
            </button>
            <a
              href={WHATSAPP_EXPERT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Expert
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

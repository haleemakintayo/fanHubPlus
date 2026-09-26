-- =============================================================================
-- Fan Hub Plus: Initial Database Seeding Script (seed_data.sql)
-- Populates the 8 Core Fandom Categories, Sample Content Items (Articles,
-- Videos, Audio), Character Profiles, Merchandise Drops, Location-Aware
-- Events, and FandomBot Curated FAQ Knowledge Base entries.
-- (Note: You can also run `python manage.py seed_fanhub` for ORM seeding.)
-- =============================================================================

BEGIN;

-- 1. Seed 8 Core Fandom Categories
INSERT INTO fandoms_category (name, slug, description, accent_color, icon_name, entry_count_label, featured_quote, top_pick, created_at)
VALUES
  ('Anime', 'anime', 'Seasonal simulcasts, character bios, and opening theme breakdowns.', '#A3E635', 'Tv', '240+ Entries', 'Dedicate your hearts to the truth across timelines.', 'Solo Leveling: Arise', CURRENT_TIMESTAMP),
  ('Gaming', 'gaming', 'Patch metas, lore archives, speedrun highlights, and cinematics.', '#FACC15', 'Gamepad2', '180+ Entries', 'Wake up, Samurai. We have a universe to burn.', 'Elden Ring: Nightreign', CURRENT_TIMESTAMP),
  ('Movies & TV', 'movies-tv', 'Cinematic universe timelines, trailers, and cast interviews.', '#38BDF8', 'Film', '310+ Entries', 'The multiverse is a concept about which we know frighteningly little.', 'Avengers: Secret Wars Timeline', CURRENT_TIMESTAMP),
  ('K-Pop', 'kpop', 'Comeback calendars, MV streams, discographies, and lightstick guides.', '#F43F5E', 'Mic2', '125+ Entries', 'Music has no borders; the harmony transcends language.', 'NewJeans Global Tour', CURRENT_TIMESTAMP),
  ('Comics', 'comics', 'Multiverse reading orders, variant covers, and issue releases.', '#FB7185', 'Zap', '95+ Entries', 'With great power comes the responsibility to preserve the timeline.', 'Ultimate Spider-Man 2026', CURRENT_TIMESTAMP),
  ('Manga', 'manga', 'Chapter trackers, author spotlights, and genre indexes.', '#FB923C', 'BookOpen', '150+ Entries', 'Even if all the stars fade, the ink never truly dies.', 'Berserk Legacy Continuation', CURRENT_TIMESTAMP),
  ('Cosplay', 'cosplay', 'Build logs, prop crafting guides, and convention galleries.', '#C084FC', 'Sparkles', '85+ Entries', 'Bring the fictional dream into tactile, wearable reality.', 'WCS 2026 Champion Armor', CURRENT_TIMESTAMP),
  ('Community Vault', 'community-vault', 'Fan-submitted essays, reviews, and art showcases (Admin-approved).', '#34D399', 'ShieldCheck', '60+ Entries', 'Admin-vetted fan canon, free of spam and toxic clutter.', 'The Multiverse Paradox Thesis', CURRENT_TIMESTAMP)
ON CONFLICT (slug) DO NOTHING;

-- 2. Seed Sample Fandom Content Items (Articles, Videos, Audio)
INSERT INTO fandoms_contentitem (
  category_id, title, slug, content_type, description, body_text,
  media_url, thumbnail_url, release_year, genre_tags, popularity_score,
  view_count, duration_seconds, is_featured, is_approved, created_at, updated_at
)
SELECT
  c.id,
  'Jujutsu Kaisen Shinjuku Showdown: Domain Clashes & Barrier Physics',
  'jujutsu-kaisen-shinjuku-showdown',
  'ARTICLE',
  'A technical breakdown of Gojo vs. Sukuna barrier conditions, binding vows, and cursed technique burnouts.',
  'In the ruins of Shinjuku Ward, Satoru Gojo and Ryomen Sukuna rewrite the established laws of jujutsu sorcery through five consecutive Domain Expansion clashes.',
  '',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
  2026,
  'Shonen,Jujutsu Kaisen,Lore Analysis,Spring 2026',
  4.95,
  48200,
  0,
  TRUE,
  TRUE,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM fandoms_category c WHERE c.slug = 'anime'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO fandoms_contentitem (
  category_id, title, slug, content_type, description, body_text,
  media_url, thumbnail_url, release_year, genre_tags, popularity_score,
  view_count, duration_seconds, is_featured, is_approved, created_at, updated_at
)
SELECT
  c.id,
  'GTA VI Vice City Lore: Leonida Cartels & Economic Ecosystem',
  'gta-vi-vice-city-lore',
  'ARTICLE',
  'Mapping the criminal syndicates, wetlands smuggling routes, and satirical social media network of modern-day Leonida.',
  'Returning to Vice City after two decades means stepping into a hyper-satirical mirror of modern Florida across Leonida.',
  'https://www.youtube.com/embed/QdBZY2fkU-0',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  2026,
  'Open World,GTA VI,Lore Bible,Action',
  4.92,
  83100,
  165,
  TRUE,
  TRUE,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM fandoms_category c WHERE c.slug = 'gaming'
ON CONFLICT (slug) DO NOTHING;

-- 3. Seed Sample Character Profiles
INSERT INTO fandoms_characterprofile (
  category_id, name, slug, alias, archetype, faction, origin, tagline,
  image_url, biography, stats_json, details_json, created_at
)
SELECT
  c.id,
  'Ryuto Kazama',
  'ryuto-kazama',
  'Titan Slayer',
  'Anime Protagonist',
  'Survey Scout Vanguard Neo',
  'Scout Regiment Neo • District Shiganshina 2.0',
  'The wall wasn’t built to keep the titans in. It was built to protect them from us.',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
  'Surviving the fall of District 7, Ryuto mastered the 3D maneuver gear before turning 16.',
  '[{"label":"Agility","value":94},{"label":"Power","value":88},{"label":"Strategic IQ","value":92}]',
  '{"firstAppearance":"Ch. 01 Awakening of the Bloodline","weapon":"Dual Thunder Spears","nemesis":"The Colossal Behemoth"}',
  CURRENT_TIMESTAMP
FROM fandoms_category c WHERE c.slug = 'anime'
ON CONFLICT (slug) DO NOTHING;

-- 4. Seed Sample Merchandise Showcase Items
INSERT INTO merchandise_merchandiseitem (
  category_id, name, slug, tag, drop_date_text, msrp, manufacturer,
  image_url, description, view_count, popularity_score, is_upcoming, release_date, created_at
)
SELECT
  c.id,
  'EVA-01 Berserk Mode 1/4 Scale Statue',
  'eva-01-berserk-statue',
  'LIMITED_EDITION',
  'Oct 15, 2026 • 12:00 PM EST',
  '$340 MSRP (Preview)',
  'Prime 1 Studio x Khara',
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
  'Cold-cast porcelain polystone statue featuring LED fluorescent blood splatter and swappable roaring head sculpt.',
  3820,
  4.9,
  TRUE,
  '2026-10-15',
  CURRENT_TIMESTAMP
FROM fandoms_category c WHERE c.slug = 'anime'
ON CONFLICT (slug) DO NOTHING;

-- 5. Seed Sample Location-Aware Conventions & Gatherings
INSERT INTO events_event (
  category_id, name, slug, city, venue, event_type,
  start_date, end_date, date_month_label, date_day_label, year_label,
  expected_attendees, status_label, latitude, longitude, map_x_percent, map_y_percent,
  description, external_ticket_url, is_past_event, created_at
)
SELECT
  c.id,
  'Comiket 106 Summer Fan Showcase',
  'comiket-106-tokyo',
  'Tokyo',
  'Tokyo Big Sight, Odaiba',
  'CONVENTION',
  '2026-10-14',
  '2026-10-16',
  'OCT',
  '14-16',
  '2026',
  '160,000+ Expected',
  'Official Schedule Vetted',
  35.6300,
  139.7930,
  78,
  35,
  'The premier global dojinshi and anime exhibition bringing together indie artists, official studios, and massive cosplay gatherings.',
  'https://www.comiket.co.jp/index_e.html',
  FALSE,
  CURRENT_TIMESTAMP
FROM fandoms_category c WHERE c.slug = 'anime'
ON CONFLICT (slug) DO NOTHING;

-- 6. Seed FandomBot Curated FAQ Knowledge Base
INSERT INTO chatbot_chatbotfaq (
  question, keywords, answer_text, badge_label, universe_tag, priority, is_active, created_at
)
VALUES
  (
    'Recommend me an anime like Attack on Titan',
    'anime,attack on titan,recommend,recommendations,shonen,seinen',
    'Top 3 recommendations if you love Attack on Titan: 1. 86 (Eighty-Six), 2. Vinland Saga, 3. Claymore.',
    'Anime Lore • Curated',
    'Anime',
    10,
    TRUE,
    CURRENT_TIMESTAMP
  ),
  (
    'Where do I start reading X-Men comics?',
    'x-men,comics,reading order,marvel,krakoa,start',
    'Cleanest modern X-Men jumping-on points: 1. House of X / Powers of X (2019), 2. X-Men: From the Ashes (2024-2026), 3. Astonishing X-Men.',
    'Comics Timeline • Verified',
    'Comics',
    9,
    TRUE,
    CURRENT_TIMESTAMP
  )
ON CONFLICT DO NOTHING;

COMMIT;

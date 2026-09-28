-- =============================================================================
-- Fan Hub Plus — MySQL Workbench & CLI Compatible Seed Data Script (seed_data.sql)
-- Schema: funhubplus
-- Synchronized with:
--   1. fanHubPlus_backend/fandoms/management/commands/seed_data.py
--   2. fanHubPlus_backend/seed_db.py
--   3. Fanhub_frontend/src/data/fandomData.js
--
-- Usage in MySQL Workbench:
--   1. File -> Open SQL Script... -> select seed_data.sql
--   2. Click the Execute (Lightning Bolt) icon
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `funhubplus` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `funhubplus`;

SET NAMES utf8mb4;
SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 0;
START TRANSACTION;

-- -----------------------------------------------------------------------------
-- 0. Clean Existing Seeded Tables (Child-to-Parent Order)
-- -----------------------------------------------------------------------------
DELETE FROM chatbot_chatbotquery;
DELETE FROM chatbot_chatbotfaq;
DELETE FROM interactions_useractivity;
DELETE FROM interactions_feedback;
DELETE FROM interactions_fansubmission;
DELETE FROM interactions_contentrating;
DELETE FROM interactions_bookmark;
DELETE FROM fandoms_charactersubmission;
DELETE FROM events_event;
DELETE FROM merchandise_merchandiseitem;
DELETE FROM fandoms_streammedia;
DELETE FROM fandoms_characterprofile;
DELETE FROM fandoms_content;
DELETE FROM accounts_profile_favorite_categories;
DELETE FROM fandoms_category;
DELETE FROM accounts_profile WHERE user_id IN (SELECT id FROM accounts_user WHERE email IN ('admin@fanhub.com', 'fan@fanhub.com'));
DELETE FROM accounts_user WHERE email IN ('admin@fanhub.com', 'fan@fanhub.com');

-- -----------------------------------------------------------------------------
-- 1. Demo & Admin Accounts (accounts_user & accounts_profile)
--    Admin:  admin@fanhub.com / AdminPass123!
--    Member: fan@fanhub.com   / MemberPass123!
-- -----------------------------------------------------------------------------
INSERT INTO accounts_user (
  password, last_login, is_superuser, first_name, last_name,
  is_staff, is_active, date_joined, username, email,
  role, is_verified, created_at, updated_at
) VALUES
(
  'pbkdf2_sha256$870000$fanhubadmin2026$OaoNt4lXoyZ6Wba7Gj55A55LcqnUBUADAjdl4Khig1Y=', NULL, 1, 'Admin', 'Moderator',
  1, 1, NOW(), 'admin_fanhub', 'admin@fanhub.com',
  'ADMIN', 1, NOW(), NOW()
),
(
  'pbkdf2_sha256$870000$fanhubmember2026$Lz+l4vMr93S9o7uEIjNTbqDHi1FBXmgmOhn+1CloSbM=', NULL, 0, 'Cyber', 'Otaku',
  0, 1, NOW(), 'cyber_otaku', 'fan@fanhub.com',
  'MEMBER', 1, NOW(), NOW()
);

INSERT INTO accounts_profile (
  user_id, avatar, bio, theme_preference, font_size_preference,
  dashboard_preferences, updated_at
) VALUES
(
  (SELECT id FROM accounts_user WHERE email = 'admin@fanhub.com'),
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80',
  'Chief Platform Administrator & Canon Vault Moderator.',
  'DARK', 'NORMAL', '{}', NOW()
),
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80',
  'Collector of 1/4 scale mecha statues, Night City lore archivist, and Shonen simulcast tracker.',
  'DARK', 'NORMAL', '{}', NOW()
);

-- -----------------------------------------------------------------------------
-- 2. The 8 Mandatory Fandom Categories (fandoms_category)
-- -----------------------------------------------------------------------------
INSERT INTO fandoms_category (
  name, slug, description, icon, accent_color,
  badge_text_color, entry_count, tags, top_pick, featured_quote, created_at
) VALUES
(
  'Anime', 'anime', 'Seasonal simulcasts, character bios, and opening theme breakdowns.',
  'Tv', '#A3E635', 'text-black',
  '240+ Entries', '["Simulcasts", "Theme Songs", "Character Lore", "Spring 2026"]', 'Solo Leveling: Arise',
  '“Dedicate your hearts to the truth across timelines.”', NOW()
),
(
  'Gaming', 'gaming', 'Patch metas, lore archives, speedrun highlights, and cinematics.',
  'Gamepad2', '#FACC15', 'text-black',
  '180+ Entries', '["Patch 14.2", "Speedruns", "Esports", "Lore Bible"]', 'Elden Ring: Nightreign',
  '“Wake up, Samurai. We have a universe to burn.”', NOW()
),
(
  'Movies & TV', 'movies-tv', 'Cinematic universe timelines, trailers, and cast interviews.',
  'Film', '#38BDF8', 'text-black',
  '310+ Entries', '["Canon Timelines", "4K Teasers", "Casting Leaks", "Director Cuts"]', 'Avengers: Secret Wars Timeline',
  '“The multiverse is a concept about which we know frighteningly little.”', NOW()
),
(
  'K-Pop', 'kpop', 'Comeback calendars, MV streams, discographies, and lightstick guides.',
  'Mic2', '#F43F5E', 'text-white',
  '125+ Entries', '["Comeback Radar", "Discography", "Lightstick Sync", "Fanchants"]', 'NewJeans Global Tour',
  '“Music has no borders; the harmony transcends language.”', NOW()
),
(
  'Comics', 'comics', 'Multiverse reading orders, variant covers, and issue releases.',
  'Zap', '#FB7185', 'text-black',
  '95+ Entries', '["Issue Runs", "Earth Timelines", "Variant Art", "Key Issues"]', 'Ultimate Spider-Man 2026',
  '“With great power comes the responsibility to preserve the timeline.”', NOW()
),
(
  'Manga', 'manga', 'Chapter trackers, author spotlights, and genre indexes.',
  'BookOpen', '#FB923C', 'text-black',
  '150+ Entries', '["Chapter Drops", "Mangaka Spotlight", "Raw Scans", "Seinen Top"]', 'Berserk Legacy Continuation',
  '“Even if all the stars fade, the ink never truly dies.”', NOW()
),
(
  'Cosplay', 'cosplay', 'Build logs, prop crafting guides, and convention galleries.',
  'Sparkles', '#C084FC', 'text-black',
  '85+ Entries', '["Foam Crafting", "3D Printing", "Con Galleries", "LED Wiring"]', 'WCS 2026 Champion Armor',
  '“Bring the fictional dream into tactile, wearable reality.”', NOW()
),
(
  'Community Vault', 'community-vault', 'Fan-submitted essays, reviews, and art showcases (Admin-approved).',
  'ShieldCheck', '#34D399', 'text-black',
  '60+ Entries', '["Fan Essays", "Lore Theories", "Verified Art", "Moderator Picks"]', 'The Multiverse Paradox Thesis',
  '“Admin-vetted fan canon, free of spam and toxic clutter.”', NOW()
);

-- -----------------------------------------------------------------------------
-- 2B. Demo Member Favorite Categories (accounts_profile_favorite_categories)
-- -----------------------------------------------------------------------------
INSERT INTO accounts_profile_favorite_categories (profile_id, category_id) VALUES
((SELECT id FROM accounts_profile WHERE user_id = (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com')), (SELECT id FROM fandoms_category WHERE slug = 'anime')),
((SELECT id FROM accounts_profile WHERE user_id = (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com')), (SELECT id FROM fandoms_category WHERE slug = 'gaming')),
((SELECT id FROM accounts_profile WHERE user_id = (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com')), (SELECT id FROM fandoms_category WHERE slug = 'comics'));

-- -----------------------------------------------------------------------------
-- 3. Curated Content (33 items: 6 Media + 27 Articles) (fandoms_content)
-- -----------------------------------------------------------------------------
INSERT INTO fandoms_content (
  title, slug, category_id, content_type, media_url,
  thumbnail_url, body_text, synopsis, artist_or_author, duration,
  duration_seconds, release_date, release_year, popularity_score, view_count,
  is_published, created_at, updated_at
) VALUES
(
  'Cyberpunk: Edgerunners - Official Teaser',
  'cyberpunk-edgerunners',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'VIDEO',
  'https://youtu.be/x4ztgjvfU60?si=qQfMO9HWMUkkHiYD',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  'Night City changes everyone who enters its chrome-plated borders. Explore David Martinez and Lucy''s journey through the violent cyberware underworld.',
  'A street kid trying to survive in Night City — a tech and body modification-obsessed city of the future. Studio Trigger x CD PROJEKT RED high-octane spectacle.',
  'Studio Trigger & CDPR',
  '02:45',
  165,
  '2026-09-01',
  '2026 Remaster',
  4.9,
  4200000,
  1,
  NOW(), NOW()
),
(
  'Demon Slayer: Infinity Castle - Cinematic Teaser',
  'infinity-castle',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'VIDEO',
  'https://youtu.be/x7uLutVRBfI?si=IOwYzPC81-fkXm6h',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
  'Muzan Kibutsuji awaits within the extra-dimensional fortress. Tanjiro and the Hashira prepare for the ultimate fight.',
  'The final confrontation draws near as the Demon Slayer Corps breaches the endless shifting corridors of the Infinity Castle.',
  'ufotable',
  '03:12',
  192,
  '2026-09-01',
  '2026 Theatrical Run',
  5.0,
  7800000,
  1,
  NOW(), NOW()
),
(
  'Spider-Man: Beyond The Spider-Verse Sneak Peek',
  'spider-multiverse',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'VIDEO',
  'https://youtu.be/qclHAbmDOJI?si=m0xKcgqUcJQq9xG1',
  'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80',
  'Trapped on Earth-42, Miles must confront an alternate reality where Peter Parker never existed, while Gwen Stacy leads a rogue Spider-band.',
  'Miles Morales traverses the chromatic spectrum of anomalous dimensions to rewrite the canonical destiny of all Spider-heroes.',
  'Sony Pictures Animation',
  '02:18',
  138,
  '2026-09-01',
  '2026 Columbia / Marvel',
  4.8,
  5100000,
  1,
  NOW(), NOW()
),
(
  'Supernova (Armageddon)',
  'kpop-supernova',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'AUDIO',
  'https://music.youtube.com/watch?v=LCIs3JXb5Aw&si=VHjPjewrlV0a-iX3',
  'https://i.ytimg.com/vi/LCIs3JXb5Aw/hqdefault.jpg',
  'Armageddon The 1st Album title cut remastered for high-fidelity spatial audio systems.',
  'Hyperpop basslines collide with celestial harmonies in this official Armageddon title track.',
  'Aespa',
  '02:59',
  179,
  '2026-09-01',
  'Armageddon Special',
  4.9,
  148000,
  1,
  NOW(), NOW()
),
(
  'MONEY CONSTANT',
  'money-constant',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'AUDIO',
  'https://music.youtube.com/watch?v=dw8HOrauCdI&si=NipHbZbrNTxc-WH_',
  'https://i.ytimg.com/vi/dw8HOrauCdI/hqdefault.jpg',
  'DJ Maphorisa, DJ Tunez, Wizkid, and Mavo unite on SOUTH GIDI • 2025.',
  'High-energy Amapiano and Afrobeats collaboration from SOUTH GIDI • 2025.',
  'DJ Maphorisa, DJ Tunez, Wizkid & Mavo',
  '03:48',
  228,
  '2026-09-01',
  '2025',
  4.95,
  223000,
  1,
  NOW(), NOW()
),
(
  'Calm Down',
  'calm-down',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'AUDIO',
  'https://music.youtube.com/watch?v=CQLsdm1ZYAw&si=MFyp9PgpIsLRBOgb',
  'https://i.ytimg.com/vi/CQLsdm1ZYAw/hqdefault.jpg',
  'Rema delivers a timeless melodic anthem dominating global streaming charts.',
  'Global Afrobeats phenomenon by Rema with over 705M views and 5.2M likes.',
  'Rema',
  '03:59',
  239,
  '2026-09-01',
  '705M views',
  5.0,
  705000000,
  1,
  NOW(), NOW()
),
(
  'Jujutsu Kaisen: Shinjuku Showdown Arc & Domain Clash Mechanics',
  'jujutsu-kaisen-shinjuku-showdown',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
  '## 01. Open vs. Closed Barrier Physics in Shinjuku

For over two hundred chapters, Gege Akutami seeded the mechanics of Domain Expansion as the apex of Jujutsu sorcery. Yet until December 24 in Shinjuku, readers had never witnessed how an open-barrier masterpiece like Malevolent Shrine interacts with the metaphysical perfection of Unlimited Void.

Rather than a simple power-level tug-of-war, the five consecutive domain clashes operated like high-stakes systems engineering. By flipping his barrier conditions—strengthening the outer shell against Sukuna’s slashing radius at the cost of internal stability—Gojo demonstrated why combat improvisation matters more than raw cursed energy reserves.

> “Inside the Prison Realm, experiencing a dimension with no physical volume taught Gojo how to compress an infinite void into the palm of his hand.”

## 02. Mahoraga’s Adaptation & The Blueprint for Infinity

The true chess match beneath the hand-to-hand spectacle revolved around the Eight-Handled Sword Divergent Sila Divine General Mahoraga. Sukuna did not merely summon the Ten Shadows shikigami as a shield; he used Megumi Fushiguro’s soul synchronization to shoulder the burden of adaptation across five domain cycles.

Crucially, Mahoraga’s first adaptation altered the nature of its own cursed energy to neutralize Infinity—something Sukuna could not replicate. Waiting for a second adaptation model yielded the decisive blueprint: expanding the target of Dismantle from the sorcerer himself to the very coordinate space occupied by the world.

## 03. Sakuga Direction & Sound Design Legacy

From a broadcast perspective, the Shinjuku Showdown sets a new benchmark for spatial clarity in high-speed urban destruction. Storyboard directors utilized wide architectural lenses of ruined Shinjuku skyscrapers to preserve scale while hollow purple detonations erased entire city blocks.

Combined with dynamic choral arrangements that strip away percussion during split-second Binding Vow reveals, this arc cements Jujutsu Kaisen as the defining action touchstone of the 2020s.',
  'An exhaustive technical breakdown of the Shinjuku Showdown—examining open-barrier Malevolent Shrine vs. Unlimited Void, Reverse Cursed Technique burnout recovery, and the animation production pipeline behind the decade’s biggest battle.',
  'Kenji Takahashi',
  '7 MIN READ',
  420,
  '2026-09-18',
  '2026',
  99.4,
  142800,
  1,
  NOW(), NOW()
),
(
  'Demon Slayer: Infinity Castle Theatrical Trilogy — Visual & Lore Guide',
  'demon-slayer-trilogy',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
  '## 01. Architectural Madness: Rendering the Infinity Castle

When Muzan Kibutsuji drops the entire Demon Slayer Corps into Nakime’s biwa-controlled dimension, gravity ceases to be a constant. For Ufotable’s digital department, the Infinity Castle is no longer just a background set-piece—it is an active combatant.

By moving away from weekly television compression to a theatrical trilogy pipeline, the studio renders multi-layered parallax corridors where lanterns, shoji screens, and waterfalls rotate along three axes simultaneously during sword clashes.

> “Every pluck of Nakime’s biwa reconfigures the battlefield geometry in real time, forcing the camera to dive kilometres through vertical wooden chasms.”

## 02. The Upper Moon Crucible: Akaza, Doma & Kokushibo

Unlike previous arcs where several Hashira converged on a single threat, the Infinity Castle fractures the Corps into isolated, desperate duels. Shinobu Kocho’s calculated gambit against Upper Rank Two Doma contrasts sharply with Tanjiro and Giyu’s martial arts crucible against Akaza’s Compass Needle.

Meanwhile, the battle against Upper Rank One Kokushibo delves into the original sin of Breath of the Sun and Breath of the Moon, uniting Sanemi, Gyomei, Muichiro, and Genya in one of manga history’s most grueling clashes.',
  'Why adapting the Infinity Castle arc as a three-part global theatrical event allows Ufotable to push 3D camera mapping, breathing-style fluid simulations, and emotional backstory pacing to unprecedented heights.',
  'Aoi Sakamoto',
  '6 MIN READ',
  360,
  '2026-09-12',
  '2026',
  97.8,
  118400,
  1,
  NOW(), NOW()
),
(
  'Chainsaw Man — The Movie: Reze Arc Cinematography & Bomb Devil Dossier',
  'chainsaw-man-reze-movie',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
  '## 01. The Country Mouse and the City Mouse

At its heart, the Reze Arc is a cold-war espionage tragedy disguised as a teenage summer romance. Both Denji and Reze are weaponized orphans stripped of normal childhoods by state and syndicate apparatuses—Denji under Public Safety’s thumb, and Reze raised as a Soviet guinea pig.

The quiet sequences—learning to read on chalkboards after hours and swimming in a darkened high school pool—carry as much narrative tension as any devil contract because the audience senses the fuse burning beneath every smile.

> “Did you prefer the country mouse, Denji, or the city mouse? Neither of us ever really got to choose.”

## 02. Hybrid Propulsion & Explosive Choreography

Once the pin is pulled from Reze’s choker, the visual grammar shifts from French New Wave restraint to pure kinetic anarchy. Unlike traditional energy blasts, Bomb Devil combat relies on directional concussive propulsion—detonating limbs to rocket across rooftops and riding Shockwave currents alongside Beam, the Shark Fiend.',
  'The Reze Arc bridges tender indie-film intimacy with unhinged block-leveling spectacle. Here is how the theatrical adaptation balances the Country Mouse parable with the Bomb Devil’s kinetic fury.',
  'Renji Morimoto',
  '5 MIN READ',
  300,
  '2026-09-04',
  '2026',
  95.6,
  89300,
  1,
  NOW(), NOW()
),
(
  'GTA VI Vice City & Leonida State Lore Bible: Biomes, Syndicates & RAGE 9 Tech',
  'gta-vi-vice-city-lore',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
  '## 01. Cartography of Leonida: Beyond Ocean Drive

Returning to Vice City after two decades means leaving behind the cramped 1986 pastel postcard for a sprawling, living satire of modern Florida. The State of Leonida stretches from the billionaire glass towers of Vice Dale down to the rusted industrial docks of Port Gellhorn and the coral archipelagos of the Keys.

At the center lies Lake Leonida and the Grassrivers—a dense airboat frontier teeming with apex wildlife, smuggling airstrips, and off-grid militias that dynamically alter smuggling routes.

> “The only way we get through this is by sticking together—trust isn’t a dialogue choice in Leonida; it’s a survival mechanic.”

## 02. RAGE 9 Simulation & Dynamic Social Ecosystems

Where Red Dead Redemption 2 pioneered deliberate physical weight and NPC memory in frontier towns, GTA VI scales those systems to high-density metropolitan beaches and nightclubs. Every pedestrian group reacts autonomously to sudden tropical squalls, police cordons, and viral in-game livestreamers.',
  'A deep-dive geographical and technical dossier on Rockstar’s State of Leonida—analyzing the dual-protagonist trust economy, dynamic tropical weather fronts, and social-media-driven world events.',
  'Marcus Vance',
  '8 MIN READ',
  480,
  '2026-09-20',
  '2026',
  99.7,
  215400,
  1,
  NOW(), NOW()
),
(
  'Cyberpunk Project Orion: Blackwall AI Lore, Unreal Engine 5 & Night City 2.0',
  'cyberpunk-orion-previews',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80',
  '## 01. The Conspiracy Behind Mr. Blue Eyes & Night Corp

Look closely at the balcony during your final meeting with Jefferson Peralez, or the observation deck at the NCX Spaceport when sending Songbird to Tycho Terminal. Watching silently with glowing azure corneas is Mr. Blue Eyes—a proxy vessel for entities operating from beyond the Blackwall.

Phantom Liberty confirmed that Militech’s pre-DataKrash Cynosure facility was already capturing feral AIs to weaponize against Arasaka’s Soulkiller. Project Orion is poised to detonate this cold war into the open.

> “They aren’t erasing who you are, V. They are rewriting the architecture of your synapses until you thank them for it.”

## 02. Verticality & The Unreal Engine 5 Megabuildings

One of the primary ambitions for CD Projekt Red’s Boston and Vancouver studios is realizing the full vertical density of Night City’s Megabuildings—transforming multi-floor arcologies into self-contained ecosystems with turf wars, ripperdoc clinics, and netrunner dens stacked 60 stories high.',
  'Tracing the hidden conspiracy connecting Jefferson Peralez’s neural reconditioning, Songbird’s Cynosure core, and the looming Fifth Corporate War in Project Orion.',
  'Elena Rostova',
  '6 MIN READ',
  360,
  '2026-09-14',
  '2026',
  96.2,
  98400,
  1,
  NOW(), NOW()
),
(
  'Hollow Knight: Silksong — Pharloom Crest Builds, Silk-Crafting & Speedrun Meta',
  'silksong-tracker',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
  '## 01. From Soul to Silk: The Tempo Shift of Pharloom

In Hollow Knight, survival meant finding a quiet corner during a boss stagger to channel Soul slowly on the ground. In Silksong, hesitation is fatal. Hornet’s Bind ability executes in mid-air, restoring three masks of health in a single burst while consuming your entire Silk gauge.

Because enemies in Pharloom routinely deal double-mask damage and chain multi-hit combos, combat flows like a high-wire fencing match where aggressive needle strikes are your only lifeline.

> “Hallownest was a kingdom embalmed in ash and memory; Pharloom is a gilded machine still humming with golden thread and fanaticism.”

## 02. Crest System Breakdown & Optimal Tool Loadouts

Replacing the traditional Charm notch matrix is the Crest system. Equipping the Reaper Crest widens Hornet’s slash arc and generates bonus Silk orbs on stagger, whereas the Wanderer Crest restores the classic vertical pogo familiar to Hallownest veterans.',
  'Why Hornet’s ascent through the haunted kingdom of Pharloom flips every muscle-memory habit from Hallownest on its head—complete with Crest tier lists and optimal route splits.',
  'Devon "Splits" Mercer',
  '6 MIN READ',
  360,
  '2026-09-09',
  '2026',
  95.1,
  84200,
  1,
  NOW(), NOW()
),
(
  'Dune: Messiah Production Dossier — The Golden Path, IMAX 70mm & Tleilaxu Lore',
  'dune-messiah-production',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
  '## 01. The Tragedy of Absolute Prescience

Frank Herbert wrote Dune Messiah to dismantle the very charismatic hero myth that readers fell in love with in the first novel. By the opening frames of Messiah, Paul Muad’Dib sits atop the largest temple ever constructed by human hands—a monolith in Arrakeen that dwarfs mountain ranges—yet he is more imprisoned than ever.

Every vision of the future shows him that abdicating the throne triggers even worse chaos, while remaining Emperor cements a theocratic bureaucracy he despises.

> “Prophecy is not a gift of freedom; it is a trap that locks both the prophet and his followers inside a single unyielding corridor of time.”

## 02. The Cabal: Navigators, Face Dancers, and the Ghola Gift

Unable to defeat Paul’s Fremen legions on the battlefield, the conspirators—Reverend Mother Gaius Helen Mohiam, Princess Irulan, the Tleilaxu master Scytale, and Guild Navigator Edric (whose prescience shields the meeting from Paul’s sight)—strike at his humanity instead.

Their psychological weapon is Hayt: a resurrected ghola of Duncan Idaho engineered with metallic Tleilaxu eyes and philosophical conditioning designed to break Paul’s psyche.',
  'A comprehensive look at the palace intrigue of Arrakeen: the Bene Gesserit—Spacing Guild—Tleilaxu conspiracy, Hayt the Ghola, and the visual transformation of a desert planet turning green.',
  'Clara Vance-Sterling',
  '7 MIN READ',
  420,
  '2026-09-19',
  '2026',
  98.5,
  134900,
  1,
  NOW(), NOW()
),
(
  'The Batman Part II Canon Timeline: Winter in Flooded Gotham & The Penguin Fallout',
  'the-batman-part-ii-canon',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80',
  '## 01. After the Flood: A Divided City in Deep Freeze

When the Riddler’s car bombs shattered Gotham’s seawall in November, the waters didn’t hit every neighborhood equally. While Downtown’s financial elite fortified their penthouses, working-class districts like Crown Point were left to rot in toxic sludge—creating the exact vacuum Oz Cobb exploited to seize the criminal underworld.

As December freezes the flooded canals into jagged ice, Bruce Wayne discovers that being a symbol of hope requires dismantling corruption in mahogany boardrooms just as much as in back alleys.

> “Vengeance could beat a street gang into submission, but it couldn’t audit a century of stolen city trusts.”

## 02. World’s Greatest Detective: Upgraded Cowls & Forensic Tech

In Part II, the drifter persona gives way to a sharper, dual-identity strategy. Expect an evolved, lighter-plate Batsuit adapted for sub-zero mobility alongside deeper forensic integration inside the abandoned Wayne subway terminal.',
  'How the seawall destruction and Oz Cobb’s bloody ascension in Crown Point reshape Gotham’s socio-political corruption for a freezing winter detective thriller.',
  'Julian Thorne',
  '6 MIN READ',
  360,
  '2026-09-11',
  '2026',
  96.4,
  105200,
  1,
  NOW(), NOW()
),
(
  'Stranger Things Finale & Dimension X Lore: The First Shadow Stage Canon Explained',
  'stranger-things-finale',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
  '## 01. November 6, 1983: Why Time Stopped in the Upside Down

When Nancy Wheeler opened her diary in the Upside Down during Season 4 and found the entries halted on November 6, 1983, it confirmed a foundational truth of Hawkins’ mythology: the dark reflection of Hawkins is not an ancient parallel town, but a psychic imprint stamped onto the membrane between our world and Dimension X.

Understanding that distinction is essential to decoding how the military quarantine zone in 1987 attempts to contain the four converging rifts.

> “It started with Will Byers vanishing in the woods, and the circle can only close where the first gate tore open.”

## 02. Vecna vs. The Mind Flayer: Who Holds the Leash?

While Henry Creel believed in Season 4 that he gave the formless shadow particles their spider-like purpose, canon revelations from The First Shadow stage play reveal that the entity infected Henry first during the Philadelphia Experiment fallout.',
  'Why the Upside Down is frozen on November 6, 1983, how Dimension X differs from the Rightside Up bridge, and what Will Byers’ true psychic tether means.',
  'Maya Lin',
  '6 MIN READ',
  360,
  '2026-09-06',
  '2026',
  94.9,
  91700,
  1,
  NOW(), NOW()
),
(
  'aespa "Armageddon" & Supernova Lore: Multiverse Variants in the REAL WORLD',
  'aespa-armageddon-lore',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
  '## 01. Beyond KWANGYA: Enter the Multiverse Era

In their first narrative cycle, aespa’s lore revolved around digital avatars (ae) and the cybernetic wilderness of KWANGYA. With their first full-length album Armageddon, the conceptual lens widens from virtual reality to infinite parallel dimensions.

Rather than battling an external serpent villain, the members confront doppelgängers with supernatural physiology—levitating cars, freezing time, and warping urban geometry in the "Supernova" and "Armageddon" visual films.

> “I’m like some kind of Supernova—watch out: our taste of iron isn’t a metaphor, it’s a sonic signature.”

## 02. Sonic Architecture: Why "Taste of Iron" Works

Fans affectionately dub aespa’s hardest-hitting tracks "chul-mat" (taste of iron)—industrial synth clangs, distorted 808 glides, and razor-sharp vocal layering in the final chorus that reward lossless audio streaming.',
  'How aespa transitioned from fighting Black Mamba in KWANGYA to confronting parallel-universe versions of themselves across Supernova and Armageddon.',
  'Soo-jin Park',
  '5 MIN READ',
  300,
  '2026-09-21',
  '2026',
  98.9,
  164200,
  1,
  NOW(), NOW()
),
(
  'Stray Kids Global Stadium Tour & 3RACHA Production Breakdown: The "ATE" Era',
  'stray-kids-stadium-tour',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
  '## 01. The 3RACHA Blueprint: Controlled Chaos in the Studio

While most pop acts source demos from international songwriting camps, Stray Kids’ identity is forged almost entirely in-house by 3RACHA (Bang Chan, Changbin, and Han). Their signature style fuses UK drill rhythms, Latin reggaeton bounce, and festival trap drops without losing melodic hooks.

On the "dominATE" stadium run, that studio experimentation translates into three-hour live marathons backed by a touring rock band that pushes sound pressure levels to festival headliner standards.

> “Eight microphones, zero backing-track crutches during the rap cyphers, and sixty thousand compasses glowing in unison.”

## 02. Stadium Fanchant & Lightstick Sync Checklist

Attending a stadium stop? Ensure your Nachimbong V2 firmware is updated via the official app at least 48 hours before doors open, and pack spare alkaline AAA batteries—high-luminosity stadium sync draws full power across the 32-song setlist.',
  'How Stray Kids scaled their "Mala Taste" genre-blending sound to 60,000-capacity stadiums worldwide with a thunderous four-piece live rock band.',
  'Min-ho Kang',
  '6 MIN READ',
  360,
  '2026-09-15',
  '2026',
  97.1,
  129500,
  1,
  NOW(), NOW()
),
(
  'LE SSERAFIM "CRAZY" & Festival Director’s Cut: Voguing, UK Garage & Fearless Lore',
  'le-sserafim-coachella-cut',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
  '## 01. Ballroom House Meets Athletic Precision

LE SSERAFIM has never shied away from reinventing their sonic palette every six months. Where "ANTIFRAGILE" rode an infectious reggaeton rhythm and "Smart" embraced amapiano percussion, "CRAZY" dives headfirst into pulsing ballroom house.

The choreography demands extraordinary single-leg balance and core control, executing rapid-fire duckwalks and arm-control isolations while maintaining live vocal projection.

> “Act like an angel and dress like crazy—when the bassline drops, the stage becomes a runway without rules.”',
  'From Jersey club and Afro-house on "EASY" and "Smart" to electro-voguing on "CRAZY": how LE SSERAFIM carved out the most dance-floor-forward catalog in 4th-gen K-pop.',
  'Hannah Cho',
  '5 MIN READ',
  300,
  '2026-09-07',
  '2026',
  94.3,
  82600,
  1,
  NOW(), NOW()
),
(
  'X-Men: From the Ashes Reading Order — Post-Krakoa Rosters in Alaska, New Orleans & NY',
  'x-men-from-the-ashes',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80',
  '## 01. Life After Paradise: Three Visions for Mutant Survival

For five real-world years, the Krakoan Age gave mutants immortality, diplomatic immunity, and a living island nation. Its collapse leaves the species more fractured than ever—not just geographically, but philosophically.

Without Charles Xavier’s dream or Magneto’s island citadel to unite them, Scott Summers, Anna Marie (Rogue), and Kate Pryde have stopped waiting for consensus.

> “We had a nation, we had resurrection, and the world still built Sentinels. Now we have a factory in Alaska and a list of emergencies.”

## 02. Essential Reading Matrix & Key Issue Checklist

Start with X-Men (2024) #1 for the geopolitical backbone and Beast’s memory-reverted resurrection, then pair it with Uncanny X-Men #1 for the emotional heart of the Outlier kids, and Storm #1 for Omega-level cosmic stakes alongside the Avengers.',
  'Krakoa is gone, the Resurrection Protocols are history, and Charles Xavier is a prisoner at Graymalkin. Here is the definitive issue-by-issue roadmap for the three flagship X-Men books.',
  'Devon Grant',
  '7 MIN READ',
  420,
  '2026-09-17',
  '2026',
  96.8,
  94100,
  1,
  NOW(), NOW()
),
(
  'DC Absolute Universe Guide: How Darkseid Engineered Earth-Alpha’s Underdog Trinity',
  'dc-absolute-universe',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
  '## 01. A Universe Built on Darkseid’s Foundation

On Prime Earth, superhero hope is the default metaphysical constant, forcing villains to fight uphill against destiny. In the Absolute Universe (Earth-Alpha), created after Darkseid’s demise in the DC All In Special, tyranny and systemic oppression are the natural laws of reality.

To survive in a world stacked against them, the Trinity cannot rely on Wayne Manor fortunes, Themysciran paradise, or Smallville Americana. They have to burn brighter and hit harder.

> “Take away the mansion, the butler, and the trust fund—what’s left is a six-foot-six brick wall who knows every load-bearing beam in Gotham.”

## 02. Variant Covers & First-Print Collector Radar

Absolute Batman #1 has already crossed seven printings, with Nick Dragotta’s 1:50 foil variant and Jim Lee’s gatefold covers commanding top tier status in the Collector Vault.',
  'Following the DC All In Special, a new universe born from Darkseid’s omega energy strips Batman, Superman, and Wonder Woman of their traditional privileges—turning them into radical agents of chaos.',
  'Victor Sterling',
  '7 MIN READ',
  420,
  '2026-09-16',
  '2026',
  99.1,
  158900,
  1,
  NOW(), NOW()
),
(
  'Spawn’s Scorched Multiverse: Gunslinger, King Spawn & Rat City Continuity Guide',
  'spawn-multiverse-run',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
  '## 01. Beyond Issue #350: The War for the Vacant Throne

For decades, Spawn was a solitary urban horror story set in the alleys of New York. Today, the Spawn Universe operates as a full dark-fantasy war epic where Heaven, Hell, and the Greenworld fight over the Dead Zones—while Al Simmons refuses to kneel to any of them.

> “The necroplasm timer used to count down to damnation; now it counts down to revolution.”',
  'How the longest-running creator-owned comic in history evolved into a multi-title line featuring medieval hellspawns, time-displaced outlaws, and futuristic necroplasm soldiers.',
  'Dante Callahan',
  '5 MIN READ',
  300,
  '2026-09-05',
  '2026',
  93.4,
  68400,
  1,
  NOW(), NOW()
),
(
  'One Piece Void Century & Elbaf Arc Dossier: Vegapunk’s Broadcast, Joy Boy & Loki',
  'one-piece-void-century-clues',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
  '## 01. Two Hundred Meters Below: The Sunken Continents

For twenty-seven years, readers assumed the scattered island chains of the Grand Line and Four Blues were the natural geography of Eiichiro Oda’s world. Vegapunk’s pre-recorded broadcast from Egghead shattered that paradigm: the Straw Hats have been sailing across the mountain peaks of a drowned civilization.

Every time Imu activates the Mother Flame to erase an island like Lulusia, global sea levels rise by another meter—meaning the ideological conflict of the Void Century never truly ended.

> “Whoever claims the One Piece will decide the fate of this sinking world.”

## 02. Elbaf’s Adam Tree & The Accursed Prince Loki

Upon reaching the land of the Giants, the narrative scale expands into Norse mythology. Chained to the base of the Treasure Tree Adam in the Underworld is Prince Loki, who claims the title of the Sun God who will bring Ragnarok to the world.',
  'Dr. Vegapunk’s global transmission changed everything we knew about the geography of the Blue Planet. Now on the branches of the Adam Tree in Elbaf, ancient murals reveal the three wars of history.',
  'Haruto Sorano',
  '8 MIN READ',
  480,
  '2026-09-22',
  '2026',
  99.6,
  198400,
  1,
  NOW(), NOW()
),
(
  'Vagabond Definitive Edition & Takehiko Inoue’s Sumi-e Brushwork Masterclass',
  'vagabond-remaster',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
  '## 01. The Sword and the Brush: Why Inoue Abandoned the G-Pen

Midway through serializing Vagabond, Takehiko Inoue realized that rigid steel G-pen nibs were fighting against the philosophical transformation of his protagonist, Shinmen Takezo (Miyamoto Musashi). Just as Musashi had to unlearn brute force to perceive the flow of all things, Inoue switched to an unforgiving Japanese calligraphy brush.

The result is linework that breathes on the page—where a frayed dry-brush sweep conveys the spray of snow and blood in the Yoshioka courtyard.

> “Invincible is merely a word. Once you look beyond the blade, you see that heaven and earth have no opponent.”',
  'Examining the oversized hardcover Definitive Editions of Takehiko Inoue’s Vagabond, the visual evolution from Yoshioka 70-man slaughter to quiet rice-paddy cultivation, and the exhibition epilogue.',
  'Reiichi Kurosawa',
  '6 MIN READ',
  360,
  '2026-09-13',
  '2026',
  96.7,
  93200,
  1,
  NOW(), NOW()
),
(
  'Choujin X Volume 12 Breakdown: Sui Ishida’s Unchained Schedule & Calamity Lore',
  'choujin-x-volume-12',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
  '## 01. The Vulture and the Lion: Tokio & Azuma’s Inverted Arc

At the start of Choujin X, Tokio Kurohara saw himself only as a scavenger orbiting his brilliant childhood friend Azuma Higashi. Twelve volumes later, after surviving the time-skip training in Iwato, Tokio carries the terrifying composure of a veteran soldier while Azuma grapples with the existential truth of his own creation.

> “To "Raise" as a Choujin is to die once and refuse to accept the verdict.”',
  'Freed from weekly page-count constraints on Tonari no Young Jump, Sui Ishida delivers surreal horror, dark slapstick, and devastating tragedy in the Tower of Mourning siege.',
  'Yuna Hasegawa',
  '5 MIN READ',
  300,
  '2026-09-08',
  '2026',
  93.8,
  74500,
  1,
  NOW(), NOW()
),
(
  'EVA-01 Test Type Armor Build Log: High-Density 100kg/m³ EVA Foam & Internal Stilts',
  'eva-01-high-density-eva-foam',
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80',
  '## 01. Solving the Mecha Proportion Problem

Human beings have wider hips and shorter legs than Hideaki Anno’s biomechanical Evangelion units. To achieve that wasp-waisted, long-limbed silhouette without looking boxy, your build must start from the ground up with 14-inch drywall stilts concealed inside digitized calf armor.

By raising your natural knee joint into the upper thigh of the mecha leg, you gain the elongated shin ratio that makes EVA-01 instantly recognizable from across a convention hall.

> “Great mecha cosplay is 40% foam beveling and 60% structural load engineering on your lower spine.”

## 02. Articulated Berserk Jaw & Fluorescent Edge Painting

Using a simple elastic return-spring anchored to your chin cup, the lower helmet mandible snaps open when you speak or roar—revealing cast-resin biomechanical teeth painted with gloss clear coat.',
  'Mecha proportions defy human anatomy. Learn how to construct an 8-foot wearable Evangelion Unit-01 rig using 10mm high-density EVA foam, PVC backpack load distribution, and automotive urethane paint.',
  'Kira "ForgeCraft" Vance',
  '7 MIN READ',
  420,
  '2026-09-19',
  '2026',
  97.4,
  108600,
  1,
  NOW(), NOW()
),
(
  'Cyberpunk Thermal Monowire & Sandevistan Spine: WS2812B Addressable LED & Arduino Guide',
  'cyberpunk-led-monowire',
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
  '## 01. Side-Glow Fiber Optics vs. COB LED Strips

Traditional LED strips are too wide and fragile to whip through the air for photoshoots. For an authentic Cyberpunk 2077 Monowire, 4mm solid-core PMMA side-glow optical cable gives you a flexible, unbreakable whip that illuminates evenly from hilt to hilt when driven by dual 3-watt emitters concealed inside 3D-printed cyberware cuffs.

> “When the convention hall lights dim, high-density addressable LEDs turn a good costume into a walking cutscene.”',
  'How to build a convention-safe, high-luminosity Thermal Monowire and David Martinez Sandevistan spinal implant using Arduino Nano ESP32, FastLED libraries, and 5mm PMMA side-glow fiber.',
  'Tariq Al-Mansoor',
  '6 MIN READ',
  360,
  '2026-09-10',
  '2026',
  95.3,
  86900,
  1,
  NOW(), NOW()
),
(
  'Sephiroth’s 7-Foot Masamune & One-Winged Counterweight Rigging (Con-Safe Breakdown)',
  'sephiroth-masamune-rig',
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
  '## 01. Defeating Blade Droop on an 84-Inch Odachi

Every Final Fantasy VII cosplayer faces the same physics nightmare: a seven-foot katana held at arm’s length acts as a massive lever. If you build the core from PVC pipe or wooden dowels, the tip will sag six inches before your first photoshoot.

The secret is a dual-rod skeleton of 8mm pultruded carbon-fiber tubes sandwiched between laser-cut Balsa wood ribs and wrapped in 2mm high-density foam.

> “It should look like cold Shinra steel under camera flashes, weigh less than 400 grams, and break down into a backpack in thirty seconds.”',
  'Building an 84-inch odachi that won’t droop in summer heat AND fits inside a standard checked airline suitcase—complete with CAD dowel tolerances and Alclad II chrome finishing.',
  'Elena Vance',
  '6 MIN READ',
  360,
  '2026-09-03',
  '2026',
  94,
  79100,
  1,
  NOW(), NOW()
),
(
  'Elden Ring Great Rune Topology: How the Golden Order’s Mathematical Lattice Fits Together',
  'elden-ring-great-rune-topology',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
  '## 01. The Elden Ring as Metaphysical Source Code

When Queen Marika plucked the Rune of Destined Death from the Elden Ring and sealed it within Maliketh’s black blade, she didn’t just outlaw mortality—she edited the geometric equation governing souls in the Lands Between.

By overlaying the individual Great Runes dropped by the demigod shardbearers onto the title screen sigil—and comparing that composite against the primordial relief carved into Maliketh’s boss arena in Crumbling Farum Azula—we can reconstruct the history of the Golden Order’s schisms.

> “The Farum Azula glyph proves the Elden Ring once possessed spiraled roots—the Crucible itself—before Marika pruned the tree into a closed circle.”

## 02. Twin Symmetry: Malenia, Morgott, and Mohg

Notice how Morgott and Mohg’s Great Runes share the exact same phantom circle position, differing only in Morgott’s golden alignment with the central vertical line and Mohg’s blood-soaked corruption. The geometry of the runes tells you the lineage of the demigods before you read a single item description.',
  'In Hidetaka Miyazaki and George R.R. Martin’s Lands Between, the Elden Ring is not a piece of jewelry—it is the metaphysical source code of reality. Here is how every Great Rune geometrically locks into the Farum Azula ancestral glyph.',
  'Dr. Julian Vance (Verified Fan Scholar)',
  '9 MIN READ',
  540,
  '2026-09-20',
  '2026',
  99.2,
  152300,
  1,
  NOW(), NOW()
),
(
  'Spider-Verse Animation Deconstruction: Variable Frame Rates, Ben-Day Halftones & Emotional Color Scripts',
  'spider-verse-animation-deconstruction',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80',
  '## 01. Replacing Motion Blur with Comic Book Smears

For twenty years, western 3D feature animation chased physical camera simulation: smooth 24-frames-per-second interpolation and Gaussian motion blur. The Spider-Verse team asked a radical question: what if pausing any single frame of a 3D movie looked like a hand-inked comic panel?

By stripping out automatic motion blur and hand-drawing 2D ink lines over 3D geometry rigs, every punch and web-swing retains crisp graphic impact.

> “Hobie Brown refuses to obey Miguel O’Hara’s canon rules—so even his animation pipeline refuses to stay on a single consistent frame rate.”',
  'How Sony Pictures Imageworks abandoned photorealistic motion blur in favor of animating on twos, CMYK registration offsets, and universe-specific rendering engines.',
  'Soraiaendes Art Collective',
  '7 MIN READ',
  420,
  '2026-09-14',
  '2026',
  97.6,
  119800,
  1,
  NOW(), NOW()
),
(
  'Neon Genesis Evangelion & The Hedgehog’s Dilemma: From 1995 Broadcast to Thrice Upon a Time',
  'neon-genesis-philosophy',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
  '## 01. The AT Field as the Wall Around the Heart

In Episode 3 of Neon Genesis Evangelion, Ritsuko Akagi invokes Arthur Schopenhauer’s parable of the Hedgehog’s Dilemma: on a freezing winter night, porcupines huddle together for warmth, yet the closer they draw, the more their quills pierce one another.

Within Evangelion’s esoteric Kabbalistic lore, the AT Field is not merely a sci-fi forcefield used by Angels and Evas—it is the physical boundary of the individual soul that keeps us from dissolving into the primordial soup of LCL.

> “Goodbye, all of Evangelion—and welcome back to the real world waiting outside the theater doors.”',
  'Why the AT Field is the literal manifestation of human ego boundaries, and how the three distinct endings of Evangelion mirror the emotional maturation of both its creator and its audience.',
  'Naomi Vance-Kato',
  '8 MIN READ',
  480,
  '2026-09-06',
  '2026',
  96.5,
  102400,
  1,
  NOW(), NOW()
),
(
  'The Multiverse Paradox: Canon Continuity Deconstruction',
  'multiverse-paradox-essay',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
  'When storytelling embraces infinite parallel realities, the permanence of consequence is inevitably placed under scrutiny.

By anchoring emotional weight to personal sacrifice rather than timeline resets, modern creators preserve dramatic tension across branching canons.',
  'An in-depth critical breakdown of how divergent branching timelines affect character stakes in modern franchise lore.',
  'Fan Creator: cyber_otaku',
  '8 min read',
  480,
  '2026-09-10',
  '2026 Archive',
  98.0,
  9200,
  1,
  NOW(), NOW()
),
(
  'Elden Ring: Shadow of the Erdtree & Nightreign Co-Op Meta Guide',
  'elden-ring-shadow-erdtree-lore',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
  'FromSoftware’s Land of Shadow discards traditional rune-level overleveling in favor of Scadutree Fragments.

Reaching Blessing Rank 12 before challenging Messmer the Impaler or Promised Consort Radahn is essential for surviving multi-phase boss combos.',
  'Deciphering Miquella’s footsteps across the Land of Shadow, Scadutree Blessing breakpoints, and optimal 3-player Nightfarer builds.',
  'Valkyrie_Builds',
  '8 min read',
  480,
  '2026-09-12',
  '2026',
  96.5,
  96300,
  1,
  NOW(), NOW()
),
(
  'Kagurabachi: How Enchanted Blades & Cinematic Framing Ignited Jump',
  'kagurabachi-enchanted-blades-analysis',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'ARTICLE',
  NULL,
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
  'Few manga in Weekly Shonen Jump history have transitioned as rapidly into a genuine critical phenomenon as Kagurabachi.

Hokazono treats the manga page like a widescreen anamorphic lens, using deep negative space and sumi-ink splashes.',
  'Analyzing Takeru Hokazono’s neo-noir paneling, the Seven Enchanted Blades lore, and why Chihiro Rokuhira is leading the next generation of Weekly Shonen Jump.',
  'Daichi Sato',
  '6 min read',
  360,
  '2026-09-14',
  '2026',
  95.8,
  73500,
  1,
  NOW(), NOW()
);

-- -----------------------------------------------------------------------------
-- 3B. Stream & Discover Media (6 items) (fandoms_streammedia)
-- -----------------------------------------------------------------------------
INSERT INTO fandoms_streammedia (
  title, slug, category_id, stream_type, universe_label,
  accent_color, media_url, thumbnail_url, synopsis, artist,
  album, duration, duration_seconds, release_year, rating,
  ratings_count, views_label, view_count, likes_label, likes_count,
  display_order, is_active, created_at, updated_at
) VALUES
(
  'Cyberpunk: Edgerunners - Official Teaser',
  'cyberpunk-edgerunners',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'TRAILER',
  'Anime / Gaming',
  '#A3E635',
  'https://youtu.be/x4ztgjvfU60?si=qQfMO9HWMUkkHiYD',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  'A street kid trying to survive in Night City — a tech and body modification-obsessed city of the future. Studio Trigger x CD PROJEKT RED high-octane spectacle.',
  'Studio Trigger & CDPR',
  '',
  '02:45',
  165,
  '2026 Remaster',
  4.9,
  1842,
  '4.2M views',
  4200000,
  '10.0k',
  10000,
  1,
  1,
  NOW(), NOW()
),
(
  'Demon Slayer: Infinity Castle - Cinematic Teaser',
  'infinity-castle',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'TRAILER',
  'Anime',
  '#FB7185',
  'https://youtu.be/x7uLutVRBfI?si=IOwYzPC81-fkXm6h',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
  'The final confrontation draws near as the Demon Slayer Corps breaches the endless shifting corridors of the Infinity Castle.',
  'ufotable',
  '',
  '03:12',
  192,
  '2026 Theatrical Run',
  5.0,
  3120,
  '7.8M views',
  7800000,
  '24.5k',
  24500,
  2,
  1,
  NOW(), NOW()
),
(
  'Spider-Man: Beyond The Spider-Verse Sneak Peek',
  'spider-multiverse',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'TRAILER',
  'Movies & TV',
  '#38BDF8',
  'https://youtu.be/qclHAbmDOJI?si=m0xKcgqUcJQq9xG1',
  'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80',
  'Miles Morales traverses the chromatic spectrum of anomalous dimensions to rewrite the canonical destiny of all Spider-heroes.',
  'Sony Pictures Animation',
  '',
  '02:18',
  138,
  '2026 Columbia / Marvel',
  4.8,
  2490,
  '5.1M views',
  5100000,
  '19.2k',
  19200,
  3,
  1,
  NOW(), NOW()
),
(
  'Supernova (Armageddon)',
  'kpop-supernova',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'AUDIO',
  'K-Pop • Armageddon',
  '#F43F5E',
  'https://music.youtube.com/watch?v=LCIs3JXb5Aw&si=VHjPjewrlV0a-iX3',
  'https://i.ytimg.com/vi/LCIs3JXb5Aw/hqdefault.jpg',
  'Hyperpop basslines collide with celestial harmonies in this official Armageddon title track.',
  'Aespa',
  'Armageddon The 1st Album',
  '02:59',
  179,
  'Armageddon Special',
  4.9,
  980,
  '1.0M views',
  148000,
  '14.8K',
  14800,
  1,
  1,
  NOW(), NOW()
),
(
  'MONEY CONSTANT',
  'money-constant',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'AUDIO',
  'SOUTH GIDI • 2025',
  '#FACC15',
  'https://music.youtube.com/watch?v=dw8HOrauCdI&si=NipHbZbrNTxc-WH_',
  'https://i.ytimg.com/vi/dw8HOrauCdI/hqdefault.jpg',
  'High-energy Amapiano and Afrobeats collaboration from SOUTH GIDI • 2025.',
  'DJ Maphorisa, DJ Tunez, Wizkid & Mavo',
  'SOUTH GIDI • 2025',
  '03:48',
  228,
  '2025',
  4.95,
  1450,
  '2.2M views',
  223000,
  '84.5K',
  84500,
  2,
  1,
  NOW(), NOW()
),
(
  'Calm Down',
  'calm-down',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'AUDIO',
  'Afrobeats • 705M Views',
  '#A3E635',
  'https://music.youtube.com/watch?v=CQLsdm1ZYAw&si=MFyp9PgpIsLRBOgb',
  'https://i.ytimg.com/vi/CQLsdm1ZYAw/hqdefault.jpg',
  'Global Afrobeats phenomenon by Rema with over 705M views and 5.2M likes.',
  'Rema',
  '705M views • 5.2M likes',
  '03:59',
  239,
  '705M views',
  5.0,
  5200,
  '705M views',
  705000000,
  '5.2M',
  5200000,
  3,
  1,
  NOW(), NOW()
);

-- -----------------------------------------------------------------------------
-- 4. Character Profiles (69 Champions across 8 Universes) (fandoms_characterprofile)
-- -----------------------------------------------------------------------------
INSERT INTO fandoms_characterprofile (
  name, slug, alias, category_id, archetype,
  origin, faction, tagline, biography, image_url,
  stats_json, details_json, created_at
) VALUES
(
  'Ryuto Kazama',
  'ryuto-kazama',
  'Titan Slayer',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'Anime Protagonist',
  'Scout Regiment Neo • District Shiganshina 2.0',
  'Survey Scout Vanguard Neo',
  '“The wall wasn’t built to keep the titans in. It was built to protect them from us.”',
  'Surviving the fall of District 7, Ryuto mastered the 3D maneuver gear before turning 16. His specialized reflex reaction matches hyper-velocity kinetic strikes, enabling split-second decimation of class-15 bio-monstrosities.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b129928-BCEjVaP0AQSw.png',
  '[{"label": "Agility", "value": 94, "max": 100}, {"label": "Power", "value": 88, "max": 100}, {"label": "Strategic IQ", "value": 92, "max": 100}]',
  '{"firstAppearance": "Ch. 01 \\"Awakening of the Bloodline\\"", "weapon": "Dual Thunder Spears & Carbon Blade Rigs", "nemesis": "The Colossal Behemoth of Ward 12", "bio": "Surviving the fall of District 7, Ryuto mastered the 3D maneuver gear before turning 16. His specialized reflex reaction matches hyper-velocity kinetic strikes, enabling split-second decimation of class-15 bio-monstrosities."}',
  NOW()
),
(
  'Valkyrie V-09',
  'valkyrie-v09',
  'Cyber Merc',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'Gaming Hero',
  'Neo-Kyoto Underbelly',
  'Afterlife Independent Mercs',
  '“When the ICE melts and the sirens cry, my monowire sings the final lullaby.”',
  'Equipped with illegal military-grade Sandevistan neural implants and thermal monowires, V-09 infiltrates mega-corporation data fortresses without leaving a single digital trace.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b132494-R05zeZPjDG3l.jpg',
  '[{"label": "Class", "textValue": "Vanguard Infiltrator"}, {"label": "Origin", "textValue": "Neo-Kyoto Underbelly"}, {"label": "Weapon", "textValue": "Dual Plasma Blades"}]',
  '{"firstAppearance": "Night City Patch 2.2 Cyber-Infiltration", "weapon": "Thermal Monowire & Arasaka Prototype MK-7", "nemesis": "Corporate Overlord Saburo-X", "bio": "Equipped with illegal military-grade Sandevistan neural implants and thermal monowires, V-09 infiltrates mega-corporation data fortresses without leaving a single digital trace."}',
  NOW()
),
(
  'Shadow Raven',
  'shadow-raven',
  'The Nocturnal Vigilante',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'Comic Anti-Hero',
  'Gotham Prime • Earth-99',
  'Midnight Syndicate',
  '“Justice is a luxury for the daylight. The dark requires a harsher toll.”',
  'Exiled from the High Council of Champions after refusing to compromise with political corrupt lords, Shadow Raven established the Midnight Syndicate to hunt down interdimensional syndicate smugglers.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/542-raven.jpg',
  '[{"label": "Universe", "textValue": "Earth-Prime 99"}, {"label": "First Appearance", "textValue": "Issue #12 (1998)"}, {"label": "Nemesis", "textValue": "Baron Void"}]',
  '{"firstAppearance": "Shadow Syndicate #12 (Collector Silver Holo)", "weapon": "Obsidian Batarangs & Dark Energy Cloak", "nemesis": "Baron Void (Dimensional Conqueror)", "bio": "Exiled from the High Council of Champions after refusing to compromise with political corrupt lords, Shadow Raven established the Midnight Syndicate to hunt down interdimensional syndicate smugglers."}',
  NOW()
),
(
  'Lyra Solaris',
  'lyra-solaris',
  'Celestial Weaver',
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'Cosplay & Lore Icon',
  'Astral Leyline Nexus',
  'Astral Order of Luminaries',
  '“The threads of the multiverse weave not by chance, but by deliberate grace.”',
  'A favorite of master cosplayers worldwide, Lyra Solaris channels solar plasma through custom hand-spun silk armor. Her prop build tutorials have garnered over 3 million views in the Cosplay Guild.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b133676-kV2czE3C8Qls.png',
  '[{"label": "Affinity", "textValue": "Starlight Arcana"}, {"label": "Rank", "textValue": "Grand Master"}, {"label": "Relic", "textValue": "Prism Staff"}]',
  '{"firstAppearance": "Arcana Chronicles Vol. 4 \\"Starlight Symphony\\"", "weapon": "Prism Leyline Staff with Luminescent Core", "nemesis": "Eclipse Harvester Malakor", "bio": "A favorite of master cosplayers worldwide, Lyra Solaris channels solar plasma through custom hand-spun silk armor. Her prop build tutorials have garnered over 3 million views in the Cosplay Guild."}',
  NOW()
),
(
  'Kwisatz Navigator',
  'paul-muaddib',
  'Sovereign of Arrakis',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'Cinematic Visionary',
  'Caladan / Deep Desert Sietch',
  'Fremen Fedaykin Council',
  '“He who can destroy a thing has the real control of it.”',
  'Walking the Golden Path across billions of potential futures, the Navigator unites the desert tribes while wrestling with the terrifying galactic jihad sparked in his name.',
  'https://upload.wikimedia.org/wikipedia/commons/5/5c/Timoth%C3%A9e_Chalamet-63482_%28cropped%29.jpg',
  '[{"label": "Prescience", "value": 99, "max": 100}, {"label": "Voice Mastery", "value": 95, "max": 100}, {"label": "Desert Warfare", "value": 96, "max": 100}]',
  '{"firstAppearance": "Dune Part One (IMAX 70mm Archival Cut)", "weapon": "Crysknife of Maker Tooth & Weirding Module", "nemesis": "Padishah Emperor & Bene Gesserit Sisterhood", "bio": "Walking the Golden Path across billions of potential futures, the Navigator unites the desert tribes while wrestling with the terrifying galactic jihad sparked in his name."}',
  NOW()
),
(
  'AE-Karina Prime',
  'nova-kwangya',
  'Hyper-Pop Avatar',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'Virtual & Stage Idol',
  'FLAT • KWANGYA Digital Realm',
  'SYNK Hyper-Lineage',
  '“Sync your frequency to the Supernova; our stage bends reality.”',
  'Bridging real-world stadium choreography with AI-driven KWANGYA lore, AE-Karina Prime leads the 4th-gen sonic revolution with metallic hyper-pop production.',
  'https://upload.wikimedia.org/wikipedia/commons/5/50/Karina_at_Gimpo_Airport_on_April_22%2C_2026_03.png',
  '[{"label": "Stage Presence", "value": 98, "max": 100}, {"label": "Vocal Range", "value": 93, "max": 100}, {"label": "SYNK Level", "value": 100, "max": 100}]',
  '{"firstAppearance": "Savage SYNK Showcase • Armageddon Era", "weapon": "Sonic Lightstick Frequency & Rocket Puncher", "nemesis": "Black Mamba Hallucination", "bio": "Bridging real-world stadium choreography with AI-driven KWANGYA lore, AE-Karina Prime leads the 4th-gen sonic revolution with metallic hyper-pop production."}',
  NOW()
),
(
  'Chihiro Rokuhira',
  'kuro-kenshin',
  'Bearer of Enten',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'Seinen / Shonen Swordsman',
  'Kamunabi Forge Sanctuary',
  'Rokuhira Swordsmith Lineage',
  '“Every morning I wake up with fresh hatred—and a sharper edge.”',
  'Trained beside his legendary swordsmith father, Chihiro wields the seventh enchanted katana capable of absorbing and manifesting spirit energy as obsidian goldfish.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b314801-MvuHiyPe5Dxu.png',
  '[{"label": "Swordplay", "value": 97, "max": 100}, {"label": "Spirit Energy", "value": 94, "max": 100}, {"label": "Resolve", "value": 100, "max": 100}]',
  '{"firstAppearance": "Weekly Shonen Jump Issue #42", "weapon": "Enchanted Blade: Enten (Kuro, Aka, Nishiki)", "nemesis": "The Hishaku Sorcerer Syndicate", "bio": "Trained beside his legendary swordsmith father, Chihiro wields the seventh enchanted katana capable of absorbing and manifesting spirit energy as obsidian goldfish."}',
  NOW()
),
(
  'Archivist Zero',
  'archivist-zero',
  'Keeper of the Vault',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Grand Lore Historian',
  'Citadel of Canon • Sector 08',
  'Verified Contributors Guild',
  '“No theory survives without citations; every timeline leaves a footprint.”',
  'Synthesizing decades of interviews, artbooks, and frame-by-frame analyses, Archivist Zero curates the Community Vault so only the highest-caliber fan scholarship enters the permanent record.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/709-watcher.jpg',
  '[{"label": "Canon Accuracy", "value": 99, "max": 100}, {"label": "Essays Vetted", "textValue": "1,420+ Approved"}, {"label": "Clearance", "textValue": "Level 5 Moderator"}]',
  '{"firstAppearance": "Fan Hub Plus Founding Charter v1.0", "weapon": "Cross-Universe Citation Matrix", "nemesis": "Unverified Spoilers & Low-Effort Filler", "bio": "Synthesizing decades of interviews, artbooks, and frame-by-frame analyses, Archivist Zero curates the Community Vault so only the highest-caliber fan scholarship enters the permanent record."}',
  NOW()
),
(
  'Goku',
  'goku',
  'Kakarot',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'Protagonist',
  'Dragon Ball',
  'Z Fighters',
  'The strongest warrior in the universe',
  'A Saiyan sent to Earth as a baby, raised as a human, and became Earth''s greatest protector.',
  'https://s4.anilist.co/file/anilistcdn/character/large/246-wsRRr6z1kii8.png',
  '[{"label": "Strength", "value": 99, "max": 100, "textValue": "99%"}, {"label": "Speed", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "Dragon Ball Archival Debut", "weapon": "Protagonist Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A Saiyan sent to Earth as a baby, raised as a human, and became Earth''s greatest protector.", "universe": "Dragon Ball", "species": "Saiyan"}',
  NOW()
),
(
  'Naruto Uzumaki',
  'naruto-uzumaki',
  'Naruto',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'Protagonist',
  'Naruto',
  'Konoha',
  'Believe it!',
  'A ninja from the Hidden Leaf Village with the Nine-Tails fox spirit sealed within him.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b17-phjcWCkRuIhu.png',
  '[{"label": "Chakra", "value": 90, "max": 100, "textValue": "90%"}, {"label": "Resilience", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "Naruto Archival Debut", "weapon": "Protagonist Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A ninja from the Hidden Leaf Village with the Nine-Tails fox spirit sealed within him.", "universe": "Naruto", "species": "Human"}',
  NOW()
),
(
  'Monkey D. Luffy',
  'monkey-d-luffy',
  'Straw Hat',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'Protagonist',
  'One Piece',
  'Straw Hat Pirates',
  'I''m going to be the King of the Pirates!',
  'A pirate with rubber powers who dreams of finding the One Piece treasure.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b40-MNypXsxSRb1R.png',
  '[{"label": "Endurance", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Ambition", "value": 100, "max": 100, "textValue": "100%"}]',
  '{"firstAppearance": "One Piece Archival Debut", "weapon": "Protagonist Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A pirate with rubber powers who dreams of finding the One Piece treasure.", "universe": "One Piece", "species": "Human"}',
  NOW()
),
(
  'Sasuke Uchiha',
  'sasuke-uchiha',
  'The Avenger',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'Rival',
  'Naruto',
  'Team 7',
  'I am an avenger.',
  'A powerful ninja seeking revenge against his brother, driven by ambition and pride.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b13-SISLEw1oAD7a.png',
  '[{"label": "Speed", "value": 95, "max": 100, "textValue": "95%"}, {"label": "Power", "value": 94, "max": 100, "textValue": "94%"}]',
  '{"firstAppearance": "Naruto Archival Debut", "weapon": "Rival Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A powerful ninja seeking revenge against his brother, driven by ambition and pride.", "universe": "Naruto", "species": "Human"}',
  NOW()
),
(
  'Ichigo Kurosaki',
  'ichigo-kurosaki',
  'Bleach',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'Protector',
  'Bleach',
  'Soul Society',
  'I am the one who fights.',
  'A teenager with the ability to see and interact with spirits, protecting humans from hollows.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b5-a7bkJgjhhigE.png',
  '[{"label": "Swordsmanship", "value": 92, "max": 100, "textValue": "92%"}, {"label": "Spiritual Power", "value": 96, "max": 100, "textValue": "96%"}]',
  '{"firstAppearance": "Bleach Archival Debut", "weapon": "Protector Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A teenager with the ability to see and interact with spirits, protecting humans from hollows.", "universe": "Bleach", "species": "Human"}',
  NOW()
),
(
  'Levi Ackerman',
  'levi-ackerman',
  'Humanity''s Strongest Soldier',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'Soldier',
  'Attack on Titan',
  'Survey Corps',
  'The difference in our strength is like the difference between clouds and mud.',
  'A skilled soldier with exceptional combat abilities, leading the Survey Corps.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b45627-CR68RyZmddGG.png',
  '[{"label": "Combat", "value": 98, "max": 100, "textValue": "98%"}, {"label": "Leadership", "value": 90, "max": 100, "textValue": "90%"}]',
  '{"firstAppearance": "Attack on Titan Archival Debut", "weapon": "Soldier Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A skilled soldier with exceptional combat abilities, leading the Survey Corps.", "universe": "Attack on Titan", "species": "Human"}',
  NOW()
),
(
  'Rem',
  'rem',
  'The Blue Demon Maid',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'Demon Maid',
  'Re:Zero',
  'Roswaal''s Mansion',
  'I love Subaru.',
  'A demon maid with blue hair who serves in a mansion and possesses formidable combat skills.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b88575-Ayu8UPDA8NS6.png',
  '[{"label": "Combat", "value": 88, "max": 100, "textValue": "88%"}, {"label": "Loyalty", "value": 100, "max": 100, "textValue": "100%"}]',
  '{"firstAppearance": "Re:Zero Archival Debut", "weapon": "Demon Maid Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A demon maid with blue hair who serves in a mansion and possesses formidable combat skills.", "universe": "Re:Zero", "species": "Demon"}',
  NOW()
),
(
  'Mikasa Ackerman',
  'mikasa-ackerman',
  'The Black-Haired Goddess',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'Soldier',
  'Attack on Titan',
  'Survey Corps',
  'Eren, I''ll always follow you.',
  'A skilled fighter and devoted friend who protects those she cares about.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b40881-F3gr1PkreDvj.png',
  '[{"label": "Combat", "value": 92, "max": 100, "textValue": "92%"}, {"label": "Devotion", "value": 100, "max": 100, "textValue": "100%"}]',
  '{"firstAppearance": "Attack on Titan Archival Debut", "weapon": "Soldier Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A skilled fighter and devoted friend who protects those she cares about.", "universe": "Attack on Titan", "species": "Human"}',
  NOW()
),
(
  'Geralt of Rivia',
  'geralt-of-rivia',
  'The Witcher',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'Witcher',
  'The Witcher',
  'Witchers',
  'I am the witcher.',
  'A monster hunter with supernatural abilities, mutated through ancient rites.',
  'https://upload.wikimedia.org/wikipedia/commons/8/87/Geralt.jpg',
  '[{"label": "Swordsmanship", "value": 95, "max": 100, "textValue": "95%"}, {"label": "Alchemy", "value": 85, "max": 100, "textValue": "85%"}]',
  '{"firstAppearance": "The Witcher Archival Debut", "weapon": "Witcher Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A monster hunter with supernatural abilities, mutated through ancient rites.", "universe": "The Witcher", "species": "Human"}',
  NOW()
),
(
  'Link',
  'link',
  'The Hero of Time',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'Hero',
  'The Legend of Zelda',
  'Hyrule',
  'It''s dangerous to go alone! Take this.',
  'The chosen hero destined to save Hyrule from darkness.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b4201-VySa1vLuUcwb.jpg',
  '[{"label": "Courage", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Wisdom", "value": 90, "max": 100, "textValue": "90%"}]',
  '{"firstAppearance": "The Legend of Zelda Archival Debut", "weapon": "Hero Arsenal", "nemesis": "Multiverse Antagonist", "bio": "The chosen hero destined to save Hyrule from darkness.", "universe": "The Legend of Zelda", "species": "Hylian"}',
  NOW()
),
(
  'Master Chief',
  'master-chief',
  'John-117',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'Spartan',
  'Halo',
  'UNSC',
  'I''ll finish the fight.',
  'A genetically enhanced supersoldier fighting against the Covenant.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/435-master-chief.jpg',
  '[{"label": "Strength", "value": 95, "max": 100, "textValue": "95%"}, {"label": "Tactical", "value": 90, "max": 100, "textValue": "90%"}]',
  '{"firstAppearance": "Halo Archival Debut", "weapon": "Spartan Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A genetically enhanced supersoldier fighting against the Covenant.", "universe": "Halo", "species": "Human"}',
  NOW()
),
(
  'Cloud Strife',
  'cloud-strife',
  'The One-Winged Angel',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'Ex-Soldier',
  'Final Fantasy VII',
  'AVALANCHE',
  'Let''s mosey.',
  'A former member of an elite military unit turned eco-terrorist who fights to save the planet.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b456-aqvvhzG5aUXV.png',
  '[{"label": "Swordsmanship", "value": 94, "max": 100, "textValue": "94%"}, {"label": "Materia", "value": 88, "max": 100, "textValue": "88%"}]',
  '{"firstAppearance": "Final Fantasy VII Archival Debut", "weapon": "Ex-Soldier Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A former member of an elite military unit turned eco-terrorist who fights to save the planet.", "universe": "Final Fantasy VII", "species": "Human"}',
  NOW()
),
(
  'Lara Croft',
  'lara-croft',
  'Tomb Raider',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'Archaeologist',
  'Tomb Raider',
  'Independent',
  'I''ll find the truth.',
  'An adventurous archaeologist exploring ancient tombs and uncovering lost civilizations.',
  'https://upload.wikimedia.org/wikipedia/en/a/a8/LaraCroftInfobox.png',
  '[{"label": "Agility", "value": 92, "max": 100, "textValue": "92%"}, {"label": "Intelligence", "value": 90, "max": 100, "textValue": "90%"}]',
  '{"firstAppearance": "Tomb Raider Archival Debut", "weapon": "Archaeologist Arsenal", "nemesis": "Multiverse Antagonist", "bio": "An adventurous archaeologist exploring ancient tombs and uncovering lost civilizations.", "universe": "Tomb Raider", "species": "Human"}',
  NOW()
),
(
  'Kratos',
  'kratos',
  'Ghost of Sparta',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'Warrior',
  'God of War',
  'Norse Gods',
  'Boy!',
  'A warrior who escaped the Greek underworld to challenge the gods themselves.',
  'https://upload.wikimedia.org/wikipedia/en/2/2f/Kratos_PS4.png',
  '[{"label": "Strength", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Rage", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "God of War Archival Debut", "weapon": "Warrior Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A warrior who escaped the Greek underworld to challenge the gods themselves.", "universe": "God of War", "species": "Demigod"}',
  NOW()
),
(
  'Ellie',
  'ellie',
  'Firefly',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'Survivor',
  'The Last of Us',
  'Fireflies',
  'I''ll survive.',
  'A young survivor immune to infection, navigating a post-apocalyptic world.',
  'https://upload.wikimedia.org/wikipedia/en/9/96/Ellie_in_The_Last_of_Us_Part_II.png',
  '[{"label": "Survival", "value": 95, "max": 100, "textValue": "95%"}, {"label": "Courage", "value": 92, "max": 100, "textValue": "92%"}]',
  '{"firstAppearance": "The Last of Us Archival Debut", "weapon": "Survivor Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A young survivor immune to infection, navigating a post-apocalyptic world.", "universe": "The Last of Us", "species": "Human"}',
  NOW()
),
(
  'Tony Stark',
  'tony-stark',
  'Iron Man',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'Genius',
  'Marvel Cinematic Universe',
  'Avengers',
  'I am Iron Man.',
  'A billionaire industrialist who builds a powered suit of armor to save the world.',
  'https://upload.wikimedia.org/wikipedia/en/f/f2/Robert_Downey_Jr._as_Tony_Stark_in_Avengers_Infinity_War.jpg',
  '[{"label": "Intelligence", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Charisma", "value": 85, "max": 100, "textValue": "85%"}]',
  '{"firstAppearance": "Marvel Cinematic Universe Archival Debut", "weapon": "Genius Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A billionaire industrialist who builds a powered suit of armor to save the world.", "universe": "Marvel", "species": "Human"}',
  NOW()
),
(
  'Jon Snow',
  'jon-snow',
  'Aegon Targaryen',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'Leader',
  'Game of Thrones',
  'Night''s Watch',
  'Winter is coming.',
  'A nobleman raised as a bastard, destined to protect the realm from the White Walkers.',
  'https://upload.wikimedia.org/wikipedia/en/3/30/Jon_Snow_Season_8.png',
  '[{"label": "Honor", "value": 90, "max": 100, "textValue": "90%"}, {"label": "Leadership", "value": 85, "max": 100, "textValue": "85%"}]',
  '{"firstAppearance": "Game of Thrones Archival Debut", "weapon": "Leader Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A nobleman raised as a bastard, destined to protect the realm from the White Walkers.", "universe": "Game of Thrones", "species": "Human"}',
  NOW()
),
(
  'Neo',
  'neo',
  'The One',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'Chosen One',
  'The Matrix',
  'Zion',
  'I know kung fu.',
  'A computer programmer who discovers the true nature of reality and becomes humanity''s savior.',
  'https://upload.wikimedia.org/wikipedia/en/c/c6/NeoTheMatrix.jpg',
  '[{"label": "Martial Arts", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Hacking", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "The Matrix Archival Debut", "weapon": "Chosen One Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A computer programmer who discovers the true nature of reality and becomes humanity''s savior.", "universe": "The Matrix", "species": "Human"}',
  NOW()
),
(
  'Walter White',
  'walter-white',
  'Heisenberg',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'Antihero',
  'Breaking Bad',
  'Cartel',
  'You''re goddamn right.',
  'A chemistry teacher turned drug kingpin, motivated by pride and ego.',
  'https://upload.wikimedia.org/wikipedia/commons/9/95/BryanCranston-byPhilipRomano_%28cropped%29.jpg',
  '[{"label": "Chemistry", "value": 98, "max": 100, "textValue": "98%"}, {"label": "Cunning", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "Breaking Bad Archival Debut", "weapon": "Antihero Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A chemistry teacher turned drug kingpin, motivated by pride and ego.", "universe": "Breaking Bad", "species": "Human"}',
  NOW()
),
(
  'Daenerys Targaryen',
  'daenerys-targaryen',
  'Mother of Dragons',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'Queen',
  'Game of Thrones',
  'House Targaryen',
  'Dracarys!',
  'An exiled princess who rises to power, commanding dragons and loyal followers.',
  'https://upload.wikimedia.org/wikipedia/en/0/0d/Daenerys_Targaryen_with_Dragon-Emilia_Clarke.jpg',
  '[{"label": "Leadership", "value": 96, "max": 100, "textValue": "96%"}, {"label": "Dragons", "value": 100, "max": 100, "textValue": "100%"}]',
  '{"firstAppearance": "Game of Thrones Archival Debut", "weapon": "Queen Arsenal", "nemesis": "Multiverse Antagonist", "bio": "An exiled princess who rises to power, commanding dragons and loyal followers.", "universe": "Game of Thrones", "species": "Human"}',
  NOW()
),
(
  'Sherlock Holmes',
  'sherlock-holmes',
  'The Consulting Detective',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'Detective',
  'BBC Sherlock',
  'Baker Street',
  'The game is afoot.',
  'A brilliant modern detective solving crimes in contemporary London.',
  'https://upload.wikimedia.org/wikipedia/commons/a/ab/Benedict_Cumberbatch-67555.jpg',
  '[{"label": "Intelligence", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Observation", "value": 100, "max": 100, "textValue": "100%"}]',
  '{"firstAppearance": "BBC Sherlock Archival Debut", "weapon": "Detective Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A brilliant modern detective solving crimes in contemporary London.", "universe": "Sherlock", "species": "Human"}',
  NOW()
),
(
  'Eleven',
  'eleven',
  'El',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'Psychokinetic',
  'Stranger Things',
  'Hawkins Lab',
  'Friends don''t lie.',
  'A young girl with psychokinetic abilities escaping a secret laboratory.',
  'https://upload.wikimedia.org/wikipedia/en/3/3f/Eleven_%28Stranger_Things_5%29.png',
  '[{"label": "Psychokinesis", "value": 98, "max": 100, "textValue": "98%"}, {"label": "Growth", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "Stranger Things Archival Debut", "weapon": "Psychokinetic Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A young girl with psychokinetic abilities escaping a secret laboratory.", "universe": "Stranger Things", "species": "Human"}',
  NOW()
),
(
  'Lisa',
  'lisa',
  'Lalisa Manoban',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'Idol',
  'Blackpink',
  'YG Entertainment',
  'LISA is the name, dancing is my game.',
  'A Thai-born K-pop idol known for her exceptional dancing skills and charisma.',
  'https://upload.wikimedia.org/wikipedia/commons/a/ae/20240314_Lisa_Manoban_07.jpg',
  '[{"label": "Dance", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Charisma", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "Blackpink Archival Debut", "weapon": "Idol Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A Thai-born K-pop idol known for her exceptional dancing skills and charisma.", "universe": "K-Pop", "species": "Human"}',
  NOW()
),
(
  'Jungkook',
  'jungkook',
  'JK',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'Idol',
  'BTS',
  'Big Hit Music',
  'I''m the golden maknae.',
  'The youngest member of BTS, known for his vocal talent and versatility.',
  'https://upload.wikimedia.org/wikipedia/commons/f/f6/Jung_Kook_of_BTS%2C_February_12%2C_2026_%281%29.png',
  '[{"label": "Vocal", "value": 95, "max": 100, "textValue": "95%"}, {"label": "Dance", "value": 90, "max": 100, "textValue": "90%"}]',
  '{"firstAppearance": "BTS Archival Debut", "weapon": "Idol Arsenal", "nemesis": "Multiverse Antagonist", "bio": "The youngest member of BTS, known for his vocal talent and versatility.", "universe": "K-Pop", "species": "Human"}',
  NOW()
),
(
  'IU',
  'iu',
  'Lee Ji-eun',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'Singer-Songwriter',
  'K-Pop',
  'EDAM Entertainment',
  'The nation''s little sister.',
  'A South Korean singer-songwriter known for her sweet voice and heartfelt lyrics.',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/IU_at_Blue_Dragon_Series_Awards_on_18072025_%2810%29.png',
  '[{"label": "Vocal", "value": 95, "max": 100, "textValue": "95%"}, {"label": "Songwriting", "value": 90, "max": 100, "textValue": "90%"}]',
  '{"firstAppearance": "K-Pop Archival Debut", "weapon": "Singer-Songwriter Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A South Korean singer-songwriter known for her sweet voice and heartfelt lyrics.", "universe": "K-Pop", "species": "Human"}',
  NOW()
),
(
  'Jennie Kim',
  'jennie-kim',
  'Jennie',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'Idol',
  'Blackpink',
  'YG Entertainment',
  'Pretty savage.',
  'A South Korean rapper and member of Blackpink, known for her stage presence.',
  'https://upload.wikimedia.org/wikipedia/commons/7/7a/20260526_Jennie_Kim_04.jpg',
  '[{"label": "Rap", "value": 92, "max": 100, "textValue": "92%"}, {"label": "Stage Presence", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "Blackpink Archival Debut", "weapon": "Idol Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A South Korean rapper and member of Blackpink, known for her stage presence.", "universe": "K-Pop", "species": "Human"}',
  NOW()
),
(
  'V (Taehyung)',
  'v-taehyung',
  'Tae',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'Idol',
  'BTS',
  'Big Hit Music',
  'I purple you.',
  'A member of BTS known for his deep voice and artistic talents.',
  'https://upload.wikimedia.org/wikipedia/commons/d/d4/BTS%27s_V_20251004_04.jpg',
  '[{"label": "Vocal", "value": 92, "max": 100, "textValue": "92%"}, {"label": "Visual", "value": 98, "max": 100, "textValue": "98%"}]',
  '{"firstAppearance": "BTS Archival Debut", "weapon": "Idol Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A member of BTS known for his deep voice and artistic talents.", "universe": "K-Pop", "species": "Human"}',
  NOW()
),
(
  'Spider-Man',
  'spider-man',
  'Peter Parker',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'Superhero',
  'Marvel Comics',
  'Avengers',
  'With great power comes great responsibility.',
  'A high school student bitten by a radioactive spider, gaining spider-like abilities.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg',
  '[{"label": "Agility", "value": 95, "max": 100, "textValue": "95%"}, {"label": "Strength", "value": 85, "max": 100, "textValue": "85%"}]',
  '{"firstAppearance": "Marvel Comics Archival Debut", "weapon": "Superhero Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A high school student bitten by a radioactive spider, gaining spider-like abilities.", "universe": "Marvel", "species": "Human"}',
  NOW()
),
(
  'Batman',
  'batman',
  'Bruce Wayne',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'Detective',
  'DC Comics',
  'Justice League',
  'I am the night.',
  'A billionaire who uses his intellect and resources to fight crime in Gotham City.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/69-batman.jpg',
  '[{"label": "Intelligence", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Martial Arts", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "DC Comics Archival Debut", "weapon": "Detective Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A billionaire who uses his intellect and resources to fight crime in Gotham City.", "universe": "DC", "species": "Human"}',
  NOW()
),
(
  'Wonder Woman',
  'wonder-woman',
  'Diana Prince',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'Amazon',
  'DC Comics',
  'Justice League',
  'I am Diana of Themyscira, Princess of the Amazons.',
  'An Amazon princess with superhuman strength and the Lasso of Truth.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg',
  '[{"label": "Strength", "value": 95, "max": 100, "textValue": "95%"}, {"label": "Wisdom", "value": 90, "max": 100, "textValue": "90%"}]',
  '{"firstAppearance": "DC Comics Archival Debut", "weapon": "Amazon Arsenal", "nemesis": "Multiverse Antagonist", "bio": "An Amazon princess with superhuman strength and the Lasso of Truth.", "universe": "DC", "species": "Amazon"}',
  NOW()
),
(
  'Superman',
  'superman',
  'Clark Kent',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'Kryptonian',
  'DC Comics',
  'Justice League',
  'Truth, justice, and the American way.',
  'An alien from Krypton with extraordinary powers, raised as a human in Kansas.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg',
  '[{"label": "Strength", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Flight", "value": 100, "max": 100, "textValue": "100%"}]',
  '{"firstAppearance": "DC Comics Archival Debut", "weapon": "Kryptonian Arsenal", "nemesis": "Multiverse Antagonist", "bio": "An alien from Krypton with extraordinary powers, raised as a human in Kansas.", "universe": "DC", "species": "Kryptonian"}',
  NOW()
),
(
  'Iron Man',
  'iron-man',
  'Tony Stark',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'Genius Inventor',
  'Marvel Comics',
  'Avengers',
  'Genius, billionaire, playboy, philanthropist.',
  'A brilliant engineer who creates advanced armor to fight evil.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg',
  '[{"label": "Engineering", "value": 99, "max": 100, "textValue": "99%"}, {"label": "Power", "value": 90, "max": 100, "textValue": "90%"}]',
  '{"firstAppearance": "Marvel Comics Archival Debut", "weapon": "Genius Inventor Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A brilliant engineer who creates advanced armor to fight evil.", "universe": "Marvel", "species": "Human"}',
  NOW()
),
(
  'Black Widow',
  'black-widow',
  'Natasha Romanoff',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'Assassin',
  'Marvel Comics',
  'Avengers',
  'I''m always picking up after you boys.',
  'A highly trained spy and assassin turned hero, fighting for redemption.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/107-black-widow.jpg',
  '[{"label": "Espionage", "value": 98, "max": 100, "textValue": "98%"}, {"label": "Combat", "value": 96, "max": 100, "textValue": "96%"}]',
  '{"firstAppearance": "Marvel Comics Archival Debut", "weapon": "Assassin Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A highly trained spy and assassin turned hero, fighting for redemption.", "universe": "Marvel", "species": "Human"}',
  NOW()
),
(
  'The Flash',
  'the-flash',
  'Barry Allen',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'Speedster',
  'DC Comics',
  'Justice League',
  'My name is Barry Allen, and I''m the fastest man alive.',
  'A forensic scientist struck by lightning, gaining super speed powers.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/263-flash.jpg',
  '[{"label": "Speed", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Agility", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "DC Comics Archival Debut", "weapon": "Speedster Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A forensic scientist struck by lightning, gaining super speed powers.", "universe": "DC", "species": "Human"}',
  NOW()
),
(
  'Saitama',
  'saitama',
  'One Punch Man',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'Hero',
  'One Punch Man',
  'Hero Association',
  'I''m just a hero for fun.',
  'A hero who can defeat any opponent with a single punch, but is bored with his power.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b73935-ON5d0mAcrItd.jpg',
  '[{"label": "Strength", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Speed", "value": 100, "max": 100, "textValue": "100%"}]',
  '{"firstAppearance": "One Punch Man Archival Debut", "weapon": "Hero Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A hero who can defeat any opponent with a single punch, but is bored with his power.", "universe": "One Punch Man", "species": "Human"}',
  NOW()
),
(
  'Eren Yeager',
  'eren-yeager',
  'Eren Jaeger',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'Revolutionary',
  'Attack on Titan',
  'Survey Corps',
  'I will destroy all the Titans.',
  'A young man who swears revenge on the Titans after they destroy his hometown.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b40882-dsj7IP943WFF.jpg',
  '[{"label": "Determination", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Agility", "value": 90, "max": 100, "textValue": "90%"}]',
  '{"firstAppearance": "Attack on Titan Archival Debut", "weapon": "Revolutionary Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A young man who swears revenge on the Titans after they destroy his hometown.", "universe": "Attack on Titan", "species": "Human"}',
  NOW()
),
(
  'Light Yagami',
  'light-yagami',
  'Kira',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'Genius',
  'Death Note',
  'Kira',
  'I am the god of the new world.',
  'A genius high school student who gains the power to kill with a notebook.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b80-26EhwSsSqQ50.png',
  '[{"label": "Intelligence", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Manipulation", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "Death Note Archival Debut", "weapon": "Genius Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A genius high school student who gains the power to kill with a notebook.", "universe": "Death Note", "species": "Human"}',
  NOW()
),
(
  'Tanjiro Kamado',
  'tanjiro-kamado',
  'Demon Slayer',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'Swordsman',
  'Demon Slayer',
  'Demon Slayer Corps',
  'I''ll save everyone.',
  'A young demon slayer who fights to turn his sister back into a human.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png',
  '[{"label": "Swordsmanship", "value": 93, "max": 100, "textValue": "93%"}, {"label": "Determination", "value": 96, "max": 100, "textValue": "96%"}]',
  '{"firstAppearance": "Demon Slayer Archival Debut", "weapon": "Swordsman Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A young demon slayer who fights to turn his sister back into a human.", "universe": "Demon Slayer", "species": "Human"}',
  NOW()
),
(
  'Mob',
  'mob',
  'Shigeo Kageyama',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'Psychic',
  'Mob Psycho 100',
  'Spirit Medium Association',
  'I''m not special.',
  'A middle school student with overwhelming psychic powers seeking normalcy.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b89616-dXmdOc7L6SDi.png',
  '[{"label": "Psychic Power", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Growth", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "Mob Psycho 100 Archival Debut", "weapon": "Psychic Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A middle school student with overwhelming psychic powers seeking normalcy.", "universe": "Mob Psycho 100", "species": "Human"}',
  NOW()
),
(
  'Yuji Itadori',
  'yuji-itadori',
  'Sukuna''s Vessel',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'Sorcerer',
  'Jujutsu Kaisen',
  'Tokyo Jujutsu High',
  'I will save everyone.',
  'A high schooler who swallows a cursed finger and becomes the vessel of a powerful demon.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b127212-FVm2tD0erQ5B.png',
  '[{"label": "Cursed Energy", "value": 92, "max": 100, "textValue": "92%"}, {"label": "Combat", "value": 90, "max": 100, "textValue": "90%"}]',
  '{"firstAppearance": "Jujutsu Kaisen Archival Debut", "weapon": "Sorcerer Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A high schooler who swallows a cursed finger and becomes the vessel of a powerful demon.", "universe": "Jujutsu Kaisen", "species": "Human"}',
  NOW()
),
(
  'Deku',
  'deku',
  'Izuku Midoriya',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'Hero-in-Training',
  'My Hero Academia',
  'U.A. High School',
  'Plus Ultra!',
  'A quirkless boy who gains superpowers and becomes a hero in training.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b89028-8w1I9o1ISHMg.png',
  '[{"label": "Quirk", "value": 88, "max": 100, "textValue": "88%"}, {"label": "Determination", "value": 98, "max": 100, "textValue": "98%"}]',
  '{"firstAppearance": "My Hero Academia Archival Debut", "weapon": "Hero-in-Training Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A quirkless boy who gains superpowers and becomes a hero in training.", "universe": "My Hero Academia", "species": "Human"}',
  NOW()
),
(
  'Darth Vader',
  'darth-vader',
  'Anakin Skywalker',
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'Sith Lord',
  'Star Wars',
  'Galactic Empire',
  'I am your father.',
  'A former Jedi turned Sith Lord, known for his black armor and deep voice.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/208-darth-vader.jpg',
  '[{"label": "Dark Side", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Power", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "Star Wars Archival Debut", "weapon": "Sith Lord Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A former Jedi turned Sith Lord, known for his black armor and deep voice.", "universe": "Star Wars", "species": "Human"}',
  NOW()
),
(
  'Harley Quinn',
  'harley-quinn',
  'Harleen Quinzel',
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'Jester',
  'DC Comics',
  'Suicide Squad',
  'Who''s the bad guy now?',
  'A former psychiatrist turned criminal, known for her playful and chaotic nature.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/309-harley-quinn.jpg',
  '[{"label": "Acrobatics", "value": 90, "max": 100, "textValue": "90%"}, {"label": "Chaos", "value": 100, "max": 100, "textValue": "100%"}]',
  '{"firstAppearance": "DC Comics Archival Debut", "weapon": "Jester Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A former psychiatrist turned criminal, known for her playful and chaotic nature.", "universe": "DC", "species": "Human"}',
  NOW()
),
(
  'Mario',
  'mario',
  'Super Mario',
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'Plumber',
  'Super Mario',
  'Mushroom Kingdom',
  'It''s-a me, Mario!',
  'A famous plumber who saves Princess Peach from Bowser.',
  'https://upload.wikimedia.org/wikipedia/en/5/5c/Mario_by_Shigehisa_Nakaue.png',
  '[{"label": "Jumping", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Adventure", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "Super Mario Archival Debut", "weapon": "Plumber Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A famous plumber who saves Princess Peach from Bowser.", "universe": "Super Mario", "species": "Human"}',
  NOW()
),
(
  'Pikachu',
  'pikachu',
  'Electric Mouse',
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'Pokemon',
  'Pokemon',
  'Team Pikachu',
  'Pika Pika!',
  'An electric-type Pokemon known for its iconic "Pika Pika" cry and powerful attacks.',
  'https://s4.anilist.co/file/anilistcdn/character/large/b3891-edgrZOgCJ9do.jpg',
  '[{"label": "Electric", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Speed", "value": 92, "max": 100, "textValue": "92%"}]',
  '{"firstAppearance": "Pokemon Archival Debut", "weapon": "Pokemon Arsenal", "nemesis": "Multiverse Antagonist", "bio": "An electric-type Pokemon known for its iconic \\"Pika Pika\\" cry and powerful attacks.", "universe": "Pokemon", "species": "Electric Mouse"}',
  NOW()
),
(
  'Wolverine',
  'wolverine',
  'Logan',
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'Mutant',
  'Marvel Comics',
  'X-Men',
  'The best there is at what I do.',
  'A mutant with healing powers and retractable adamantium claws, seeking redemption.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg',
  '[{"label": "Regeneration", "value": 95, "max": 100, "textValue": "95%"}, {"label": "Combat", "value": 94, "max": 100, "textValue": "94%"}]',
  '{"firstAppearance": "Marvel Comics Archival Debut", "weapon": "Mutant Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A mutant with healing powers and retractable adamantium claws, seeking redemption.", "universe": "Marvel", "species": "Mutant"}',
  NOW()
),
(
  'Deadpool',
  'deadpool',
  'Wade Wilson',
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'Mercenary',
  'Marvel Comics',
  'Merc with a Mouth',
  'Maximum effort!',
  'A wisecracking mercenary with a healing factor and a love for chaos.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg',
  '[{"label": "Humor", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Combat", "value": 88, "max": 100, "textValue": "88%"}]',
  '{"firstAppearance": "Marvel Comics Archival Debut", "weapon": "Mercenary Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A wisecracking mercenary with a healing factor and a love for chaos.", "universe": "Marvel", "species": "Human"}',
  NOW()
),
(
  'Joker',
  'joker',
  'The Clown Prince of Crime',
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'Criminal',
  'DC Comics',
  'None',
  'Why so serious?',
  'Batman''s arch-nemesis, a chaotic criminal mastermind with a twisted sense of humor.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/370-joker.jpg',
  '[{"label": "Chaos", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Intelligence", "value": 92, "max": 100, "textValue": "92%"}]',
  '{"firstAppearance": "DC Comics Archival Debut", "weapon": "Criminal Arsenal", "nemesis": "Multiverse Antagonist", "bio": "Batman''s arch-nemesis, a chaotic criminal mastermind with a twisted sense of humor.", "universe": "DC", "species": "Human"}',
  NOW()
),
(
  'Sherlock Holmes (221B Canon)',
  'sherlock-holmes-canon',
  'The Consulting Detective',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Detective',
  'Arthur Conan Doyle''s stories',
  'Baker Street',
  'The game is afoot.',
  'A brilliant detective known for his logical reasoning and forensic skills.',
  'https://upload.wikimedia.org/wikipedia/commons/c/cd/Sherlock_Holmes_Portrait_Paget.jpg',
  '[{"label": "Intelligence", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Observation", "value": 100, "max": 100, "textValue": "100%"}]',
  '{"firstAppearance": "Arthur Conan Doyle''s stories Archival Debut", "weapon": "Detective Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A brilliant detective known for his logical reasoning and forensic skills.", "universe": "Sherlock Holmes", "species": "Human"}',
  NOW()
),
(
  'The Doctor',
  'the-doctor',
  'The Time Lord',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Time Traveler',
  'Doctor Who',
  'Gallifrey',
  'Allons-y!',
  'A time-traveling alien who explores the universe in the TARDIS.',
  'https://upload.wikimedia.org/wikipedia/en/2/21/Tenth_Doctor_%28Doctor_Who%29.jpg',
  '[{"label": "Regeneration", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Wisdom", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "Doctor Who Archival Debut", "weapon": "Time Traveler Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A time-traveling alien who explores the universe in the TARDIS.", "universe": "Doctor Who", "species": "Time Lord"}',
  NOW()
),
(
  'Hermione Granger',
  'hermione-granger',
  'The Brightest Witch',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Witch',
  'Harry Potter',
  'Gryffindor',
  'I''m going to bed before either of you come up with another clever idea to get us killed.',
  'A brilliant witch known for her intelligence and loyalty.',
  'https://upload.wikimedia.org/wikipedia/en/d/d3/Hermione_Granger_poster.jpg',
  '[{"label": "Intelligence", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Loyalty", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "Harry Potter Archival Debut", "weapon": "Witch Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A brilliant witch known for her intelligence and loyalty.", "universe": "Harry Potter", "species": "Human"}',
  NOW()
),
(
  'Harry Potter',
  'harry-potter',
  'The Boy Who Lived',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Wizard',
  'Harry Potter',
  'Gryffindor',
  'I''m not really famous for anything.',
  'A young wizard destined to defeat the dark wizard Voldemort.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/310-harry-potter.jpg',
  '[{"label": "Magic", "value": 90, "max": 100, "textValue": "90%"}, {"label": "Courage", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "Harry Potter Archival Debut", "weapon": "Wizard Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A young wizard destined to defeat the dark wizard Voldemort.", "universe": "Harry Potter", "species": "Wizard"}',
  NOW()
),
(
  'Dumbledore',
  'dumbledore',
  'Albus Percival Wulfric Brian Dumbledore',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Sage',
  'Harry Potter',
  'Hogwarts',
  'It is our choices that show what we truly are.',
  'The most powerful wizard of his time, known for his wisdom and kindness.',
  'https://upload.wikimedia.org/wikipedia/en/e/e8/Dumbledore_-_Prisoner_of_Azkaban.jpg',
  '[{"label": "Magic", "value": 100, "max": 100, "textValue": "100%"}, {"label": "Wisdom", "value": 100, "max": 100, "textValue": "100%"}]',
  '{"firstAppearance": "Harry Potter Archival Debut", "weapon": "Sage Arsenal", "nemesis": "Multiverse Antagonist", "bio": "The most powerful wizard of his time, known for his wisdom and kindness.", "universe": "Harry Potter", "species": "Wizard"}',
  NOW()
),
(
  'Gandalf',
  'gandalf',
  'Gandalf the Grey',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Wizard',
  'The Lord of the Rings',
  'Fellowship',
  'You shall not pass!',
  'An ancient wizard and mentor to hobbits, fighting against the forces of darkness.',
  'https://upload.wikimedia.org/wikipedia/en/b/bd/Gandalf_from_The_Trolls_are_Turned_to_Stone_-_J.R.R_Tolkien.jpg',
  '[{"label": "Magic", "value": 98, "max": 100, "textValue": "98%"}, {"label": "Leadership", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "The Lord of the Rings Archival Debut", "weapon": "Wizard Arsenal", "nemesis": "Multiverse Antagonist", "bio": "An ancient wizard and mentor to hobbits, fighting against the forces of darkness.", "universe": "The Lord of the Rings", "species": "Maiar"}',
  NOW()
),
(
  'Frodo Baggins',
  'frodo-baggins',
  'Frodo',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Hobbit',
  'The Lord of the Rings',
  'Fellowship',
  'I wish it need not have happened in my time.',
  'A small hobbit entrusted with the One Ring and the fate of Middle-earth.',
  'https://upload.wikimedia.org/wikipedia/commons/9/95/Elijah_Wood_at_the_2025_Sundance_Film_Festival_%28cropped%292.jpg',
  '[{"label": "Resilience", "value": 95, "max": 100, "textValue": "95%"}, {"label": "Determination", "value": 96, "max": 100, "textValue": "96%"}]',
  '{"firstAppearance": "The Lord of the Rings Archival Debut", "weapon": "Hobbit Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A small hobbit entrusted with the One Ring and the fate of Middle-earth.", "universe": "The Lord of the Rings", "species": "Hobbit"}',
  NOW()
),
(
  'Aragorn',
  'aragorn',
  'Strider',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Ranger',
  'The Lord of the Rings',
  'Dúnedain',
  'A wizard is never late.',
  'A ranger and rightful king of Gondor who leads the free peoples against darkness.',
  'https://upload.wikimedia.org/wikipedia/commons/3/30/Viggo_Mortensen%2C_director_y_actor%2C_en_AWFF_2024_%28cropped%29.jpg',
  '[{"label": "Swordsmanship", "value": 94, "max": 100, "textValue": "94%"}, {"label": "Leadership", "value": 92, "max": 100, "textValue": "92%"}]',
  '{"firstAppearance": "The Lord of the Rings Archival Debut", "weapon": "Ranger Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A ranger and rightful king of Gondor who leads the free peoples against darkness.", "universe": "The Lord of the Rings", "species": "Human"}',
  NOW()
),
(
  'Luke Skywalker',
  'luke-skywalker',
  'The Last Jedi',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Jedi',
  'Star Wars',
  'Jedi Order',
  'May the Force be with you.',
  'A young Jedi knight who learns the ways of the Force and defeats the Empire.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/418-luke-skywalker.jpg',
  '[{"label": "Force", "value": 95, "max": 100, "textValue": "95%"}, {"label": "Lightsaber", "value": 92, "max": 100, "textValue": "92%"}]',
  '{"firstAppearance": "Star Wars Archival Debut", "weapon": "Jedi Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A young Jedi knight who learns the ways of the Force and defeats the Empire.", "universe": "Star Wars", "species": "Human"}',
  NOW()
),
(
  'Katniss Everdeen',
  'katniss-everdeen',
  'The Mockingjay',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Rebel',
  'The Hunger Games',
  'District 12',
  'If we burn, you burn with us.',
  'A skilled archer who becomes the symbol of rebellion against an oppressive regime.',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/381-katniss-everdeen.jpg',
  '[{"label": "Archery", "value": 98, "max": 100, "textValue": "98%"}, {"label": "Survival", "value": 95, "max": 100, "textValue": "95%"}]',
  '{"firstAppearance": "The Hunger Games Archival Debut", "weapon": "Rebel Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A skilled archer who becomes the symbol of rebellion against an oppressive regime.", "universe": "The Hunger Games", "species": "Human"}',
  NOW()
),
(
  'Eowyn',
  'eowyn',
  'The Last Rider of Rohan',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Warrior',
  'The Lord of the Rings',
  'Rohan',
  'A day may come when the courage of men fails.',
  'A shield maiden of Rohan who disguises herself as a male warrior to fight in battle.',
  'https://upload.wikimedia.org/wikipedia/commons/f/fe/Miranda_Otto_by_Gage_Skidmore.jpg',
  '[{"label": "Courage", "value": 96, "max": 100, "textValue": "96%"}, {"label": "Swordsmanship", "value": 90, "max": 100, "textValue": "90%"}]',
  '{"firstAppearance": "The Lord of the Rings Archival Debut", "weapon": "Warrior Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A shield maiden of Rohan who disguises herself as a male warrior to fight in battle.", "universe": "The Lord of the Rings", "species": "Human"}',
  NOW()
),
(
  'Gollum',
  'gollum',
  'Sméagol',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Creature',
  'The Lord of the Rings',
  'None',
  'My precious.',
  'A corrupted creature obsessed with the One Ring, torn between good and evil.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Gollum_at_Wellington_Airport.jpg/3840px-Gollum_at_Wellington_Airport.jpg',
  '[{"label": "Stealth", "value": 95, "max": 100, "textValue": "95%"}, {"label": "Corruption", "value": 100, "max": 100, "textValue": "100%"}]',
  '{"firstAppearance": "The Lord of the Rings Archival Debut", "weapon": "Creature Arsenal", "nemesis": "Multiverse Antagonist", "bio": "A corrupted creature obsessed with the One Ring, torn between good and evil.", "universe": "The Lord of the Rings", "species": "Creature"}',
  NOW()
),
(
  'Legolas',
  'legolas',
  'The Elf Archer',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'Archer',
  'The Lord of the Rings',
  'Fellowship',
  'And my bow!',
  'An elf archer from Mirkwood known for his archery skills and grace in battle.',
  'https://upload.wikimedia.org/wikipedia/commons/e/e3/Orlando_Bloom-9047_%28cropped%29.jpg',
  '[{"label": "Archery", "value": 98, "max": 100, "textValue": "98%"}, {"label": "Agility", "value": 96, "max": 100, "textValue": "96%"}]',
  '{"firstAppearance": "The Lord of the Rings Archival Debut", "weapon": "Archer Arsenal", "nemesis": "Multiverse Antagonist", "bio": "An elf archer from Mirkwood known for his archery skills and grace in battle.", "universe": "The Lord of the Rings", "species": "Elf"}',
  NOW()
);

-- -----------------------------------------------------------------------------
-- 5. Merchandise Items (27 Collectibles) (merchandise_merchandiseitem)
-- -----------------------------------------------------------------------------
INSERT INTO merchandise_merchandiseitem (
  name, slug, category_id, image_url, tag,
  is_upcoming, drop_date, drop_date_text, msrp, manufacturer,
  description, view_count, popularity_score, created_at
) VALUES
(
  'EVA-01 Berserk Mode 1/4 Scale Statue',
  'merch-eva',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
  'LIMITED_EDITION',
  1,
  NULL,
  'Oct 15, 2026 • 12:00 PM EST',
  '$340 MSRP (Preview)',
  'Prime 1 Studio x Khara',
  'Cold-cast porcelain polystone statue featuring LED fluorescent blood splatter, swappable roaring head sculpt, and display base.',
  3820,
  4.95,
  NOW()
),
(
  'Shadow of the Erdtree 4xLP Boxset Vinyl',
  'merch-elden',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
  'PRE_ORDER',
  1,
  NULL,
  'Nov 02, 2026 • 09:00 AM PST',
  '$110 MSRP (Preview)',
  'Bandai Namco Music Live',
  'Pressed on 180g gold splatter virgin wax with deluxe gold foil gatefold jacket and 40-page liner notes artbook.',
  2410,
  4.9,
  NOW()
),
(
  'Spider-Gwen Multiverse Neon Bomber Jacket',
  'merch-gwen',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
  'COLLECTIBLE',
  0,
  NULL,
  'Dec 05, 2026 • Batch 2 Restock',
  '$165 MSRP (Preview)',
  'Marvel HeroWear Labs',
  'High-density weatherproof satin bomber with screen-accurate web lining, hidden pocket for con badges, and reactive neon piping.',
  1940,
  4.88,
  NOW()
),
(
  'Aespa SYNK Hyper-Lightstick Ver. 2 Metallic',
  'merch-aespa-lightstick',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
  'PRE_ORDER',
  1,
  NULL,
  'Oct 28, 2026 • Global Weverse Shop',
  '$68 MSRP (Preview)',
  'SM Brand Marketing',
  'Bluetooth stadium DMX synchronized lightstick with interchangeable KWANGYA aurora emblem cores and holographic photocard set.',
  5120,
  5.0,
  NOW()
),
(
  'Arrakis Fremen Crysknife 1:1 Prop Replica',
  'merch-dune-crysknife',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  'LIMITED_EDITION',
  1,
  NULL,
  'Nov 19, 2026 • Numbered Run of 1,500',
  '$220 MSRP (Preview)',
  'United Cutlery x Legendary',
  'Hand-finished crystalline resin blade with carved hawk-crest handle, magnetic floating sandstone wall mount, and certificate of authenticity.',
  2890,
  4.92,
  NOW()
),
(
  'Enchanted Blade Enten Die-Cast Letter Opener & Stand',
  'merch-kagurabachi-enten',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
  'COLLECTIBLE',
  0,
  NULL,
  'Dec 14, 2026 • Jump Festa Exclusive',
  '$55 MSRP (Preview)',
  'Shueisha Jump Shop',
  'Heavyweight zinc-alloy miniature katana with translucent obsidian goldfish acrylic wave stand and engraved tsuba guard.',
  3210,
  4.93,
  NOW()
),
(
  'Chainsaw Man Reze Movie 4DX Light Up Standee',
  'merch-reze-standee',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
  'COLLECTIBLE',
  0,
  NULL,
  'Oct 05, 2026 • Retail Now',
  '$45 MSRP (Preview)',
  'Mappa Store',
  'Double-sided acrylic standee with LED edge lighting and layered photocard set.',
  1560,
  4.72,
  NOW()
),
(
  'Jujutsu Kaisen Unlimited Void Hoodie',
  'merch-jjk-hoodie',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
  'OFFICIAL_LICENSED',
  1,
  NULL,
  'Nov 21, 2026 • 10:00 AM JST',
  '$85 MSRP (Preview)',
  'MAPPAx Shueisha',
  'Heavyweight 400gsm hoodie with infinity-barrier sleeve print and woven hem patch.',
  1290,
  4.61,
  NOW()
),
(
  'Nightreign Tarnished Warrior Figma',
  'merch-nightreign-figma',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
  'PRE_ORDER',
  1,
  NULL,
  'Dec 12, 2026 • 08:00 PM EST',
  '$135 MSRP (Preview)',
  'Bandai Spirits',
  'Posable figma with soft goods cape, golden order chain, and translucent Erdtree effect part.',
  1180,
  4.58,
  NOW()
),
(
  'Cyberpunk 2077 Edgerunner Bomber Jacket',
  'merch-edgerunner-jacket',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
  'OFFICIAL_LICENSED',
  0,
  NULL,
  'Sep 18, 2026 • Retail Now',
  '$180 MSRP (Preview)',
  'CD PROJEKT RED Store',
  'Weatherproof bomber with reflective Night City skyline lining and embroidered edgerunner crest.',
  980,
  4.49,
  NOW()
),
(
  'Dune Messiah Atreides Desert Set',
  'merch-dune-set',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  'LIMITED_EDITION',
  1,
  NULL,
  'Dec 18, 2026 • 12:00 PM EST',
  '$120 MSRP (Preview)',
  'Warner Bros. Collector',
  'Stillu suit replica prop, Atreides crest pin, and desert-issue journal in a numbered display case.',
  1420,
  4.67,
  NOW()
),
(
  'Spider-Verse Miles Momentum Tee',
  'merch-miles-tee',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80',
  'OFFICIAL_LICENSED',
  0,
  NULL,
  'Oct 01, 2026 • Retail Now',
  '$35 MSRP (Preview)',
  'Marvel HeroWear Labs',
  'Soft cotton tee with chromatic glitch print and glow-in-the-dust shoulder graphic.',
  870,
  4.42,
  NOW()
),
(
  'Blade Runner 2049 Jacket Replica',
  'merch-blade-runner-jacket',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  'LIMITED_EDITION',
  1,
  NULL,
  'Jan 09, 2027 • 09:00 AM PST',
  '$420 MSRP (Preview)',
  'Alcon Industries Archive',
  'Weather-worn decommissioned officer coat with frayed collar, badge, and archival certificate.',
  760,
  4.36,
  NOW()
),
(
  'Aespa Supernova Lightstick 2.0',
  'merch-supernova-lightstick',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
  'PRE_ORDER',
  1,
  NULL,
  'Oct 10, 2026 • 06:00 PM KST',
  '$95 MSRP (Preview)',
  'SM Entertainment Official',
  'Bluetooth-synced lightstick with motion reactive halo, photocards, and concert lanyard.',
  1680,
  4.74,
  NOW()
),
(
  'NewJeans HYBE Vault Photocard Set',
  'merch-newjeans-vault',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
  'COLLECTIBLE',
  0,
  NULL,
  'Sep 22, 2026 • Retail Now',
  '$28 MSRP (Preview)',
  'ADOR Global Store',
  'Sealed first-gen photocard vault with holographic inserts and numbered collector sleeve.',
  1040,
  4.45,
  NOW()
),
(
  'Stray Kids SKZOOZ 2xLP Vinyl',
  'merch-skz-vinyl',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
  'LIMITED_EDITION',
  1,
  NULL,
  'Nov 14, 2026 • 07:00 PM KST',
  '$58 MSRP (Preview)',
  'JYP Entertainment',
  'Neon press 2xLP with poster insert, tracklist lithograph, and numbered jacket variant.',
  890,
  4.4,
  NOW()
),
(
  'X-Men From the Ashes #1 Variant Cover',
  'merch-x-men-ashes-variant',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=600&q=80',
  'COLLECTIBLE',
  1,
  NULL,
  'Oct 08, 2026 • 10:00 AM ET',
  '$6 MSRP (Preview)',
  'Marvel Comics Direct',
  'JSA 1:25 foil variant in a bagged and boarded protective sleeve for grading.',
  1130,
  4.52,
  NOW()
),
(
  'Spawn Compendium Reprint Slipcase',
  'merch-spawn-compendium',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=600&q=80',
  'LIMITED_EDITION',
  0,
  NULL,
  'Sep 30, 2026 • Retail Now',
  '$180 MSRP (Preview)',
  'Image Comics',
  'Die-cut slipcase reprint with metallic chain wrap, cape bookmark, and foil spine.',
  720,
  4.31,
  NOW()
),
(
  'DC Absolute Universe Poster Set',
  'merch-absolute-posters',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  'COLLECTIBLE',
  1,
  NULL,
  'Dec 01, 2026 • 12:00 PM ET',
  '$30 MSRP (Preview)',
  'DC Direct',
  'Three 18x24 inch archival matte posters with UV-coated color and collector tube.',
  640,
  4.28,
  NOW()
),
(
  'Berserk Golden Age Vinyl Boxset',
  'merch-berserk-vinyl',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
  'LIMITED_EDITION',
  1,
  NULL,
  'Nov 28, 2026 • 12:00 PM JST',
  '$320 MSRP (Preview)',
  'Kentaro Miura Archive',
  'Deluxe cloth-bound slipcase with facsimile art pages, 5LP soundtrack, and Beherit print.',
  1510,
  4.69,
  NOW()
),
(
  'One Piece Wano Map T-Shirt',
  'merch-wano-map-tee',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
  'OFFICIAL_LICENSED',
  0,
  NULL,
  'Sep 12, 2026 • Retail Now',
  '$32 MSRP (Preview)',
  'Toei Animation Store',
  'Garment-dyed tee with double-sided Wano map, straw hat rope print, and stitched hem.',
  830,
  4.38,
  NOW()
),
(
  'Vagabond Masterpiece Print Folio',
  'merch-vagabond-folio',
  (SELECT id FROM fandoms_category WHERE slug = 'manga'),
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
  'COLLECTIBLE',
  1,
  NULL,
  'Dec 20, 2026 • 09:00 AM JST',
  '$95 MSRP (Preview)',
  'Kodansha USA',
  'Giclée reproduction folios of 12 ink-wash spreads in a museum-grade portfolio.',
  590,
  4.24,
  NOW()
),
(
  'EVA-01 High-Density EVA Armor Pattern',
  'merch-eva-pattern',
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
  'COLLECTIBLE',
  1,
  NULL,
  'Oct 30, 2026 • 12:00 PM EST',
  '$24 MSRP (Preview)',
  'Foam Armory',
  'Printable foam armor templates, heat-form guides, and LED harness schematics.',
  1210,
  4.55,
  NOW()
),
(
  'Sephiroth Masamune Prop Blade Kit',
  'merch-masamune-kit',
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
  'PRE_ORDER',
  1,
  NULL,
  'Nov 07, 2026 • 10:00 AM JST',
  '$149 MSRP (Preview)',
  'Nibelung Forge',
  'Carbon-fiber blade replica kit with LED mako core, leather wrap, and safe display stand.',
  940,
  4.48,
  NOW()
),
(
  'Multiverse Paradox Zine + Poster',
  'merch-multiverse-zine',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
  'COLLECTIBLE',
  1,
  NULL,
  'Oct 18, 2026 • 03:00 PM ET',
  '$18 MSRP (Preview)',
  'Fan Hub Vault Press',
  'Risograph zine and foil poster exploring canon continuity, curated by the moderators.',
  780,
  4.33,
  NOW()
),
(
  'Verified Contributor Field Journal',
  'merch-field-journal',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'OFFICIAL_LICENSED',
  0,
  NULL,
  'Sep 09, 2026 • Retail Now',
  '$22 MSRP (Preview)',
  'Fan Hub Vault Press',
  'Linen-bound dot-grid journal with citation dividers and verified contributor stamp.',
  660,
  4.27,
  NOW()
),
(
  'Lore Historian Desk Mat XL',
  'merch-lore-deskmat',
  (SELECT id FROM fandoms_category WHERE slug = 'community-vault'),
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
  'COLLECTIBLE',
  1,
  NULL,
  'Dec 05, 2026 • 12:00 PM ET',
  '$40 MSRP (Preview)',
  'Fan Hub Vault Press',
  'Oversized stitched-edge desk mat with multiverse timeline map and UV ink accents.',
  520,
  4.2,
  NOW()
);

-- -----------------------------------------------------------------------------
-- 6. Events & Conventions (6 Global Events) (events_event)
-- -----------------------------------------------------------------------------
INSERT INTO events_event (
  title, slug, category_id, event_type, city,
  venue_name, start_date, end_date, date_month, date_day,
  year, latitude, longitude, map_x, map_y,
  ticket_url, attendees_info, status, description, created_at
) VALUES
(
  'Comiket 106 Summer Fan Showcase',
  'event-tokyo',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'Convention',
  'Tokyo',
  'Tokyo Big Sight, Odaiba',
  '2026-10-14',
  '2026-10-16',
  'OCT',
  '14-16',
  '2026',
  35.63,
  139.793,
  78.0,
  35.0,
  'https://www.comiket.co.jp/index_e.html',
  '160,000+ Expected',
  'Official Schedule Vetted',
  'The premier global dōjinshi and anime exhibition bringing together indie artists, official studios, and massive cosplay gatherings.',
  NOW()
),
(
  'Anime Expo & Gaming Summit 2026',
  'event-la-anime',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'Convention',
  'Los Angeles',
  'Los Angeles Convention Center, CA',
  '2026-11-02',
  '2026-11-05',
  'NOV',
  '02-05',
  '2026',
  34.0407,
  -118.2699,
  20.0,
  38.0,
  'https://www.anime-expo.org',
  '115,000+ Expected',
  'Badge Registration Active',
  'North America’s largest celebration of Japanese pop culture, featuring premier world trailer reveals, voice actor panels, and gaming tournaments.',
  NOW()
),
(
  'MCM Comic Con & World Cosplay Stage',
  'event-london',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'Cosplay Meetup',
  'London',
  'ExCeL London, Royal Victoria Dock',
  '2026-10-24',
  '2026-10-26',
  'OCT',
  '24-26',
  '2026',
  51.5074,
  0.0278,
  48.0,
  26.0,
  'https://www.mcmcomiccon.com',
  '85,000+ Expected',
  'Cosplay Championship Finals',
  'The UK’s biggest pop culture con with international guest stars, gaming zones, comics artists alley, and the European Cosplay Championship.',
  NOW()
),
(
  'Naija Pop-Con & Afro-Anime Fiesta',
  'event-lagos',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'Cosplay Meetup',
  'Lagos',
  'Landmark Centre, Victoria Island, Lagos',
  '2026-11-18',
  '2026-11-20',
  'NOV',
  '18-20',
  '2026',
  6.4281,
  3.4219,
  49.0,
  55.0,
  'https://comiccon.africa',
  '25,000+ Expected',
  'Community Stage Open',
  'West Africa’s fastest-growing fandom festival with Afrobeats/K-Pop dance-offs, indigenous comic launches, and anime LAN arenas.',
  NOW()
),
(
  'K-Wave Mega Fest & Lightspeed Arena',
  'event-la-kpop',
  (SELECT id FROM fandoms_category WHERE slug = 'kpop'),
  'Screening',
  'Los Angeles',
  'Crypto.com Arena, Los Angeles',
  '2026-12-10',
  '2026-12-12',
  'DEC',
  '10-12',
  '2026',
  34.043,
  -118.2673,
  22.0,
  40.0,
  'https://www.cryptoarena.com',
  '40,000+ Expected',
  'Lineup Dropping Soon',
  '3 days of 4th & 5th gen K-Pop idol stages, IMAX concert film screenings, lightstick sync demonstrations, and official photocard trading vaults.',
  NOW()
),
(
  'Shinjuku IMAX Midnight Anime Premiere',
  'event-tokyo-screening',
  (SELECT id FROM fandoms_category WHERE slug = 'movies-tv'),
  'Screening',
  'Tokyo',
  'TOHO Cinemas Shinjuku, Tokyo',
  '2026-12-19',
  '2026-12-19',
  'DEC',
  '19',
  '2026',
  35.6938,
  139.7034,
  80.0,
  33.0,
  'https://hlo.tohotheater.jp',
  '4,500+ Expected',
  'VIP Lottery Open',
  'Exclusive 4K laser IMAX marathon screening of Infinity Castle & Edgerunners Remaster with live director Q&A and acoustic OST performance.',
  NOW()
);

-- -----------------------------------------------------------------------------
-- 7. Chatbot FAQs (3 Curated Q&A Entries) (chatbot_chatbotfaq)
-- -----------------------------------------------------------------------------
INSERT INTO chatbot_chatbotfaq (
  question, answer, category_id, universe_name, badge,
  tags, is_active, created_at
) VALUES
(
  'Recommend me an anime like Attack on Titan',
  'If you love the high-stakes political intrigue, brutal survival themes, and philosophical mystery of Attack on Titan, check out these top 3 recommendations:

1. **86 (Eighty-Six)**: Heavy tactical drone warfare with devastating emotional stakes and military bureaucracy.
2. **Vinland Saga**: Gritty medieval realism tracing revenge, destiny, and the hollow nature of violence.
3. **Claymore**: Dark fantasy warriors wielding titanic blades against shape-shifting bio-horrors.

All three are currently cataloged in the Anime Universe directory with spoiler-free episode guides!',
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'Anime',
  'Anime Lore • Curated',
  '["anime", "attack on titan", "titan", "recommendation", "shingeki", "86", "vinland"]',
  1,
  NOW()
),
(
  'Where do I start reading X-Men comics?',
  'The X-Men multiverse can be daunting, but here are the three cleanest modern jumping-on points:

1. **House of X / Powers of X (2019 by Jonathan Hickman)**: The absolute definitive modern reinvention. Establishes the mutant sovereign nation of Krakoa.
2. **X-Men: From the Ashes (2024–2026 Relinquish Run)**: The current ongoing era dealing with the aftermath of Krakoa.
3. **Astonishing X-Men (Joss Whedon & John Cassaday)**: Self-contained, accessible 24-issue run with classic team dynamics.

Check our Comics Universe Reading Matrix for issue-by-issue checklists!',
  (SELECT id FROM fandoms_category WHERE slug = 'comics'),
  'Comics',
  'Comics Timeline • Verified',
  '["comics", "x-men", "xmen", "reading order", "marvel", "krakoa", "hickman"]',
  1,
  NOW()
),
(
  'Upcoming gaming conventions in Q4',
  'Here is your curated Q4 Gaming & Pop-Culture schedule:

• **MCM Comic Con London**: Oct 24-26 (ExCeL London) — features the European Esports Arena and Indie Game Showcase.
• **Naija Pop-Con Lagos**: Nov 18-20 (Landmark Centre) — Afrogaming LAN and Fighting Game Community tournaments.
• **Tokyo Game Fest Winter Preview**: Dec 04-06 (Makuhari Messe) — next-gen handheld and VR hardware hands-on.

You can click ''Add to Calendar'' on any event in the Convention Radar section to generate an instant .ics invite!',
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'Gaming',
  'Event Radar • Q4 2026',
  '["conventions", "gaming", "q4", "schedule", "events", "mcm", "naija", "radar"]',
  1,
  NOW()
);

-- -----------------------------------------------------------------------------
-- 8. Interactions & Audit Seed Data (Bookmarks, Ratings, Submissions, Feedback, Activity, Chatbot Queries)
-- -----------------------------------------------------------------------------
INSERT INTO interactions_bookmark (
  user_id, content_id, external_id, item_title, item_type,
  category_name, thumbnail_url, note, created_at, updated_at
) VALUES
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  (SELECT id FROM fandoms_content WHERE slug = 'cyberpunk-edgerunners'),
  'cyberpunk-edgerunners',
  'Cyberpunk: Edgerunners - Official Teaser',
  'VIDEO',
  'Anime',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  'Rewatch frame-by-frame for Sandevistan color grading breakdown at 01:42.',
  NOW(), NOW()
),
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  (SELECT id FROM fandoms_content WHERE slug = 'multiverse-paradox-essay'),
  'multiverse-paradox-essay',
  'The Multiverse Paradox: Canon Continuity Deconstruction',
  'ARTICLE',
  'Community Vault',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
  'Reference Section 3 for my upcoming Secret Wars timeline diagram.',
  NOW(), NOW()
),
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  NULL,
  'ryuto-kazama',
  'Ryuto Kazama',
  'CHARACTER',
  'Anime',
  'https://s4.anilist.co/file/anilistcdn/character/large/b129928-BCEjVaP0AQSw.png',
  'Cosplay build reference: need 5mm high-density EVA foam for the dual thunder spears.',
  NOW(), NOW()
),
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  NULL,
  'merch-eva',
  'EVA-01 Berserk Mode 1/4 Scale Statue',
  'MERCHANDISE',
  'Anime',
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
  'Pre-order opens Oct 15 at 12:00 PM EST — set alarm 30 mins early!',
  NOW(), NOW()
);

INSERT INTO interactions_contentrating (
  user_id, content_id, score, created_at, updated_at
) VALUES
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  (SELECT id FROM fandoms_content WHERE slug = 'cyberpunk-edgerunners'),
  5, NOW(), NOW()
);

INSERT INTO interactions_fansubmission (
  user_id, category_id, title, body, status, admin_feedback, created_at, updated_at
) VALUES
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  (SELECT id FROM fandoms_category WHERE slug = 'anime'),
  'Neon Genesis Evangelion: The Instrumentality Timeline Paradox',
  'An exhaustive comparison between the original End of Evangelion theatrical release and the Rebuild 3.0+1.0 Thrice Upon a Time meta-narrative loop.',
  'PENDING',
  '',
  NOW(), NOW()
),
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  (SELECT id FROM fandoms_category WHERE slug = 'gaming'),
  'Elden Ring: Shadow of the Erdtree Miquella Motive Analysis',
  'Tracing Miquella the Kind’s footsteps across the Land of Shadow, examining item descriptions from the Haligtree to Enir-Ilim.',
  'PENDING',
  '',
  NOW(), NOW()
),
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  (SELECT id FROM fandoms_category WHERE slug = 'cosplay'),
  'Spider-Man 2099 Monowire Prop 3D Build Log',
  'Step-by-step guide to printing translucent red PETG arm talons with embedded addressable COB LED strips.',
  'APPROVED',
  'Excellent crafting detail and clear wiring schematic. Published to Vault!',
  NOW(), NOW()
);

INSERT INTO interactions_feedback (
  user_id, email, name, feedback_type, subject, message, status, created_at
) VALUES
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  'fan@fanhub.com',
  'cyber_otaku',
  'BUG',
  '4K Trailer Player Fullscreen Shortcut on Safari',
  'Pressing F while focused on the volume slider does not trigger fullscreen mode on macOS Safari 18.',
  'IN_REVIEW',
  NOW()
),
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  'cosplay.queen@fanhub.com',
  'LyraBuilder',
  'SUGGESTION',
  'Add STL 3D Print File Attachment Support to Cosplay Guides',
  'Would love to attach downloadable .stl pattern links directly inside verified cosplay build articles!',
  'NEW',
  NOW()
),
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  'seoul.beats@fanhub.com',
  'KWave_Stan',
  'INQUIRY',
  'K-Wave Mega Fest Los Angeles Badge Pickup Hours',
  'Are VIP lightstick sync wristbands distributed at the Crypto.com Arena box office on Day 0?',
  'RESOLVED',
  NOW()
);

INSERT INTO interactions_useractivity (
  user_id, action_type, target_type, target_id, target_title, category_name, detail, created_at
) VALUES
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  'VIEW', 'CHARACTER', 'ryuto-kazama', 'Ryuto Kazama (Titan Slayer)',
  'Anime', 'Inspected Character Lore Dossier & Battle Telemetry', NOW()
),
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  'BOOKMARK', 'MERCHANDISE', 'merch-eva', 'EVA-01 Berserk Mode 1/4 Scale Statue',
  'Anime', 'Saved to Vault with personal pre-order reminder note', NOW()
),
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  'RATING', 'VIDEO', 'cyberpunk-edgerunners', 'Cyberpunk: Edgerunners - Official Teaser',
  'Anime', 'Rated 5/5 stars in Audiovisual Vault', NOW()
),
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  'FILTER', 'CATEGORY', 'gaming', 'Gaming Universe Directory',
  'Gaming', 'Explored Elden Ring: Nightreign & Patch 14.2 lore threads', NOW()
);

INSERT INTO chatbot_chatbotquery (
  user_id, session_id, message, response, matched_faq_id, latency_ms, created_at
) VALUES
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  'seed-sess-01',
  'Recommend me an anime like Attack on Titan',
  'If you love the high-stakes political intrigue, brutal survival themes, and philosophical mystery of Attack on Titan, check out these top 3 recommendations:

1. **86 (Eighty-Six)**: Heavy tactical drone warfare with devastating emotional stakes and military bureaucracy.
2. **Vinland Saga**: Gritty medieval realism tracing revenge, destiny, and the hollow nature of violence.
3. **Claymore**: Dark fantasy warriors wielding titanic blades against shape-shifting bio-horrors.

All three are currently cataloged in the Anime Universe directory with spoiler-free episode guides!',
  (SELECT id FROM chatbot_chatbotfaq WHERE question = 'Recommend me an anime like Attack on Titan' LIMIT 1),
  11.4, NOW()
),
(
  (SELECT id FROM accounts_user WHERE email = 'fan@fanhub.com'),
  'seed-sess-02',
  'What is the chronological order for Rebuild of Evangelion?',
  'Start with Evangelion: 1.0 You Are (Not) Alone, followed by 2.0, 3.0, and 3.0+1.0 Thrice Upon a Time.',
  NULL,
  28.7, NOW()
);

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
SET SQL_SAFE_UPDATES = 1;

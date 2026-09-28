// Data repository for Fan Hub Plus — Synchronized with Django Backend Models (fandoms, merchandise, events, chatbot)

export const UNIVERSES = [
  {
    "id": "anime",
    "name": "Anime",
    "slug": "anime",
    "icon": "Tv",
    "accent_color": "#A3E635",
    "accentColor": "#A3E635",
    "badge_text_color": "text-black",
    "badgeTextColor": "text-black",
    "description": "Seasonal simulcasts, character bios, and opening theme breakdowns.",
    "entry_count": "240+ Entries",
    "entryCount": "240+ Entries",
    "tags": [
      "Simulcasts",
      "Theme Songs",
      "Character Lore",
      "Spring 2026"
    ],
    "top_pick": "Solo Leveling: Arise",
    "topPick": "Solo Leveling: Arise",
    "featured_quote": "“Dedicate your hearts to the truth across timelines.”",
    "featuredQuote": "“Dedicate your hearts to the truth across timelines.”",
    "popularTopics": [
      "Jujutsu Kaisen Shinjuku Showdown",
      "Demon Slayer Trilogy",
      "Chainsaw Man Reze Movie"
    ]
  },
  {
    "id": "gaming",
    "name": "Gaming",
    "slug": "gaming",
    "icon": "Gamepad2",
    "accent_color": "#FACC15",
    "accentColor": "#FACC15",
    "badge_text_color": "text-black",
    "badgeTextColor": "text-black",
    "description": "Patch metas, lore archives, speedrun highlights, and cinematics.",
    "entry_count": "180+ Entries",
    "entryCount": "180+ Entries",
    "tags": [
      "Patch 14.2",
      "Speedruns",
      "Esports",
      "Lore Bible"
    ],
    "top_pick": "Elden Ring: Nightreign",
    "topPick": "Elden Ring: Nightreign",
    "featured_quote": "“Wake up, Samurai. We have a universe to burn.”",
    "featuredQuote": "“Wake up, Samurai. We have a universe to burn.”",
    "popularTopics": [
      "GTA VI Vice City Lore",
      "Cyberpunk Orion Previews",
      "Silksong Tracker"
    ]
  },
  {
    "id": "movies-tv",
    "name": "Movies & TV",
    "slug": "movies-tv",
    "icon": "Film",
    "accent_color": "#38BDF8",
    "accentColor": "#38BDF8",
    "badge_text_color": "text-black",
    "badgeTextColor": "text-black",
    "description": "Cinematic universe timelines, trailers, and cast interviews.",
    "entry_count": "310+ Entries",
    "entryCount": "310+ Entries",
    "tags": [
      "Canon Timelines",
      "4K Teasers",
      "Casting Leaks",
      "Director Cuts"
    ],
    "top_pick": "Avengers: Secret Wars Timeline",
    "topPick": "Avengers: Secret Wars Timeline",
    "featured_quote": "“The multiverse is a concept about which we know frighteningly little.”",
    "featuredQuote": "“The multiverse is a concept about which we know frighteningly little.”",
    "popularTopics": [
      "Dune Messiah Production",
      "The Batman Part II Canon",
      "Stranger Things Finale"
    ]
  },
  {
    "id": "kpop",
    "name": "K-Pop",
    "slug": "kpop",
    "icon": "Mic2",
    "accent_color": "#F43F5E",
    "accentColor": "#F43F5E",
    "badge_text_color": "text-white",
    "badgeTextColor": "text-white",
    "description": "Comeback calendars, MV streams, discographies, and lightstick guides.",
    "entry_count": "125+ Entries",
    "entryCount": "125+ Entries",
    "tags": [
      "Comeback Radar",
      "Discography",
      "Lightstick Sync",
      "Fanchants"
    ],
    "top_pick": "NewJeans Global Tour",
    "topPick": "NewJeans Global Tour",
    "featured_quote": "“Music has no borders; the harmony transcends language.”",
    "featuredQuote": "“Music has no borders; the harmony transcends language.”",
    "popularTopics": [
      "Aespa Armageddon Lore",
      "Stray Kids Stadium Tour",
      "LE SSERAFIM Coachella Cut"
    ]
  },
  {
    "id": "comics",
    "name": "Comics",
    "slug": "comics",
    "icon": "Zap",
    "accent_color": "#FB7185",
    "accentColor": "#FB7185",
    "badge_text_color": "text-black",
    "badgeTextColor": "text-black",
    "description": "Multiverse reading orders, variant covers, and issue releases.",
    "entry_count": "95+ Entries",
    "entryCount": "95+ Entries",
    "tags": [
      "Issue Runs",
      "Earth Timelines",
      "Variant Art",
      "Key Issues"
    ],
    "top_pick": "Ultimate Spider-Man 2026",
    "topPick": "Ultimate Spider-Man 2026",
    "featured_quote": "“With great power comes the responsibility to preserve the timeline.”",
    "featuredQuote": "“With great power comes the responsibility to preserve the timeline.”",
    "popularTopics": [
      "X-Men From the Ashes",
      "DC Absolute Universe",
      "Spawn Multiverse Run"
    ]
  },
  {
    "id": "manga",
    "name": "Manga",
    "slug": "manga",
    "icon": "BookOpen",
    "accent_color": "#FB923C",
    "accentColor": "#FB923C",
    "badge_text_color": "text-black",
    "badgeTextColor": "text-black",
    "description": "Chapter trackers, author spotlights, and genre indexes.",
    "entry_count": "150+ Entries",
    "entryCount": "150+ Entries",
    "tags": [
      "Chapter Drops",
      "Mangaka Spotlight",
      "Raw Scans",
      "Seinen Top"
    ],
    "top_pick": "Berserk Legacy Continuation",
    "topPick": "Berserk Legacy Continuation",
    "featured_quote": "“Even if all the stars fade, the ink never truly dies.”",
    "featuredQuote": "“Even if all the stars fade, the ink never truly dies.”",
    "popularTopics": [
      "One Piece Void Century Clues",
      "Vagabond Remaster",
      "Choujin X Volume 12"
    ]
  },
  {
    "id": "cosplay",
    "name": "Cosplay",
    "slug": "cosplay",
    "icon": "Sparkles",
    "accent_color": "#C084FC",
    "accentColor": "#C084FC",
    "badge_text_color": "text-black",
    "badgeTextColor": "text-black",
    "description": "Build logs, prop crafting guides, and convention galleries.",
    "entry_count": "85+ Entries",
    "entryCount": "85+ Entries",
    "tags": [
      "Foam Crafting",
      "3D Printing",
      "Con Galleries",
      "LED Wiring"
    ],
    "top_pick": "WCS 2026 Champion Armor",
    "topPick": "WCS 2026 Champion Armor",
    "featured_quote": "“Bring the fictional dream into tactile, wearable reality.”",
    "featuredQuote": "“Bring the fictional dream into tactile, wearable reality.”",
    "popularTopics": [
      "EVA-01 High-Density EVA Foam",
      "Cyberpunk LED Monowire",
      "Sephiroth Masamune Rig"
    ]
  },
  {
    "id": "community-vault",
    "name": "Community Vault",
    "slug": "community-vault",
    "icon": "ShieldCheck",
    "accent_color": "#34D399",
    "accentColor": "#34D399",
    "badge_text_color": "text-black",
    "badgeTextColor": "text-black",
    "description": "Fan-submitted essays, reviews, and art showcases (Admin-approved).",
    "entry_count": "60+ Entries",
    "entryCount": "60+ Entries",
    "tags": [
      "Fan Essays",
      "Lore Theories",
      "Verified Art",
      "Moderator Picks"
    ],
    "top_pick": "The Multiverse Paradox Thesis",
    "topPick": "The Multiverse Paradox Thesis",
    "featured_quote": "“Admin-vetted fan canon, free of spam and toxic clutter.”",
    "featuredQuote": "“Admin-vetted fan canon, free of spam and toxic clutter.”",
    "popularTopics": [
      "Elden Ring Great Rune Topology",
      "Spider-Verse Animation Deconstruction",
      "Neon Genesis Philosophy"
    ]
  }
]

export const MULTIMEDIA_DATA = {
  "trailers": [
    {
      "id": "cyberpunk-edgerunners",
      "slug": "cyberpunk-edgerunners",
      "title": "Cyberpunk: Edgerunners - Official Teaser",
      "category_slug": "anime",
      "stream_type": "TRAILER",
      "content_type": "VIDEO",
      "universe_label": "Anime / Gaming",
      "universe": "Anime / Gaming",
      "accent_color": "#A3E635",
      "universeColor": "#A3E635",
      "artist": "Studio Trigger & CDPR",
      "artist_or_author": "Studio Trigger & CDPR",
      "album": "",
      "duration": "02:45",
      "duration_seconds": 165,
      "durationSec": 165,
      "release_year": "2026 Remaster",
      "releaseYear": "2026 Remaster",
      "rating": 4.9,
      "ratings_count": 1842,
      "ratingsCount": 1842,
      "views_label": "4.2M views",
      "views": "4.2M views",
      "view_count": 4200000,
      "likes_label": "10.0k",
      "likes_count": 10000,
      "popularity_score": 4.9,
      "display_order": 1,
      "is_active": true,
      "is_published": true,
      "synopsis": "A street kid trying to survive in Night City — a tech and body modification-obsessed city of the future. Studio Trigger x CD PROJEKT RED high-octane spectacle.",
      "body_text": "Night City changes everyone who enters its chrome-plated borders. Explore David Martinez and Lucy's journey through the violent cyberware underworld.",
      "thumbnail_url": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
      "videoThumbnail": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
      "media_url": "https://youtu.be/x4ztgjvfU60?si=qQfMO9HWMUkkHiYD",
      "videoUrl": "https://youtu.be/x4ztgjvfU60?si=qQfMO9HWMUkkHiYD",
      "embedUrl": "https://www.youtube.com/embed/x4ztgjvfU60",
      "youtubeVideoId": "x4ztgjvfU60"
    },
    {
      "id": "infinity-castle",
      "slug": "infinity-castle",
      "title": "Demon Slayer: Infinity Castle - Cinematic Teaser",
      "category_slug": "anime",
      "stream_type": "TRAILER",
      "content_type": "VIDEO",
      "universe_label": "Anime",
      "universe": "Anime",
      "accent_color": "#FB7185",
      "universeColor": "#FB7185",
      "artist": "ufotable",
      "artist_or_author": "ufotable",
      "album": "",
      "duration": "03:12",
      "duration_seconds": 192,
      "durationSec": 192,
      "release_year": "2026 Theatrical Run",
      "releaseYear": "2026 Theatrical Run",
      "rating": 5.0,
      "ratings_count": 3120,
      "ratingsCount": 3120,
      "views_label": "7.8M views",
      "views": "7.8M views",
      "view_count": 7800000,
      "likes_label": "24.5k",
      "likes_count": 24500,
      "popularity_score": 5.0,
      "display_order": 2,
      "is_active": true,
      "is_published": true,
      "synopsis": "The final confrontation draws near as the Demon Slayer Corps breaches the endless shifting corridors of the Infinity Castle.",
      "body_text": "Muzan Kibutsuji awaits within the extra-dimensional fortress. Tanjiro and the Hashira prepare for the ultimate fight.",
      "thumbnail_url": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
      "videoThumbnail": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
      "media_url": "https://youtu.be/x7uLutVRBfI?si=IOwYzPC81-fkXm6h",
      "videoUrl": "https://youtu.be/x7uLutVRBfI?si=IOwYzPC81-fkXm6h",
      "embedUrl": "https://www.youtube.com/embed/x7uLutVRBfI",
      "youtubeVideoId": "x7uLutVRBfI"
    },
    {
      "id": "spider-multiverse",
      "slug": "spider-multiverse",
      "title": "Spider-Man: Beyond The Spider-Verse Sneak Peek",
      "category_slug": "movies-tv",
      "stream_type": "TRAILER",
      "content_type": "VIDEO",
      "universe_label": "Movies & TV",
      "universe": "Movies & TV",
      "accent_color": "#38BDF8",
      "universeColor": "#38BDF8",
      "artist": "Sony Pictures Animation",
      "artist_or_author": "Sony Pictures Animation",
      "album": "",
      "duration": "02:18",
      "duration_seconds": 138,
      "durationSec": 138,
      "release_year": "2026 Columbia / Marvel",
      "releaseYear": "2026 Columbia / Marvel",
      "rating": 4.8,
      "ratings_count": 2490,
      "ratingsCount": 2490,
      "views_label": "5.1M views",
      "views": "5.1M views",
      "view_count": 5100000,
      "likes_label": "19.2k",
      "likes_count": 19200,
      "popularity_score": 4.8,
      "display_order": 3,
      "is_active": true,
      "is_published": true,
      "synopsis": "Miles Morales traverses the chromatic spectrum of anomalous dimensions to rewrite the canonical destiny of all Spider-heroes.",
      "body_text": "Trapped on Earth-42, Miles must confront an alternate reality where Peter Parker never existed, while Gwen Stacy leads a rogue Spider-band.",
      "thumbnail_url": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80",
      "videoThumbnail": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80",
      "media_url": "https://youtu.be/qclHAbmDOJI?si=m0xKcgqUcJQq9xG1",
      "videoUrl": "https://youtu.be/qclHAbmDOJI?si=m0xKcgqUcJQq9xG1",
      "embedUrl": "https://www.youtube.com/embed/qclHAbmDOJI",
      "youtubeVideoId": "qclHAbmDOJI"
    }
  ],
  "audioTracks": [
    {
      "id": "kpop-supernova",
      "slug": "kpop-supernova",
      "title": "Supernova (Armageddon)",
      "artist": "Aespa",
      "artist_or_author": "Aespa",
      "category_slug": "kpop",
      "stream_type": "AUDIO",
      "content_type": "AUDIO",
      "universe_label": "K-Pop • Armageddon",
      "category": "K-Pop • Armageddon",
      "accent_color": "#F43F5E",
      "categoryColor": "#F43F5E",
      "duration": "02:59",
      "duration_seconds": 179,
      "durationSec": 179,
      "release_year": "Armageddon Special",
      "album": "Armageddon The 1st Album",
      "synopsis": "Hyperpop basslines collide with celestial harmonies in this official Armageddon title track.",
      "body_text": "Armageddon The 1st Album title cut remastered for high-fidelity spatial audio systems.",
      "thumbnail_url": "https://i.ytimg.com/vi/LCIs3JXb5Aw/hqdefault.jpg",
      "cover": "https://i.ytimg.com/vi/LCIs3JXb5Aw/hqdefault.jpg",
      "media_url": "https://music.youtube.com/watch?v=LCIs3JXb5Aw&si=VHjPjewrlV0a-iX3",
      "videoUrl": "https://music.youtube.com/watch?v=LCIs3JXb5Aw&si=VHjPjewrlV0a-iX3",
      "embedUrl": "https://www.youtube.com/embed/LCIs3JXb5Aw",
      "youtubeVideoId": "LCIs3JXb5Aw",
      "views_label": "1.0M views",
      "view_count": 148000,
      "likes_label": "14.8K",
      "likes": "14.8K",
      "likes_count": 14800,
      "rating": 4.9,
      "ratings_count": 980,
      "popularity_score": 4.9,
      "display_order": 1,
      "is_active": true,
      "is_published": true
    },
    {
      "id": "money-constant",
      "slug": "money-constant",
      "title": "MONEY CONSTANT",
      "artist": "DJ Maphorisa, DJ Tunez, Wizkid & Mavo",
      "artist_or_author": "DJ Maphorisa, DJ Tunez, Wizkid & Mavo",
      "category_slug": "kpop",
      "stream_type": "AUDIO",
      "content_type": "AUDIO",
      "universe_label": "SOUTH GIDI • 2025",
      "category": "SOUTH GIDI • 2025",
      "accent_color": "#FACC15",
      "categoryColor": "#FACC15",
      "duration": "03:48",
      "duration_seconds": 228,
      "durationSec": 228,
      "release_year": "2025",
      "album": "SOUTH GIDI • 2025",
      "synopsis": "High-energy Amapiano and Afrobeats collaboration from SOUTH GIDI • 2025.",
      "body_text": "DJ Maphorisa, DJ Tunez, Wizkid, and Mavo unite on SOUTH GIDI • 2025.",
      "thumbnail_url": "https://i.ytimg.com/vi/dw8HOrauCdI/hqdefault.jpg",
      "cover": "https://i.ytimg.com/vi/dw8HOrauCdI/hqdefault.jpg",
      "media_url": "https://music.youtube.com/watch?v=dw8HOrauCdI&si=NipHbZbrNTxc-WH_",
      "videoUrl": "https://music.youtube.com/watch?v=dw8HOrauCdI&si=NipHbZbrNTxc-WH_",
      "embedUrl": "https://www.youtube.com/embed/dw8HOrauCdI",
      "youtubeVideoId": "dw8HOrauCdI",
      "views_label": "2.2M views",
      "view_count": 223000,
      "likes_label": "84.5K",
      "likes": "84.5K",
      "likes_count": 84500,
      "rating": 4.95,
      "ratings_count": 1450,
      "popularity_score": 4.95,
      "display_order": 2,
      "is_active": true,
      "is_published": true
    },
    {
      "id": "calm-down",
      "slug": "calm-down",
      "title": "Calm Down",
      "artist": "Rema",
      "artist_or_author": "Rema",
      "category_slug": "kpop",
      "stream_type": "AUDIO",
      "content_type": "AUDIO",
      "universe_label": "Afrobeats • 705M Views",
      "category": "Afrobeats • 705M Views",
      "accent_color": "#A3E635",
      "categoryColor": "#A3E635",
      "duration": "03:59",
      "duration_seconds": 239,
      "durationSec": 239,
      "release_year": "705M views",
      "album": "705M views • 5.2M likes",
      "synopsis": "Global Afrobeats phenomenon by Rema with over 705M views and 5.2M likes.",
      "body_text": "Rema delivers a timeless melodic anthem dominating global streaming charts.",
      "thumbnail_url": "https://i.ytimg.com/vi/CQLsdm1ZYAw/hqdefault.jpg",
      "cover": "https://i.ytimg.com/vi/CQLsdm1ZYAw/hqdefault.jpg",
      "media_url": "https://music.youtube.com/watch?v=CQLsdm1ZYAw&si=MFyp9PgpIsLRBOgb",
      "videoUrl": "https://music.youtube.com/watch?v=CQLsdm1ZYAw&si=MFyp9PgpIsLRBOgb",
      "embedUrl": "https://www.youtube.com/embed/CQLsdm1ZYAw",
      "youtubeVideoId": "CQLsdm1ZYAw",
      "views_label": "705M views",
      "view_count": 705000000,
      "likes_label": "5.2M",
      "likes": "5.2M",
      "likes_count": 5200000,
      "rating": 5.0,
      "ratings_count": 5200,
      "popularity_score": 5.0,
      "display_order": 3,
      "is_active": true,
      "is_published": true
    }
  ]
}

export const CHARACTERS_DATA = [
  {
    "id": "ryuto-kazama",
    "slug": "ryuto-kazama",
    "name": "Ryuto Kazama",
    "alias": "Titan Slayer",
    "category_slug": "anime",
    "universe": "Anime",
    "universeSlug": "anime",
    "accentColor": "#A3E635",
    "archetype": "Anime Protagonist",
    "origin": "Scout Regiment Neo • District Shiganshina 2.0",
    "faction": "Survey Scout Vanguard Neo",
    "tagline": "“The wall wasn’t built to keep the titans in. It was built to protect them from us.”",
    "biography": "Surviving the fall of District 7, Ryuto mastered the 3D maneuver gear before turning 16. His specialized reflex reaction matches hyper-velocity kinetic strikes, enabling split-second decimation of class-15 bio-monstrosities.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b129928-BCEjVaP0AQSw.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b129928-BCEjVaP0AQSw.png",
    "stats_json": [
      {
        "label": "Agility",
        "value": 94,
        "max": 100
      },
      {
        "label": "Power",
        "value": 88,
        "max": 100
      },
      {
        "label": "Strategic IQ",
        "value": 92,
        "max": 100
      }
    ],
    "stats": [
      {
        "label": "Agility",
        "value": 94,
        "max": 100
      },
      {
        "label": "Power",
        "value": 88,
        "max": 100
      },
      {
        "label": "Strategic IQ",
        "value": 92,
        "max": 100
      }
    ],
    "details_json": {
      "firstAppearance": "Ch. 01 \"Awakening of the Bloodline\"",
      "weapon": "Dual Thunder Spears & Carbon Blade Rigs",
      "nemesis": "The Colossal Behemoth of Ward 12",
      "bio": "Surviving the fall of District 7, Ryuto mastered the 3D maneuver gear before turning 16. His specialized reflex reaction matches hyper-velocity kinetic strikes, enabling split-second decimation of class-15 bio-monstrosities."
    },
    "details": {
      "firstAppearance": "Ch. 01 \"Awakening of the Bloodline\"",
      "weapon": "Dual Thunder Spears & Carbon Blade Rigs",
      "nemesis": "The Colossal Behemoth of Ward 12",
      "bio": "Surviving the fall of District 7, Ryuto mastered the 3D maneuver gear before turning 16. His specialized reflex reaction matches hyper-velocity kinetic strikes, enabling split-second decimation of class-15 bio-monstrosities."
    }
  },
  {
    "id": "valkyrie-v09",
    "slug": "valkyrie-v09",
    "name": "Valkyrie V-09",
    "alias": "Cyber Merc",
    "category_slug": "gaming",
    "universe": "Gaming",
    "universeSlug": "gaming",
    "accentColor": "#FACC15",
    "archetype": "Gaming Hero",
    "origin": "Neo-Kyoto Underbelly",
    "faction": "Afterlife Independent Mercs",
    "tagline": "“When the ICE melts and the sirens cry, my monowire sings the final lullaby.”",
    "biography": "Equipped with illegal military-grade Sandevistan neural implants and thermal monowires, V-09 infiltrates mega-corporation data fortresses without leaving a single digital trace.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b132494-R05zeZPjDG3l.jpg",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b132494-R05zeZPjDG3l.jpg",
    "stats_json": [
      {
        "label": "Class",
        "textValue": "Vanguard Infiltrator"
      },
      {
        "label": "Origin",
        "textValue": "Neo-Kyoto Underbelly"
      },
      {
        "label": "Weapon",
        "textValue": "Dual Plasma Blades"
      }
    ],
    "stats": [
      {
        "label": "Class",
        "textValue": "Vanguard Infiltrator"
      },
      {
        "label": "Origin",
        "textValue": "Neo-Kyoto Underbelly"
      },
      {
        "label": "Weapon",
        "textValue": "Dual Plasma Blades"
      }
    ],
    "details_json": {
      "firstAppearance": "Night City Patch 2.2 Cyber-Infiltration",
      "weapon": "Thermal Monowire & Arasaka Prototype MK-7",
      "nemesis": "Corporate Overlord Saburo-X",
      "bio": "Equipped with illegal military-grade Sandevistan neural implants and thermal monowires, V-09 infiltrates mega-corporation data fortresses without leaving a single digital trace."
    },
    "details": {
      "firstAppearance": "Night City Patch 2.2 Cyber-Infiltration",
      "weapon": "Thermal Monowire & Arasaka Prototype MK-7",
      "nemesis": "Corporate Overlord Saburo-X",
      "bio": "Equipped with illegal military-grade Sandevistan neural implants and thermal monowires, V-09 infiltrates mega-corporation data fortresses without leaving a single digital trace."
    }
  },
  {
    "id": "shadow-raven",
    "slug": "shadow-raven",
    "name": "Shadow Raven",
    "alias": "The Nocturnal Vigilante",
    "category_slug": "comics",
    "universe": "Comics",
    "universeSlug": "comics",
    "accentColor": "#FB7185",
    "archetype": "Comic Anti-Hero",
    "origin": "Gotham Prime • Earth-99",
    "faction": "Midnight Syndicate",
    "tagline": "“Justice is a luxury for the daylight. The dark requires a harsher toll.”",
    "biography": "Exiled from the High Council of Champions after refusing to compromise with political corrupt lords, Shadow Raven established the Midnight Syndicate to hunt down interdimensional syndicate smugglers.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/542-raven.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/542-raven.jpg",
    "stats_json": [
      {
        "label": "Universe",
        "textValue": "Earth-Prime 99"
      },
      {
        "label": "First Appearance",
        "textValue": "Issue #12 (1998)"
      },
      {
        "label": "Nemesis",
        "textValue": "Baron Void"
      }
    ],
    "stats": [
      {
        "label": "Universe",
        "textValue": "Earth-Prime 99"
      },
      {
        "label": "First Appearance",
        "textValue": "Issue #12 (1998)"
      },
      {
        "label": "Nemesis",
        "textValue": "Baron Void"
      }
    ],
    "details_json": {
      "firstAppearance": "Shadow Syndicate #12 (Collector Silver Holo)",
      "weapon": "Obsidian Batarangs & Dark Energy Cloak",
      "nemesis": "Baron Void (Dimensional Conqueror)",
      "bio": "Exiled from the High Council of Champions after refusing to compromise with political corrupt lords, Shadow Raven established the Midnight Syndicate to hunt down interdimensional syndicate smugglers."
    },
    "details": {
      "firstAppearance": "Shadow Syndicate #12 (Collector Silver Holo)",
      "weapon": "Obsidian Batarangs & Dark Energy Cloak",
      "nemesis": "Baron Void (Dimensional Conqueror)",
      "bio": "Exiled from the High Council of Champions after refusing to compromise with political corrupt lords, Shadow Raven established the Midnight Syndicate to hunt down interdimensional syndicate smugglers."
    }
  },
  {
    "id": "lyra-solaris",
    "slug": "lyra-solaris",
    "name": "Lyra Solaris",
    "alias": "Celestial Weaver",
    "category_slug": "cosplay",
    "universe": "Cosplay",
    "universeSlug": "cosplay",
    "accentColor": "#C084FC",
    "archetype": "Cosplay & Lore Icon",
    "origin": "Astral Leyline Nexus",
    "faction": "Astral Order of Luminaries",
    "tagline": "“The threads of the multiverse weave not by chance, but by deliberate grace.”",
    "biography": "A favorite of master cosplayers worldwide, Lyra Solaris channels solar plasma through custom hand-spun silk armor. Her prop build tutorials have garnered over 3 million views in the Cosplay Guild.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b133676-kV2czE3C8Qls.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b133676-kV2czE3C8Qls.png",
    "stats_json": [
      {
        "label": "Affinity",
        "textValue": "Starlight Arcana"
      },
      {
        "label": "Rank",
        "textValue": "Grand Master"
      },
      {
        "label": "Relic",
        "textValue": "Prism Staff"
      }
    ],
    "stats": [
      {
        "label": "Affinity",
        "textValue": "Starlight Arcana"
      },
      {
        "label": "Rank",
        "textValue": "Grand Master"
      },
      {
        "label": "Relic",
        "textValue": "Prism Staff"
      }
    ],
    "details_json": {
      "firstAppearance": "Arcana Chronicles Vol. 4 \"Starlight Symphony\"",
      "weapon": "Prism Leyline Staff with Luminescent Core",
      "nemesis": "Eclipse Harvester Malakor",
      "bio": "A favorite of master cosplayers worldwide, Lyra Solaris channels solar plasma through custom hand-spun silk armor. Her prop build tutorials have garnered over 3 million views in the Cosplay Guild."
    },
    "details": {
      "firstAppearance": "Arcana Chronicles Vol. 4 \"Starlight Symphony\"",
      "weapon": "Prism Leyline Staff with Luminescent Core",
      "nemesis": "Eclipse Harvester Malakor",
      "bio": "A favorite of master cosplayers worldwide, Lyra Solaris channels solar plasma through custom hand-spun silk armor. Her prop build tutorials have garnered over 3 million views in the Cosplay Guild."
    }
  },
  {
    "id": "paul-muaddib",
    "slug": "paul-muaddib",
    "name": "Kwisatz Navigator",
    "alias": "Sovereign of Arrakis",
    "category_slug": "movies-tv",
    "universe": "Movies & TV",
    "universeSlug": "movies-tv",
    "accentColor": "#38BDF8",
    "archetype": "Cinematic Visionary",
    "origin": "Caladan / Deep Desert Sietch",
    "faction": "Fremen Fedaykin Council",
    "tagline": "“He who can destroy a thing has the real control of it.”",
    "biography": "Walking the Golden Path across billions of potential futures, the Navigator unites the desert tribes while wrestling with the terrifying galactic jihad sparked in his name.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Timoth%C3%A9e_Chalamet-63482_%28cropped%29.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Timoth%C3%A9e_Chalamet-63482_%28cropped%29.jpg",
    "stats_json": [
      {
        "label": "Prescience",
        "value": 99,
        "max": 100
      },
      {
        "label": "Voice Mastery",
        "value": 95,
        "max": 100
      },
      {
        "label": "Desert Warfare",
        "value": 96,
        "max": 100
      }
    ],
    "stats": [
      {
        "label": "Prescience",
        "value": 99,
        "max": 100
      },
      {
        "label": "Voice Mastery",
        "value": 95,
        "max": 100
      },
      {
        "label": "Desert Warfare",
        "value": 96,
        "max": 100
      }
    ],
    "details_json": {
      "firstAppearance": "Dune Part One (IMAX 70mm Archival Cut)",
      "weapon": "Crysknife of Maker Tooth & Weirding Module",
      "nemesis": "Padishah Emperor & Bene Gesserit Sisterhood",
      "bio": "Walking the Golden Path across billions of potential futures, the Navigator unites the desert tribes while wrestling with the terrifying galactic jihad sparked in his name."
    },
    "details": {
      "firstAppearance": "Dune Part One (IMAX 70mm Archival Cut)",
      "weapon": "Crysknife of Maker Tooth & Weirding Module",
      "nemesis": "Padishah Emperor & Bene Gesserit Sisterhood",
      "bio": "Walking the Golden Path across billions of potential futures, the Navigator unites the desert tribes while wrestling with the terrifying galactic jihad sparked in his name."
    }
  },
  {
    "id": "nova-kwangya",
    "slug": "nova-kwangya",
    "name": "AE-Karina Prime",
    "alias": "Hyper-Pop Avatar",
    "category_slug": "kpop",
    "universe": "K-Pop",
    "universeSlug": "kpop",
    "accentColor": "#F43F5E",
    "archetype": "Virtual & Stage Idol",
    "origin": "FLAT • KWANGYA Digital Realm",
    "faction": "SYNK Hyper-Lineage",
    "tagline": "“Sync your frequency to the Supernova; our stage bends reality.”",
    "biography": "Bridging real-world stadium choreography with AI-driven KWANGYA lore, AE-Karina Prime leads the 4th-gen sonic revolution with metallic hyper-pop production.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/50/Karina_at_Gimpo_Airport_on_April_22%2C_2026_03.png",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/50/Karina_at_Gimpo_Airport_on_April_22%2C_2026_03.png",
    "stats_json": [
      {
        "label": "Stage Presence",
        "value": 98,
        "max": 100
      },
      {
        "label": "Vocal Range",
        "value": 93,
        "max": 100
      },
      {
        "label": "SYNK Level",
        "value": 100,
        "max": 100
      }
    ],
    "stats": [
      {
        "label": "Stage Presence",
        "value": 98,
        "max": 100
      },
      {
        "label": "Vocal Range",
        "value": 93,
        "max": 100
      },
      {
        "label": "SYNK Level",
        "value": 100,
        "max": 100
      }
    ],
    "details_json": {
      "firstAppearance": "Savage SYNK Showcase • Armageddon Era",
      "weapon": "Sonic Lightstick Frequency & Rocket Puncher",
      "nemesis": "Black Mamba Hallucination",
      "bio": "Bridging real-world stadium choreography with AI-driven KWANGYA lore, AE-Karina Prime leads the 4th-gen sonic revolution with metallic hyper-pop production."
    },
    "details": {
      "firstAppearance": "Savage SYNK Showcase • Armageddon Era",
      "weapon": "Sonic Lightstick Frequency & Rocket Puncher",
      "nemesis": "Black Mamba Hallucination",
      "bio": "Bridging real-world stadium choreography with AI-driven KWANGYA lore, AE-Karina Prime leads the 4th-gen sonic revolution with metallic hyper-pop production."
    }
  },
  {
    "id": "kuro-kenshin",
    "slug": "kuro-kenshin",
    "name": "Chihiro Rokuhira",
    "alias": "Bearer of Enten",
    "category_slug": "manga",
    "universe": "Manga",
    "universeSlug": "manga",
    "accentColor": "#FB923C",
    "archetype": "Seinen / Shonen Swordsman",
    "origin": "Kamunabi Forge Sanctuary",
    "faction": "Rokuhira Swordsmith Lineage",
    "tagline": "“Every morning I wake up with fresh hatred—and a sharper edge.”",
    "biography": "Trained beside his legendary swordsmith father, Chihiro wields the seventh enchanted katana capable of absorbing and manifesting spirit energy as obsidian goldfish.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b314801-MvuHiyPe5Dxu.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b314801-MvuHiyPe5Dxu.png",
    "stats_json": [
      {
        "label": "Swordplay",
        "value": 97,
        "max": 100
      },
      {
        "label": "Spirit Energy",
        "value": 94,
        "max": 100
      },
      {
        "label": "Resolve",
        "value": 100,
        "max": 100
      }
    ],
    "stats": [
      {
        "label": "Swordplay",
        "value": 97,
        "max": 100
      },
      {
        "label": "Spirit Energy",
        "value": 94,
        "max": 100
      },
      {
        "label": "Resolve",
        "value": 100,
        "max": 100
      }
    ],
    "details_json": {
      "firstAppearance": "Weekly Shonen Jump Issue #42",
      "weapon": "Enchanted Blade: Enten (Kuro, Aka, Nishiki)",
      "nemesis": "The Hishaku Sorcerer Syndicate",
      "bio": "Trained beside his legendary swordsmith father, Chihiro wields the seventh enchanted katana capable of absorbing and manifesting spirit energy as obsidian goldfish."
    },
    "details": {
      "firstAppearance": "Weekly Shonen Jump Issue #42",
      "weapon": "Enchanted Blade: Enten (Kuro, Aka, Nishiki)",
      "nemesis": "The Hishaku Sorcerer Syndicate",
      "bio": "Trained beside his legendary swordsmith father, Chihiro wields the seventh enchanted katana capable of absorbing and manifesting spirit energy as obsidian goldfish."
    }
  },
  {
    "id": "archivist-zero",
    "slug": "archivist-zero",
    "name": "Archivist Zero",
    "alias": "Keeper of the Vault",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Grand Lore Historian",
    "origin": "Citadel of Canon • Sector 08",
    "faction": "Verified Contributors Guild",
    "tagline": "“No theory survives without citations; every timeline leaves a footprint.”",
    "biography": "Synthesizing decades of interviews, artbooks, and frame-by-frame analyses, Archivist Zero curates the Community Vault so only the highest-caliber fan scholarship enters the permanent record.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/709-watcher.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/709-watcher.jpg",
    "stats_json": [
      {
        "label": "Canon Accuracy",
        "value": 99,
        "max": 100
      },
      {
        "label": "Essays Vetted",
        "textValue": "1,420+ Approved"
      },
      {
        "label": "Clearance",
        "textValue": "Level 5 Moderator"
      }
    ],
    "stats": [
      {
        "label": "Canon Accuracy",
        "value": 99,
        "max": 100
      },
      {
        "label": "Essays Vetted",
        "textValue": "1,420+ Approved"
      },
      {
        "label": "Clearance",
        "textValue": "Level 5 Moderator"
      }
    ],
    "details_json": {
      "firstAppearance": "Fan Hub Plus Founding Charter v1.0",
      "weapon": "Cross-Universe Citation Matrix",
      "nemesis": "Unverified Spoilers & Low-Effort Filler",
      "bio": "Synthesizing decades of interviews, artbooks, and frame-by-frame analyses, Archivist Zero curates the Community Vault so only the highest-caliber fan scholarship enters the permanent record."
    },
    "details": {
      "firstAppearance": "Fan Hub Plus Founding Charter v1.0",
      "weapon": "Cross-Universe Citation Matrix",
      "nemesis": "Unverified Spoilers & Low-Effort Filler",
      "bio": "Synthesizing decades of interviews, artbooks, and frame-by-frame analyses, Archivist Zero curates the Community Vault so only the highest-caliber fan scholarship enters the permanent record."
    }
  },
  {
    "id": "goku",
    "slug": "goku",
    "name": "Goku",
    "alias": "Kakarot",
    "category_slug": "anime",
    "universe": "Anime",
    "universeSlug": "anime",
    "accentColor": "#A3E635",
    "archetype": "Protagonist",
    "origin": "Dragon Ball",
    "faction": "Z Fighters",
    "tagline": "The strongest warrior in the universe",
    "biography": "A Saiyan sent to Earth as a baby, raised as a human, and became Earth's greatest protector.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/246-wsRRr6z1kii8.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/246-wsRRr6z1kii8.png",
    "stats_json": [
      {
        "label": "Strength",
        "value": 99,
        "max": 100,
        "textValue": "99%"
      },
      {
        "label": "Speed",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Strength",
        "value": 99,
        "max": 100,
        "textValue": "99%"
      },
      {
        "label": "Speed",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "Dragon Ball Archival Debut",
      "weapon": "Protagonist Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A Saiyan sent to Earth as a baby, raised as a human, and became Earth's greatest protector.",
      "universe": "Dragon Ball",
      "species": "Saiyan"
    },
    "details": {
      "firstAppearance": "Dragon Ball Archival Debut",
      "weapon": "Protagonist Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A Saiyan sent to Earth as a baby, raised as a human, and became Earth's greatest protector.",
      "universe": "Dragon Ball",
      "species": "Saiyan"
    }
  },
  {
    "id": "naruto-uzumaki",
    "slug": "naruto-uzumaki",
    "name": "Naruto Uzumaki",
    "alias": "Naruto",
    "category_slug": "anime",
    "universe": "Anime",
    "universeSlug": "anime",
    "accentColor": "#A3E635",
    "archetype": "Protagonist",
    "origin": "Naruto",
    "faction": "Konoha",
    "tagline": "Believe it!",
    "biography": "A ninja from the Hidden Leaf Village with the Nine-Tails fox spirit sealed within him.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b17-phjcWCkRuIhu.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b17-phjcWCkRuIhu.png",
    "stats_json": [
      {
        "label": "Chakra",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      },
      {
        "label": "Resilience",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Chakra",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      },
      {
        "label": "Resilience",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "Naruto Archival Debut",
      "weapon": "Protagonist Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A ninja from the Hidden Leaf Village with the Nine-Tails fox spirit sealed within him.",
      "universe": "Naruto",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Naruto Archival Debut",
      "weapon": "Protagonist Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A ninja from the Hidden Leaf Village with the Nine-Tails fox spirit sealed within him.",
      "universe": "Naruto",
      "species": "Human"
    }
  },
  {
    "id": "monkey-d-luffy",
    "slug": "monkey-d-luffy",
    "name": "Monkey D. Luffy",
    "alias": "Straw Hat",
    "category_slug": "anime",
    "universe": "Anime",
    "universeSlug": "anime",
    "accentColor": "#A3E635",
    "archetype": "Protagonist",
    "origin": "One Piece",
    "faction": "Straw Hat Pirates",
    "tagline": "I'm going to be the King of the Pirates!",
    "biography": "A pirate with rubber powers who dreams of finding the One Piece treasure.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b40-MNypXsxSRb1R.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b40-MNypXsxSRb1R.png",
    "stats_json": [
      {
        "label": "Endurance",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Ambition",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "stats": [
      {
        "label": "Endurance",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Ambition",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "details_json": {
      "firstAppearance": "One Piece Archival Debut",
      "weapon": "Protagonist Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A pirate with rubber powers who dreams of finding the One Piece treasure.",
      "universe": "One Piece",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "One Piece Archival Debut",
      "weapon": "Protagonist Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A pirate with rubber powers who dreams of finding the One Piece treasure.",
      "universe": "One Piece",
      "species": "Human"
    }
  },
  {
    "id": "sasuke-uchiha",
    "slug": "sasuke-uchiha",
    "name": "Sasuke Uchiha",
    "alias": "The Avenger",
    "category_slug": "anime",
    "universe": "Anime",
    "universeSlug": "anime",
    "accentColor": "#A3E635",
    "archetype": "Rival",
    "origin": "Naruto",
    "faction": "Team 7",
    "tagline": "I am an avenger.",
    "biography": "A powerful ninja seeking revenge against his brother, driven by ambition and pride.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b13-SISLEw1oAD7a.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b13-SISLEw1oAD7a.png",
    "stats_json": [
      {
        "label": "Speed",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Power",
        "value": 94,
        "max": 100,
        "textValue": "94%"
      }
    ],
    "stats": [
      {
        "label": "Speed",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Power",
        "value": 94,
        "max": 100,
        "textValue": "94%"
      }
    ],
    "details_json": {
      "firstAppearance": "Naruto Archival Debut",
      "weapon": "Rival Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A powerful ninja seeking revenge against his brother, driven by ambition and pride.",
      "universe": "Naruto",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Naruto Archival Debut",
      "weapon": "Rival Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A powerful ninja seeking revenge against his brother, driven by ambition and pride.",
      "universe": "Naruto",
      "species": "Human"
    }
  },
  {
    "id": "ichigo-kurosaki",
    "slug": "ichigo-kurosaki",
    "name": "Ichigo Kurosaki",
    "alias": "Bleach",
    "category_slug": "anime",
    "universe": "Anime",
    "universeSlug": "anime",
    "accentColor": "#A3E635",
    "archetype": "Protector",
    "origin": "Bleach",
    "faction": "Soul Society",
    "tagline": "I am the one who fights.",
    "biography": "A teenager with the ability to see and interact with spirits, protecting humans from hollows.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b5-a7bkJgjhhigE.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b5-a7bkJgjhhigE.png",
    "stats_json": [
      {
        "label": "Swordsmanship",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      },
      {
        "label": "Spiritual Power",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      }
    ],
    "stats": [
      {
        "label": "Swordsmanship",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      },
      {
        "label": "Spiritual Power",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      }
    ],
    "details_json": {
      "firstAppearance": "Bleach Archival Debut",
      "weapon": "Protector Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A teenager with the ability to see and interact with spirits, protecting humans from hollows.",
      "universe": "Bleach",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Bleach Archival Debut",
      "weapon": "Protector Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A teenager with the ability to see and interact with spirits, protecting humans from hollows.",
      "universe": "Bleach",
      "species": "Human"
    }
  },
  {
    "id": "levi-ackerman",
    "slug": "levi-ackerman",
    "name": "Levi Ackerman",
    "alias": "Humanity's Strongest Soldier",
    "category_slug": "anime",
    "universe": "Anime",
    "universeSlug": "anime",
    "accentColor": "#A3E635",
    "archetype": "Soldier",
    "origin": "Attack on Titan",
    "faction": "Survey Corps",
    "tagline": "The difference in our strength is like the difference between clouds and mud.",
    "biography": "A skilled soldier with exceptional combat abilities, leading the Survey Corps.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b45627-CR68RyZmddGG.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b45627-CR68RyZmddGG.png",
    "stats_json": [
      {
        "label": "Combat",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Leadership",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "stats": [
      {
        "label": "Combat",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Leadership",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "details_json": {
      "firstAppearance": "Attack on Titan Archival Debut",
      "weapon": "Soldier Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A skilled soldier with exceptional combat abilities, leading the Survey Corps.",
      "universe": "Attack on Titan",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Attack on Titan Archival Debut",
      "weapon": "Soldier Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A skilled soldier with exceptional combat abilities, leading the Survey Corps.",
      "universe": "Attack on Titan",
      "species": "Human"
    }
  },
  {
    "id": "rem",
    "slug": "rem",
    "name": "Rem",
    "alias": "The Blue Demon Maid",
    "category_slug": "anime",
    "universe": "Anime",
    "universeSlug": "anime",
    "accentColor": "#A3E635",
    "archetype": "Demon Maid",
    "origin": "Re:Zero",
    "faction": "Roswaal's Mansion",
    "tagline": "I love Subaru.",
    "biography": "A demon maid with blue hair who serves in a mansion and possesses formidable combat skills.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b88575-Ayu8UPDA8NS6.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b88575-Ayu8UPDA8NS6.png",
    "stats_json": [
      {
        "label": "Combat",
        "value": 88,
        "max": 100,
        "textValue": "88%"
      },
      {
        "label": "Loyalty",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "stats": [
      {
        "label": "Combat",
        "value": 88,
        "max": 100,
        "textValue": "88%"
      },
      {
        "label": "Loyalty",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "details_json": {
      "firstAppearance": "Re:Zero Archival Debut",
      "weapon": "Demon Maid Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A demon maid with blue hair who serves in a mansion and possesses formidable combat skills.",
      "universe": "Re:Zero",
      "species": "Demon"
    },
    "details": {
      "firstAppearance": "Re:Zero Archival Debut",
      "weapon": "Demon Maid Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A demon maid with blue hair who serves in a mansion and possesses formidable combat skills.",
      "universe": "Re:Zero",
      "species": "Demon"
    }
  },
  {
    "id": "mikasa-ackerman",
    "slug": "mikasa-ackerman",
    "name": "Mikasa Ackerman",
    "alias": "The Black-Haired Goddess",
    "category_slug": "anime",
    "universe": "Anime",
    "universeSlug": "anime",
    "accentColor": "#A3E635",
    "archetype": "Soldier",
    "origin": "Attack on Titan",
    "faction": "Survey Corps",
    "tagline": "Eren, I'll always follow you.",
    "biography": "A skilled fighter and devoted friend who protects those she cares about.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b40881-F3gr1PkreDvj.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b40881-F3gr1PkreDvj.png",
    "stats_json": [
      {
        "label": "Combat",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      },
      {
        "label": "Devotion",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "stats": [
      {
        "label": "Combat",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      },
      {
        "label": "Devotion",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "details_json": {
      "firstAppearance": "Attack on Titan Archival Debut",
      "weapon": "Soldier Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A skilled fighter and devoted friend who protects those she cares about.",
      "universe": "Attack on Titan",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Attack on Titan Archival Debut",
      "weapon": "Soldier Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A skilled fighter and devoted friend who protects those she cares about.",
      "universe": "Attack on Titan",
      "species": "Human"
    }
  },
  {
    "id": "geralt-of-rivia",
    "slug": "geralt-of-rivia",
    "name": "Geralt of Rivia",
    "alias": "The Witcher",
    "category_slug": "gaming",
    "universe": "Gaming",
    "universeSlug": "gaming",
    "accentColor": "#FACC15",
    "archetype": "Witcher",
    "origin": "The Witcher",
    "faction": "Witchers",
    "tagline": "I am the witcher.",
    "biography": "A monster hunter with supernatural abilities, mutated through ancient rites.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/87/Geralt.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/87/Geralt.jpg",
    "stats_json": [
      {
        "label": "Swordsmanship",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Alchemy",
        "value": 85,
        "max": 100,
        "textValue": "85%"
      }
    ],
    "stats": [
      {
        "label": "Swordsmanship",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Alchemy",
        "value": 85,
        "max": 100,
        "textValue": "85%"
      }
    ],
    "details_json": {
      "firstAppearance": "The Witcher Archival Debut",
      "weapon": "Witcher Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A monster hunter with supernatural abilities, mutated through ancient rites.",
      "universe": "The Witcher",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "The Witcher Archival Debut",
      "weapon": "Witcher Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A monster hunter with supernatural abilities, mutated through ancient rites.",
      "universe": "The Witcher",
      "species": "Human"
    }
  },
  {
    "id": "link",
    "slug": "link",
    "name": "Link",
    "alias": "The Hero of Time",
    "category_slug": "gaming",
    "universe": "Gaming",
    "universeSlug": "gaming",
    "accentColor": "#FACC15",
    "archetype": "Hero",
    "origin": "The Legend of Zelda",
    "faction": "Hyrule",
    "tagline": "It's dangerous to go alone! Take this.",
    "biography": "The chosen hero destined to save Hyrule from darkness.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b4201-VySa1vLuUcwb.jpg",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b4201-VySa1vLuUcwb.jpg",
    "stats_json": [
      {
        "label": "Courage",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Wisdom",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "stats": [
      {
        "label": "Courage",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Wisdom",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "details_json": {
      "firstAppearance": "The Legend of Zelda Archival Debut",
      "weapon": "Hero Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "The chosen hero destined to save Hyrule from darkness.",
      "universe": "The Legend of Zelda",
      "species": "Hylian"
    },
    "details": {
      "firstAppearance": "The Legend of Zelda Archival Debut",
      "weapon": "Hero Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "The chosen hero destined to save Hyrule from darkness.",
      "universe": "The Legend of Zelda",
      "species": "Hylian"
    }
  },
  {
    "id": "master-chief",
    "slug": "master-chief",
    "name": "Master Chief",
    "alias": "John-117",
    "category_slug": "gaming",
    "universe": "Gaming",
    "universeSlug": "gaming",
    "accentColor": "#FACC15",
    "archetype": "Spartan",
    "origin": "Halo",
    "faction": "UNSC",
    "tagline": "I'll finish the fight.",
    "biography": "A genetically enhanced supersoldier fighting against the Covenant.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/435-master-chief.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/435-master-chief.jpg",
    "stats_json": [
      {
        "label": "Strength",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Tactical",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "stats": [
      {
        "label": "Strength",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Tactical",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "details_json": {
      "firstAppearance": "Halo Archival Debut",
      "weapon": "Spartan Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A genetically enhanced supersoldier fighting against the Covenant.",
      "universe": "Halo",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Halo Archival Debut",
      "weapon": "Spartan Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A genetically enhanced supersoldier fighting against the Covenant.",
      "universe": "Halo",
      "species": "Human"
    }
  },
  {
    "id": "cloud-strife",
    "slug": "cloud-strife",
    "name": "Cloud Strife",
    "alias": "The One-Winged Angel",
    "category_slug": "gaming",
    "universe": "Gaming",
    "universeSlug": "gaming",
    "accentColor": "#FACC15",
    "archetype": "Ex-Soldier",
    "origin": "Final Fantasy VII",
    "faction": "AVALANCHE",
    "tagline": "Let's mosey.",
    "biography": "A former member of an elite military unit turned eco-terrorist who fights to save the planet.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b456-aqvvhzG5aUXV.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b456-aqvvhzG5aUXV.png",
    "stats_json": [
      {
        "label": "Swordsmanship",
        "value": 94,
        "max": 100,
        "textValue": "94%"
      },
      {
        "label": "Materia",
        "value": 88,
        "max": 100,
        "textValue": "88%"
      }
    ],
    "stats": [
      {
        "label": "Swordsmanship",
        "value": 94,
        "max": 100,
        "textValue": "94%"
      },
      {
        "label": "Materia",
        "value": 88,
        "max": 100,
        "textValue": "88%"
      }
    ],
    "details_json": {
      "firstAppearance": "Final Fantasy VII Archival Debut",
      "weapon": "Ex-Soldier Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A former member of an elite military unit turned eco-terrorist who fights to save the planet.",
      "universe": "Final Fantasy VII",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Final Fantasy VII Archival Debut",
      "weapon": "Ex-Soldier Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A former member of an elite military unit turned eco-terrorist who fights to save the planet.",
      "universe": "Final Fantasy VII",
      "species": "Human"
    }
  },
  {
    "id": "lara-croft",
    "slug": "lara-croft",
    "name": "Lara Croft",
    "alias": "Tomb Raider",
    "category_slug": "gaming",
    "universe": "Gaming",
    "universeSlug": "gaming",
    "accentColor": "#FACC15",
    "archetype": "Archaeologist",
    "origin": "Tomb Raider",
    "faction": "Independent",
    "tagline": "I'll find the truth.",
    "biography": "An adventurous archaeologist exploring ancient tombs and uncovering lost civilizations.",
    "image_url": "https://upload.wikimedia.org/wikipedia/en/a/a8/LaraCroftInfobox.png",
    "image": "https://upload.wikimedia.org/wikipedia/en/a/a8/LaraCroftInfobox.png",
    "stats_json": [
      {
        "label": "Agility",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      },
      {
        "label": "Intelligence",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "stats": [
      {
        "label": "Agility",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      },
      {
        "label": "Intelligence",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "details_json": {
      "firstAppearance": "Tomb Raider Archival Debut",
      "weapon": "Archaeologist Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An adventurous archaeologist exploring ancient tombs and uncovering lost civilizations.",
      "universe": "Tomb Raider",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Tomb Raider Archival Debut",
      "weapon": "Archaeologist Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An adventurous archaeologist exploring ancient tombs and uncovering lost civilizations.",
      "universe": "Tomb Raider",
      "species": "Human"
    }
  },
  {
    "id": "kratos",
    "slug": "kratos",
    "name": "Kratos",
    "alias": "Ghost of Sparta",
    "category_slug": "gaming",
    "universe": "Gaming",
    "universeSlug": "gaming",
    "accentColor": "#FACC15",
    "archetype": "Warrior",
    "origin": "God of War",
    "faction": "Norse Gods",
    "tagline": "Boy!",
    "biography": "A warrior who escaped the Greek underworld to challenge the gods themselves.",
    "image_url": "https://upload.wikimedia.org/wikipedia/en/2/2f/Kratos_PS4.png",
    "image": "https://upload.wikimedia.org/wikipedia/en/2/2f/Kratos_PS4.png",
    "stats_json": [
      {
        "label": "Strength",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Rage",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Strength",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Rage",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "God of War Archival Debut",
      "weapon": "Warrior Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A warrior who escaped the Greek underworld to challenge the gods themselves.",
      "universe": "God of War",
      "species": "Demigod"
    },
    "details": {
      "firstAppearance": "God of War Archival Debut",
      "weapon": "Warrior Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A warrior who escaped the Greek underworld to challenge the gods themselves.",
      "universe": "God of War",
      "species": "Demigod"
    }
  },
  {
    "id": "ellie",
    "slug": "ellie",
    "name": "Ellie",
    "alias": "Firefly",
    "category_slug": "gaming",
    "universe": "Gaming",
    "universeSlug": "gaming",
    "accentColor": "#FACC15",
    "archetype": "Survivor",
    "origin": "The Last of Us",
    "faction": "Fireflies",
    "tagline": "I'll survive.",
    "biography": "A young survivor immune to infection, navigating a post-apocalyptic world.",
    "image_url": "https://upload.wikimedia.org/wikipedia/en/9/96/Ellie_in_The_Last_of_Us_Part_II.png",
    "image": "https://upload.wikimedia.org/wikipedia/en/9/96/Ellie_in_The_Last_of_Us_Part_II.png",
    "stats_json": [
      {
        "label": "Survival",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Courage",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      }
    ],
    "stats": [
      {
        "label": "Survival",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Courage",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      }
    ],
    "details_json": {
      "firstAppearance": "The Last of Us Archival Debut",
      "weapon": "Survivor Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A young survivor immune to infection, navigating a post-apocalyptic world.",
      "universe": "The Last of Us",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "The Last of Us Archival Debut",
      "weapon": "Survivor Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A young survivor immune to infection, navigating a post-apocalyptic world.",
      "universe": "The Last of Us",
      "species": "Human"
    }
  },
  {
    "id": "tony-stark",
    "slug": "tony-stark",
    "name": "Tony Stark",
    "alias": "Iron Man",
    "category_slug": "movies-tv",
    "universe": "Movies & TV",
    "universeSlug": "movies-tv",
    "accentColor": "#38BDF8",
    "archetype": "Genius",
    "origin": "Marvel Cinematic Universe",
    "faction": "Avengers",
    "tagline": "I am Iron Man.",
    "biography": "A billionaire industrialist who builds a powered suit of armor to save the world.",
    "image_url": "https://upload.wikimedia.org/wikipedia/en/f/f2/Robert_Downey_Jr._as_Tony_Stark_in_Avengers_Infinity_War.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/en/f/f2/Robert_Downey_Jr._as_Tony_Stark_in_Avengers_Infinity_War.jpg",
    "stats_json": [
      {
        "label": "Intelligence",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Charisma",
        "value": 85,
        "max": 100,
        "textValue": "85%"
      }
    ],
    "stats": [
      {
        "label": "Intelligence",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Charisma",
        "value": 85,
        "max": 100,
        "textValue": "85%"
      }
    ],
    "details_json": {
      "firstAppearance": "Marvel Cinematic Universe Archival Debut",
      "weapon": "Genius Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A billionaire industrialist who builds a powered suit of armor to save the world.",
      "universe": "Marvel",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Marvel Cinematic Universe Archival Debut",
      "weapon": "Genius Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A billionaire industrialist who builds a powered suit of armor to save the world.",
      "universe": "Marvel",
      "species": "Human"
    }
  },
  {
    "id": "jon-snow",
    "slug": "jon-snow",
    "name": "Jon Snow",
    "alias": "Aegon Targaryen",
    "category_slug": "movies-tv",
    "universe": "Movies & TV",
    "universeSlug": "movies-tv",
    "accentColor": "#38BDF8",
    "archetype": "Leader",
    "origin": "Game of Thrones",
    "faction": "Night's Watch",
    "tagline": "Winter is coming.",
    "biography": "A nobleman raised as a bastard, destined to protect the realm from the White Walkers.",
    "image_url": "https://upload.wikimedia.org/wikipedia/en/3/30/Jon_Snow_Season_8.png",
    "image": "https://upload.wikimedia.org/wikipedia/en/3/30/Jon_Snow_Season_8.png",
    "stats_json": [
      {
        "label": "Honor",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      },
      {
        "label": "Leadership",
        "value": 85,
        "max": 100,
        "textValue": "85%"
      }
    ],
    "stats": [
      {
        "label": "Honor",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      },
      {
        "label": "Leadership",
        "value": 85,
        "max": 100,
        "textValue": "85%"
      }
    ],
    "details_json": {
      "firstAppearance": "Game of Thrones Archival Debut",
      "weapon": "Leader Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A nobleman raised as a bastard, destined to protect the realm from the White Walkers.",
      "universe": "Game of Thrones",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Game of Thrones Archival Debut",
      "weapon": "Leader Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A nobleman raised as a bastard, destined to protect the realm from the White Walkers.",
      "universe": "Game of Thrones",
      "species": "Human"
    }
  },
  {
    "id": "neo",
    "slug": "neo",
    "name": "Neo",
    "alias": "The One",
    "category_slug": "movies-tv",
    "universe": "Movies & TV",
    "universeSlug": "movies-tv",
    "accentColor": "#38BDF8",
    "archetype": "Chosen One",
    "origin": "The Matrix",
    "faction": "Zion",
    "tagline": "I know kung fu.",
    "biography": "A computer programmer who discovers the true nature of reality and becomes humanity's savior.",
    "image_url": "https://upload.wikimedia.org/wikipedia/en/c/c6/NeoTheMatrix.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/en/c/c6/NeoTheMatrix.jpg",
    "stats_json": [
      {
        "label": "Martial Arts",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Hacking",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Martial Arts",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Hacking",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "The Matrix Archival Debut",
      "weapon": "Chosen One Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A computer programmer who discovers the true nature of reality and becomes humanity's savior.",
      "universe": "The Matrix",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "The Matrix Archival Debut",
      "weapon": "Chosen One Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A computer programmer who discovers the true nature of reality and becomes humanity's savior.",
      "universe": "The Matrix",
      "species": "Human"
    }
  },
  {
    "id": "walter-white",
    "slug": "walter-white",
    "name": "Walter White",
    "alias": "Heisenberg",
    "category_slug": "movies-tv",
    "universe": "Movies & TV",
    "universeSlug": "movies-tv",
    "accentColor": "#38BDF8",
    "archetype": "Antihero",
    "origin": "Breaking Bad",
    "faction": "Cartel",
    "tagline": "You're goddamn right.",
    "biography": "A chemistry teacher turned drug kingpin, motivated by pride and ego.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/95/BryanCranston-byPhilipRomano_%28cropped%29.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/95/BryanCranston-byPhilipRomano_%28cropped%29.jpg",
    "stats_json": [
      {
        "label": "Chemistry",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Cunning",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Chemistry",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Cunning",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "Breaking Bad Archival Debut",
      "weapon": "Antihero Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A chemistry teacher turned drug kingpin, motivated by pride and ego.",
      "universe": "Breaking Bad",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Breaking Bad Archival Debut",
      "weapon": "Antihero Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A chemistry teacher turned drug kingpin, motivated by pride and ego.",
      "universe": "Breaking Bad",
      "species": "Human"
    }
  },
  {
    "id": "daenerys-targaryen",
    "slug": "daenerys-targaryen",
    "name": "Daenerys Targaryen",
    "alias": "Mother of Dragons",
    "category_slug": "movies-tv",
    "universe": "Movies & TV",
    "universeSlug": "movies-tv",
    "accentColor": "#38BDF8",
    "archetype": "Queen",
    "origin": "Game of Thrones",
    "faction": "House Targaryen",
    "tagline": "Dracarys!",
    "biography": "An exiled princess who rises to power, commanding dragons and loyal followers.",
    "image_url": "https://upload.wikimedia.org/wikipedia/en/0/0d/Daenerys_Targaryen_with_Dragon-Emilia_Clarke.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/en/0/0d/Daenerys_Targaryen_with_Dragon-Emilia_Clarke.jpg",
    "stats_json": [
      {
        "label": "Leadership",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      },
      {
        "label": "Dragons",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "stats": [
      {
        "label": "Leadership",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      },
      {
        "label": "Dragons",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "details_json": {
      "firstAppearance": "Game of Thrones Archival Debut",
      "weapon": "Queen Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An exiled princess who rises to power, commanding dragons and loyal followers.",
      "universe": "Game of Thrones",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Game of Thrones Archival Debut",
      "weapon": "Queen Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An exiled princess who rises to power, commanding dragons and loyal followers.",
      "universe": "Game of Thrones",
      "species": "Human"
    }
  },
  {
    "id": "sherlock-holmes",
    "slug": "sherlock-holmes",
    "name": "Sherlock Holmes",
    "alias": "The Consulting Detective",
    "category_slug": "movies-tv",
    "universe": "Movies & TV",
    "universeSlug": "movies-tv",
    "accentColor": "#38BDF8",
    "archetype": "Detective",
    "origin": "BBC Sherlock",
    "faction": "Baker Street",
    "tagline": "The game is afoot.",
    "biography": "A brilliant modern detective solving crimes in contemporary London.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Benedict_Cumberbatch-67555.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Benedict_Cumberbatch-67555.jpg",
    "stats_json": [
      {
        "label": "Intelligence",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Observation",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "stats": [
      {
        "label": "Intelligence",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Observation",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "details_json": {
      "firstAppearance": "BBC Sherlock Archival Debut",
      "weapon": "Detective Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A brilliant modern detective solving crimes in contemporary London.",
      "universe": "Sherlock",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "BBC Sherlock Archival Debut",
      "weapon": "Detective Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A brilliant modern detective solving crimes in contemporary London.",
      "universe": "Sherlock",
      "species": "Human"
    }
  },
  {
    "id": "eleven",
    "slug": "eleven",
    "name": "Eleven",
    "alias": "El",
    "category_slug": "movies-tv",
    "universe": "Movies & TV",
    "universeSlug": "movies-tv",
    "accentColor": "#38BDF8",
    "archetype": "Psychokinetic",
    "origin": "Stranger Things",
    "faction": "Hawkins Lab",
    "tagline": "Friends don't lie.",
    "biography": "A young girl with psychokinetic abilities escaping a secret laboratory.",
    "image_url": "https://upload.wikimedia.org/wikipedia/en/3/3f/Eleven_%28Stranger_Things_5%29.png",
    "image": "https://upload.wikimedia.org/wikipedia/en/3/3f/Eleven_%28Stranger_Things_5%29.png",
    "stats_json": [
      {
        "label": "Psychokinesis",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Growth",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Psychokinesis",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Growth",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "Stranger Things Archival Debut",
      "weapon": "Psychokinetic Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A young girl with psychokinetic abilities escaping a secret laboratory.",
      "universe": "Stranger Things",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Stranger Things Archival Debut",
      "weapon": "Psychokinetic Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A young girl with psychokinetic abilities escaping a secret laboratory.",
      "universe": "Stranger Things",
      "species": "Human"
    }
  },
  {
    "id": "lisa",
    "slug": "lisa",
    "name": "Lisa",
    "alias": "Lalisa Manoban",
    "category_slug": "kpop",
    "universe": "K-Pop",
    "universeSlug": "kpop",
    "accentColor": "#F43F5E",
    "archetype": "Idol",
    "origin": "Blackpink",
    "faction": "YG Entertainment",
    "tagline": "LISA is the name, dancing is my game.",
    "biography": "A Thai-born K-pop idol known for her exceptional dancing skills and charisma.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/ae/20240314_Lisa_Manoban_07.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/ae/20240314_Lisa_Manoban_07.jpg",
    "stats_json": [
      {
        "label": "Dance",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Charisma",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Dance",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Charisma",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "Blackpink Archival Debut",
      "weapon": "Idol Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A Thai-born K-pop idol known for her exceptional dancing skills and charisma.",
      "universe": "K-Pop",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Blackpink Archival Debut",
      "weapon": "Idol Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A Thai-born K-pop idol known for her exceptional dancing skills and charisma.",
      "universe": "K-Pop",
      "species": "Human"
    }
  },
  {
    "id": "jungkook",
    "slug": "jungkook",
    "name": "Jungkook",
    "alias": "JK",
    "category_slug": "kpop",
    "universe": "K-Pop",
    "universeSlug": "kpop",
    "accentColor": "#F43F5E",
    "archetype": "Idol",
    "origin": "BTS",
    "faction": "Big Hit Music",
    "tagline": "I'm the golden maknae.",
    "biography": "The youngest member of BTS, known for his vocal talent and versatility.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Jung_Kook_of_BTS%2C_February_12%2C_2026_%281%29.png",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Jung_Kook_of_BTS%2C_February_12%2C_2026_%281%29.png",
    "stats_json": [
      {
        "label": "Vocal",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Dance",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "stats": [
      {
        "label": "Vocal",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Dance",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "details_json": {
      "firstAppearance": "BTS Archival Debut",
      "weapon": "Idol Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "The youngest member of BTS, known for his vocal talent and versatility.",
      "universe": "K-Pop",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "BTS Archival Debut",
      "weapon": "Idol Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "The youngest member of BTS, known for his vocal talent and versatility.",
      "universe": "K-Pop",
      "species": "Human"
    }
  },
  {
    "id": "iu",
    "slug": "iu",
    "name": "IU",
    "alias": "Lee Ji-eun",
    "category_slug": "kpop",
    "universe": "K-Pop",
    "universeSlug": "kpop",
    "accentColor": "#F43F5E",
    "archetype": "Singer-Songwriter",
    "origin": "K-Pop",
    "faction": "EDAM Entertainment",
    "tagline": "The nation's little sister.",
    "biography": "A South Korean singer-songwriter known for her sweet voice and heartfelt lyrics.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/2f/IU_at_Blue_Dragon_Series_Awards_on_18072025_%2810%29.png",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/2f/IU_at_Blue_Dragon_Series_Awards_on_18072025_%2810%29.png",
    "stats_json": [
      {
        "label": "Vocal",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Songwriting",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "stats": [
      {
        "label": "Vocal",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Songwriting",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "details_json": {
      "firstAppearance": "K-Pop Archival Debut",
      "weapon": "Singer-Songwriter Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A South Korean singer-songwriter known for her sweet voice and heartfelt lyrics.",
      "universe": "K-Pop",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "K-Pop Archival Debut",
      "weapon": "Singer-Songwriter Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A South Korean singer-songwriter known for her sweet voice and heartfelt lyrics.",
      "universe": "K-Pop",
      "species": "Human"
    }
  },
  {
    "id": "jennie-kim",
    "slug": "jennie-kim",
    "name": "Jennie Kim",
    "alias": "Jennie",
    "category_slug": "kpop",
    "universe": "K-Pop",
    "universeSlug": "kpop",
    "accentColor": "#F43F5E",
    "archetype": "Idol",
    "origin": "Blackpink",
    "faction": "YG Entertainment",
    "tagline": "Pretty savage.",
    "biography": "A South Korean rapper and member of Blackpink, known for her stage presence.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7a/20260526_Jennie_Kim_04.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/20260526_Jennie_Kim_04.jpg",
    "stats_json": [
      {
        "label": "Rap",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      },
      {
        "label": "Stage Presence",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Rap",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      },
      {
        "label": "Stage Presence",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "Blackpink Archival Debut",
      "weapon": "Idol Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A South Korean rapper and member of Blackpink, known for her stage presence.",
      "universe": "K-Pop",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Blackpink Archival Debut",
      "weapon": "Idol Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A South Korean rapper and member of Blackpink, known for her stage presence.",
      "universe": "K-Pop",
      "species": "Human"
    }
  },
  {
    "id": "v-taehyung",
    "slug": "v-taehyung",
    "name": "V (Taehyung)",
    "alias": "Tae",
    "category_slug": "kpop",
    "universe": "K-Pop",
    "universeSlug": "kpop",
    "accentColor": "#F43F5E",
    "archetype": "Idol",
    "origin": "BTS",
    "faction": "Big Hit Music",
    "tagline": "I purple you.",
    "biography": "A member of BTS known for his deep voice and artistic talents.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d4/BTS%27s_V_20251004_04.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d4/BTS%27s_V_20251004_04.jpg",
    "stats_json": [
      {
        "label": "Vocal",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      },
      {
        "label": "Visual",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      }
    ],
    "stats": [
      {
        "label": "Vocal",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      },
      {
        "label": "Visual",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      }
    ],
    "details_json": {
      "firstAppearance": "BTS Archival Debut",
      "weapon": "Idol Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A member of BTS known for his deep voice and artistic talents.",
      "universe": "K-Pop",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "BTS Archival Debut",
      "weapon": "Idol Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A member of BTS known for his deep voice and artistic talents.",
      "universe": "K-Pop",
      "species": "Human"
    }
  },
  {
    "id": "spider-man",
    "slug": "spider-man",
    "name": "Spider-Man",
    "alias": "Peter Parker",
    "category_slug": "comics",
    "universe": "Comics",
    "universeSlug": "comics",
    "accentColor": "#FB7185",
    "archetype": "Superhero",
    "origin": "Marvel Comics",
    "faction": "Avengers",
    "tagline": "With great power comes great responsibility.",
    "biography": "A high school student bitten by a radioactive spider, gaining spider-like abilities.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg",
    "stats_json": [
      {
        "label": "Agility",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Strength",
        "value": 85,
        "max": 100,
        "textValue": "85%"
      }
    ],
    "stats": [
      {
        "label": "Agility",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Strength",
        "value": 85,
        "max": 100,
        "textValue": "85%"
      }
    ],
    "details_json": {
      "firstAppearance": "Marvel Comics Archival Debut",
      "weapon": "Superhero Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A high school student bitten by a radioactive spider, gaining spider-like abilities.",
      "universe": "Marvel",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Marvel Comics Archival Debut",
      "weapon": "Superhero Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A high school student bitten by a radioactive spider, gaining spider-like abilities.",
      "universe": "Marvel",
      "species": "Human"
    }
  },
  {
    "id": "batman",
    "slug": "batman",
    "name": "Batman",
    "alias": "Bruce Wayne",
    "category_slug": "comics",
    "universe": "Comics",
    "universeSlug": "comics",
    "accentColor": "#FB7185",
    "archetype": "Detective",
    "origin": "DC Comics",
    "faction": "Justice League",
    "tagline": "I am the night.",
    "biography": "A billionaire who uses his intellect and resources to fight crime in Gotham City.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/69-batman.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/69-batman.jpg",
    "stats_json": [
      {
        "label": "Intelligence",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Martial Arts",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Intelligence",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Martial Arts",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "DC Comics Archival Debut",
      "weapon": "Detective Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A billionaire who uses his intellect and resources to fight crime in Gotham City.",
      "universe": "DC",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "DC Comics Archival Debut",
      "weapon": "Detective Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A billionaire who uses his intellect and resources to fight crime in Gotham City.",
      "universe": "DC",
      "species": "Human"
    }
  },
  {
    "id": "wonder-woman",
    "slug": "wonder-woman",
    "name": "Wonder Woman",
    "alias": "Diana Prince",
    "category_slug": "comics",
    "universe": "Comics",
    "universeSlug": "comics",
    "accentColor": "#FB7185",
    "archetype": "Amazon",
    "origin": "DC Comics",
    "faction": "Justice League",
    "tagline": "I am Diana of Themyscira, Princess of the Amazons.",
    "biography": "An Amazon princess with superhuman strength and the Lasso of Truth.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg",
    "stats_json": [
      {
        "label": "Strength",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Wisdom",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "stats": [
      {
        "label": "Strength",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Wisdom",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "details_json": {
      "firstAppearance": "DC Comics Archival Debut",
      "weapon": "Amazon Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An Amazon princess with superhuman strength and the Lasso of Truth.",
      "universe": "DC",
      "species": "Amazon"
    },
    "details": {
      "firstAppearance": "DC Comics Archival Debut",
      "weapon": "Amazon Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An Amazon princess with superhuman strength and the Lasso of Truth.",
      "universe": "DC",
      "species": "Amazon"
    }
  },
  {
    "id": "superman",
    "slug": "superman",
    "name": "Superman",
    "alias": "Clark Kent",
    "category_slug": "comics",
    "universe": "Comics",
    "universeSlug": "comics",
    "accentColor": "#FB7185",
    "archetype": "Kryptonian",
    "origin": "DC Comics",
    "faction": "Justice League",
    "tagline": "Truth, justice, and the American way.",
    "biography": "An alien from Krypton with extraordinary powers, raised as a human in Kansas.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg",
    "stats_json": [
      {
        "label": "Strength",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Flight",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "stats": [
      {
        "label": "Strength",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Flight",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "details_json": {
      "firstAppearance": "DC Comics Archival Debut",
      "weapon": "Kryptonian Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An alien from Krypton with extraordinary powers, raised as a human in Kansas.",
      "universe": "DC",
      "species": "Kryptonian"
    },
    "details": {
      "firstAppearance": "DC Comics Archival Debut",
      "weapon": "Kryptonian Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An alien from Krypton with extraordinary powers, raised as a human in Kansas.",
      "universe": "DC",
      "species": "Kryptonian"
    }
  },
  {
    "id": "iron-man",
    "slug": "iron-man",
    "name": "Iron Man",
    "alias": "Tony Stark",
    "category_slug": "comics",
    "universe": "Comics",
    "universeSlug": "comics",
    "accentColor": "#FB7185",
    "archetype": "Genius Inventor",
    "origin": "Marvel Comics",
    "faction": "Avengers",
    "tagline": "Genius, billionaire, playboy, philanthropist.",
    "biography": "A brilliant engineer who creates advanced armor to fight evil.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg",
    "stats_json": [
      {
        "label": "Engineering",
        "value": 99,
        "max": 100,
        "textValue": "99%"
      },
      {
        "label": "Power",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "stats": [
      {
        "label": "Engineering",
        "value": 99,
        "max": 100,
        "textValue": "99%"
      },
      {
        "label": "Power",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "details_json": {
      "firstAppearance": "Marvel Comics Archival Debut",
      "weapon": "Genius Inventor Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A brilliant engineer who creates advanced armor to fight evil.",
      "universe": "Marvel",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Marvel Comics Archival Debut",
      "weapon": "Genius Inventor Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A brilliant engineer who creates advanced armor to fight evil.",
      "universe": "Marvel",
      "species": "Human"
    }
  },
  {
    "id": "black-widow",
    "slug": "black-widow",
    "name": "Black Widow",
    "alias": "Natasha Romanoff",
    "category_slug": "comics",
    "universe": "Comics",
    "universeSlug": "comics",
    "accentColor": "#FB7185",
    "archetype": "Assassin",
    "origin": "Marvel Comics",
    "faction": "Avengers",
    "tagline": "I'm always picking up after you boys.",
    "biography": "A highly trained spy and assassin turned hero, fighting for redemption.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/107-black-widow.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/107-black-widow.jpg",
    "stats_json": [
      {
        "label": "Espionage",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Combat",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      }
    ],
    "stats": [
      {
        "label": "Espionage",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Combat",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      }
    ],
    "details_json": {
      "firstAppearance": "Marvel Comics Archival Debut",
      "weapon": "Assassin Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A highly trained spy and assassin turned hero, fighting for redemption.",
      "universe": "Marvel",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Marvel Comics Archival Debut",
      "weapon": "Assassin Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A highly trained spy and assassin turned hero, fighting for redemption.",
      "universe": "Marvel",
      "species": "Human"
    }
  },
  {
    "id": "the-flash",
    "slug": "the-flash",
    "name": "The Flash",
    "alias": "Barry Allen",
    "category_slug": "comics",
    "universe": "Comics",
    "universeSlug": "comics",
    "accentColor": "#FB7185",
    "archetype": "Speedster",
    "origin": "DC Comics",
    "faction": "Justice League",
    "tagline": "My name is Barry Allen, and I'm the fastest man alive.",
    "biography": "A forensic scientist struck by lightning, gaining super speed powers.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/263-flash.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/263-flash.jpg",
    "stats_json": [
      {
        "label": "Speed",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Agility",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Speed",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Agility",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "DC Comics Archival Debut",
      "weapon": "Speedster Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A forensic scientist struck by lightning, gaining super speed powers.",
      "universe": "DC",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "DC Comics Archival Debut",
      "weapon": "Speedster Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A forensic scientist struck by lightning, gaining super speed powers.",
      "universe": "DC",
      "species": "Human"
    }
  },
  {
    "id": "saitama",
    "slug": "saitama",
    "name": "Saitama",
    "alias": "One Punch Man",
    "category_slug": "manga",
    "universe": "Manga",
    "universeSlug": "manga",
    "accentColor": "#FB923C",
    "archetype": "Hero",
    "origin": "One Punch Man",
    "faction": "Hero Association",
    "tagline": "I'm just a hero for fun.",
    "biography": "A hero who can defeat any opponent with a single punch, but is bored with his power.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b73935-ON5d0mAcrItd.jpg",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b73935-ON5d0mAcrItd.jpg",
    "stats_json": [
      {
        "label": "Strength",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Speed",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "stats": [
      {
        "label": "Strength",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Speed",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "details_json": {
      "firstAppearance": "One Punch Man Archival Debut",
      "weapon": "Hero Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A hero who can defeat any opponent with a single punch, but is bored with his power.",
      "universe": "One Punch Man",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "One Punch Man Archival Debut",
      "weapon": "Hero Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A hero who can defeat any opponent with a single punch, but is bored with his power.",
      "universe": "One Punch Man",
      "species": "Human"
    }
  },
  {
    "id": "eren-yeager",
    "slug": "eren-yeager",
    "name": "Eren Yeager",
    "alias": "Eren Jaeger",
    "category_slug": "manga",
    "universe": "Manga",
    "universeSlug": "manga",
    "accentColor": "#FB923C",
    "archetype": "Revolutionary",
    "origin": "Attack on Titan",
    "faction": "Survey Corps",
    "tagline": "I will destroy all the Titans.",
    "biography": "A young man who swears revenge on the Titans after they destroy his hometown.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b40882-dsj7IP943WFF.jpg",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b40882-dsj7IP943WFF.jpg",
    "stats_json": [
      {
        "label": "Determination",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Agility",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "stats": [
      {
        "label": "Determination",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Agility",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "details_json": {
      "firstAppearance": "Attack on Titan Archival Debut",
      "weapon": "Revolutionary Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A young man who swears revenge on the Titans after they destroy his hometown.",
      "universe": "Attack on Titan",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Attack on Titan Archival Debut",
      "weapon": "Revolutionary Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A young man who swears revenge on the Titans after they destroy his hometown.",
      "universe": "Attack on Titan",
      "species": "Human"
    }
  },
  {
    "id": "light-yagami",
    "slug": "light-yagami",
    "name": "Light Yagami",
    "alias": "Kira",
    "category_slug": "manga",
    "universe": "Manga",
    "universeSlug": "manga",
    "accentColor": "#FB923C",
    "archetype": "Genius",
    "origin": "Death Note",
    "faction": "Kira",
    "tagline": "I am the god of the new world.",
    "biography": "A genius high school student who gains the power to kill with a notebook.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b80-26EhwSsSqQ50.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b80-26EhwSsSqQ50.png",
    "stats_json": [
      {
        "label": "Intelligence",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Manipulation",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Intelligence",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Manipulation",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "Death Note Archival Debut",
      "weapon": "Genius Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A genius high school student who gains the power to kill with a notebook.",
      "universe": "Death Note",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Death Note Archival Debut",
      "weapon": "Genius Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A genius high school student who gains the power to kill with a notebook.",
      "universe": "Death Note",
      "species": "Human"
    }
  },
  {
    "id": "tanjiro-kamado",
    "slug": "tanjiro-kamado",
    "name": "Tanjiro Kamado",
    "alias": "Demon Slayer",
    "category_slug": "manga",
    "universe": "Manga",
    "universeSlug": "manga",
    "accentColor": "#FB923C",
    "archetype": "Swordsman",
    "origin": "Demon Slayer",
    "faction": "Demon Slayer Corps",
    "tagline": "I'll save everyone.",
    "biography": "A young demon slayer who fights to turn his sister back into a human.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png",
    "stats_json": [
      {
        "label": "Swordsmanship",
        "value": 93,
        "max": 100,
        "textValue": "93%"
      },
      {
        "label": "Determination",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      }
    ],
    "stats": [
      {
        "label": "Swordsmanship",
        "value": 93,
        "max": 100,
        "textValue": "93%"
      },
      {
        "label": "Determination",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      }
    ],
    "details_json": {
      "firstAppearance": "Demon Slayer Archival Debut",
      "weapon": "Swordsman Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A young demon slayer who fights to turn his sister back into a human.",
      "universe": "Demon Slayer",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Demon Slayer Archival Debut",
      "weapon": "Swordsman Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A young demon slayer who fights to turn his sister back into a human.",
      "universe": "Demon Slayer",
      "species": "Human"
    }
  },
  {
    "id": "mob",
    "slug": "mob",
    "name": "Mob",
    "alias": "Shigeo Kageyama",
    "category_slug": "manga",
    "universe": "Manga",
    "universeSlug": "manga",
    "accentColor": "#FB923C",
    "archetype": "Psychic",
    "origin": "Mob Psycho 100",
    "faction": "Spirit Medium Association",
    "tagline": "I'm not special.",
    "biography": "A middle school student with overwhelming psychic powers seeking normalcy.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b89616-dXmdOc7L6SDi.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b89616-dXmdOc7L6SDi.png",
    "stats_json": [
      {
        "label": "Psychic Power",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Growth",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Psychic Power",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Growth",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "Mob Psycho 100 Archival Debut",
      "weapon": "Psychic Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A middle school student with overwhelming psychic powers seeking normalcy.",
      "universe": "Mob Psycho 100",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Mob Psycho 100 Archival Debut",
      "weapon": "Psychic Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A middle school student with overwhelming psychic powers seeking normalcy.",
      "universe": "Mob Psycho 100",
      "species": "Human"
    }
  },
  {
    "id": "yuji-itadori",
    "slug": "yuji-itadori",
    "name": "Yuji Itadori",
    "alias": "Sukuna's Vessel",
    "category_slug": "manga",
    "universe": "Manga",
    "universeSlug": "manga",
    "accentColor": "#FB923C",
    "archetype": "Sorcerer",
    "origin": "Jujutsu Kaisen",
    "faction": "Tokyo Jujutsu High",
    "tagline": "I will save everyone.",
    "biography": "A high schooler who swallows a cursed finger and becomes the vessel of a powerful demon.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b127212-FVm2tD0erQ5B.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b127212-FVm2tD0erQ5B.png",
    "stats_json": [
      {
        "label": "Cursed Energy",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      },
      {
        "label": "Combat",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "stats": [
      {
        "label": "Cursed Energy",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      },
      {
        "label": "Combat",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "details_json": {
      "firstAppearance": "Jujutsu Kaisen Archival Debut",
      "weapon": "Sorcerer Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A high schooler who swallows a cursed finger and becomes the vessel of a powerful demon.",
      "universe": "Jujutsu Kaisen",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Jujutsu Kaisen Archival Debut",
      "weapon": "Sorcerer Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A high schooler who swallows a cursed finger and becomes the vessel of a powerful demon.",
      "universe": "Jujutsu Kaisen",
      "species": "Human"
    }
  },
  {
    "id": "deku",
    "slug": "deku",
    "name": "Deku",
    "alias": "Izuku Midoriya",
    "category_slug": "manga",
    "universe": "Manga",
    "universeSlug": "manga",
    "accentColor": "#FB923C",
    "archetype": "Hero-in-Training",
    "origin": "My Hero Academia",
    "faction": "U.A. High School",
    "tagline": "Plus Ultra!",
    "biography": "A quirkless boy who gains superpowers and becomes a hero in training.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b89028-8w1I9o1ISHMg.png",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b89028-8w1I9o1ISHMg.png",
    "stats_json": [
      {
        "label": "Quirk",
        "value": 88,
        "max": 100,
        "textValue": "88%"
      },
      {
        "label": "Determination",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      }
    ],
    "stats": [
      {
        "label": "Quirk",
        "value": 88,
        "max": 100,
        "textValue": "88%"
      },
      {
        "label": "Determination",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      }
    ],
    "details_json": {
      "firstAppearance": "My Hero Academia Archival Debut",
      "weapon": "Hero-in-Training Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A quirkless boy who gains superpowers and becomes a hero in training.",
      "universe": "My Hero Academia",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "My Hero Academia Archival Debut",
      "weapon": "Hero-in-Training Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A quirkless boy who gains superpowers and becomes a hero in training.",
      "universe": "My Hero Academia",
      "species": "Human"
    }
  },
  {
    "id": "darth-vader",
    "slug": "darth-vader",
    "name": "Darth Vader",
    "alias": "Anakin Skywalker",
    "category_slug": "cosplay",
    "universe": "Cosplay",
    "universeSlug": "cosplay",
    "accentColor": "#C084FC",
    "archetype": "Sith Lord",
    "origin": "Star Wars",
    "faction": "Galactic Empire",
    "tagline": "I am your father.",
    "biography": "A former Jedi turned Sith Lord, known for his black armor and deep voice.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/208-darth-vader.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/208-darth-vader.jpg",
    "stats_json": [
      {
        "label": "Dark Side",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Power",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Dark Side",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Power",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "Star Wars Archival Debut",
      "weapon": "Sith Lord Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A former Jedi turned Sith Lord, known for his black armor and deep voice.",
      "universe": "Star Wars",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Star Wars Archival Debut",
      "weapon": "Sith Lord Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A former Jedi turned Sith Lord, known for his black armor and deep voice.",
      "universe": "Star Wars",
      "species": "Human"
    }
  },
  {
    "id": "harley-quinn",
    "slug": "harley-quinn",
    "name": "Harley Quinn",
    "alias": "Harleen Quinzel",
    "category_slug": "cosplay",
    "universe": "Cosplay",
    "universeSlug": "cosplay",
    "accentColor": "#C084FC",
    "archetype": "Jester",
    "origin": "DC Comics",
    "faction": "Suicide Squad",
    "tagline": "Who's the bad guy now?",
    "biography": "A former psychiatrist turned criminal, known for her playful and chaotic nature.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/309-harley-quinn.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/309-harley-quinn.jpg",
    "stats_json": [
      {
        "label": "Acrobatics",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      },
      {
        "label": "Chaos",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "stats": [
      {
        "label": "Acrobatics",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      },
      {
        "label": "Chaos",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "details_json": {
      "firstAppearance": "DC Comics Archival Debut",
      "weapon": "Jester Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A former psychiatrist turned criminal, known for her playful and chaotic nature.",
      "universe": "DC",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "DC Comics Archival Debut",
      "weapon": "Jester Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A former psychiatrist turned criminal, known for her playful and chaotic nature.",
      "universe": "DC",
      "species": "Human"
    }
  },
  {
    "id": "mario",
    "slug": "mario",
    "name": "Mario",
    "alias": "Super Mario",
    "category_slug": "cosplay",
    "universe": "Cosplay",
    "universeSlug": "cosplay",
    "accentColor": "#C084FC",
    "archetype": "Plumber",
    "origin": "Super Mario",
    "faction": "Mushroom Kingdom",
    "tagline": "It's-a me, Mario!",
    "biography": "A famous plumber who saves Princess Peach from Bowser.",
    "image_url": "https://upload.wikimedia.org/wikipedia/en/5/5c/Mario_by_Shigehisa_Nakaue.png",
    "image": "https://upload.wikimedia.org/wikipedia/en/5/5c/Mario_by_Shigehisa_Nakaue.png",
    "stats_json": [
      {
        "label": "Jumping",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Adventure",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Jumping",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Adventure",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "Super Mario Archival Debut",
      "weapon": "Plumber Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A famous plumber who saves Princess Peach from Bowser.",
      "universe": "Super Mario",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Super Mario Archival Debut",
      "weapon": "Plumber Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A famous plumber who saves Princess Peach from Bowser.",
      "universe": "Super Mario",
      "species": "Human"
    }
  },
  {
    "id": "pikachu",
    "slug": "pikachu",
    "name": "Pikachu",
    "alias": "Electric Mouse",
    "category_slug": "cosplay",
    "universe": "Cosplay",
    "universeSlug": "cosplay",
    "accentColor": "#C084FC",
    "archetype": "Pokemon",
    "origin": "Pokemon",
    "faction": "Team Pikachu",
    "tagline": "Pika Pika!",
    "biography": "An electric-type Pokemon known for its iconic \"Pika Pika\" cry and powerful attacks.",
    "image_url": "https://s4.anilist.co/file/anilistcdn/character/large/b3891-edgrZOgCJ9do.jpg",
    "image": "https://s4.anilist.co/file/anilistcdn/character/large/b3891-edgrZOgCJ9do.jpg",
    "stats_json": [
      {
        "label": "Electric",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Speed",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      }
    ],
    "stats": [
      {
        "label": "Electric",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Speed",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      }
    ],
    "details_json": {
      "firstAppearance": "Pokemon Archival Debut",
      "weapon": "Pokemon Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An electric-type Pokemon known for its iconic \"Pika Pika\" cry and powerful attacks.",
      "universe": "Pokemon",
      "species": "Electric Mouse"
    },
    "details": {
      "firstAppearance": "Pokemon Archival Debut",
      "weapon": "Pokemon Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An electric-type Pokemon known for its iconic \"Pika Pika\" cry and powerful attacks.",
      "universe": "Pokemon",
      "species": "Electric Mouse"
    }
  },
  {
    "id": "wolverine",
    "slug": "wolverine",
    "name": "Wolverine",
    "alias": "Logan",
    "category_slug": "cosplay",
    "universe": "Cosplay",
    "universeSlug": "cosplay",
    "accentColor": "#C084FC",
    "archetype": "Mutant",
    "origin": "Marvel Comics",
    "faction": "X-Men",
    "tagline": "The best there is at what I do.",
    "biography": "A mutant with healing powers and retractable adamantium claws, seeking redemption.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg",
    "stats_json": [
      {
        "label": "Regeneration",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Combat",
        "value": 94,
        "max": 100,
        "textValue": "94%"
      }
    ],
    "stats": [
      {
        "label": "Regeneration",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Combat",
        "value": 94,
        "max": 100,
        "textValue": "94%"
      }
    ],
    "details_json": {
      "firstAppearance": "Marvel Comics Archival Debut",
      "weapon": "Mutant Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A mutant with healing powers and retractable adamantium claws, seeking redemption.",
      "universe": "Marvel",
      "species": "Mutant"
    },
    "details": {
      "firstAppearance": "Marvel Comics Archival Debut",
      "weapon": "Mutant Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A mutant with healing powers and retractable adamantium claws, seeking redemption.",
      "universe": "Marvel",
      "species": "Mutant"
    }
  },
  {
    "id": "deadpool",
    "slug": "deadpool",
    "name": "Deadpool",
    "alias": "Wade Wilson",
    "category_slug": "cosplay",
    "universe": "Cosplay",
    "universeSlug": "cosplay",
    "accentColor": "#C084FC",
    "archetype": "Mercenary",
    "origin": "Marvel Comics",
    "faction": "Merc with a Mouth",
    "tagline": "Maximum effort!",
    "biography": "A wisecracking mercenary with a healing factor and a love for chaos.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg",
    "stats_json": [
      {
        "label": "Humor",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Combat",
        "value": 88,
        "max": 100,
        "textValue": "88%"
      }
    ],
    "stats": [
      {
        "label": "Humor",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Combat",
        "value": 88,
        "max": 100,
        "textValue": "88%"
      }
    ],
    "details_json": {
      "firstAppearance": "Marvel Comics Archival Debut",
      "weapon": "Mercenary Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A wisecracking mercenary with a healing factor and a love for chaos.",
      "universe": "Marvel",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Marvel Comics Archival Debut",
      "weapon": "Mercenary Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A wisecracking mercenary with a healing factor and a love for chaos.",
      "universe": "Marvel",
      "species": "Human"
    }
  },
  {
    "id": "joker",
    "slug": "joker",
    "name": "Joker",
    "alias": "The Clown Prince of Crime",
    "category_slug": "cosplay",
    "universe": "Cosplay",
    "universeSlug": "cosplay",
    "accentColor": "#C084FC",
    "archetype": "Criminal",
    "origin": "DC Comics",
    "faction": "None",
    "tagline": "Why so serious?",
    "biography": "Batman's arch-nemesis, a chaotic criminal mastermind with a twisted sense of humor.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/370-joker.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/370-joker.jpg",
    "stats_json": [
      {
        "label": "Chaos",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Intelligence",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      }
    ],
    "stats": [
      {
        "label": "Chaos",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Intelligence",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      }
    ],
    "details_json": {
      "firstAppearance": "DC Comics Archival Debut",
      "weapon": "Criminal Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "Batman's arch-nemesis, a chaotic criminal mastermind with a twisted sense of humor.",
      "universe": "DC",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "DC Comics Archival Debut",
      "weapon": "Criminal Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "Batman's arch-nemesis, a chaotic criminal mastermind with a twisted sense of humor.",
      "universe": "DC",
      "species": "Human"
    }
  },
  {
    "id": "sherlock-holmes-canon",
    "slug": "sherlock-holmes-canon",
    "name": "Sherlock Holmes (221B Canon)",
    "alias": "The Consulting Detective",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Detective",
    "origin": "Arthur Conan Doyle's stories",
    "faction": "Baker Street",
    "tagline": "The game is afoot.",
    "biography": "A brilliant detective known for his logical reasoning and forensic skills.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Sherlock_Holmes_Portrait_Paget.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Sherlock_Holmes_Portrait_Paget.jpg",
    "stats_json": [
      {
        "label": "Intelligence",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Observation",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "stats": [
      {
        "label": "Intelligence",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Observation",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "details_json": {
      "firstAppearance": "Arthur Conan Doyle's stories Archival Debut",
      "weapon": "Detective Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A brilliant detective known for his logical reasoning and forensic skills.",
      "universe": "Sherlock Holmes",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Arthur Conan Doyle's stories Archival Debut",
      "weapon": "Detective Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A brilliant detective known for his logical reasoning and forensic skills.",
      "universe": "Sherlock Holmes",
      "species": "Human"
    }
  },
  {
    "id": "the-doctor",
    "slug": "the-doctor",
    "name": "The Doctor",
    "alias": "The Time Lord",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Time Traveler",
    "origin": "Doctor Who",
    "faction": "Gallifrey",
    "tagline": "Allons-y!",
    "biography": "A time-traveling alien who explores the universe in the TARDIS.",
    "image_url": "https://upload.wikimedia.org/wikipedia/en/2/21/Tenth_Doctor_%28Doctor_Who%29.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/en/2/21/Tenth_Doctor_%28Doctor_Who%29.jpg",
    "stats_json": [
      {
        "label": "Regeneration",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Wisdom",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Regeneration",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Wisdom",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "Doctor Who Archival Debut",
      "weapon": "Time Traveler Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A time-traveling alien who explores the universe in the TARDIS.",
      "universe": "Doctor Who",
      "species": "Time Lord"
    },
    "details": {
      "firstAppearance": "Doctor Who Archival Debut",
      "weapon": "Time Traveler Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A time-traveling alien who explores the universe in the TARDIS.",
      "universe": "Doctor Who",
      "species": "Time Lord"
    }
  },
  {
    "id": "hermione-granger",
    "slug": "hermione-granger",
    "name": "Hermione Granger",
    "alias": "The Brightest Witch",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Witch",
    "origin": "Harry Potter",
    "faction": "Gryffindor",
    "tagline": "I'm going to bed before either of you come up with another clever idea to get us killed.",
    "biography": "A brilliant witch known for her intelligence and loyalty.",
    "image_url": "https://upload.wikimedia.org/wikipedia/en/d/d3/Hermione_Granger_poster.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/en/d/d3/Hermione_Granger_poster.jpg",
    "stats_json": [
      {
        "label": "Intelligence",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Loyalty",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Intelligence",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Loyalty",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "Harry Potter Archival Debut",
      "weapon": "Witch Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A brilliant witch known for her intelligence and loyalty.",
      "universe": "Harry Potter",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Harry Potter Archival Debut",
      "weapon": "Witch Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A brilliant witch known for her intelligence and loyalty.",
      "universe": "Harry Potter",
      "species": "Human"
    }
  },
  {
    "id": "harry-potter",
    "slug": "harry-potter",
    "name": "Harry Potter",
    "alias": "The Boy Who Lived",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Wizard",
    "origin": "Harry Potter",
    "faction": "Gryffindor",
    "tagline": "I'm not really famous for anything.",
    "biography": "A young wizard destined to defeat the dark wizard Voldemort.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/310-harry-potter.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/310-harry-potter.jpg",
    "stats_json": [
      {
        "label": "Magic",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      },
      {
        "label": "Courage",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Magic",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      },
      {
        "label": "Courage",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "Harry Potter Archival Debut",
      "weapon": "Wizard Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A young wizard destined to defeat the dark wizard Voldemort.",
      "universe": "Harry Potter",
      "species": "Wizard"
    },
    "details": {
      "firstAppearance": "Harry Potter Archival Debut",
      "weapon": "Wizard Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A young wizard destined to defeat the dark wizard Voldemort.",
      "universe": "Harry Potter",
      "species": "Wizard"
    }
  },
  {
    "id": "dumbledore",
    "slug": "dumbledore",
    "name": "Dumbledore",
    "alias": "Albus Percival Wulfric Brian Dumbledore",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Sage",
    "origin": "Harry Potter",
    "faction": "Hogwarts",
    "tagline": "It is our choices that show what we truly are.",
    "biography": "The most powerful wizard of his time, known for his wisdom and kindness.",
    "image_url": "https://upload.wikimedia.org/wikipedia/en/e/e8/Dumbledore_-_Prisoner_of_Azkaban.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/en/e/e8/Dumbledore_-_Prisoner_of_Azkaban.jpg",
    "stats_json": [
      {
        "label": "Magic",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Wisdom",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "stats": [
      {
        "label": "Magic",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      },
      {
        "label": "Wisdom",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "details_json": {
      "firstAppearance": "Harry Potter Archival Debut",
      "weapon": "Sage Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "The most powerful wizard of his time, known for his wisdom and kindness.",
      "universe": "Harry Potter",
      "species": "Wizard"
    },
    "details": {
      "firstAppearance": "Harry Potter Archival Debut",
      "weapon": "Sage Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "The most powerful wizard of his time, known for his wisdom and kindness.",
      "universe": "Harry Potter",
      "species": "Wizard"
    }
  },
  {
    "id": "gandalf",
    "slug": "gandalf",
    "name": "Gandalf",
    "alias": "Gandalf the Grey",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Wizard",
    "origin": "The Lord of the Rings",
    "faction": "Fellowship",
    "tagline": "You shall not pass!",
    "biography": "An ancient wizard and mentor to hobbits, fighting against the forces of darkness.",
    "image_url": "https://upload.wikimedia.org/wikipedia/en/b/bd/Gandalf_from_The_Trolls_are_Turned_to_Stone_-_J.R.R_Tolkien.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/en/b/bd/Gandalf_from_The_Trolls_are_Turned_to_Stone_-_J.R.R_Tolkien.jpg",
    "stats_json": [
      {
        "label": "Magic",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Leadership",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Magic",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Leadership",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "The Lord of the Rings Archival Debut",
      "weapon": "Wizard Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An ancient wizard and mentor to hobbits, fighting against the forces of darkness.",
      "universe": "The Lord of the Rings",
      "species": "Maiar"
    },
    "details": {
      "firstAppearance": "The Lord of the Rings Archival Debut",
      "weapon": "Wizard Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An ancient wizard and mentor to hobbits, fighting against the forces of darkness.",
      "universe": "The Lord of the Rings",
      "species": "Maiar"
    }
  },
  {
    "id": "frodo-baggins",
    "slug": "frodo-baggins",
    "name": "Frodo Baggins",
    "alias": "Frodo",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Hobbit",
    "origin": "The Lord of the Rings",
    "faction": "Fellowship",
    "tagline": "I wish it need not have happened in my time.",
    "biography": "A small hobbit entrusted with the One Ring and the fate of Middle-earth.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/95/Elijah_Wood_at_the_2025_Sundance_Film_Festival_%28cropped%292.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/95/Elijah_Wood_at_the_2025_Sundance_Film_Festival_%28cropped%292.jpg",
    "stats_json": [
      {
        "label": "Resilience",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Determination",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      }
    ],
    "stats": [
      {
        "label": "Resilience",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Determination",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      }
    ],
    "details_json": {
      "firstAppearance": "The Lord of the Rings Archival Debut",
      "weapon": "Hobbit Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A small hobbit entrusted with the One Ring and the fate of Middle-earth.",
      "universe": "The Lord of the Rings",
      "species": "Hobbit"
    },
    "details": {
      "firstAppearance": "The Lord of the Rings Archival Debut",
      "weapon": "Hobbit Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A small hobbit entrusted with the One Ring and the fate of Middle-earth.",
      "universe": "The Lord of the Rings",
      "species": "Hobbit"
    }
  },
  {
    "id": "aragorn",
    "slug": "aragorn",
    "name": "Aragorn",
    "alias": "Strider",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Ranger",
    "origin": "The Lord of the Rings",
    "faction": "Dúnedain",
    "tagline": "A wizard is never late.",
    "biography": "A ranger and rightful king of Gondor who leads the free peoples against darkness.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/30/Viggo_Mortensen%2C_director_y_actor%2C_en_AWFF_2024_%28cropped%29.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/30/Viggo_Mortensen%2C_director_y_actor%2C_en_AWFF_2024_%28cropped%29.jpg",
    "stats_json": [
      {
        "label": "Swordsmanship",
        "value": 94,
        "max": 100,
        "textValue": "94%"
      },
      {
        "label": "Leadership",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      }
    ],
    "stats": [
      {
        "label": "Swordsmanship",
        "value": 94,
        "max": 100,
        "textValue": "94%"
      },
      {
        "label": "Leadership",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      }
    ],
    "details_json": {
      "firstAppearance": "The Lord of the Rings Archival Debut",
      "weapon": "Ranger Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A ranger and rightful king of Gondor who leads the free peoples against darkness.",
      "universe": "The Lord of the Rings",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "The Lord of the Rings Archival Debut",
      "weapon": "Ranger Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A ranger and rightful king of Gondor who leads the free peoples against darkness.",
      "universe": "The Lord of the Rings",
      "species": "Human"
    }
  },
  {
    "id": "luke-skywalker",
    "slug": "luke-skywalker",
    "name": "Luke Skywalker",
    "alias": "The Last Jedi",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Jedi",
    "origin": "Star Wars",
    "faction": "Jedi Order",
    "tagline": "May the Force be with you.",
    "biography": "A young Jedi knight who learns the ways of the Force and defeats the Empire.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/418-luke-skywalker.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/418-luke-skywalker.jpg",
    "stats_json": [
      {
        "label": "Force",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Lightsaber",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      }
    ],
    "stats": [
      {
        "label": "Force",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Lightsaber",
        "value": 92,
        "max": 100,
        "textValue": "92%"
      }
    ],
    "details_json": {
      "firstAppearance": "Star Wars Archival Debut",
      "weapon": "Jedi Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A young Jedi knight who learns the ways of the Force and defeats the Empire.",
      "universe": "Star Wars",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "Star Wars Archival Debut",
      "weapon": "Jedi Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A young Jedi knight who learns the ways of the Force and defeats the Empire.",
      "universe": "Star Wars",
      "species": "Human"
    }
  },
  {
    "id": "katniss-everdeen",
    "slug": "katniss-everdeen",
    "name": "Katniss Everdeen",
    "alias": "The Mockingjay",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Rebel",
    "origin": "The Hunger Games",
    "faction": "District 12",
    "tagline": "If we burn, you burn with us.",
    "biography": "A skilled archer who becomes the symbol of rebellion against an oppressive regime.",
    "image_url": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/381-katniss-everdeen.jpg",
    "image": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/381-katniss-everdeen.jpg",
    "stats_json": [
      {
        "label": "Archery",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Survival",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "stats": [
      {
        "label": "Archery",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Survival",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      }
    ],
    "details_json": {
      "firstAppearance": "The Hunger Games Archival Debut",
      "weapon": "Rebel Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A skilled archer who becomes the symbol of rebellion against an oppressive regime.",
      "universe": "The Hunger Games",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "The Hunger Games Archival Debut",
      "weapon": "Rebel Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A skilled archer who becomes the symbol of rebellion against an oppressive regime.",
      "universe": "The Hunger Games",
      "species": "Human"
    }
  },
  {
    "id": "eowyn",
    "slug": "eowyn",
    "name": "Eowyn",
    "alias": "The Last Rider of Rohan",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Warrior",
    "origin": "The Lord of the Rings",
    "faction": "Rohan",
    "tagline": "A day may come when the courage of men fails.",
    "biography": "A shield maiden of Rohan who disguises herself as a male warrior to fight in battle.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Miranda_Otto_by_Gage_Skidmore.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Miranda_Otto_by_Gage_Skidmore.jpg",
    "stats_json": [
      {
        "label": "Courage",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      },
      {
        "label": "Swordsmanship",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "stats": [
      {
        "label": "Courage",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      },
      {
        "label": "Swordsmanship",
        "value": 90,
        "max": 100,
        "textValue": "90%"
      }
    ],
    "details_json": {
      "firstAppearance": "The Lord of the Rings Archival Debut",
      "weapon": "Warrior Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A shield maiden of Rohan who disguises herself as a male warrior to fight in battle.",
      "universe": "The Lord of the Rings",
      "species": "Human"
    },
    "details": {
      "firstAppearance": "The Lord of the Rings Archival Debut",
      "weapon": "Warrior Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A shield maiden of Rohan who disguises herself as a male warrior to fight in battle.",
      "universe": "The Lord of the Rings",
      "species": "Human"
    }
  },
  {
    "id": "gollum",
    "slug": "gollum",
    "name": "Gollum",
    "alias": "Sméagol",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Creature",
    "origin": "The Lord of the Rings",
    "faction": "None",
    "tagline": "My precious.",
    "biography": "A corrupted creature obsessed with the One Ring, torn between good and evil.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Gollum_at_Wellington_Airport.jpg/3840px-Gollum_at_Wellington_Airport.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Gollum_at_Wellington_Airport.jpg/3840px-Gollum_at_Wellington_Airport.jpg",
    "stats_json": [
      {
        "label": "Stealth",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Corruption",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "stats": [
      {
        "label": "Stealth",
        "value": 95,
        "max": 100,
        "textValue": "95%"
      },
      {
        "label": "Corruption",
        "value": 100,
        "max": 100,
        "textValue": "100%"
      }
    ],
    "details_json": {
      "firstAppearance": "The Lord of the Rings Archival Debut",
      "weapon": "Creature Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A corrupted creature obsessed with the One Ring, torn between good and evil.",
      "universe": "The Lord of the Rings",
      "species": "Creature"
    },
    "details": {
      "firstAppearance": "The Lord of the Rings Archival Debut",
      "weapon": "Creature Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "A corrupted creature obsessed with the One Ring, torn between good and evil.",
      "universe": "The Lord of the Rings",
      "species": "Creature"
    }
  },
  {
    "id": "legolas",
    "slug": "legolas",
    "name": "Legolas",
    "alias": "The Elf Archer",
    "category_slug": "community-vault",
    "universe": "Community Vault",
    "universeSlug": "community-vault",
    "accentColor": "#34D399",
    "archetype": "Archer",
    "origin": "The Lord of the Rings",
    "faction": "Fellowship",
    "tagline": "And my bow!",
    "biography": "An elf archer from Mirkwood known for his archery skills and grace in battle.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Orlando_Bloom-9047_%28cropped%29.jpg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Orlando_Bloom-9047_%28cropped%29.jpg",
    "stats_json": [
      {
        "label": "Archery",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Agility",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      }
    ],
    "stats": [
      {
        "label": "Archery",
        "value": 98,
        "max": 100,
        "textValue": "98%"
      },
      {
        "label": "Agility",
        "value": 96,
        "max": 100,
        "textValue": "96%"
      }
    ],
    "details_json": {
      "firstAppearance": "The Lord of the Rings Archival Debut",
      "weapon": "Archer Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An elf archer from Mirkwood known for his archery skills and grace in battle.",
      "universe": "The Lord of the Rings",
      "species": "Elf"
    },
    "details": {
      "firstAppearance": "The Lord of the Rings Archival Debut",
      "weapon": "Archer Arsenal",
      "nemesis": "Multiverse Antagonist",
      "bio": "An elf archer from Mirkwood known for his archery skills and grace in battle.",
      "universe": "The Lord of the Rings",
      "species": "Elf"
    }
  }
]

export const ARTICLES_DATA = [
  {
    "id": "art-anime-jjk",
    "slug": "jujutsu-kaisen-shinjuku-showdown",
    "topicLabel": "Jujutsu Kaisen Shinjuku Showdown",
    "title": "Jujutsu Kaisen: Shinjuku Showdown Arc & Domain Clash Mechanics",
    "subtitle": "How Gojo Satoru vs. Ryomen Sukuna rewrote the fundamental rules of barrier jujutsu, binding vows, and modern shonen fight choreography.",
    "category_slug": "anime",
    "universe": "anime",
    "universeName": "Anime",
    "content_type": "ARTICLE",
    "accentColor": "#A3E635",
    "author": "Kenji Takahashi",
    "artist_or_author": "Kenji Takahashi",
    "authorRole": "Senior Sakuga & Lore Analyst",
    "publishedAt": "Sept 18, 2026",
    "release_date": "2026-09-18",
    "readTime": "7 MIN READ",
    "duration": "7 MIN READ",
    "duration_seconds": 420,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 99.4,
    "popularity_score": 99.4,
    "viewCount": 142800,
    "view_count": 142800,
    "rating": 4.9,
    "ratingsCount": 1240,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Simulcasts",
      "Character Lore",
      "Domain Expansion",
      "MAPPA"
    ],
    "synopsis": "An exhaustive technical breakdown of the Shinjuku Showdown—examining open-barrier Malevolent Shrine vs. Unlimited Void, Reverse Cursed Technique burnout recovery, and the animation production pipeline behind the decade’s biggest battle.",
    "body_text": "## 01. Open vs. Closed Barrier Physics in Shinjuku\n\nFor over two hundred chapters, Gege Akutami seeded the mechanics of Domain Expansion as the apex of Jujutsu sorcery. Yet until December 24 in Shinjuku, readers had never witnessed how an open-barrier masterpiece like Malevolent Shrine interacts with the metaphysical perfection of Unlimited Void.\n\nRather than a simple power-level tug-of-war, the five consecutive domain clashes operated like high-stakes systems engineering. By flipping his barrier conditions—strengthening the outer shell against Sukuna’s slashing radius at the cost of internal stability—Gojo demonstrated why combat improvisation matters more than raw cursed energy reserves.\n\n> “Inside the Prison Realm, experiencing a dimension with no physical volume taught Gojo how to compress an infinite void into the palm of his hand.”\n\n## 02. Mahoraga’s Adaptation & The Blueprint for Infinity\n\nThe true chess match beneath the hand-to-hand spectacle revolved around the Eight-Handled Sword Divergent Sila Divine General Mahoraga. Sukuna did not merely summon the Ten Shadows shikigami as a shield; he used Megumi Fushiguro’s soul synchronization to shoulder the burden of adaptation across five domain cycles.\n\nCrucially, Mahoraga’s first adaptation altered the nature of its own cursed energy to neutralize Infinity—something Sukuna could not replicate. Waiting for a second adaptation model yielded the decisive blueprint: expanding the target of Dismantle from the sorcerer himself to the very coordinate space occupied by the world.\n\n## 03. Sakuga Direction & Sound Design Legacy\n\nFrom a broadcast perspective, the Shinjuku Showdown sets a new benchmark for spatial clarity in high-speed urban destruction. Storyboard directors utilized wide architectural lenses of ruined Shinjuku skyscrapers to preserve scale while hollow purple detonations erased entire city blocks.\n\nCombined with dynamic choral arrangements that strip away percussion during split-second Binding Vow reveals, this arc cements Jujutsu Kaisen as the defining action touchstone of the 2020s.",
    "keyTakeaways": [
      "Open-barrier domains interact with closed shells by striking the exterior structural limit rather than clashing solely on the interior sure-hit command.",
      "Gojo’s compressed basketball-sized barrier inverted internal/external durability parameters learned inside the Prison Realm.",
      "Binding Vows during the climax traded activation hand-signs for permanent chant requirements on the World-Cutting Slash."
    ],
    "sections": [
      {
        "heading": "01. Open vs. Closed Barrier Physics in Shinjuku",
        "paragraphs": [
          "For over two hundred chapters, Gege Akutami seeded the mechanics of Domain Expansion as the apex of Jujutsu sorcery. Yet until December 24 in Shinjuku, readers had never witnessed how an open-barrier masterpiece like Malevolent Shrine interacts with the metaphysical perfection of Unlimited Void.",
          "Rather than a simple power-level tug-of-war, the five consecutive domain clashes operated like high-stakes systems engineering. By flipping his barrier conditions—strengthening the outer shell against Sukuna’s slashing radius at the cost of internal stability—Gojo demonstrated why combat improvisation matters more than raw cursed energy reserves."
        ],
        "quote": "“Inside the Prison Realm, experiencing a dimension with no physical volume taught Gojo how to compress an infinite void into the palm of his hand.”"
      },
      {
        "heading": "02. Mahoraga’s Adaptation & The Blueprint for Infinity",
        "paragraphs": [
          "The true chess match beneath the hand-to-hand spectacle revolved around the Eight-Handled Sword Divergent Sila Divine General Mahoraga. Sukuna did not merely summon the Ten Shadows shikigami as a shield; he used Megumi Fushiguro’s soul synchronization to shoulder the burden of adaptation across five domain cycles.",
          "Crucially, Mahoraga’s first adaptation altered the nature of its own cursed energy to neutralize Infinity—something Sukuna could not replicate. Waiting for a second adaptation model yielded the decisive blueprint: expanding the target of Dismantle from the sorcerer himself to the very coordinate space occupied by the world."
        ]
      },
      {
        "heading": "03. Sakuga Direction & Sound Design Legacy",
        "paragraphs": [
          "From a broadcast perspective, the Shinjuku Showdown sets a new benchmark for spatial clarity in high-speed urban destruction. Storyboard directors utilized wide architectural lenses of ruined Shinjuku skyscrapers to preserve scale while hollow purple detonations erased entire city blocks.",
          "Combined with dynamic choral arrangements that strip away percussion during split-second Binding Vow reveals, this arc cements Jujutsu Kaisen as the defining action touchstone of the 2020s."
        ]
      }
    ]
  },
  {
    "id": "art-anime-demon-slayer",
    "slug": "demon-slayer-trilogy",
    "topicLabel": "Demon Slayer Trilogy",
    "title": "Demon Slayer: Infinity Castle Theatrical Trilogy — Visual & Lore Guide",
    "subtitle": "Inside Ufotable’s digital compositing evolution, Nakime’s four-dimensional fortress, and the Hashira’s final Upper Moon matchups.",
    "category_slug": "anime",
    "universe": "anime",
    "universeName": "Anime",
    "content_type": "ARTICLE",
    "accentColor": "#A3E635",
    "author": "Aoi Sakamoto",
    "artist_or_author": "Aoi Sakamoto",
    "authorRole": "Animation Production Correspondent",
    "publishedAt": "Sept 12, 2026",
    "release_date": "2026-09-12",
    "readTime": "6 MIN READ",
    "duration": "6 MIN READ",
    "duration_seconds": 360,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 97.8,
    "popularity_score": 97.8,
    "viewCount": 118400,
    "view_count": 118400,
    "rating": 4.9,
    "ratingsCount": 980,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Theatrical Trilogy",
      "Ufotable",
      "Hashira Lore",
      "Spring 2026"
    ],
    "synopsis": "Why adapting the Infinity Castle arc as a three-part global theatrical event allows Ufotable to push 3D camera mapping, breathing-style fluid simulations, and emotional backstory pacing to unprecedented heights.",
    "body_text": "## 01. Architectural Madness: Rendering the Infinity Castle\n\nWhen Muzan Kibutsuji drops the entire Demon Slayer Corps into Nakime’s biwa-controlled dimension, gravity ceases to be a constant. For Ufotable’s digital department, the Infinity Castle is no longer just a background set-piece—it is an active combatant.\n\nBy moving away from weekly television compression to a theatrical trilogy pipeline, the studio renders multi-layered parallax corridors where lanterns, shoji screens, and waterfalls rotate along three axes simultaneously during sword clashes.\n\n> “Every pluck of Nakime’s biwa reconfigures the battlefield geometry in real time, forcing the camera to dive kilometres through vertical wooden chasms.”\n\n## 02. The Upper Moon Crucible: Akaza, Doma & Kokushibo\n\nUnlike previous arcs where several Hashira converged on a single threat, the Infinity Castle fractures the Corps into isolated, desperate duels. Shinobu Kocho’s calculated gambit against Upper Rank Two Doma contrasts sharply with Tanjiro and Giyu’s martial arts crucible against Akaza’s Compass Needle.\n\nMeanwhile, the battle against Upper Rank One Kokushibo delves into the original sin of Breath of the Sun and Breath of the Moon, uniting Sanemi, Gyomei, Muichiro, and Genya in one of manga history’s most grueling clashes.",
    "keyTakeaways": [
      "Ufotable built a procedural CGI asset matrix of over 40,000 shifting wooden tatami rooms rendered at native 4K IMAX resolution.",
      "Each film centers on a distinct thematic pillar: Grief & Vengeance (Akaza), Legacy & Bloodline (Kokushibo), and Sacrifice (Doma).",
      "Total Concentration Breathing marks and Transparent World visuals receive bespoke chromatic shaders."
    ],
    "sections": [
      {
        "heading": "01. Architectural Madness: Rendering the Infinity Castle",
        "paragraphs": [
          "When Muzan Kibutsuji drops the entire Demon Slayer Corps into Nakime’s biwa-controlled dimension, gravity ceases to be a constant. For Ufotable’s digital department, the Infinity Castle is no longer just a background set-piece—it is an active combatant.",
          "By moving away from weekly television compression to a theatrical trilogy pipeline, the studio renders multi-layered parallax corridors where lanterns, shoji screens, and waterfalls rotate along three axes simultaneously during sword clashes."
        ],
        "quote": "“Every pluck of Nakime’s biwa reconfigures the battlefield geometry in real time, forcing the camera to dive kilometres through vertical wooden chasms.”"
      },
      {
        "heading": "02. The Upper Moon Crucible: Akaza, Doma & Kokushibo",
        "paragraphs": [
          "Unlike previous arcs where several Hashira converged on a single threat, the Infinity Castle fractures the Corps into isolated, desperate duels. Shinobu Kocho’s calculated gambit against Upper Rank Two Doma contrasts sharply with Tanjiro and Giyu’s martial arts crucible against Akaza’s Compass Needle.",
          "Meanwhile, the battle against Upper Rank One Kokushibo delves into the original sin of Breath of the Sun and Breath of the Moon, uniting Sanemi, Gyomei, Muichiro, and Genya in one of manga history’s most grueling clashes."
        ]
      }
    ]
  },
  {
    "id": "art-anime-csm-reze",
    "slug": "chainsaw-man-reze-movie",
    "topicLabel": "Chainsaw Man Reze Movie",
    "title": "Chainsaw Man — The Movie: Reze Arc Cinematography & Bomb Devil Dossier",
    "subtitle": "From rain-soaked phone booths and midnight school pools to explosive hybrid warfare: dissecting Tatsuki Fujimoto’s most bittersweet romance.",
    "category_slug": "anime",
    "universe": "anime",
    "universeName": "Anime",
    "content_type": "ARTICLE",
    "accentColor": "#A3E635",
    "author": "Renji Morimoto",
    "artist_or_author": "Renji Morimoto",
    "authorRole": "Film & Anime Critic",
    "publishedAt": "Sept 04, 2026",
    "release_date": "2026-09-04",
    "readTime": "5 MIN READ",
    "duration": "5 MIN READ",
    "duration_seconds": 300,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 95.6,
    "popularity_score": 95.6,
    "viewCount": 89300,
    "view_count": 89300,
    "rating": 4.8,
    "ratingsCount": 760,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Theme Songs",
      "Simulcasts",
      "Chainsaw Man",
      "Character Lore"
    ],
    "synopsis": "The Reze Arc bridges tender indie-film intimacy with unhinged block-leveling spectacle. Here is how the theatrical adaptation balances the Country Mouse parable with the Bomb Devil’s kinetic fury.",
    "body_text": "## 01. The Country Mouse and the City Mouse\n\nAt its heart, the Reze Arc is a cold-war espionage tragedy disguised as a teenage summer romance. Both Denji and Reze are weaponized orphans stripped of normal childhoods by state and syndicate apparatuses—Denji under Public Safety’s thumb, and Reze raised as a Soviet guinea pig.\n\nThe quiet sequences—learning to read on chalkboards after hours and swimming in a darkened high school pool—carry as much narrative tension as any devil contract because the audience senses the fuse burning beneath every smile.\n\n> “Did you prefer the country mouse, Denji, or the city mouse? Neither of us ever really got to choose.”\n\n## 02. Hybrid Propulsion & Explosive Choreography\n\nOnce the pin is pulled from Reze’s choker, the visual grammar shifts from French New Wave restraint to pure kinetic anarchy. Unlike traditional energy blasts, Bomb Devil combat relies on directional concussive propulsion—detonating limbs to rocket across rooftops and riding Shockwave currents alongside Beam, the Shark Fiend.",
    "keyTakeaways": [
      "Contrasts warm, nostalgic café lighting in Act I against neon-magenta detonation frames in Act II.",
      "Explores the philosophical parable of the Country Mouse vs. the City Mouse as the core thematic spine of Denji and Reze’s bond.",
      "Features Kensuke Ushio’s stripped-back piano motifs transitioning into industrial breakcore."
    ],
    "sections": [
      {
        "heading": "01. The Country Mouse and the City Mouse",
        "paragraphs": [
          "At its heart, the Reze Arc is a cold-war espionage tragedy disguised as a teenage summer romance. Both Denji and Reze are weaponized orphans stripped of normal childhoods by state and syndicate apparatuses—Denji under Public Safety’s thumb, and Reze raised as a Soviet guinea pig.",
          "The quiet sequences—learning to read on chalkboards after hours and swimming in a darkened high school pool—carry as much narrative tension as any devil contract because the audience senses the fuse burning beneath every smile."
        ],
        "quote": "“Did you prefer the country mouse, Denji, or the city mouse? Neither of us ever really got to choose.”"
      },
      {
        "heading": "02. Hybrid Propulsion & Explosive Choreography",
        "paragraphs": [
          "Once the pin is pulled from Reze’s choker, the visual grammar shifts from French New Wave restraint to pure kinetic anarchy. Unlike traditional energy blasts, Bomb Devil combat relies on directional concussive propulsion—detonating limbs to rocket across rooftops and riding Shockwave currents alongside Beam, the Shark Fiend."
        ]
      }
    ]
  },
  {
    "id": "art-gaming-gta6",
    "slug": "gta-vi-vice-city-lore",
    "topicLabel": "GTA VI Vice City Lore",
    "title": "GTA VI Vice City & Leonida State Lore Bible: Biomes, Syndicates & RAGE 9 Tech",
    "subtitle": "Mapping every district from neon Ocean Beach to the Grassrivers swamps, Lucia & Jason’s criminal trajectory, and next-gen crowd simulation.",
    "category_slug": "gaming",
    "universe": "gaming",
    "universeName": "Gaming",
    "content_type": "ARTICLE",
    "accentColor": "#FACC15",
    "author": "Marcus Vance",
    "artist_or_author": "Marcus Vance",
    "authorRole": "Open-World Systems Architect",
    "publishedAt": "Sept 20, 2026",
    "release_date": "2026-09-20",
    "readTime": "8 MIN READ",
    "duration": "8 MIN READ",
    "duration_seconds": 480,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 99.7,
    "popularity_score": 99.7,
    "viewCount": 215400,
    "view_count": 215400,
    "rating": 5,
    "ratingsCount": 1890,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Lore Bible",
      "Open World",
      "Vice City",
      "RAGE Engine"
    ],
    "synopsis": "A deep-dive geographical and technical dossier on Rockstar’s State of Leonida—analyzing the dual-protagonist trust economy, dynamic tropical weather fronts, and social-media-driven world events.",
    "body_text": "## 01. Cartography of Leonida: Beyond Ocean Drive\n\nReturning to Vice City after two decades means leaving behind the cramped 1986 pastel postcard for a sprawling, living satire of modern Florida. The State of Leonida stretches from the billionaire glass towers of Vice Dale down to the rusted industrial docks of Port Gellhorn and the coral archipelagos of the Keys.\n\nAt the center lies Lake Leonida and the Grassrivers—a dense airboat frontier teeming with apex wildlife, smuggling airstrips, and off-grid militias that dynamically alter smuggling routes.\n\n> “The only way we get through this is by sticking together—trust isn’t a dialogue choice in Leonida; it’s a survival mechanic.”\n\n## 02. RAGE 9 Simulation & Dynamic Social Ecosystems\n\nWhere Red Dead Redemption 2 pioneered deliberate physical weight and NPC memory in frontier towns, GTA VI scales those systems to high-density metropolitan beaches and nightclubs. Every pedestrian group reacts autonomously to sudden tropical squalls, police cordons, and viral in-game livestreamers.",
    "keyTakeaways": [
      "The State of Leonida spans three major urban hubs (Vice City, Port Gellhorn, Ambrosia) linked by the Grassrivers wetlands and Leonida Keys.",
      "RAGE 9 introduces per-strand hair physics, ray-traced global illumination across neon water reflections, and persistent NPC schedules.",
      "Dual-character switching between Lucia and Jason incorporates a tactical shared-inventory and robbery synchronicity meter."
    ],
    "sections": [
      {
        "heading": "01. Cartography of Leonida: Beyond Ocean Drive",
        "paragraphs": [
          "Returning to Vice City after two decades means leaving behind the cramped 1986 pastel postcard for a sprawling, living satire of modern Florida. The State of Leonida stretches from the billionaire glass towers of Vice Dale down to the rusted industrial docks of Port Gellhorn and the coral archipelagos of the Keys.",
          "At the center lies Lake Leonida and the Grassrivers—a dense airboat frontier teeming with apex wildlife, smuggling airstrips, and off-grid militias that dynamically alter smuggling routes."
        ],
        "quote": "“The only way we get through this is by sticking together—trust isn’t a dialogue choice in Leonida; it’s a survival mechanic.”"
      },
      {
        "heading": "02. RAGE 9 Simulation & Dynamic Social Ecosystems",
        "paragraphs": [
          "Where Red Dead Redemption 2 pioneered deliberate physical weight and NPC memory in frontier towns, GTA VI scales those systems to high-density metropolitan beaches and nightclubs. Every pedestrian group reacts autonomously to sudden tropical squalls, police cordons, and viral in-game livestreamers."
        ]
      }
    ]
  },
  {
    "id": "art-gaming-cyberpunk-orion",
    "slug": "cyberpunk-orion-previews",
    "topicLabel": "Cyberpunk Orion Previews",
    "title": "Cyberpunk Project Orion: Blackwall AI Lore, Unreal Engine 5 & Night City 2.0",
    "subtitle": "What the datashards in Phantom Liberty and Patch 2.2 reveal about Mr. Blue Eyes, rogue AIs beyond the Blackwall, and the next Cyberpunk era.",
    "category_slug": "gaming",
    "universe": "gaming",
    "universeName": "Gaming",
    "content_type": "ARTICLE",
    "accentColor": "#FACC15",
    "author": "Elena Rostova",
    "artist_or_author": "Elena Rostova",
    "authorRole": "RPG Lore & Meta Specialist",
    "publishedAt": "Sept 14, 2026",
    "release_date": "2026-09-14",
    "readTime": "6 MIN READ",
    "duration": "6 MIN READ",
    "duration_seconds": 360,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 96.2,
    "popularity_score": 96.2,
    "viewCount": 98400,
    "view_count": 98400,
    "rating": 4.8,
    "ratingsCount": 845,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Patch 14.2",
      "Lore Bible",
      "Cyberpunk",
      "UE5"
    ],
    "synopsis": "Tracing the hidden conspiracy connecting Jefferson Peralez’s neural reconditioning, Songbird’s Cynosure core, and the looming Fifth Corporate War in Project Orion.",
    "body_text": "## 01. The Conspiracy Behind Mr. Blue Eyes & Night Corp\n\nLook closely at the balcony during your final meeting with Jefferson Peralez, or the observation deck at the NCX Spaceport when sending Songbird to Tycho Terminal. Watching silently with glowing azure corneas is Mr. Blue Eyes—a proxy vessel for entities operating from beyond the Blackwall.\n\nPhantom Liberty confirmed that Militech’s pre-DataKrash Cynosure facility was already capturing feral AIs to weaponize against Arasaka’s Soulkiller. Project Orion is poised to detonate this cold war into the open.\n\n> “They aren’t erasing who you are, V. They are rewriting the architecture of your synapses until you thank them for it.”\n\n## 02. Verticality & The Unreal Engine 5 Megabuildings\n\nOne of the primary ambitions for CD Projekt Red’s Boston and Vancouver studios is realizing the full vertical density of Night City’s Megabuildings—transforming multi-floor arcologies into self-contained ecosystems with turf wars, ripperdoc clinics, and netrunner dens stacked 60 stories high.",
    "keyTakeaways": [
      "The Blackwall is not a firewall walling off cyberspace—it is itself a sentient AI negotiating a fragile truce.",
      "Transitioning from REDengine to Unreal Engine 5 unlocks vertical megabuilding interiors and seamless orbital Crystal Palace transit.",
      "Cyberware humanity thresholds will dynamically affect dialogue perception and hallucination triggers."
    ],
    "sections": [
      {
        "heading": "01. The Conspiracy Behind Mr. Blue Eyes & Night Corp",
        "paragraphs": [
          "Look closely at the balcony during your final meeting with Jefferson Peralez, or the observation deck at the NCX Spaceport when sending Songbird to Tycho Terminal. Watching silently with glowing azure corneas is Mr. Blue Eyes—a proxy vessel for entities operating from beyond the Blackwall.",
          "Phantom Liberty confirmed that Militech’s pre-DataKrash Cynosure facility was already capturing feral AIs to weaponize against Arasaka’s Soulkiller. Project Orion is poised to detonate this cold war into the open."
        ],
        "quote": "“They aren’t erasing who you are, V. They are rewriting the architecture of your synapses until you thank them for it.”"
      },
      {
        "heading": "02. Verticality & The Unreal Engine 5 Megabuildings",
        "paragraphs": [
          "One of the primary ambitions for CD Projekt Red’s Boston and Vancouver studios is realizing the full vertical density of Night City’s Megabuildings—transforming multi-floor arcologies into self-contained ecosystems with turf wars, ripperdoc clinics, and netrunner dens stacked 60 stories high."
        ]
      }
    ]
  },
  {
    "id": "art-gaming-silksong",
    "slug": "silksong-tracker",
    "topicLabel": "Silksong Tracker",
    "title": "Hollow Knight: Silksong — Pharloom Crest Builds, Silk-Crafting & Speedrun Meta",
    "subtitle": "Mastering Hornet’s diagonal aerial acrobatics, Tool-slot optimization, and the Citadel of Song’s most punishing boss encounters.",
    "category_slug": "gaming",
    "universe": "gaming",
    "universeName": "Gaming",
    "content_type": "ARTICLE",
    "accentColor": "#FACC15",
    "author": "Devon \"Splits\" Mercer",
    "artist_or_author": "Devon \"Splits\" Mercer",
    "authorRole": "Speedrun Verifier & Metroidvania Editor",
    "publishedAt": "Sept 09, 2026",
    "release_date": "2026-09-09",
    "readTime": "6 MIN READ",
    "duration": "6 MIN READ",
    "duration_seconds": 360,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 95.1,
    "popularity_score": 95.1,
    "viewCount": 84200,
    "view_count": 84200,
    "rating": 4.9,
    "ratingsCount": 710,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Speedruns",
      "Esports",
      "Metroidvania",
      "Patch 14.2"
    ],
    "synopsis": "Why Hornet’s ascent through the haunted kingdom of Pharloom flips every muscle-memory habit from Hallownest on its head—complete with Crest tier lists and optimal route splits.",
    "body_text": "## 01. From Soul to Silk: The Tempo Shift of Pharloom\n\nIn Hollow Knight, survival meant finding a quiet corner during a boss stagger to channel Soul slowly on the ground. In Silksong, hesitation is fatal. Hornet’s Bind ability executes in mid-air, restoring three masks of health in a single burst while consuming your entire Silk gauge.\n\nBecause enemies in Pharloom routinely deal double-mask damage and chain multi-hit combos, combat flows like a high-wire fencing match where aggressive needle strikes are your only lifeline.\n\n> “Hallownest was a kingdom embalmed in ash and memory; Pharloom is a gilded machine still humming with golden thread and fanaticism.”\n\n## 02. Crest System Breakdown & Optimal Tool Loadouts\n\nReplacing the traditional Charm notch matrix is the Crest system. Equipping the Reaper Crest widens Hornet’s slash arc and generates bonus Silk orbs on stagger, whereas the Wanderer Crest restores the classic vertical pogo familiar to Hallownest veterans.",
    "keyTakeaways": [
      "Binding heals three masks almost instantly in mid-air at the cost of a full Silk spool, rewarding hyper-aggressive uptime.",
      "The Hunter, Reaper, and Wanderer Crests fundamentally alter Hornet’s needle slash arc and downward pogo trajectory.",
      "Current Any% NMG speedrun routes utilize the Moss Grotto grapple skip to shave 11 minutes off Act I."
    ],
    "sections": [
      {
        "heading": "01. From Soul to Silk: The Tempo Shift of Pharloom",
        "paragraphs": [
          "In Hollow Knight, survival meant finding a quiet corner during a boss stagger to channel Soul slowly on the ground. In Silksong, hesitation is fatal. Hornet’s Bind ability executes in mid-air, restoring three masks of health in a single burst while consuming your entire Silk gauge.",
          "Because enemies in Pharloom routinely deal double-mask damage and chain multi-hit combos, combat flows like a high-wire fencing match where aggressive needle strikes are your only lifeline."
        ],
        "quote": "“Hallownest was a kingdom embalmed in ash and memory; Pharloom is a gilded machine still humming with golden thread and fanaticism.”"
      },
      {
        "heading": "02. Crest System Breakdown & Optimal Tool Loadouts",
        "paragraphs": [
          "Replacing the traditional Charm notch matrix is the Crest system. Equipping the Reaper Crest widens Hornet’s slash arc and generates bonus Silk orbs on stagger, whereas the Wanderer Crest restores the classic vertical pogo familiar to Hallownest veterans."
        ]
      }
    ]
  },
  {
    "id": "art-movies-dune-messiah",
    "slug": "dune-messiah-production",
    "topicLabel": "Dune Messiah Production",
    "title": "Dune: Messiah Production Dossier — The Golden Path, IMAX 70mm & Tleilaxu Lore",
    "subtitle": "How Denis Villeneuve concludes Paul Atreides’ tragic trilogy, twelve years into the Fremen Holy War across the Known Universe.",
    "category_slug": "movies-tv",
    "universe": "movies-tv",
    "universeName": "Movies & TV",
    "content_type": "ARTICLE",
    "accentColor": "#38BDF8",
    "author": "Clara Vance-Sterling",
    "artist_or_author": "Clara Vance-Sterling",
    "authorRole": "Chief Cinema & Canon Historian",
    "publishedAt": "Sept 19, 2026",
    "release_date": "2026-09-19",
    "readTime": "7 MIN READ",
    "duration": "7 MIN READ",
    "duration_seconds": 420,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 98.5,
    "popularity_score": 98.5,
    "viewCount": 134900,
    "view_count": 134900,
    "rating": 4.9,
    "ratingsCount": 1120,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Canon Timelines",
      "4K Teasers",
      "Director Cuts",
      "Sci-Fi"
    ],
    "synopsis": "A comprehensive look at the palace intrigue of Arrakeen: the Bene Gesserit—Spacing Guild—Tleilaxu conspiracy, Hayt the Ghola, and the visual transformation of a desert planet turning green.",
    "body_text": "## 01. The Tragedy of Absolute Prescience\n\nFrank Herbert wrote Dune Messiah to dismantle the very charismatic hero myth that readers fell in love with in the first novel. By the opening frames of Messiah, Paul Muad’Dib sits atop the largest temple ever constructed by human hands—a monolith in Arrakeen that dwarfs mountain ranges—yet he is more imprisoned than ever.\n\nEvery vision of the future shows him that abdicating the throne triggers even worse chaos, while remaining Emperor cements a theocratic bureaucracy he despises.\n\n> “Prophecy is not a gift of freedom; it is a trap that locks both the prophet and his followers inside a single unyielding corridor of time.”\n\n## 02. The Cabal: Navigators, Face Dancers, and the Ghola Gift\n\nUnable to defeat Paul’s Fremen legions on the battlefield, the conspirators—Reverend Mother Gaius Helen Mohiam, Princess Irulan, the Tleilaxu master Scytale, and Guild Navigator Edric (whose prescience shields the meeting from Paul’s sight)—strike at his humanity instead.\n\nTheir psychological weapon is Hayt: a resurrected ghola of Duncan Idaho engineered with metallic Tleilaxu eyes and philosophical conditioning designed to break Paul’s psyche.",
    "keyTakeaways": [
      "Set 12 years after Dune: Part Two, after Paul’s jihad has claimed 61 billion lives across the Imperium.",
      "Introduces the Bene Tleilax Face Dancers, the Guild Navigator Edric in his spice-gas tank, and the resurrected Duncan Idaho ghola.",
      "Hans Zimmer’s score evolves the triumphant Fremen theme into an oppressive liturgical requiem."
    ],
    "sections": [
      {
        "heading": "01. The Tragedy of Absolute Prescience",
        "paragraphs": [
          "Frank Herbert wrote Dune Messiah to dismantle the very charismatic hero myth that readers fell in love with in the first novel. By the opening frames of Messiah, Paul Muad’Dib sits atop the largest temple ever constructed by human hands—a monolith in Arrakeen that dwarfs mountain ranges—yet he is more imprisoned than ever.",
          "Every vision of the future shows him that abdicating the throne triggers even worse chaos, while remaining Emperor cements a theocratic bureaucracy he despises."
        ],
        "quote": "“Prophecy is not a gift of freedom; it is a trap that locks both the prophet and his followers inside a single unyielding corridor of time.”"
      },
      {
        "heading": "02. The Cabal: Navigators, Face Dancers, and the Ghola Gift",
        "paragraphs": [
          "Unable to defeat Paul’s Fremen legions on the battlefield, the conspirators—Reverend Mother Gaius Helen Mohiam, Princess Irulan, the Tleilaxu master Scytale, and Guild Navigator Edric (whose prescience shields the meeting from Paul’s sight)—strike at his humanity instead.",
          "Their psychological weapon is Hayt: a resurrected ghola of Duncan Idaho engineered with metallic Tleilaxu eyes and philosophical conditioning designed to break Paul’s psyche."
        ]
      }
    ]
  },
  {
    "id": "art-movies-batman-part-2",
    "slug": "the-batman-part-ii-canon",
    "topicLabel": "The Batman Part II Canon",
    "title": "The Batman Part II Canon Timeline: Winter in Flooded Gotham & The Penguin Fallout",
    "subtitle": "Mapping Matt Reeves’ Elseworlds crime saga from Carmine Falcone’s vacuum and Sofia Gigante’s rise to Bruce Wayne’s forensic evolution.",
    "category_slug": "movies-tv",
    "universe": "movies-tv",
    "universeName": "Movies & TV",
    "content_type": "ARTICLE",
    "accentColor": "#38BDF8",
    "author": "Julian Thorne",
    "artist_or_author": "Julian Thorne",
    "authorRole": "Cinematic Universe Chronicler",
    "publishedAt": "Sept 11, 2026",
    "release_date": "2026-09-11",
    "readTime": "6 MIN READ",
    "duration": "6 MIN READ",
    "duration_seconds": 360,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 96.4,
    "popularity_score": 96.4,
    "viewCount": 105200,
    "view_count": 105200,
    "rating": 4.8,
    "ratingsCount": 890,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Canon Timelines",
      "Casting Leaks",
      "DC Elseworlds",
      "Noir"
    ],
    "synopsis": "How the seawall destruction and Oz Cobb’s bloody ascension in Crown Point reshape Gotham’s socio-political corruption for a freezing winter detective thriller.",
    "body_text": "## 01. After the Flood: A Divided City in Deep Freeze\n\nWhen the Riddler’s car bombs shattered Gotham’s seawall in November, the waters didn’t hit every neighborhood equally. While Downtown’s financial elite fortified their penthouses, working-class districts like Crown Point were left to rot in toxic sludge—creating the exact vacuum Oz Cobb exploited to seize the criminal underworld.\n\nAs December freezes the flooded canals into jagged ice, Bruce Wayne discovers that being a symbol of hope requires dismantling corruption in mahogany boardrooms just as much as in back alleys.\n\n> “Vengeance could beat a street gang into submission, but it couldn’t audit a century of stolen city trusts.”\n\n## 02. World’s Greatest Detective: Upgraded Cowls & Forensic Tech\n\nIn Part II, the drifter persona gives way to a sharper, dual-identity strategy. Expect an evolved, lighter-plate Batsuit adapted for sub-zero mobility alongside deeper forensic integration inside the abandoned Wayne subway terminal.",
    "keyTakeaways": [
      "Picks up in the dead of winter just weeks after the events of The Penguin series finale.",
      "Focuses on institutional white-collar rot behind Gotham’s Renewal Fund and Wayne Enterprises’ historical ties.",
      "Greig Fraser’s anamorphic cinematography shifts from amber rain to sodium-vapor snowstorms."
    ],
    "sections": [
      {
        "heading": "01. After the Flood: A Divided City in Deep Freeze",
        "paragraphs": [
          "When the Riddler’s car bombs shattered Gotham’s seawall in November, the waters didn’t hit every neighborhood equally. While Downtown’s financial elite fortified their penthouses, working-class districts like Crown Point were left to rot in toxic sludge—creating the exact vacuum Oz Cobb exploited to seize the criminal underworld.",
          "As December freezes the flooded canals into jagged ice, Bruce Wayne discovers that being a symbol of hope requires dismantling corruption in mahogany boardrooms just as much as in back alleys."
        ],
        "quote": "“Vengeance could beat a street gang into submission, but it couldn’t audit a century of stolen city trusts.”"
      },
      {
        "heading": "02. World’s Greatest Detective: Upgraded Cowls & Forensic Tech",
        "paragraphs": [
          "In Part II, the drifter persona gives way to a sharper, dual-identity strategy. Expect an evolved, lighter-plate Batsuit adapted for sub-zero mobility alongside deeper forensic integration inside the abandoned Wayne subway terminal."
        ]
      }
    ]
  },
  {
    "id": "art-movies-stranger-things",
    "slug": "stranger-things-finale",
    "topicLabel": "Stranger Things Finale",
    "title": "Stranger Things Finale & Dimension X Lore: The First Shadow Stage Canon Explained",
    "subtitle": "Connecting Henry Creel’s 1959 Nevada cave incident, the Mind Flayer’s true origin, and the final battle for Hawkins.",
    "category_slug": "movies-tv",
    "universe": "movies-tv",
    "universeName": "Movies & TV",
    "content_type": "ARTICLE",
    "accentColor": "#38BDF8",
    "author": "Maya Lin",
    "artist_or_author": "Maya Lin",
    "authorRole": "TV Mythology Researcher",
    "publishedAt": "Sept 06, 2026",
    "release_date": "2026-09-06",
    "readTime": "6 MIN READ",
    "duration": "6 MIN READ",
    "duration_seconds": 360,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 94.9,
    "popularity_score": 94.9,
    "viewCount": 91700,
    "view_count": 91700,
    "rating": 4.8,
    "ratingsCount": 740,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Canon Timelines",
      "4K Teasers",
      "Sci-Fi",
      "Director Cuts"
    ],
    "synopsis": "Why the Upside Down is frozen on November 6, 1983, how Dimension X differs from the Rightside Up bridge, and what Will Byers’ true psychic tether means.",
    "body_text": "## 01. November 6, 1983: Why Time Stopped in the Upside Down\n\nWhen Nancy Wheeler opened her diary in the Upside Down during Season 4 and found the entries halted on November 6, 1983, it confirmed a foundational truth of Hawkins’ mythology: the dark reflection of Hawkins is not an ancient parallel town, but a psychic imprint stamped onto the membrane between our world and Dimension X.\n\nUnderstanding that distinction is essential to decoding how the military quarantine zone in 1987 attempts to contain the four converging rifts.\n\n> “It started with Will Byers vanishing in the woods, and the circle can only close where the first gate tore open.”\n\n## 02. Vecna vs. The Mind Flayer: Who Holds the Leash?\n\nWhile Henry Creel believed in Season 4 that he gave the formless shadow particles their spider-like purpose, canon revelations from The First Shadow stage play reveal that the entity infected Henry first during the Philadelphia Experiment fallout.",
    "keyTakeaways": [
      "The Upside Down is a localized wormhole snapshot created the exact moment Eleven made psychic contact with the Demogorgon on Nov 6, 1983.",
      "Dimension X is the primordial realm where the shadow particles first altered Henry Creel’s blood type in 1959.",
      "Will Byers’ connection to the hive mind acts as a two-way antenna capable of disrupting Vecna’s phylactery."
    ],
    "sections": [
      {
        "heading": "01. November 6, 1983: Why Time Stopped in the Upside Down",
        "paragraphs": [
          "When Nancy Wheeler opened her diary in the Upside Down during Season 4 and found the entries halted on November 6, 1983, it confirmed a foundational truth of Hawkins’ mythology: the dark reflection of Hawkins is not an ancient parallel town, but a psychic imprint stamped onto the membrane between our world and Dimension X.",
          "Understanding that distinction is essential to decoding how the military quarantine zone in 1987 attempts to contain the four converging rifts."
        ],
        "quote": "“It started with Will Byers vanishing in the woods, and the circle can only close where the first gate tore open.”"
      },
      {
        "heading": "02. Vecna vs. The Mind Flayer: Who Holds the Leash?",
        "paragraphs": [
          "While Henry Creel believed in Season 4 that he gave the formless shadow particles their spider-like purpose, canon revelations from The First Shadow stage play reveal that the entity infected Henry first during the Philadelphia Experiment fallout."
        ]
      }
    ]
  },
  {
    "id": "art-kpop-aespa",
    "slug": "aespa-armageddon-lore",
    "topicLabel": "Aespa Armageddon Lore",
    "title": "aespa \"Armageddon\" & Supernova Lore: Multiverse Variants in the REAL WORLD",
    "subtitle": "Decoding the Season 2 SMCU multiverse expansion, metallic hyper-pop production, and synchronized Bluetooth lightstick choreography.",
    "category_slug": "kpop",
    "universe": "kpop",
    "universeName": "K-Pop",
    "content_type": "ARTICLE",
    "accentColor": "#F43F5E",
    "author": "Soo-jin Park",
    "artist_or_author": "Soo-jin Park",
    "authorRole": "K-Pop Concept & Sonic Critic",
    "publishedAt": "Sept 21, 2026",
    "release_date": "2026-09-21",
    "readTime": "5 MIN READ",
    "duration": "5 MIN READ",
    "duration_seconds": 300,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 98.9,
    "popularity_score": 98.9,
    "viewCount": 164200,
    "view_count": 164200,
    "rating": 5,
    "ratingsCount": 1530,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Comeback Radar",
      "Discography",
      "Lightstick Sync",
      "KWANGYA"
    ],
    "synopsis": "How aespa transitioned from fighting Black Mamba in KWANGYA to confronting parallel-universe versions of themselves across Supernova and Armageddon.",
    "body_text": "## 01. Beyond KWANGYA: Enter the Multiverse Era\n\nIn their first narrative cycle, aespa’s lore revolved around digital avatars (ae) and the cybernetic wilderness of KWANGYA. With their first full-length album Armageddon, the conceptual lens widens from virtual reality to infinite parallel dimensions.\n\nRather than battling an external serpent villain, the members confront doppelgängers with supernatural physiology—levitating cars, freezing time, and warping urban geometry in the \"Supernova\" and \"Armageddon\" visual films.\n\n> “I’m like some kind of Supernova—watch out: our taste of iron isn’t a metaphor, it’s a sonic signature.”\n\n## 02. Sonic Architecture: Why \"Taste of Iron\" Works\n\nFans affectionately dub aespa’s hardest-hitting tracks \"chul-mat\" (taste of iron)—industrial synth clangs, distorted 808 glides, and razor-sharp vocal layering in the final chorus that reward lossless audio streaming.",
    "keyTakeaways": [
      "After opening the portal beyond KWANGYA, the quartet encounters uncanny extraterrestrial variants of Karina, Giselle, Winter, and Ningning.",
      "\"Supernova\" interpolates electro-clash basslines with cosmic hyper-pop, earning a historic Perfect All-Kill streak.",
      "Concert lightstick firmware v3.4 syncs stadium LED waves to the exact BPM changes of the bridge."
    ],
    "sections": [
      {
        "heading": "01. Beyond KWANGYA: Enter the Multiverse Era",
        "paragraphs": [
          "In their first narrative cycle, aespa’s lore revolved around digital avatars (ae) and the cybernetic wilderness of KWANGYA. With their first full-length album Armageddon, the conceptual lens widens from virtual reality to infinite parallel dimensions.",
          "Rather than battling an external serpent villain, the members confront doppelgängers with supernatural physiology—levitating cars, freezing time, and warping urban geometry in the \"Supernova\" and \"Armageddon\" visual films."
        ],
        "quote": "“I’m like some kind of Supernova—watch out: our taste of iron isn’t a metaphor, it’s a sonic signature.”"
      },
      {
        "heading": "02. Sonic Architecture: Why \"Taste of Iron\" Works",
        "paragraphs": [
          "Fans affectionately dub aespa’s hardest-hitting tracks \"chul-mat\" (taste of iron)—industrial synth clangs, distorted 808 glides, and razor-sharp vocal layering in the final chorus that reward lossless audio streaming."
        ]
      }
    ]
  },
  {
    "id": "art-kpop-stray-kids",
    "slug": "stray-kids-stadium-tour",
    "topicLabel": "Stray Kids Stadium Tour",
    "title": "Stray Kids Global Stadium Tour & 3RACHA Production Breakdown: The \"ATE\" Era",
    "subtitle": "Inside Bang Chan, Changbin, and Han’s self-producing studio workflow, live band arrangements, and fanchant timing guides.",
    "category_slug": "kpop",
    "universe": "kpop",
    "universeName": "K-Pop",
    "content_type": "ARTICLE",
    "accentColor": "#F43F5E",
    "author": "Min-ho Kang",
    "artist_or_author": "Min-ho Kang",
    "authorRole": "Touring & Live Audio Editor",
    "publishedAt": "Sept 15, 2026",
    "release_date": "2026-09-15",
    "readTime": "6 MIN READ",
    "duration": "6 MIN READ",
    "duration_seconds": 360,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 97.1,
    "popularity_score": 97.1,
    "viewCount": 129500,
    "view_count": 129500,
    "rating": 4.9,
    "ratingsCount": 1180,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Fanchants",
      "Lightstick Sync",
      "Comeback Radar",
      "3RACHA"
    ],
    "synopsis": "How Stray Kids scaled their \"Mala Taste\" genre-blending sound to 60,000-capacity stadiums worldwide with a thunderous four-piece live rock band.",
    "body_text": "## 01. The 3RACHA Blueprint: Controlled Chaos in the Studio\n\nWhile most pop acts source demos from international songwriting camps, Stray Kids’ identity is forged almost entirely in-house by 3RACHA (Bang Chan, Changbin, and Han). Their signature style fuses UK drill rhythms, Latin reggaeton bounce, and festival trap drops without losing melodic hooks.\n\nOn the \"dominATE\" stadium run, that studio experimentation translates into three-hour live marathons backed by a touring rock band that pushes sound pressure levels to festival headliner standards.\n\n> “Eight microphones, zero backing-track crutches during the rap cyphers, and sixty thousand compasses glowing in unison.”\n\n## 02. Stadium Fanchant & Lightstick Sync Checklist\n\nAttending a stadium stop? Ensure your Nachimbong V2 firmware is updated via the official app at least 48 hours before doors open, and pack spare alkaline AAA batteries—high-luminosity stadium sync draws full power across the 32-song setlist.",
    "keyTakeaways": [
      "3RACHA writes and arranges over 95% of the group’s discography on portable laptop rigs while on tour.",
      "Stadium setlists re-orchestrate tracks like \"Chk Chk Boom\", \"LALALALA\", and \"God’s Menu\" with live double-kick drums and brass.",
      "Nachimbong V2 lightsticks feature custom compass-spin OLED animations synced to venue RF transmitters."
    ],
    "sections": [
      {
        "heading": "01. The 3RACHA Blueprint: Controlled Chaos in the Studio",
        "paragraphs": [
          "While most pop acts source demos from international songwriting camps, Stray Kids’ identity is forged almost entirely in-house by 3RACHA (Bang Chan, Changbin, and Han). Their signature style fuses UK drill rhythms, Latin reggaeton bounce, and festival trap drops without losing melodic hooks.",
          "On the \"dominATE\" stadium run, that studio experimentation translates into three-hour live marathons backed by a touring rock band that pushes sound pressure levels to festival headliner standards."
        ],
        "quote": "“Eight microphones, zero backing-track crutches during the rap cyphers, and sixty thousand compasses glowing in unison.”"
      },
      {
        "heading": "02. Stadium Fanchant & Lightstick Sync Checklist",
        "paragraphs": [
          "Attending a stadium stop? Ensure your Nachimbong V2 firmware is updated via the official app at least 48 hours before doors open, and pack spare alkaline AAA batteries—high-luminosity stadium sync draws full power across the 32-song setlist."
        ]
      }
    ]
  },
  {
    "id": "art-kpop-lesserafim",
    "slug": "le-sserafim-coachella-cut",
    "topicLabel": "LE SSERAFIM Coachella Cut",
    "title": "LE SSERAFIM \"CRAZY\" & Festival Director’s Cut: Voguing, UK Garage & Fearless Lore",
    "subtitle": "Analyzing the house-music pivot, Nile Rodgers guitar collaborations, and the choreography stamina behind modern K-pop festival stages.",
    "category_slug": "kpop",
    "universe": "kpop",
    "universeName": "K-Pop",
    "content_type": "ARTICLE",
    "accentColor": "#F43F5E",
    "author": "Hannah Cho",
    "artist_or_author": "Hannah Cho",
    "authorRole": "Choreography & Pop Culture Columnist",
    "publishedAt": "Sept 07, 2026",
    "release_date": "2026-09-07",
    "readTime": "5 MIN READ",
    "duration": "5 MIN READ",
    "duration_seconds": 300,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 94.3,
    "popularity_score": 94.3,
    "viewCount": 82600,
    "view_count": 82600,
    "rating": 4.8,
    "ratingsCount": 690,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Discography",
      "Comeback Radar",
      "Choreography",
      "Fanchants"
    ],
    "synopsis": "From Jersey club and Afro-house on \"EASY\" and \"Smart\" to electro-voguing on \"CRAZY\": how LE SSERAFIM carved out the most dance-floor-forward catalog in 4th-gen K-pop.",
    "body_text": "## 01. Ballroom House Meets Athletic Precision\n\nLE SSERAFIM has never shied away from reinventing their sonic palette every six months. Where \"ANTIFRAGILE\" rode an infectious reggaeton rhythm and \"Smart\" embraced amapiano percussion, \"CRAZY\" dives headfirst into pulsing ballroom house.\n\nThe choreography demands extraordinary single-leg balance and core control, executing rapid-fire duckwalks and arm-control isolations while maintaining live vocal projection.\n\n> “Act like an angel and dress like crazy—when the bassline drops, the stage becomes a runway without rules.”",
    "keyTakeaways": [
      "Blends 130 BPM ballroom house beats with sharp, athletic floorwork and authentic voguing elements.",
      "Runway-inspired concept trilogy (\"FEARLESS\" -> \"ANTIFRAGILE\" -> \"UNFORGIVEN\") evolved into self-aware club surrealism.",
      "Custom festival mixes incorporate extended dance breaks engineered specifically for desert and arena acoustics."
    ],
    "sections": [
      {
        "heading": "01. Ballroom House Meets Athletic Precision",
        "paragraphs": [
          "LE SSERAFIM has never shied away from reinventing their sonic palette every six months. Where \"ANTIFRAGILE\" rode an infectious reggaeton rhythm and \"Smart\" embraced amapiano percussion, \"CRAZY\" dives headfirst into pulsing ballroom house.",
          "The choreography demands extraordinary single-leg balance and core control, executing rapid-fire duckwalks and arm-control isolations while maintaining live vocal projection."
        ],
        "quote": "“Act like an angel and dress like crazy—when the bassline drops, the stage becomes a runway without rules.”"
      }
    ]
  },
  {
    "id": "art-comics-xmen",
    "slug": "x-men-from-the-ashes",
    "topicLabel": "X-Men From the Ashes",
    "title": "X-Men: From the Ashes Reading Order — Post-Krakoa Rosters in Alaska, New Orleans & NY",
    "subtitle": "How Jed MacKay, Gail Simone, and Eve L. Ewing split mutantkind across three ideological teams after the Fall of the House of X.",
    "category_slug": "comics",
    "universe": "comics",
    "universeName": "Comics",
    "content_type": "ARTICLE",
    "accentColor": "#FB7185",
    "author": "Devon Grant",
    "artist_or_author": "Devon Grant",
    "authorRole": "Marvel Continuity Archivist",
    "publishedAt": "Sept 17, 2026",
    "release_date": "2026-09-17",
    "readTime": "7 MIN READ",
    "duration": "7 MIN READ",
    "duration_seconds": 420,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 96.8,
    "popularity_score": 96.8,
    "viewCount": 94100,
    "view_count": 94100,
    "rating": 4.8,
    "ratingsCount": 810,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Issue Runs",
      "Earth Timelines",
      "Key Issues",
      "Mutant Lore"
    ],
    "synopsis": "Krakoa is gone, the Resurrection Protocols are history, and Charles Xavier is a prisoner at Graymalkin. Here is the definitive issue-by-issue roadmap for the three flagship X-Men books.",
    "body_text": "## 01. Life After Paradise: Three Visions for Mutant Survival\n\nFor five real-world years, the Krakoan Age gave mutants immortality, diplomatic immunity, and a living island nation. Its collapse leaves the species more fractured than ever—not just geographically, but philosophically.\n\nWithout Charles Xavier’s dream or Magneto’s island citadel to unite them, Scott Summers, Anna Marie (Rogue), and Kate Pryde have stopped waiting for consensus.\n\n> “We had a nation, we had resurrection, and the world still built Sentinels. Now we have a factory in Alaska and a list of emergencies.”\n\n## 02. Essential Reading Matrix & Key Issue Checklist\n\nStart with X-Men (2024) #1 for the geopolitical backbone and Beast’s memory-reverted resurrection, then pair it with Uncanny X-Men #1 for the emotional heart of the Outlier kids, and Storm #1 for Omega-level cosmic stakes alongside the Avengers.",
    "keyTakeaways": [
      "Cyclops leads a militant strike force out of a converted Sentinel factory in Merle, Alaska (X-Men by MacKay & Stegman).",
      "Rogue and Gambit anchor a southern gothic haven for young outcasts in New Orleans (Uncanny X-Men by Simone & Marquez).",
      "Kitty Pryde and Emma Frost mentor brand-new mutant recruits in Chicago (Exceptional X-Men by Ewing & Carnero)."
    ],
    "sections": [
      {
        "heading": "01. Life After Paradise: Three Visions for Mutant Survival",
        "paragraphs": [
          "For five real-world years, the Krakoan Age gave mutants immortality, diplomatic immunity, and a living island nation. Its collapse leaves the species more fractured than ever—not just geographically, but philosophically.",
          "Without Charles Xavier’s dream or Magneto’s island citadel to unite them, Scott Summers, Anna Marie (Rogue), and Kate Pryde have stopped waiting for consensus."
        ],
        "quote": "“We had a nation, we had resurrection, and the world still built Sentinels. Now we have a factory in Alaska and a list of emergencies.”"
      },
      {
        "heading": "02. Essential Reading Matrix & Key Issue Checklist",
        "paragraphs": [
          "Start with X-Men (2024) #1 for the geopolitical backbone and Beast’s memory-reverted resurrection, then pair it with Uncanny X-Men #1 for the emotional heart of the Outlier kids, and Storm #1 for Omega-level cosmic stakes alongside the Avengers."
        ]
      }
    ]
  },
  {
    "id": "art-comics-dc-absolute",
    "slug": "dc-absolute-universe",
    "topicLabel": "DC Absolute Universe",
    "title": "DC Absolute Universe Guide: How Darkseid Engineered Earth-Alpha’s Underdog Trinity",
    "subtitle": "A blue-collar Batman without billions, a Superman raised in Krypton’s mines, and a Wonder Woman forged in Hell.",
    "category_slug": "comics",
    "universe": "comics",
    "universeName": "Comics",
    "content_type": "ARTICLE",
    "accentColor": "#FB7185",
    "author": "Victor Sterling",
    "artist_or_author": "Victor Sterling",
    "authorRole": "Senior Comics Editor",
    "publishedAt": "Sept 16, 2026",
    "release_date": "2026-09-16",
    "readTime": "7 MIN READ",
    "duration": "7 MIN READ",
    "duration_seconds": 420,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 99.1,
    "popularity_score": 99.1,
    "viewCount": 158900,
    "view_count": 158900,
    "rating": 5,
    "ratingsCount": 1410,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Issue Runs",
      "Earth Timelines",
      "Variant Art",
      "Key Issues"
    ],
    "synopsis": "Following the DC All In Special, a new universe born from Darkseid’s omega energy strips Batman, Superman, and Wonder Woman of their traditional privileges—turning them into radical agents of chaos.",
    "body_text": "## 01. A Universe Built on Darkseid’s Foundation\n\nOn Prime Earth, superhero hope is the default metaphysical constant, forcing villains to fight uphill against destiny. In the Absolute Universe (Earth-Alpha), created after Darkseid’s demise in the DC All In Special, tyranny and systemic oppression are the natural laws of reality.\n\nTo survive in a world stacked against them, the Trinity cannot rely on Wayne Manor fortunes, Themysciran paradise, or Smallville Americana. They have to burn brighter and hit harder.\n\n> “Take away the mansion, the butler, and the trust fund—what’s left is a six-foot-six brick wall who knows every load-bearing beam in Gotham.”\n\n## 02. Variant Covers & First-Print Collector Radar\n\nAbsolute Batman #1 has already crossed seven printings, with Nick Dragotta’s 1:50 foil variant and Jim Lee’s gatefold covers commanding top tier status in the Collector Vault.",
    "keyTakeaways": [
      "Absolute Batman (Scott Snyder & Nick Dragotta) reimagines Bruce Wayne as a 24-year-old civil engineer whose chest symbol detaches into a battle-axe.",
      "Absolute Wonder Woman (Kelly Thompson & Hayden Sherman) raises Diana in the Underworld under Circe’s tutelage wielding a Buster-sized runesword.",
      "Absolute Superman (Jason Aaron & Rafa Sandoval) makes Kal-El a survivor of Krypton’s working-class Labor Guild."
    ],
    "sections": [
      {
        "heading": "01. A Universe Built on Darkseid’s Foundation",
        "paragraphs": [
          "On Prime Earth, superhero hope is the default metaphysical constant, forcing villains to fight uphill against destiny. In the Absolute Universe (Earth-Alpha), created after Darkseid’s demise in the DC All In Special, tyranny and systemic oppression are the natural laws of reality.",
          "To survive in a world stacked against them, the Trinity cannot rely on Wayne Manor fortunes, Themysciran paradise, or Smallville Americana. They have to burn brighter and hit harder."
        ],
        "quote": "“Take away the mansion, the butler, and the trust fund—what’s left is a six-foot-six brick wall who knows every load-bearing beam in Gotham.”"
      },
      {
        "heading": "02. Variant Covers & First-Print Collector Radar",
        "paragraphs": [
          "Absolute Batman #1 has already crossed seven printings, with Nick Dragotta’s 1:50 foil variant and Jim Lee’s gatefold covers commanding top tier status in the Collector Vault."
        ]
      }
    ]
  },
  {
    "id": "art-comics-spawn",
    "slug": "spawn-multiverse-run",
    "topicLabel": "Spawn Multiverse Run",
    "title": "Spawn’s Scorched Multiverse: Gunslinger, King Spawn & Rat City Continuity Guide",
    "subtitle": "Navigating Todd McFarlane’s expanding shared universe beyond Issue #350—from Dead Zones and Hell’s Throne to cyberpunk 2111.",
    "category_slug": "comics",
    "universe": "comics",
    "universeName": "Comics",
    "content_type": "ARTICLE",
    "accentColor": "#FB7185",
    "author": "Dante Callahan",
    "artist_or_author": "Dante Callahan",
    "authorRole": "Indie & Image Comics Specialist",
    "publishedAt": "Sept 05, 2026",
    "release_date": "2026-09-05",
    "readTime": "5 MIN READ",
    "duration": "5 MIN READ",
    "duration_seconds": 300,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 93.4,
    "popularity_score": 93.4,
    "viewCount": 68400,
    "view_count": 68400,
    "rating": 4.7,
    "ratingsCount": 530,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Issue Runs",
      "Variant Art",
      "Key Issues",
      "Image Comics"
    ],
    "synopsis": "How the longest-running creator-owned comic in history evolved into a multi-title line featuring medieval hellspawns, time-displaced outlaws, and futuristic necroplasm soldiers.",
    "body_text": "## 01. Beyond Issue #350: The War for the Vacant Throne\n\nFor decades, Spawn was a solitary urban horror story set in the alleys of New York. Today, the Spawn Universe operates as a full dark-fantasy war epic where Heaven, Hell, and the Greenworld fight over the Dead Zones—while Al Simmons refuses to kneel to any of them.\n\n> “The necroplasm timer used to count down to damnation; now it counts down to revolution.”",
    "keyTakeaways": [
      "After Al Simmons detonated the time-rift around Issue #300, Hellspawns from past and future eras converged on the present.",
      "Gunslinger Spawn (Javi Fernandez) and King Spawn remain the two highest-selling indie ongoing series of the decade.",
      "Rat City introduces Peter Cairn, a cybernetic amputee bonded to residual necroplasm nanites in the year 2111."
    ],
    "sections": [
      {
        "heading": "01. Beyond Issue #350: The War for the Vacant Throne",
        "paragraphs": [
          "For decades, Spawn was a solitary urban horror story set in the alleys of New York. Today, the Spawn Universe operates as a full dark-fantasy war epic where Heaven, Hell, and the Greenworld fight over the Dead Zones—while Al Simmons refuses to kneel to any of them."
        ],
        "quote": "“The necroplasm timer used to count down to damnation; now it counts down to revolution.”"
      }
    ]
  },
  {
    "id": "art-manga-one-piece",
    "slug": "one-piece-void-century-clues",
    "topicLabel": "One Piece Void Century Clues",
    "title": "One Piece Void Century & Elbaf Arc Dossier: Vegapunk’s Broadcast, Joy Boy & Loki",
    "subtitle": "Piecing together the sunken world hypothesis, the Harley mural texts of Elbaf, and the twenty kingdoms that became the World Government.",
    "category_slug": "manga",
    "universe": "manga",
    "universeName": "Manga",
    "content_type": "ARTICLE",
    "accentColor": "#FB923C",
    "author": "Haruto Sorano",
    "artist_or_author": "Haruto Sorano",
    "authorRole": "Grand Line Archivist",
    "publishedAt": "Sept 22, 2026",
    "release_date": "2026-09-22",
    "readTime": "8 MIN READ",
    "duration": "8 MIN READ",
    "duration_seconds": 480,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 99.6,
    "popularity_score": 99.6,
    "viewCount": 198400,
    "view_count": 198400,
    "rating": 5,
    "ratingsCount": 1750,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Chapter Drops",
      "Mangaka Spotlight",
      "One Piece",
      "Lore Theories"
    ],
    "synopsis": "Dr. Vegapunk’s global transmission changed everything we knew about the geography of the Blue Planet. Now on the branches of the Adam Tree in Elbaf, ancient murals reveal the three wars of history.",
    "body_text": "## 01. Two Hundred Meters Below: The Sunken Continents\n\nFor twenty-seven years, readers assumed the scattered island chains of the Grand Line and Four Blues were the natural geography of Eiichiro Oda’s world. Vegapunk’s pre-recorded broadcast from Egghead shattered that paradigm: the Straw Hats have been sailing across the mountain peaks of a drowned civilization.\n\nEvery time Imu activates the Mother Flame to erase an island like Lulusia, global sea levels rise by another meter—meaning the ideological conflict of the Void Century never truly ended.\n\n> “Whoever claims the One Piece will decide the fate of this sinking world.”\n\n## 02. Elbaf’s Adam Tree & The Accursed Prince Loki\n\nUpon reaching the land of the Giants, the narrative scale expands into Norse mythology. Chained to the base of the Treasure Tree Adam in the Underworld is Prince Loki, who claims the title of the Sun God who will bring Ragnarok to the world.",
    "keyTakeaways": [
      "Sea levels rose by 200 meters during the Void Century due to the deployment of the three Ancient Weapons, submerging the original continents.",
      "Joy Boy was the history’s first pirate, fighting alongside the Iron Giant Emet and the Zunesha clan against the 20 Allied Nations.",
      "Elbaf’s sacred Adam Tree preserves the First, Second, and Third World prophecies depicting the Sun God Nika."
    ],
    "sections": [
      {
        "heading": "01. Two Hundred Meters Below: The Sunken Continents",
        "paragraphs": [
          "For twenty-seven years, readers assumed the scattered island chains of the Grand Line and Four Blues were the natural geography of Eiichiro Oda’s world. Vegapunk’s pre-recorded broadcast from Egghead shattered that paradigm: the Straw Hats have been sailing across the mountain peaks of a drowned civilization.",
          "Every time Imu activates the Mother Flame to erase an island like Lulusia, global sea levels rise by another meter—meaning the ideological conflict of the Void Century never truly ended."
        ],
        "quote": "“Whoever claims the One Piece will decide the fate of this sinking world.”"
      },
      {
        "heading": "02. Elbaf’s Adam Tree & The Accursed Prince Loki",
        "paragraphs": [
          "Upon reaching the land of the Giants, the narrative scale expands into Norse mythology. Chained to the base of the Treasure Tree Adam in the Underworld is Prince Loki, who claims the title of the Sun God who will bring Ragnarok to the world."
        ]
      }
    ]
  },
  {
    "id": "art-manga-vagabond",
    "slug": "vagabond-remaster",
    "topicLabel": "Vagabond Remaster",
    "title": "Vagabond Definitive Edition & Takehiko Inoue’s Sumi-e Brushwork Masterclass",
    "subtitle": "Why Inoue switched from G-pen nibs to traditional calligraphy brushes, and how Musashi Miyamoto’s farming arc redefines strength.",
    "category_slug": "manga",
    "universe": "manga",
    "universeName": "Manga",
    "content_type": "ARTICLE",
    "accentColor": "#FB923C",
    "author": "Reiichi Kurosawa",
    "artist_or_author": "Reiichi Kurosawa",
    "authorRole": "Seinen Art & Print Historian",
    "publishedAt": "Sept 13, 2026",
    "release_date": "2026-09-13",
    "readTime": "6 MIN READ",
    "duration": "6 MIN READ",
    "duration_seconds": 360,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 96.7,
    "popularity_score": 96.7,
    "viewCount": 93200,
    "view_count": 93200,
    "rating": 4.9,
    "ratingsCount": 870,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Seinen Top",
      "Mangaka Spotlight",
      "Brushwork",
      "Collector Print"
    ],
    "synopsis": "Examining the oversized hardcover Definitive Editions of Takehiko Inoue’s Vagabond, the visual evolution from Yoshioka 70-man slaughter to quiet rice-paddy cultivation, and the exhibition epilogue.",
    "body_text": "## 01. The Sword and the Brush: Why Inoue Abandoned the G-Pen\n\nMidway through serializing Vagabond, Takehiko Inoue realized that rigid steel G-pen nibs were fighting against the philosophical transformation of his protagonist, Shinmen Takezo (Miyamoto Musashi). Just as Musashi had to unlearn brute force to perceive the flow of all things, Inoue switched to an unforgiving Japanese calligraphy brush.\n\nThe result is linework that breathes on the page—where a frayed dry-brush sweep conveys the spray of snow and blood in the Yoshioka courtyard.\n\n> “Invincible is merely a word. Once you look beyond the blade, you see that heaven and earth have no opponent.”",
    "keyTakeaways": [
      "Transitioning to a traditional hair brush allowed Inoue to capture breathing, wind, and water tension in a single organic stroke.",
      "The 70-versus-1 Yoshioka duel in Volume 27 remains one of the greatest sustained sequences of sequential art ever printed.",
      "The Definitive Hardcover editions restore original magazine color spreads on heavyweight archival matte stock."
    ],
    "sections": [
      {
        "heading": "01. The Sword and the Brush: Why Inoue Abandoned the G-Pen",
        "paragraphs": [
          "Midway through serializing Vagabond, Takehiko Inoue realized that rigid steel G-pen nibs were fighting against the philosophical transformation of his protagonist, Shinmen Takezo (Miyamoto Musashi). Just as Musashi had to unlearn brute force to perceive the flow of all things, Inoue switched to an unforgiving Japanese calligraphy brush.",
          "The result is linework that breathes on the page—where a frayed dry-brush sweep conveys the spray of snow and blood in the Yoshioka courtyard."
        ],
        "quote": "“Invincible is merely a word. Once you look beyond the blade, you see that heaven and earth have no opponent.”"
      }
    ]
  },
  {
    "id": "art-manga-choujin-x",
    "slug": "choujin-x-volume-12",
    "topicLabel": "Choujin X Volume 12",
    "title": "Choujin X Volume 12 Breakdown: Sui Ishida’s Unchained Schedule & Calamity Lore",
    "subtitle": "How the creator of Tokyo Ghoul found creative liberation by publishing on his own terms—and where Tokio Kurohara’s Beast transformation leads.",
    "category_slug": "manga",
    "universe": "manga",
    "universeName": "Manga",
    "content_type": "ARTICLE",
    "accentColor": "#FB923C",
    "author": "Yuna Hasegawa",
    "artist_or_author": "Yuna Hasegawa",
    "authorRole": "Manga Editorial Analyst",
    "publishedAt": "Sept 08, 2026",
    "release_date": "2026-09-08",
    "readTime": "5 MIN READ",
    "duration": "5 MIN READ",
    "duration_seconds": 300,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 93.8,
    "popularity_score": 93.8,
    "viewCount": 74500,
    "view_count": 74500,
    "rating": 4.8,
    "ratingsCount": 620,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Chapter Drops",
      "Raw Scans",
      "Seinen Top",
      "Mangaka Spotlight"
    ],
    "synopsis": "Freed from weekly page-count constraints on Tonari no Young Jump, Sui Ishida delivers surreal horror, dark slapstick, and devastating tragedy in the Tower of Mourning siege.",
    "body_text": "## 01. The Vulture and the Lion: Tokio & Azuma’s Inverted Arc\n\nAt the start of Choujin X, Tokio Kurohara saw himself only as a scavenger orbiting his brilliant childhood friend Azuma Higashi. Twelve volumes later, after surviving the time-skip training in Iwato, Tokio carries the terrifying composure of a veteran soldier while Azuma grapples with the existential truth of his own creation.\n\n> “To \"Raise\" as a Choujin is to die once and refuse to accept the verdict.”",
    "keyTakeaways": [
      "Ishida draws Choujin X without fixed weekly deadlines or assistant teams, resulting in deeply personal, painterly shading.",
      "The dynamic between Tokio (the vulture who became an iron-willed warrior) and Azuma (the hero complex forged of iron) inversions classic shonen rivalries.",
      "Volume 12 brings the Zora and Yamato Mori confrontation over the Mark of the Beast to a boiling point."
    ],
    "sections": [
      {
        "heading": "01. The Vulture and the Lion: Tokio & Azuma’s Inverted Arc",
        "paragraphs": [
          "At the start of Choujin X, Tokio Kurohara saw himself only as a scavenger orbiting his brilliant childhood friend Azuma Higashi. Twelve volumes later, after surviving the time-skip training in Iwato, Tokio carries the terrifying composure of a veteran soldier while Azuma grapples with the existential truth of his own creation."
        ],
        "quote": "“To \"Raise\" as a Choujin is to die once and refuse to accept the verdict.”"
      }
    ]
  },
  {
    "id": "art-cosplay-eva01",
    "slug": "eva-01-high-density-eva-foam",
    "topicLabel": "EVA-01 High-Density EVA Foam",
    "title": "EVA-01 Test Type Armor Build Log: High-Density 100kg/m³ EVA Foam & Internal Stilts",
    "subtitle": "Step-by-step blueprint for scaling Evangelion Unit-01’s towering shoulder pylons, articulated jaw hinge, and UV-reactive neon green trim.",
    "category_slug": "cosplay",
    "universe": "cosplay",
    "universeName": "Cosplay",
    "content_type": "ARTICLE",
    "accentColor": "#C084FC",
    "author": "Kira \"ForgeCraft\" Vance",
    "artist_or_author": "Kira \"ForgeCraft\" Vance",
    "authorRole": "WCS Finalist & Master Armorer",
    "publishedAt": "Sept 19, 2026",
    "release_date": "2026-09-19",
    "readTime": "7 MIN READ",
    "duration": "7 MIN READ",
    "duration_seconds": 420,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 97.4,
    "popularity_score": 97.4,
    "viewCount": 108600,
    "view_count": 108600,
    "rating": 4.9,
    "ratingsCount": 940,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Foam Crafting",
      "Con Galleries",
      "Mecha Rig",
      "LED Wiring"
    ],
    "synopsis": "Mecha proportions defy human anatomy. Learn how to construct an 8-foot wearable Evangelion Unit-01 rig using 10mm high-density EVA foam, PVC backpack load distribution, and automotive urethane paint.",
    "body_text": "## 01. Solving the Mecha Proportion Problem\n\nHuman beings have wider hips and shorter legs than Hideaki Anno’s biomechanical Evangelion units. To achieve that wasp-waisted, long-limbed silhouette without looking boxy, your build must start from the ground up with 14-inch drywall stilts concealed inside digitized calf armor.\n\nBy raising your natural knee joint into the upper thigh of the mecha leg, you gain the elongated shin ratio that makes EVA-01 instantly recognizable from across a convention hall.\n\n> “Great mecha cosplay is 40% foam beveling and 60% structural load engineering on your lower spine.”\n\n## 02. Articulated Berserk Jaw & Fluorescent Edge Painting\n\nUsing a simple elastic return-spring anchored to your chin cup, the lower helmet mandible snaps open when you speak or roar—revealing cast-resin biomechanical teeth painted with gloss clear coat.",
    "keyTakeaways": [
      "Use 100kg/m³ high-density EVA foam for structural torso plates and 6mm 60kg/m³ foam for curved helmet compounds.",
      "Mount shoulder pylons to an internal aluminum hiking-frame harness rather than Velcro shoulder straps to prevent sagging.",
      "Seal foam with 3 coats of Plasti Dip before airbrushing metallic violet and fluorescent lime acrylics."
    ],
    "sections": [
      {
        "heading": "01. Solving the Mecha Proportion Problem",
        "paragraphs": [
          "Human beings have wider hips and shorter legs than Hideaki Anno’s biomechanical Evangelion units. To achieve that wasp-waisted, long-limbed silhouette without looking boxy, your build must start from the ground up with 14-inch drywall stilts concealed inside digitized calf armor.",
          "By raising your natural knee joint into the upper thigh of the mecha leg, you gain the elongated shin ratio that makes EVA-01 instantly recognizable from across a convention hall."
        ],
        "quote": "“Great mecha cosplay is 40% foam beveling and 60% structural load engineering on your lower spine.”"
      },
      {
        "heading": "02. Articulated Berserk Jaw & Fluorescent Edge Painting",
        "paragraphs": [
          "Using a simple elastic return-spring anchored to your chin cup, the lower helmet mandible snaps open when you speak or roar—revealing cast-resin biomechanical teeth painted with gloss clear coat."
        ]
      }
    ]
  },
  {
    "id": "art-cosplay-monowire",
    "slug": "cyberpunk-led-monowire",
    "topicLabel": "Cyberpunk LED Monowire",
    "title": "Cyberpunk Thermal Monowire & Sandevistan Spine: WS2812B Addressable LED & Arduino Guide",
    "subtitle": "Wiring side-glow fiber optics, custom 3D-printed wrist housings, and reactive motion-sensor pulse routines for Night City builds.",
    "category_slug": "cosplay",
    "universe": "cosplay",
    "universeName": "Cosplay",
    "content_type": "ARTICLE",
    "accentColor": "#C084FC",
    "author": "Tariq Al-Mansoor",
    "artist_or_author": "Tariq Al-Mansoor",
    "authorRole": "Wearable Electronics & Prop Engineer",
    "publishedAt": "Sept 10, 2026",
    "release_date": "2026-09-10",
    "readTime": "6 MIN READ",
    "duration": "6 MIN READ",
    "duration_seconds": 360,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 95.3,
    "popularity_score": 95.3,
    "viewCount": 86900,
    "view_count": 86900,
    "rating": 4.9,
    "ratingsCount": 780,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "LED Wiring",
      "3D Printing",
      "Cyberpunk",
      "Foam Crafting"
    ],
    "synopsis": "How to build a convention-safe, high-luminosity Thermal Monowire and David Martinez Sandevistan spinal implant using Arduino Nano ESP32, FastLED libraries, and 5mm PMMA side-glow fiber.",
    "body_text": "## 01. Side-Glow Fiber Optics vs. COB LED Strips\n\nTraditional LED strips are too wide and fragile to whip through the air for photoshoots. For an authentic Cyberpunk 2077 Monowire, 4mm solid-core PMMA side-glow optical cable gives you a flexible, unbreakable whip that illuminates evenly from hilt to hilt when driven by dual 3-watt emitters concealed inside 3D-printed cyberware cuffs.\n\n> “When the convention hall lights dim, high-density addressable LEDs turn a good costume into a walking cutscene.”",
    "keyTakeaways": [
      "Pair a 3W high-power Cree LED emitter at both ends of a 4mm solid-core side-glow PMMA fiber optic cable for uniform neon orange glow.",
      "Integrate an MPU-6050 accelerometer in the wrist gauntlet so whipping your arm triggers a white-hot surge animation.",
      "Always wire a dedicated 5V UBEC step-down regulator with a 5A inline blade fuse inside your battery pouch."
    ],
    "sections": [
      {
        "heading": "01. Side-Glow Fiber Optics vs. COB LED Strips",
        "paragraphs": [
          "Traditional LED strips are too wide and fragile to whip through the air for photoshoots. For an authentic Cyberpunk 2077 Monowire, 4mm solid-core PMMA side-glow optical cable gives you a flexible, unbreakable whip that illuminates evenly from hilt to hilt when driven by dual 3-watt emitters concealed inside 3D-printed cyberware cuffs."
        ],
        "quote": "“When the convention hall lights dim, high-density addressable LEDs turn a good costume into a walking cutscene.”"
      }
    ]
  },
  {
    "id": "art-cosplay-masamune",
    "slug": "sephiroth-masamune-rig",
    "topicLabel": "Sephiroth Masamune Rig",
    "title": "Sephiroth’s 7-Foot Masamune & One-Winged Counterweight Rigging (Con-Safe Breakdown)",
    "subtitle": "Carbon-fiber core rods, magnetic three-piece travel joints, and feather-light articulated wing mechanics that pass weapon check.",
    "category_slug": "cosplay",
    "universe": "cosplay",
    "universeName": "Cosplay",
    "content_type": "ARTICLE",
    "accentColor": "#C084FC",
    "author": "Elena Vance",
    "artist_or_author": "Elena Vance",
    "authorRole": "Master Prop Smith",
    "publishedAt": "Sept 03, 2026",
    "release_date": "2026-09-03",
    "readTime": "6 MIN READ",
    "duration": "6 MIN READ",
    "duration_seconds": 360,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 94,
    "popularity_score": 94,
    "viewCount": 79100,
    "view_count": 79100,
    "rating": 4.8,
    "ratingsCount": 650,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "3D Printing",
      "Foam Crafting",
      "Con Galleries",
      "Final Fantasy"
    ],
    "synopsis": "Building an 84-inch odachi that won’t droop in summer heat AND fits inside a standard checked airline suitcase—complete with CAD dowel tolerances and Alclad II chrome finishing.",
    "body_text": "## 01. Defeating Blade Droop on an 84-Inch Odachi\n\nEvery Final Fantasy VII cosplayer faces the same physics nightmare: a seven-foot katana held at arm’s length acts as a massive lever. If you build the core from PVC pipe or wooden dowels, the tip will sag six inches before your first photoshoot.\n\nThe secret is a dual-rod skeleton of 8mm pultruded carbon-fiber tubes sandwiched between laser-cut Balsa wood ribs and wrapped in 2mm high-density foam.\n\n> “It should look like cold Shinra steel under camera flashes, weigh less than 400 grams, and break down into a backpack in thirty seconds.”",
    "keyTakeaways": [
      "Wooden dowels warp over 5 feet; use hollow pultruded carbon-fiber kite spars with brass sleeve ferrules for zero-droop rigidity.",
      "Divide the blade into three 28-inch segments locked with neodymium N52 magnets and dual alignment pins.",
      "Counterbalance the single right-shoulder black wing with a cross-chest steel plate hidden beneath the SOLDIER pauldron."
    ],
    "sections": [
      {
        "heading": "01. Defeating Blade Droop on an 84-Inch Odachi",
        "paragraphs": [
          "Every Final Fantasy VII cosplayer faces the same physics nightmare: a seven-foot katana held at arm’s length acts as a massive lever. If you build the core from PVC pipe or wooden dowels, the tip will sag six inches before your first photoshoot.",
          "The secret is a dual-rod skeleton of 8mm pultruded carbon-fiber tubes sandwiched between laser-cut Balsa wood ribs and wrapped in 2mm high-density foam."
        ],
        "quote": "“It should look like cold Shinra steel under camera flashes, weigh less than 400 grams, and break down into a backpack in thirty seconds.”"
      }
    ]
  },
  {
    "id": "art-vault-elden-ring",
    "slug": "elden-ring-great-rune-topology",
    "topicLabel": "Elden Ring Great Rune Topology",
    "title": "Elden Ring Great Rune Topology: How the Golden Order’s Mathematical Lattice Fits Together",
    "subtitle": "A verified Community Vault thesis mapping Marika’s Crucible arc, Miquella’s discarded Broken Rune, and the Rune of Death.",
    "category_slug": "community-vault",
    "universe": "community-vault",
    "universeName": "Community Vault",
    "content_type": "ARTICLE",
    "accentColor": "#34D399",
    "author": "Dr. Julian Vance (Verified Fan Scholar)",
    "artist_or_author": "Dr. Julian Vance (Verified Fan Scholar)",
    "authorRole": "Community Vault Gold Medal Essayist",
    "publishedAt": "Sept 20, 2026",
    "release_date": "2026-09-20",
    "readTime": "9 MIN READ",
    "duration": "9 MIN READ",
    "duration_seconds": 540,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 99.2,
    "popularity_score": 99.2,
    "viewCount": 152300,
    "view_count": 152300,
    "rating": 5,
    "ratingsCount": 1460,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Fan Essays",
      "Lore Theories",
      "Moderator Picks",
      "Elden Ring"
    ],
    "synopsis": "In Hidetaka Miyazaki and George R.R. Martin’s Lands Between, the Elden Ring is not a piece of jewelry—it is the metaphysical source code of reality. Here is how every Great Rune geometrically locks into the Farum Azula ancestral glyph.",
    "body_text": "## 01. The Elden Ring as Metaphysical Source Code\n\nWhen Queen Marika plucked the Rune of Destined Death from the Elden Ring and sealed it within Maliketh’s black blade, she didn’t just outlaw mortality—she edited the geometric equation governing souls in the Lands Between.\n\nBy overlaying the individual Great Runes dropped by the demigod shardbearers onto the title screen sigil—and comparing that composite against the primordial relief carved into Maliketh’s boss arena in Crumbling Farum Azula—we can reconstruct the history of the Golden Order’s schisms.\n\n> “The Farum Azula glyph proves the Elden Ring once possessed spiraled roots—the Crucible itself—before Marika pruned the tree into a closed circle.”\n\n## 02. Twin Symmetry: Malenia, Morgott, and Mohg\n\nNotice how Morgott and Mohg’s Great Runes share the exact same phantom circle position, differing only in Morgott’s golden alignment with the central vertical line and Mohg’s blood-soaked corruption. The geometry of the runes tells you the lineage of the demigods before you read a single item description.",
    "keyTakeaways": [
      "Godrick’s Great Rune forms the central anchor four-ring intersection, while Radahn and Rykard occupy the lower-right overlapping orbits.",
      "Radagon’s crisscross trellis pattern represents the rigid Law of Causality and Regression grafted onto Marika’s organic arcs.",
      "Miquella’s discarded rune in the Land of Shadow completes the missing upper circumference linking the twin prodigies Malenia and Miquella."
    ],
    "sections": [
      {
        "heading": "01. The Elden Ring as Metaphysical Source Code",
        "paragraphs": [
          "When Queen Marika plucked the Rune of Destined Death from the Elden Ring and sealed it within Maliketh’s black blade, she didn’t just outlaw mortality—she edited the geometric equation governing souls in the Lands Between.",
          "By overlaying the individual Great Runes dropped by the demigod shardbearers onto the title screen sigil—and comparing that composite against the primordial relief carved into Maliketh’s boss arena in Crumbling Farum Azula—we can reconstruct the history of the Golden Order’s schisms."
        ],
        "quote": "“The Farum Azula glyph proves the Elden Ring once possessed spiraled roots—the Crucible itself—before Marika pruned the tree into a closed circle.”"
      },
      {
        "heading": "02. Twin Symmetry: Malenia, Morgott, and Mohg",
        "paragraphs": [
          "Notice how Morgott and Mohg’s Great Runes share the exact same phantom circle position, differing only in Morgott’s golden alignment with the central vertical line and Mohg’s blood-soaked corruption. The geometry of the runes tells you the lineage of the demigods before you read a single item description."
        ]
      }
    ]
  },
  {
    "id": "art-vault-spider-verse",
    "slug": "spider-verse-animation-deconstruction",
    "topicLabel": "Spider-Verse Animation Deconstruction",
    "title": "Spider-Verse Animation Deconstruction: Variable Frame Rates, Ben-Day Halftones & Emotional Color Scripts",
    "subtitle": "A frame-by-frame Community Vault essay on how Gwen Stacy’s Earth-65 watercolor bleeds and Hobie Brown’s punk collage broke 3D CGI rules.",
    "category_slug": "community-vault",
    "universe": "community-vault",
    "universeName": "Community Vault",
    "content_type": "ARTICLE",
    "accentColor": "#34D399",
    "author": "Soraiaendes Art Collective",
    "artist_or_author": "Soraiaendes Art Collective",
    "authorRole": "Verified Vault Visual Essayist",
    "publishedAt": "Sept 14, 2026",
    "release_date": "2026-09-14",
    "readTime": "7 MIN READ",
    "duration": "7 MIN READ",
    "duration_seconds": 420,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 97.6,
    "popularity_score": 97.6,
    "viewCount": 119800,
    "view_count": 119800,
    "rating": 4.9,
    "ratingsCount": 1090,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Fan Essays",
      "Verified Art",
      "Moderator Picks",
      "Animation"
    ],
    "synopsis": "How Sony Pictures Imageworks abandoned photorealistic motion blur in favor of animating on twos, CMYK registration offsets, and universe-specific rendering engines.",
    "body_text": "## 01. Replacing Motion Blur with Comic Book Smears\n\nFor twenty years, western 3D feature animation chased physical camera simulation: smooth 24-frames-per-second interpolation and Gaussian motion blur. The Spider-Verse team asked a radical question: what if pausing any single frame of a 3D movie looked like a hand-inked comic panel?\n\nBy stripping out automatic motion blur and hand-drawing 2D ink lines over 3D geometry rigs, every punch and web-swing retains crisp graphic impact.\n\n> “Hobie Brown refuses to obey Miguel O’Hara’s canon rules—so even his animation pipeline refuses to stay on a single consistent frame rate.”",
    "keyTakeaways": [
      "Miles Morales begins Into the Spider-Verse animated \"on twos\" (12 fps) during his clumsy early swings, graduating to \"on ones\" (24 fps) when he masters his leap of faith.",
      "Earth-65 (Gwen’s world) treats the background ceiling and walls like a wet mood ring, dripping cyan and magenta washes based on her emotional dialogue.",
      "Spider-Punk (Hobie Brown) is composited with asynchronous frame rates—his guitar, vest, and outline animate on 2s, 3s, and 4s simultaneously."
    ],
    "sections": [
      {
        "heading": "01. Replacing Motion Blur with Comic Book Smears",
        "paragraphs": [
          "For twenty years, western 3D feature animation chased physical camera simulation: smooth 24-frames-per-second interpolation and Gaussian motion blur. The Spider-Verse team asked a radical question: what if pausing any single frame of a 3D movie looked like a hand-inked comic panel?",
          "By stripping out automatic motion blur and hand-drawing 2D ink lines over 3D geometry rigs, every punch and web-swing retains crisp graphic impact."
        ],
        "quote": "“Hobie Brown refuses to obey Miguel O’Hara’s canon rules—so even his animation pipeline refuses to stay on a single consistent frame rate.”"
      }
    ]
  },
  {
    "id": "art-vault-evangelion",
    "slug": "neon-genesis-philosophy",
    "topicLabel": "Neon Genesis Philosophy",
    "title": "Neon Genesis Evangelion & The Hedgehog’s Dilemma: From 1995 Broadcast to Thrice Upon a Time",
    "subtitle": "Tracing Hideaki Anno’s 26-year psychological dialogue with otaku escapism, Schopenhauer’s parable, and the farewell at Ube-Shinkawa Station.",
    "category_slug": "community-vault",
    "universe": "community-vault",
    "universeName": "Community Vault",
    "content_type": "ARTICLE",
    "accentColor": "#34D399",
    "author": "Naomi Vance-Kato",
    "artist_or_author": "Naomi Vance-Kato",
    "authorRole": "Community Vault Senior Essayist",
    "publishedAt": "Sept 06, 2026",
    "release_date": "2026-09-06",
    "readTime": "8 MIN READ",
    "duration": "8 MIN READ",
    "duration_seconds": 480,
    "releaseYear": "2026",
    "release_year": "2026",
    "popularityScore": 96.5,
    "popularity_score": 96.5,
    "viewCount": 102400,
    "view_count": 102400,
    "rating": 4.9,
    "ratingsCount": 950,
    "is_published": true,
    "media_url": null,
    "thumbnail": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    "thumbnail_url": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    "heroImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80",
    "tags": [
      "Fan Essays",
      "Lore Theories",
      "Moderator Picks",
      "Evangelion"
    ],
    "synopsis": "Why the AT Field is the literal manifestation of human ego boundaries, and how the three distinct endings of Evangelion mirror the emotional maturation of both its creator and its audience.",
    "body_text": "## 01. The AT Field as the Wall Around the Heart\n\nIn Episode 3 of Neon Genesis Evangelion, Ritsuko Akagi invokes Arthur Schopenhauer’s parable of the Hedgehog’s Dilemma: on a freezing winter night, porcupines huddle together for warmth, yet the closer they draw, the more their quills pierce one another.\n\nWithin Evangelion’s esoteric Kabbalistic lore, the AT Field is not merely a sci-fi forcefield used by Angels and Evas—it is the physical boundary of the individual soul that keeps us from dissolving into the primordial soup of LCL.\n\n> “Goodbye, all of Evangelion—and welcome back to the real world waiting outside the theater doors.”",
    "keyTakeaways": [
      "The AT (Absolute Terror) Field represents the psychological wall every individual erects to avoid the pain of intimacy.",
      "End of Evangelion (1997) confronted toxic escapism with visceral rejection, whereas 3.0+1.0 (2021) offered grace, adulthood, and reconciliation.",
      "The final live-action shot of Ube-Shinkawa Station literally pulls the viewer out of the painted anime medium and back into reality."
    ],
    "sections": [
      {
        "heading": "01. The AT Field as the Wall Around the Heart",
        "paragraphs": [
          "In Episode 3 of Neon Genesis Evangelion, Ritsuko Akagi invokes Arthur Schopenhauer’s parable of the Hedgehog’s Dilemma: on a freezing winter night, porcupines huddle together for warmth, yet the closer they draw, the more their quills pierce one another.",
          "Within Evangelion’s esoteric Kabbalistic lore, the AT Field is not merely a sci-fi forcefield used by Angels and Evas—it is the physical boundary of the individual soul that keeps us from dissolving into the primordial soup of LCL."
        ],
        "quote": "“Goodbye, all of Evangelion—and welcome back to the real world waiting outside the theater doors.”"
      }
    ]
  }
]

/**
 * Helper to resolve a Universe object by its slug/id
 */
export function getUniverseBySlug(slug) {
  if (!slug) return UNIVERSES[0]
  const normalized = String(slug).toLowerCase().trim()
  return (
    UNIVERSES.find(
      (u) =>
        u.slug.toLowerCase() === normalized ||
        u.id.toLowerCase() === normalized ||
        u.name.toLowerCase() === normalized
    ) || UNIVERSES[0]
  )
}

/**
 * Helper to get all curated articles for a given universe slug
 */
export function getArticlesByUniverse(universeSlug) {
  if (!universeSlug || universeSlug === 'all') return ARTICLES_DATA
  const normalized = String(universeSlug).toLowerCase().trim()
  return ARTICLES_DATA.filter((a) => a.universe.toLowerCase() === normalized)
}

/**
 * Helper to resolve an article by slug, id, or popularTopic label
 */
export function getArticleBySlugOrTopic(identifier) {
  if (!identifier) return ARTICLES_DATA[0]
  const normalized = String(identifier).toLowerCase().trim()
  return (
    ARTICLES_DATA.find(
      (a) =>
        a.slug.toLowerCase() === normalized ||
        a.id.toLowerCase() === normalized ||
        (a.topicLabel && a.topicLabel.toLowerCase() === normalized) ||
        a.title.toLowerCase() === normalized
    ) ||
    ARTICLES_DATA.find(
      (a) =>
        a.title.toLowerCase().includes(normalized) ||
        (a.topicLabel && a.topicLabel.toLowerCase().includes(normalized))
    ) ||
    ARTICLES_DATA[0]
  )
}

export const MERCH_DROPS = [
  {
    "id": "merch-eva",
    "slug": "merch-eva",
    "name": "EVA-01 Berserk Mode 1/4 Scale Statue",
    "title": "EVA-01 Berserk Mode 1/4 Scale Statue",
    "category_slug": "anime",
    "categorySlug": "anime",
    "universe": "Anime / Mecha",
    "universeColor": "#A3E635",
    "tag": "LIMITED_EDITION",
    "statusTag": "[LIMITED EDITION]",
    "badgeType": "LIMITED EDITION",
    "statusTagColor": "bg-[#FB7185] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Oct 15, 2026 • 12:00 PM EST",
    "dropDate": "Oct 15, 2026 • 12:00 PM EST",
    "msrp": "$340 MSRP (Preview)",
    "views": "3.8k views",
    "view_count": 3820,
    "viewCountNum": 3820,
    "popularity_score": 4.95,
    "manufacturer": "Prime 1 Studio x Khara",
    "partnerUrl": "https://www.prime1studio.com",
    "image_url": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    "description": "Cold-cast porcelain polystone statue featuring LED fluorescent blood splatter, swappable roaring head sculpt, and display base."
  },
  {
    "id": "merch-elden",
    "slug": "merch-elden",
    "name": "Shadow of the Erdtree 4xLP Boxset Vinyl",
    "title": "Shadow of the Erdtree 4xLP Boxset Vinyl",
    "category_slug": "gaming",
    "categorySlug": "gaming",
    "universe": "Gaming / Soundtrack",
    "universeColor": "#FACC15",
    "tag": "PRE_ORDER",
    "statusTag": "[PRE-ORDER]",
    "badgeType": "PRE-ORDER",
    "statusTagColor": "bg-[#FACC15] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Nov 02, 2026 • 09:00 AM PST",
    "dropDate": "Nov 02, 2026 • 09:00 AM PST",
    "msrp": "$110 MSRP (Preview)",
    "views": "2.4k views",
    "view_count": 2410,
    "viewCountNum": 2410,
    "popularity_score": 4.9,
    "manufacturer": "Bandai Namco Music Live",
    "partnerUrl": "https://store.bandainamcoent.com",
    "image_url": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
    "description": "Pressed on 180g gold splatter virgin wax with deluxe gold foil gatefold jacket and 40-page liner notes artbook."
  },
  {
    "id": "merch-gwen",
    "slug": "merch-gwen",
    "name": "Spider-Gwen Multiverse Neon Bomber Jacket",
    "title": "Spider-Gwen Multiverse Neon Bomber Jacket",
    "category_slug": "comics",
    "categorySlug": "comics",
    "universe": "Comics & Cosplay",
    "universeColor": "#C084FC",
    "tag": "COLLECTIBLE",
    "statusTag": "[COLLECTIBLE]",
    "badgeType": "COLLECTIBLE",
    "statusTagColor": "bg-[#34D399] text-black",
    "is_upcoming": false,
    "drop_date": null,
    "drop_date_text": "Dec 05, 2026 • Batch 2 Restock",
    "dropDate": "Dec 05, 2026 • Batch 2 Restock",
    "msrp": "$165 MSRP (Preview)",
    "views": "1.9k views",
    "view_count": 1940,
    "viewCountNum": 1940,
    "popularity_score": 4.88,
    "manufacturer": "Marvel HeroWear Labs",
    "partnerUrl": "https://www.marvel.com",
    "image_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    "description": "High-density weatherproof satin bomber with screen-accurate web lining, hidden pocket for con badges, and reactive neon piping."
  },
  {
    "id": "merch-aespa-lightstick",
    "slug": "merch-aespa-lightstick",
    "name": "Aespa SYNK Hyper-Lightstick Ver. 2 Metallic",
    "title": "Aespa SYNK Hyper-Lightstick Ver. 2 Metallic",
    "category_slug": "kpop",
    "categorySlug": "kpop",
    "universe": "K-Pop",
    "universeColor": "#F43F5E",
    "tag": "PRE_ORDER",
    "statusTag": "[PRE-ORDER]",
    "badgeType": "PRE-ORDER",
    "statusTagColor": "bg-[#FACC15] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Oct 28, 2026 • Global Weverse Shop",
    "dropDate": "Oct 28, 2026 • Global Weverse Shop",
    "msrp": "$68 MSRP (Preview)",
    "views": "5.1k views",
    "view_count": 5120,
    "viewCountNum": 5120,
    "popularity_score": 5.0,
    "manufacturer": "SM Brand Marketing",
    "partnerUrl": "https://smtownandstore.com",
    "image_url": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    "description": "Bluetooth stadium DMX synchronized lightstick with interchangeable KWANGYA aurora emblem cores and holographic photocard set."
  },
  {
    "id": "merch-dune-crysknife",
    "slug": "merch-dune-crysknife",
    "name": "Arrakis Fremen Crysknife 1:1 Prop Replica",
    "title": "Arrakis Fremen Crysknife 1:1 Prop Replica",
    "category_slug": "movies-tv",
    "categorySlug": "movies-tv",
    "universe": "Movies & TV",
    "universeColor": "#38BDF8",
    "tag": "LIMITED_EDITION",
    "statusTag": "[LIMITED EDITION]",
    "badgeType": "LIMITED EDITION",
    "statusTagColor": "bg-[#FB7185] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Nov 19, 2026 • Numbered Run of 1,500",
    "dropDate": "Nov 19, 2026 • Numbered Run of 1,500",
    "msrp": "$220 MSRP (Preview)",
    "views": "2.9k views",
    "view_count": 2890,
    "viewCountNum": 2890,
    "popularity_score": 4.92,
    "manufacturer": "United Cutlery x Legendary",
    "partnerUrl": "https://www.legendary.com",
    "image_url": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "description": "Hand-finished crystalline resin blade with carved hawk-crest handle, magnetic floating sandstone wall mount, and certificate of authenticity."
  },
  {
    "id": "merch-kagurabachi-enten",
    "slug": "merch-kagurabachi-enten",
    "name": "Enchanted Blade Enten Die-Cast Letter Opener & Stand",
    "title": "Enchanted Blade Enten Die-Cast Letter Opener & Stand",
    "category_slug": "manga",
    "categorySlug": "manga",
    "universe": "Manga",
    "universeColor": "#FB923C",
    "tag": "COLLECTIBLE",
    "statusTag": "[COLLECTIBLE]",
    "badgeType": "COLLECTIBLE",
    "statusTagColor": "bg-[#34D399] text-black",
    "is_upcoming": false,
    "drop_date": null,
    "drop_date_text": "Dec 14, 2026 • Jump Festa Exclusive",
    "dropDate": "Dec 14, 2026 • Jump Festa Exclusive",
    "msrp": "$55 MSRP (Preview)",
    "views": "3.2k views",
    "view_count": 3210,
    "viewCountNum": 3210,
    "popularity_score": 4.93,
    "manufacturer": "Shueisha Jump Shop",
    "partnerUrl": "https://jumpshop-online.com",
    "image_url": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    "description": "Heavyweight zinc-alloy miniature katana with translucent obsidian goldfish acrylic wave stand and engraved tsuba guard."
  },
  {
    "id": "merch-reze-standee",
    "slug": "merch-reze-standee",
    "name": "Chainsaw Man Reze Movie 4DX Light Up Standee",
    "title": "Chainsaw Man Reze Movie 4DX Light Up Standee",
    "category_slug": "anime",
    "categorySlug": "anime",
    "universe": "Anime",
    "universeColor": "#A3E635",
    "tag": "COLLECTIBLE",
    "statusTag": "[COLLECTIBLE]",
    "badgeType": "COLLECTIBLE",
    "statusTagColor": "bg-[#34D399] text-black",
    "is_upcoming": false,
    "drop_date": null,
    "drop_date_text": "Oct 05, 2026 • Retail Now",
    "dropDate": "Oct 05, 2026 • Retail Now",
    "msrp": "$45 MSRP (Preview)",
    "views": "1.6k views",
    "view_count": 1560,
    "viewCountNum": 1560,
    "popularity_score": 4.72,
    "manufacturer": "Mappa Store",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "description": "Double-sided acrylic standee with LED edge lighting and layered photocard set."
  },
  {
    "id": "merch-jjk-hoodie",
    "slug": "merch-jjk-hoodie",
    "name": "Jujutsu Kaisen Unlimited Void Hoodie",
    "title": "Jujutsu Kaisen Unlimited Void Hoodie",
    "category_slug": "anime",
    "categorySlug": "anime",
    "universe": "Anime",
    "universeColor": "#A3E635",
    "tag": "OFFICIAL_LICENSED",
    "statusTag": "[OFFICIAL LICENSED]",
    "badgeType": "OFFICIAL LICENSED",
    "statusTagColor": "bg-[#38BDF8] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Nov 21, 2026 • 10:00 AM JST",
    "dropDate": "Nov 21, 2026 • 10:00 AM JST",
    "msrp": "$85 MSRP (Preview)",
    "views": "1.3k views",
    "view_count": 1290,
    "viewCountNum": 1290,
    "popularity_score": 4.61,
    "manufacturer": "MAPPAx Shueisha",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    "description": "Heavyweight 400gsm hoodie with infinity-barrier sleeve print and woven hem patch."
  },
  {
    "id": "merch-nightreign-figma",
    "slug": "merch-nightreign-figma",
    "name": "Nightreign Tarnished Warrior Figma",
    "title": "Nightreign Tarnished Warrior Figma",
    "category_slug": "gaming",
    "categorySlug": "gaming",
    "universe": "Gaming",
    "universeColor": "#FACC15",
    "tag": "PRE_ORDER",
    "statusTag": "[PRE-ORDER]",
    "badgeType": "PRE-ORDER",
    "statusTagColor": "bg-[#FACC15] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Dec 12, 2026 • 08:00 PM EST",
    "dropDate": "Dec 12, 2026 • 08:00 PM EST",
    "msrp": "$135 MSRP (Preview)",
    "views": "1.2k views",
    "view_count": 1180,
    "viewCountNum": 1180,
    "popularity_score": 4.58,
    "manufacturer": "Bandai Spirits",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
    "description": "Posable figma with soft goods cape, golden order chain, and translucent Erdtree effect part."
  },
  {
    "id": "merch-edgerunner-jacket",
    "slug": "merch-edgerunner-jacket",
    "name": "Cyberpunk 2077 Edgerunner Bomber Jacket",
    "title": "Cyberpunk 2077 Edgerunner Bomber Jacket",
    "category_slug": "gaming",
    "categorySlug": "gaming",
    "universe": "Gaming",
    "universeColor": "#FACC15",
    "tag": "OFFICIAL_LICENSED",
    "statusTag": "[OFFICIAL LICENSED]",
    "badgeType": "OFFICIAL LICENSED",
    "statusTagColor": "bg-[#38BDF8] text-black",
    "is_upcoming": false,
    "drop_date": null,
    "drop_date_text": "Sep 18, 2026 • Retail Now",
    "dropDate": "Sep 18, 2026 • Retail Now",
    "msrp": "$180 MSRP (Preview)",
    "views": "980 views",
    "view_count": 980,
    "viewCountNum": 980,
    "popularity_score": 4.49,
    "manufacturer": "CD PROJEKT RED Store",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    "description": "Weatherproof bomber with reflective Night City skyline lining and embroidered edgerunner crest."
  },
  {
    "id": "merch-dune-set",
    "slug": "merch-dune-set",
    "name": "Dune Messiah Atreides Desert Set",
    "title": "Dune Messiah Atreides Desert Set",
    "category_slug": "movies-tv",
    "categorySlug": "movies-tv",
    "universe": "Movies & TV",
    "universeColor": "#38BDF8",
    "tag": "LIMITED_EDITION",
    "statusTag": "[LIMITED EDITION]",
    "badgeType": "LIMITED EDITION",
    "statusTagColor": "bg-[#FB7185] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Dec 18, 2026 • 12:00 PM EST",
    "dropDate": "Dec 18, 2026 • 12:00 PM EST",
    "msrp": "$120 MSRP (Preview)",
    "views": "1.4k views",
    "view_count": 1420,
    "viewCountNum": 1420,
    "popularity_score": 4.67,
    "manufacturer": "Warner Bros. Collector",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "description": "Stillu suit replica prop, Atreides crest pin, and desert-issue journal in a numbered display case."
  },
  {
    "id": "merch-miles-tee",
    "slug": "merch-miles-tee",
    "name": "Spider-Verse Miles Momentum Tee",
    "title": "Spider-Verse Miles Momentum Tee",
    "category_slug": "movies-tv",
    "categorySlug": "movies-tv",
    "universe": "Movies & TV",
    "universeColor": "#38BDF8",
    "tag": "OFFICIAL_LICENSED",
    "statusTag": "[OFFICIAL LICENSED]",
    "badgeType": "OFFICIAL LICENSED",
    "statusTagColor": "bg-[#38BDF8] text-black",
    "is_upcoming": false,
    "drop_date": null,
    "drop_date_text": "Oct 01, 2026 • Retail Now",
    "dropDate": "Oct 01, 2026 • Retail Now",
    "msrp": "$35 MSRP (Preview)",
    "views": "870 views",
    "view_count": 870,
    "viewCountNum": 870,
    "popularity_score": 4.42,
    "manufacturer": "Marvel HeroWear Labs",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80",
    "description": "Soft cotton tee with chromatic glitch print and glow-in-the-dust shoulder graphic."
  },
  {
    "id": "merch-blade-runner-jacket",
    "slug": "merch-blade-runner-jacket",
    "name": "Blade Runner 2049 Jacket Replica",
    "title": "Blade Runner 2049 Jacket Replica",
    "category_slug": "movies-tv",
    "categorySlug": "movies-tv",
    "universe": "Movies & TV",
    "universeColor": "#38BDF8",
    "tag": "LIMITED_EDITION",
    "statusTag": "[LIMITED EDITION]",
    "badgeType": "LIMITED EDITION",
    "statusTagColor": "bg-[#FB7185] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Jan 09, 2027 • 09:00 AM PST",
    "dropDate": "Jan 09, 2027 • 09:00 AM PST",
    "msrp": "$420 MSRP (Preview)",
    "views": "760 views",
    "view_count": 760,
    "viewCountNum": 760,
    "popularity_score": 4.36,
    "manufacturer": "Alcon Industries Archive",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "description": "Weather-worn decommissioned officer coat with frayed collar, badge, and archival certificate."
  },
  {
    "id": "merch-supernova-lightstick",
    "slug": "merch-supernova-lightstick",
    "name": "Aespa Supernova Lightstick 2.0",
    "title": "Aespa Supernova Lightstick 2.0",
    "category_slug": "kpop",
    "categorySlug": "kpop",
    "universe": "K-Pop",
    "universeColor": "#F43F5E",
    "tag": "PRE_ORDER",
    "statusTag": "[PRE-ORDER]",
    "badgeType": "PRE-ORDER",
    "statusTagColor": "bg-[#FACC15] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Oct 10, 2026 • 06:00 PM KST",
    "dropDate": "Oct 10, 2026 • 06:00 PM KST",
    "msrp": "$95 MSRP (Preview)",
    "views": "1.7k views",
    "view_count": 1680,
    "viewCountNum": 1680,
    "popularity_score": 4.74,
    "manufacturer": "SM Entertainment Official",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    "description": "Bluetooth-synced lightstick with motion reactive halo, photocards, and concert lanyard."
  },
  {
    "id": "merch-newjeans-vault",
    "slug": "merch-newjeans-vault",
    "name": "NewJeans HYBE Vault Photocard Set",
    "title": "NewJeans HYBE Vault Photocard Set",
    "category_slug": "kpop",
    "categorySlug": "kpop",
    "universe": "K-Pop",
    "universeColor": "#F43F5E",
    "tag": "COLLECTIBLE",
    "statusTag": "[COLLECTIBLE]",
    "badgeType": "COLLECTIBLE",
    "statusTagColor": "bg-[#34D399] text-black",
    "is_upcoming": false,
    "drop_date": null,
    "drop_date_text": "Sep 22, 2026 • Retail Now",
    "dropDate": "Sep 22, 2026 • Retail Now",
    "msrp": "$28 MSRP (Preview)",
    "views": "1.0k views",
    "view_count": 1040,
    "viewCountNum": 1040,
    "popularity_score": 4.45,
    "manufacturer": "ADOR Global Store",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
    "description": "Sealed first-gen photocard vault with holographic inserts and numbered collector sleeve."
  },
  {
    "id": "merch-skz-vinyl",
    "slug": "merch-skz-vinyl",
    "name": "Stray Kids SKZOOZ 2xLP Vinyl",
    "title": "Stray Kids SKZOOZ 2xLP Vinyl",
    "category_slug": "kpop",
    "categorySlug": "kpop",
    "universe": "K-Pop",
    "universeColor": "#F43F5E",
    "tag": "LIMITED_EDITION",
    "statusTag": "[LIMITED EDITION]",
    "badgeType": "LIMITED EDITION",
    "statusTagColor": "bg-[#FB7185] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Nov 14, 2026 • 07:00 PM KST",
    "dropDate": "Nov 14, 2026 • 07:00 PM KST",
    "msrp": "$58 MSRP (Preview)",
    "views": "890 views",
    "view_count": 890,
    "viewCountNum": 890,
    "popularity_score": 4.4,
    "manufacturer": "JYP Entertainment",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    "description": "Neon press 2xLP with poster insert, tracklist lithograph, and numbered jacket variant."
  },
  {
    "id": "merch-x-men-ashes-variant",
    "slug": "merch-x-men-ashes-variant",
    "name": "X-Men From the Ashes #1 Variant Cover",
    "title": "X-Men From the Ashes #1 Variant Cover",
    "category_slug": "comics",
    "categorySlug": "comics",
    "universe": "Comics",
    "universeColor": "#FB7185",
    "tag": "COLLECTIBLE",
    "statusTag": "[COLLECTIBLE]",
    "badgeType": "COLLECTIBLE",
    "statusTagColor": "bg-[#34D399] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Oct 08, 2026 • 10:00 AM ET",
    "dropDate": "Oct 08, 2026 • 10:00 AM ET",
    "msrp": "$6 MSRP (Preview)",
    "views": "1.1k views",
    "view_count": 1130,
    "viewCountNum": 1130,
    "popularity_score": 4.52,
    "manufacturer": "Marvel Comics Direct",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=600&q=80",
    "description": "JSA 1:25 foil variant in a bagged and boarded protective sleeve for grading."
  },
  {
    "id": "merch-spawn-compendium",
    "slug": "merch-spawn-compendium",
    "name": "Spawn Compendium Reprint Slipcase",
    "title": "Spawn Compendium Reprint Slipcase",
    "category_slug": "comics",
    "categorySlug": "comics",
    "universe": "Comics",
    "universeColor": "#FB7185",
    "tag": "LIMITED_EDITION",
    "statusTag": "[LIMITED EDITION]",
    "badgeType": "LIMITED EDITION",
    "statusTagColor": "bg-[#FB7185] text-black",
    "is_upcoming": false,
    "drop_date": null,
    "drop_date_text": "Sep 30, 2026 • Retail Now",
    "dropDate": "Sep 30, 2026 • Retail Now",
    "msrp": "$180 MSRP (Preview)",
    "views": "720 views",
    "view_count": 720,
    "viewCountNum": 720,
    "popularity_score": 4.31,
    "manufacturer": "Image Comics",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=600&q=80",
    "description": "Die-cut slipcase reprint with metallic chain wrap, cape bookmark, and foil spine."
  },
  {
    "id": "merch-absolute-posters",
    "slug": "merch-absolute-posters",
    "name": "DC Absolute Universe Poster Set",
    "title": "DC Absolute Universe Poster Set",
    "category_slug": "comics",
    "categorySlug": "comics",
    "universe": "Comics",
    "universeColor": "#FB7185",
    "tag": "COLLECTIBLE",
    "statusTag": "[COLLECTIBLE]",
    "badgeType": "COLLECTIBLE",
    "statusTagColor": "bg-[#34D399] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Dec 01, 2026 • 12:00 PM ET",
    "dropDate": "Dec 01, 2026 • 12:00 PM ET",
    "msrp": "$30 MSRP (Preview)",
    "views": "640 views",
    "view_count": 640,
    "viewCountNum": 640,
    "popularity_score": 4.28,
    "manufacturer": "DC Direct",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "description": "Three 18x24 inch archival matte posters with UV-coated color and collector tube."
  },
  {
    "id": "merch-berserk-vinyl",
    "slug": "merch-berserk-vinyl",
    "name": "Berserk Golden Age Vinyl Boxset",
    "title": "Berserk Golden Age Vinyl Boxset",
    "category_slug": "manga",
    "categorySlug": "manga",
    "universe": "Manga",
    "universeColor": "#FB923C",
    "tag": "LIMITED_EDITION",
    "statusTag": "[LIMITED EDITION]",
    "badgeType": "LIMITED EDITION",
    "statusTagColor": "bg-[#FB7185] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Nov 28, 2026 • 12:00 PM JST",
    "dropDate": "Nov 28, 2026 • 12:00 PM JST",
    "msrp": "$320 MSRP (Preview)",
    "views": "1.5k views",
    "view_count": 1510,
    "viewCountNum": 1510,
    "popularity_score": 4.69,
    "manufacturer": "Kentaro Miura Archive",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "description": "Deluxe cloth-bound slipcase with facsimile art pages, 5LP soundtrack, and Beherit print."
  },
  {
    "id": "merch-wano-map-tee",
    "slug": "merch-wano-map-tee",
    "name": "One Piece Wano Map T-Shirt",
    "title": "One Piece Wano Map T-Shirt",
    "category_slug": "manga",
    "categorySlug": "manga",
    "universe": "Manga",
    "universeColor": "#FB923C",
    "tag": "OFFICIAL_LICENSED",
    "statusTag": "[OFFICIAL LICENSED]",
    "badgeType": "OFFICIAL LICENSED",
    "statusTagColor": "bg-[#38BDF8] text-black",
    "is_upcoming": false,
    "drop_date": null,
    "drop_date_text": "Sep 12, 2026 • Retail Now",
    "dropDate": "Sep 12, 2026 • Retail Now",
    "msrp": "$32 MSRP (Preview)",
    "views": "830 views",
    "view_count": 830,
    "viewCountNum": 830,
    "popularity_score": 4.38,
    "manufacturer": "Toei Animation Store",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    "description": "Garment-dyed tee with double-sided Wano map, straw hat rope print, and stitched hem."
  },
  {
    "id": "merch-vagabond-folio",
    "slug": "merch-vagabond-folio",
    "name": "Vagabond Masterpiece Print Folio",
    "title": "Vagabond Masterpiece Print Folio",
    "category_slug": "manga",
    "categorySlug": "manga",
    "universe": "Manga",
    "universeColor": "#FB923C",
    "tag": "COLLECTIBLE",
    "statusTag": "[COLLECTIBLE]",
    "badgeType": "COLLECTIBLE",
    "statusTagColor": "bg-[#34D399] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Dec 20, 2026 • 09:00 AM JST",
    "dropDate": "Dec 20, 2026 • 09:00 AM JST",
    "msrp": "$95 MSRP (Preview)",
    "views": "590 views",
    "view_count": 590,
    "viewCountNum": 590,
    "popularity_score": 4.24,
    "manufacturer": "Kodansha USA",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    "description": "Giclée reproduction folios of 12 ink-wash spreads in a museum-grade portfolio."
  },
  {
    "id": "merch-eva-pattern",
    "slug": "merch-eva-pattern",
    "name": "EVA-01 High-Density EVA Armor Pattern",
    "title": "EVA-01 High-Density EVA Armor Pattern",
    "category_slug": "cosplay",
    "categorySlug": "cosplay",
    "universe": "Cosplay",
    "universeColor": "#C084FC",
    "tag": "COLLECTIBLE",
    "statusTag": "[COLLECTIBLE]",
    "badgeType": "COLLECTIBLE",
    "statusTagColor": "bg-[#34D399] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Oct 30, 2026 • 12:00 PM EST",
    "dropDate": "Oct 30, 2026 • 12:00 PM EST",
    "msrp": "$24 MSRP (Preview)",
    "views": "1.2k views",
    "view_count": 1210,
    "viewCountNum": 1210,
    "popularity_score": 4.55,
    "manufacturer": "Foam Armory",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    "description": "Printable foam armor templates, heat-form guides, and LED harness schematics."
  },
  {
    "id": "merch-masamune-kit",
    "slug": "merch-masamune-kit",
    "name": "Sephiroth Masamune Prop Blade Kit",
    "title": "Sephiroth Masamune Prop Blade Kit",
    "category_slug": "cosplay",
    "categorySlug": "cosplay",
    "universe": "Cosplay",
    "universeColor": "#C084FC",
    "tag": "PRE_ORDER",
    "statusTag": "[PRE-ORDER]",
    "badgeType": "PRE-ORDER",
    "statusTagColor": "bg-[#FACC15] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Nov 07, 2026 • 10:00 AM JST",
    "dropDate": "Nov 07, 2026 • 10:00 AM JST",
    "msrp": "$149 MSRP (Preview)",
    "views": "940 views",
    "view_count": 940,
    "viewCountNum": 940,
    "popularity_score": 4.48,
    "manufacturer": "Nibelung Forge",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "description": "Carbon-fiber blade replica kit with LED mako core, leather wrap, and safe display stand."
  },
  {
    "id": "merch-multiverse-zine",
    "slug": "merch-multiverse-zine",
    "name": "Multiverse Paradox Zine + Poster",
    "title": "Multiverse Paradox Zine + Poster",
    "category_slug": "community-vault",
    "categorySlug": "community-vault",
    "universe": "Community Vault",
    "universeColor": "#34D399",
    "tag": "COLLECTIBLE",
    "statusTag": "[COLLECTIBLE]",
    "badgeType": "COLLECTIBLE",
    "statusTagColor": "bg-[#34D399] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Oct 18, 2026 • 03:00 PM ET",
    "dropDate": "Oct 18, 2026 • 03:00 PM ET",
    "msrp": "$18 MSRP (Preview)",
    "views": "780 views",
    "view_count": 780,
    "viewCountNum": 780,
    "popularity_score": 4.33,
    "manufacturer": "Fan Hub Vault Press",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    "description": "Risograph zine and foil poster exploring canon continuity, curated by the moderators."
  },
  {
    "id": "merch-field-journal",
    "slug": "merch-field-journal",
    "name": "Verified Contributor Field Journal",
    "title": "Verified Contributor Field Journal",
    "category_slug": "community-vault",
    "categorySlug": "community-vault",
    "universe": "Community Vault",
    "universeColor": "#34D399",
    "tag": "OFFICIAL_LICENSED",
    "statusTag": "[OFFICIAL LICENSED]",
    "badgeType": "OFFICIAL LICENSED",
    "statusTagColor": "bg-[#38BDF8] text-black",
    "is_upcoming": false,
    "drop_date": null,
    "drop_date_text": "Sep 09, 2026 • Retail Now",
    "dropDate": "Sep 09, 2026 • Retail Now",
    "msrp": "$22 MSRP (Preview)",
    "views": "660 views",
    "view_count": 660,
    "viewCountNum": 660,
    "popularity_score": 4.27,
    "manufacturer": "Fan Hub Vault Press",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    "description": "Linen-bound dot-grid journal with citation dividers and verified contributor stamp."
  },
  {
    "id": "merch-lore-deskmat",
    "slug": "merch-lore-deskmat",
    "name": "Lore Historian Desk Mat XL",
    "title": "Lore Historian Desk Mat XL",
    "category_slug": "community-vault",
    "categorySlug": "community-vault",
    "universe": "Community Vault",
    "universeColor": "#34D399",
    "tag": "COLLECTIBLE",
    "statusTag": "[COLLECTIBLE]",
    "badgeType": "COLLECTIBLE",
    "statusTagColor": "bg-[#34D399] text-black",
    "is_upcoming": true,
    "drop_date": null,
    "drop_date_text": "Dec 05, 2026 • 12:00 PM ET",
    "dropDate": "Dec 05, 2026 • 12:00 PM ET",
    "msrp": "$40 MSRP (Preview)",
    "views": "520 views",
    "view_count": 520,
    "viewCountNum": 520,
    "popularity_score": 4.2,
    "manufacturer": "Fan Hub Vault Press",
    "partnerUrl": "https://fanhubplus.com",
    "image_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    "description": "Oversized stitched-edge desk mat with multiverse timeline map and UV ink accents."
  }
]

export const UPCOMING_RELEASES = [
  {
    "id": "release-solo-leveling",
    "type": "Anime",
    "category": "anime",
    "title": "Solo Leveling: Season 3",
    "studio": "A-1 Pictures",
    "date": "Oct 18, 2026",
    "targetDate": "2026-10-18T15:00:00Z",
    "status": "[CONFIRMED]",
    "image": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    "description": "The next hunter chapter continues Sung Jinwoo’s climb through the double gates."
  },
  {
    "id": "release-elden-ring",
    "type": "Game",
    "category": "gaming",
    "title": "Elden Ring: Nightreign",
    "studio": "FromSoftware",
    "date": "Nov 12, 2026",
    "targetDate": "2026-11-12T00:00:00Z",
    "status": "[PRE-ORDER]",
    "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
    "description": "A new multiplayer PvE roguelite set in the Lands Between."
  },
  {
    "id": "release-spider-verse",
    "type": "Movie",
    "category": "movies-tv",
    "title": "Spider-Man: Beyond The Spider-Verse",
    "studio": "Sony Pictures Animation",
    "date": "Dec 04, 2026",
    "targetDate": "2026-12-04T18:00:00Z",
    "status": "[TRAILER DROP]",
    "image": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80",
    "description": "Miles Morales returns for the dimensional finale of the Spider-Verse trilogy."
  },
  {
    "id": "release-x-men",
    "type": "Comic",
    "category": "comics",
    "title": "X-Men: From the Ashes Deluxe HC",
    "studio": "Marvel Comics",
    "date": "Oct 29, 2026",
    "targetDate": "2026-10-29T12:00:00Z",
    "status": "[SOLICITED]",
    "image": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=800&q=80",
    "description": "Oversized foil hardcover collecting the landmark post-Krakoan mutant relaunch."
  },
  {
    "id": "release-merch-drops",
    "type": "Merchandise",
    "category": "kpop",
    "title": "Aespa Armageddon World Tour Blu-Ray Vault",
    "studio": "SM Entertainment",
    "date": "Nov 25, 2026",
    "targetDate": "2026-11-25T09:00:00Z",
    "status": "[LIMITED EDITION]",
    "image": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "description": "4K Dolby Atmos concert film with 140-page backstage photobook and lenticular stage pass."
  },
  {
    "id": "release-one-piece",
    "type": "Show",
    "category": "anime",
    "title": "One Piece: The Elbaf Arc Premiere",
    "studio": "Toei Animation",
    "date": "Jan 10, 2027",
    "targetDate": "2027-01-10T14:00:00Z",
    "status": "[SIMULCAST]",
    "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    "description": "The Straw Hat crew enters the final saga and the fabled warrior kingdom of Elbaf."
  }
]

export const CONVENTIONS_DATA = [
  {
    "id": "event-tokyo",
    "slug": "event-tokyo",
    "title": "Comiket 106 Summer Fan Showcase",
    "name": "Comiket 106 Summer Fan Showcase",
    "category_slug": "anime",
    "category": "Anime & Manga",
    "categoryColor": "#A3E635",
    "event_type": "Convention",
    "eventType": "Convention",
    "city": "Tokyo",
    "venue_name": "Tokyo Big Sight, Odaiba",
    "venue": "Tokyo Big Sight, Odaiba",
    "start_date": "2026-10-14",
    "end_date": "2026-10-16",
    "date_month": "OCT",
    "dateMonth": "OCT",
    "date_day": "14-16",
    "dateDay": "14-16",
    "year": "2026",
    "latitude": 35.63,
    "longitude": 139.793,
    "map_x": 78.0,
    "map_y": 35.0,
    "coordinates": {
      "lat": 35.63,
      "lng": 139.793,
      "x": 78,
      "y": 35
    },
    "ticket_url": "https://www.comiket.co.jp/index_e.html",
    "ticketUrl": "https://www.comiket.co.jp/index_e.html",
    "attendees_info": "160,000+ Expected",
    "attendees": "160,000+ Expected",
    "status": "Official Schedule Vetted",
    "description": "The premier global dōjinshi and anime exhibition bringing together indie artists, official studios, and massive cosplay gatherings."
  },
  {
    "id": "event-la-anime",
    "slug": "event-la-anime",
    "title": "Anime Expo & Gaming Summit 2026",
    "name": "Anime Expo & Gaming Summit 2026",
    "category_slug": "gaming",
    "category": "Anime & Gaming",
    "categoryColor": "#FACC15",
    "event_type": "Convention",
    "eventType": "Convention",
    "city": "Los Angeles",
    "venue_name": "Los Angeles Convention Center, CA",
    "venue": "Los Angeles Convention Center, CA",
    "start_date": "2026-11-02",
    "end_date": "2026-11-05",
    "date_month": "NOV",
    "dateMonth": "NOV",
    "date_day": "02-05",
    "dateDay": "02-05",
    "year": "2026",
    "latitude": 34.0407,
    "longitude": -118.2699,
    "map_x": 20.0,
    "map_y": 38.0,
    "coordinates": {
      "lat": 34.0407,
      "lng": -118.2699,
      "x": 20,
      "y": 38
    },
    "ticket_url": "https://www.anime-expo.org",
    "ticketUrl": "https://www.anime-expo.org",
    "attendees_info": "115,000+ Expected",
    "attendees": "115,000+ Expected",
    "status": "Badge Registration Active",
    "description": "North America’s largest celebration of Japanese pop culture, featuring premier world trailer reveals, voice actor panels, and gaming tournaments."
  },
  {
    "id": "event-london",
    "slug": "event-london",
    "title": "MCM Comic Con & World Cosplay Stage",
    "name": "MCM Comic Con & World Cosplay Stage",
    "category_slug": "comics",
    "category": "Comics & Cosplay",
    "categoryColor": "#C084FC",
    "event_type": "Cosplay Meetup",
    "eventType": "Cosplay Meetup",
    "city": "London",
    "venue_name": "ExCeL London, Royal Victoria Dock",
    "venue": "ExCeL London, Royal Victoria Dock",
    "start_date": "2026-10-24",
    "end_date": "2026-10-26",
    "date_month": "OCT",
    "dateMonth": "OCT",
    "date_day": "24-26",
    "dateDay": "24-26",
    "year": "2026",
    "latitude": 51.5074,
    "longitude": 0.0278,
    "map_x": 48.0,
    "map_y": 26.0,
    "coordinates": {
      "lat": 51.5074,
      "lng": 0.0278,
      "x": 48,
      "y": 26
    },
    "ticket_url": "https://www.mcmcomiccon.com",
    "ticketUrl": "https://www.mcmcomiccon.com",
    "attendees_info": "85,000+ Expected",
    "attendees": "85,000+ Expected",
    "status": "Cosplay Championship Finals",
    "description": "The UK’s biggest pop culture con with international guest stars, gaming zones, comics artists alley, and the European Cosplay Championship."
  },
  {
    "id": "event-lagos",
    "slug": "event-lagos",
    "title": "Naija Pop-Con & Afro-Anime Fiesta",
    "name": "Naija Pop-Con & Afro-Anime Fiesta",
    "category_slug": "anime",
    "category": "Anime, Gaming & K-Pop",
    "categoryColor": "#FB923C",
    "event_type": "Cosplay Meetup",
    "eventType": "Cosplay Meetup",
    "city": "Lagos",
    "venue_name": "Landmark Centre, Victoria Island, Lagos",
    "venue": "Landmark Centre, Victoria Island, Lagos",
    "start_date": "2026-11-18",
    "end_date": "2026-11-20",
    "date_month": "NOV",
    "dateMonth": "NOV",
    "date_day": "18-20",
    "dateDay": "18-20",
    "year": "2026",
    "latitude": 6.4281,
    "longitude": 3.4219,
    "map_x": 49.0,
    "map_y": 55.0,
    "coordinates": {
      "lat": 6.4281,
      "lng": 3.4219,
      "x": 49,
      "y": 55
    },
    "ticket_url": "https://comiccon.africa",
    "ticketUrl": "https://comiccon.africa",
    "attendees_info": "25,000+ Expected",
    "attendees": "25,000+ Expected",
    "status": "Community Stage Open",
    "description": "West Africa’s fastest-growing fandom festival with Afrobeats/K-Pop dance-offs, indigenous comic launches, and anime LAN arenas."
  },
  {
    "id": "event-la-kpop",
    "slug": "event-la-kpop",
    "title": "K-Wave Mega Fest & Lightspeed Arena",
    "name": "K-Wave Mega Fest & Lightspeed Arena",
    "category_slug": "kpop",
    "category": "K-Pop",
    "categoryColor": "#F43F5E",
    "event_type": "Screening",
    "eventType": "Screening",
    "city": "Los Angeles",
    "venue_name": "Crypto.com Arena, Los Angeles",
    "venue": "Crypto.com Arena, Los Angeles",
    "start_date": "2026-12-10",
    "end_date": "2026-12-12",
    "date_month": "DEC",
    "dateMonth": "DEC",
    "date_day": "10-12",
    "dateDay": "10-12",
    "year": "2026",
    "latitude": 34.043,
    "longitude": -118.2673,
    "map_x": 22.0,
    "map_y": 40.0,
    "coordinates": {
      "lat": 34.043,
      "lng": -118.2673,
      "x": 22,
      "y": 40
    },
    "ticket_url": "https://www.cryptoarena.com",
    "ticketUrl": "https://www.cryptoarena.com",
    "attendees_info": "40,000+ Expected",
    "attendees": "40,000+ Expected",
    "status": "Lineup Dropping Soon",
    "description": "3 days of 4th & 5th gen K-Pop idol stages, IMAX concert film screenings, lightstick sync demonstrations, and official photocard trading vaults."
  },
  {
    "id": "event-tokyo-screening",
    "slug": "event-tokyo-screening",
    "title": "Shinjuku IMAX Midnight Anime Premiere",
    "name": "Shinjuku IMAX Midnight Anime Premiere",
    "category_slug": "movies-tv",
    "category": "Anime & Movies",
    "categoryColor": "#38BDF8",
    "event_type": "Screening",
    "eventType": "Screening",
    "city": "Tokyo",
    "venue_name": "TOHO Cinemas Shinjuku, Tokyo",
    "venue": "TOHO Cinemas Shinjuku, Tokyo",
    "start_date": "2026-12-19",
    "end_date": "2026-12-19",
    "date_month": "DEC",
    "dateMonth": "DEC",
    "date_day": "19",
    "dateDay": "19",
    "year": "2026",
    "latitude": 35.6938,
    "longitude": 139.7034,
    "map_x": 80.0,
    "map_y": 33.0,
    "coordinates": {
      "lat": 35.6938,
      "lng": 139.7034,
      "x": 80,
      "y": 33
    },
    "ticket_url": "https://hlo.tohotheater.jp",
    "ticketUrl": "https://hlo.tohotheater.jp",
    "attendees_info": "4,500+ Expected",
    "attendees": "4,500+ Expected",
    "status": "VIP Lottery Open",
    "description": "Exclusive 4K laser IMAX marathon screening of Infinity Castle & Edgerunners Remaster with live director Q&A and acoustic OST performance."
  }
]

export const FANDOM_BOT_QA = {
  "Recommend me an anime like Attack on Titan": {
    "question": "Recommend me an anime like Attack on Titan",
    "answer": "If you love the high-stakes political intrigue, brutal survival themes, and philosophical mystery of Attack on Titan, check out these top 3 recommendations:\n\n1. **86 (Eighty-Six)**: Heavy tactical drone warfare with devastating emotional stakes and military bureaucracy.\n2. **Vinland Saga**: Gritty medieval realism tracing revenge, destiny, and the hollow nature of violence.\n3. **Claymore**: Dark fantasy warriors wielding titanic blades against shape-shifting bio-horrors.\n\nAll three are currently cataloged in the Anime Universe directory with spoiler-free episode guides!",
    "reply": "If you love the high-stakes political intrigue, brutal survival themes, and philosophical mystery of Attack on Titan, check out these top 3 recommendations:\n\n1. **86 (Eighty-Six)**: Heavy tactical drone warfare with devastating emotional stakes and military bureaucracy.\n2. **Vinland Saga**: Gritty medieval realism tracing revenge, destiny, and the hollow nature of violence.\n3. **Claymore**: Dark fantasy warriors wielding titanic blades against shape-shifting bio-horrors.\n\nAll three are currently cataloged in the Anime Universe directory with spoiler-free episode guides!",
    "category_slug": "anime",
    "universe_name": "Anime",
    "universe": "Anime",
    "badge": "Anime Lore • Curated",
    "tags": [
      "anime",
      "attack on titan",
      "titan",
      "recommendation",
      "shingeki",
      "86",
      "vinland"
    ],
    "is_active": true
  },
  "Where do I start reading X-Men comics?": {
    "question": "Where do I start reading X-Men comics?",
    "answer": "The X-Men multiverse can be daunting, but here are the three cleanest modern jumping-on points:\n\n1. **House of X / Powers of X (2019 by Jonathan Hickman)**: The absolute definitive modern reinvention. Establishes the mutant sovereign nation of Krakoa.\n2. **X-Men: From the Ashes (2024–2026 Relinquish Run)**: The current ongoing era dealing with the aftermath of Krakoa.\n3. **Astonishing X-Men (Joss Whedon & John Cassaday)**: Self-contained, accessible 24-issue run with classic team dynamics.\n\nCheck our Comics Universe Reading Matrix for issue-by-issue checklists!",
    "reply": "The X-Men multiverse can be daunting, but here are the three cleanest modern jumping-on points:\n\n1. **House of X / Powers of X (2019 by Jonathan Hickman)**: The absolute definitive modern reinvention. Establishes the mutant sovereign nation of Krakoa.\n2. **X-Men: From the Ashes (2024–2026 Relinquish Run)**: The current ongoing era dealing with the aftermath of Krakoa.\n3. **Astonishing X-Men (Joss Whedon & John Cassaday)**: Self-contained, accessible 24-issue run with classic team dynamics.\n\nCheck our Comics Universe Reading Matrix for issue-by-issue checklists!",
    "category_slug": "comics",
    "universe_name": "Comics",
    "universe": "Comics",
    "badge": "Comics Timeline • Verified",
    "tags": [
      "comics",
      "x-men",
      "xmen",
      "reading order",
      "marvel",
      "krakoa",
      "hickman"
    ],
    "is_active": true
  },
  "Upcoming gaming conventions in Q4": {
    "question": "Upcoming gaming conventions in Q4",
    "answer": "Here is your curated Q4 Gaming & Pop-Culture schedule:\n\n• **MCM Comic Con London**: Oct 24-26 (ExCeL London) — features the European Esports Arena and Indie Game Showcase.\n• **Naija Pop-Con Lagos**: Nov 18-20 (Landmark Centre) — Afrogaming LAN and Fighting Game Community tournaments.\n• **Tokyo Game Fest Winter Preview**: Dec 04-06 (Makuhari Messe) — next-gen handheld and VR hardware hands-on.\n\nYou can click 'Add to Calendar' on any event in the Convention Radar section to generate an instant .ics invite!",
    "reply": "Here is your curated Q4 Gaming & Pop-Culture schedule:\n\n• **MCM Comic Con London**: Oct 24-26 (ExCeL London) — features the European Esports Arena and Indie Game Showcase.\n• **Naija Pop-Con Lagos**: Nov 18-20 (Landmark Centre) — Afrogaming LAN and Fighting Game Community tournaments.\n• **Tokyo Game Fest Winter Preview**: Dec 04-06 (Makuhari Messe) — next-gen handheld and VR hardware hands-on.\n\nYou can click 'Add to Calendar' on any event in the Convention Radar section to generate an instant .ics invite!",
    "category_slug": "gaming",
    "universe_name": "Gaming",
    "universe": "Gaming",
    "badge": "Event Radar • Q4 2026",
    "tags": [
      "conventions",
      "gaming",
      "q4",
      "schedule",
      "events",
      "mcm",
      "naija",
      "radar"
    ],
    "is_active": true
  }
}

export const SITEMAP_SECTIONS = [
  {
    "title": "Main Portals",
    "links": [
      {
        "name": "Home Landing",
        "href": "#top"
      },
      {
        "name": "Universal Multiverse Search",
        "href": "#explore"
      },
      {
        "name": "Convention & Gathering Radar",
        "href": "#events"
      },
      {
        "name": "Multimedia Streamer",
        "href": "#multimedia"
      },
      {
        "name": "Bug Report & Feedback",
        "action": "feedback"
      }
    ]
  },
  {
    "title": "8 Fandom Universes",
    "links": [
      {
        "name": "Anime Simulcasts & Bios",
        "filter": "anime"
      },
      {
        "name": "Gaming Metas & Lore",
        "filter": "gaming"
      },
      {
        "name": "Movies & TV Timelines",
        "filter": "movies-tv"
      },
      {
        "name": "K-Pop Comebacks & Charts",
        "filter": "kpop"
      },
      {
        "name": "Comics Multiverse Issues",
        "filter": "comics"
      },
      {
        "name": "Manga Tracker & Mangaka",
        "filter": "manga"
      },
      {
        "name": "Cosplay Crafting & Builds",
        "filter": "cosplay"
      },
      {
        "name": "Community Vault (Verified)",
        "filter": "community-vault"
      }
    ]
  },
  {
    "title": "Features & Tools",
    "links": [
      {
        "name": "Trailer Player (4K Stream)",
        "href": "#multimedia"
      },
      {
        "name": "Soundtrack Waveform Audio",
        "href": "#multimedia"
      },
      {
        "name": "Legends Lore Archive",
        "href": "#characters"
      },
      {
        "name": "The Drop Radar (Showcase)",
        "href": "#merch"
      },
      {
        "name": "FandomBot AI Engine",
        "action": "fandombot"
      },
      {
        "name": "Submit Fan Creation",
        "action": "submit"
      }
    ]
  },
  {
    "title": "User & Administration",
    "links": [
      {
        "name": "Hub Registration",
        "action": "register"
      },
      {
        "name": "User Authentication",
        "action": "login"
      },
      {
        "name": "Collector Dashboard",
        "action": "dashboard"
      },
      {
        "name": "Admin Control Panel",
        "action": "admin"
      },
      {
        "name": "Moderation Queue",
        "action": "moderation"
      },
      {
        "name": "Zero-Clutter Policy",
        "action": "policy"
      }
    ]
  }
]

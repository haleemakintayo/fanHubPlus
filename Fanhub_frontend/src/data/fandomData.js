// Data repository for Fan Hub Plus - TechWiz 7 Fandom Portal

export const UNIVERSES = [
  {
    id: 'anime',
    name: 'Anime',
    slug: 'anime',
    icon: 'Tv',
    accentColor: '#A3E635', // Electric Lime
    badgeTextColor: 'text-black',
    description: 'Seasonal simulcasts, character bios, and opening theme breakdowns.',
    entryCount: '240+ Entries',
    tags: ['Simulcasts', 'Theme Songs', 'Character Lore', 'Spring 2026'],
    topPick: 'Solo Leveling: Arise',
    featuredQuote: '“Dedicate your hearts to the truth across timelines.”',
    popularTopics: ['Jujutsu Kaisen Shinjuku Showdown', 'Demon Slayer Trilogy', 'Chainsaw Man Reze Movie'],
  },
  {
    id: 'gaming',
    name: 'Gaming',
    slug: 'gaming',
    icon: 'Gamepad2',
    accentColor: '#FACC15', // Cyber Yellow
    badgeTextColor: 'text-black',
    description: 'Patch metas, lore archives, speedrun highlights, and cinematics.',
    entryCount: '180+ Entries',
    tags: ['Patch 14.2', 'Speedruns', 'Esports', 'Lore Bible'],
    topPick: 'Elden Ring: Nightreign',
    featuredQuote: '“Wake up, Samurai. We have a universe to burn.”',
    popularTopics: ['GTA VI Vice City Lore', 'Cyberpunk Orion Previews', 'Silksong Tracker'],
  },
  {
    id: 'movies-tv',
    name: 'Movies & TV',
    slug: 'movies-tv',
    icon: 'Film',
    accentColor: '#38BDF8', // Hyper Blue
    badgeTextColor: 'text-black',
    description: 'Cinematic universe timelines, trailers, and cast interviews.',
    entryCount: '310+ Entries',
    tags: ['Canon Timelines', '4K Teasers', 'Casting Leaks', 'Director Cuts'],
    topPick: 'Avengers: Secret Wars Timeline',
    featuredQuote: '“The multiverse is a concept about which we know frighteningly little.”',
    popularTopics: ['Dune Messiah Production', 'The Batman Part II Canon', 'Stranger Things Finale'],
  },
  {
    id: 'kpop',
    name: 'K-Pop',
    slug: 'kpop',
    icon: 'Mic2',
    accentColor: '#F43F5E', // Hot Neon Pink
    badgeTextColor: 'text-white',
    description: 'Comeback calendars, MV streams, discographies, and lightstick guides.',
    entryCount: '125+ Entries',
    tags: ['Comeback Radar', 'Discography', 'Lightstick Sync', 'Fanchants'],
    topPick: 'NewJeans Global Tour',
    featuredQuote: '“Music has no borders; the harmony transcends language.”',
    popularTopics: ['Aespa Armageddon Lore', 'Stray Kids Stadium Tour', 'LE SSERAFIM Coachella Cut'],
  },
  {
    id: 'comics',
    name: 'Comics',
    slug: 'comics',
    icon: 'Zap',
    accentColor: '#FB7185', // Vivid Crimson
    badgeTextColor: 'text-black',
    description: 'Multiverse reading orders, variant covers, and issue releases.',
    entryCount: '95+ Entries',
    tags: ['Issue Runs', 'Earth Timelines', 'Variant Art', 'Key Issues'],
    topPick: 'Ultimate Spider-Man 2026',
    featuredQuote: '“With great power comes the responsibility to preserve the timeline.”',
    popularTopics: ['X-Men From the Ashes', 'DC Absolute Universe', 'Spawn Multiverse Run'],
  },
  {
    id: 'manga',
    name: 'Manga',
    slug: 'manga',
    icon: 'BookOpen',
    accentColor: '#FB923C', // Bright Orange
    badgeTextColor: 'text-black',
    description: 'Chapter trackers, author spotlights, and genre indexes.',
    entryCount: '150+ Entries',
    tags: ['Chapter Drops', 'Mangaka Spotlight', 'Raw Scans', 'Seinen Top'],
    topPick: 'Berserk Legacy Continuation',
    featuredQuote: '“Even if all the stars fade, the ink never truly dies.”',
    popularTopics: ['One Piece Void Century Clues', 'Vagabond Remaster', 'Choujin X Volume 12'],
  },
  {
    id: 'cosplay',
    name: 'Cosplay',
    slug: 'cosplay',
    icon: 'Sparkles',
    accentColor: '#C084FC', // Deep Violet
    badgeTextColor: 'text-black',
    description: 'Build logs, prop crafting guides, and convention galleries.',
    entryCount: '85+ Entries',
    tags: ['Foam Crafting', '3D Printing', 'Con Galleries', 'LED Wiring'],
    topPick: 'WCS 2026 Champion Armor',
    featuredQuote: '“Bring the fictional dream into tactile, wearable reality.”',
    popularTopics: ['EVA-01 High-Density EVA Foam', 'Cyberpunk LED Monowire', 'Sephiroth Masamune Rig'],
  },
  {
    id: 'community-vault',
    name: 'Community Vault',
    slug: 'community-vault',
    icon: 'ShieldCheck',
    accentColor: '#34D399', // Emerald
    badgeTextColor: 'text-black',
    description: 'Fan-submitted essays, reviews, and art showcases (Admin-approved).',
    entryCount: '60+ Entries',
    tags: ['Fan Essays', 'Lore Theories', 'Verified Art', 'Moderator Picks'],
    topPick: 'The Multiverse Paradox Thesis',
    featuredQuote: '“Admin-vetted fan canon, free of spam and toxic clutter.”',
    popularTopics: ['Elden Ring Great Rune Topology', 'Spider-Verse Animation Deconstruction', 'Neon Genesis Philosophy'],
  },
]

export const MULTIMEDIA_DATA = {
  trailers: [
    {
      id: 'cyberpunk-edgerunners',
      title: 'Cyberpunk: Edgerunners - Official Teaser',
      universe: 'Anime / Gaming',
      universeColor: '#A3E635',
      duration: '02:45',
      releaseYear: '2026 Remaster',
      rating: 4.9,
      ratingsCount: 1842,
      views: '4.2M views',
      synopsis: 'A street kid trying to survive in Night City — a tech and body modification-obsessed city of the future. Studio Trigger x CD PROJEKT RED high-octane spectacle.',
      videoThumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'infinity-castle',
      title: 'Demon Slayer: Infinity Castle - Cinematic Teaser',
      universe: 'Anime',
      universeColor: '#FB7185',
      duration: '03:12',
      releaseYear: '2026 Theatrical Run',
      rating: 5.0,
      ratingsCount: 3120,
      views: '7.8M views',
      synopsis: 'The final confrontation draws near as the Demon Slayer Corps breaches the endless shifting corridors of the Infinity Castle.',
      videoThumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'spider-multiverse',
      title: 'Spider-Man: Beyond The Spider-Verse Sneak Peek',
      universe: 'Movies & TV',
      universeColor: '#38BDF8',
      duration: '02:18',
      releaseYear: '2026 Columbia / Marvel',
      rating: 4.8,
      ratingsCount: 2490,
      views: '5.1M views',
      synopsis: 'Miles Morales traverses the chromatic spectrum of anomalous dimensions to rewrite the canonical destiny of all Spider-heroes.',
      videoThumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80',
    }
  ],
  audioTracks: [
    {
      id: 'kpop-supernova',
      title: 'Supernova (Anthem Mix)',
      artist: 'Aespa / TechWiz Edition',
      category: 'K-Pop',
      categoryColor: '#F43F5E',
      duration: '03:12',
      durationSec: 192,
      album: 'Armageddon The 1st Album',
      cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
      likes: '14.8k',
    },
    {
      id: 'elden-symphony',
      title: 'The Golden Order Suite',
      artist: 'FromSoftware Symphony Orchestra',
      category: 'Gaming',
      categoryColor: '#FACC15',
      duration: '04:45',
      durationSec: 285,
      album: 'Shadow of the Erdtree OST',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      likes: '22.3k',
    },
    {
      id: 'anime-horizon',
      title: 'Blazing Horizon (TV Size Opening)',
      artist: 'Eve x King Gnu Collab',
      category: 'Anime',
      categoryColor: '#A3E635',
      duration: '01:30',
      durationSec: 90,
      album: 'Jujutsu Kaisen Season Finale',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
      likes: '19.1k',
    }
  ]
}

export const CHARACTERS_DATA = [
  {
    id: 'ryuto-kazama',
    name: 'Ryuto Kazama',
    alias: 'Titan Slayer',
    universe: 'Anime',
    accentColor: '#A3E635',
    archetype: 'Anime Protagonist',
    origin: 'Scout Regiment Neo • District Shiganshina 2.0',
    faction: 'Survey Scout Vanguard Neo',
    tagline: '“The wall wasn’t built to keep the titans in. It was built to protect them from us.”',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    stats: [
      { label: 'Agility', value: 94, max: 100 },
      { label: 'Power', value: 88, max: 100 },
      { label: 'Strategic IQ', value: 92, max: 100 }
    ],
    details: {
      firstAppearance: 'Ch. 01 "Awakening of the Bloodline"',
      weapon: 'Dual Thunder Spears & Carbon Blade Rigs',
      nemesis: 'The Colossal Behemoth of Ward 12',
      bio: 'Surviving the fall of District 7, Ryuto mastered the 3D maneuver gear before turning 16. His specialized reflex reaction matches hyper-velocity kinetic strikes, enabling split-second decimation of class-15 bio-monstrosities.'
    }
  },
  {
    id: 'valkyrie-v09',
    name: 'Valkyrie V-09',
    alias: 'Cyber Merc',
    universe: 'Gaming',
    accentColor: '#FACC15',
    archetype: 'Gaming Hero',
    origin: 'Neo-Kyoto Underbelly',
    faction: 'Afterlife Independent Mercs',
    tagline: '“When the ICE melts and the sirens cry, my monowire sings the final lullaby.”',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
    stats: [
      { label: 'Class', textValue: 'Vanguard Infiltrator' },
      { label: 'Origin', textValue: 'Neo-Kyoto Underbelly' },
      { label: 'Weapon', textValue: 'Dual Plasma Blades' }
    ],
    details: {
      firstAppearance: 'Night City Patch 2.2 Cyber-Infiltration',
      weapon: 'Thermal Monowire & Arasaka Prototype MK-7',
      nemesis: 'Corporate Overlord Saburo-X',
      bio: 'Equipped with illegal military-grade Sandevistan neural implants and thermal monowires, V-09 infiltrates mega-corporation data fortresses without leaving a single digital trace.'
    }
  },
  {
    id: 'shadow-raven',
    name: 'Shadow Raven',
    alias: 'The Nocturnal Vigilante',
    universe: 'Comics',
    accentColor: '#FB7185',
    archetype: 'Comic Anti-Hero',
    origin: 'Gotham Prime • Earth-99',
    faction: 'Midnight Syndicate',
    tagline: '“Justice is a luxury for the daylight. The dark requires a harsher toll.”',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    stats: [
      { label: 'Universe', textValue: 'Earth-Prime 99' },
      { label: 'First Appearance', textValue: 'Issue #12 (1998)' },
      { label: 'Nemesis', textValue: 'Baron Void' }
    ],
    details: {
      firstAppearance: 'Shadow Syndicate #12 (Collector Silver Holo)',
      weapon: 'Obsidian Batarangs & Dark Energy Cloak',
      nemesis: 'Baron Void (Dimensional Conqueror)',
      bio: 'Exiled from the High Council of Champions after refusing to compromise with political corrupt lords, Shadow Raven established the Midnight Syndicate to hunt down interdimensional syndicate smugglers.'
    }
  },
  {
    id: 'lyra-solaris',
    name: 'Lyra Solaris',
    alias: 'Celestial Weaver',
    universe: 'Manga & Cosplay',
    accentColor: '#C084FC',
    archetype: 'Cosplay & Lore Icon',
    origin: 'Astral Leyline Nexus',
    faction: 'Astral Order of Luminaries',
    tagline: '“The threads of the multiverse weave not by chance, but by deliberate grace.”',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    stats: [
      { label: 'Affinity', textValue: 'Starlight Arcana' },
      { label: 'Rank', textValue: 'Grand Master' },
      { label: 'Relic', textValue: 'Prism Staff' }
    ],
    details: {
      firstAppearance: 'Arcana Chronicles Vol. 4 "Starlight Symphony"',
      weapon: 'Prism Leyline Staff with Luminescent Core',
      nemesis: 'Eclipse Harvester Malakor',
      bio: 'A favorite of master cosplayers worldwide, Lyra Solaris channels solar plasma through custom hand-spun silk armor. Her prop build tutorials have garnered over 3 million views in the Cosplay Guild.'
    }
  }
]

export const MERCH_DROPS = [
  {
    id: 'merch-eva',
    title: 'EVA-01 Berserk Mode 1/4 Scale Statue',
    universe: 'Anime / Mecha',
    universeColor: '#A3E635',
    statusTag: 'LIMITED EDITION',
    statusTagColor: 'bg-[#FB7185] text-black',
    dropDate: 'Oct 15, 2026 • 12:00 PM EST',
    msrp: '$340 MSRP (Preview)',
    views: '3.8k views',
    viewCountNum: 3820,
    manufacturer: 'Prime 1 Studio x Khara',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
    description: 'Cold-cast porcelain polystone statue featuring LED fluorescent blood splatter, swappable roaring head sculpt, and display base.'
  },
  {
    id: 'merch-elden',
    title: 'Shadow of the Erdtree 4xLP Boxset Vinyl',
    universe: 'Gaming / Soundtrack',
    universeColor: '#FACC15',
    statusTag: 'PRE-ORDER SOON',
    statusTagColor: 'bg-[#FACC15] text-black',
    dropDate: 'Nov 02, 2026 • 09:00 AM PST',
    msrp: '$110 MSRP (Preview)',
    views: '2.4k views',
    viewCountNum: 2410,
    manufacturer: 'Bandai Namco Music Live',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
    description: 'Pressed on 180g gold splatter virgin wax with deluxe gold foil gatefold jacket and 40-page liner notes artbook.'
  },
  {
    id: 'merch-gwen',
    title: 'Spider-Gwen Multiverse Neon Bomber Jacket',
    universe: 'Comics & Cosplay',
    universeColor: '#C084FC',
    statusTag: 'OFFICIAL LICENSED',
    statusTagColor: 'bg-[#34D399] text-black',
    dropDate: 'Dec 05, 2026 • Batch 2 Restock',
    msrp: '$165 MSRP (Preview)',
    views: '1.9k views',
    viewCountNum: 1940,
    manufacturer: 'Marvel HeroWear Labs',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
    description: 'High-density weatherproof satin bomber with screen-accurate web lining, hidden pocket for con badges, and reactive neon piping.'
  }
]

export const CONVENTIONS_DATA = [
  {
    id: 'event-tokyo',
    city: 'Tokyo',
    name: 'Comiket 106 Summer Fan Showcase',
    venue: 'Tokyo Big Sight, Odaiba',
    dateMonth: 'AUG',
    dateDay: '14-16',
    year: '2026',
    category: 'Anime & Manga',
    categoryColor: '#A3E635',
    attendees: '160,000+ Expected',
    status: 'Official Schedule Vetted',
    coordinates: { lat: 35.6300, lng: 139.7930, x: 78, y: 35 },
    description: 'The premier global dōjinshi and anime exhibition bringing together indie artists, official studios, and massive cosplay gatherings.'
  },
  {
    id: 'event-la-anime',
    city: 'Los Angeles',
    name: 'Anime Expo & Gaming Summit 2026',
    venue: 'Los Angeles Convention Center, CA',
    dateMonth: 'JUL',
    dateDay: '02-05',
    year: '2026',
    category: 'Anime & Gaming',
    categoryColor: '#FACC15',
    attendees: '115,000+ Expected',
    status: 'Badge Registration Active',
    coordinates: { lat: 34.0407, lng: -118.2699, x: 20, y: 38 },
    description: 'North America’s largest celebration of Japanese pop culture, featuring premier world trailer reveals, voice actor panels, and gaming tournaments.'
  },
  {
    id: 'event-london',
    city: 'London',
    name: 'MCM Comic Con & World Cosplay Stage',
    venue: 'ExCeL London, Royal Victoria Dock',
    dateMonth: 'OCT',
    dateDay: '24-26',
    year: '2026',
    category: 'Comics & Cosplay',
    categoryColor: '#C084FC',
    attendees: '85,000+ Expected',
    status: 'Cosplay Championship Finals',
    coordinates: { lat: 51.5074, lng: 0.0278, x: 48, y: 26 },
    description: 'The UK’s biggest pop culture con with international guest stars, gaming zones, comics artists alley, and the European Cosplay Championship.'
  },
  {
    id: 'event-lagos',
    city: 'Lagos',
    name: 'Naija Pop-Con & Afro-Anime Fiesta',
    venue: 'Landmark Centre, Victoria Island, Lagos',
    dateMonth: 'NOV',
    dateDay: '18-20',
    year: '2026',
    category: 'Anime, Gaming & K-Pop',
    categoryColor: '#FB923C',
    attendees: '25,000+ Expected',
    status: 'Community Stage Open',
    coordinates: { lat: 6.4281, lng: 3.4219, x: 49, y: 55 },
    description: 'West Africa’s fastest-growing fandom festival with Afrobeats/K-Pop dance dance-offs, indigenous comic launches, and anime LAN arenas.'
  },
  {
    id: 'event-la-kpop',
    city: 'Los Angeles',
    name: 'K-Wave Mega Fest & Lightspeed Arena',
    venue: 'Crypto.com Arena, Los Angeles',
    dateMonth: 'DEC',
    dateDay: '10-12',
    year: '2026',
    category: 'K-Pop',
    categoryColor: '#F43F5E',
    attendees: '40,000+ Expected',
    status: 'Lineup Dropping Soon',
    coordinates: { lat: 34.0430, lng: -118.2673, x: 22, y: 40 },
    description: '3 days of 4th & 5th gen K-Pop idol stages, random dance workshops, lightstick sync demonstrations, and official photocard trading vaults.'
  }
]

export const FANDOM_BOT_QA = {
  'Recommend me an anime like Attack on Titan': {
    reply: "If you love the high-stakes political intrigue, brutal survival themes, and philosophical mystery of Attack on Titan, check out these top 3 recommendations:\n\n1. **86 (Eighty-Six)**: Heavy tactical drone warfare with devastating emotional stakes and military bureaucracy.\n2. **Vinland Saga**: Gritty medieval realism tracing revenge, destiny, and the hollow nature of violence.\n3. **Claymore**: Dark fantasy warriors wielding titanic blades against shape-shifting bio-horrors.\n\nAll three are currently cataloged in the Anime Universe directory with spoiler-free episode guides!",
    badge: 'Anime Lore • Curated',
    universe: 'Anime'
  },
  'Where do I start reading X-Men comics?': {
    reply: "The X-Men multiverse can be daunting, but here are the three cleanest modern jumping-on points:\n\n1. **House of X / Powers of X (2019 by Jonathan Hickman)**: The absolute definitive modern reinvention. Establishes the mutant sovereign nation of Krakoa.\n2. **X-Men: From the Ashes (2024–2026 Relinquish Run)**: The current ongoing era dealing with the aftermath of Krakoa.\n3. **Astonishing X-Men (Joss Whedon & John Cassaday)**: Self-contained, accessible 24-issue run with classic team dynamics.\n\nCheck our Comics Universe Reading Matrix for issue-by-issue checklists!",
    badge: 'Comics Timeline • Verified',
    universe: 'Comics'
  },
  'Upcoming gaming conventions in Q4': {
    reply: "Here is your curated Q4 Gaming & Pop-Culture schedule:\n\n• **MCM Comic Con London**: Oct 24-26 (ExCeL London) — features the European Esports Arena and Indie Game Showcase.\n• **Naija Pop-Con Lagos**: Nov 18-20 (Landmark Centre) — Afrogaming LAN and Fighting Game Community tournaments.\n• **Tokyo Game Fest Winter Preview**: Dec 04-06 (Makuhari Messe) — next-gen handheld and VR hardware hands-on.\n\nYou can click 'Add to Calendar' on any event in the Convention Radar section to generate an instant .ics invite!",
    badge: 'Event Radar • Q4 2026',
    universe: 'Gaming'
  }
}

export const SITEMAP_SECTIONS = [
  {
    title: 'Main Portals',
    links: [
      { name: 'Home Landing', href: '#top' },
      { name: 'Universal Multiverse Search', href: '#explore' },
      { name: 'Convention & Gathering Radar', href: '#events' },
      { name: 'Multimedia Streamer', href: '#multimedia' },
      { name: 'Bug Report & Feedback', action: 'feedback' },
      { name: 'SRS TechWiz 7 Spec Doc', action: 'about' }
    ]
  },
  {
    title: '8 Fandom Universes',
    links: [
      { name: 'Anime Simulcasts & Bios', filter: 'anime' },
      { name: 'Gaming Metas & Lore', filter: 'gaming' },
      { name: 'Movies & TV Timelines', filter: 'movies-tv' },
      { name: 'K-Pop Comebacks & Charts', filter: 'kpop' },
      { name: 'Comics Multiverse Issues', filter: 'comics' },
      { name: 'Manga Tracker & Mangaka', filter: 'manga' },
      { name: 'Cosplay Crafting & Builds', filter: 'cosplay' },
      { name: 'Community Vault (Verified)', filter: 'community-vault' }
    ]
  },
  {
    title: 'Features & Tools',
    links: [
      { name: 'Trailer Player (4K Stream)', href: '#multimedia' },
      { name: 'Soundtrack Waveform Audio', href: '#multimedia' },
      { name: 'Legends Lore Archive', href: '#characters' },
      { name: 'The Drop Radar (Showcase)', href: '#merch' },
      { name: 'FandomBot AI Engine', action: 'fandombot' },
      { name: 'Submit Fan Creation', action: 'submit' }
    ]
  },
  {
    title: 'User & Administration',
    links: [
      { name: 'Hub Registration', action: 'register' },
      { name: 'User Authentication', action: 'login' },
      { name: 'Collector Dashboard', action: 'dashboard' },
      { name: 'Admin Control Panel', action: 'admin' },
      { name: 'SRS Moderation Queue', action: 'moderation' },
      { name: 'Zero-Clutter Policy', action: 'policy' }
    ]
  }
]

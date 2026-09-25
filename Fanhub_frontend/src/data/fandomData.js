// Data repository for Fan Hub Plus

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
      durationSec: 165,
      releaseYear: '2026 Remaster',
      rating: 4.9,
      ratingsCount: 1842,
      views: '4.2M views',
      synopsis: 'A street kid trying to survive in Night City — a tech and body modification-obsessed city of the future. Studio Trigger x CD PROJEKT RED high-octane spectacle.',
      videoThumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://youtu.be/x4ztgjvfU60?si=qQfMO9HWMUkkHiYD',
      embedUrl: 'https://www.youtube.com/embed/x4ztgjvfU60',
      youtubeVideoId: 'x4ztgjvfU60',
    },
    {
      id: 'infinity-castle',
      title: 'Demon Slayer: Infinity Castle - Cinematic Teaser',
      universe: 'Anime',
      universeColor: '#FB7185',
      duration: '03:12',
      durationSec: 192,
      releaseYear: '2026 Theatrical Run',
      rating: 5.0,
      ratingsCount: 3120,
      views: '7.8M views',
      synopsis: 'The final confrontation draws near as the Demon Slayer Corps breaches the endless shifting corridors of the Infinity Castle.',
      videoThumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://youtu.be/x7uLutVRBfI?si=IOwYzPC81-fkXm6h',
      embedUrl: 'https://www.youtube.com/embed/x7uLutVRBfI',
      youtubeVideoId: 'x7uLutVRBfI',
    },
    {
      id: 'spider-multiverse',
      title: 'Spider-Man: Beyond The Spider-Verse Sneak Peek',
      universe: 'Movies & TV',
      universeColor: '#38BDF8',
      duration: '02:18',
      durationSec: 138,
      releaseYear: '2026 Columbia / Marvel',
      rating: 4.8,
      ratingsCount: 2490,
      views: '5.1M views',
      synopsis: 'Miles Morales traverses the chromatic spectrum of anomalous dimensions to rewrite the canonical destiny of all Spider-heroes.',
      videoThumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://youtu.be/qclHAbmDOJI?si=m0xKcgqUcJQq9xG1',
      embedUrl: 'https://www.youtube.com/embed/qclHAbmDOJI',
      youtubeVideoId: 'qclHAbmDOJI',
    }
  ],
  audioTracks: [
    {
      id: 'kpop-supernova',
      title: 'Supernova (Anthem Mix)',
      artist: 'Aespa',
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
    universeSlug: 'anime',
    accentColor: '#A3E635',
    archetype: 'Anime Protagonist',
    origin: 'Scout Regiment Neo • District Shiganshina 2.0',
    faction: 'Survey Scout Vanguard Neo',
    tagline: '“The wall wasn’t built to keep the titans in. It was built to protect them from us.”',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
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
    universeSlug: 'gaming',
    accentColor: '#FACC15',
    archetype: 'Gaming Hero',
    origin: 'Neo-Kyoto Underbelly',
    faction: 'Afterlife Independent Mercs',
    tagline: '“When the ICE melts and the sirens cry, my monowire sings the final lullaby.”',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
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
    universeSlug: 'comics',
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
    universe: 'Cosplay',
    universeSlug: 'cosplay',
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
  },
  {
    id: 'paul-muaddib',
    name: 'Kwisatz Navigator',
    alias: 'Sovereign of Arrakis',
    universe: 'Movies & TV',
    universeSlug: 'movies-tv',
    accentColor: '#38BDF8',
    archetype: 'Cinematic Visionary',
    origin: 'Caladan / Deep Desert Sietch',
    faction: 'Fremen Fedaykin Council',
    tagline: '“He who can destroy a thing has the real control of it.”',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    stats: [
      { label: 'Prescience', value: 99, max: 100 },
      { label: 'Voice Mastery', value: 95, max: 100 },
      { label: 'Desert Warfare', value: 96, max: 100 }
    ],
    details: {
      firstAppearance: 'Dune Part One (IMAX 70mm Archival Cut)',
      weapon: 'Crysknife of Maker Tooth & Weirding Module',
      nemesis: 'Padishah Emperor & Bene Gesserit Sisterhood',
      bio: 'Walking the Golden Path across billions of potential futures, the Navigator unites the desert tribes while wrestling with the terrifying galactic jihad sparked in his name.'
    }
  },
  {
    id: 'nova-kwangya',
    name: 'AE-Karina Prime',
    alias: 'Hyper-Pop Avatar',
    universe: 'K-Pop',
    universeSlug: 'kpop',
    accentColor: '#F43F5E',
    archetype: 'Virtual & Stage Idol',
    origin: 'FLAT • KWANGYA Digital Realm',
    faction: 'SYNK Hyper-Lineage',
    tagline: '“Sync your frequency to the Supernova; our stage bends reality.”',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    stats: [
      { label: 'Stage Presence', value: 98, max: 100 },
      { label: 'Vocal Range', value: 93, max: 100 },
      { label: 'SYNK Level', value: 100, max: 100 }
    ],
    details: {
      firstAppearance: 'Savage SYNK Showcase • Armageddon Era',
      weapon: 'Sonic Lightstick Frequency & Rocket Puncher',
      nemesis: 'Black Mamba Hallucination',
      bio: 'Bridging real-world stadium choreography with AI-driven KWANGYA lore, AE-Karina Prime leads the 4th-gen sonic revolution with metallic hyper-pop production.'
    }
  },
  {
    id: 'kuro-kenshin',
    name: 'Chihiro Rokuhira',
    alias: 'Bearer of Enten',
    universe: 'Manga',
    universeSlug: 'manga',
    accentColor: '#FB923C',
    archetype: 'Seinen / Shonen Swordsman',
    origin: 'Kamunabi Forge Sanctuary',
    faction: 'Rokuhira Swordsmith Lineage',
    tagline: '“Every morning I wake up with fresh hatred—and a sharper edge.”',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    stats: [
      { label: 'Swordplay', value: 97, max: 100 },
      { label: 'Spirit Energy', value: 94, max: 100 },
      { label: 'Resolve', value: 100, max: 100 }
    ],
    details: {
      firstAppearance: 'Weekly Shonen Jump Issue #42',
      weapon: 'Enchanted Blade: Enten (Kuro, Aka, Nishiki)',
      nemesis: 'The Hishaku Sorcerer Syndicate',
      bio: 'Trained beside his legendary swordsmith father, Chihiro wields the seventh enchanted katana capable of absorbing and manifesting spirit energy as obsidian goldfish.'
    }
  },
  {
    id: 'archivist-zero',
    name: 'Archivist Zero',
    alias: 'Keeper of the Vault',
    universe: 'Community Vault',
    universeSlug: 'community-vault',
    accentColor: '#34D399',
    archetype: 'Grand Lore Historian',
    origin: 'Citadel of Canon • Sector 08',
    faction: 'Verified Contributors Guild',
    tagline: '“No theory survives without citations; every timeline leaves a footprint.”',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    stats: [
      { label: 'Canon Accuracy', value: 99, max: 100 },
      { label: 'Essays Vetted', textValue: '1,420+ Approved' },
      { label: 'Clearance', textValue: 'Level 5 Moderator' }
    ],
    details: {
      firstAppearance: 'Fan Hub Plus Founding Charter v1.0',
      weapon: 'Cross-Universe Citation Matrix',
      nemesis: 'Unverified Spoilers & Low-Effort Filler',
      bio: 'Synthesizing decades of interviews, artbooks, and frame-by-frame analyses, Archivist Zero curates the Community Vault so only the highest-caliber fan scholarship enters the permanent record.'
    }
  }
]

export const ARTICLES_DATA = [
  // ==================== 1. ANIME ====================
  {
    id: 'art-anime-jjk',
    slug: 'jujutsu-kaisen-shinjuku-showdown',
    topicLabel: 'Jujutsu Kaisen Shinjuku Showdown',
    title: 'Jujutsu Kaisen: Shinjuku Showdown Arc & Domain Clash Mechanics',
    subtitle: 'How Gojo Satoru vs. Ryomen Sukuna rewrote the fundamental rules of barrier jujutsu, binding vows, and modern shonen fight choreography.',
    universe: 'anime',
    universeName: 'Anime',
    accentColor: '#A3E635',
    author: 'Kenji Takahashi',
    authorRole: 'Senior Sakuga & Lore Analyst',
    publishedAt: 'Sept 18, 2026',
    readTime: '7 MIN READ',
    releaseYear: '2026',
    popularityScore: 99.4,
    viewCount: 142800,
    rating: 4.9,
    ratingsCount: 1240,
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1400&q=80',
    tags: ['Simulcasts', 'Character Lore', 'Domain Expansion', 'MAPPA'],
    synopsis: 'An exhaustive technical breakdown of the Shinjuku Showdown—examining open-barrier Malevolent Shrine vs. Unlimited Void, Reverse Cursed Technique burnout recovery, and the animation production pipeline behind the decade’s biggest battle.',
    keyTakeaways: [
      'Open-barrier domains interact with closed shells by striking the exterior structural limit rather than clashing solely on the interior sure-hit command.',
      'Gojo’s compressed basketball-sized barrier inverted internal/external durability parameters learned inside the Prison Realm.',
      'Binding Vows during the climax traded activation hand-signs for permanent chant requirements on the World-Cutting Slash.'
    ],
    sections: [
      {
        heading: '01. Open vs. Closed Barrier Physics in Shinjuku',
        paragraphs: [
          'For over two hundred chapters, Gege Akutami seeded the mechanics of Domain Expansion as the apex of Jujutsu sorcery. Yet until December 24 in Shinjuku, readers had never witnessed how an open-barrier masterpiece like Malevolent Shrine interacts with the metaphysical perfection of Unlimited Void.',
          'Rather than a simple power-level tug-of-war, the five consecutive domain clashes operated like high-stakes systems engineering. By flipping his barrier conditions—strengthening the outer shell against Sukuna’s slashing radius at the cost of internal stability—Gojo demonstrated why combat improvisation matters more than raw cursed energy reserves.'
        ],
        quote: '“Inside the Prison Realm, experiencing a dimension with no physical volume taught Gojo how to compress an infinite void into the palm of his hand.”'
      },
      {
        heading: '02. Mahoraga’s Adaptation & The Blueprint for Infinity',
        paragraphs: [
          'The true chess match beneath the hand-to-hand spectacle revolved around the Eight-Handled Sword Divergent Sila Divine General Mahoraga. Sukuna did not merely summon the Ten Shadows shikigami as a shield; he used Megumi Fushiguro’s soul synchronization to shoulder the burden of adaptation across five domain cycles.',
          'Crucially, Mahoraga’s first adaptation altered the nature of its own cursed energy to neutralize Infinity—something Sukuna could not replicate. Waiting for a second adaptation model yielded the decisive blueprint: expanding the target of Dismantle from the sorcerer himself to the very coordinate space occupied by the world.'
        ]
      },
      {
        heading: '03. Sakuga Direction & Sound Design Legacy',
        paragraphs: [
          'From a broadcast perspective, the Shinjuku Showdown sets a new benchmark for spatial clarity in high-speed urban destruction. Storyboard directors utilized wide architectural lenses of ruined Shinjuku skyscrapers to preserve scale while hollow purple detonations erased entire city blocks.',
          'Combined with dynamic choral arrangements that strip away percussion during split-second Binding Vow reveals, this arc cements Jujutsu Kaisen as the defining action touchstone of the 2020s.'
        ]
      }
    ]
  },
  {
    id: 'art-anime-demon-slayer',
    slug: 'demon-slayer-trilogy',
    topicLabel: 'Demon Slayer Trilogy',
    title: 'Demon Slayer: Infinity Castle Theatrical Trilogy — Visual & Lore Guide',
    subtitle: 'Inside Ufotable’s digital compositing evolution, Nakime’s four-dimensional fortress, and the Hashira’s final Upper Moon matchups.',
    universe: 'anime',
    universeName: 'Anime',
    accentColor: '#A3E635',
    author: 'Aoi Sakamoto',
    authorRole: 'Animation Production Correspondent',
    publishedAt: 'Sept 12, 2026',
    readTime: '6 MIN READ',
    releaseYear: '2026',
    popularityScore: 97.8,
    viewCount: 118400,
    rating: 4.9,
    ratingsCount: 980,
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80',
    tags: ['Theatrical Trilogy', 'Ufotable', 'Hashira Lore', 'Spring 2026'],
    synopsis: 'Why adapting the Infinity Castle arc as a three-part global theatrical event allows Ufotable to push 3D camera mapping, breathing-style fluid simulations, and emotional backstory pacing to unprecedented heights.',
    keyTakeaways: [
      'Ufotable built a procedural CGI asset matrix of over 40,000 shifting wooden tatami rooms rendered at native 4K IMAX resolution.',
      'Each film centers on a distinct thematic pillar: Grief & Vengeance (Akaza), Legacy & Bloodline (Kokushibo), and Sacrifice (Doma).',
      'Total Concentration Breathing marks and Transparent World visuals receive bespoke chromatic shaders.'
    ],
    sections: [
      {
        heading: '01. Architectural Madness: Rendering the Infinity Castle',
        paragraphs: [
          'When Muzan Kibutsuji drops the entire Demon Slayer Corps into Nakime’s biwa-controlled dimension, gravity ceases to be a constant. For Ufotable’s digital department, the Infinity Castle is no longer just a background set-piece—it is an active combatant.',
          'By moving away from weekly television compression to a theatrical trilogy pipeline, the studio renders multi-layered parallax corridors where lanterns, shoji screens, and waterfalls rotate along three axes simultaneously during sword clashes.'
        ],
        quote: '“Every pluck of Nakime’s biwa reconfigures the battlefield geometry in real time, forcing the camera to dive kilometres through vertical wooden chasms.”'
      },
      {
        heading: '02. The Upper Moon Crucible: Akaza, Doma & Kokushibo',
        paragraphs: [
          'Unlike previous arcs where several Hashira converged on a single threat, the Infinity Castle fractures the Corps into isolated, desperate duels. Shinobu Kocho’s calculated gambit against Upper Rank Two Doma contrasts sharply with Tanjiro and Giyu’s martial arts crucible against Akaza’s Compass Needle.',
          'Meanwhile, the battle against Upper Rank One Kokushibo delves into the original sin of Breath of the Sun and Breath of the Moon, uniting Sanemi, Gyomei, Muichiro, and Genya in one of manga history’s most grueling clashes.'
        ]
      }
    ]
  },
  {
    id: 'art-anime-csm-reze',
    slug: 'chainsaw-man-reze-movie',
    topicLabel: 'Chainsaw Man Reze Movie',
    title: 'Chainsaw Man — The Movie: Reze Arc Cinematography & Bomb Devil Dossier',
    subtitle: 'From rain-soaked phone booths and midnight school pools to explosive hybrid warfare: dissecting Tatsuki Fujimoto’s most bittersweet romance.',
    universe: 'anime',
    universeName: 'Anime',
    accentColor: '#A3E635',
    author: 'Renji Morimoto',
    authorRole: 'Film & Anime Critic',
    publishedAt: 'Sept 04, 2026',
    readTime: '5 MIN READ',
    releaseYear: '2026',
    popularityScore: 95.6,
    viewCount: 89300,
    rating: 4.8,
    ratingsCount: 760,
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    tags: ['Theme Songs', 'Simulcasts', 'Chainsaw Man', 'Character Lore'],
    synopsis: 'The Reze Arc bridges tender indie-film intimacy with unhinged block-leveling spectacle. Here is how the theatrical adaptation balances the Country Mouse parable with the Bomb Devil’s kinetic fury.',
    keyTakeaways: [
      'Contrasts warm, nostalgic café lighting in Act I against neon-magenta detonation frames in Act II.',
      'Explores the philosophical parable of the Country Mouse vs. the City Mouse as the core thematic spine of Denji and Reze’s bond.',
      'Features Kensuke Ushio’s stripped-back piano motifs transitioning into industrial breakcore.'
    ],
    sections: [
      {
        heading: '01. The Country Mouse and the City Mouse',
        paragraphs: [
          'At its heart, the Reze Arc is a cold-war espionage tragedy disguised as a teenage summer romance. Both Denji and Reze are weaponized orphans stripped of normal childhoods by state and syndicate apparatuses—Denji under Public Safety’s thumb, and Reze raised as a Soviet guinea pig.',
          'The quiet sequences—learning to read on chalkboards after hours and swimming in a darkened high school pool—carry as much narrative tension as any devil contract because the audience senses the fuse burning beneath every smile.'
        ],
        quote: '“Did you prefer the country mouse, Denji, or the city mouse? Neither of us ever really got to choose.”'
      },
      {
        heading: '02. Hybrid Propulsion & Explosive Choreography',
        paragraphs: [
          'Once the pin is pulled from Reze’s choker, the visual grammar shifts from French New Wave restraint to pure kinetic anarchy. Unlike traditional energy blasts, Bomb Devil combat relies on directional concussive propulsion—detonating limbs to rocket across rooftops and riding Shockwave currents alongside Beam, the Shark Fiend.'
        ]
      }
    ]
  },

  // ==================== 2. GAMING ====================
  {
    id: 'art-gaming-gta6',
    slug: 'gta-vi-vice-city-lore',
    topicLabel: 'GTA VI Vice City Lore',
    title: 'GTA VI Vice City & Leonida State Lore Bible: Biomes, Syndicates & RAGE 9 Tech',
    subtitle: 'Mapping every district from neon Ocean Beach to the Grassrivers swamps, Lucia & Jason’s criminal trajectory, and next-gen crowd simulation.',
    universe: 'gaming',
    universeName: 'Gaming',
    accentColor: '#FACC15',
    author: 'Marcus Vance',
    authorRole: 'Open-World Systems Architect',
    publishedAt: 'Sept 20, 2026',
    readTime: '8 MIN READ',
    releaseYear: '2026',
    popularityScore: 99.7,
    viewCount: 215400,
    rating: 5.0,
    ratingsCount: 1890,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80',
    tags: ['Lore Bible', 'Open World', 'Vice City', 'RAGE Engine'],
    synopsis: 'A deep-dive geographical and technical dossier on Rockstar’s State of Leonida—analyzing the dual-protagonist trust economy, dynamic tropical weather fronts, and social-media-driven world events.',
    keyTakeaways: [
      'The State of Leonida spans three major urban hubs (Vice City, Port Gellhorn, Ambrosia) linked by the Grassrivers wetlands and Leonida Keys.',
      'RAGE 9 introduces per-strand hair physics, ray-traced global illumination across neon water reflections, and persistent NPC schedules.',
      'Dual-character switching between Lucia and Jason incorporates a tactical shared-inventory and robbery synchronicity meter.'
    ],
    sections: [
      {
        heading: '01. Cartography of Leonida: Beyond Ocean Drive',
        paragraphs: [
          'Returning to Vice City after two decades means leaving behind the cramped 1986 pastel postcard for a sprawling, living satire of modern Florida. The State of Leonida stretches from the billionaire glass towers of Vice Dale down to the rusted industrial docks of Port Gellhorn and the coral archipelagos of the Keys.',
          'At the center lies Lake Leonida and the Grassrivers—a dense airboat frontier teeming with apex wildlife, smuggling airstrips, and off-grid militias that dynamically alter smuggling routes.'
        ],
        quote: '“The only way we get through this is by sticking together—trust isn’t a dialogue choice in Leonida; it’s a survival mechanic.”'
      },
      {
        heading: '02. RAGE 9 Simulation & Dynamic Social Ecosystems',
        paragraphs: [
          'Where Red Dead Redemption 2 pioneered deliberate physical weight and NPC memory in frontier towns, GTA VI scales those systems to high-density metropolitan beaches and nightclubs. Every pedestrian group reacts autonomously to sudden tropical squalls, police cordons, and viral in-game livestreamers.'
        ]
      }
    ]
  },
  {
    id: 'art-gaming-cyberpunk-orion',
    slug: 'cyberpunk-orion-previews',
    topicLabel: 'Cyberpunk Orion Previews',
    title: 'Cyberpunk Project Orion: Blackwall AI Lore, Unreal Engine 5 & Night City 2.0',
    subtitle: 'What the datashards in Phantom Liberty and Patch 2.2 reveal about Mr. Blue Eyes, rogue AIs beyond the Blackwall, and the next Cyberpunk era.',
    universe: 'gaming',
    universeName: 'Gaming',
    accentColor: '#FACC15',
    author: 'Elena Rostova',
    authorRole: 'RPG Lore & Meta Specialist',
    publishedAt: 'Sept 14, 2026',
    readTime: '6 MIN READ',
    releaseYear: '2026',
    popularityScore: 96.2,
    viewCount: 98400,
    rating: 4.8,
    ratingsCount: 845,
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1400&q=80',
    tags: ['Patch 14.2', 'Lore Bible', 'Cyberpunk', 'UE5'],
    synopsis: 'Tracing the hidden conspiracy connecting Jefferson Peralez’s neural reconditioning, Songbird’s Cynosure core, and the looming Fifth Corporate War in Project Orion.',
    keyTakeaways: [
      'The Blackwall is not a firewall walling off cyberspace—it is itself a sentient AI negotiating a fragile truce.',
      'Transitioning from REDengine to Unreal Engine 5 unlocks vertical megabuilding interiors and seamless orbital Crystal Palace transit.',
      'Cyberware humanity thresholds will dynamically affect dialogue perception and hallucination triggers.'
    ],
    sections: [
      {
        heading: '01. The Conspiracy Behind Mr. Blue Eyes & Night Corp',
        paragraphs: [
          'Look closely at the balcony during your final meeting with Jefferson Peralez, or the observation deck at the NCX Spaceport when sending Songbird to Tycho Terminal. Watching silently with glowing azure corneas is Mr. Blue Eyes—a proxy vessel for entities operating from beyond the Blackwall.',
          'Phantom Liberty confirmed that Militech’s pre-DataKrash Cynosure facility was already capturing feral AIs to weaponize against Arasaka’s Soulkiller. Project Orion is poised to detonate this cold war into the open.'
        ],
        quote: '“They aren’t erasing who you are, V. They are rewriting the architecture of your synapses until you thank them for it.”'
      },
      {
        heading: '02. Verticality & The Unreal Engine 5 Megabuildings',
        paragraphs: [
          'One of the primary ambitions for CD Projekt Red’s Boston and Vancouver studios is realizing the full vertical density of Night City’s Megabuildings—transforming multi-floor arcologies into self-contained ecosystems with turf wars, ripperdoc clinics, and netrunner dens stacked 60 stories high.'
        ]
      }
    ]
  },
  {
    id: 'art-gaming-silksong',
    slug: 'silksong-tracker',
    topicLabel: 'Silksong Tracker',
    title: 'Hollow Knight: Silksong — Pharloom Crest Builds, Silk-Crafting & Speedrun Meta',
    subtitle: 'Mastering Hornet’s diagonal aerial acrobatics, Tool-slot optimization, and the Citadel of Song’s most punishing boss encounters.',
    universe: 'gaming',
    universeName: 'Gaming',
    accentColor: '#FACC15',
    author: 'Devon "Splits" Mercer',
    authorRole: 'Speedrun Verifier & Metroidvania Editor',
    publishedAt: 'Sept 09, 2026',
    readTime: '6 MIN READ',
    releaseYear: '2026',
    popularityScore: 95.1,
    viewCount: 84200,
    rating: 4.9,
    ratingsCount: 710,
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=80',
    tags: ['Speedruns', 'Esports', 'Metroidvania', 'Patch 14.2'],
    synopsis: 'Why Hornet’s ascent through the haunted kingdom of Pharloom flips every muscle-memory habit from Hallownest on its head—complete with Crest tier lists and optimal route splits.',
    keyTakeaways: [
      'Binding heals three masks almost instantly in mid-air at the cost of a full Silk spool, rewarding hyper-aggressive uptime.',
      'The Hunter, Reaper, and Wanderer Crests fundamentally alter Hornet’s needle slash arc and downward pogo trajectory.',
      'Current Any% NMG speedrun routes utilize the Moss Grotto grapple skip to shave 11 minutes off Act I.'
    ],
    sections: [
      {
        heading: '01. From Soul to Silk: The Tempo Shift of Pharloom',
        paragraphs: [
          'In Hollow Knight, survival meant finding a quiet corner during a boss stagger to channel Soul slowly on the ground. In Silksong, hesitation is fatal. Hornet’s Bind ability executes in mid-air, restoring three masks of health in a single burst while consuming your entire Silk gauge.',
          'Because enemies in Pharloom routinely deal double-mask damage and chain multi-hit combos, combat flows like a high-wire fencing match where aggressive needle strikes are your only lifeline.'
        ],
        quote: '“Hallownest was a kingdom embalmed in ash and memory; Pharloom is a gilded machine still humming with golden thread and fanaticism.”'
      },
      {
        heading: '02. Crest System Breakdown & Optimal Tool Loadouts',
        paragraphs: [
          'Replacing the traditional Charm notch matrix is the Crest system. Equipping the Reaper Crest widens Hornet’s slash arc and generates bonus Silk orbs on stagger, whereas the Wanderer Crest restores the classic vertical pogo familiar to Hallownest veterans.'
        ]
      }
    ]
  },

  // ==================== 3. MOVIES & TV ====================
  {
    id: 'art-movies-dune-messiah',
    slug: 'dune-messiah-production',
    topicLabel: 'Dune Messiah Production',
    title: 'Dune: Messiah Production Dossier — The Golden Path, IMAX 70mm & Tleilaxu Lore',
    subtitle: 'How Denis Villeneuve concludes Paul Atreides’ tragic trilogy, twelve years into the Fremen Holy War across the Known Universe.',
    universe: 'movies-tv',
    universeName: 'Movies & TV',
    accentColor: '#38BDF8',
    author: 'Clara Vance-Sterling',
    authorRole: 'Chief Cinema & Canon Historian',
    publishedAt: 'Sept 19, 2026',
    readTime: '7 MIN READ',
    releaseYear: '2026',
    popularityScore: 98.5,
    viewCount: 134900,
    rating: 4.9,
    ratingsCount: 1120,
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80',
    tags: ['Canon Timelines', '4K Teasers', 'Director Cuts', 'Sci-Fi'],
    synopsis: 'A comprehensive look at the palace intrigue of Arrakeen: the Bene Gesserit—Spacing Guild—Tleilaxu conspiracy, Hayt the Ghola, and the visual transformation of a desert planet turning green.',
    keyTakeaways: [
      'Set 12 years after Dune: Part Two, after Paul’s jihad has claimed 61 billion lives across the Imperium.',
      'Introduces the Bene Tleilax Face Dancers, the Guild Navigator Edric in his spice-gas tank, and the resurrected Duncan Idaho ghola.',
      'Hans Zimmer’s score evolves the triumphant Fremen theme into an oppressive liturgical requiem.'
    ],
    sections: [
      {
        heading: '01. The Tragedy of Absolute Prescience',
        paragraphs: [
          'Frank Herbert wrote Dune Messiah to dismantle the very charismatic hero myth that readers fell in love with in the first novel. By the opening frames of Messiah, Paul Muad’Dib sits atop the largest temple ever constructed by human hands—a monolith in Arrakeen that dwarfs mountain ranges—yet he is more imprisoned than ever.',
          'Every vision of the future shows him that abdicating the throne triggers even worse chaos, while remaining Emperor cements a theocratic bureaucracy he despises.'
        ],
        quote: '“Prophecy is not a gift of freedom; it is a trap that locks both the prophet and his followers inside a single unyielding corridor of time.”'
      },
      {
        heading: '02. The Cabal: Navigators, Face Dancers, and the Ghola Gift',
        paragraphs: [
          'Unable to defeat Paul’s Fremen legions on the battlefield, the conspirators—Reverend Mother Gaius Helen Mohiam, Princess Irulan, the Tleilaxu master Scytale, and Guild Navigator Edric (whose prescience shields the meeting from Paul’s sight)—strike at his humanity instead.',
          'Their psychological weapon is Hayt: a resurrected ghola of Duncan Idaho engineered with metallic Tleilaxu eyes and philosophical conditioning designed to break Paul’s psyche.'
        ]
      }
    ]
  },
  {
    id: 'art-movies-batman-part-2',
    slug: 'the-batman-part-ii-canon',
    topicLabel: 'The Batman Part II Canon',
    title: 'The Batman Part II Canon Timeline: Winter in Flooded Gotham & The Penguin Fallout',
    subtitle: 'Mapping Matt Reeves’ Elseworlds crime saga from Carmine Falcone’s vacuum and Sofia Gigante’s rise to Bruce Wayne’s forensic evolution.',
    universe: 'movies-tv',
    universeName: 'Movies & TV',
    accentColor: '#38BDF8',
    author: 'Julian Thorne',
    authorRole: 'Cinematic Universe Chronicler',
    publishedAt: 'Sept 11, 2026',
    readTime: '6 MIN READ',
    releaseYear: '2026',
    popularityScore: 96.4,
    viewCount: 105200,
    rating: 4.8,
    ratingsCount: 890,
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1400&q=80',
    tags: ['Canon Timelines', 'Casting Leaks', 'DC Elseworlds', 'Noir'],
    synopsis: 'How the seawall destruction and Oz Cobb’s bloody ascension in Crown Point reshape Gotham’s socio-political corruption for a freezing winter detective thriller.',
    keyTakeaways: [
      'Picks up in the dead of winter just weeks after the events of The Penguin series finale.',
      'Focuses on institutional white-collar rot behind Gotham’s Renewal Fund and Wayne Enterprises’ historical ties.',
      'Greig Fraser’s anamorphic cinematography shifts from amber rain to sodium-vapor snowstorms.'
    ],
    sections: [
      {
        heading: '01. After the Flood: A Divided City in Deep Freeze',
        paragraphs: [
          'When the Riddler’s car bombs shattered Gotham’s seawall in November, the waters didn’t hit every neighborhood equally. While Downtown’s financial elite fortified their penthouses, working-class districts like Crown Point were left to rot in toxic sludge—creating the exact vacuum Oz Cobb exploited to seize the criminal underworld.',
          'As December freezes the flooded canals into jagged ice, Bruce Wayne discovers that being a symbol of hope requires dismantling corruption in mahogany boardrooms just as much as in back alleys.'
        ],
        quote: '“Vengeance could beat a street gang into submission, but it couldn’t audit a century of stolen city trusts.”'
      },
      {
        heading: '02. World’s Greatest Detective: Upgraded Cowls & Forensic Tech',
        paragraphs: [
          'In Part II, the drifter persona gives way to a sharper, dual-identity strategy. Expect an evolved, lighter-plate Batsuit adapted for sub-zero mobility alongside deeper forensic integration inside the abandoned Wayne subway terminal.'
        ]
      }
    ]
  },
  {
    id: 'art-movies-stranger-things',
    slug: 'stranger-things-finale',
    topicLabel: 'Stranger Things Finale',
    title: 'Stranger Things Finale & Dimension X Lore: The First Shadow Stage Canon Explained',
    subtitle: 'Connecting Henry Creel’s 1959 Nevada cave incident, the Mind Flayer’s true origin, and the final battle for Hawkins.',
    universe: 'movies-tv',
    universeName: 'Movies & TV',
    accentColor: '#38BDF8',
    author: 'Maya Lin',
    authorRole: 'TV Mythology Researcher',
    publishedAt: 'Sept 06, 2026',
    readTime: '6 MIN READ',
    releaseYear: '2026',
    popularityScore: 94.9,
    viewCount: 91700,
    rating: 4.8,
    ratingsCount: 740,
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    tags: ['Canon Timelines', '4K Teasers', 'Sci-Fi', 'Director Cuts'],
    synopsis: 'Why the Upside Down is frozen on November 6, 1983, how Dimension X differs from the Rightside Up bridge, and what Will Byers’ true psychic tether means.',
    keyTakeaways: [
      'The Upside Down is a localized wormhole snapshot created the exact moment Eleven made psychic contact with the Demogorgon on Nov 6, 1983.',
      'Dimension X is the primordial realm where the shadow particles first altered Henry Creel’s blood type in 1959.',
      'Will Byers’ connection to the hive mind acts as a two-way antenna capable of disrupting Vecna’s phylactery.'
    ],
    sections: [
      {
        heading: '01. November 6, 1983: Why Time Stopped in the Upside Down',
        paragraphs: [
          'When Nancy Wheeler opened her diary in the Upside Down during Season 4 and found the entries halted on November 6, 1983, it confirmed a foundational truth of Hawkins’ mythology: the dark reflection of Hawkins is not an ancient parallel town, but a psychic imprint stamped onto the membrane between our world and Dimension X.',
          'Understanding that distinction is essential to decoding how the military quarantine zone in 1987 attempts to contain the four converging rifts.'
        ],
        quote: '“It started with Will Byers vanishing in the woods, and the circle can only close where the first gate tore open.”'
      },
      {
        heading: '02. Vecna vs. The Mind Flayer: Who Holds the Leash?',
        paragraphs: [
          'While Henry Creel believed in Season 4 that he gave the formless shadow particles their spider-like purpose, canon revelations from The First Shadow stage play reveal that the entity infected Henry first during the Philadelphia Experiment fallout.'
        ]
      }
    ]
  },

  // ==================== 4. K-POP ====================
  {
    id: 'art-kpop-aespa',
    slug: 'aespa-armageddon-lore',
    topicLabel: 'Aespa Armageddon Lore',
    title: 'aespa "Armageddon" & Supernova Lore: Multiverse Variants in the REAL WORLD',
    subtitle: 'Decoding the Season 2 SMCU multiverse expansion, metallic hyper-pop production, and synchronized Bluetooth lightstick choreography.',
    universe: 'kpop',
    universeName: 'K-Pop',
    accentColor: '#F43F5E',
    author: 'Soo-jin Park',
    authorRole: 'K-Pop Concept & Sonic Critic',
    publishedAt: 'Sept 21, 2026',
    readTime: '5 MIN READ',
    releaseYear: '2026',
    popularityScore: 98.9,
    viewCount: 164200,
    rating: 5.0,
    ratingsCount: 1530,
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
    tags: ['Comeback Radar', 'Discography', 'Lightstick Sync', 'KWANGYA'],
    synopsis: 'How aespa transitioned from fighting Black Mamba in KWANGYA to confronting parallel-universe versions of themselves across Supernova and Armageddon.',
    keyTakeaways: [
      'After opening the portal beyond KWANGYA, the quartet encounters uncanny extraterrestrial variants of Karina, Giselle, Winter, and Ningning.',
      '"Supernova" interpolates electro-clash basslines with cosmic hyper-pop, earning a historic Perfect All-Kill streak.',
      'Concert lightstick firmware v3.4 syncs stadium LED waves to the exact BPM changes of the bridge.'
    ],
    sections: [
      {
        heading: '01. Beyond KWANGYA: Enter the Multiverse Era',
        paragraphs: [
          'In their first narrative cycle, aespa’s lore revolved around digital avatars (ae) and the cybernetic wilderness of KWANGYA. With their first full-length album Armageddon, the conceptual lens widens from virtual reality to infinite parallel dimensions.',
          'Rather than battling an external serpent villain, the members confront doppelgängers with supernatural physiology—levitating cars, freezing time, and warping urban geometry in the "Supernova" and "Armageddon" visual films.'
        ],
        quote: '“I’m like some kind of Supernova—watch out: our taste of iron isn’t a metaphor, it’s a sonic signature.”'
      },
      {
        heading: '02. Sonic Architecture: Why "Taste of Iron" Works',
        paragraphs: [
          'Fans affectionately dub aespa’s hardest-hitting tracks "chul-mat" (taste of iron)—industrial synth clangs, distorted 808 glides, and razor-sharp vocal layering in the final chorus that reward lossless audio streaming.'
        ]
      }
    ]
  },
  {
    id: 'art-kpop-stray-kids',
    slug: 'stray-kids-stadium-tour',
    topicLabel: 'Stray Kids Stadium Tour',
    title: 'Stray Kids Global Stadium Tour & 3RACHA Production Breakdown: The "ATE" Era',
    subtitle: 'Inside Bang Chan, Changbin, and Han’s self-producing studio workflow, live band arrangements, and fanchant timing guides.',
    universe: 'kpop',
    universeName: 'K-Pop',
    accentColor: '#F43F5E',
    author: 'Min-ho Kang',
    authorRole: 'Touring & Live Audio Editor',
    publishedAt: 'Sept 15, 2026',
    readTime: '6 MIN READ',
    releaseYear: '2026',
    popularityScore: 97.1,
    viewCount: 129500,
    rating: 4.9,
    ratingsCount: 1180,
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80',
    tags: ['Fanchants', 'Lightstick Sync', 'Comeback Radar', '3RACHA'],
    synopsis: 'How Stray Kids scaled their "Mala Taste" genre-blending sound to 60,000-capacity stadiums worldwide with a thunderous four-piece live rock band.',
    keyTakeaways: [
      '3RACHA writes and arranges over 95% of the group’s discography on portable laptop rigs while on tour.',
      'Stadium setlists re-orchestrate tracks like "Chk Chk Boom", "LALALALA", and "God’s Menu" with live double-kick drums and brass.',
      'Nachimbong V2 lightsticks feature custom compass-spin OLED animations synced to venue RF transmitters.'
    ],
    sections: [
      {
        heading: '01. The 3RACHA Blueprint: Controlled Chaos in the Studio',
        paragraphs: [
          'While most pop acts source demos from international songwriting camps, Stray Kids’ identity is forged almost entirely in-house by 3RACHA (Bang Chan, Changbin, and Han). Their signature style fuses UK drill rhythms, Latin reggaeton bounce, and festival trap drops without losing melodic hooks.',
          'On the "dominATE" stadium run, that studio experimentation translates into three-hour live marathons backed by a touring rock band that pushes sound pressure levels to festival headliner standards.'
        ],
        quote: '“Eight microphones, zero backing-track crutches during the rap cyphers, and sixty thousand compasses glowing in unison.”'
      },
      {
        heading: '02. Stadium Fanchant & Lightstick Sync Checklist',
        paragraphs: [
          'Attending a stadium stop? Ensure your Nachimbong V2 firmware is updated via the official app at least 48 hours before doors open, and pack spare alkaline AAA batteries—high-luminosity stadium sync draws full power across the 32-song setlist.'
        ]
      }
    ]
  },
  {
    id: 'art-kpop-lesserafim',
    slug: 'le-sserafim-coachella-cut',
    topicLabel: 'LE SSERAFIM Coachella Cut',
    title: 'LE SSERAFIM "CRAZY" & Festival Director’s Cut: Voguing, UK Garage & Fearless Lore',
    subtitle: 'Analyzing the house-music pivot, Nile Rodgers guitar collaborations, and the choreography stamina behind modern K-pop festival stages.',
    universe: 'kpop',
    universeName: 'K-Pop',
    accentColor: '#F43F5E',
    author: 'Hannah Cho',
    authorRole: 'Choreography & Pop Culture Columnist',
    publishedAt: 'Sept 07, 2026',
    readTime: '5 MIN READ',
    releaseYear: '2026',
    popularityScore: 94.3,
    viewCount: 82600,
    rating: 4.8,
    ratingsCount: 690,
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=80',
    tags: ['Discography', 'Comeback Radar', 'Choreography', 'Fanchants'],
    synopsis: 'From Jersey club and Afro-house on "EASY" and "Smart" to electro-voguing on "CRAZY": how LE SSERAFIM carved out the most dance-floor-forward catalog in 4th-gen K-pop.',
    keyTakeaways: [
      'Blends 130 BPM ballroom house beats with sharp, athletic floorwork and authentic voguing elements.',
      'Runway-inspired concept trilogy ("FEARLESS" -> "ANTIFRAGILE" -> "UNFORGIVEN") evolved into self-aware club surrealism.',
      'Custom festival mixes incorporate extended dance breaks engineered specifically for desert and arena acoustics.'
    ],
    sections: [
      {
        heading: '01. Ballroom House Meets Athletic Precision',
        paragraphs: [
          'LE SSERAFIM has never shied away from reinventing their sonic palette every six months. Where "ANTIFRAGILE" rode an infectious reggaeton rhythm and "Smart" embraced amapiano percussion, "CRAZY" dives headfirst into pulsing ballroom house.',
          'The choreography demands extraordinary single-leg balance and core control, executing rapid-fire duckwalks and arm-control isolations while maintaining live vocal projection.'
        ],
        quote: '“Act like an angel and dress like crazy—when the bassline drops, the stage becomes a runway without rules.”'
      }
    ]
  },

  // ==================== 5. COMICS ====================
  {
    id: 'art-comics-xmen',
    slug: 'x-men-from-the-ashes',
    topicLabel: 'X-Men From the Ashes',
    title: 'X-Men: From the Ashes Reading Order — Post-Krakoa Rosters in Alaska, New Orleans & NY',
    subtitle: 'How Jed MacKay, Gail Simone, and Eve L. Ewing split mutantkind across three ideological teams after the Fall of the House of X.',
    universe: 'comics',
    universeName: 'Comics',
    accentColor: '#FB7185',
    author: 'Devon Grant',
    authorRole: 'Marvel Continuity Archivist',
    publishedAt: 'Sept 17, 2026',
    readTime: '7 MIN READ',
    releaseYear: '2026',
    popularityScore: 96.8,
    viewCount: 94100,
    rating: 4.8,
    ratingsCount: 810,
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1400&q=80',
    tags: ['Issue Runs', 'Earth Timelines', 'Key Issues', 'Mutant Lore'],
    synopsis: 'Krakoa is gone, the Resurrection Protocols are history, and Charles Xavier is a prisoner at Graymalkin. Here is the definitive issue-by-issue roadmap for the three flagship X-Men books.',
    keyTakeaways: [
      'Cyclops leads a militant strike force out of a converted Sentinel factory in Merle, Alaska (X-Men by MacKay & Stegman).',
      'Rogue and Gambit anchor a southern gothic haven for young outcasts in New Orleans (Uncanny X-Men by Simone & Marquez).',
      'Kitty Pryde and Emma Frost mentor brand-new mutant recruits in Chicago (Exceptional X-Men by Ewing & Carnero).'
    ],
    sections: [
      {
        heading: '01. Life After Paradise: Three Visions for Mutant Survival',
        paragraphs: [
          'For five real-world years, the Krakoan Age gave mutants immortality, diplomatic immunity, and a living island nation. Its collapse leaves the species more fractured than ever—not just geographically, but philosophically.',
          'Without Charles Xavier’s dream or Magneto’s island citadel to unite them, Scott Summers, Anna Marie (Rogue), and Kate Pryde have stopped waiting for consensus.'
        ],
        quote: '“We had a nation, we had resurrection, and the world still built Sentinels. Now we have a factory in Alaska and a list of emergencies.”'
      },
      {
        heading: '02. Essential Reading Matrix & Key Issue Checklist',
        paragraphs: [
          'Start with X-Men (2024) #1 for the geopolitical backbone and Beast’s memory-reverted resurrection, then pair it with Uncanny X-Men #1 for the emotional heart of the Outlier kids, and Storm #1 for Omega-level cosmic stakes alongside the Avengers.'
        ]
      }
    ]
  },
  {
    id: 'art-comics-dc-absolute',
    slug: 'dc-absolute-universe',
    topicLabel: 'DC Absolute Universe',
    title: 'DC Absolute Universe Guide: How Darkseid Engineered Earth-Alpha’s Underdog Trinity',
    subtitle: 'A blue-collar Batman without billions, a Superman raised in Krypton’s mines, and a Wonder Woman forged in Hell.',
    universe: 'comics',
    universeName: 'Comics',
    accentColor: '#FB7185',
    author: 'Victor Sterling',
    authorRole: 'Senior Comics Editor',
    publishedAt: 'Sept 16, 2026',
    readTime: '7 MIN READ',
    releaseYear: '2026',
    popularityScore: 99.1,
    viewCount: 158900,
    rating: 5.0,
    ratingsCount: 1410,
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80',
    tags: ['Issue Runs', 'Earth Timelines', 'Variant Art', 'Key Issues'],
    synopsis: 'Following the DC All In Special, a new universe born from Darkseid’s omega energy strips Batman, Superman, and Wonder Woman of their traditional privileges—turning them into radical agents of chaos.',
    keyTakeaways: [
      'Absolute Batman (Scott Snyder & Nick Dragotta) reimagines Bruce Wayne as a 24-year-old civil engineer whose chest symbol detaches into a battle-axe.',
      'Absolute Wonder Woman (Kelly Thompson & Hayden Sherman) raises Diana in the Underworld under Circe’s tutelage wielding a Buster-sized runesword.',
      'Absolute Superman (Jason Aaron & Rafa Sandoval) makes Kal-El a survivor of Krypton’s working-class Labor Guild.'
    ],
    sections: [
      {
        heading: '01. A Universe Built on Darkseid’s Foundation',
        paragraphs: [
          'On Prime Earth, superhero hope is the default metaphysical constant, forcing villains to fight uphill against destiny. In the Absolute Universe (Earth-Alpha), created after Darkseid’s demise in the DC All In Special, tyranny and systemic oppression are the natural laws of reality.',
          'To survive in a world stacked against them, the Trinity cannot rely on Wayne Manor fortunes, Themysciran paradise, or Smallville Americana. They have to burn brighter and hit harder.'
        ],
        quote: '“Take away the mansion, the butler, and the trust fund—what’s left is a six-foot-six brick wall who knows every load-bearing beam in Gotham.”'
      },
      {
        heading: '02. Variant Covers & First-Print Collector Radar',
        paragraphs: [
          'Absolute Batman #1 has already crossed seven printings, with Nick Dragotta’s 1:50 foil variant and Jim Lee’s gatefold covers commanding top tier status in the Collector Vault.'
        ]
      }
    ]
  },
  {
    id: 'art-comics-spawn',
    slug: 'spawn-multiverse-run',
    topicLabel: 'Spawn Multiverse Run',
    title: 'Spawn’s Scorched Multiverse: Gunslinger, King Spawn & Rat City Continuity Guide',
    subtitle: 'Navigating Todd McFarlane’s expanding shared universe beyond Issue #350—from Dead Zones and Hell’s Throne to cyberpunk 2111.',
    universe: 'comics',
    universeName: 'Comics',
    accentColor: '#FB7185',
    author: 'Dante Callahan',
    authorRole: 'Indie & Image Comics Specialist',
    publishedAt: 'Sept 05, 2026',
    readTime: '5 MIN READ',
    releaseYear: '2026',
    popularityScore: 93.4,
    viewCount: 68400,
    rating: 4.7,
    ratingsCount: 530,
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80',
    tags: ['Issue Runs', 'Variant Art', 'Key Issues', 'Image Comics'],
    synopsis: 'How the longest-running creator-owned comic in history evolved into a multi-title line featuring medieval hellspawns, time-displaced outlaws, and futuristic necroplasm soldiers.',
    keyTakeaways: [
      'After Al Simmons detonated the time-rift around Issue #300, Hellspawns from past and future eras converged on the present.',
      'Gunslinger Spawn (Javi Fernandez) and King Spawn remain the two highest-selling indie ongoing series of the decade.',
      'Rat City introduces Peter Cairn, a cybernetic amputee bonded to residual necroplasm nanites in the year 2111.'
    ],
    sections: [
      {
        heading: '01. Beyond Issue #350: The War for the Vacant Throne',
        paragraphs: [
          'For decades, Spawn was a solitary urban horror story set in the alleys of New York. Today, the Spawn Universe operates as a full dark-fantasy war epic where Heaven, Hell, and the Greenworld fight over the Dead Zones—while Al Simmons refuses to kneel to any of them.'
        ],
        quote: '“The necroplasm timer used to count down to damnation; now it counts down to revolution.”'
      }
    ]
  },

  // ==================== 6. MANGA ====================
  {
    id: 'art-manga-one-piece',
    slug: 'one-piece-void-century-clues',
    topicLabel: 'One Piece Void Century Clues',
    title: 'One Piece Void Century & Elbaf Arc Dossier: Vegapunk’s Broadcast, Joy Boy & Loki',
    subtitle: 'Piecing together the sunken world hypothesis, the Harley mural texts of Elbaf, and the twenty kingdoms that became the World Government.',
    universe: 'manga',
    universeName: 'Manga',
    accentColor: '#FB923C',
    author: 'Haruto Sorano',
    authorRole: 'Grand Line Archivist',
    publishedAt: 'Sept 22, 2026',
    readTime: '8 MIN READ',
    releaseYear: '2026',
    popularityScore: 99.6,
    viewCount: 198400,
    rating: 5.0,
    ratingsCount: 1750,
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1400&q=80',
    tags: ['Chapter Drops', 'Mangaka Spotlight', 'One Piece', 'Lore Theories'],
    synopsis: 'Dr. Vegapunk’s global transmission changed everything we knew about the geography of the Blue Planet. Now on the branches of the Adam Tree in Elbaf, ancient murals reveal the three wars of history.',
    keyTakeaways: [
      'Sea levels rose by 200 meters during the Void Century due to the deployment of the three Ancient Weapons, submerging the original continents.',
      'Joy Boy was the history’s first pirate, fighting alongside the Iron Giant Emet and the Zunesha clan against the 20 Allied Nations.',
      'Elbaf’s sacred Adam Tree preserves the First, Second, and Third World prophecies depicting the Sun God Nika.'
    ],
    sections: [
      {
        heading: '01. Two Hundred Meters Below: The Sunken Continents',
        paragraphs: [
          'For twenty-seven years, readers assumed the scattered island chains of the Grand Line and Four Blues were the natural geography of Eiichiro Oda’s world. Vegapunk’s pre-recorded broadcast from Egghead shattered that paradigm: the Straw Hats have been sailing across the mountain peaks of a drowned civilization.',
          'Every time Imu activates the Mother Flame to erase an island like Lulusia, global sea levels rise by another meter—meaning the ideological conflict of the Void Century never truly ended.'
        ],
        quote: '“Whoever claims the One Piece will decide the fate of this sinking world.”'
      },
      {
        heading: '02. Elbaf’s Adam Tree & The Accursed Prince Loki',
        paragraphs: [
          'Upon reaching the land of the Giants, the narrative scale expands into Norse mythology. Chained to the base of the Treasure Tree Adam in the Underworld is Prince Loki, who claims the title of the Sun God who will bring Ragnarok to the world.'
        ]
      }
    ]
  },
  {
    id: 'art-manga-vagabond',
    slug: 'vagabond-remaster',
    topicLabel: 'Vagabond Remaster',
    title: 'Vagabond Definitive Edition & Takehiko Inoue’s Sumi-e Brushwork Masterclass',
    subtitle: 'Why Inoue switched from G-pen nibs to traditional calligraphy brushes, and how Musashi Miyamoto’s farming arc redefines strength.',
    universe: 'manga',
    universeName: 'Manga',
    accentColor: '#FB923C',
    author: 'Reiichi Kurosawa',
    authorRole: 'Seinen Art & Print Historian',
    publishedAt: 'Sept 13, 2026',
    readTime: '6 MIN READ',
    releaseYear: '2026',
    popularityScore: 96.7,
    viewCount: 93200,
    rating: 4.9,
    ratingsCount: 870,
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80',
    tags: ['Seinen Top', 'Mangaka Spotlight', 'Brushwork', 'Collector Print'],
    synopsis: 'Examining the oversized hardcover Definitive Editions of Takehiko Inoue’s Vagabond, the visual evolution from Yoshioka 70-man slaughter to quiet rice-paddy cultivation, and the exhibition epilogue.',
    keyTakeaways: [
      'Transitioning to a traditional hair brush allowed Inoue to capture breathing, wind, and water tension in a single organic stroke.',
      'The 70-versus-1 Yoshioka duel in Volume 27 remains one of the greatest sustained sequences of sequential art ever printed.',
      'The Definitive Hardcover editions restore original magazine color spreads on heavyweight archival matte stock.'
    ],
    sections: [
      {
        heading: '01. The Sword and the Brush: Why Inoue Abandoned the G-Pen',
        paragraphs: [
          'Midway through serializing Vagabond, Takehiko Inoue realized that rigid steel G-pen nibs were fighting against the philosophical transformation of his protagonist, Shinmen Takezo (Miyamoto Musashi). Just as Musashi had to unlearn brute force to perceive the flow of all things, Inoue switched to an unforgiving Japanese calligraphy brush.',
          'The result is linework that breathes on the page—where a frayed dry-brush sweep conveys the spray of snow and blood in the Yoshioka courtyard.'
        ],
        quote: '“Invincible is merely a word. Once you look beyond the blade, you see that heaven and earth have no opponent.”'
      }
    ]
  },
  {
    id: 'art-manga-choujin-x',
    slug: 'choujin-x-volume-12',
    topicLabel: 'Choujin X Volume 12',
    title: 'Choujin X Volume 12 Breakdown: Sui Ishida’s Unchained Schedule & Calamity Lore',
    subtitle: 'How the creator of Tokyo Ghoul found creative liberation by publishing on his own terms—and where Tokio Kurohara’s Beast transformation leads.',
    universe: 'manga',
    universeName: 'Manga',
    accentColor: '#FB923C',
    author: 'Yuna Hasegawa',
    authorRole: 'Manga Editorial Analyst',
    publishedAt: 'Sept 08, 2026',
    readTime: '5 MIN READ',
    releaseYear: '2026',
    popularityScore: 93.8,
    viewCount: 74500,
    rating: 4.8,
    ratingsCount: 620,
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    tags: ['Chapter Drops', 'Raw Scans', 'Seinen Top', 'Mangaka Spotlight'],
    synopsis: 'Freed from weekly page-count constraints on Tonari no Young Jump, Sui Ishida delivers surreal horror, dark slapstick, and devastating tragedy in the Tower of Mourning siege.',
    keyTakeaways: [
      'Ishida draws Choujin X without fixed weekly deadlines or assistant teams, resulting in deeply personal, painterly shading.',
      'The dynamic between Tokio (the vulture who became an iron-willed warrior) and Azuma (the hero complex forged of iron) inversions classic shonen rivalries.',
      'Volume 12 brings the Zora and Yamato Mori confrontation over the Mark of the Beast to a boiling point.'
    ],
    sections: [
      {
        heading: '01. The Vulture and the Lion: Tokio & Azuma’s Inverted Arc',
        paragraphs: [
          'At the start of Choujin X, Tokio Kurohara saw himself only as a scavenger orbiting his brilliant childhood friend Azuma Higashi. Twelve volumes later, after surviving the time-skip training in Iwato, Tokio carries the terrifying composure of a veteran soldier while Azuma grapples with the existential truth of his own creation.'
        ],
        quote: '“To "Raise" as a Choujin is to die once and refuse to accept the verdict.”'
      }
    ]
  },

  // ==================== 7. COSPLAY ====================
  {
    id: 'art-cosplay-eva01',
    slug: 'eva-01-high-density-eva-foam',
    topicLabel: 'EVA-01 High-Density EVA Foam',
    title: 'EVA-01 Test Type Armor Build Log: High-Density 100kg/m³ EVA Foam & Internal Stilts',
    subtitle: 'Step-by-step blueprint for scaling Evangelion Unit-01’s towering shoulder pylons, articulated jaw hinge, and UV-reactive neon green trim.',
    universe: 'cosplay',
    universeName: 'Cosplay',
    accentColor: '#C084FC',
    author: 'Kira "ForgeCraft" Vance',
    authorRole: 'WCS Finalist & Master Armorer',
    publishedAt: 'Sept 19, 2026',
    readTime: '7 MIN READ',
    releaseYear: '2026',
    popularityScore: 97.4,
    viewCount: 108600,
    rating: 4.9,
    ratingsCount: 940,
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1400&q=80',
    tags: ['Foam Crafting', 'Con Galleries', 'Mecha Rig', 'LED Wiring'],
    synopsis: 'Mecha proportions defy human anatomy. Learn how to construct an 8-foot wearable Evangelion Unit-01 rig using 10mm high-density EVA foam, PVC backpack load distribution, and automotive urethane paint.',
    keyTakeaways: [
      'Use 100kg/m³ high-density EVA foam for structural torso plates and 6mm 60kg/m³ foam for curved helmet compounds.',
      'Mount shoulder pylons to an internal aluminum hiking-frame harness rather than Velcro shoulder straps to prevent sagging.',
      'Seal foam with 3 coats of Plasti Dip before airbrushing metallic violet and fluorescent lime acrylics.'
    ],
    sections: [
      {
        heading: '01. Solving the Mecha Proportion Problem',
        paragraphs: [
          'Human beings have wider hips and shorter legs than Hideaki Anno’s biomechanical Evangelion units. To achieve that wasp-waisted, long-limbed silhouette without looking boxy, your build must start from the ground up with 14-inch drywall stilts concealed inside digitized calf armor.',
          'By raising your natural knee joint into the upper thigh of the mecha leg, you gain the elongated shin ratio that makes EVA-01 instantly recognizable from across a convention hall.'
        ],
        quote: '“Great mecha cosplay is 40% foam beveling and 60% structural load engineering on your lower spine.”'
      },
      {
        heading: '02. Articulated Berserk Jaw & Fluorescent Edge Painting',
        paragraphs: [
          'Using a simple elastic return-spring anchored to your chin cup, the lower helmet mandible snaps open when you speak or roar—revealing cast-resin biomechanical teeth painted with gloss clear coat.'
        ]
      }
    ]
  },
  {
    id: 'art-cosplay-monowire',
    slug: 'cyberpunk-led-monowire',
    topicLabel: 'Cyberpunk LED Monowire',
    title: 'Cyberpunk Thermal Monowire & Sandevistan Spine: WS2812B Addressable LED & Arduino Guide',
    subtitle: 'Wiring side-glow fiber optics, custom 3D-printed wrist housings, and reactive motion-sensor pulse routines for Night City builds.',
    universe: 'cosplay',
    universeName: 'Cosplay',
    accentColor: '#C084FC',
    author: 'Tariq Al-Mansoor',
    authorRole: 'Wearable Electronics & Prop Engineer',
    publishedAt: 'Sept 10, 2026',
    readTime: '6 MIN READ',
    releaseYear: '2026',
    popularityScore: 95.3,
    viewCount: 86900,
    rating: 4.9,
    ratingsCount: 780,
    thumbnail: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1400&q=80',
    tags: ['LED Wiring', '3D Printing', 'Cyberpunk', 'Foam Crafting'],
    synopsis: 'How to build a convention-safe, high-luminosity Thermal Monowire and David Martinez Sandevistan spinal implant using Arduino Nano ESP32, FastLED libraries, and 5mm PMMA side-glow fiber.',
    keyTakeaways: [
      'Pair a 3W high-power Cree LED emitter at both ends of a 4mm solid-core side-glow PMMA fiber optic cable for uniform neon orange glow.',
      'Integrate an MPU-6050 accelerometer in the wrist gauntlet so whipping your arm triggers a white-hot surge animation.',
      'Always wire a dedicated 5V UBEC step-down regulator with a 5A inline blade fuse inside your battery pouch.'
    ],
    sections: [
      {
        heading: '01. Side-Glow Fiber Optics vs. COB LED Strips',
        paragraphs: [
          'Traditional LED strips are too wide and fragile to whip through the air for photoshoots. For an authentic Cyberpunk 2077 Monowire, 4mm solid-core PMMA side-glow optical cable gives you a flexible, unbreakable whip that illuminates evenly from hilt to hilt when driven by dual 3-watt emitters concealed inside 3D-printed cyberware cuffs.'
        ],
        quote: '“When the convention hall lights dim, high-density addressable LEDs turn a good costume into a walking cutscene.”'
      }
    ]
  },
  {
    id: 'art-cosplay-masamune',
    slug: 'sephiroth-masamune-rig',
    topicLabel: 'Sephiroth Masamune Rig',
    title: 'Sephiroth’s 7-Foot Masamune & One-Winged Counterweight Rigging (Con-Safe Breakdown)',
    subtitle: 'Carbon-fiber core rods, magnetic three-piece travel joints, and feather-light articulated wing mechanics that pass weapon check.',
    universe: 'cosplay',
    universeName: 'Cosplay',
    accentColor: '#C084FC',
    author: 'Elena Vance',
    authorRole: 'Master Prop Smith',
    publishedAt: 'Sept 03, 2026',
    readTime: '6 MIN READ',
    releaseYear: '2026',
    popularityScore: 94.0,
    viewCount: 79100,
    rating: 4.8,
    ratingsCount: 650,
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    tags: ['3D Printing', 'Foam Crafting', 'Con Galleries', 'Final Fantasy'],
    synopsis: 'Building an 84-inch odachi that won’t droop in summer heat AND fits inside a standard checked airline suitcase—complete with CAD dowel tolerances and Alclad II chrome finishing.',
    keyTakeaways: [
      'Wooden dowels warp over 5 feet; use hollow pultruded carbon-fiber kite spars with brass sleeve ferrules for zero-droop rigidity.',
      'Divide the blade into three 28-inch segments locked with neodymium N52 magnets and dual alignment pins.',
      'Counterbalance the single right-shoulder black wing with a cross-chest steel plate hidden beneath the SOLDIER pauldron.'
    ],
    sections: [
      {
        heading: '01. Defeating Blade Droop on an 84-Inch Odachi',
        paragraphs: [
          'Every Final Fantasy VII cosplayer faces the same physics nightmare: a seven-foot katana held at arm’s length acts as a massive lever. If you build the core from PVC pipe or wooden dowels, the tip will sag six inches before your first photoshoot.',
          'The secret is a dual-rod skeleton of 8mm pultruded carbon-fiber tubes sandwiched between laser-cut Balsa wood ribs and wrapped in 2mm high-density foam.'
        ],
        quote: '“It should look like cold Shinra steel under camera flashes, weigh less than 400 grams, and break down into a backpack in thirty seconds.”'
      }
    ]
  },

  // ==================== 8. COMMUNITY VAULT ====================
  {
    id: 'art-vault-elden-ring',
    slug: 'elden-ring-great-rune-topology',
    topicLabel: 'Elden Ring Great Rune Topology',
    title: 'Elden Ring Great Rune Topology: How the Golden Order’s Mathematical Lattice Fits Together',
    subtitle: 'A verified Community Vault thesis mapping Marika’s Crucible arc, Miquella’s discarded Broken Rune, and the Rune of Death.',
    universe: 'community-vault',
    universeName: 'Community Vault',
    accentColor: '#34D399',
    author: 'Dr. Julian Vance (Verified Fan Scholar)',
    authorRole: 'Community Vault Gold Medal Essayist',
    publishedAt: 'Sept 20, 2026',
    readTime: '9 MIN READ',
    releaseYear: '2026',
    popularityScore: 99.2,
    viewCount: 152300,
    rating: 5.0,
    ratingsCount: 1460,
    thumbnail: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1400&q=80',
    tags: ['Fan Essays', 'Lore Theories', 'Moderator Picks', 'Elden Ring'],
    synopsis: 'In Hidetaka Miyazaki and George R.R. Martin’s Lands Between, the Elden Ring is not a piece of jewelry—it is the metaphysical source code of reality. Here is how every Great Rune geometrically locks into the Farum Azula ancestral glyph.',
    keyTakeaways: [
      'Godrick’s Great Rune forms the central anchor four-ring intersection, while Radahn and Rykard occupy the lower-right overlapping orbits.',
      'Radagon’s crisscross trellis pattern represents the rigid Law of Causality and Regression grafted onto Marika’s organic arcs.',
      'Miquella’s discarded rune in the Land of Shadow completes the missing upper circumference linking the twin prodigies Malenia and Miquella.'
    ],
    sections: [
      {
        heading: '01. The Elden Ring as Metaphysical Source Code',
        paragraphs: [
          'When Queen Marika plucked the Rune of Destined Death from the Elden Ring and sealed it within Maliketh’s black blade, she didn’t just outlaw mortality—she edited the geometric equation governing souls in the Lands Between.',
          'By overlaying the individual Great Runes dropped by the demigod shardbearers onto the title screen sigil—and comparing that composite against the primordial relief carved into Maliketh’s boss arena in Crumbling Farum Azula—we can reconstruct the history of the Golden Order’s schisms.'
        ],
        quote: '“The Farum Azula glyph proves the Elden Ring once possessed spiraled roots—the Crucible itself—before Marika pruned the tree into a closed circle.”'
      },
      {
        heading: '02. Twin Symmetry: Malenia, Morgott, and Mohg',
        paragraphs: [
          'Notice how Morgott and Mohg’s Great Runes share the exact same phantom circle position, differing only in Morgott’s golden alignment with the central vertical line and Mohg’s blood-soaked corruption. The geometry of the runes tells you the lineage of the demigods before you read a single item description.'
        ]
      }
    ]
  },
  {
    id: 'art-vault-spider-verse',
    slug: 'spider-verse-animation-deconstruction',
    topicLabel: 'Spider-Verse Animation Deconstruction',
    title: 'Spider-Verse Animation Deconstruction: Variable Frame Rates, Ben-Day Halftones & Emotional Color Scripts',
    subtitle: 'A frame-by-frame Community Vault essay on how Gwen Stacy’s Earth-65 watercolor bleeds and Hobie Brown’s punk collage broke 3D CGI rules.',
    universe: 'community-vault',
    universeName: 'Community Vault',
    accentColor: '#34D399',
    author: 'Soraiaendes Art Collective',
    authorRole: 'Verified Vault Visual Essayist',
    publishedAt: 'Sept 14, 2026',
    readTime: '7 MIN READ',
    releaseYear: '2026',
    popularityScore: 97.6,
    viewCount: 119800,
    rating: 4.9,
    ratingsCount: 1090,
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1400&q=80',
    tags: ['Fan Essays', 'Verified Art', 'Moderator Picks', 'Animation'],
    synopsis: 'How Sony Pictures Imageworks abandoned photorealistic motion blur in favor of animating on twos, CMYK registration offsets, and universe-specific rendering engines.',
    keyTakeaways: [
      'Miles Morales begins Into the Spider-Verse animated "on twos" (12 fps) during his clumsy early swings, graduating to "on ones" (24 fps) when he masters his leap of faith.',
      'Earth-65 (Gwen’s world) treats the background ceiling and walls like a wet mood ring, dripping cyan and magenta washes based on her emotional dialogue.',
      'Spider-Punk (Hobie Brown) is composited with asynchronous frame rates—his guitar, vest, and outline animate on 2s, 3s, and 4s simultaneously.'
    ],
    sections: [
      {
        heading: '01. Replacing Motion Blur with Comic Book Smears',
        paragraphs: [
          'For twenty years, western 3D feature animation chased physical camera simulation: smooth 24-frames-per-second interpolation and Gaussian motion blur. The Spider-Verse team asked a radical question: what if pausing any single frame of a 3D movie looked like a hand-inked comic panel?',
          'By stripping out automatic motion blur and hand-drawing 2D ink lines over 3D geometry rigs, every punch and web-swing retains crisp graphic impact.'
        ],
        quote: '“Hobie Brown refuses to obey Miguel O’Hara’s canon rules—so even his animation pipeline refuses to stay on a single consistent frame rate.”'
      }
    ]
  },
  {
    id: 'art-vault-evangelion',
    slug: 'neon-genesis-philosophy',
    topicLabel: 'Neon Genesis Philosophy',
    title: 'Neon Genesis Evangelion & The Hedgehog’s Dilemma: From 1995 Broadcast to Thrice Upon a Time',
    subtitle: 'Tracing Hideaki Anno’s 26-year psychological dialogue with otaku escapism, Schopenhauer’s parable, and the farewell at Ube-Shinkawa Station.',
    universe: 'community-vault',
    universeName: 'Community Vault',
    accentColor: '#34D399',
    author: 'Naomi Vance-Kato',
    authorRole: 'Community Vault Senior Essayist',
    publishedAt: 'Sept 06, 2026',
    readTime: '8 MIN READ',
    releaseYear: '2026',
    popularityScore: 96.5,
    viewCount: 102400,
    rating: 4.9,
    ratingsCount: 950,
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
    tags: ['Fan Essays', 'Lore Theories', 'Moderator Picks', 'Evangelion'],
    synopsis: 'Why the AT Field is the literal manifestation of human ego boundaries, and how the three distinct endings of Evangelion mirror the emotional maturation of both its creator and its audience.',
    keyTakeaways: [
      'The AT (Absolute Terror) Field represents the psychological wall every individual erects to avoid the pain of intimacy.',
      'End of Evangelion (1997) confronted toxic escapism with visceral rejection, whereas 3.0+1.0 (2021) offered grace, adulthood, and reconciliation.',
      'The final live-action shot of Ube-Shinkawa Station literally pulls the viewer out of the painted anime medium and back into reality.'
    ],
    sections: [
      {
        heading: '01. The AT Field as the Wall Around the Heart',
        paragraphs: [
          'In Episode 3 of Neon Genesis Evangelion, Ritsuko Akagi invokes Arthur Schopenhauer’s parable of the Hedgehog’s Dilemma: on a freezing winter night, porcupines huddle together for warmth, yet the closer they draw, the more their quills pierce one another.',
          'Within Evangelion’s esoteric Kabbalistic lore, the AT Field is not merely a sci-fi forcefield used by Angels and Evas—it is the physical boundary of the individual soul that keeps us from dissolving into the primordial soup of LCL.'
        ],
        quote: '“Goodbye, all of Evangelion—and welcome back to the real world waiting outside the theater doors.”'
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
      { name: 'Moderation Queue', action: 'moderation' },
      { name: 'Zero-Clutter Policy', action: 'policy' }
    ]
  }
]

# fandoms/management/commands/seed_data.py

from datetime import date
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from fandoms.models import Category, Content, CharacterProfile, StreamMedia
from merchandise.models import MerchandiseItem
from events.models import Event
from chatbot.models import ChatbotFAQ
from accounts.models import Profile
from django.utils.text import slugify

User = get_user_model()


class Command(BaseCommand):
    help = 'Seeds initial Fan Hub Plus data: 8 universes, content, stream & discover media, characters, merchandise, events, FAQs, and users.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Seeding Fan Hub Plus database..."))

        # 1. Admin and Demo Users
        admin_user, _ = User.objects.get_or_create(
            email='admin@fanhub.com',
            defaults={
                'username': 'admin_fanhub',
                'role': User.Role.ADMIN,
                'is_staff': True,
                'is_superuser': True,
                'is_verified': True,
            }
        )
        admin_user.set_password('AdminPass123!')
        admin_user.save()

        member_user, _ = User.objects.get_or_create(
            email='fan@fanhub.com',
            defaults={
                'username': 'cyber_otaku',
                'role': User.Role.MEMBER,
                'is_verified': True,
            }
        )
        member_user.set_password('MemberPass123!')
        member_user.save()
        self.stdout.write(self.style.SUCCESS("[OK] Admin and Member users created."))

        # 2. The 8 Mandatory Fandom Categories
        categories_data = [
            {
                'name': 'Anime',
                'slug': 'anime',
                'icon': 'Tv',
                'accent_color': '#A3E635',
                'badge_text_color': 'text-black',
                'description': 'Seasonal simulcasts, character bios, and opening theme breakdowns.',
                'entry_count': '240+ Entries',
                'tags': ['Simulcasts', 'Theme Songs', 'Character Lore', 'Spring 2026'],
                'top_pick': 'Solo Leveling: Arise',
                'featured_quote': '“Dedicate your hearts to the truth across timelines.”',
            },
            {
                'name': 'Gaming',
                'slug': 'gaming',
                'icon': 'Gamepad2',
                'accent_color': '#FACC15',
                'badge_text_color': 'text-black',
                'description': 'Patch metas, lore archives, speedrun highlights, and cinematics.',
                'entry_count': '180+ Entries',
                'tags': ['Patch 14.2', 'Speedruns', 'Esports', 'Lore Bible'],
                'top_pick': 'Elden Ring: Nightreign',
                'featured_quote': '“Wake up, Samurai. We have a universe to burn.”',
            },
            {
                'name': 'Movies & TV',
                'slug': 'movies-tv',
                'icon': 'Film',
                'accent_color': '#38BDF8',
                'badge_text_color': 'text-black',
                'description': 'Cinematic universe timelines, trailers, and cast interviews.',
                'entry_count': '310+ Entries',
                'tags': ['Canon Timelines', '4K Teasers', 'Casting Leaks', 'Director Cuts'],
                'top_pick': 'Avengers: Secret Wars Timeline',
                'featured_quote': '“The multiverse is a concept about which we know frighteningly little.”',
            },
            {
                'name': 'K-Pop',
                'slug': 'kpop',
                'icon': 'Mic2',
                'accent_color': '#F43F5E',
                'badge_text_color': 'text-white',
                'description': 'Comeback calendars, MV streams, discographies, and lightstick guides.',
                'entry_count': '125+ Entries',
                'tags': ['Comeback Radar', 'Discography', 'Lightstick Sync', 'Fanchants'],
                'top_pick': 'NewJeans Global Tour',
                'featured_quote': '“Music has no borders; the harmony transcends language.”',
            },
            {
                'name': 'Comics',
                'slug': 'comics',
                'icon': 'Zap',
                'accent_color': '#FB7185',
                'badge_text_color': 'text-black',
                'description': 'Multiverse reading orders, variant covers, and issue releases.',
                'entry_count': '95+ Entries',
                'tags': ['Issue Runs', 'Earth Timelines', 'Variant Art', 'Key Issues'],
                'top_pick': 'Ultimate Spider-Man 2026',
                'featured_quote': '“With great power comes the responsibility to preserve the timeline.”',
            },
            {
                'name': 'Manga',
                'slug': 'manga',
                'icon': 'BookOpen',
                'accent_color': '#FB923C',
                'badge_text_color': 'text-black',
                'description': 'Chapter trackers, author spotlights, and genre indexes.',
                'entry_count': '150+ Entries',
                'tags': ['Chapter Drops', 'Mangaka Spotlight', 'Raw Scans', 'Seinen Top'],
                'top_pick': 'Berserk Legacy Continuation',
                'featured_quote': '“Even if all the stars fade, the ink never truly dies.”',
            },
            {
                'name': 'Cosplay',
                'slug': 'cosplay',
                'icon': 'Sparkles',
                'accent_color': '#C084FC',
                'badge_text_color': 'text-black',
                'description': 'Build logs, prop crafting guides, and convention galleries.',
                'entry_count': '85+ Entries',
                'tags': ['Foam Crafting', '3D Printing', 'Con Galleries', 'LED Wiring'],
                'top_pick': 'WCS 2026 Champion Armor',
                'featured_quote': '“Bring the fictional dream into tactile, wearable reality.”',
            },
            {
                'name': 'Community Vault',
                'slug': 'community-vault',
                'icon': 'ShieldCheck',
                'accent_color': '#34D399',
                'badge_text_color': 'text-black',
                'description': 'Fan-submitted essays, reviews, and art showcases (Admin-approved).',
                'entry_count': '60+ Entries',
                'tags': ['Fan Essays', 'Lore Theories', 'Verified Art', 'Moderator Picks'],
                'top_pick': 'The Multiverse Paradox Thesis',
                'featured_quote': '“Admin-vetted fan canon, free of spam and toxic clutter.”',
            },
        ]

        cat_map = {}
        for cdata in categories_data:
            cat, _ = Category.objects.update_or_create(
                slug=cdata['slug'],
                defaults=cdata
            )
            cat_map[cat.slug] = cat
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(cat_map)} categories."))

        # Link favorite categories to demo user
        member_profile, _ = Profile.objects.get_or_create(user=member_user)
        member_profile.favorite_categories.set([cat_map['anime'], cat_map['gaming'], cat_map['comics']])
        member_profile.save()

        # 3. Curated Content
        content_items = [
            {
                'title': 'Cyberpunk: Edgerunners - Official Teaser',
                'slug': 'cyberpunk-edgerunners',
                'category': cat_map['anime'],
                'content_type': Content.ContentType.VIDEO,
                'media_url': 'https://youtu.be/x4ztgjvfU60?si=qQfMO9HWMUkkHiYD',
                'thumbnail_url': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
                'synopsis': 'A street kid trying to survive in Night City — a tech and body modification-obsessed city of the future. Studio Trigger x CD PROJEKT RED high-octane spectacle.',
                'body_text': 'Night City changes everyone who enters its chrome-plated borders. Explore David Martinez and Lucy\'s journey through the violent cyberware underworld.',
                'artist_or_author': 'Studio Trigger & CDPR',
                'duration': '02:45',
                'duration_seconds': 165,
                'release_year': '2026 Remaster',
                'popularity_score': 4.9,
                'view_count': 42000,
            },
            {
                'title': 'Demon Slayer: Infinity Castle - Cinematic Teaser',
                'slug': 'infinity-castle',
                'category': cat_map['anime'],
                'content_type': Content.ContentType.VIDEO,
                'media_url': 'https://youtu.be/x7uLutVRBfI?si=IOwYzPC81-fkXm6h',
                'thumbnail_url': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
                'synopsis': 'The final confrontation draws near as the Demon Slayer Corps breaches the endless shifting corridors of the Infinity Castle.',
                'body_text': 'Muzan Kibutsuji awaits within the extra-dimensional fortress. Tanjiro and the Hashira prepare for the ultimate fight.',
                'artist_or_author': 'ufotable',
                'duration': '03:12',
                'duration_seconds': 192,
                'release_year': '2026 Theatrical Run',
                'popularity_score': 5.0,
                'view_count': 78000,
            },
            {
                'title': 'Spider-Man: Beyond The Spider-Verse Sneak Peek',
                'slug': 'spider-multiverse',
                'category': cat_map['movies-tv'],
                'content_type': Content.ContentType.VIDEO,
                'media_url': 'https://youtu.be/qclHAbmDOJI?si=m0xKcgqUcJQq9xG1',
                'thumbnail_url': 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80',
                'synopsis': 'Miles Morales traverses the chromatic spectrum of anomalous dimensions to rewrite the canonical destiny of all Spider-heroes.',
                'body_text': 'Trapped on Earth-42, Miles must confront an alternate reality where Peter Parker never existed, while Gwen Stacy leads a rogue Spider-band.',
                'artist_or_author': 'Sony Pictures Animation',
                'duration': '02:18',
                'duration_seconds': 138,
                'release_year': '2026 Columbia / Marvel',
                'popularity_score': 4.8,
                'view_count': 51000,
            },
            {
                'title': 'Supernova (Armageddon)',
                'slug': 'kpop-supernova',
                'category': cat_map['kpop'],
                'content_type': Content.ContentType.AUDIO,
                'media_url': 'https://music.youtube.com/watch?v=LCIs3JXb5Aw&si=VHjPjewrlV0a-iX3',
                'thumbnail_url': 'https://i.ytimg.com/vi/LCIs3JXb5Aw/hqdefault.jpg',
                'synopsis': 'Hyperpop basslines collide with celestial harmonies in this official Armageddon title track.',
                'body_text': 'Armageddon The 1st Album title cut remastered for high-fidelity spatial audio systems.',
                'artist_or_author': 'Aespa',
                'duration': '02:59',
                'duration_seconds': 179,
                'release_year': 'Armageddon Special',
                'popularity_score': 4.9,
                'view_count': 148000,
            },
            {
                'title': 'MONEY CONSTANT',
                'slug': 'money-constant',
                'category': cat_map['kpop'],
                'content_type': Content.ContentType.AUDIO,
                'media_url': 'https://music.youtube.com/watch?v=dw8HOrauCdI&si=NipHbZbrNTxc-WH_',
                'thumbnail_url': 'https://i.ytimg.com/vi/dw8HOrauCdI/hqdefault.jpg',
                'synopsis': 'High-energy Amapiano and Afrobeats collaboration from SOUTH GIDI • 2025.',
                'body_text': 'DJ Maphorisa, DJ Tunez, Wizkid, and Mavo unite on SOUTH GIDI • 2025.',
                'artist_or_author': 'DJ Maphorisa, DJ Tunez, Wizkid & Mavo',
                'duration': '03:48',
                'duration_seconds': 228,
                'release_year': '2025',
                'popularity_score': 4.95,
                'view_count': 223000,
            },
            {
                'title': 'Calm Down',
                'slug': 'calm-down',
                'category': cat_map['kpop'],
                'content_type': Content.ContentType.AUDIO,
                'media_url': 'https://music.youtube.com/watch?v=CQLsdm1ZYAw&si=MFyp9PgpIsLRBOgb',
                'thumbnail_url': 'https://i.ytimg.com/vi/CQLsdm1ZYAw/hqdefault.jpg',
                'synopsis': 'Global Afrobeats phenomenon by Rema with over 705M views and 5.2M likes.',
                'body_text': 'Rema delivers a timeless melodic anthem dominating global streaming charts.',
                'artist_or_author': 'Rema',
                'duration': '03:59',
                'duration_seconds': 239,
                'release_year': '705M views',
                'popularity_score': 5.0,
                'view_count': 705000000,
            },
            {
                'title': 'The Multiverse Paradox: Canon Continuity Deconstruction',
                'slug': 'multiverse-paradox-essay',
                'category': cat_map['community-vault'],
                'content_type': Content.ContentType.ARTICLE,
                'media_url': None,
                'thumbnail_url': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
                'synopsis': 'An in-depth critical breakdown of how divergent branching timelines affect character stakes in modern franchise lore.',
                'body_text': 'When storytelling embraces infinite parallel realities, the permanence of consequence is inevitably placed under scrutiny.\n\nBy anchoring emotional weight to personal sacrifice rather than timeline resets, modern creators preserve dramatic tension across branching canons.',
                'artist_or_author': 'Fan Creator: cyber_otaku',
                'duration': '8 min read',
                'duration_seconds': 480,
                'release_year': '2026 Archive',
                'popularity_score': 4.8,
                'view_count': 9200,
            },
            {
                'title': 'Jujutsu Kaisen: Shinjuku Showdown Arc & Domain Clash Mechanics',
                'slug': 'jujutsu-kaisen-shinjuku-showdown',
                'category': cat_map['anime'],
                'content_type': Content.ContentType.ARTICLE,
                'media_url': None,
                'thumbnail_url': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
                'synopsis': 'How Gojo Satoru vs. Ryomen Sukuna rewrote the fundamental rules of barrier jujutsu, binding vows, and modern shonen fight choreography.',
                'body_text': 'For over a decade of modern shonen history, Domain Expansion stood as an instant-win condition.\n\nIn Shinjuku, Gege Akutami turned barrier geometry into a live chess match, pitting an open-barrier Shrine against compressed basketball-sized Unlimited Void shells.',
                'artist_or_author': 'Kenji Takahashi',
                'duration': '7 min read',
                'duration_seconds': 420,
                'release_year': '2026',
                'popularity_score': 4.95,
                'view_count': 84200,
            },
            {
                'title': 'Elden Ring: Shadow of the Erdtree & Nightreign Co-Op Meta Guide',
                'slug': 'elden-ring-shadow-erdtree-lore',
                'category': cat_map['gaming'],
                'content_type': Content.ContentType.ARTICLE,
                'media_url': None,
                'thumbnail_url': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
                'synopsis': 'Deciphering Miquella’s footsteps across the Land of Shadow, Scadutree Blessing breakpoints, and optimal 3-player Nightfarer builds.',
                'body_text': 'FromSoftware’s Land of Shadow discards traditional rune-level overleveling in favor of Scadutree Fragments.\n\nReaching Blessing Rank 12 before challenging Messmer the Impaler or Promised Consort Radahn is essential for surviving multi-phase boss combos.',
                'artist_or_author': 'Valkyrie_Builds',
                'duration': '8 min read',
                'duration_seconds': 480,
                'release_year': '2026',
                'popularity_score': 4.95,
                'view_count': 96300,
            },
            {
                'title': 'Dune: Messiah & The Golden Path — Villeneuve’s Tragic Space Opera',
                'slug': 'dune-messiah-production-diary',
                'category': cat_map['movies-tv'],
                'content_type': Content.ContentType.ARTICLE,
                'media_url': None,
                'thumbnail_url': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
                'synopsis': 'Inside the IMAX 70mm cinematography, Hans Zimmer’s choral dunescapes, and how Dune Part Three deconstructs the charismatic leader myth.',
                'body_text': 'Frank Herbert wrote Dune Messiah specifically to subvert the traditional hero’s journey.\n\nTwelve years after the Padishah Emperor’s deposition, Arrakis is no longer an arid frontier—it is the bureaucratic throne world of an interstellar jihad.',
                'artist_or_author': 'Elena Vance',
                'duration': '7 min read',
                'duration_seconds': 420,
                'release_year': '2026',
                'popularity_score': 4.9,
                'view_count': 71800,
            },
            {
                'title': 'aespa Armageddon & KWANGYA Lore: The Metallic Hyper-Pop Blueprint',
                'slug': 'aespa-armageddon-world-tour-recap',
                'category': cat_map['kpop'],
                'content_type': Content.ContentType.ARTICLE,
                'media_url': None,
                'thumbnail_url': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
                'synopsis': 'Deconstructing Supernova’s bass architecture, SYNK Parallel Line stadium production, and how 4th-gen K-Pop merged concept lore with avant-garde fashion.',
                'body_text': 'Where most pop eras soften their edges for mass appeal, aespa doubled down on "iron taste" metallic percussion.\n\n"Supernova" pairs an interpolated electro-clash bassline with soaring SM bridge harmonies, creating a futuristic stadium anthem.',
                'artist_or_author': 'Soo-Jin Park',
                'duration': '6 min read',
                'duration_seconds': 360,
                'release_year': '2026',
                'popularity_score': 4.95,
                'view_count': 112400,
            },
            {
                'title': 'X-Men: From the Ashes & Post-Krakoa Reading Order Matrix',
                'slug': 'x-men-from-the-ashes-reading-order',
                'category': cat_map['comics'],
                'content_type': Content.ContentType.ARTICLE,
                'media_url': None,
                'thumbnail_url': 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=1000&q=80',
                'synopsis': 'Navigating Cyclops’ Alaska strike force, Rogue’s Louisiana haven, and how mutantkind rebuilds after the Fall of the House of X.',
                'body_text': 'For five years of publishing history, the island nation of Krakoa united every hero and villain under one banner.\n\nWith the gates closed, Marvel’s mutant line splits into three distinct ideological books anchored by X-Men, Uncanny X-Men, and Exceptional X-Men.',
                'artist_or_author': 'Marcus Sterling',
                'duration': '8 min read',
                'duration_seconds': 480,
                'release_year': '2026',
                'popularity_score': 4.85,
                'view_count': 49800,
            },
            {
                'title': 'Kagurabachi: How Enchanted Blades & Cinematic Framing Ignited Jump',
                'slug': 'kagurabachi-enchanted-blades-analysis',
                'category': cat_map['manga'],
                'content_type': Content.ContentType.ARTICLE,
                'media_url': None,
                'thumbnail_url': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
                'synopsis': 'Analyzing Takeru Hokazono’s neo-noir paneling, the Seven Enchanted Blades lore, and why Chihiro Rokuhira is leading the next generation of Weekly Shonen Jump.',
                'body_text': 'Few manga in Weekly Shonen Jump history have transitioned as rapidly into a genuine critical phenomenon as Kagurabachi.\n\nHokazono treats the manga page like a widescreen anamorphic lens, using deep negative space and sumi-ink splashes.',
                'artist_or_author': 'Daichi Sato',
                'duration': '6 min read',
                'duration_seconds': 360,
                'release_year': '2026',
                'popularity_score': 4.9,
                'view_count': 73500,
            },
            {
                'title': 'EVA-01 High-Density Foam Armor & Addressable LED Wiring Blueprint',
                'slug': 'eva-01-led-foam-armor-blueprint',
                'category': cat_map['cosplay'],
                'content_type': Content.ContentType.ARTICLE,
                'media_url': None,
                'thumbnail_url': 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80',
                'synopsis': 'A complete workshop guide to heat-forming 10mm HD-EVA, plastidip priming, automotive urethane clearcoats, and WS2812B microcontroller harness routing.',
                'body_text': 'Standard craft foam collapses under the sharp geometric angles required for Evangelion Unit-01’s shoulder pylons.\n\nWe recommend 8mm and 10mm 100kg/m³ high-density EVA foam paired with bevel cuts at 45 degrees and Barge contact cement.',
                'artist_or_author': 'Lyra Solaris Workshop',
                'duration': '10 min read',
                'duration_seconds': 600,
                'release_year': '2026',
                'popularity_score': 4.95,
                'view_count': 44900,
            },
        ]

        for item_data in content_items:
            Content.objects.update_or_create(
                slug=item_data['slug'],
                defaults=item_data
            )
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(content_items)} content items."))

        # 3B. Stream & Discover Media (Trailers & Audio Tracks)
        stream_media_items = [
            {
                'title': 'Cyberpunk: Edgerunners - Official Teaser',
                'slug': 'cyberpunk-edgerunners',
                'stream_type': StreamMedia.StreamType.TRAILER,
                'category': cat_map['anime'],
                'universe_label': 'Anime / Gaming',
                'accent_color': '#A3E635',
                'duration': '02:45',
                'duration_seconds': 165,
                'release_year': '2026 Remaster',
                'artist': 'Studio Trigger & CDPR',
                'media_url': 'https://youtu.be/x4ztgjvfU60?si=qQfMO9HWMUkkHiYD',
                'thumbnail_url': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
                'synopsis': 'A street kid trying to survive in Night City — a tech and body modification-obsessed city of the future. Studio Trigger x CD PROJEKT RED high-octane spectacle.',
                'rating': 4.9,
                'ratings_count': 1240,
                'views_label': '4.2M views',
                'view_count': 4200000,
                'display_order': 1,
                'is_active': True,
            },
            {
                'title': 'Demon Slayer: Infinity Castle - Cinematic Teaser',
                'slug': 'infinity-castle',
                'stream_type': StreamMedia.StreamType.TRAILER,
                'category': cat_map['anime'],
                'universe_label': 'Anime',
                'accent_color': '#F43F5E',
                'duration': '03:12',
                'duration_seconds': 192,
                'release_year': '2026 Theatrical Run',
                'artist': 'ufotable',
                'media_url': 'https://youtu.be/x7uLutVRBfI?si=IOwYzPC81-fkXm6h',
                'thumbnail_url': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
                'synopsis': 'The final confrontation draws near as the Demon Slayer Corps breaches the endless shifting corridors of the Infinity Castle.',
                'rating': 5.0,
                'ratings_count': 2890,
                'views_label': '7.8M views',
                'view_count': 7800000,
                'display_order': 2,
                'is_active': True,
            },
            {
                'title': 'Spider-Man: Beyond The Spider-Verse Sneak Peek',
                'slug': 'spider-multiverse',
                'stream_type': StreamMedia.StreamType.TRAILER,
                'category': cat_map['movies-tv'],
                'universe_label': 'Movies & TV / Comics',
                'accent_color': '#38BDF8',
                'duration': '02:18',
                'duration_seconds': 138,
                'release_year': '2026 Columbia / Marvel',
                'artist': 'Sony Pictures Animation',
                'media_url': 'https://youtu.be/qclHAbmDOJI?si=m0xKcgqUcJQq9xG1',
                'thumbnail_url': 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80',
                'synopsis': 'Miles Morales traverses the chromatic spectrum of anomalous dimensions to rewrite the canonical destiny of all Spider-heroes.',
                'rating': 4.8,
                'ratings_count': 1620,
                'views_label': '5.1M views',
                'view_count': 5100000,
                'display_order': 3,
                'is_active': True,
            },
            {
                'title': 'Supernova (Armageddon)',
                'slug': 'kpop-supernova',
                'stream_type': StreamMedia.StreamType.AUDIO,
                'category': cat_map['kpop'],
                'universe_label': 'K-Pop • Armageddon',
                'accent_color': '#F43F5E',
                'duration': '02:59',
                'duration_seconds': 179,
                'release_year': 'Armageddon',
                'artist': 'Aespa',
                'album': 'Armageddon The 1st Album',
                'media_url': 'https://music.youtube.com/watch?v=LCIs3JXb5Aw&si=VHjPjewrlV0a-iX3',
                'thumbnail_url': 'https://i.ytimg.com/vi/LCIs3JXb5Aw/hqdefault.jpg',
                'synopsis': 'Hyperpop basslines collide with celestial harmonies in this official Armageddon title track.',
                'likes_label': '14.8K',
                'likes_count': 14800,
                'rating': 4.9,
                'display_order': 1,
                'is_active': True,
            },
            {
                'title': 'MONEY CONSTANT',
                'slug': 'money-constant',
                'stream_type': StreamMedia.StreamType.AUDIO,
                'category': cat_map['kpop'],
                'universe_label': 'SOUTH GIDI • 2025',
                'accent_color': '#FACC15',
                'duration': '03:48',
                'duration_seconds': 228,
                'release_year': '2025',
                'artist': 'DJ Maphorisa, DJ Tunez, Wizkid & Mavo',
                'album': 'SOUTH GIDI • 2025',
                'media_url': 'https://music.youtube.com/watch?v=dw8HOrauCdI&si=NipHbZbrNTxc-WH_',
                'thumbnail_url': 'https://i.ytimg.com/vi/dw8HOrauCdI/hqdefault.jpg',
                'synopsis': 'MONEY CONSTANT — [Dj Maphorisa][DJ Tunez][Wizkid][Mavo][SOUTH GIDI] • 2025.',
                'likes_label': '84.5K',
                'likes_count': 84500,
                'rating': 4.95,
                'display_order': 2,
                'is_active': True,
            },
            {
                'title': 'Calm Down',
                'slug': 'calm-down',
                'stream_type': StreamMedia.StreamType.AUDIO,
                'category': cat_map['kpop'],
                'universe_label': 'Afrobeats • 705M Views',
                'accent_color': '#A3E635',
                'duration': '03:59',
                'duration_seconds': 239,
                'release_year': '705M views',
                'artist': 'Rema',
                'album': '705M views • 5.2M likes',
                'media_url': 'https://music.youtube.com/watch?v=CQLsdm1ZYAw&si=MFyp9PgpIsLRBOgb',
                'thumbnail_url': 'https://i.ytimg.com/vi/CQLsdm1ZYAw/hqdefault.jpg',
                'synopsis': 'Calm Down — [Rema] • 705M views • 5.2M likes.',
                'views_label': '705M views',
                'view_count': 705000000,
                'likes_label': '5.2M',
                'likes_count': 5200000,
                'rating': 5.0,
                'display_order': 3,
                'is_active': True,
            },
        ]

        active_slugs = [sm['slug'] for sm in stream_media_items]
        StreamMedia.objects.exclude(slug__in=active_slugs).delete()

        for sm_data in stream_media_items:
            StreamMedia.objects.update_or_create(
                slug=sm_data['slug'],
                defaults=sm_data
            )
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(stream_media_items)} Stream & Discover media items."))

        # 4. Character Profiles (All 8 Universes)
        characters_data = [
            # Anime characters
            {
                'name': 'Goku',
                'alias': 'Kakarot',
                'category': cat_map['anime'],
                'archetype': 'Protagonist',
                'origin': 'Dragon Ball',
                'faction': 'Z Fighters',
                'tagline': 'The strongest warrior in the universe',
                'biography': 'A Saiyan sent to Earth as a baby, raised as a human, and became Earth\'s greatest protector.',
                'image_url': 'https://e7.pngegg.com/pngimages/822/663/png-clipart-goku-dragon-ball-desktop-4k-resolution-goku-fictional-character-cartoon.png',
                'stats_json': [{'strength': 99}, {'speed': 95}],
                'details_json': {'universe': 'Dragon Ball', 'species': 'Saiyan'}
            },
            {
                'name': 'Naruto Uzumaki',
                'alias': 'Naruto',
                'category': cat_map['anime'],
                'archetype': 'Protagonist',
                'origin': 'Naruto',
                'faction': 'Konoha',
                'tagline': 'Believe it!',
                'biography': 'A ninja from the Hidden Leaf Village with the Nine-Tails fox spirit sealed within him.',
                'image_url': 'https://e7.pngegg.com/pngimages/521/928/png-clipart-naruto-uzumaki-sasuke-uchiha-kakashi-hatake-naruto-shippuden-anime-manga-naruto-child-cg-artwork-thumbnail.png',
                'stats_json': [{'chakra': 90}, {'resilience': 95}],
                'details_json': {'universe': 'Naruto', 'species': 'Human'}
            },
            {
                'name': 'Monkey D. Luffy',
                'alias': 'Straw Hat',
                'category': cat_map['anime'],
                'archetype': 'Protagonist',
                'origin': 'One Piece',
                'faction': 'Straw Hat Pirates',
                'tagline': 'I\'m going to be the King of the Pirates!',
                'biography': 'A pirate with rubber powers who dreams of finding the One Piece treasure.',
                'image_url': 'https://e7.pngegg.com/pngimages/244/971/png-clipart-monkey-d-luffy-one-piece-anime-manga-roronoa-zoro-character-superhero-cartoon.png',
                'stats_json': [{'endurance': 100}, {'ambition': 100}],
                'details_json': {'universe': 'One Piece', 'species': 'Human'}
            },
            {
                'name': 'Sasuke Uchiha',
                'alias': 'The Avenger',
                'category': cat_map['anime'],
                'archetype': 'Rival',
                'origin': 'Naruto',
                'faction': 'Team 7',
                'tagline': 'I am an avenger.',
                'biography': 'A powerful ninja seeking revenge against his brother, driven by ambition and pride.',
                'image_url': 'https://e7.pngegg.com/pngimages/481/504/png-clipart-sasuke-uchiha-naruto-uzumaki-itachi-uchiha-kakashi-hatake-naruto-character-superhero-fictional-character.png',
                'stats_json': [{'speed': 95}, {'power': 94}],
                'details_json': {'universe': 'Naruto', 'species': 'Human'}
            },
            {
                'name': 'Ichigo Kurosaki',
                'alias': 'Bleach',
                'category': cat_map['anime'],
                'archetype': 'Protector',
                'origin': 'Bleach',
                'faction': 'Soul Society',
                'tagline': 'I am the one who fights.',
                'biography': 'A teenager with the ability to see and interact with spirits, protecting humans from hollows.',
                'image_url': 'https://e7.pngegg.com/pngimages/559/125/png-clipart-ichigo-kurosaki-bleach-shinigami-anime-manga-bleach-characters-cartoon-orange-hair.png',
                'stats_json': [{'swordsmanship': 92}, {'spiritual_power': 96}],
                'details_json': {'universe': 'Bleach', 'species': 'Human'}
            },
            {
                'name': 'Levi Ackerman',
                'alias': 'Humanity\'s Strongest Soldier',
                'category': cat_map['anime'],
                'archetype': 'Soldier',
                'origin': 'Attack on Titan',
                'faction': 'Survey Corps',
                'tagline': 'The difference in our strength is like the difference between clouds and mud.',
                'biography': 'A skilled soldier with exceptional combat abilities, leading the Survey Corps.',
                'image_url': 'https://e7.pngegg.com/pngimages/788/854/png-clipart-levi-ackerman-attack-on-titan-anime-manga-character-superhero-boy.png',
                'stats_json': [{'combat': 98}, {'leadership': 90}],
                'details_json': {'universe': 'Attack on Titan', 'species': 'Human'}
            },
            {
                'name': 'Rem',
                'alias': 'The Blue Demon Maid',
                'category': cat_map['anime'],
                'archetype': 'Demon Maid',
                'origin': 'Re:Zero',
                'faction': 'Roswaal\'s Mansion',
                'tagline': 'I love Subaru.',
                'biography': 'A demon maid with blue hair who serves in a mansion and possesses formidable combat skills.',
                'image_url': 'https://e7.pngegg.com/pngimages/892/631/png-clipart-rem-re-zero-anime-maid-blue-hair-character-manga.png',
                'stats_json': [{'combat': 88}, {'loyalty': 100}],
                'details_json': {'universe': 'Re:Zero', 'species': 'Demon'}
            },
            {
                'name': 'Mikasa Ackerman',
                'alias': 'The Black-Haired Goddess',
                'category': cat_map['anime'],
                'archetype': 'Soldier',
                'origin': 'Attack on Titan',
                'faction': 'Survey Corps',
                'tagline': 'Eren, I\'ll always follow you.',
                'biography': 'A skilled fighter and devoted friend who protects those she cares about.',
                'image_url': 'https://e7.pngegg.com/pngimages/485/244/png-clipart-mikasa-ackerman-attack-on-titan-anime-character-superhero-manga.png',
                'stats_json': [{'combat': 92}, {'devotion': 100}],
                'details_json': {'universe': 'Attack on Titan', 'species': 'Human'}
            },
            # Gaming characters
            {
                'name': 'Geralt of Rivia',
                'alias': 'The Witcher',
                'category': cat_map['gaming'],
                'archetype': 'Witcher',
                'origin': 'The Witcher',
                'faction': 'Witchers',
                'tagline': 'I am the witcher.',
                'biography': 'A monster hunter with supernatural abilities, mutated through ancient rites.',
                'image_url': 'https://e7.pngegg.com/pngimages/405/863/png-clipart-geralt-of-rivia-the-witcher-3-wild-hunt-the-witcher-monster-hunter-video-game-character.png',
                'stats_json': [{'swordsmanship': 95}, {'alchemy': 85}],
                'details_json': {'universe': 'The Witcher', 'species': 'Human'}
            },
            {
                'name': 'Link',
                'alias': 'The Hero of Time',
                'category': cat_map['gaming'],
                'archetype': 'Hero',
                'origin': 'The Legend of Zelda',
                'faction': 'Hyrule',
                'tagline': 'It\'s dangerous to go alone! Take this.',
                'biography': 'The chosen hero destined to save Hyrule from darkness.',
                'image_url': 'https://e7.pngegg.com/pngimages/513/595/png-clipart-link-the-legend-of-zelda-breath-of-the-wild-the-legend-of-zelda-link-s-awakening-video-game-character.png',
                'stats_json': [{'courage': 100}, {'wisdom': 90}],
                'details_json': {'universe': 'The Legend of Zelda', 'species': 'Hylian'}
            },
            {
                'name': 'Master Chief',
                'alias': 'John-117',
                'category': cat_map['gaming'],
                'archetype': 'Spartan',
                'origin': 'Halo',
                'faction': 'UNSC',
                'tagline': 'I\'ll finish the fight.',
                'biography': 'A genetically enhanced supersoldier fighting against the Covenant.',
                'image_url': 'https://e7.pngegg.com/pngimages/844/233/png-clipart-master-chief-halo-infinite-video-game-character-spartan.png',
                'stats_json': [{'strength': 95}, {'tactical': 90}],
                'details_json': {'universe': 'Halo', 'species': 'Human'}
            },
            {
                'name': 'Cloud Strife',
                'alias': 'The One-Winged Angel',
                'category': cat_map['gaming'],
                'archetype': 'Ex-Soldier',
                'origin': 'Final Fantasy VII',
                'faction': 'AVALANCHE',
                'tagline': 'Let\'s mosey.',
                'biography': 'A former member of an elite military unit turned eco-terrorist who fights to save the planet.',
                'image_url': 'https://e7.pngegg.com/pngimages/365/618/png-clipart-cloud-strife-final-fantasy-vii-remake-buster-sword-final-fantasy-video-game-character.png',
                'stats_json': [{'swordsmanship': 94}, {'materia': 88}],
                'details_json': {'universe': 'Final Fantasy VII', 'species': 'Human'}
            },
            {
                'name': 'Lara Croft',
                'alias': 'Tomb Raider',
                'category': cat_map['gaming'],
                'archetype': 'Archaeologist',
                'origin': 'Tomb Raider',
                'faction': 'Independent',
                'tagline': 'I\'ll find the truth.',
                'biography': 'An adventurous archaeologist exploring ancient tombs and uncovering lost civilizations.',
                'image_url': 'https://e7.pngegg.com/pngimages/476/816/png-clipart-lara-croft-tomb-raider-video-game-character-action-girl.png',
                'stats_json': [{'agility': 92}, {'intelligence': 90}],
                'details_json': {'universe': 'Tomb Raider', 'species': 'Human'}
            },
            {
                'name': 'Kratos',
                'alias': 'Ghost of Sparta',
                'category': cat_map['gaming'],
                'archetype': 'Warrior',
                'origin': 'God of War',
                'faction': 'Norse Gods',
                'tagline': 'Boy!',
                'biography': 'A warrior who escaped the Greek underworld to challenge the gods themselves.',
                'image_url': 'https://e7.pngegg.com/pngimages/844/233/png-clipart-kratos-god-of-war-video-game-character-spartan-warrior.png',
                'stats_json': [{'strength': 100}, {'rage': 95}],
                'details_json': {'universe': 'God of War', 'species': 'Demigod'}
            },
            {
                'name': 'Ellie',
                'alias': 'Firefly',
                'category': cat_map['gaming'],
                'archetype': 'Survivor',
                'origin': 'The Last of Us',
                'faction': 'Fireflies',
                'tagline': 'I\'ll survive.',
                'biography': 'A young survivor immune to infection, navigating a post-apocalyptic world.',
                'image_url': 'https://e7.pngegg.com/pngimages/525/881/png-clipart-ellie-the-last-of-us-part-ii-video-game-character-girl.png',
                'stats_json': [{'survival': 95}, {'courage': 92}],
                'details_json': {'universe': 'The Last of Us', 'species': 'Human'}
            },
            # Movies & TV characters
            {
                'name': 'Tony Stark',
                'alias': 'Iron Man',
                'category': cat_map['movies-tv'],
                'archetype': 'Genius',
                'origin': 'Marvel Cinematic Universe',
                'faction': 'Avengers',
                'tagline': 'I am Iron Man.',
                'biography': 'A billionaire industrialist who builds a powered suit of armor to save the world.',
                'image_url': 'https://e7.pngegg.com/pngimages/406/868/png-clipart-iron-man-tony-stark-marvel-cinematic-universe-superhero-character.png',
                'stats_json': [{'intelligence': 100}, {'charisma': 85}],
                'details_json': {'universe': 'Marvel', 'species': 'Human'}
            },
            {
                'name': 'Jon Snow',
                'alias': 'Aegon Targaryen',
                'category': cat_map['movies-tv'],
                'archetype': 'Leader',
                'origin': 'Game of Thrones',
                'faction': 'Night\'s Watch',
                'tagline': 'Winter is coming.',
                'biography': 'A nobleman raised as a bastard, destined to protect the realm from the White Walkers.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-jon-snow-game-of-thrones-character-white-walker-tv-series.png',
                'stats_json': [{'honor': 90}, {'leadership': 85}],
                'details_json': {'universe': 'Game of Thrones', 'species': 'Human'}
            },
            {
                'name': 'Neo',
                'alias': 'The One',
                'category': cat_map['movies-tv'],
                'archetype': 'Chosen One',
                'origin': 'The Matrix',
                'faction': 'Zion',
                'tagline': 'I know kung fu.',
                'biography': 'A computer programmer who discovers the true nature of reality and becomes humanity\'s savior.',
                'image_url': 'https://e7.pngegg.com/pngimages/425/847/png-clipart-neo-the-matrix-kung-fu-character-movies.png',
                'stats_json': [{'martial_arts': 100}, {'hacking': 95}],
                'details_json': {'universe': 'The Matrix', 'species': 'Human'}
            },
            {
                'name': 'Walter White',
                'alias': 'Heisenberg',
                'category': cat_map['movies-tv'],
                'archetype': 'Antihero',
                'origin': 'Breaking Bad',
                'faction': 'Cartel',
                'tagline': 'You\'re goddamn right.',
                'biography': 'A chemistry teacher turned drug kingpin, motivated by pride and ego.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-walter-white-breaking-bad-chemistry-teacher-antihero-tv-series.png',
                'stats_json': [{'chemistry': 98}, {'cunning': 95}],
                'details_json': {'universe': 'Breaking Bad', 'species': 'Human'}
            },
            {
                'name': 'Daenerys Targaryen',
                'alias': 'Mother of Dragons',
                'category': cat_map['movies-tv'],
                'archetype': 'Queen',
                'origin': 'Game of Thrones',
                'faction': 'House Targaryen',
                'tagline': 'Dracarys!',
                'biography': 'An exiled princess who rises to power, commanding dragons and loyal followers.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-daenerys-targaryen-game-of-thrones-mother-of-dragons-character.png',
                'stats_json': [{'leadership': 96}, {'dragons': 100}],
                'details_json': {'universe': 'Game of Thrones', 'species': 'Human'}
            },
            {
                'name': 'Sherlock Holmes',
                'alias': 'The Consulting Detective',
                'category': cat_map['movies-tv'],
                'archetype': 'Detective',
                'origin': 'BBC Sherlock',
                'faction': 'Baker Street',
                'tagline': 'The game is afoot.',
                'biography': 'A brilliant modern detective solving crimes in contemporary London.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-sherlock-holmes-detective-bbc-character.png',
                'stats_json': [{'intelligence': 100}, {'observation': 100}],
                'details_json': {'universe': 'Sherlock', 'species': 'Human'}
            },
            {
                'name': 'Eleven',
                'alias': 'El',
                'category': cat_map['movies-tv'],
                'archetype': 'Psychokinetic',
                'origin': 'Stranger Things',
                'faction': 'Hawkins Lab',
                'tagline': 'Friends don\'t lie.',
                'biography': 'A young girl with psychokinetic abilities escaping a secret laboratory.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-eleven-stranger-things-character-girl-psychokinetic.png',
                'stats_json': [{'psychokinesis': 98}, {'growth': 95}],
                'details_json': {'universe': 'Stranger Things', 'species': 'Human'}
            },
            # K-Pop characters
            {
                'name': 'Lisa',
                'alias': 'Lalisa Manoban',
                'category': cat_map['kpop'],
                'archetype': 'Idol',
                'origin': 'Blackpink',
                'faction': 'YG Entertainment',
                'tagline': 'LISA is the name, dancing is my game.',
                'biography': 'A Thai-born K-pop idol known for her exceptional dancing skills and charisma.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-lisa-blackpink-kpop-idol-dancer.png',
                'stats_json': [{'dance': 100}, {'charisma': 95}],
                'details_json': {'universe': 'K-Pop', 'species': 'Human'}
            },
            {
                'name': 'Jungkook',
                'alias': 'JK',
                'category': cat_map['kpop'],
                'archetype': 'Idol',
                'origin': 'BTS',
                'faction': 'Big Hit Music',
                'tagline': 'I\'m the golden maknae.',
                'biography': 'The youngest member of BTS, known for his vocal talent and versatility.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-jungkook-bts-idol-kpop-member.png',
                'stats_json': [{'vocal': 95}, {'dance': 90}],
                'details_json': {'universe': 'K-Pop', 'species': 'Human'}
            },
            {
                'name': 'IU',
                'alias': 'Lee Ji-eun',
                'category': cat_map['kpop'],
                'archetype': 'Singer-Songwriter',
                'origin': 'K-Pop',
                'faction': 'EDAM Entertainment',
                'tagline': 'The nation\'s little sister.',
                'biography': 'A South Korean singer-songwriter known for her sweet voice and heartfelt lyrics.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-iu-korean-singer-songwriter-kpop.png',
                'stats_json': [{'vocal': 95}, {'songwriting': 90}],
                'details_json': {'universe': 'K-Pop', 'species': 'Human'}
            },
            {
                'name': 'Jennie Kim',
                'alias': 'Jennie',
                'category': cat_map['kpop'],
                'archetype': 'Idol',
                'origin': 'Blackpink',
                'faction': 'YG Entertainment',
                'tagline': 'Pretty savage.',
                'biography': 'A South Korean rapper and member of Blackpink, known for her stage presence.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-jennie-blackpink-rapper-idol-kpop.png',
                'stats_json': [{'rap': 92}, {'stage_presence': 95}],
                'details_json': {'universe': 'K-Pop', 'species': 'Human'}
            },
            {
                'name': 'V (Taehyung)',
                'alias': 'Tae',
                'category': cat_map['kpop'],
                'archetype': 'Idol',
                'origin': 'BTS',
                'faction': 'Big Hit Music',
                'tagline': 'I purple you.',
                'biography': 'A member of BTS known for his deep voice and artistic talents.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-taehyung-bts-idol-kpop-member.png',
                'stats_json': [{'vocal': 92}, {'visual': 98}],
                'details_json': {'universe': 'K-Pop', 'species': 'Human'}
            },
            # Comics characters
            {
                'name': 'Spider-Man',
                'alias': 'Peter Parker',
                'category': cat_map['comics'],
                'archetype': 'Superhero',
                'origin': 'Marvel Comics',
                'faction': 'Avengers',
                'tagline': 'With great power comes great responsibility.',
                'biography': 'A high school student bitten by a radioactive spider, gaining spider-like abilities.',
                'image_url': 'https://e7.pngegg.com/pngimages/564/365/png-clipart-spider-man-marvel-comics-superhero-character.png',
                'stats_json': [{'agility': 95}, {'strength': 85}],
                'details_json': {'universe': 'Marvel', 'species': 'Human'}
            },
            {
                'name': 'Batman',
                'alias': 'Bruce Wayne',
                'category': cat_map['comics'],
                'archetype': 'Detective',
                'origin': 'DC Comics',
                'faction': 'Justice League',
                'tagline': 'I am the night.',
                'biography': 'A billionaire who uses his intellect and resources to fight crime in Gotham City.',
                'image_url': 'https://e7.pngegg.com/pngimages/523/581/png-clipart-batman-bruce-wayne-dc-comics-superhero-character.png',
                'stats_json': [{'intelligence': 100}, {'martial_arts': 95}],
                'details_json': {'universe': 'DC', 'species': 'Human'}
            },
            {
                'name': 'Wonder Woman',
                'alias': 'Diana Prince',
                'category': cat_map['comics'],
                'archetype': 'Amazon',
                'origin': 'DC Comics',
                'faction': 'Justice League',
                'tagline': 'I am Diana of Themyscira, Princess of the Amazons.',
                'biography': 'An Amazon princess with superhuman strength and the Lasso of Truth.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-wonder-woman-diana-prince-dc-comics-superhero.png',
                'stats_json': [{'strength': 95}, {'wisdom': 90}],
                'details_json': {'universe': 'DC', 'species': 'Amazon'}
            },
            {
                'name': 'Superman',
                'alias': 'Clark Kent',
                'category': cat_map['comics'],
                'archetype': 'Kryptonian',
                'origin': 'DC Comics',
                'faction': 'Justice League',
                'tagline': 'Truth, justice, and the American way.',
                'biography': 'An alien from Krypton with extraordinary powers, raised as a human in Kansas.',
                'image_url': 'https://e7.pngegg.com/pngimages/523/581/png-clipart-superman-clark-kent-dc-comics-superhero-character.png',
                'stats_json': [{'strength': 100}, {'flight': 100}],
                'details_json': {'universe': 'DC', 'species': 'Kryptonian'}
            },
            {
                'name': 'Iron Man',
                'alias': 'Tony Stark',
                'category': cat_map['comics'],
                'archetype': 'Genius Inventor',
                'origin': 'Marvel Comics',
                'faction': 'Avengers',
                'tagline': 'Genius, billionaire, playboy, philanthropist.',
                'biography': 'A brilliant engineer who creates advanced armor to fight evil.',
                'image_url': 'https://e7.pngegg.com/pngimages/406/868/png-clipart-iron-man-tony-stark-marvel-comics-character.png',
                'stats_json': [{'engineering': 99}, {'power': 90}],
                'details_json': {'universe': 'Marvel', 'species': 'Human'}
            },
            {
                'name': 'Black Widow',
                'alias': 'Natasha Romanoff',
                'category': cat_map['comics'],
                'archetype': 'Assassin',
                'origin': 'Marvel Comics',
                'faction': 'Avengers',
                'tagline': 'I\'m always picking up after you boys.',
                'biography': 'A highly trained spy and assassin turned hero, fighting for redemption.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-black-widow-natasha-romanoff-marvel-comics-character.png',
                'stats_json': [{'espionage': 98}, {'combat': 96}],
                'details_json': {'universe': 'Marvel', 'species': 'Human'}
            },
            {
                'name': 'The Flash',
                'alias': 'Barry Allen',
                'category': cat_map['comics'],
                'archetype': 'Speedster',
                'origin': 'DC Comics',
                'faction': 'Justice League',
                'tagline': 'My name is Barry Allen, and I\'m the fastest man alive.',
                'biography': 'A forensic scientist struck by lightning, gaining super speed powers.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-the-flash-barry-allen-dc-comics-speedster-character.png',
                'stats_json': [{'speed': 100}, {'agility': 95}],
                'details_json': {'universe': 'DC', 'species': 'Human'}
            },
            # Manga characters
            {
                'name': 'Saitama',
                'alias': 'One Punch Man',
                'category': cat_map['manga'],
                'archetype': 'Hero',
                'origin': 'One Punch Man',
                'faction': 'Hero Association',
                'tagline': 'I\'m just a hero for fun.',
                'biography': 'A hero who can defeat any opponent with a single punch, but is bored with his power.',
                'image_url': 'https://e7.pngegg.com/pngimages/521/928/png-clipart-saitama-one-punch-man-anime-manga-character-bald-superhero.png',
                'stats_json': [{'strength': 100}, {'speed': 100}],
                'details_json': {'universe': 'One Punch Man', 'species': 'Human'}
            },
            {
                'name': 'Eren Yeager',
                'alias': 'Eren Jaeger',
                'category': cat_map['manga'],
                'archetype': 'Revolutionary',
                'origin': 'Attack on Titan',
                'faction': 'Survey Corps',
                'tagline': 'I will destroy all the Titans.',
                'biography': 'A young man who swears revenge on the Titans after they destroy his hometown.',
                'image_url': 'https://e7.pngegg.com/pngimages/788/854/png-clipart-eren-yeager-attack-on-titan-anime-manga-character.png',
                'stats_json': [{'determination': 100}, {'agility': 90}],
                'details_json': {'universe': 'Attack on Titan', 'species': 'Human'}
            },
            {
                'name': 'Light Yagami',
                'alias': 'Kira',
                'category': cat_map['manga'],
                'archetype': 'Genius',
                'origin': 'Death Note',
                'faction': 'Kira',
                'tagline': 'I am the god of the new world.',
                'biography': 'A genius high school student who gains the power to kill with a notebook.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-light-yagami-death-note-anime-manga-genius-character.png',
                'stats_json': [{'intelligence': 100}, {'manipulation': 95}],
                'details_json': {'universe': 'Death Note', 'species': 'Human'}
            },
            {
                'name': 'Tanjiro Kamado',
                'alias': 'Demon Slayer',
                'category': cat_map['manga'],
                'archetype': 'Swordsman',
                'origin': 'Demon Slayer',
                'faction': 'Demon Slayer Corps',
                'tagline': 'I\'ll save everyone.',
                'biography': 'A young demon slayer who fights to turn his sister back into a human.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-tanjiro-kamado-demon-slayer-anime-manga-character.png',
                'stats_json': [{'swordsmanship': 93}, {'determination': 96}],
                'details_json': {'universe': 'Demon Slayer', 'species': 'Human'}
            },
            {
                'name': 'Mob',
                'alias': 'Shigeo Kageyama',
                'category': cat_map['manga'],
                'archetype': 'Psychic',
                'origin': 'Mob Psycho 100',
                'faction': 'Spirit Medium Association',
                'tagline': 'I\'m not special.',
                'biography': 'A middle school student with overwhelming psychic powers seeking normalcy.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-mob-shigeo-kageyama-mob-psycho-100-anime-manga-character.png',
                'stats_json': [{'psychic_power': 100}, {'growth': 95}],
                'details_json': {'universe': 'Mob Psycho 100', 'species': 'Human'}
            },
            {
                'name': 'Yuji Itadori',
                'alias': 'Sukuna\'s Vessel',
                'category': cat_map['manga'],
                'archetype': 'Sorcerer',
                'origin': 'Jujutsu Kaisen',
                'faction': 'Tokyo Jujutsu High',
                'tagline': 'I will save everyone.',
                'biography': 'A high schooler who swallows a cursed finger and becomes the vessel of a powerful demon.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-yuji-itadori-jujutsu-kaisen-anime-manga-character-sorcerer.png',
                'stats_json': [{'cursed_energy': 92}, {'combat': 90}],
                'details_json': {'universe': 'Jujutsu Kaisen', 'species': 'Human'}
            },
            {
                'name': 'Deku',
                'alias': 'Izuku Midoriya',
                'category': cat_map['manga'],
                'archetype': 'Hero-in-Training',
                'origin': 'My Hero Academia',
                'faction': 'U.A. High School',
                'tagline': 'Plus Ultra!',
                'biography': 'A quirkless boy who gains superpowers and becomes a hero in training.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-deku-izuku-midoriya-my-hero-academia-anime-manga-character.png',
                'stats_json': [{'quirk': 88}, {'determination': 98}],
                'details_json': {'universe': 'My Hero Academia', 'species': 'Human'}
            },
            # Cosplay/Pop Culture characters
            {
                'name': 'Darth Vader',
                'alias': 'Anakin Skywalker',
                'category': cat_map['cosplay'],
                'archetype': 'Sith Lord',
                'origin': 'Star Wars',
                'faction': 'Galactic Empire',
                'tagline': 'I am your father.',
                'biography': 'A former Jedi turned Sith Lord, known for his black armor and deep voice.',
                'image_url': 'https://e7.pngegg.com/pngimages/336/592/png-clipart-darth-vader-anakin-skywalker-star-wars-sith-lord-character.png',
                'stats_json': [{'dark_side': 100}, {'power': 95}],
                'details_json': {'universe': 'Star Wars', 'species': 'Human'}
            },
            {
                'name': 'Harley Quinn',
                'alias': 'Harleen Quinzel',
                'category': cat_map['cosplay'],
                'archetype': 'Jester',
                'origin': 'DC Comics',
                'faction': 'Suicide Squad',
                'tagline': 'Who\'s the bad guy now?',
                'biography': 'A former psychiatrist turned criminal, known for her playful and chaotic nature.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-harley-quinn-harleen-quinzel-dc-comics-character.png',
                'stats_json': [{'acrobatics': 90}, {'chaos': 100}],
                'details_json': {'universe': 'DC', 'species': 'Human'}
            },
            {
                'name': 'Mario',
                'alias': 'Super Mario',
                'category': cat_map['cosplay'],
                'archetype': 'Plumber',
                'origin': 'Super Mario',
                'faction': 'Mushroom Kingdom',
                'tagline': 'It\'s-a me, Mario!',
                'biography': 'A famous plumber who saves Princess Peach from Bowser.',
                'image_url': 'https://e7.pngegg.com/pngimages/341/664/png-clipart-mario-super-mario-video-game-character-plumber.png',
                'stats_json': [{'jumping': 100}, {'adventure': 95}],
                'details_json': {'universe': 'Super Mario', 'species': 'Human'}
            },
            {
                'name': 'Pikachu',
                'alias': 'Electric Mouse',
                'category': cat_map['cosplay'],
                'archetype': 'Pokemon',
                'origin': 'Pokemon',
                'faction': 'Team Pikachu',
                'tagline': 'Pika Pika!',
                'biography': 'An electric-type Pokemon known for its iconic "Pika Pika" cry and powerful attacks.',
                'image_url': 'https://e7.pngegg.com/pngimages/2/637/png-clipart-pikachu-pokemon-go-pokemon-yellow-pikachu-electric-mouse-pokemon.png',
                'stats_json': [{'electric': 100}, {'speed': 92}],
                'details_json': {'universe': 'Pokemon', 'species': 'Electric Mouse'}
            },
            {
                'name': 'Wolverine',
                'alias': 'Logan',
                'category': cat_map['cosplay'],
                'archetype': 'Mutant',
                'origin': 'Marvel Comics',
                'faction': 'X-Men',
                'tagline': 'The best there is at what I do.',
                'biography': 'A mutant with healing powers and retractable adamantium claws, seeking redemption.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-wolverine-logan-marvel-comics-x-men-character.png',
                'stats_json': [{'regeneration': 95}, {'combat': 94}],
                'details_json': {'universe': 'Marvel', 'species': 'Mutant'}
            },
            {
                'name': 'Deadpool',
                'alias': 'Wade Wilson',
                'category': cat_map['cosplay'],
                'archetype': 'Mercenary',
                'origin': 'Marvel Comics',
                'faction': 'Merc with a Mouth',
                'tagline': 'Maximum effort!',
                'biography': 'A wisecracking mercenary with a healing factor and a love for chaos.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-deadpool-wade-wilson-marvel-comics-mercenary-character.png',
                'stats_json': [{'humor': 100}, {'combat': 88}],
                'details_json': {'universe': 'Marvel', 'species': 'Human'}
            },
            {
                'name': 'Joker',
                'alias': 'The Clown Prince of Crime',
                'category': cat_map['cosplay'],
                'archetype': 'Criminal',
                'origin': 'DC Comics',
                'faction': 'None',
                'tagline': 'Why so serious?',
                'biography': 'Batman\'s arch-nemesis, a chaotic criminal mastermind with a twisted sense of humor.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-joker-the-clown-prince-dc-comics-villain-character.png',
                'stats_json': [{'chaos': 100}, {'intelligence': 92}],
                'details_json': {'universe': 'DC', 'species': 'Human'}
            },
            # Community Vault characters
            {
                'name': 'Sherlock Holmes',
                'alias': 'The Consulting Detective',
                'category': cat_map['community-vault'],
                'archetype': 'Detective',
                'origin': 'Arthur Conan Doyle\'s stories',
                'faction': 'Baker Street',
                'tagline': 'The game is afoot.',
                'biography': 'A brilliant detective known for his logical reasoning and forensic skills.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-sherlock-holmes-detective-consulting-character.png',
                'stats_json': [{'intelligence': 100}, {'observation': 100}],
                'details_json': {'universe': 'Sherlock Holmes', 'species': 'Human'}
            },
            {
                'name': 'The Doctor',
                'alias': 'The Time Lord',
                'category': cat_map['community-vault'],
                'archetype': 'Time Traveler',
                'origin': 'Doctor Who',
                'faction': 'Gallifrey',
                'tagline': 'Allons-y!',
                'biography': 'A time-traveling alien who explores the universe in the TARDIS.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-the-doctor-doctor-who-time-lord-character.png',
                'stats_json': [{'regeneration': 100}, {'wisdom': 95}],
                'details_json': {'universe': 'Doctor Who', 'species': 'Time Lord'}
            },
            {
                'name': 'Hermione Granger',
                'alias': 'The Brightest Witch',
                'category': cat_map['community-vault'],
                'archetype': 'Witch',
                'origin': 'Harry Potter',
                'faction': 'Gryffindor',
                'tagline': 'I\'m going to bed before either of you come up with another clever idea to get us killed.',
                'biography': 'A brilliant witch known for her intelligence and loyalty.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-hermione-granger-harry-potter-witch-character.png',
                'stats_json': [{'intelligence': 100}, {'loyalty': 95}],
                'details_json': {'universe': 'Harry Potter', 'species': 'Human'}
            },
            {
                'name': 'Harry Potter',
                'alias': 'The Boy Who Lived',
                'category': cat_map['community-vault'],
                'archetype': 'Wizard',
                'origin': 'Harry Potter',
                'faction': 'Gryffindor',
                'tagline': 'I\'m not really famous for anything.',
                'biography': 'A young wizard destined to defeat the dark wizard Voldemort.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-harry-potter-wizard-character-books.png',
                'stats_json': [{'magic': 90}, {'courage': 95}],
                'details_json': {'universe': 'Harry Potter', 'species': 'Wizard'}
            },
            {
                'name': 'Dumbledore',
                'alias': 'Albus Percival Wulfric Brian Dumbledore',
                'category': cat_map['community-vault'],
                'archetype': 'Sage',
                'origin': 'Harry Potter',
                'faction': 'Hogwarts',
                'tagline': 'It is our choices that show what we truly are.',
                'biography': 'The most powerful wizard of his time, known for his wisdom and kindness.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-dumbledore-albus-harry-potter-sage-wizard.png',
                'stats_json': [{'magic': 100}, {'wisdom': 100}],
                'details_json': {'universe': 'Harry Potter', 'species': 'Wizard'}
            },
            {
                'name': 'Gandalf',
                'alias': 'Gandalf the Grey',
                'category': cat_map['community-vault'],
                'archetype': 'Wizard',
                'origin': 'The Lord of the Rings',
                'faction': 'Fellowship',
                'tagline': 'You shall not pass!',
                'biography': 'An ancient wizard and mentor to hobbits, fighting against the forces of darkness.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-gandalf-the-grey-lord-of-the-rings-wizard-character.png',
                'stats_json': [{'magic': 98}, {'leadership': 95}],
                'details_json': {'universe': 'The Lord of the Rings', 'species': 'Maiar'}
            },
            {
                'name': 'Frodo Baggins',
                'alias': 'Frodo',
                'category': cat_map['community-vault'],
                'archetype': 'Hobbit',
                'origin': 'The Lord of the Rings',
                'faction': 'Fellowship',
                'tagline': 'I wish it need not have happened in my time.',
                'biography': 'A small hobbit entrusted with the One Ring and the fate of Middle-earth.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-frodo-baggins-hobbit-lord-of-the-rings-character.png',
                'stats_json': [{'resilience': 95}, {'determination': 96}],
                'details_json': {'universe': 'The Lord of the Rings', 'species': 'Hobbit'}
            },
            {
                'name': 'Aragorn',
                'alias': 'Strider',
                'category': cat_map['community-vault'],
                'archetype': 'Ranger',
                'origin': 'The Lord of the Rings',
                'faction': 'Dúnedain',
                'tagline': 'A wizard is never late.',
                'biography': 'A ranger and rightful king of Gondor who leads the free peoples against darkness.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-aragorn-strider-lord-of-the-rings-ranger-character.png',
                'stats_json': [{'swordsmanship': 94}, {'leadership': 92}],
                'details_json': {'universe': 'The Lord of the Rings', 'species': 'Human'}
            },
            {
                'name': 'Luke Skywalker',
                'alias': 'The Last Jedi',
                'category': cat_map['community-vault'],
                'archetype': 'Jedi',
                'origin': 'Star Wars',
                'faction': 'Jedi Order',
                'tagline': 'May the Force be with you.',
                'biography': 'A young Jedi knight who learns the ways of the Force and defeats the Empire.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-luke-skywalker-jedi-star-wars-character.png',
                'stats_json': [{'force': 95}, {'lightsaber': 92}],
                'details_json': {'universe': 'Star Wars', 'species': 'Human'}
            },
            {
                'name': 'Katniss Everdeen',
                'alias': 'The Mockingjay',
                'category': cat_map['community-vault'],
                'archetype': 'Rebel',
                'origin': 'The Hunger Games',
                'faction': 'District 12',
                'tagline': 'If we burn, you burn with us.',
                'biography': 'A skilled archer who becomes the symbol of rebellion against an oppressive regime.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-katniss-everdeen-mockingjay-hunger-games-archer-character.png',
                'stats_json': [{'archery': 98}, {'survival': 95}],
                'details_json': {'universe': 'The Hunger Games', 'species': 'Human'}
            },
            {
                'name': 'Eowyn',
                'alias': 'The Last Rider of Rohan',
                'category': cat_map['community-vault'],
                'archetype': 'Warrior',
                'origin': 'The Lord of the Rings',
                'faction': 'Rohan',
                'tagline': 'A day may come when the courage of men fails.',
                'biography': 'A shield maiden of Rohan who disguises herself as a male warrior to fight in battle.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-eowyn-shield-maiden-lord-of-the-rings-warrior.png',
                'stats_json': [{'courage': 96}, {'swordsmanship': 90}],
                'details_json': {'universe': 'The Lord of the Rings', 'species': 'Human'}
            },
            {
                'name': 'Gollum',
                'alias': 'Sméagol',
                'category': cat_map['community-vault'],
                'archetype': 'Creature',
                'origin': 'The Lord of the Rings',
                'faction': 'None',
                'tagline': 'My precious.',
                'biography': 'A corrupted creature obsessed with the One Ring, torn between good and evil.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-gollum-smeagol-lord-of-the-rings-creature.png',
                'stats_json': [{'stealth': 95}, {'corruption': 100}],
                'details_json': {'universe': 'The Lord of the Rings', 'species': 'Creature'}
            },
            {
                'name': 'Legolas',
                'alias': 'The Elf Archer',
                'category': cat_map['community-vault'],
                'archetype': 'Archer',
                'origin': 'The Lord of the Rings',
                'faction': 'Fellowship',
                'tagline': 'And my bow!',
                'biography': 'An elf archer from Mirkwood known for his archery skills and grace in battle.',
                'image_url': 'https://e7.pngegg.com/pngimages/625/814/png-clipart-legolas-elf-archer-lord-of-the-rings-mirkwood.png',
                'stats_json': [{'archery': 98}, {'agility': 96}],
                'details_json': {'universe': 'The Lord of the Rings', 'species': 'Elf'}
            },
        ]
        
        
        
        for char_data in characters_data:
            slug = slugify(char_data['name'])
            CharacterProfile.objects.update_or_create(
                slug=slug,
                defaults=char_data
            )
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(characters_data)} characters."))

        # 5. Merchandise Items
        merch_data = [
            {
                'name': 'EVA-01 Berserk Mode 1/4 Scale Statue',
                'slug': 'merch-eva',
                'category': cat_map['anime'],
                'tag': MerchandiseItem.Tag.LIMITED_EDITION,
                'is_upcoming': True,
                'drop_date_text': 'Oct 15, 2026 • 12:00 PM EST',
                'msrp': '$340 MSRP (Preview)',
                'manufacturer': 'Prime 1 Studio x Khara',
                'image_url': 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
                'description': 'Cold-cast porcelain polystone statue featuring LED fluorescent blood splatter, swappable roaring head sculpt, and display base.',
                'view_count': 3820,
                'popularity_score': 5.0,
            },
            {
                'name': 'Shadow of the Erdtree 4xLP Boxset Vinyl',
                'slug': 'merch-elden',
                'category': cat_map['gaming'],
                'tag': MerchandiseItem.Tag.PRE_ORDER,
                'is_upcoming': True,
                'drop_date_text': 'Nov 02, 2026 • 09:00 AM PST',
                'msrp': '$110 MSRP (Preview)',
                'manufacturer': 'Bandai Namco Music Live',
                'image_url': 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
                'description': 'Pressed on 180g gold splatter virgin wax with deluxe gold foil gatefold jacket and 40-page liner notes artbook.',
                'view_count': 2410,
                'popularity_score': 5.0,
            },
            {
                'name': 'Spider-Gwen Multiverse Neon Bomber Jacket',
                'slug': 'merch-gwen',
                'category': cat_map['cosplay'],
                'tag': MerchandiseItem.Tag.OFFICIAL_LICENSED,
                'is_upcoming': False,
                'drop_date_text': 'Dec 05, 2026 • Batch 2 Restock',
                'msrp': '$165 MSRP (Preview)',
                'manufacturer': 'Marvel HeroWear Labs',
                'image_url': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
                'description': 'High-density weatherproof satin bomber with screen-accurate web lining, hidden pocket for con badges, and reactive neon piping.',
                'view_count': 1940,
                'popularity_score': 4.98,
            }
        ]

        merch_expansion = [
            {'name': 'Chainsaw Man Reze Movie 4DX Light Up Standee', 'slug': 'merch-reze-standee', 'category': cat_map['anime'], 'tag': MerchandiseItem.Tag.COLLECTIBLE, 'is_upcoming': False, 'drop_date_text': 'Oct 05, 2026 • Retail Now', 'msrp': '$45 MSRP (Preview)', 'manufacturer': 'Mappa Store', 'image_url': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', 'description': 'Double-sided acrylic standee with LED edge lighting and layered photocard set.', 'view_count': 1560, 'popularity_score': 4.72},
            {'name': 'Jujutsu Kaisen Unlimited Void Hoodie', 'slug': 'merch-jjk-hoodie', 'category': cat_map['anime'], 'tag': MerchandiseItem.Tag.OFFICIAL_LICENSED, 'is_upcoming': True, 'drop_date_text': 'Nov 21, 2026 • 10:00 AM JST', 'msrp': '$85 MSRP (Preview)', 'manufacturer': 'MAPPAx Shueisha', 'image_url': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80', 'description': 'Heavyweight 400gsm hoodie with infinity-barrier sleeve print and woven hem patch.', 'view_count': 1290, 'popularity_score': 4.61},
            {'name': 'Nightreign Tarnished Warrior Figma', 'slug': 'merch-nightreign-figma', 'category': cat_map['gaming'], 'tag': MerchandiseItem.Tag.PRE_ORDER, 'is_upcoming': True, 'drop_date_text': 'Dec 12, 2026 • 08:00 PM EST', 'msrp': '$135 MSRP (Preview)', 'manufacturer': 'Bandai Spirits', 'image_url': 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80', 'description': 'Posable figma with soft goods cape, golden order chain, and translucent Erdtree effect part.', 'view_count': 1180, 'popularity_score': 4.58},
            {'name': 'Cyberpunk 2077 Edgerunner Bomber Jacket', 'slug': 'merch-edgerunner-jacket', 'category': cat_map['gaming'], 'tag': MerchandiseItem.Tag.OFFICIAL_LICENSED, 'is_upcoming': False, 'drop_date_text': 'Sep 18, 2026 • Retail Now', 'msrp': '$180 MSRP (Preview)', 'manufacturer': 'CD PROJEKT RED Store', 'image_url': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80', 'description': 'Weatherproof bomber with reflective Night City skyline lining and embroidered edgerunner crest.', 'view_count': 980, 'popularity_score': 4.49},
            {'name': 'Dune Messiah Atreides Desert Set', 'slug': 'merch-dune-set', 'category': cat_map['movies-tv'], 'tag': MerchandiseItem.Tag.LIMITED_EDITION, 'is_upcoming': True, 'drop_date_text': 'Dec 18, 2026 • 12:00 PM EST', 'msrp': '$120 MSRP (Preview)', 'manufacturer': 'Warner Bros. Collector', 'image_url': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', 'description': 'Stillu suit replica prop, Atreides crest pin, and desert-issue journal in a numbered display case.', 'view_count': 1420, 'popularity_score': 4.67},
            {'name': 'Spider-Verse Miles Momentum Tee', 'slug': 'merch-miles-tee', 'category': cat_map['movies-tv'], 'tag': MerchandiseItem.Tag.OFFICIAL_LICENSED, 'is_upcoming': False, 'drop_date_text': 'Oct 01, 2026 • Retail Now', 'msrp': '$35 MSRP (Preview)', 'manufacturer': 'Marvel HeroWear Labs', 'image_url': 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80', 'description': 'Soft cotton tee with chromatic glitch print and glow-in-the-dust shoulder graphic.', 'view_count': 870, 'popularity_score': 4.42},
            {'name': 'Blade Runner 2049 Jacket Replica', 'slug': 'merch-blade-runner-jacket', 'category': cat_map['movies-tv'], 'tag': MerchandiseItem.Tag.LIMITED_EDITION, 'is_upcoming': True, 'drop_date_text': 'Jan 09, 2027 • 09:00 AM PST', 'msrp': '$420 MSRP (Preview)', 'manufacturer': 'Alcon Industries Archive', 'image_url': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', 'description': 'Weather-worn decommissioned officer coat with frayed collar, badge, and archival certificate.', 'view_count': 760, 'popularity_score': 4.36},
            {'name': 'Aespa Supernova Lightstick 2.0', 'slug': 'merch-supernova-lightstick', 'category': cat_map['kpop'], 'tag': MerchandiseItem.Tag.PRE_ORDER, 'is_upcoming': True, 'drop_date_text': 'Oct 10, 2026 • 06:00 PM KST', 'msrp': '$95 MSRP (Preview)', 'manufacturer': 'SM Entertainment Official', 'image_url': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80', 'description': 'Bluetooth-synced lightstick with motion reactive halo, photocards, and concert lanyard.', 'view_count': 1680, 'popularity_score': 4.74},
            {'name': 'NewJeans HYBE Vault Photocard Set', 'slug': 'merch-newjeans-vault', 'category': cat_map['kpop'], 'tag': MerchandiseItem.Tag.COLLECTIBLE, 'is_upcoming': False, 'drop_date_text': 'Sep 22, 2026 • Retail Now', 'msrp': '$28 MSRP (Preview)', 'manufacturer': 'ADOR Global Store', 'image_url': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80', 'description': 'Sealed first-gen photocard vault with holographic inserts and numbered collector sleeve.', 'view_count': 1040, 'popularity_score': 4.45},
            {'name': 'Stray Kids SKZOOZ 2xLP Vinyl', 'slug': 'merch-skz-vinyl', 'category': cat_map['kpop'], 'tag': MerchandiseItem.Tag.LIMITED_EDITION, 'is_upcoming': True, 'drop_date_text': 'Nov 14, 2026 • 07:00 PM KST', 'msrp': '$58 MSRP (Preview)', 'manufacturer': 'JYP Entertainment', 'image_url': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80', 'description': 'Neon press 2xLP with poster insert, tracklist lithograph, and numbered jacket variant.', 'view_count': 890, 'popularity_score': 4.4},
            {'name': 'X-Men From the Ashes #1 Variant Cover', 'slug': 'merch-x-men-ashes-variant', 'category': cat_map['comics'], 'tag': MerchandiseItem.Tag.COLLECTIBLE, 'is_upcoming': True, 'drop_date_text': 'Oct 08, 2026 • 10:00 AM ET', 'msrp': '$6 MSRP (Preview)', 'manufacturer': 'Marvel Comics Direct', 'image_url': 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=600&q=80', 'description': 'JSA 1:25 foil variant in a bagged and boarded protective sleeve for grading.', 'view_count': 1130, 'popularity_score': 4.52},
            {'name': 'Spawn Compendium Reprint Slipcase', 'slug': 'merch-spawn-compendium', 'category': cat_map['comics'], 'tag': MerchandiseItem.Tag.LIMITED_EDITION, 'is_upcoming': False, 'drop_date_text': 'Sep 30, 2026 • Retail Now', 'msrp': '$180 MSRP (Preview)', 'manufacturer': 'Image Comics', 'image_url': 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=600&q=80', 'description': 'Die-cut slipcase reprint with metallic chain wrap, cape bookmark, and foil spine.', 'view_count': 720, 'popularity_score': 4.31},
            {'name': 'DC Absolute Universe Poster Set', 'slug': 'merch-absolute-posters', 'category': cat_map['comics'], 'tag': MerchandiseItem.Tag.COLLECTIBLE, 'is_upcoming': True, 'drop_date_text': 'Dec 01, 2026 • 12:00 PM ET', 'msrp': '$30 MSRP (Preview)', 'manufacturer': 'DC Direct', 'image_url': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', 'description': 'Three 18x24 inch archival matte posters with UV-coated color and collector tube.', 'view_count': 640, 'popularity_score': 4.28},
            {'name': 'Berserk Golden Age Vinyl Boxset', 'slug': 'merch-berserk-vinyl', 'category': cat_map['manga'], 'tag': MerchandiseItem.Tag.LIMITED_EDITION, 'is_upcoming': True, 'drop_date_text': 'Nov 28, 2026 • 12:00 PM JST', 'msrp': '$320 MSRP (Preview)', 'manufacturer': 'Kentaro Miura Archive', 'image_url': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', 'description': 'Deluxe cloth-bound slipcase with facsimile art pages, 5LP soundtrack, and Beherit print.', 'view_count': 1510, 'popularity_score': 4.69},
            {'name': 'One Piece Wano Map T-Shirt', 'slug': 'merch-wano-map-tee', 'category': cat_map['manga'], 'tag': MerchandiseItem.Tag.OFFICIAL_LICENSED, 'is_upcoming': False, 'drop_date_text': 'Sep 12, 2026 • Retail Now', 'msrp': '$32 MSRP (Preview)', 'manufacturer': 'Toei Animation Store', 'image_url': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80', 'description': 'Garment-dyed tee with double-sided Wano map, straw hat rope print, and stitched hem.', 'view_count': 830, 'popularity_score': 4.38},
            {'name': 'Vagabond Masterpiece Print Folio', 'slug': 'merch-vagabond-folio', 'category': cat_map['manga'], 'tag': MerchandiseItem.Tag.COLLECTIBLE, 'is_upcoming': True, 'drop_date_text': 'Dec 20, 2026 • 09:00 AM JST', 'msrp': '$95 MSRP (Preview)', 'manufacturer': 'Kodansha USA', 'image_url': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80', 'description': 'Giclée reproduction folios of 12 ink-wash spreads in a museum-grade portfolio.', 'view_count': 590, 'popularity_score': 4.24},
            {'name': 'EVA-01 High-Density EVA Armor Pattern', 'slug': 'merch-eva-pattern', 'category': cat_map['cosplay'], 'tag': MerchandiseItem.Tag.COLLECTIBLE, 'is_upcoming': True, 'drop_date_text': 'Oct 30, 2026 • 12:00 PM EST', 'msrp': '$24 MSRP (Preview)', 'manufacturer': 'Foam Armory', 'image_url': 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80', 'description': 'Printable foam armor templates, heat-form guides, and LED harness schematics.', 'view_count': 1210, 'popularity_score': 4.55},
            {'name': 'Sephiroth Masamune Prop Blade Kit', 'slug': 'merch-masamune-kit', 'category': cat_map['cosplay'], 'tag': MerchandiseItem.Tag.PRE_ORDER, 'is_upcoming': True, 'drop_date_text': 'Nov 07, 2026 • 10:00 AM JST', 'msrp': '$149 MSRP (Preview)', 'manufacturer': 'Nibelung Forge', 'image_url': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', 'description': 'Carbon-fiber blade replica kit with LED mako core, leather wrap, and safe display stand.', 'view_count': 940, 'popularity_score': 4.48},
            {'name': 'Multiverse Paradox Zine + Poster', 'slug': 'merch-multiverse-zine', 'category': cat_map['community-vault'], 'tag': MerchandiseItem.Tag.COLLECTIBLE, 'is_upcoming': True, 'drop_date_text': 'Oct 18, 2026 • 03:00 PM ET', 'msrp': '$18 MSRP (Preview)', 'manufacturer': 'Fan Hub Vault Press', 'image_url': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80', 'description': 'Risograph zine and foil poster exploring canon continuity, curated by the moderators.', 'view_count': 780, 'popularity_score': 4.33},
            {'name': 'Verified Contributor Field Journal', 'slug': 'merch-field-journal', 'category': cat_map['community-vault'], 'tag': MerchandiseItem.Tag.OFFICIAL_LICENSED, 'is_upcoming': False, 'drop_date_text': 'Sep 09, 2026 • Retail Now', 'msrp': '$22 MSRP (Preview)', 'manufacturer': 'Fan Hub Vault Press', 'image_url': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', 'description': 'Linen-bound dot-grid journal with citation dividers and verified contributor stamp.', 'view_count': 660, 'popularity_score': 4.27},
            {'name': 'Lore Historian Desk Mat XL', 'slug': 'merch-lore-deskmat', 'category': cat_map['community-vault'], 'tag': MerchandiseItem.Tag.COLLECTIBLE, 'is_upcoming': True, 'drop_date_text': 'Dec 05, 2026 • 12:00 PM ET', 'msrp': '$40 MSRP (Preview)', 'manufacturer': 'Fan Hub Vault Press', 'image_url': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80', 'description': 'Oversized stitched-edge desk mat with multiverse timeline map and UV ink accents.', 'view_count': 520, 'popularity_score': 4.2},
        ]

        for m_data in merch_data + merch_expansion:
            MerchandiseItem.objects.update_or_create(
                slug=m_data['slug'],
                defaults=m_data
            )
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(merch_data) + len(merch_expansion)} merchandise items."))

        # 6. Events & Conventions
        events_data = [
            {
                'title': 'Comiket 106 Summer Fan Showcase',
                'slug': 'event-tokyo',
                'city': 'Tokyo',
                'venue_name': 'Tokyo Big Sight, Odaiba',
                'category': cat_map['anime'],
                'start_date': date(2026, 8, 14),
                'end_date': date(2026, 8, 16),
                'date_month': 'AUG',
                'date_day': '14-16',
                'year': '2026',
                'latitude': 35.6300,
                'longitude': 139.7930,
                'map_x': 78.0,
                'map_y': 35.0,
                'ticket_url': 'https://tickets.comiket.co.jp',
                'attendees_info': '160,000+ Expected',
                'status': 'Official Schedule Vetted',
                'description': 'The premier global dojinshi and anime exhibition bringing together indie artists, official studios, and massive cosplay gatherings.',
            },
            {
                'title': 'Anime Expo & Gaming Summit 2026',
                'slug': 'event-la-anime',
                'city': 'Los Angeles',
                'venue_name': 'Los Angeles Convention Center, CA',
                'category': cat_map['gaming'],
                'start_date': date(2026, 7, 2),
                'end_date': date(2026, 7, 5),
                'date_month': 'JUL',
                'date_day': '02-05',
                'year': '2026',
                'latitude': 34.0407,
                'longitude': -118.2699,
                'map_x': 20.0,
                'map_y': 38.0,
                'ticket_url': 'https://anime-expo.org/registration',
                'attendees_info': '115,000+ Expected',
                'status': 'Badge Registration Active',
                'description': 'North America’s largest celebration of Japanese pop culture, featuring premier world trailer reveals, voice actor panels, and gaming tournaments.',
            },
            {
                'title': 'MCM Comic Con & World Cosplay Stage',
                'slug': 'event-london',
                'city': 'London',
                'venue_name': 'ExCeL London, Royal Victoria Dock',
                'category': cat_map['comics'],
                'start_date': date(2026, 10, 24),
                'end_date': date(2026, 10, 26),
                'date_month': 'OCT',
                'date_day': '24-26',
                'year': '2026',
                'latitude': 51.5074,
                'longitude': 0.0278,
                'map_x': 48.0,
                'map_y': 26.0,
                'ticket_url': 'https://mcmcomiccon.com/london',
                'attendees_info': '85,000+ Expected',
                'status': 'Cosplay Championship Finals',
                'description': 'The UK’s biggest pop culture con with international guest stars, gaming zones, comics artists alley, and the European Cosplay Championship.',
            },
            {
                'title': 'Naija Pop-Con & Afro-Anime Fiesta',
                'slug': 'event-lagos',
                'city': 'Lagos',
                'venue_name': 'Landmark Centre, Victoria Island, Lagos',
                'category': cat_map['anime'],
                'start_date': date(2026, 11, 18),
                'end_date': date(2026, 11, 20),
                'date_month': 'NOV',
                'date_day': '18-20',
                'year': '2026',
                'latitude': 6.4281,
                'longitude': 3.4219,
                'map_x': 49.0,
                'map_y': 55.0,
                'ticket_url': 'https://naijapopcon.ng/tickets',
                'attendees_info': '25,000+ Expected',
                'status': 'Community Stage Open',
                'description': 'West Africa’s fastest-growing fandom festival with Afrobeats/K-Pop dance dance-offs, indigenous comic launches, and anime LAN arenas.',
            },
            {
                'title': 'K-Wave Mega Fest & Lightspeed Arena',
                'slug': 'event-la-kpop',
                'city': 'Los Angeles',
                'venue_name': 'Crypto.com Arena, Los Angeles',
                'category': cat_map['kpop'],
                'start_date': date(2026, 12, 10),
                'end_date': date(2026, 12, 12),
                'date_month': 'DEC',
                'date_day': '10-12',
                'year': '2026',
                'latitude': 34.0430,
                'longitude': -118.2673,
                'map_x': 22.0,
                'map_y': 40.0,
                'ticket_url': 'https://k-wavefest.com',
                'attendees_info': '40,000+ Expected',
                'status': 'Lineup Dropping Soon',
                'description': '3 days of 4th & 5th gen K-Pop idol stages, random dance workshops, lightstick sync demonstrations, and official photocard trading vaults.',
            }
        ]

        for e_data in events_data:
            Event.objects.update_or_create(
                slug=e_data['slug'],
                defaults=e_data
            )
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(events_data)} events."))

        # 7. Chatbot FAQs
        faq_data = [
            {
                'question': 'Recommend me an anime like Attack on Titan',
                'answer': (
                    "If you love the high-stakes political intrigue, brutal survival themes, and philosophical mystery of Attack on Titan, check out these top 3 recommendations:\n\n"
                    "1. **86 (Eighty-Six)**: Heavy tactical drone warfare with devastating emotional stakes and military bureaucracy.\n"
                    "2. **Vinland Saga**: Gritty medieval realism tracing revenge, destiny, and the hollow nature of violence.\n"
                    "3. **Claymore**: Dark fantasy warriors wielding titanic blades against shape-shifting bio-horrors.\n\n"
                    "All three are currently cataloged in the Anime Universe directory with spoiler-free episode guides!"
                ),
                'universe_name': 'Anime',
                'badge': 'Anime Lore • Curated',
                'tags': ['anime', 'attack on titan', 'titan', 'recommendation', 'shingeki', '86', 'vinland'],
                'category': cat_map['anime'],
            },
            {
                'question': 'Where do I start reading X-Men comics?',
                'answer': (
                    "The X-Men multiverse can be daunting, but here are the three cleanest modern jumping-on points:\n\n"
                    "1. **House of X / Powers of X (2019 by Jonathan Hickman)**: The absolute definitive modern reinvention. Establishes the mutant sovereign nation of Krakoa.\n"
                    "2. **X-Men: From the Ashes (2024–2026 Relinquish Run)**: The current ongoing era dealing with the aftermath of Krakoa.\n"
                    "3. **Astonishing X-Men (Joss Whedon & John Cassaday)**: Self-contained, accessible 24-issue run with classic team dynamics.\n\n"
                    "Check our Comics Universe Reading Matrix for issue-by-issue checklists!"
                ),
                'universe_name': 'Comics',
                'badge': 'Comics Timeline • Verified',
                'tags': ['comics', 'x-men', 'xmen', 'reading order', 'marvel', 'krakoa', 'hickman'],
                'category': cat_map['comics'],
            },
            {
                'question': 'Upcoming gaming conventions in Q4',
                'answer': (
                    "Here is your curated Q4 Gaming & Pop-Culture schedule:\n\n"
                    "• **MCM Comic Con London**: Oct 24-26 (ExCeL London) — features the European Esports Arena and Indie Game Showcase.\n"
                    "• **Naija Pop-Con Lagos**: Nov 18-20 (Landmark Centre) — Afrogaming LAN and Fighting Game Community tournaments.\n"
                    "• **Tokyo Game Fest Winter Preview**: Dec 04-06 (Makuhari Messe) — next-gen handheld and VR hardware hands-on.\n\n"
                    "You can click 'Add to Calendar' on any event in the Convention Radar section to generate an instant .ics invite!"
                ),
                'universe_name': 'Gaming',
                'badge': 'Event Radar • Q4 2026',
                'tags': ['conventions', 'gaming', 'q4', 'schedule', 'events', 'mcm', 'naija', 'radar'],
                'category': cat_map['gaming'],
            }
        ]

        for f_data in faq_data:
            ChatbotFAQ.objects.update_or_create(
                question=f_data['question'],
                defaults=f_data
            )
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(faq_data)} chatbot FAQs."))

        # 8. Seed initial Bookmarks with Personal Notes, User Activities, Fan Submissions, Feedback & Chatbot Queries
        from interactions.models import Bookmark, ContentRating, FanSubmission, Feedback, UserActivity
        from chatbot.models import ChatbotQuery

        member_profile.bio = 'Collector of 1/4 scale mecha statues, Night City lore archivist, and Shonen simulcast tracker.'
        member_profile.avatar = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80'
        member_profile.save()

        edgerunners_content = Content.objects.filter(slug='cyberpunk-edgerunners').first()
        multiverse_article = Content.objects.filter(slug='multiverse-paradox-essay').first()
        if edgerunners_content:
            Bookmark.objects.update_or_create(
                user=member_user,
                content=edgerunners_content,
                defaults={
                    'external_id': 'cyberpunk-edgerunners',
                    'item_title': edgerunners_content.title,
                    'item_type': Bookmark.ItemType.VIDEO,
                    'category_name': 'Anime',
                    'thumbnail_url': edgerunners_content.thumbnail_url,
                    'note': 'Rewatch frame-by-frame for Sandevistan color grading breakdown at 01:42.',
                }
            )
            ContentRating.objects.update_or_create(
                user=member_user,
                content=edgerunners_content,
                defaults={'score': 5}
            )
        if multiverse_article:
            Bookmark.objects.update_or_create(
                user=member_user,
                content=multiverse_article,
                defaults={
                    'external_id': 'multiverse-paradox-essay',
                    'item_title': multiverse_article.title,
                    'item_type': Bookmark.ItemType.ARTICLE,
                    'category_name': 'Community Vault',
                    'thumbnail_url': multiverse_article.thumbnail_url,
                    'note': 'Reference Section 3 for my upcoming Secret Wars timeline diagram.',
                }
            )

        # Bookmark for Character Profile & Merchandise Item
        # if not Bookmark.objects.filter(user=member_user, external_id='ryuto-kazama').exists():
        #     Bookmark.objects.create(
        #         user=member_user,
        #         content=None,
        #         external_id='ryuto-kazama',
        #         item_title='Ryuto Kazama',
        #         item_type=Bookmark.ItemType.CHARACTER,
        #         category_name='Anime',
        #         thumbnail_url='https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
        #         note='Cosplay build reference: need 5mm high-density EVA foam for the dual thunder spears.'
        #     )
        if not Bookmark.objects.filter(user=member_user, external_id='merch-eva').exists():
            Bookmark.objects.create(
                user=member_user,
                content=None,
                external_id='merch-eva',
                item_title='EVA-01 Berserk Mode 1/4 Scale Statue',
                item_type=Bookmark.ItemType.MERCHANDISE,
                category_name='Anime',
                thumbnail_url='https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
                note='Pre-order opens Oct 15 at 12:00 PM EST — set alarm 30 mins early!'
            )

        # Fan Submissions for Moderation Queue
        submissions_seed = [
            {
                'title': 'Neon Genesis Evangelion: The Instrumentality Timeline Paradox',
                'category': cat_map['anime'],
                'body': 'An exhaustive comparison between the original End of Evangelion theatrical release and the Rebuild 3.0+1.0 Thrice Upon a Time meta-narrative loop.',
                'status': FanSubmission.Status.PENDING,
            },
            {
                'title': 'Elden Ring: Shadow of the Erdtree Miquella Motive Analysis',
                'category': cat_map['gaming'],
                'body': 'Tracing Miquella the Kind’s footsteps across the Land of Shadow, examining item descriptions from the Haligtree to Enir-Ilim.',
                'status': FanSubmission.Status.PENDING,
            },
            {
                'title': 'Spider-Man 2099 Monowire Prop 3D Build Log',
                'category': cat_map['cosplay'],
                'body': 'Step-by-step guide to printing translucent red PETG arm talons with embedded addressable COB LED strips.',
                'status': FanSubmission.Status.APPROVED,
                'admin_feedback': 'Excellent crafting detail and clear wiring schematic. Published to Vault!',
            },
        ]
        for s_data in submissions_seed:
            FanSubmission.objects.update_or_create(
                title=s_data['title'],
                defaults={'user': member_user, **s_data}
            )

        # User Feedback Tickets (Bugs, Suggestions, Inquiries)
        feedback_seed = [
            {
                'email': 'fan@fanhub.com',
                'name': 'cyber_otaku',
                'feedback_type': Feedback.FeedbackType.BUG,
                'subject': '4K Trailer Player Fullscreen Shortcut on Safari',
                'message': 'Pressing F while focused on the volume slider does not trigger fullscreen mode on macOS Safari 18.',
                'status': Feedback.Status.IN_REVIEW,
            },
            {
                'email': 'cosplay.queen@fanhub.com',
                'name': 'LyraBuilder',
                'feedback_type': Feedback.FeedbackType.SUGGESTION,
                'subject': 'Add STL 3D Print File Attachment Support to Cosplay Guides',
                'message': 'Would love to attach downloadable .stl pattern links directly inside verified cosplay build articles!',
                'status': Feedback.Status.NEW,
            },
            {
                'email': 'seoul.beats@fanhub.com',
                'name': 'KWave_Stan',
                'feedback_type': Feedback.FeedbackType.INQUIRY,
                'subject': 'K-Wave Mega Fest Los Angeles Badge Pickup Hours',
                'message': 'Are VIP lightstick sync wristbands distributed at the Crypto.com Arena box office on Day 0?',
                'status': Feedback.Status.RESOLVED,
            },
        ]
        for fb_data in feedback_seed:
            Feedback.objects.update_or_create(
                subject=fb_data['subject'],
                defaults={'user': member_user, **fb_data}
            )

        # User Activity Stream Seed
        if UserActivity.objects.filter(user=member_user).count() == 0:
            sample_activities = [
                {
                    'action_type': UserActivity.ActionType.VIEW,
                    'target_type': 'CHARACTER',
                    'target_id': 'ryuto-kazama',
                    'target_title': 'Ryuto Kazama (Titan Slayer)',
                    'category_name': 'Anime',
                    'detail': 'Inspected Character Lore Dossier & Battle Telemetry',
                },
                {
                    'action_type': UserActivity.ActionType.BOOKMARK,
                    'target_type': 'MERCHANDISE',
                    'target_id': 'merch-eva',
                    'target_title': 'EVA-01 Berserk Mode 1/4 Scale Statue',
                    'category_name': 'Anime',
                    'detail': 'Saved to Vault with personal pre-order reminder note',
                },
                {
                    'action_type': UserActivity.ActionType.RATING,
                    'target_type': 'VIDEO',
                    'target_id': 'cyberpunk-edgerunners',
                    'target_title': 'Cyberpunk: Edgerunners - Official Teaser',
                    'category_name': 'Anime',
                    'detail': 'Rated 5/5 stars in Audiovisual Vault',
                },
                {
                    'action_type': UserActivity.ActionType.FILTER,
                    'target_type': 'CATEGORY',
                    'target_id': 'gaming',
                    'target_title': 'Gaming Universe Directory',
                    'category_name': 'Gaming',
                    'detail': 'Explored Elden Ring: Nightreign & Patch 14.2 lore threads',
                },
            ]
            for act_data in sample_activities:
                UserActivity.objects.create(user=member_user, **act_data)

        # Chatbot Query Audit Seed
        if ChatbotQuery.objects.count() == 0:
            first_faq = ChatbotFAQ.objects.first()
            ChatbotQuery.objects.create(
                user=member_user,
                session_id='seed-sess-01',
                message='Recommend me an anime like Attack on Titan',
                response=first_faq.answer if first_faq else 'Check out 86, Vinland Saga, and Claymore!',
                matched_faq=first_faq,
                latency_ms=11.4,
            )
            ChatbotQuery.objects.create(
                user=member_user,
                session_id='seed-sess-02',
                message='What is the chronological order for Rebuild of Evangelion?',
                response='Start with Evangelion: 1.0 You Are (Not) Alone, followed by 2.0, 3.0, and 3.0+1.0 Thrice Upon a Time.',
                matched_faq=None,
                latency_ms=28.7,
            )

        self.stdout.write(self.style.SUCCESS("All Fan Hub Plus fixtures successfully seeded!"))

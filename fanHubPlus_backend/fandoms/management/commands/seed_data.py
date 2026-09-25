# fandoms/management/commands/seed_data.py

from datetime import date
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from fandoms.models import Category, Content, CharacterProfile, StreamMedia
from merchandise.models import MerchandiseItem
from events.models import Event
from chatbot.models import ChatbotFAQ
from accounts.models import Profile

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
                'title': 'Supernova (Anthem Mix)',
                'slug': 'kpop-supernova',
                'category': cat_map['kpop'],
                'content_type': Content.ContentType.AUDIO,
                'media_url': 'https://soundcloud.com/stream/supernova',
                'thumbnail_url': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
                'synopsis': 'Hyperpop basslines collide with celestial harmonies in this official comeback title track.',
                'body_text': 'Armageddon The 1st Album title cut remastered for high-fidelity spatial audio systems.',
                'artist_or_author': 'Aespa',
                'duration': '03:12',
                'duration_seconds': 192,
                'release_year': '2026 Comeback',
                'popularity_score': 4.7,
                'view_count': 14800,
            },
            {
                'title': 'The Golden Order Suite',
                'slug': 'elden-symphony',
                'category': cat_map['gaming'],
                'content_type': Content.ContentType.AUDIO,
                'media_url': 'https://soundcloud.com/stream/elden-symphony',
                'thumbnail_url': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
                'synopsis': 'Orchestral live recording featuring church bells, dark brass, and gothic choir arrangements.',
                'body_text': 'Shadow of the Erdtree original soundtrack composed by Yuka Kitamura & Tsukasa Saitoh.',
                'artist_or_author': 'FromSoftware Symphony Orchestra',
                'duration': '04:45',
                'duration_seconds': 285,
                'release_year': '2026 OST',
                'popularity_score': 4.95,
                'view_count': 22300,
            },
            {
                'title': 'The Multiverse Paradox: Canon Continuity Deconstruction',
                'slug': 'multiverse-paradox-essay',
                'category': cat_map['community-vault'],
                'content_type': Content.ContentType.ARTICLE,
                'media_url': None,
                'thumbnail_url': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
                'synopsis': 'An in-depth critical breakdown of how divergent branching timelines affect character stakes in modern franchise lore.',
                'body_text': 'When storytelling embraces infinite parallel realities, the permanence of consequence is inevitably placed under scrutiny...',
                'artist_or_author': 'Fan Creator: cyber_otaku',
                'duration': '8 min read',
                'duration_seconds': 480,
                'release_year': '2026 Archive',
                'popularity_score': 4.6,
                'view_count': 9200,
            }
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
                'title': 'Supernova (Anthem Mix)',
                'slug': 'kpop-supernova',
                'stream_type': StreamMedia.StreamType.AUDIO,
                'category': cat_map['kpop'],
                'universe_label': 'K-Pop',
                'accent_color': '#F43F5E',
                'duration': '03:12',
                'duration_seconds': 192,
                'release_year': '2026 Comeback',
                'artist': 'Aespa • K-Pop Universe',
                'album': 'Armageddon The 1st Album',
                'media_url': 'https://soundcloud.com/stream/supernova',
                'thumbnail_url': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
                'synopsis': 'Hyperpop basslines collide with celestial harmonies in this official comeback title track.',
                'likes_label': '14.8k',
                'likes_count': 14800,
                'rating': 4.7,
                'display_order': 1,
                'is_active': True,
            },
            {
                'title': 'The Golden Order Suite',
                'slug': 'elden-symphony',
                'stream_type': StreamMedia.StreamType.AUDIO,
                'category': cat_map['gaming'],
                'universe_label': 'Gaming',
                'accent_color': '#FACC15',
                'duration': '04:45',
                'duration_seconds': 285,
                'release_year': '2026 OST',
                'artist': 'FromSoftware Symphony Orchestra',
                'album': 'Shadow of the Erdtree OST',
                'media_url': 'https://soundcloud.com/stream/elden-symphony',
                'thumbnail_url': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
                'synopsis': 'Orchestral live recording featuring church bells, dark brass, and gothic choir arrangements.',
                'likes_label': '22.3k',
                'likes_count': 22300,
                'rating': 4.95,
                'display_order': 2,
                'is_active': True,
            },
            {
                'title': 'Horizon of Shiganshina (Opening Theme)',
                'slug': 'anime-horizon',
                'stream_type': StreamMedia.StreamType.AUDIO,
                'category': cat_map['anime'],
                'universe_label': 'Anime',
                'accent_color': '#A3E635',
                'duration': '01:30',
                'duration_seconds': 90,
                'release_year': '2026 Simulcast',
                'artist': 'Linked Horizon Tribute',
                'album': 'Anime Simulcast Vol. 4',
                'media_url': 'https://soundcloud.com/stream/crimson-horizon',
                'thumbnail_url': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
                'synopsis': 'High-energy orchestral rock opening theme from the Spring 2026 simulcast lineup.',
                'likes_label': '19.1k',
                'likes_count': 19100,
                'rating': 4.85,
                'display_order': 3,
                'is_active': True,
            },
        ]

        for sm_data in stream_media_items:
            StreamMedia.objects.update_or_create(
                slug=sm_data['slug'],
                defaults=sm_data
            )
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(stream_media_items)} Stream & Discover media items."))

        # 4. Character Profiles
        characters_data = [
            {
                'name': 'Ryuto Kazama',
                'slug': 'ryuto-kazama',
                'alias': 'Titan Slayer',
                'category': cat_map['anime'],
                'archetype': 'Anime Protagonist',
                'origin': 'Scout Regiment Neo • District Shiganshina 2.0',
                'faction': 'Survey Scout Vanguard Neo',
                'tagline': '“The wall wasn’t built to keep the titans in. It was built to protect them from us.”',
                'image_url': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
                'stats_json': [
                    {'label': 'Agility', 'value': 94, 'max': 100},
                    {'label': 'Power', 'value': 88, 'max': 100},
                    {'label': 'Strategic IQ', 'value': 92, 'max': 100},
                ],
                'details_json': {
                    'firstAppearance': 'Ch. 01 "Awakening of the Bloodline"',
                    'weapon': 'Dual Thunder Spears & Carbon Blade Rigs',
                    'nemesis': 'The Colossal Behemoth of Ward 12',
                    'bio': 'Surviving the fall of District 7, Ryuto mastered 3D maneuver gear before turning 16.'
                },
                'biography': 'Surviving the fall of District 7, Ryuto mastered the 3D maneuver gear before turning 16. His specialized reflex reaction matches hyper-velocity kinetic strikes.'
            },
            {
                'name': 'Valkyrie V-09',
                'slug': 'valkyrie-v09',
                'alias': 'Cyber Merc',
                'category': cat_map['gaming'],
                'archetype': 'Gaming Hero',
                'origin': 'Neo-Kyoto Underbelly',
                'faction': 'Afterlife Independent Mercs',
                'tagline': '“When the ICE melts and the sirens cry, my monowire sings the final lullaby.”',
                'image_url': 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
                'stats_json': [
                    {'label': 'Class', 'textValue': 'Vanguard Infiltrator'},
                    {'label': 'Origin', 'textValue': 'Neo-Kyoto Underbelly'},
                    {'label': 'Weapon', 'textValue': 'Dual Plasma Blades'},
                ],
                'details_json': {
                    'firstAppearance': 'Night City Patch 2.2 Cyber-Infiltration',
                    'weapon': 'Thermal Monowire & Arasaka Prototype MK-7',
                    'nemesis': 'Corporate Overlord Saburo-X',
                    'bio': 'Equipped with illegal military-grade Sandevistan neural implants and thermal monowires.'
                },
                'biography': 'Equipped with illegal military-grade Sandevistan neural implants and thermal monowires, V-09 infiltrates mega-corporation data fortresses.'
            },
            {
                'name': 'Shadow Raven',
                'slug': 'shadow-raven',
                'alias': 'The Nocturnal Vigilante',
                'category': cat_map['comics'],
                'archetype': 'Comic Anti-Hero',
                'origin': 'Gotham Prime • Earth-99',
                'faction': 'Midnight Syndicate',
                'tagline': '“Justice is a luxury for the daylight. The dark requires a harsher toll.”',
                'image_url': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
                'stats_json': [
                    {'label': 'Universe', 'textValue': 'Earth-Prime 99'},
                    {'label': 'First Appearance', 'textValue': 'Issue #12 (1998)'},
                    {'label': 'Nemesis', 'textValue': 'Baron Void'},
                ],
                'details_json': {
                    'firstAppearance': 'Shadow Syndicate #12 (Collector Silver Holo)',
                    'weapon': 'Obsidian Batarangs & Dark Energy Cloak',
                    'nemesis': 'Baron Void (Dimensional Conqueror)',
                    'bio': 'Exiled from the High Council of Champions after refusing to compromise.'
                },
                'biography': 'Exiled from the High Council of Champions after refusing to compromise with corrupt lords, Shadow Raven established the Midnight Syndicate.'
            },
            {
                'name': 'Lyra Solaris',
                'slug': 'lyra-solaris',
                'alias': 'Celestial Weaver',
                'category': cat_map['cosplay'],
                'archetype': 'Cosplay & Lore Icon',
                'origin': 'Astral Leyline Nexus',
                'faction': 'Astral Order of Luminaries',
                'tagline': '“The threads of the multiverse weave not by chance, but by deliberate grace.”',
                'image_url': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
                'stats_json': [
                    {'label': 'Affinity', 'textValue': 'Starlight Arcana'},
                    {'label': 'Rank', 'textValue': 'Grand Master'},
                    {'label': 'Relic', 'textValue': 'Prism Staff'},
                ],
                'details_json': {
                    'firstAppearance': 'Arcana Chronicles Vol. 4 "Starlight Symphony"',
                    'weapon': 'Prism Leyline Staff with Luminescent Core',
                    'nemesis': 'Eclipse Harvester Malakor',
                    'bio': 'A favorite of master cosplayers worldwide, Lyra Solaris channels solar plasma.'
                },
                'biography': 'A favorite of master cosplayers worldwide, Lyra Solaris channels solar plasma through custom hand-spun silk armor.'
            }
        ]

        for char_data in characters_data:
            CharacterProfile.objects.update_or_create(
                slug=char_data['slug'],
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
        if not Bookmark.objects.filter(user=member_user, external_id='ryuto-kazama').exists():
            Bookmark.objects.create(
                user=member_user,
                content=None,
                external_id='ryuto-kazama',
                item_title='Ryuto Kazama',
                item_type=Bookmark.ItemType.CHARACTER,
                category_name='Anime',
                thumbnail_url='https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
                note='Cosplay build reference: need 5mm high-density EVA foam for the dual thunder spears.'
            )
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

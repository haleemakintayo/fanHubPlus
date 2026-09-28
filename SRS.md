# 🚀 Fan Hub Plus: Django + React Implementation Roadmap

**Project:** Fan Hub Plus – End-to-End Web Solutions
**Stack:** Django (DRF + SimpleJWT) + React.js (Vite + Tailwind CSS)
**Database:** MySQL / SQLite (`DB_ENGINE` switch in `fanHubPlus_backend/fanhub/settings.py` + MySQL-ready `fanHubPlus_backend/seed_data.sql`)
**Status:** ✅ **Codebase, API, Frontend & MySQL Seed Data Complete** *(Only manual `.mp4` demo recording, `.doc` export & `.zip` packaging remain)*

### 📊 Implementation Audit Summary
| Module / SRS Section | Status | Implementation Location |
| :--- | :--- | :--- |
| **1. Backend Setup (Django)** | ✅ Complete | `fanHubPlus_backend/` (`accounts`, `fandoms`, `merchandise`, `events`, `interactions`, `chatbot`) |
| **2. Database Schema & Models** | ✅ Complete | `models.py` across all 6 apps + MySQL-ready `seed_data.sql` & `seed_data.py` |
| **3. REST API Development (DRF)** | ✅ Complete | JWT Auth, Category/Content/Character/Stream/Merch/Event/Chatbot/Admin endpoints |
| **4. Frontend Setup (React + Vite)** | ✅ Complete | `Fanhub_frontend/` (`App.jsx`, `api.js`, synchronized `fandomData.js`) |
| **5. Auth & Personalized Dashboard** | ✅ Complete | `Modals.jsx` (Login/Register/Reset), `Dashboard.jsx` |
| **6. Fandom Content Explorer** | ✅ Complete | `UniverseMatrix.jsx`, `ContentExplorer.jsx`, `UniversePage.jsx` |
| **7. Character Profiles & Articles Hub** | ✅ Complete | `CharacterArchive.jsx` (69 Champions), `ArticlePage.jsx` (24+ Rich Articles) |
| **8. Interactive Multimedia Center** | ✅ Complete | `MultimediaCenter.jsx` (4K Trailers, Audio Waveform Streamer, 5-Star Ratings) |
| **9. Merchandise Showcase (Display Only)** | ✅ Complete | `ResourceLibrary.jsx` (27 Collectibles, Upcoming Countdown, Zero Checkout) |
| **10. Location-Aware Events & Radar** | ✅ Complete | `ConventionRadar.jsx` (GPS Haversine Distance, City/Type Filter, `.ics` Export) |
| **11. AI Chatbot Assistant** | ✅ Complete | `FandomBot.jsx` + `chatbot/` backend deterministic FAQ & query audit logging |
| **12. Admin Control Panel** | ✅ Complete | `Admin.jsx` + Django Admin (Moderation Queue, CRUD, Analytics Telemetry) |
| **13. Deliverables & Packaging** | 🔄 Ready to Package | `seed_data.sql`, `README.md`, `DOCUMENTATION.md`, Visual Sitemap in `Footer.jsx` complete; manual `.mp4` video & `.zip` archive remaining |

---

## 🏗️ 1. Backend Setup (Django)
*Foundation for Section 1.8 Interface Requirements*

- [x] **Project Initialization:** `django-admin startproject fanhub` (`fanHubPlus_backend/fanhub/`)
- [x] **App Structure:** Create separate apps for modularity:
    - [x] `accounts` (User Auth, Custom User & Profile)
    - [x] `fandoms` (Categories, General Content, Character Profiles, Character Submissions, StreamMedia)
    - [x] `merchandise` (Showcase & Upcoming Drops)
    - [x] `events` (Location/Calendar & Haversine Radar)
    - [x] `interactions` (Bookmarks with Notes, Ratings, Fan Submissions, Feedback Tickets, User Activity)
    - [x] `chatbot` (FandomBot FAQ & Query Audit)
- [x] **Database Configuration:** Configure `settings.py` for your chosen DB (SQLite default + MySQL configuration via `DB_ENGINE=mysql`).
- [x] **CORS Setup:** Install `django-cors-headers` to allow React frontend to communicate with Django backend.
- [x] **Media Handling:** Configure `MEDIA_ROOT` and `MEDIA_URL` for static assets (images/videos). *Note: Ensure large files are handled efficiently per Section 1.5 Constraints.*

## 🗄️ 2. Database Schema & Models (Django Models)
*Implementing Section 1.8 Database Design*

- [x] **Category Model:** `name` (Choices: Anime, Gaming, Movies & TV, K-Pop, Comics, Manga, Cosplay, Community Vault), `description`, `slug`, `icon`, `accent_color`, `tags`, `top_pick`, `featured_quote`.
- [x] **Custom User Model:** Extend `AbstractUser` (`accounts.User` & `accounts.Profile`) to include:
    - [x] `favorite_categories` (ManyToMany to Category)
    - [x] `avatar` (URL/Asset path)
    - [x] `theme_preference`, `font_size_preference`, `dashboard_preferences` (JSONField)
- [x] **Content Model:** `title`, `slug`, `content_type` (ARTICLE/VIDEO/AUDIO/IMAGE), `body_text`, `synopsis`, `thumbnail_url`, `media_url`, `category` (FK), `popularity_score`, `view_count`.
- [x] **StreamMedia Model:** `title`, `slug`, `stream_type` (TRAILER/AUDIO), `media_url`, `thumbnail_url`, `duration`, `rating`, `ratings_count`, `views_label`, `likes_label`, `category` (FK).
- [x] **Character Profile Model:** `name`, `slug`, `alias`, `biography`, `image_url`, `origin`, `faction`, `stats_json`, `details_json`, `category` (FK).
- [x] **Merchandise Item Model:** `name`, `slug`, `image_url`, `tag` (`LIMITED_EDITION`, `PRE_ORDER`, `COLLECTIBLE`, `OFFICIAL_LICENSED`), `is_upcoming` (Boolean), `drop_date_text`, `msrp`, `manufacturer`, `view_count`, `popularity_score`.
- [x] **Event Model:** `title`, `slug`, `start_date`, `end_date`, `latitude`, `longitude`, `map_x`, `map_y`, `description`, `ticket_url`, `city`, `venue_name`, `event_type`.
- [x] **Bookmark Model:** `user` (FK), `content` (FK / `external_id`), `item_title`, `item_type`, `note`.
- [x] **Feedback Model:** `user` (FK), `feedback_type` (BUG/SUGGESTION/INQUIRY), `subject`, `message`, `status`.
- [x] **Run Migrations:** `python manage.py makemigrations` & `migrate`.

## 🔌 3. API Development (Django REST Framework or Standard Views)
*Connecting Backend to React Frontend*

- [x] **Serializers:** Create serializers for all models above (`fandoms`, `merchandise`, `events`, `interactions`, `chatbot`, `accounts`).
- [x] **Auth Endpoints:**
    - [x] Register (`POST /api/v1/auth/register/`)
    - [x] Login (`POST /api/v1/auth/login/`) - Uses JWT (`SimpleJWT`).
    - [x] Password Reset (`POST /api/v1/auth/password-reset/` & confirm) - Integrated with Email Backend.
- [x] **Content Endpoints:**
    - [x] `GET /api/v1/fandoms/categories/`
    - [x] `GET /api/v1/fandoms/contents/?category=anime&ordering=-popularity_score` (Filtering/Sorting logic)
    - [x] `GET /api/v1/fandoms/contents/{slug}/` (Detail view)
- [x] **Character Endpoints:**
    - [x] `GET /api/v1/fandoms/characters/?category=anime`
    - [x] `POST /api/v1/fandoms/character-submissions/` (For user submissions -> Status: Pending)
- [x] **Admin Endpoints:**
    - [x] `PATCH /api/v1/interactions/submissions/{id}/moderate/` & character submission moderation
    - [x] `GET /api/v1/interactions/admin/analytics/` (Active users, popular categories, chatbot volume)

## ⚛️ 4. Frontend Setup (React)
*Section 1.7 Non-Functional: Performance & UI*

- [x] **Project Init:** Vite + React (`Fanhub_frontend`).
- [x] **Routing:** SPA & URL path/hash routing in `App.jsx` for:
    - [x] `/` (Home)
    - [x] Login / Register / Password Reset modals
    - [x] `/dashboard`
    - [x] `/universe/:slug` & `#explore`
    - [x] `/article/:slug` & Character Lore modal/archive
    - [x] `#events` (Convention Radar)
    - [x] `/admin` (Protected Admin Control Panel)
- [x] **State Management:** React state + persistent `localStorage` & backend sync for:
    - [x] User Auth State (JWT access & refresh tokens)
    - [x] Theme State (Dark/Light Mode + Normal/Large Font Scaling)
    - [x] Bookmark List with Personal Notes & Recent Activity Stream
- [x] **API Client:** Configured in `Fanhub_frontend/src/services/api.js` with automatic Bearer JWT headers and offline fallback to `fandomData.js`.
- [x] **Responsive UI Library:** Tailwind CSS Neo-Brutalist responsive design system.

## 👤 5. User Authentication & Dashboard (React Components)
*Section 1.6 Functional Requirements*

- [x] **Login/Register Forms:** With validation and error handling (`Modals.jsx`).
- [x] **Forgot Password Flow:** Input email -> Tokenized reset support (`Modals.jsx`).
- [x] **Profile Edit Page (`Dashboard.jsx`):**
    - [x] Update Avatar & Bio.
    - [x] Select Favorite Fandoms.
    - [x] Toggle Dark Mode/Font Size (Saved to `localStorage` and synced with user profile).
- [x] **Personalized Dashboard (`Dashboard.jsx`):**
    - [x] Fetch favorite fandoms and display quick links.
    - [x] Fetch and manage user bookmarks with editable personal notes.
    - [x] Personalized greeting and Recent Activity telemetry stream.

## 🔍 6. Fandom Content Explorer (React Components)
*Section 1.6: Advanced Filters*

- [x] **Category Grid:** Display 8 categories with icons, accent colors, and entry counts (`UniverseMatrix.jsx`).
- [x] **Filter Controls (`ContentExplorer.jsx` & `UniversePage.jsx`):**
    - [x] Filters for Category/Universe, Release Year, Content Type.
    - [x] Search Bar for cross-fandom keyword lookup.
- [x] **Content Cards:** Reusable cards showing Image, Title, Type Badge, Rating, and Bookmark button.
- [x] **Sorting Logic:** Controls for "Latest", "Popular", and "A-Z".

## 🎭 7. Character Profiles & Articles Hub
*Section 1.6: Rich Text & Storytelling*

- [x] **Character Card Component:** Image, Name, Alias, Fandom Tag, and Canon Battle Telemetry (`CharacterArchive.jsx`).
- [x] **Character Detail Modal:** Full Biography, First Appearance, Weapon, Nemesis, and Stats (`Modals.jsx`).
- [x] **Featured Article Viewer (`ArticlePage.jsx`):**
    - [x] Rich multi-section narrative layout with pull-quotes and key takeaways.
    - [x] **Timeline & Related Universe Navigation:** Cross-links between universe hubs and related articles.
- [x] **Event Highlights Section:**
    - [x] Storytelling format with convention & premiere highlights.
- [x] **Fan Submission Form (`Modals.jsx`):**
    - [x] Form for users to submit character profiles or fan articles/lore.
    - [x] Shows "Pending Approval" confirmation toast and routes to Admin Moderation Queue.

## 🎬 8. Interactive Multimedia Center
*Section 1.6: Media & Copyright*

- [x] **Video Player Component (`MultimediaCenter.jsx`):** Uses YouTube `<iframe>` embeds for 4K trailers.
- [x] **Audio Player (`MultimediaCenter.jsx`):** Interactive soundtrack/audio player with waveform visualizer.
- [x] **Rating System:** Interactive 5-star rating system persisted to backend and `localStorage`.
- [x] **Copyright Disclaimer:** Included in `Footer.jsx`.

## 🛍️ 9. Merchandise Showcase (Display Only)
*Section 1.5 Constraint: NO Payments*

- [x] **Gallery Grid (`ResourceLibrary.jsx`):** Multi-image showcase grid for 27 curated merchandise collectibles across all 8 universes.
- [x] **Tag Filter:** Filter by `LIMITED_EDITION`, `PRE_ORDER`, `COLLECTIBLE`, `OFFICIAL_LICENSED`.
- [x] **Upcoming Releases Section:** Live countdown timers for upcoming drops (`UPCOMING_RELEASES` & `is_upcoming=True`).
- [x] **Verify:** Strictly display & discovery only — zero cart, checkout, or payment fields.

## 📍 10. Location-Aware Events
*Section 1.6: Map Integration*

- [x] **Map Integration (`ConventionRadar.jsx`):** Interactive stylized radar map with coordinate pins (`latitude`, `longitude`, `map_x`, `map_y`).
- [x] **Geolocation:** Browser `navigator.geolocation` + Haversine distance calculation in backend/frontend.
- [x] **Event List:** Filter events by city (`Tokyo`, `Los Angeles`, `London`, `Lagos`) and event type (`Convention`, `Cosplay Meetup`, `Screening`).
- [x] **Ticket Links & Calendar Export:** External ticket links + instant `.ics` calendar invite download.

## 💬 11. AI Chatbot (Optional)
*Section 1.6: Optional Feature*

- [x] **Integration (`FandomBot.jsx`):** Interactive floating & modal AI assistant widget.
- [x] **Backend Logic (`chatbot/views.py`):** Matches curated `ChatbotFAQ` entries and keyword triggers with low-latency responses.
- [x] **History:** Stores conversation queries and latency telemetry in `ChatbotQuery`.

## 🛠️ 12. Admin Control Panel (Django Admin or Custom React Admin)
*Section 1.6: Admin Controls*

- [x] **Django Admin Customization:**
    - [x] Registered all models across `accounts`, `fandoms`, `merchandise`, `events`, `interactions`, `chatbot`.
    - [x] Configured `list_filter`, `search_fields`, and moderation actions.
- [x] **Custom React Admin Dashboard (`Admin.jsx`):**
    - [x] Protected Admin view (`role === 'ADMIN'`).
    - [x] Tables & moderation controls for Fan Submissions, Character Submissions, Feedback Tickets, Content, Characters, Merchandise, Events, and Chatbot FAQs.
    - [x] Forms to Add/Edit/Delete Categories, Content, Stream Media, Characters, Merchandise, Events, and FAQs.
    - [x] Live Analytics overview (Active users, popular categories, content & chatbot metrics).

## 📦 13. Final Deliverables & Compliance
*Section 1.9: Mandatory Submissions*

- [x] **Sitemap:** Interactive visual Sitemap integrated into `Footer.jsx` (`SITEMAP_SECTIONS` in `fandomData.js`).
- [x] **Testing:**
    - [x] Tested all forms (Register, Login, Feedback, Fan Submission, Character Submission).
    - [x] Tested filters, search, and sorting across all 8 universes.
    - [x] Tested Responsive Design on Mobile, Tablet, and Desktop viewports.
- [x] **Documentation & SQL:**
    - [x] Comprehensive `README.md` and `DOCUMENTATION.md` created in project root.
    - [x] `Installation Instructions` (How to run Django server & React dev server, plus `.bat` launchers).
    - [x] **User Credentials** documented (`admin@fanhub.com` / `AdminPass123!`, `fan@fanhub.com` / `MemberPass123!`).
    - [x] Exported MySQL-compatible Database Seed Script (`fanHubPlus_backend/seed_data.sql`).
    - [ ] Export `DOCUMENTATION.md` / `README.md` to `ReadMe.doc` (Word format) for final submission zip.
- [ ] **Demo Video:** Record 15–20 minute `.mp4` walkthrough demonstrating all functional requirements.
- [x] **AI Acknowledgement:** Documented in project documentation.
- [ ] **Zip File:** Package Code, `ReadMe.doc`, `seed_data.sql`, and `.mp4` Demo Video for final upload.

---

### 📝 Technical Notes for Django + React
1.  **Static Files:** In production, use `whitenoise` or serve static files via Nginx/Apache. For dev, Django serves them.
2.  **Images:** Ensure `Pillow` is installed in Django for image processing.
3.  **Security:** Environment variables configured via `.env` (`DB_ENGINE`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_HOST`, `MYSQL_PORT`).
4.  **Performance:** `select_related` and `prefetch_related` are used in Django ViewSets to avoid N+1 query problems.

### ✅ Current Status Check
*Summary of project completion:*
- [x] Backend Models & Migrations
- [x] API Endpoints (DRF/Views)
- [x] React Router & Basic Layout
- [x] Auth Flow (Login/Register)
- [x] Content Explorer (Filtering/Sorting)
- [x] Character & Article Pages
- [x] Multimedia & Merchandise
- [x] Admin Panel
- [x] MySQL Seed Data (`seed_data.sql`) & Technical Documentation (`README.md` / `DOCUMENTATION.md`)
- [ ] Final Manual Packaging (`ReadMe.doc` export + `.mp4` Demo Video recording)
Fandom Universe 
Portal for Fans 
Software Requirements Specification 
Version 1.0 
Theme: Fandom Universe 
Category: End-to-End Web Solutions 
Project Name: Fan Hub Plus 
© Aptech Limited 
© Aptech Limited 
 
Table of Contents 
1.1 Background and Necessity for the Web Application ..... 3 
1.2 Proposed Solution ..................................................................... 4 
1.3 Purpose of the Document ...................................................... 5 
1.4 Scope of Project........................................................................ 6 
1.5 Constraints .................................................................................. 7 
1.6 Functional Requirements ........................................................ 7 
1.7 Non-Functional Requirements ............................................. 11 
1.8 Interface Requirements ......................................................... 13 
1.9   Project Deliverables ................................................................ 15 
 
  
1.1 Background and Necessity for the Web 
Application 
Fandom is a group or community of fans sharing a common passion. Fandom 
enthusiasts exist across Anime, Gaming, Movies, TV Shows, Korean Pop (K-Pop), 
Comics, Manga, and Cosplay communities. 
Today they rely on a scattered mix of forums, social media pages, and niche sites 
to find the content they love. Existing resources are often single-fandom, cluttered 
with ads, difficult to navigate, or lack the rich media experience that fans 
genuinely want. 
There is a growing demand for a single, engaging, and visually rich information 
hub that brings multiple fandoms together under one roof. A Web application is 
required to fulfil this demand by offering a dynamic and responsive platform 
which provides features such as: 
• Curated and categorized content spanning multiple fandom domains 
• Search, sorting, and filtering across all content types 
• Rich multimedia experiences including galleries, videos, audio, and trailers 
Built with modern front-end technologies and a robust backend, it should ensure 
a fast, seamless, and immersive browsing experience. This makes it the go-to 
destination for fandom communities to explore, discover, and celebrate the 
universes they love. 
© Aptech Limited 
1.2 Proposed Solution 
To address the gap in a unified, engaging fandom experience, it is proposed to 
develop a fully functional Web application named Fan Hub Plus – a responsive 
and interactive Fandom Universe platform designed for anime watchers, gamers, 
movie and TV buffs, K-Pop stans, comic and manga readers, and cosplay 
enthusiasts alike. 
The application offers a seamless user experience by organizing content into 
clearly browsable categories – Anime, Gaming, Movies, TV Shows, K-Pop, Comics, 
Manga, and Cosplay. Each category is presented through an intuitive UI, 
interactive galleries, and visual storytelling, optionally with an Artificial Intelligence 
(AI)-powered chatbot on hand to help visitors find exactly what they are looking 
for. 
© Aptech Limited 
Flow Diagrams 
Broad level flow diagrams depicting interaction between various entities and the 
application are shown here.  
For example, a visitor's journey from landing page → category browsing → 
content detail → chatbot (Optional)→ bookmarking, and an admin content
management flow. 
1.3 Purpose of the Document 
This document presents a detailed description of the Fan Hub Plus application, 
explaining its features, purpose, scope, and limitations. It is intended for both 
stakeholders and developers of the application. 
© Aptech Limited 
1.4 Scope of Project 
Fan Hub Plus is an End-to-End Web solution designed to serve as an engaging and 
visually rich information hub for fandom enthusiasts. It offers a personalized 
experience through user registration and login, curated content across multiple 
categories – Anime, Gaming, Movies, TV Shows, K-Pop, Comics, Manga, and 
Cosplay – and a customizable dashboard. 
User roles can comprise Visitor, Registered users, and Administrators.  
Visitors can browse and can have limited access to the Web application. 
Registered users can browse and explore content with robust search, sorting, and 
filtering capabilities. They can also discover image galleries, videos, audio clips, 
featured articles, character profiles, event highlights, trailers, merchandise 
showcases, and upcoming release listings. An optional AI-powered chatbot can 
assist visitors by answering frequently asked questions and guiding them through 
the platform. 
The application includes a backend system to support data storage, user session 
management, feedback submission, and content updates. Built with modern 
technologies, the platform is scalable, responsive, and adaptable for fan 
communities, fan conventions, and personal use. Administrative functionality will 
also be part of the application, giving full control over content, media, including 
user management, the chatbot's knowledge base, and so on. 
© Aptech Limited 
1.5 Constraints
Development of the Fan Hub Plus Web application must adhere to several 
constraints to ensure its successful implementation and operation. Technically, 
the application must be compatible with major Web browsers and responsive 
across various devices. You may encounter constraints related to data storage, 
media file sizes, data synchronization, and backup procedures. 
The usage of fandom-related images, videos, audio clips, and other media may 
be subject to licensing agreements and copyright restrictions. It is important to 
understand and comply with these constraints to avoid legal issues. The Web 
application will not have any functionality for actual merchandise purchase, 
order processing, or payment gateways – merchandise showcases are for display 
and discovery purposes only, and this functionality is beyond the scope of the 
application. 
1.6 Functional Requirements 
The Fan Hub Plus Web application will offer a complete and category-based 
fandom exploration experience with dynamic frontend features and robust 
backend support.  
Following are the detailed functional requirements: 
User Authentication and Management 
• Secure session management 
• Forgot password/reset password feature and email verification or tokenized 
link 
• User profile creation with editable favorite fandoms, categories of interest, 
and display preferences 
• Optional profile picture/avatar upload feature 
Personalized Dashboard 
• It displays personalized greeting, recent activity, favorite fandoms, and 
bookmarked items 
© Aptech Limited 
Fandom Content Explorer (with Advanced Filters) 
• It fetches and displays curated content – articles, profiles, or media – across 
categories (Anime, Gaming, Movies, TV Shows, K-Pop, Comics, Manga, 
Cosplay) from a backend database 
• Support for a multi-level search and filtering feature (category, genre, 
release year, popularity, or content type) 
• Various Sorting options (latest, most popular, or alphabetical) 
AI-Powered Chatbot Assistant (Optional Feature) 
You may optionally use AI tools to build a conversational chatbot that has 
following features: 
• Answers frequently asked questions about 
platform and its content 
• Optionally, recommends content and 
categories based on visitor preferences and 
conversation context 
• Guides new users through the platform's 
features via a multi-step conversational flow 
• Includes chat history stored for context 
continuity and progress tracking 
Interactive Multimedia Center 
the 
• Enables streaming embedded videos, trailers, audio clips (podcasts or 
soundtracks), and animated explainers 
• Enables Admin-controlled tagging and categorization of media 
• Supports User feedback/rating on media (5-star or thumbs-up/down 
system) 
Character Profiles and Featured Articles Hub 
• A Card-based character profiles with fandom-based and category-based 
filtering 
• The Featured articles with rich text, embedded images, and timeline-style 
event highlights 
• An Event highlights section (conventions, premieres, releases) presented in 
a storytelling format 
© Aptech Limited 
• An option for users to submit fan content or articles (admin approval 
required) 
Merchandise Showcase and Resource Library 
• Merchandise showcase with image galleries grouped by fandom and 
category 
• Upcoming releases section listing anticipated anime, games, movies, 
shows, comics, and merchandise drops 
• Backend-driven tagging (Example: 'Limited Edition,' 'Pre-Order,' or 
'Collectible') 
• Optional feature -  Admin can track view count and popularity of 
merchandise and content items 
Feedback and Analytics 
• Dynamic feedback form with type categorization (bug, suggestion, or 
query) 
Bookmarking, Notes, and Sharing 
• Bookmark any article, character profile, video, or merchandise item 
Location-Aware Event Discovery and Calendar 
• Map and GPS Integration: Users can discover nearby fan 
conventions, cosplay meetups, and screening events using location 
services.  
• Event Calendar: Users can browse upcoming fandom conventions, 
meetups, and screening schedules, filterable by city, with ticket links.  
Admin Control Panel 
Add/edit/remove: 
• Category content (Anime, Gaming, Movies, TV Shows, K-Pop, Comics, 
Manga, or Cosplay) 
• Multimedia content, character profiles, and featured articles 
• Optional Chatbot FAQ entries and knowledge base 
© Aptech Limited 
• User feedback and fan-submitted content 
• View usage statistics: active users, popular categories, chatbot interaction 
volume 
Accessibility and UI Enhancements 
• Dark mode toggle and font-size adjustment for accessibility 
• Breadcrumbs for navigation clarity across categories 
• Smooth transitions and loading spinners for media-heavy pages 
Note: Boilerplate or readymade HTML template can be used, provided it is only for design 
aspect and not for implementing application functionality.  
© Aptech Limited 
Important Note Regarding AI Usage: 
You are encouraged to use AI-powered tools (such as AI-assisted Website 
builders, UI/UX design tools, code assistants, and image-generation tools) to 
enhance productivity and creativity. However, AI should be used as a supporting 
aid rather than a substitute for your own design, development, and problem
solving skills. 
Do NOT rely on completely ready-made Website templates for your project, as 
this will adversely affect your evaluation. Your Web application’s design, structure, 
and implementation should primarily reflect your own skills and understanding. Do 
NOT submit AI-generated code or content without meaningful modification and 
understanding. AI-generated suggestions may be used for guidance, learning, 
debugging, or improving productivity, but the final solution should demonstrate 
your own effort, logic, and implementation. 
Acknowledge all the AI tool(s) used (for example, Copilot, Canva AI, Figma AI, 
Uizard, or similar) in your project documentation or submission. 
During evaluation, judges may ask participants to explain their design decisions, 
implementation approach, and code. You are, therefore, expected to 
understand and be able to justify all aspects of your submitted work. 
Do not use AI tools to fully produce ready-made documentation. This is strictly 
forbidden. 
Bottomline: AI is your assistant, not your developer. Your knowledge, 
creativity, and coding skills should drive the project. 
1.7 Non-Functional Requirements 
There are several non-functional requirements that should be fulfilled by the 
application. They include: 
• Safe to use: The application should not result in any malicious downloads 
or unnecessary file downloads. 
• Accessibility: The application should have clear and legible fonts, user
interface elements, and navigation elements. 
• User-friendliness: The application should be easy to navigate with clear 
menus and other elements and easy to understand. 
© Aptech Limited 
• Operability: The application should be reliable and efficient. 
• Performance: The application should demonstrate high value of 
performance through speed and throughput, especially given the media
rich content. In simple terms, the application should have minimal load 
time and smooth page redirection. 
• Scalability: The application architecture and infrastructure should be 
designed to handle increasing user traffic, growing content libraries, and 
feature expansions. 
• Security: The application should implement adequate security measures 
such as authentication. For example, only registered users can access 
certain personalized features. 
• Availability: The application should be available 24/7 with minimum 
downtime. 
• Compatibility: The application should be compatible with latest browsers 
and various devices. 
required. 
These are the bare minimum expectations 
from the project. It is a must to implement the 
FUNCTIONAL 
and
 NON-FUNCTIONAL 
requirements given in this SRS. Once they are 
complete, you can use your own creativity 
and imagination to add more features if 
© Aptech Limited 
1.8 Interface Requirements 
Hardware 
HARDWARE 
 Intel Core i5/i7 Processor or higher 
 8 GB RAM or higher 
 Color SVGA monitor 
 500 GB Hard Disk space 
 Mouse 
 Keyboard 
Software 
SOFTWARE 
IDE: Appropriate IDE as per the platform 
Frontend: HTML5, CSS3, Bootstrap, 
ReactJS/AngularJS/Angular/TypeScript, JavaScript, 
jQuery, and XML 
Backend: Java SDK with Apache NetBeans or Eclipse, 
Jakarta EE 
OR 
C# with ASP.NET MVC and ASP.NET MVC Core (optional), 
Visual Studio IDE 
OR 
PHP with Laravel Framework 
OR 
Python with Flask or Django 
OR 
MongoDB, Express.js, Angular, Node.js 
OR 
MongoDB, Express.js, React, Node.js 
Database: MySQL/SQL Server/MongoDB/JSON 
For local hosting (optional): XAMPP latest version 
AI Tools: Optional AI assistant/chatbot may be 
implemented using tools such as tawk.to or Zapier. 
© Aptech Limited 
Database Design 
Based on the given specifications, you will define suitable entities, attributes for 
these entities, and identify relationships between the entities. For example, some 
entities along with their attributes, primary keys (PK), and foreign keys (FK) can be 
identified as follows: 
• User – user_id (PK), name, email, password_hash, created_at 
• Category – category_id (PK), name (Anime, Gaming, Movies, TV Shows, K
Pop, Comics, Manga, Cosplay), description 
• Content – content_id (PK), category_id (FK → Category.category_id), title, 
type (article, video, audio, image), description, release_date, 
popularity_score 
• Character Profile – character_id (PK), category_id (FK → 
Category.category_id), name, bio, image_url 
• Merchandise Item – item_id (PK), category_id (FK → 
Category.category_id), name, image_url, tag, is_upcoming 
• Bookmark – bookmark_id (PK), user_id (FK → User.user_id), content_id (FK 
→ Content. Content_id), note, created_at 
• Chatbot Query – query_id (PK), user_id (FK → User.user_id), message, 
response, created_at 
• Feedback – feedback_id (PK), user_id (FK → User.user_id), type, message, 
status 
Similarly, you can define other entities and relationships between entities and 
methods representing activities on the entities. 
Key Relationships: 
• User → Category: many-to-many 
• Category → Content, Category → Character Profile, Category → 
Merchandise Item: one-to-many (one category groups many records of 
each). 
• User → Bookmark, User → Chatbot Query, User → Feedback: one-to-many 
(one user can have many of each). 
• Content → Bookmark: one-to-many (one content item can be 
bookmarked by many users). 
Note: These are just examples, with primary keys (PK) and foreign keys (FK) identified to 
show referential integrity between tables. You do not have to adhere to these structures 
and can design your own table structure with different columns. 
© Aptech Limited 
1.9 Project Deliverables 
You are required to design and build the project and submit it along with a 
complete project report that includes: 
• Problem Definition 
• Design Specifications 
• Diagrams such as Flowcharts for various Activities, Data Flow Diagrams, 
and so on 
• Database Design 
• Test Data Used in the Project 
• Project Installation Instructions (MANDATORY) 
• User Credentials for all Types of Users with Passwords (MANDATORY) 
Documentation is considered as a very important part of the project. Ensure that 
documentation is complete and comprehensive. 
Documentation should not contain any source code. 
The consolidated project will be submitted as a zip file with a ReadMe.doc file 
listing assumptions (if any) made at your end and SQL script files (.sql) OR schema 
files containing database and table definitions. 
Note: Preferably, host the working Web application on a Website and share the 
URL for evaluation. 
Submit a video (.mp4 file) demonstrating the working of the Web application, 
including all features under Functional Requirements. This is MANDATORY. 
Over and above the given specifications, you can apply your creativity and logic 
to improve the system. 
Sitemap: To understand the flow of the Fan Hub Plus Web Application, you will 
have to create a Sitemap and add it to the home page of your application. 
~~~ End of Document ~~~ 
© Aptech Limited 
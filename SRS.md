Here is the comprehensive **Project Master Checklist & Scope Tracker** tailored specifically for a **Django (Backend)** and **React (Frontend)** architecture.

This checklist maps every requirement from the **Fan Hub Plus SRS v1.0** to specific technical tasks in your stack, helping you identify exactly what is left to build.

***

# 🚀 Fan Hub Plus: Django + React Implementation Roadmap

**Project:** Fan Hub Plus – End-to-End Web Solutions
**Stack:** Django (DRF/Standard) + React.js
**Database:** MySQL / PostgreSQL / SQLite (as per your choice)
**Status:** In Progress

## 🏗️ 1. Backend Setup (Django)
*Foundation for Section 1.8 Interface Requirements*

- [ ] **Project Initialization:** `django-admin startproject fanhub`
- [ ] **App Structure:** Create separate apps for modularity:
    - [ ] `accounts` (User Auth)
    - [ ] `core` (Categories, General Content)
    - [ ] `characters` (Character Profiles)
    - [ ] `media_center` (Videos/Audio)
    - [ ] `merchandise` (Showcase)
    - [ ] `events` (Location/Calendar)
    - [ ] `feedback` (Forms/Analytics)
    - [ ] `chatbot` (Optional AI integration)
- [ ] **Database Configuration:** Configure `settings.py` for your chosen DB (MySQL/PostgreSQL).
- [ ] **CORS Setup:** Install `django-cors-headers` to allow React frontend to communicate with Django backend.
- [ ] **Media Handling:** Configure `MEDIA_ROOT` and `MEDIA_URL` for static assets (images/videos). *Note: Ensure large files are handled efficiently per Section 1.5 Constraints.*

## 🗄️ 2. Database Schema & Models (Django Models)
*Implementing Section 1.8 Database Design*

- [ ] **Category Model:** `name` (Choices: Anime, Gaming, Movies, etc.), `description`, `slug`.
- [ ] **Custom User Model:** Extend `AbstractUser` to include:
    - [ ] `favorite_fandoms` (ManyToMany to Category)
    - [ ] `avatar` (ImageField)
    - [ ] `display_preferences` (JSONField or CharField for theme/font size)
- [ ] **Content Model:** `title`, `type` (article/video/audio), `rich_text_body` (HTMLField), `featured_image`, `category` (FK), `popularity_score`.
- [ ] **Character Profile Model:** `name`, `bio`, `image_url`, `fandom_name`, `category` (FK).
- [ ] **Merchandise Item Model:** `name`, `image_gallery` (ManyToMany or JSON), `tag` (Limited Edition, etc.), `is_upcoming` (Boolean).
- [ ] **Event Model:** `title`, `date`, `location_coords` (Lat/Long for GPS), `storytelling_description` (TextField), `ticket_link`.
- [ ] **Bookmark Model:** `user` (FK), `content_object` (GenericForeignKey or specific FKs), `note`.
- [ ] **Feedback Model:** `user` (FK), `type` (Bug/Suggestion), `message`, `status`.
- [ ] **Run Migrations:** `python manage.py makemigrations` & `migrate`.

## 🔌 3. API Development (Django REST Framework or Standard Views)
*Connecting Backend to React Frontend*

- [ ] **Serializers:** Create serializers for all models above.
- [ ] **Auth Endpoints:**
    - [ ] Register (`POST /api/register/`)
    - [ ] Login (`POST /api/login/`) - Use JWT (SimpleJWT) or Session Auth.
    - [ ] Password Reset (`POST /api/password-reset/`) - Integrate Email Backend.
- [ ] **Content Endpoints:**
    - [ ] `GET /api/categories/`
    - [ ] `GET /api/content/?category=anime&sort=popular` (Filtering/Sorting logic)
    - [ ] `GET /api/content/{id}/` (Detail view)
- [ ] **Character Endpoints:**
    - [ ] `GET /api/characters/?fandom=naruto`
    - [ ] `POST /api/characters/submit/` (For user submissions -> Status: Pending)
- [ ] **Admin Endpoints:**
    - [ ] `PATCH /api/admin/approve-content/{id}/`
    - [ ] `GET /api/admin/analytics/` (Active users, popular categories)

## ⚛️ 4. Frontend Setup (React)
*Section 1.7 Non-Functional: Performance & UI*

- [ ] **Project Init:** `npx create-react-app fanhub-client` or Vite.
- [ ] **Routing:** Install `react-router-dom`. Define routes for:
    - [ ] `/` (Home)
    - [ ] `/login`, `/register`
    - [ ] `/dashboard`
    - [ ] `/explore/:category`
    - [ ] `/character/:id`
    - [ ] `/events`
    - [ ] `/admin` (Protected Route)
- [ ] **State Management:** Setup Context API or Redux/Zustand for:
    - [ ] User Auth State
    - [ ] Theme State (Dark/Light Mode)
    - [ ] Bookmark List
- [ ] **API Client:** Configure `axios` or `fetch` with base URL pointing to Django backend. Include Auth Token in headers.
- [ ] **Responsive UI Library:** Install Bootstrap/Tailwind/MUI (SRS allows boilerplate for design only).

## 👤 5. User Authentication & Dashboard (React Components)
*Section 1.6 Functional Requirements*

- [ ] **Login/Register Forms:** With validation and error handling.
- [ ] **Forgot Password Flow:** Input email -> Show "Check Inbox" message.
- [ ] **Profile Edit Page:**
    - [ ] Upload Avatar (Send multipart/form-data to Django).
    - [ ] Select Favorite Fandoms (Multi-select dropdown).
    - [ ] Toggle Dark Mode/Font Size (Save to local storage or DB).
- [ ] **Personalized Dashboard:**
    - [ ] Fetch `user.profile.favorite_fandoms` and display quick links.
    - [ ] Fetch `user.bookmarks` and display list.
    - [ ] "Welcome Back, [Name]" greeting.

## 🔍 6. Fandom Content Explorer (React Components)
*Section 1.6: Advanced Filters*

- [ ] **Category Grid:** Display 8 categories with icons/images.
- [ ] **Filter Sidebar:**
    - [ ] Dropdowns for Genre, Year, Type.
    - [ ] Search Bar (Debounced input to avoid excessive API calls).
- [ ] **Content Cards:** Reusable component showing Image, Title, Type Badge.
- [ ] **Sorting Logic:** Buttons for "Latest", "Popular", "A-Z" that trigger new API requests with query params.

## 🎭 7. Character Profiles & Articles Hub
*Section 1.6: Rich Text & Storytelling*

- [ ] **Character Card Component:** Image, Name, Fandom Tag.
- [ ] **Character Detail Page:** Bio, Gallery, Related Content.
- [ ] **Featured Article Viewer:**
    - [ ] Use `dangerouslySetInnerHTML` or a library like `react-html-parser` to render Django’s rich text HTML safely.
    - [ ] **Timeline Component:** Custom CSS/JS component to show event highlights in a vertical/horizontal timeline style.
- [ ] **Event Highlights Section:**
    - [ ] "Storytelling" Layout: Large hero image, narrative text blocks, embedded media.
- [ ] **Fan Submission Form:**
    - [ ] Form for users to submit character/article data.
    - [ ] Show "Pending Approval" message after submission.

## 🎬 8. Interactive Multimedia Center
*Section 1.6: Media & Copyright*

- [ ] **Video Player Component:** Use `<iframe>` for YouTube/Vimeo embeds (Avoid hosting copyrighted videos directly).
- [ ] **Audio Player:** HTML5 `<audio>` tag with custom controls for podcasts/soundtracks.
- [ ] **Rating System:** Star rating component that sends `POST` request to Django.
- [ ] **Copyright Disclaimer:** Add footer text: *"Media content is property of respective owners. Used for educational purposes."*

## 🛍️ 9. Merchandise Showcase (Display Only)
*Section 1.5 Constraint: NO Payments*

- [ ] **Gallery Grid:** Masonry or standard grid for merchandise images.
- [ ] **Tag Filter:** Filter by "Limited Edition", "Pre-Order".
- [ ] **Upcoming Releases Section:** List items with `is_upcoming=True`.
- [ ] **Verify:** Ensure NO "Add to Cart" or "Checkout" buttons exist. Only "View Details" or "External Link".

## 📍 10. Location-Aware Events
*Section 1.6: Map Integration*

- [ ] **Map Integration:** Use `react-leaflet` or Google Maps API.
- [ ] **Geolocation:** Use browser `navigator.geolocation` to get user coords.
- [ ] **Event List:** Filter events by distance/city.
- [ ] **Ticket Links:** External `<a>` tags to official ticket sites.

## 💬 11. AI Chatbot (Optional)
*Section 1.6: Optional Feature*

- [ ] **Integration:** Embed `tawk.to` widget OR build a simple React chat interface.
- [ ] **Backend Logic:** If custom, create a Django view that takes `message` and returns predefined FAQ answers or uses a simple keyword match.
- [ ] **History:** Store queries in `ChatbotQuery` model if user is logged in.

## 🛠️ 12. Admin Control Panel (Django Admin or Custom React Admin)
*Section 1.6: Admin Controls*

- [ ] **Django Admin Customization:**
    - [ ] Register all models.
    - [ ] Add `list_filter` for Category, Status.
    - [ ] Add actions for "Approve Fan Content".
- [ ] **OR Custom React Admin Dashboard:**
    - [ ] Protected Route (`isAdmin=True`).
    - [ ] Tables for Users, Content, Feedback.
    - [ ] Forms to Add/Edit Categories, Characters, Events.
    - [ ] Analytics Charts (Use `recharts` or `chart.js` to visualize Django analytics data).

## 📦 13. Final Deliverables & Compliance
*Section 1.9: Mandatory Submissions*

- [ ] **Sitemap:** Generate `sitemap.xml` or create a visual HTML sitemap page linked in Footer.
- [ ] **Testing:**
    - [ ] Test all forms (Register, Login, Feedback, Submission).
    - [ ] Test filters and sorting.
    - [ ] Test Responsive Design on Mobile/Tablet.
- [ ] **Documentation:**
    - [ ] Write `ReadMe.doc` with Assumptions.
    - [ ] Create `Installation Instructions` (How to run Django server, How to run React dev server).
    - [ ] List **User Credentials** (Admin, User, Visitor).
    - [ ] Export Database Schema (`.sql` file).
- [ ] **Demo Video:** Record `.mp4` showing ALL functional requirements.
- [ ] **AI Acknowledgement:** List any AI tools used in documentation.
- [ ] **Zip File:** Combine Code (optional if hosted), Docs, SQL, Video.

---

### 📝 Technical Notes for Django + React
1.  **Static Files:** In production, use `whitenoise` or serve static files via Nginx/Apache. For dev, Django serves them.
2.  **Images:** Ensure `Pillow` is installed in Django for image processing.
3.  **Security:** Use `django-environ` for secret keys. Never commit `.env` file.
4.  **Performance:** Use `select_related` and `prefetch_related` in Django QuerySets to avoid N+1 query problems when fetching Content with Categories/Authors.

### ✅ Current Status Check
*Mark these as you complete them to see what is left:*
- [ ] Backend Models & Migrations
- [ ] API Endpoints (DRF/Views)
- [ ] React Router & Basic Layout
- [ ] Auth Flow (Login/Register)
- [ ] Content Explorer (Filtering/Sorting)
- [ ] Character & Article Pages
- [ ] Multimedia & Merchandise
- [ ] Admin Panel
- [ ] Documentation & Video

This checklist covers the **entire scope** of the SRS. If you have completed the "Backend Setup" and "Models," your next immediate steps are **API Development** and **React Routing**.
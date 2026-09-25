import { ArrowLeft, Info, Shield, Users, ExternalLink, Mail, MapPin } from 'lucide-react'

const TEAM_MEMBERS = [
  {
    name: 'Lead Full-Stack Architect',
    role: 'Project Lead & System Architecture',
    color: '#A3E635',
  },
  // {
  //   name: 'UI/UX Design Specialist',
  //   role: 'Brutal-Pop Design & Accessibility',
  //   color: '#38BDF8',
  // },
  {
    name: 'Backend API Engineer',
    role: 'Django REST Framework & Database Schema',
    color: '#F43F5E',
  },
  {
    name: 'Frontend Integration Engineer',
    role: 'React 19 SPA & Real-Time State Management',
    color: '#FACC15',
  },
]

const DISCLAIMER_SECTIONS = [
  {
    title: 'Copyright & Trademark Notice',
    content:
      'All trademarks, logos, images, audio samples, video clips, and other intellectual property displayed on this site are the property of their respective owners. Fan Hub Plus does not own, produce, or distribute any copyrighted content. This platform operates strictly as a fan-curated educational resource.',
  },
  {
    title: 'No Hosting of Licensed Material',
    content:
      'Fan Hub Plus does not host, store, or serve any copyrighted media files on its own servers. All multimedia (4K trailers, audio tracks, character artwork) is embedded or linked via third-party providers who are responsible for their own licensing compliance. We merely curate and index metadata.',
  },
  {
    title: 'Educational & Non-Commercial Use',
    content:
      'All content aggregation, categorization, and commentary provided on this platform is for educational and informational purposes only. The site is not monetized and does not generate revenue through advertisements, sponsorships, or affiliate links. This constitutes fair-use fan activity.',
  },
  {
    title: 'Community-Generated Submissions',
    content:
      'User-submitted fan works (articles, essays, character profiles) undergo administrative review before publication. By submitting content, contributors affirm they have the right to share their work and agree it will be reviewed for licensing compliance prior to appearing in the Community Vault.',
  },
]

export default function AboutPage({ onNavigateHome, onOpenModal }) {
  return (
    <section className="py-8 sm:py-12 px-3 sm:px-6 lg:px-8 bg-[#FDFBF7] dark:bg-[#0D1117] border-b-2 border-black dark:border-neutral-100">
      <div className="max-w-5xl mx-auto">
        {/* Page Header & Back Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b-2 border-black dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateHome?.()}
              className="px-3 py-1.5 bg-white dark:bg-[#161B22] text-black dark:text-white font-mono font-black text-xs uppercase border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portal</span>
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#FACC15] text-black font-mono font-black text-[10px] px-2 py-0.5 border border-black uppercase">
                  SECTION 1.9
                </span>
                <span className="font-mono text-xs font-black uppercase text-neutral-500">
                  / ABOUT
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white mt-0.5">
                About &amp; Disclaimer
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenModal?.('feedback')}
              className="px-3 py-1.5 bg-[#38BDF8] text-black font-mono font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Feedback</span>
            </button>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-[#FACC15]" />
            <h2 className="font-black text-sm uppercase tracking-wider text-black dark:text-white">
              Mission Statement
            </h2>
          </div>
          <div className="p-4 sm:p-6 bg-neutral-100 dark:bg-[#161B22] border-2 border-black dark:border-neutral-700 space-y-3">
            <p className="text-sm sm:text-base font-bold text-black dark:text-white leading-relaxed">
              Fan Hub Plus is an all-in-one fandom portal designed to eliminate fragmented communities,
              toxic algorithm feeds, and clickbait advertisements. We unify eight specialized universe
              silos — Anime, Gaming, Movies &amp; TV, K-Pop, Comics, Manga, Cosplay, and the Community Vault —
              into a single zero-tracking, zero-clutter experience for fandom enthusiasts worldwide.
            </p>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
              Built as an end-to-end Single Page Application (SPA) leveraging React 19, Tailwind CSS,
              Lucide React, and Django REST Framework. This project was developed as an Aptech
              programming initiative to demonstrate full-stack web application best practices,
              real-time state management, and accessible design under strict copyright compliance constraints.
            </p>
          </div>
        </div>

        {/* Copyright Disclaimer */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-[#F43F5E]" />
            <h2 className="font-black text-sm uppercase tracking-wider text-black dark:text-white">
              Legal Disclaimer (Per SRS Section 1.5)
            </h2>
          </div>
          <div className="p-4 sm:p-6 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-100 space-y-4">
            {DISCLAIMER_SECTIONS.map((section) => (
              <div key={section.title} className="border-b border-black/10 dark:border-neutral-800 pb-3 last:border-0">
                <h3 className="font-black text-xs uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                  {section.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team / Developer Info */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-[#A3E635]" />
            <h2 className="font-black text-sm uppercase tracking-wider text-black dark:text-white">
              Development Team
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-3 p-3 bg-neutral-100 dark:bg-[#161B22] border-2 border-black dark:border-neutral-700"
              >
                <span
                  className="w-3 h-3 shrink-0 border border-black"
                  style={{ backgroundColor: member.color }}
                />
                <div className="min-w-0">
                  <span className="font-black text-xs uppercase text-black dark:text-white block">
                    {member.name}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-[#FACC15]/10 dark:bg-[#FACC15]/5 border-2 border-dashed border-black dark:border-neutral-700 text-xs font-mono">
            <span className="font-black uppercase text-black dark:text-white">
              Project Affiliation:
            </span>{' '}
            <span className="text-neutral-700 dark:text-neutral-300">
              Aptech Certificate in Software Development — Fan Hub Plus Capstone
            </span>
          </div>
        </div>

        {/* Contact & Feedback */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-[#FACC15]" />
            <h2 className="font-black text-sm uppercase tracking-wider text-black dark:text-white">
              Contact &amp; Support
            </h2>
          </div>
          <div className="p-4 sm:p-6 bg-neutral-100 dark:bg-[#161B22] border-2 border-black dark:border-neutral-700 space-y-3 text-xs sm:text-sm">
            <p className="text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
              Have a bug to report, a lore correction, or a copyright concern? Use the
              <strong className="text-black dark:text-white"> Dynamic Feedback Form </strong>
              to submit a ticket directly to our Admin Moderation Queue. Our team reviews all submissions
              within 48 business hours.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => onOpenModal?.('feedback')}
                className="px-3 py-1.5 bg-[#38BDF8] text-black font-mono font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Feedback Form</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateHome?.()}
                className="px-3 py-1.5 bg-black text-[#FACC15] font-mono font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Tagline */}
        <div className="border-t-2 border-black dark:border-neutral-700 pt-4 text-center">
          <p className="text-[10px] sm:text-xs font-mono font-black uppercase text-neutral-500">
            © 2026 Fan Hub Plus • All Rights Reserved • Educational Fan Project • Zero Trackers • Zero Clutter
          </p>
        </div>
      </div>
    </section>
  )
}

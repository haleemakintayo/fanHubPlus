import { useState, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Bookmark, 
  Star, 
  Heart, 
  SkipForward, 
  SkipBack, 
  Music, 
  Radio, 
  Disc, 
  Check
} from 'lucide-react'


export default function MultimediaCenter({ 
  multimediaData, 
  onShowToast, 
  bookmarkedItems, 
  toggleBookmark 
}) {
  const { trailers, audioTracks } = multimediaData

  // Video Player State
  const [selectedTrailerIndex, setSelectedTrailerIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [videoProgress, setVideoProgress] = useState(35) // percent
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const activeTrailer = trailers[selectedTrailerIndex]

  // Audio Streamer State
  const [activeTrackIndex, setActiveTrackIndex] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [audioCurrentTime, setAudioCurrentTime] = useState(42) // seconds
  const [likedTracks, setLikedTracks] = useState({ 'kpop-supernova': true })

  const activeTrack = audioTracks[activeTrackIndex]

  // Video progress timer simulation
  useEffect(() => {
    let interval
    if (isVideoPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => (prev >= 100 ? 0 : prev + 1))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isVideoPlaying])

  // Audio progress timer simulation
  useEffect(() => {
    let interval
    if (isAudioPlaying) {
      interval = setInterval(() => {
        setAudioCurrentTime((prev) => {
          if (prev >= activeTrack.durationSec) {
            // loop or advance
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isAudioPlaying, activeTrack.durationSec])

  // Handle rating click
  const handleRate = (stars) => {
    setUserRating(stars)
    onShowToast({
      title: 'Rating Submitted!',
      message: `You rated "${activeTrailer.title}" ${stars} out of 5 stars.`,
      type: 'success'
    })
  }

  // Handle track like toggle
  const handleToggleLike = (trackId, trackTitle) => {
    const isLiked = !likedTracks[trackId]
    setLikedTracks((prev) => ({ ...prev, [trackId]: isLiked }))
    onShowToast({
      title: isLiked ? 'Track Favorited' : 'Removed from Favorites',
      message: `"${trackTitle}" ${isLiked ? 'added to your audio collection' : 'removed'}.`,
      type: isLiked ? 'pink' : 'info'
    })
  }

  const formatSeconds = (sec) => {
    const mins = Math.floor(sec / 60)
    const rem = sec % 60
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`
  }

  const isTrailerBookmarked = !!bookmarkedItems[activeTrailer.id]

  return (
    <section id="multimedia" className="py-8 sm:py-16 px-3 sm:px-6 lg:px-8 border-b-2 border-black dark:border-neutral-100 bg-[#FDFBF7] dark:bg-[#0D1117] transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <span className="bg-[#FB923C] text-black font-black text-[10px] sm:text-xs uppercase px-2 sm:px-2.5 py-0.5 border-2 border-black brutal-shadow-sm">
              AUDIOVISUAL VAULT
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
              ZERO-BUFFER REPLAY
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
            STREAM & DISCOVER
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 font-medium text-xs sm:text-sm md:text-base mt-1 max-w-2xl">
            Trailers, original soundtracks, and animated explainers without leaving the page.
          </p>
        </div>

        {/* Two-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">

          {/* ================= LEFT: VIDEO PLAYER COMPONENT (7 COLS) ================= */}
          <div className="lg:col-span-7 bg-white dark:bg-[#161B22] border-3 border-black dark:border-white brutal-shadow-lg p-3 sm:p-4 md:p-6 flex flex-col">
            
            {/* Player Top Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-black dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <span 
                  className="font-mono text-xs font-black uppercase px-2.5 py-1 border-2 border-black text-black"
                  style={{ backgroundColor: activeTrailer.universeColor }}
                >
                  {activeTrailer.universe}
                </span>
                <span className="font-mono text-xs font-bold px-2 py-1 bg-black text-[#A3E635] border border-black">
                  4K CANON TEASER
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(activeTrailer.id, activeTrailer.title, 'Trailer')}
                  className={`p-1.5 border-2 border-black dark:border-white brutal-shadow-sm brutal-btn ${
                    isTrailerBookmarked 
                      ? 'bg-[#F43F5E] text-white' 
                      : 'bg-white dark:bg-[#0D1117] text-black dark:text-white'
                  }`}
                  aria-label={isTrailerBookmarked ? 'Remove trailer bookmark' : 'Bookmark trailer'}
                  title="Bookmark Trailer"
                >
                  <Bookmark className={`w-4 h-4 ${isTrailerBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Video Canvas Simulation */}
            <div className="relative aspect-video w-full bg-black border-2 border-black overflow-hidden group">
              <img 
                src={activeTrailer.videoThumbnail} 
                alt={activeTrailer.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isVideoPlaying ? 'opacity-80 scale-[1.02]' : 'opacity-90'
                }`}
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

              {/* Center Play/Pause Large Action Button */}
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 bg-[#FACC15] text-black border-3 border-black rounded-none flex items-center justify-center brutal-shadow-md brutal-btn group-hover:scale-105 transition-transform z-20"
                aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
              >
                {isVideoPlaying ? (
                  <Pause className="w-8 h-8 fill-black" />
                ) : (
                  <Play className="w-8 h-8 fill-black translate-x-0.5" />
                )}
              </button>

              {/* Top Banner on video */}
              <div className="absolute top-3 left-3 z-10">
                <span className="font-mono text-[11px] font-black uppercase bg-black text-white px-2 py-0.5 border border-white/40">
                  {isVideoPlaying ? '● LIVE STREAMING' : 'READY TO PLAY'}
                </span>
              </div>

              {/* Bottom Video Controls Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-black/90 border-t-2 border-white/20 p-2 sm:p-3 flex flex-col gap-2 z-20">
                
                {/* Scrubber Progress Bar */}
                <div 
                  className="w-full bg-neutral-700 h-2 cursor-pointer border border-white/30 relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const clickX = e.clientX - rect.left
                    const newProgress = Math.round((clickX / rect.width) * 100)
                    setVideoProgress(newProgress)
                  }}
                  role="progressbar"
                  aria-valuenow={videoProgress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div 
                    className="bg-[#A3E635] h-full transition-all duration-150"
                    style={{ width: `${videoProgress}%` }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border border-black shadow"
                    style={{ left: `calc(${videoProgress}% - 7px)` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="text-[#FACC15] hover:text-white"
                      aria-label={isVideoPlaying ? 'Pause' : 'Play'}
                    >
                      {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setIsVideoMuted(!isVideoMuted)}
                      className="hover:text-[#38BDF8]"
                      aria-label={isVideoMuted ? 'Unmute' : 'Mute'}
                    >
                      {isVideoMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="font-bold text-[11px]">
                      {formatSeconds(Math.floor((videoProgress / 100) * 165))} / {activeTrailer.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-neutral-300 hidden sm:inline">
                      {activeTrailer.views}
                    </span>
                    <button 
                      onClick={() => {
                        onShowToast({
                          title: 'Fullscreen Mode',
                          message: 'Theater viewport simulation active.',
                          type: 'info'
                        })
                      }}
                      className="hover:text-[#FACC15]"
                      aria-label="Maximize player"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Video Details & Interactive 5-Star Rating Widget */}
            <div className="mt-5 space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                  {activeTrailer.title}
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-medium mt-1 leading-relaxed">
                  {activeTrailer.synopsis}
                </p>
              </div>

              {/* 5-Star Rating Bar */}
              <div className="p-3 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono font-black uppercase text-neutral-500 block">
                    COMMUNITY CRITIC SCORE
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-black text-lg text-black dark:text-white">
                      {(activeTrailer.rating + (userRating > 0 ? 0.05 : 0)).toFixed(1)}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      ★ ({activeTrailer.ratingsCount + (userRating > 0 ? 1 : 0)} votes)
                    </span>
                  </div>
                </div>

                {/* Star rating buttons */}
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold uppercase mr-1 text-black dark:text-white">
                    Rate:
                  </span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRate(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-black dark:text-white hover:scale-125 transition-transform"
                      aria-label={`Rate ${star} star`}
                    >
                      <Star 
                        className={`w-5 h-5 ${
                          (hoverRating || userRating) >= star 
                            ? 'fill-[#FACC15] text-[#FACC15]' 
                            : 'text-neutral-400'
                        }`} 
                      />
                    </button>
                  ))}
                  {userRating > 0 && (
                    <span className="ml-1 text-xs font-black uppercase text-[#10B981] flex items-center gap-0.5">
                      <Check className="w-3.5 h-3.5" /> Saved!
                    </span>
                  )}
                </div>
              </div>

              {/* Trailer Selector Tabs */}
              <div className="pt-2">
                <span className="font-mono text-xs font-black uppercase text-neutral-500 block mb-2">
                  SELECT TRAILER CHANNEL
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {trailers.map((t, idx) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setSelectedTrailerIndex(idx)
                        setIsVideoPlaying(false)
                        setVideoProgress(0)
                        setUserRating(0)
                      }}
                      className={`p-2 text-left border-2 border-black dark:border-neutral-600 transition-all text-xs font-bold uppercase truncate ${
                        selectedTrailerIndex === idx
                          ? 'bg-[#FACC15] text-black brutal-shadow-sm font-black'
                          : 'bg-white dark:bg-[#0D1117] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      {idx + 1}. {t.title.split('-')[0]}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* ================= RIGHT: SOUNDTRACK & AUDIO STREAMER (5 COLS) ================= */}
          <div className="lg:col-span-5 bg-white dark:bg-[#161B22] border-3 border-black dark:border-white brutal-shadow-lg p-4 sm:p-6 flex flex-col justify-between">
            
            {/* Audio Streamer Header */}
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b-2 border-black dark:border-neutral-700 mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#F43F5E] text-white border-2 border-black brutal-shadow-sm">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg uppercase tracking-tight text-black dark:text-white leading-tight">
                      FANDOM AUDIO STREAM
                    </h3>
                    <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase">
                      Lossless 24-bit • Master Stems
                    </span>
                  </div>
                </div>

                {/* Animated Waveform Bars (Active when playing) */}
                <div className="flex items-end gap-1 h-6 px-2 bg-neutral-100 dark:bg-[#0D1117] border border-black dark:border-neutral-700">
                  <div className={`w-1 bg-[#F43F5E] ${isAudioPlaying ? 'wave-bar-1' : 'h-1'}`} />
                  <div className={`w-1 bg-[#FACC15] ${isAudioPlaying ? 'wave-bar-2' : 'h-2'}`} />
                  <div className={`w-1 bg-[#A3E635] ${isAudioPlaying ? 'wave-bar-3' : 'h-1.5'}`} />
                  <div className={`w-1 bg-[#38BDF8] ${isAudioPlaying ? 'wave-bar-4' : 'h-3'}`} />
                  <div className={`w-1 bg-[#C084FC] ${isAudioPlaying ? 'wave-bar-5' : 'h-1'}`} />
                  <div className={`w-1 bg-[#FB923C] ${isAudioPlaying ? 'wave-bar-6' : 'h-2'}`} />
                </div>
              </div>

              {/* Now Playing Featured Card */}
              <div className="p-4 border-2 border-black dark:border-white bg-[#FDFBF7] dark:bg-[#0D1117] brutal-shadow-sm mb-6 relative">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-2 border-black shrink-0 overflow-hidden group">
                    <img 
                      src={activeTrack.cover} 
                      alt={activeTrack.title}
                      className={`w-full h-full object-cover ${isAudioPlaying ? 'rotate-3 scale-105' : ''} transition-transform`}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Disc className={`w-6 h-6 text-white ${isAudioPlaying ? 'animate-spin' : ''}`} />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <span 
                      className="font-mono text-[10px] font-black uppercase px-2 py-0.5 border border-black inline-block text-black mb-1"
                      style={{ backgroundColor: activeTrack.categoryColor }}
                    >
                      {activeTrack.category}
                    </span>
                    <h4 className="font-black text-base sm:text-lg uppercase tracking-tight text-black dark:text-white truncate">
                      {activeTrack.title}
                    </h4>
                    <p className="font-medium text-xs text-neutral-600 dark:text-neutral-400 truncate">
                      {activeTrack.artist} • {activeTrack.album}
                    </p>
                  </div>
                </div>

                {/* Progress bar for audio */}
                <div className="mt-4">
                  <div 
                    className="w-full bg-neutral-300 dark:bg-neutral-800 h-2 cursor-pointer border border-black dark:border-white relative"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const clickX = e.clientX - rect.left
                      const percent = clickX / rect.width
                      setAudioCurrentTime(Math.floor(percent * activeTrack.durationSec))
                    }}
                  >
                    <div 
                      className="bg-[#F43F5E] h-full"
                      style={{ width: `${(audioCurrentTime / activeTrack.durationSec) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold mt-1 text-neutral-600 dark:text-neutral-400">
                    <span>{formatSeconds(audioCurrentTime)}</span>
                    <span>{activeTrack.duration}</span>
                  </div>
                </div>

                {/* Audio Master Controls */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/10 dark:border-neutral-800">
                  <button
                    onClick={() => handleToggleLike(activeTrack.id, activeTrack.title)}
                    className="p-1.5 hover:scale-110 transition-transform"
                    aria-label="Favorite track"
                  >
                    <Heart 
                      className={`w-5 h-5 ${likedTracks[activeTrack.id] ? 'fill-[#F43F5E] text-[#F43F5E]' : 'text-neutral-500'}`} 
                    />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const prev = activeTrackIndex === 0 ? audioTracks.length - 1 : activeTrackIndex - 1
                        setActiveTrackIndex(prev)
                        setAudioCurrentTime(0)
                      }}
                      className="p-2 border-2 border-black dark:border-white bg-white dark:bg-[#161B22] text-black dark:text-white brutal-shadow-sm brutal-btn"
                      aria-label="Previous track"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                      className="px-5 py-2 border-2 border-black bg-[#A3E635] text-black font-black text-xs uppercase brutal-shadow-sm brutal-btn flex items-center gap-1.5"
                      aria-label={isAudioPlaying ? 'Pause audio' : 'Play audio'}
                    >
                      {isAudioPlaying ? (
                        <>
                          <Pause className="w-4 h-4 fill-black" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-black" />
                          <span>Play</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        const next = activeTrackIndex === audioTracks.length - 1 ? 0 : activeTrackIndex + 1
                        setActiveTrackIndex(next)
                        setAudioCurrentTime(0)
                      }}
                      className="p-2 border-2 border-black dark:border-white bg-white dark:bg-[#161B22] text-black dark:text-white brutal-shadow-sm brutal-btn"
                      aria-label="Next track"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="font-mono text-xs text-neutral-500 font-bold">
                    ❤️ {activeTrack.likes}
                  </span>
                </div>

              </div>

              {/* 3 Interactive Playlist Items */}
              <div className="space-y-2">
                <span className="font-mono text-xs font-black uppercase text-neutral-500 block mb-1">
                  OFFICIAL PLAYLIST QUEUE (3 TRACKS)
                </span>

                {audioTracks.map((track, idx) => {
                  const isCurrent = activeTrackIndex === idx

                  return (
                    <div
                      key={track.id}
                      onClick={() => {
                        setActiveTrackIndex(idx)
                        setAudioCurrentTime(0)
                        setIsAudioPlaying(true)
                      }}
                      className={`p-2.5 border-2 border-black dark:border-neutral-700 flex items-center justify-between gap-3 cursor-pointer transition-all brutal-btn ${
                        isCurrent
                          ? 'bg-[#FDFBF7] dark:bg-[#0D1117] brutal-shadow-sm border-l-6'
                          : 'bg-white dark:bg-[#161B22] hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                      style={{
                        borderLeftColor: isCurrent ? track.categoryColor : undefined
                      }}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-6 text-center font-mono font-black text-xs text-neutral-500">
                          {isCurrent && isAudioPlaying ? (
                            <Radio className="w-4 h-4 text-[#F43F5E] animate-pulse inline" />
                          ) : (
                            `0${idx + 1}`
                          )}
                        </div>
                        <div className="min-w-0">
                          <h5 className="font-black text-xs uppercase tracking-tight text-black dark:text-white truncate">
                            {track.title}
                          </h5>
                          <span className="text-[11px] font-medium text-neutral-500 truncate block">
                            {track.artist}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400">
                          {track.duration}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleLike(track.id, track.title)
                          }}
                          className="p-1 hover:scale-110 transition-transform"
                          aria-label="Toggle track like"
                        >
                          <Heart 
                            className={`w-3.5 h-3.5 ${likedTracks[track.id] ? 'fill-[#F43F5E] text-[#F43F5E]' : 'text-neutral-400'}`} 
                          />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>

            {/* Bottom Stream Note */}
            <div className="mt-4 pt-3 border-t-2 border-black/10 dark:border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Bitrate: 320kbps MP3</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

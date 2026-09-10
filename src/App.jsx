import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useParams } from "react-router-dom";

const FADE_MS = 1200;
const BORDER_SOFT = "border-[#D9DED4]";
const IMAGE_FRAME = "border-[0.17px] border-[#5F665C] p-[1.25px]";

const img = (src, alt) => (
  <img src={src} alt={alt} className={`max-w-full h-auto object-contain ${IMAGE_FRAME}`} />
);

const smallImg = (src, alt) => (
  <img src={src} alt={alt} className={`max-w-full max-h-[28rem] h-auto object-contain ${IMAGE_FRAME}`} />
);

const COLLECTIONS = [
  {
    title: "Minimalism",
    type: "Selected Work",
    tracks: [
      { id: "3", title: "The Liminal Passage", status: "", desc: "", duration: "04.39", audio: "/audio/the-liminal-passage.mp3", image: img("/images/the-liminal-passage.png", "The Liminal Passage") },
      { id: "1", title: "Room in Monterey", status: "", desc: "", duration: "03.12", audio: "/audio/room-in-monterey.mp3", image: img("/images/room-in-monterey.png", "Room in Monterey") },
      { id: "5", title: "Under Currents", status: "", desc: "", duration: "02.46", audio: "/audio/under-currents.mp3", image: smallImg("/images/arab.png", "Under Currents") },
      { id: "9", title: "Watch the Voltage", status: "", desc: "", duration: "03.05", audio: "/audio/watch-the-voltage.mp3", image: img("/images/watch-the-voltage.png", "Watch the Voltage") },
      { id: "15", title: "Auralis", status: "", desc: "", duration: "03.19", audio: "/audio/auralis.mp3", image: img("/images/auralis.png", "Auralis") },
    ],
  },
];

function getImageSrc(track) {
  return track?.image?.props?.src || null;
}

function preloadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve();

    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });
}

function useFadedValue(value) {
  const [displayed, setDisplayed] = useState(value);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (value === displayed) return;

    setFading(true);

    timerRef.current = setTimeout(() => {
      setDisplayed(value);
      setFading(false);
    }, FADE_MS);

    return () => clearTimeout(timerRef.current);
  }, [value, displayed]);

  return [displayed, fading];
}

function ImagePlaceholder({ label = "Image placeholder", tall = false, src = null, alt = "" }) {
  if (src) {
    return (
      <div
        className={`w-full ${
          tall ? "min-h-[18rem] sm:min-h-[24rem]" : "min-h-[12rem] sm:min-h-[16rem]"
        } flex items-center justify-center overflow-hidden`}
      >
        <img
          src={src}
          alt={alt || label}
          className={`w-full h-auto object-contain ${
            tall ? "max-h-[22rem] sm:max-h-[30rem]" : "max-h-[14rem] sm:max-h-[18rem]"
          }`}
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full ${
        tall ? "min-h-[18rem] sm:min-h-[24rem]" : "min-h-[12rem] sm:min-h-[16rem]"
      } ${IMAGE_FRAME} bg-[#F8FBF2] flex items-center justify-center text-[#71786D] text-[0.72rem] uppercase tracking-[0.24em] overflow-hidden`}
    >
      {label}
    </div>
  );
}


const FILM_TRACKS = [
  {
    id: "film-1",
    title: "The Liminal Passage",
    duration: "04.39",
    audio: "/audio/the-liminal-passage.mp3",
    image: "/images/the-liminal-passage.png",
  },
  {
    id: "film-2",
    title: "Room in Monterey",
    duration: "03.12",
    audio: "/audio/room-in-monterey.mp3",
    image: "/images/room-in-monterey.png",
  },
  {
    id: "film-3",
    title: "Under Currents",
    duration: "02.46",
    audio: "/audio/under-currents.mp3",
    image: "/images/arab.png",
  },
  {
    id: "film-4",
    title: "Watch the Voltage",
    duration: "03.05",
    audio: "/audio/watch-the-voltage.mp3",
    image: "/images/watch-the-voltage.png",
  },
  {
    id: "film-5",
    title: "Auralis",
    duration: "03.19",
    audio: "/audio/auralis.mp3",
    image: "/images/auralis.png",
  },
  {
    id: "film-6",
    title: "Suite",
    subtitle: 'FROM STRING QUARTET NO. 2,\n"WHERE I GO YOU CANNOT COME"',
    duration: "03.36",
    audio: "/audio/suite.mp3",
    image: "/images/suite.png",
  },
  { id: "film-7", title: "Nival", duration: "02.36", audio: "/audio/nival.mp3", image: "/images/nival.png" },
  { id: "film-8", title: "Hrim", duration: "03.46", audio: "/audio/hrim.mp3", image: "/images/hrim.png" },
  { id: "film-9", title: "Ridge of Desolation", duration: "02.47", audio: "/audio/ridge-of-desolation.mp3", image: "/images/ridge-of-desolation.png" },
  { id: "film-10", title: "Every Shadow Hides", duration: "02.06", audio: "/audio/every-shadow-hides.mp3", image: "/images/every-shadow-hides.png" },
];

const DCR_TRACKS = [
  {
    id: "dcr-1",
    title: "Shock Protocol",
    duration: "02.02",
    audio: "/audio/shock-protocol.mp3",
    image: "/images/shock-protocol-2.png",
  },
  {
    id: "dcr-2",
    title: "Every Shadow Hides",
    duration: "02.06",
    audio: "/audio/every-shadow-hides.mp3",
    image: "/images/every-shadow-hides.png",
  },
  {
    id: "dcr-3",
    title: "Asura Rising",
    duration: "02.35",
    audio: "/audio/asura-rising.mp3",
    image: "/images/asura-rising 8.png",
  },
  {
    id: "dcr-4",
    title: "Auralis",
    duration: "03.26",
    audio: "/audio/auralis.mp3",
    image: "/images/auralis.png",
  },
  {
    id: "dcr-5",
    title: "Hrim",
    duration: "03.46",
    audio: "/audio/hrim.mp3",
    image: "/images/hrim.png",
  },
];

function DedicatedComposerReelPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [displayedTrack, setDisplayedTrack] = useState(DCR_TRACKS[0]);
  const [artworkVisible, setArtworkVisible] = useState(true);
  const audioRef = useRef(null);
  const selectedTrack = DCR_TRACKS[selectedIndex];

  useEffect(() => {
    if (selectedTrack.id === displayedTrack.id) return;

    let cancelled = false;
    let swapTimer = null;
    const nextArtwork = new Image();

    const beginSwap = () => {
      if (cancelled) return;

      setArtworkVisible(false);
      swapTimer = window.setTimeout(() => {
        if (!cancelled) setDisplayedTrack(selectedTrack);
      }, 650);
    };

    nextArtwork.onload = beginSwap;
    nextArtwork.onerror = beginSwap;
    nextArtwork.src = selectedTrack.image;

    return () => {
      cancelled = true;
      if (swapTimer) window.clearTimeout(swapTimer);
    };
  }, [selectedTrack, displayedTrack]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setArtworkVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, [displayedTrack]);

  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector('meta[name="robots"]');
    const previousRobots = existingRobots?.getAttribute("content") || null;
    const robots = existingRobots || document.createElement("meta");

    document.title = "Additional Composer Reel — Marius Ygre";
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex, nofollow, noarchive");

    if (!existingRobots) document.head.appendChild(robots);

    return () => {
      document.title = previousTitle;
      if (existingRobots && previousRobots !== null) {
        existingRobots.setAttribute("content", previousRobots);
      } else if (!existingRobots) {
        robots.remove();
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    setProgress(0);

    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [selectedIndex]);

  const chooseTrack = (index, shouldPlay = true) => {
    if (index === selectedIndex) {
      if (shouldPlay) {
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) {
          audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        }
      }
      return;
    }

    setSelectedIndex(index);
    setPlaying(shouldPlay);
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const moveTrack = (direction) => {
    const nextIndex = selectedIndex + direction;
    if (nextIndex < 0 || nextIndex >= DCR_TRACKS.length) return;
    setSelectedIndex(nextIndex);
    setPlaying(true);
  };

  const handleEnded = () => {
    if (selectedIndex < DCR_TRACKS.length - 1) {
      setSelectedIndex((current) => current + 1);
      setPlaying(true);
    } else {
      setPlaying(false);
      setProgress(0);
    }
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    if (!audio?.duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * audio.duration;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#EFF4D6] text-[#1A1A1A] font-light">
      <main className="mx-auto max-w-6xl px-5 sm:px-6 pt-7 sm:pt-8 pb-10 sm:pb-12">
        <header className="border-b border-[#D9DED4] pb-7 sm:pb-8">
          <div className="flex items-baseline justify-between gap-5">
            <div className="text-[0.95rem] sm:text-[1.05rem] uppercase tracking-[0.16em] sm:tracking-[0.2em]">
              Marius Ygre
            </div>
            <div className="text-right text-[0.6rem] sm:text-[0.64rem] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#71786D]">
              Private listening page
            </div>
          </div>

          <h1 className="mt-8 sm:mt-10 max-w-4xl text-[1.65rem] sm:text-[2rem] md:text-[2.35rem] leading-[1.12] uppercase tracking-[0.055em] sm:tracking-[0.07em]">
            Additional Composer Reel — Marius Ygre
          </h1>
          <p className="mt-4 sm:mt-5 max-w-[42rem] text-[#5F665C] text-[0.95rem] sm:text-[1rem] leading-[1.75]" style={{ textWrap: "pretty" }}>
            A short selection of recent work across orchestral, electronic and intimate film music, shared as an introduction to my writing and production for potential future collaboration.
          </p>
        </header>

        <section className="pt-8 sm:pt-10 pb-12 sm:pb-16">
          <div className="border border-[#D9DED4] bg-[#F8FBF2] p-5 sm:p-6 md:p-8">
            <h2 className="text-[1.2rem] sm:text-[1.4rem] uppercase tracking-[0.09em] sm:tracking-[0.12em]">
              Selected Work
            </h2>

            <div className="mt-6 sm:mt-7 grid md:grid-cols-12 gap-8 md:gap-10 items-start">
              <div className="md:col-span-3">
                <div className={`transition-opacity duration-[650ms] ease-out ${artworkVisible ? "opacity-100" : "opacity-0"}`}>
                  <ImagePlaceholder
                    src={displayedTrack.image}
                    label={displayedTrack.title}
                    alt={`${displayedTrack.title} artwork`}
                  />
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="text-[0.66rem] uppercase tracking-[0.28em] text-[#71786D]">
                  Now Playing
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-5">
                  <h3 className="text-[1.4rem] sm:text-[1.65rem] leading-[1.25]">{selectedTrack.title}</h3>
                  <span className="text-[0.8rem] text-[#71786D]">{selectedTrack.duration}</span>
                </div>

                <audio
                  ref={audioRef}
                  src={selectedTrack.audio}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={handleEnded}
                  onTimeUpdate={(event) => {
                    const audio = event.currentTarget;
                    setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
                  }}
                />

                <button type="button" onClick={handleSeek} className="mt-8 w-full h-[5px] flex items-center" aria-label="Seek within track">
                  <span className="block w-full h-[1px] bg-[#D7DDD1] overflow-hidden">
                    <span className="block h-full bg-[#1A1A1A] transition-all duration-200 ease-out" style={{ width: `${progress}%` }} />
                  </span>
                </button>

                <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
                  <button type="button" onClick={() => moveTrack(-1)} disabled={selectedIndex === 0} className="text-[0.72rem] uppercase tracking-[0.24em] text-[#5F665C] hover:text-[#1A1A1A] disabled:opacity-30">
                    Previous
                  </button>
                  <button type="button" onClick={togglePlayback} className="w-16 h-16 rounded-full border border-[#1A1A1A] flex items-center justify-center text-[0.72rem] uppercase tracking-[0.18em] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500">
                    {playing ? "Pause" : "Play"}
                  </button>
                  <button type="button" onClick={() => moveTrack(1)} disabled={selectedIndex === DCR_TRACKS.length - 1} className="text-[0.72rem] uppercase tracking-[0.24em] text-[#5F665C] hover:text-[#1A1A1A] disabled:opacity-30">
                    Next
                  </button>
                </div>
              </div>

              <div className="md:col-span-4 md:border-l md:border-[#D9DED4] md:pl-8">
                <ol className="space-y-3">
                  {DCR_TRACKS.map((track, index) => (
                    <li key={track.id}>
                      <button type="button" onClick={() => chooseTrack(index)} className={`w-full grid grid-cols-[1.65rem_minmax(0,1fr)_auto] sm:grid-cols-[2rem_minmax(0,1fr)_auto] gap-3 sm:gap-4 text-left items-baseline py-1 transition-colors duration-300 ${index === selectedIndex ? "text-[#1A1A1A]" : "text-[#5F665C] hover:text-[#1A1A1A]"}`}>
                        <span className="text-[0.72rem] tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                        <span className="text-[0.95rem] min-w-0 break-words">{track.title}</span>
                        <span className="text-[0.8rem] text-[#71786D]">{track.duration}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#D9DED4] pt-6 text-[0.64rem] uppercase tracking-[0.24em] text-[#71786D]">
          © Marius Ygre
        </footer>
      </main>
    </div>
  );
}

function CustomOutreachReelPage() {
  const { reelSlug = "" } = useParams();
  const [primaryTracks, setPrimaryTracks] = useState([]);
  const [moreTracks, setMoreTracks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayedTrack, setDisplayedTrack] = useState(null);
  const [artworkVisible, setArtworkVisible] = useState(true);
  const [moreOpen, setMoreOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadState, setLoadState] = useState("loading");
  const audioRef = useRef(null);
  const allTracks = [...primaryTracks, ...moreTracks];
  const selectedTrack = allTracks[selectedIndex] || null;

  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector('meta[name="robots"]');
    const previousRobots = existingRobots?.getAttribute("content") || null;
    const robots = existingRobots || document.createElement("meta");
    document.title = "Private Selected Work — Marius Ygre";
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex, nofollow, noarchive, noimageindex");
    if (!existingRobots) document.head.appendChild(robots);
    return () => {
      document.title = previousTitle;
      if (existingRobots && previousRobots !== null) existingRobots.setAttribute("content", previousRobots);
      else if (!existingRobots) robots.remove();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const slug = String(reelSlug || "").trim().toLowerCase();
    if (!/^[a-z][a-z0-9]*$/.test(slug)) {
      const timer = window.setTimeout(() => setLoadState("missing"), 0);
      return () => window.clearTimeout(timer);
    }
    Promise.all([
      fetch("/data/web-track-catalog.json", { cache: "no-store" }),
      fetch(`/reels/${encodeURIComponent(slug)}.json`, { cache: "no-store" }),
    ])
      .then(async ([catalogResponse, reelResponse]) => {
        if (!catalogResponse.ok || !reelResponse.ok) throw new Error("not-found");
        return Promise.all([catalogResponse.json(), reelResponse.json()]);
      })
      .then(([catalog, reel]) => {
        if (cancelled || String(reel.slug || "").toLowerCase() !== slug) return;
        const byId = new Map((catalog.tracks || []).map((track) => [track.id, track]));
        const used = new Set();
        const resolve = (ids) => (ids || []).map((id) => byId.get(id)).filter((track) => {
          if (!track || used.has(track.id)) return false;
          used.add(track.id);
          return true;
        });
        const selected = resolve(reel.selected_works).slice(0, 5);
        const additional = resolve(reel.more).slice(0, 5);
        if (!selected.length) throw new Error("empty");
        setPrimaryTracks(selected);
        setMoreTracks(additional);
        setSelectedIndex(0);
        setDisplayedTrack(selected[0]);
        setLoadState("ready");
      })
      .catch(() => { if (!cancelled) setLoadState("missing"); });
    return () => { cancelled = true; };
  }, [reelSlug]);

  useEffect(() => {
    if (!selectedTrack || selectedTrack.id === displayedTrack?.id) return;
    let cancelled = false;
    let swapTimer = null;
    const nextArtwork = new Image();
    const beginSwap = () => {
      if (cancelled) return;
      setArtworkVisible(false);
      swapTimer = window.setTimeout(() => { if (!cancelled) setDisplayedTrack(selectedTrack); }, 650);
    };
    nextArtwork.onload = beginSwap;
    nextArtwork.onerror = beginSwap;
    nextArtwork.src = selectedTrack.image;
    return () => { cancelled = true; if (swapTimer) window.clearTimeout(swapTimer); };
  }, [selectedTrack, displayedTrack]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setArtworkVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, [displayedTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !selectedTrack) return;
    audio.load();
    setProgress(0);
    if (playing) audio.play().catch(() => setPlaying(false));
  }, [selectedIndex]);

  const chooseTrack = (track) => {
    const index = allTracks.findIndex((item) => item.id === track.id);
    if (index < 0) return;
    if (index === selectedIndex) {
      const audio = audioRef.current;
      if (audio?.paused) audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      return;
    }
    setSelectedIndex(index);
    setPlaying(true);
  };
  const moveTrack = (direction) => {
    if (!selectedTrack) return;
    const inPrimary = selectedIndex < primaryTracks.length;
    const start = inPrimary ? 0 : primaryTracks.length;
    const end = inPrimary ? primaryTracks.length - 1 : allTracks.length - 1;
    const next = selectedIndex + direction;
    if (next >= start && next <= end) { setSelectedIndex(next); setPlaying(true); }
  };
  const handleEnded = () => {
    const inPrimary = selectedIndex < primaryTracks.length;
    const end = inPrimary ? primaryTracks.length - 1 : allTracks.length - 1;
    if (selectedIndex < end) { setSelectedIndex((current) => current + 1); setPlaying(true); }
    else { setPlaying(false); setProgress(0); }
  };
  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else { audio.pause(); setPlaying(false); }
  };
  const handleSeek = (event) => {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * audio.duration;
  };

  if (loadState !== "ready" || !selectedTrack || !displayedTrack) {
    return <div className="min-h-screen bg-[#EFF4D6] text-[#1A1A1A] font-light"><main className="mx-auto max-w-3xl px-5 sm:px-6 py-16 sm:py-24"><div className="text-[0.95rem] sm:text-[1.05rem] uppercase tracking-[0.2em]">Marius Ygre</div><div className="mt-12 border border-[#D9DED4] bg-[#F8FBF2] p-7 sm:p-10"><div className="text-[0.66rem] uppercase tracking-[0.28em] text-[#71786D]">Private listening page</div><h1 className="mt-5 text-[1.55rem] sm:text-[2rem] uppercase tracking-[0.07em]">{loadState === "loading" ? "Preparing selected work" : "This listening page is unavailable"}</h1>{loadState === "missing" && <p className="mt-5 text-[#5F665C] leading-[1.75]">Please check the link in the original message.</p>}</div></main></div>;
  }

  const inPrimary = selectedIndex < primaryTracks.length;
  const previousDisabled = inPrimary ? selectedIndex === 0 : selectedIndex === primaryTracks.length;
  const nextDisabled = inPrimary ? selectedIndex === primaryTracks.length - 1 : selectedIndex === allTracks.length - 1;
  const renderTrack = (track, index, offset = 0) => {
    const absoluteIndex = index + offset;
    return <li key={track.id}><button type="button" onClick={() => chooseTrack(track)} className={`w-full grid grid-cols-[1.65rem_minmax(0,1fr)_auto] sm:grid-cols-[2rem_minmax(0,1fr)_auto] gap-3 sm:gap-4 text-left items-baseline py-1 transition-colors duration-300 ${absoluteIndex === selectedIndex ? "text-[#1A1A1A]" : "text-[#5F665C] hover:text-[#1A1A1A]"}`}><span className="text-[0.72rem] tabular-nums">{String(absoluteIndex + 1).padStart(2, "0")}</span><span className="text-[0.95rem] min-w-0 break-words">{track.title}</span><span className="text-[0.8rem] text-[#71786D]">{track.duration}</span></button></li>;
  };

  return <div className="min-h-screen overflow-x-hidden bg-[#EFF4D6] text-[#1A1A1A] font-light"><main className="mx-auto max-w-6xl px-5 sm:px-6 pt-7 sm:pt-8 pb-10 sm:pb-12"><header className="border-b border-[#D9DED4] pb-7 sm:pb-8"><div className="flex items-baseline justify-between gap-5"><div className="text-[0.95rem] sm:text-[1.05rem] uppercase tracking-[0.16em] sm:tracking-[0.2em]">Marius Ygre</div><div className="text-right text-[0.64rem] uppercase tracking-[0.24em] text-[#71786D]">Private listening page</div></div><h1 className="mt-8 sm:mt-10 text-[1.65rem] sm:text-[2rem] md:text-[2.35rem] leading-[1.12] uppercase tracking-[0.055em] sm:tracking-[0.07em]">Selected Work — Marius Ygre</h1><p className="mt-4 sm:mt-5 max-w-[42rem] text-[#5F665C] text-[1rem] leading-[1.75]">A focused selection of music for film and visual storytelling.</p></header><section className="pt-8 sm:pt-10 pb-12 sm:pb-16"><div className="border border-[#D9DED4] bg-[#F8FBF2] p-5 sm:p-6 md:p-8"><h2 className="text-[1.2rem] sm:text-[1.4rem] uppercase tracking-[0.09em] sm:tracking-[0.12em]">Selected Works</h2><div className="mt-6 sm:mt-7 grid md:grid-cols-12 gap-8 md:gap-10 items-start"><div className="md:col-span-3"><div className={`transition-opacity duration-[650ms] ease-out ${artworkVisible ? "opacity-100" : "opacity-0"}`}><ImagePlaceholder src={displayedTrack.image} label={displayedTrack.title} alt={`${displayedTrack.title} artwork`} /></div></div><div className="md:col-span-5"><div className="text-[0.66rem] uppercase tracking-[0.28em] text-[#71786D]">Now Playing</div><div className="mt-4 flex items-baseline justify-between gap-5"><h3 className="text-[1.4rem] sm:text-[1.65rem] leading-[1.25]">{selectedTrack.title}</h3><span className="text-[0.8rem] text-[#71786D]">{selectedTrack.duration}</span></div>{selectedTrack.subtitle && <div className="mt-2 text-[0.66rem] uppercase tracking-[0.22em] text-[#71786D] leading-[1.6] whitespace-pre-line">{selectedTrack.subtitle}</div>}<audio ref={audioRef} src={selectedTrack.audio} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={handleEnded} onTimeUpdate={(event) => { const audio = event.currentTarget; setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0); }} /><button type="button" onClick={handleSeek} className="mt-8 w-full h-[5px] flex items-center" aria-label="Seek within track"><span className="block w-full h-[1px] bg-[#D7DDD1] overflow-hidden"><span className="block h-full bg-[#1A1A1A] transition-all duration-200 ease-out" style={{ width: `${progress}%` }} /></span></button><div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5"><button type="button" onClick={() => moveTrack(-1)} disabled={previousDisabled} className="text-[0.72rem] uppercase tracking-[0.24em] text-[#5F665C] hover:text-[#1A1A1A] disabled:opacity-30">Previous</button><button type="button" onClick={togglePlayback} className="w-16 h-16 rounded-full border border-[#1A1A1A] flex items-center justify-center text-[0.72rem] uppercase tracking-[0.18em] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500">{playing ? "Pause" : "Play"}</button><button type="button" onClick={() => moveTrack(1)} disabled={nextDisabled} className="text-[0.72rem] uppercase tracking-[0.24em] text-[#5F665C] hover:text-[#1A1A1A] disabled:opacity-30">Next</button></div></div><div className="md:col-span-4 md:border-l md:border-[#D9DED4] md:pl-8"><ol className="space-y-3">{primaryTracks.map((track, index) => renderTrack(track, index))}</ol>{moreTracks.length > 0 && <div className="mt-5 border-t border-[#D9DED4] pt-4"><button type="button" onClick={() => { if (moreOpen && !inPrimary) { setSelectedIndex(0); setPlaying(false); } setMoreOpen((open) => !open); }} className="w-full flex items-center justify-between text-[0.7rem] uppercase tracking-[0.24em] text-[#5F665C] hover:text-[#1A1A1A] transition-colors duration-300"><span>{moreOpen ? "Less" : "More"}</span><span aria-hidden="true">{moreOpen ? "−" : "+"}</span></button>{moreOpen && <div className="mt-4"><div className="mb-3 text-[0.62rem] uppercase tracking-[0.22em] text-[#71786D]">Additional Work</div><ol className="space-y-3">{moreTracks.map((track, index) => renderTrack(track, index, primaryTracks.length))}</ol></div>}</div>}</div></div></div></section><footer className="border-t border-[#D9DED4] pt-6 text-[0.64rem] uppercase tracking-[0.24em] text-[#71786D]">© Marius Ygre</footer></main></div>;
}

function FilmPage() {
  const [playingId, setPlayingId] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(FILM_TRACKS[0]);
  const [progressById, setProgressById] = useState({});
  const [filmMoreOpen, setFilmMoreOpen] = useState(false);
  const audioRefs = useRef({});
  const visibleFilmTracks = filmMoreOpen ? FILM_TRACKS : FILM_TRACKS.slice(0, 5);

  const pauseAllExcept = (trackId) => {
    Object.entries(audioRefs.current).forEach(([id, audio]) => {
      if (audio && id !== trackId) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const getNextTrack = (trackId) => {
    const index = visibleFilmTracks.findIndex((track) => track.id === trackId);
    if (index === -1) return null;
    return visibleFilmTracks[index + 1] || null;
  };

  const playTrack = (track, reset = false) => {
    const audio = audioRefs.current[track.id];
    if (!audio) return;

    pauseAllExcept(track.id);
    setSelectedTrack(track);

    if (reset) {
      audio.currentTime = 0;
    }

    audio.play();
    setPlayingId(track.id);
  };

  const playOrPauseTrack = (track) => {
    const audio = audioRefs.current[track.id];
    if (!audio) return;

    pauseAllExcept(track.id);
    setSelectedTrack(track);

    if (playingId === track.id) {
      audio.pause();
      setPlayingId(null);
    } else {
      audio.play();
      setPlayingId(track.id);
    }
  };

  const handleTrackEnded = (track) => {
    setProgressById((prev) => ({ ...prev, [track.id]: 0 }));

    const nextTrack = getNextTrack(track.id);

    if (nextTrack) {
      setTimeout(() => {
        playTrack(nextTrack, true);
      }, 150);
    } else {
      setPlayingId(null);
    }
  };

  const smoothScrollToId = (id, duration = 1150) => {
    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = 92;
    const startY = window.scrollY;
    const targetY =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleSeek = (track, event) => {
    const audio = audioRefs.current[track.id];
    if (!audio || !audio.duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const percentage = Math.min(
      Math.max((event.clientX - rect.left) / rect.width, 0),
      1
    );

    audio.currentTime = percentage * audio.duration;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#EFF4D6] text-[#1A1A1A] font-light">
      <header className="mx-auto max-w-6xl px-5 sm:px-6 pt-7 sm:pt-8 pb-5 sm:pb-6 flex items-center justify-between border-b border-[#D9DED4]">
        <button
          type="button"
          onClick={() => smoothScrollToId("film-home", 1200)}
          className="text-[0.95rem] sm:text-[1.1rem] tracking-[0.16em] sm:tracking-[0.22em] uppercase"
        >
          Marius Ygre
        </button>

        <nav className="hidden md:flex items-center gap-10 text-[0.68rem] uppercase tracking-[0.22em] text-[#5F665C]">
          <button
            type="button"
            onClick={() => smoothScrollToId("film-home", 1200)}
            className="hover:text-[#1A1A1A] transition-colors duration-300"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => smoothScrollToId("film-story", 1200)}
            className="hover:text-[#1A1A1A] transition-colors duration-300"
          >
            Film
          </button>

          <button
            type="button"
            onClick={() => smoothScrollToId("selected-work", 1200)}
            className="hover:text-[#1A1A1A] transition-colors duration-300"
          >
            Music
          </button>

          <button
            type="button"
            onClick={() => smoothScrollToId("contact", 1200)}
            className="hover:text-[#1A1A1A] transition-colors duration-300"
          >
            Contact
          </button>
        </nav>
      </header>

      <section
        id="film-home"
        className="mx-auto max-w-6xl px-5 sm:px-6 pt-14 sm:pt-16 pb-16 sm:pb-20 grid md:grid-cols-12 gap-10 md:gap-16 items-center"
      >
        <div className="md:col-span-7">
          <div className="text-[0.66rem] sm:text-[0.76rem] md:text-[0.82rem] uppercase tracking-[0.18em] sm:tracking-[0.26em] md:tracking-[0.32em] text-[#5F665C] font-medium leading-[1.9]">
            <div>COMPOSER • PIANIST • PRODUCER</div>
            <div>200M+ streams as Madden</div>
          </div>

          <h1 className="mt-5 text-[2.35rem] sm:text-5xl md:text-[4.1rem] leading-[1.08] uppercase tracking-[0.055em] sm:tracking-[0.07em] md:tracking-[0.08em]">
            Music for Visual Storytelling
          </h1>

          <div className="mt-8 w-16 h-[1px] bg-[#5F665C]" />

          <p className="mt-8 max-w-[37rem] text-[#5F665C] text-[1rem] sm:text-[1.02rem] leading-[1.85]" style={{ textWrap: "pretty" }}>
            Original music for film, documentaries and visual storytelling.
            <br />
            Composer-led production from first idea to polished, mix-ready sound.
          </p>
        </div>

        <div className="md:col-span-5 w-full flex justify-center">
          <img
            src="/images/profile-image-3.jpg"
            alt="Marius Ygre"
            className={`w-full max-w-[28rem] md:max-w-none h-auto object-contain ${IMAGE_FRAME}`}
          />
        </div>
      </section>

      <section id="selected-work" className="mx-auto max-w-6xl px-5 sm:px-6 pb-20">
        <div className="border border-[#D9DED4] bg-[#F8FBF2] p-5 sm:p-6 md:p-8">
          <h2 className="text-[1.35rem] sm:text-[1.65rem] uppercase tracking-[0.09em] sm:tracking-[0.12em]">
            Selected Work
          </h2>

          <div className="mt-8 grid md:grid-cols-12 gap-8 md:gap-10 items-start">
            <div className="md:col-span-3">
              <ImagePlaceholder
                src={selectedTrack.image}
                label={selectedTrack.title}
                alt={selectedTrack.title}
              />
            </div>

            <div className="md:col-span-5">
              <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#71786D]">
                Now Playing
              </div>

              <div className="mt-4">
                <div className="text-[1.65rem] leading-[1.25]">
                  {selectedTrack.title}
                </div>

                {selectedTrack.subtitle && (
                  <div className="mt-2 text-[0.62rem] sm:text-[0.66rem] uppercase tracking-[0.22em] text-[#71786D] leading-[1.6] max-w-[28rem] whitespace-pre-line">
                    {selectedTrack.subtitle}
                  </div>
                )}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="text-sm text-[#71786D]">
                  {selectedTrack.duration}
                </div>

                <div
                  onClick={(e) => handleSeek(selectedTrack, e)}
                  className="flex-1 h-[5px] bg-transparent cursor-pointer flex items-center"
                >
                  <div className="w-full h-[1px] bg-[#D7DDD1] overflow-hidden">
                    <div
                      className="h-full bg-[#1A1A1A] transition-all duration-200 ease-out"
                      style={{ width: `${progressById[selectedTrack.id] || 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
                <button
                  onClick={() => {
                    const currentIndex = visibleFilmTracks.findIndex(
                      (track) => track.id === selectedTrack.id
                    );
                    const previousTrack = visibleFilmTracks[currentIndex - 1];

                    if (previousTrack) {
                      playTrack(previousTrack, true);
                    }
                  }}
                  className="text-[0.72rem] uppercase tracking-[0.24em] text-[#5F665C] hover:text-[#1A1A1A]"
                >
                  Previous
                </button>

                <button
                  onClick={() => playOrPauseTrack(selectedTrack)}
                  className="w-16 h-16 rounded-full border border-[#1A1A1A] flex items-center justify-center text-[0.72rem] uppercase tracking-[0.18em] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500"
                >
                  {playingId === selectedTrack.id ? "Pause" : "Play"}
                </button>

                <button
                  onClick={() => {
                    const nextTrack = getNextTrack(selectedTrack.id);

                    if (nextTrack) {
                      playTrack(nextTrack, true);
                    }
                  }}
                  className="text-[0.72rem] uppercase tracking-[0.24em] text-[#5F665C] hover:text-[#1A1A1A]"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="md:col-span-4 md:border-l md:border-[#D9DED4] md:pl-8">
              <div className="space-y-3">
                {visibleFilmTracks.map((track, index) => (
                  <div key={track.id}>
                    <audio
                      ref={(el) => {
                        audioRefs.current[track.id] = el;
                      }}
                      src={track.audio}
                      onEnded={() => handleTrackEnded(track)}
                      onTimeUpdate={(e) => {
                        const audio = e.currentTarget;
                        if (!audio.duration) return;

                        const progress = (audio.currentTime / audio.duration) * 100;
                        setProgressById((prev) => ({ ...prev, [track.id]: progress }));
                      }}
                    />

                    <button
                      onClick={() => playTrack(track, false)}
                      className={`w-full grid grid-cols-[1.65rem_minmax(0,1fr)_auto] sm:grid-cols-[2rem_minmax(0,1fr)_auto] gap-3 sm:gap-4 text-left items-baseline py-1 transition-colors duration-300 ${
                        selectedTrack.id === track.id
                          ? "text-[#1A1A1A]"
                          : "text-[#5F665C] hover:text-[#1A1A1A]"
                      }`}
                    >
                      <span className="text-[0.72rem] tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-[0.95rem] min-w-0 break-words">
                        {track.title}
                      </span>

                      <span className="text-[0.8rem] text-[#71786D]">
                        {track.duration}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
              {FILM_TRACKS.length > 5 && <div className="mt-5 border-t border-[#D9DED4] pt-4">
                <button type="button" onClick={() => {
                  if (filmMoreOpen && !FILM_TRACKS.slice(0, 5).some((track) => track.id === selectedTrack.id)) {
                    pauseAllExcept(FILM_TRACKS[0].id);
                    setPlayingId(null);
                    setSelectedTrack(FILM_TRACKS[0]);
                  }
                  setFilmMoreOpen((open) => !open);
                }} className="w-full flex items-center justify-between text-[0.7rem] uppercase tracking-[0.24em] text-[#5F665C] hover:text-[#1A1A1A] transition-colors duration-300">
                  <span>{filmMoreOpen ? "Less" : "More"}</span>
                  <span aria-hidden="true">{filmMoreOpen ? "−" : "+"}</span>
                </button>
              </div>}
            </div>
          </div>

          <div className="mt-8 text-right text-[0.62rem] sm:text-[0.66rem] uppercase tracking-[0.22em] text-[#71786D] leading-[1.6]">
            Full music portfolio available at request.
          </div>
        </div>
      </section>

      <section id="film-story" className="mx-auto max-w-6xl px-5 sm:px-6 py-20 grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="w-full flex justify-center">
          <img
            src="/images/marius-ygre.jpg"
            alt="Marius Ygre"
            className={`max-w-[17rem] h-auto object-contain ${IMAGE_FRAME}`}
          />
        </div>

        <div>
          <h2 className="text-[1.75rem] sm:text-[2.1rem] uppercase tracking-[0.06em] sm:tracking-[0.08em] leading-[1.18]">
            ABOUT
          </h2>

          <div className="mt-5 w-14 h-[1px] bg-[#5F665C]" />

          <p className="mt-7 max-w-[33rem] text-[#5F665C] text-[1rem] sm:text-[1.02rem] leading-[1.85]" style={{ textWrap: "pretty" }}>
            Marius Ygre is a composer, pianist and producer whose work bridges traditional musicianship and contemporary production.
          </p>

          <p className="mt-5 max-w-[33rem] text-[#5F665C] text-[1rem] sm:text-[1.02rem] leading-[1.85]" style={{ textWrap: "pretty" }}>
            Educated in Composition and Music Production at the Norwegian Academy of Music, and with more than 200 million streams as Madden, he combines a strong sense of musical atmosphere with a detailed approach to sound and production — from intimate piano and restrained strings to subtle electronics and full orchestral writing.
          </p>

          <p className="mt-5 max-w-[33rem] text-[#5F665C] text-[1rem] sm:text-[1.02rem] leading-[1.85]" style={{ textWrap: "pretty" }}>
            Now focused on composing for film and visual storytelling, he creates music shaped around narrative and emotional direction.
          </p>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 sm:px-6 pb-24 grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <div className="text-[0.66rem] sm:text-[0.76rem] md:text-[0.82rem] uppercase tracking-[0.18em] sm:tracking-[0.26em] md:tracking-[0.32em] text-[#5F665C] font-medium">
            Start here
          </div>

          <h2 className="mt-5 text-[1.75rem] sm:text-[2.1rem] uppercase tracking-[0.06em] sm:tracking-[0.08em] leading-[1.2]">
            New projects,
            <br />
            collaborations or inquiries.
          </h2>

          <div className="mt-7 w-16 h-[1px] bg-[#5F665C]" />
        </div>

        <div className={`border ${BORDER_SOFT} p-5 sm:p-6 md:p-8 bg-[#F8FBF2]`}>
          <form action="https://formspree.io/f/xykvezbg" method="POST" className="space-y-4">
            <input
              required
              type="text"
              name="name"
              placeholder="Name *"
              className={`w-full border ${BORDER_SOFT} bg-[#F8FAF4] px-4 py-4 text-[1rem]`}
            />

            <input
              required
              type="email"
              name="email"
              placeholder="E-mail *"
              className={`w-full border ${BORDER_SOFT} bg-[#F8FAF4] px-4 py-4 text-[1rem]`}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className={`w-full border ${BORDER_SOFT} bg-[#F8FAF4] px-4 py-4 text-[1rem]`}
            />

            <textarea
              required
              rows={5}
              name="message"
              placeholder="Message"
              className={`w-full border ${BORDER_SOFT} bg-[#F8FAF4] px-4 py-4 text-[1rem]`}
            />

            <button className="w-full border border-[#1A1A1A] py-4 text-[0.72rem] uppercase tracking-[0.24em] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500 ease-out active:opacity-70">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-5 sm:px-6 pb-10 text-[0.75rem] uppercase tracking-[0.28em] text-[#71786D]">
        © Marius Ygre
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#EFF4D6] text-[#1A1A1A] font-light">
      <section className="mx-auto max-w-6xl px-5 sm:px-6 pt-16 pb-14 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="space-y-8">
          <div>
            <div className="text-[0.66rem] sm:text-[0.76rem] md:text-[0.82rem] uppercase tracking-[0.18em] sm:tracking-[0.26em] md:tracking-[0.32em] text-[#5F665C] font-medium leading-[1.9]">
              <div>COMPOSER • PIANIST • PRODUCER</div>
              <div>200M+ streams as Madden</div>
            </div>

            <h1 className="mt-6 text-[2.55rem] sm:text-5xl md:text-[4.1rem] leading-[1.05] uppercase tracking-[0.055em] sm:tracking-[0.07em] md:tracking-[0.08em]">
              MARIUS YGRE
            </h1>

            <div className="mt-8 w-16 h-[1px] bg-[#5F665C]" />

            <p className="mt-6 max-w-[34rem] text-[#5F665C] text-[1rem] sm:text-[1.02rem] leading-[1.85]" style={{ textWrap: "pretty" }}>
              Marius Ygre creates music that moves between intimate piano, minimal textures, orchestral writing and modern production.
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <img
            src="/images/profile-image-3.jpg"
            alt="Marius Ygre"
            className={`w-full max-w-[28rem] md:max-w-none h-auto object-contain ${IMAGE_FRAME}`}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-6 pb-16 md:pb-20">
        <Link
          to="/film"
          className={`group block max-w-2xl border ${BORDER_SOFT} bg-[#F8FBF2] p-6 sm:p-8 md:p-10 transition-all duration-700 ease-out hover:border-[#1A1A1A] active:opacity-70`}
        >
          <div className="text-[1.45rem] md:text-[1.75rem] uppercase tracking-[0.12em] leading-[1.2]">
            Music for Visual Storytelling
          </div>

          <div className="mt-8 text-[0.72rem] uppercase tracking-[0.24em] text-[#5F665C] group-hover:text-[#1A1A1A] transition-colors duration-500">
            Enter Music Page →
          </div>
        </Link>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 sm:px-6 py-20 md:py-24 grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <div className="text-[0.66rem] sm:text-[0.76rem] md:text-[0.82rem] uppercase tracking-[0.18em] sm:tracking-[0.26em] md:tracking-[0.32em] text-[#5F665C] font-medium">
            Start here
          </div>

          <h2 className="mt-5 text-[1.75rem] sm:text-[2.1rem] uppercase tracking-[0.06em] sm:tracking-[0.08em] leading-[1.2]">
            New projects,
            <br />
            collaborations or inquiries.
          </h2>

          <div className="mt-7 w-16 h-[1px] bg-[#5F665C]" />
        </div>

        <div className={`border ${BORDER_SOFT} p-5 sm:p-6 md:p-8 bg-[#F8FBF2]`}>
          <form
            action="https://formspree.io/f/xykvezbg"
            method="POST"
            className="space-y-4"
          >
            <input
              required
              type="text"
              name="name"
              placeholder="Name *"
              className={`w-full border ${BORDER_SOFT} bg-[#F8FAF4] px-4 py-4 text-[1rem]`}
            />

            <input
              required
              type="email"
              name="email"
              placeholder="E-mail *"
              className={`w-full border ${BORDER_SOFT} bg-[#F8FAF4] px-4 py-4 text-[1rem]`}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className={`w-full border ${BORDER_SOFT} bg-[#F8FAF4] px-4 py-4 text-[1rem]`}
            />

            <textarea
              required
              rows={5}
              name="message"
              placeholder="Message"
              className={`w-full border ${BORDER_SOFT} bg-[#F8FAF4] px-4 py-4 text-[1rem]`}
            />

            <button className="w-full border border-[#1A1A1A] py-4 text-[0.72rem] uppercase tracking-[0.24em] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500 ease-out active:opacity-70">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-5 sm:px-6 pb-10 text-[0.75rem] uppercase tracking-[0.28em] text-[#71786D]">
        © Marius Ygre
      </footer>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/film" element={<FilmPage />} />
        <Route path="/dcr" element={<DedicatedComposerReelPage />} />
        <Route path="/:reelSlug" element={<CustomOutreachReelPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

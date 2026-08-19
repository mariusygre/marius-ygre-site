import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

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
    duration: "03.36",
    audio: "/audio/suite.mp3",
    image: "/images/suite.png",
  },
];

function FilmPage() {
  const [playingId, setPlayingId] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(FILM_TRACKS[0]);
  const [progressById, setProgressById] = useState({});
  const audioRefs = useRef({});

  const pauseAllExcept = (trackId) => {
    Object.entries(audioRefs.current).forEach(([id, audio]) => {
      if (audio && id !== trackId) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const getNextTrack = (trackId) => {
    const index = FILM_TRACKS.findIndex((track) => track.id === trackId);
    if (index === -1) return null;
    return FILM_TRACKS[index + 1] || null;
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
          <div className="text-[0.66rem] sm:text-[0.76rem] md:text-[0.82rem] uppercase tracking-[0.18em] sm:tracking-[0.26em] md:tracking-[0.32em] text-[#5F665C] font-medium">
            COMPOSER • PIANIST • PRODUCER
          </div>

          <h1 className="mt-5 text-[2.35rem] sm:text-5xl md:text-[4.1rem] leading-[1.08] uppercase tracking-[0.055em] sm:tracking-[0.07em] md:tracking-[0.08em]">
            Film & Visual Storytelling
          </h1>

          <div className="mt-8 w-16 h-[1px] bg-[#5F665C]" />

          <p className="mt-8 max-w-[31rem] text-[#5F665C] text-[1.03rem] sm:text-[1.05rem] leading-[1.8]" style={{ textWrap: "pretty" }}>
            Music shaped by story, rhythm and feeling.
          </p>

          <p className="mt-6 max-w-[37rem] text-[#5F665C] text-[0.98rem] sm:text-[1rem] leading-[1.78]" style={{ textWrap: "pretty" }}>
            Original composition for film, documentaries and visual storytelling —
            <br className="hidden lg:block" />
            combining orchestral writing, minimal textures, intimate piano and modern production.
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

      <section className="border-y border-[#D9DED4]">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-5 grid md:grid-cols-2 gap-5 text-center text-[0.68rem] uppercase tracking-[0.22em] text-[#5F665C]">
          <div>200M+ streams as Madden</div>
          <div>Orchestral • Minimalism</div>
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
            Writing around the image.
          </h2>

          <div className="mt-5 w-14 h-[1px] bg-[#5F665C]" />

          <p className="mt-7 max-w-[33rem] text-[#5F665C] text-[1rem] sm:text-[1.02rem] leading-[1.85]" style={{ textWrap: "pretty" }}>
            Marius Ygre is a composer, pianist and producer bringing an established musical background into film and visual storytelling. With 200M+ streams as Madden, he combines the instincts of a composer with the perspective of a modern music producer — from intimate piano and restrained strings to subtle electronics and full orchestral writing.
          </p>

          <p className="mt-5 max-w-[33rem] text-[#5F665C] text-[1rem] sm:text-[1.02rem] leading-[1.85]" style={{ textWrap: "pretty" }}>
            His approach is simple: Know when to speak. Know when to leave space.
          </p>
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

              <div className="mt-4 text-[1.35rem] sm:text-[1.65rem] leading-[1.25]">
                {selectedTrack.title}
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
                    const currentIndex = FILM_TRACKS.findIndex(
                      (track) => track.id === selectedTrack.id
                    );
                    const previousTrack = FILM_TRACKS[currentIndex - 1];

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
                {FILM_TRACKS.map((track, index) => (
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
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 sm:px-6 pb-20 text-center">
        <h2 className="text-[1.18rem] sm:text-[1.45rem] uppercase tracking-[0.1em] sm:tracking-[0.16em]">
          For directors, editors and visual storytellers
        </h2>

        <p className="mt-6 text-[#5F665C] text-[1rem] sm:text-[1.02rem] leading-[1.85]" style={{ textWrap: "pretty" }}>
          Original music for film, documentaries and visual storytelling.
          <br />
          Composer-led production from first idea to polished, mix-ready sound.
        </p>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 sm:px-6 pb-24 grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <div className="text-[0.66rem] sm:text-[0.76rem] md:text-[0.82rem] uppercase tracking-[0.18em] sm:tracking-[0.26em] md:tracking-[0.32em] text-[#5F665C] font-medium">
            Start here
          </div>

          <h2 className="mt-5 text-[1.75rem] sm:text-[2.1rem] uppercase tracking-[0.06em] sm:tracking-[0.08em] leading-[1.2]">
            YOUR STORY.
            <br />
            ITS SOUND.
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
            <div className="text-[0.66rem] sm:text-[0.76rem] md:text-[0.82rem] uppercase tracking-[0.18em] sm:tracking-[0.26em] md:tracking-[0.32em] text-[#5F665C] font-medium">
              COMPOSER • PIANIST • PRODUCER
            </div>

            <h1 className="mt-6 text-[2.55rem] sm:text-5xl md:text-[4.1rem] leading-[1.05] uppercase tracking-[0.055em] sm:tracking-[0.07em] md:tracking-[0.08em]">
              MARIUS YGRE
            </h1>

            <div className="mt-8 w-16 h-[1px] bg-[#5F665C]" />

            <p className="mt-8 max-w-[32rem] text-[#5F665C] text-[1.04rem] sm:text-[1.08rem] leading-[1.8]" style={{ textWrap: "pretty" }}>
              Music for image, story and cinematic momentum.
            </p>

            <p className="mt-6 max-w-[34rem] text-[#5F665C] text-[1rem] sm:text-[1.02rem] leading-[1.85]" style={{ textWrap: "pretty" }}>
              Marius Ygre creates music for film, visual storytelling and media — combining orchestral writing, minimal textures, intimate piano and modern production.
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

      <section className="mx-auto max-w-6xl px-5 sm:px-6 pb-16 md:pb-20 grid md:grid-cols-2 gap-6 md:gap-8">
        <Link
          to="/film"
          className={`group border ${BORDER_SOFT} bg-[#F8FBF2] p-6 sm:p-8 md:p-10 transition-all duration-700 ease-out hover:border-[#1A1A1A] active:opacity-70`}
        >
          <div className="text-[1.45rem] md:text-[1.75rem] uppercase tracking-[0.12em]">
            Film
          </div>

          <p className="mt-6 max-w-[28rem] text-[#5F665C] text-[0.98rem] sm:text-[1rem] leading-[1.8]" style={{ textWrap: "pretty" }}>
            Music shaped by story, rhythm and feeling.
          </p>

          <p className="mt-4 max-w-[28rem] text-[#5F665C] text-[0.94rem] sm:text-[0.96rem] leading-[1.75]" style={{ textWrap: "pretty" }}>
            For directors, editors and visual storytellers.
          </p>

          <div className="mt-8 text-[0.72rem] uppercase tracking-[0.24em] text-[#5F665C] group-hover:text-[#1A1A1A] transition-colors duration-500">
            Enter Film Music Page →
          </div>
        </Link>

        <Link
          to="/tm"
          className={`group border ${BORDER_SOFT} bg-[#F8FBF2] p-6 sm:p-8 md:p-10 transition-all duration-700 ease-out hover:border-[#1A1A1A] active:opacity-70`}
        >
          <div className="text-[1.45rem] md:text-[1.75rem] uppercase tracking-[0.12em]">
            Trailer Music
          </div>

          <p className="mt-6 max-w-[28rem] text-[#5F665C] text-[0.98rem] sm:text-[1rem] leading-[1.8]" style={{ textWrap: "pretty" }}>
            Hybrid orchestral music built for tension, impact and momentum.
          </p>

          <div className="mt-8 text-[0.72rem] uppercase tracking-[0.24em] text-[#5F665C] group-hover:text-[#1A1A1A] transition-colors duration-500">
            Enter Trailer Music Page →
          </div>
        </Link>
      </section>

      <section className="border-y border-[#D9DED4]">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-5 grid md:grid-cols-2 gap-5 text-center text-[0.68rem] uppercase tracking-[0.22em] text-[#5F665C]">
          <div>200M+ streams as Madden</div>
          <div>Orchestral • Minimalism • Hybrid Production</div>
        </div>
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

function TrailerMusicPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#EFF4D6] text-[#1A1A1A] font-light">
      <header className="mx-auto max-w-6xl px-5 sm:px-6 pt-7 sm:pt-8 pb-5 sm:pb-6 flex items-center justify-between border-b border-[#D9DED4]">
        <Link to="/" className="text-[0.95rem] sm:text-[1.1rem] tracking-[0.16em] sm:tracking-[0.22em] uppercase">
          Marius Ygre
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[0.68rem] uppercase tracking-[0.22em] text-[#5F665C]">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors duration-300">
            Home
          </Link>

          <Link to="/film" className="hover:text-[#1A1A1A] transition-colors duration-300">
            Film
          </Link>

          <Link to="/tm" className="text-[#1A1A1A] border-b border-[#1A1A1A] pb-1">
            Trailer Music
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-5 sm:px-6 pt-20 pb-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <div className="text-[0.66rem] sm:text-[0.76rem] md:text-[0.82rem] uppercase tracking-[0.18em] sm:tracking-[0.26em] md:tracking-[0.32em] text-[#5F665C] font-medium">
            Trailer Music
          </div>

          <h1 className="mt-6 text-[2.55rem] sm:text-5xl md:text-[4.1rem] leading-[1.05] uppercase tracking-[0.055em] sm:tracking-[0.07em] md:tracking-[0.08em]">
            Coming soon
          </h1>

          <div className="mt-8 w-16 h-[1px] bg-[#5F665C]" />

          <p className="mt-8 max-w-[33rem] text-[#5F665C] text-[1rem] sm:text-[1.02rem] leading-[1.85]" style={{ textWrap: "pretty" }}>
            A focused trailer music page is being prepared. For now, please use the contact form on the main page or visit the film music page.
          </p>
        </div>

        <div className="w-full flex justify-center">
          <img
            src="/images/profile-image-3.jpg"
            alt="Marius Ygre"
            className={`w-full max-w-[28rem] md:max-w-none h-auto object-contain ${IMAGE_FRAME}`}
          />
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
        <Route path="/tm" element={<TrailerMusicPage />} />
      </Routes>
    </BrowserRouter>
  );
}

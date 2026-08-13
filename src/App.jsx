import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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
    title: "Orchestral",
    type: "Modern",
    tracks: [
      { id: "12", title: "The Wave Is Already Water", status: "", desc: "", duration: "03.22", audio: "/audio/the-wave-is-already-water.mp3", image: img("/images/the-wave-is-already-water.png", "The Wave Is Already Water") },
      { id: "15", title: "Auralis", status: "", desc: "", duration: "03.19", audio: "/audio/auralis.mp3", image: img("/images/auralis.png", "Auralis") },
      { id: "14", title: "Life Is a Daisy Wish", status: "", desc: "", duration: "01.58", audio: "/audio/life-is-a-daisy-wish.mp3", image: smallImg("/images/life-is-a-daisy-wish.png", "Life Is a Daisy Wish") },
      { id: "16", title: "Hrim", status: "", desc: "", duration: "03.45", audio: "/audio/hrim.mp3", image: img("/images/hrim.png", "Hrim") },
      { id: "17", title: "Through Smoke and Starlight", status: "", desc: "", duration: "02.24", audio: "/audio/through-smoke-and-starlight.mp3", image: img("/images/through-smoke-and-starlight.png", "Through Smoke and Starlight") },
      { id: "19", title: "A Little Braver Now", status: "", desc: "", duration: "02.15", audio: "/audio/a-little-braver-now.mp3", image: smallImg("/images/a-little-braver-now.png", "A Little Braver Now") },
      { id: "18", title: "Malinconia", status: "", desc: "", duration: "03.08", audio: "/audio/malinconia.mp3", image: smallImg("/images/malinconia-2.png", "Malinconia") },
      { id: "13", title: "Chasing Horizons", status: "UPCOMING", desc: "", duration: "03.19", audio: "", image: smallImg("/images/chasing-horizons.png", "Chasing Horizons") },
    ],
  },
   {
    title: "Minimalism",
    type: "Emotional",
    tracks: [
      { id: "5", title: "Under Currents", status: "", desc: "", duration: "02.46", audio: "/audio/under-currents.mp3", image: smallImg("/images/arab.png", "Under Currents") },
      { id: "3", title: "The Liminal Passage", status: "", desc: "", duration: "04.39", audio: "/audio/the-liminal-passage.mp3", image: img("/images/the-liminal-passage.png", "The Liminal Passage") },
      { id: "1", title: "Room in Monterey", status: "", desc: "", duration: "03.12", audio: "/audio/room-in-monterey.mp3", image: img("/images/room-in-monterey.png", "Room in Monterey") },
      { id: "6", title: "Flight of Hearts", status: "", desc: "", duration: "02.41", audio: "/audio/flight-of-hearts.mp3", image: img("/images/flight-of-hearts.png", "Flight of Hearts") },
      { id: "4", title: "Iben's Dance", status: "", desc: "", duration: "02.31", audio: "/audio/ibens-dance.mp3", image: img("/images/ibens-dance.png", "Iben's Dance") },
      { id: "2", title: "This Weight of Open Sky", status: "", desc: "", duration: "02.43", audio: "/audio/this-weight-of-open-sky.mp3", image: img("/images/this-weight-of-open-sky.png", "This Weight of Open Sky") },
      { id: "7", title: "The Quiet Between", status: "", desc: "", duration: "03.28", audio: "/audio/the-quiet-between.mp3", image: smallImg("/images/the-quiet-between.png", "The Quiet Between") },
      { id: "9", title: "Watch The Voltage", status: "", desc: "", duration: "03.05", audio: "/audio/watch-the-voltage.mp3", image: img("/images/watch-the-voltage.png", "Watch The Voltage") },
      { id: "10", title: "Nival", status: "", desc: "", duration: "02.36", audio: "/audio/nival.mp3", image: img("/images/nival.png", "Nival") },
      { id: "8", title: "Ridge of Desolation", status: "", desc: "", duration: "02.39", audio: "/audio/ridge-of-desolation.mp3", image: img("/images/ridge-of-desolation.png", "Ridge of Desolation") },
      { id: "11", title: "Suite", status: "", desc: "", duration: "03.36", audio: "/audio/suite.mp3", image: img("/images/suite.png", "Suite") },
    ],
  },
     {
    title: "Trailer Music",
    type: "Showcase",
    tracks: [
      { id: "22", title: "Every Shadow Hides", status: "", desc: "", duration: "02.06", audio: "/audio/every-shadow-hides.mp3", image: smallImg("/images/every-shadow-hides.png", "Every Shadow Hides") },
      { id: "21", title: "Shock Protocol", status: "", desc: "", duration: "02.02", audio: "/audio/shock-protocol.mp3", image: smallImg("/images/shock-protocol-2.png", "Shock Protocol") },
      { id: "20", title: "Asura Rising", status: "", desc: "", duration: "02.36", audio: "/audio/asura-rising.mp3", image: img("/images/asura-rising 8.png", "Asura Rising") },
      { id: "23", title: "Velocidad", status: "UPCOMING", desc: "", duration: "02.07", audio: "", image: img("/images/velocidad.png", "Velocidad") },
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

function HomePage() {
  function ImagePlaceholder({ label = "Image placeholder", tall = false }) {
  return (
    <div
      className={`w-full ${tall ? "min-h-[24rem]" : "min-h-[16rem]"} ${IMAGE_FRAME} bg-[#F8FBF2] flex items-center justify-center text-[#71786D] text-[0.72rem] uppercase tracking-[0.24em]`}
    >
      {label}
    </div>
  );
}

const FILM_TRACKS = [
  {
    id: "film-1",
    title: "The Wave Is Already Water",
    duration: "03.22",
    audio: "/audio/the-wave-is-already-water.mp3",
    imageLabel: "The Wave Is Already Water image",
  },
  {
    id: "film-2",
    title: "Auralis",
    duration: "03.19",
    audio: "/audio/auralis.mp3",
    imageLabel: "Auralis image",
  },
  {
    id: "film-3",
    title: "Life Is a Daisy Wish",
    duration: "01.58",
    audio: "/audio/life-is-a-daisy-wish.mp3",
    imageLabel: "Life Is a Daisy Wish image",
  },
  {
    id: "film-4",
    title: "Hrim",
    duration: "03.45",
    audio: "/audio/hrim.mp3",
    imageLabel: "Hrim image",
  },
  {
    id: "film-5",
    title: "Through Smoke and Starlight",
    duration: "02.24",
    audio: "/audio/through-smoke-and-starlight.mp3",
    imageLabel: "Through Smoke and Starlight image",
  },
  {
    id: "film-6",
    title: "Malinconia",
    duration: "03.08",
    audio: "/audio/malinconia.mp3",
    imageLabel: "Malinconia image",
  },
  {
    id: "film-7",
    title: "Under Currents",
    duration: "02.46",
    audio: "/audio/under-currents.mp3",
    imageLabel: "Under Currents image",
  },
  {
    id: "film-8",
    title: "The Liminal Passage",
    duration: "04.39",
    audio: "/audio/the-liminal-passage.mp3",
    imageLabel: "The Liminal Passage image",
  },
  {
    id: "film-9",
    title: "Room in Monterey",
    duration: "03.12",
    audio: "/audio/room-in-monterey.mp3",
    imageLabel: "Room in Monterey image",
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
    <div className="min-h-screen bg-[#EFF4D6] text-[#1A1A1A] font-light">
      <header className="mx-auto max-w-6xl px-6 pt-8 pb-6 flex items-center justify-between border-b border-[#D9DED4]">
        <Link to="/" className="text-[1.1rem] tracking-[0.22em] uppercase">
          Marius Ygre
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[0.68rem] uppercase tracking-[0.22em] text-[#5F665C]">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors duration-300">
            Home
          </Link>
          <Link to="/film" className="text-[#1A1A1A] border-b border-[#1A1A1A] pb-1">
            Film
          </Link>
          <a href="#selected-work" className="hover:text-[#1A1A1A] transition-colors duration-300">
            Music
          </a>
          <a href="#contact" className="hover:text-[#1A1A1A] transition-colors duration-300">
            Contact
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <div className="text-[0.68rem] uppercase tracking-[0.32em] text-[#71786D]">
            Composer for
          </div>

          <h1 className="mt-5 text-4xl md:text-[4.1rem] leading-[1.08] uppercase tracking-[0.08em]">
            Film & Visual Storytelling
          </h1>

          <div className="mt-8 w-16 h-[1px] bg-[#5F665C]" />

          <p className="mt-8 max-w-[31rem] text-[#5F665C] text-[1.05rem] leading-[1.8]">
            Music shaped around image, atmosphere and emotional detail.
          </p>

          <p className="mt-6 max-w-[34rem] text-[#5F665C] text-[1.02rem] leading-[1.85]">
            Original composition for film, documentaries and visual storytelling — combining orchestral writing, minimal textures, intimate piano and modern production.
          </p>
        </div>

        <ImagePlaceholder label="Hero image placeholder" tall />
      </section>

      <section className="border-y border-[#D9DED4]">
        <div className="mx-auto max-w-6xl px-6 py-5 grid md:grid-cols-4 gap-5 text-center text-[0.68rem] uppercase tracking-[0.22em] text-[#5F665C]">
          <div>Composer • Pianist • Producer</div>
          <div>200M+ streams as Madden</div>
          <div>Film • Visual Storytelling</div>
          <div>Orchestral • Minimalism</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        <ImagePlaceholder label="Secondary image placeholder" />

        <div>
          <div className="text-[0.68rem] uppercase tracking-[0.32em] text-[#71786D]">
            For the image
          </div>

          <h2 className="mt-4 text-[2.1rem] uppercase tracking-[0.08em] leading-[1.18]">
            Writing around the image.
          </h2>

          <div className="mt-5 w-14 h-[1px] bg-[#5F665C]" />

          <p className="mt-7 max-w-[34rem] text-[#5F665C] text-[1.02rem] leading-[1.85]">
            Marius Ygre creates music that supports the emotional direction of a scene without overpowering it. His work draws on a background in performance, composition and production, combining melodic clarity with restraint, atmosphere and narrative sensitivity.
          </p>

          <p className="mt-5 max-w-[34rem] text-[#5F665C] text-[1.02rem] leading-[1.85]">
            The focus is not only on what the music expresses, but where it leaves space — for dialogue, silence, pacing and image.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-center text-[1.45rem] uppercase tracking-[0.16em]">
          Approach
        </h2>

        <div className="mt-8 grid md:grid-cols-4 gap-4">
          {[
            ["Narrative Support", "Music shaped around story, pacing and emotional arc."],
            ["Atmosphere", "Minimal, orchestral and textural writing for image."],
            ["Melody & Theme", "Clear musical ideas with emotional restraint."],
            ["Production Detail", "Composer-led production with polished, mix-ready sound."],
          ].map(([title, text]) => (
            <div key={title} className="border border-[#D9DED4] bg-[#F8FBF2] p-7 text-center">
              <div className="text-[0.82rem] uppercase tracking-[0.18em]">
                {title}
              </div>
              <p className="mt-4 text-[#5F665C] text-[0.92rem] leading-[1.75]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="selected-work" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="border border-[#D9DED4] bg-[#F8FBF2] p-6 md:p-8">
          <h2 className="text-[1.65rem] uppercase tracking-[0.12em]">
            Selected Work
          </h2>

          <div className="mt-8 grid md:grid-cols-12 gap-8 md:gap-10 items-start">
            <div className="md:col-span-3">
              <ImagePlaceholder label={selectedTrack.imageLabel} />
            </div>

            <div className="md:col-span-5">
              <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#71786D]">
                Now Playing
              </div>

              <div className="mt-4 text-[1.65rem] leading-[1.25]">
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

              <div className="mt-8 flex items-center gap-5">
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
                      className={`w-full grid grid-cols-[2rem_1fr_auto] gap-4 text-left items-baseline py-1 transition-colors duration-300 ${
                        selectedTrack.id === track.id
                          ? "text-[#1A1A1A]"
                          : "text-[#5F665C] hover:text-[#1A1A1A]"
                      }`}
                    >
                      <span className="text-[0.72rem] tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-[0.95rem]">
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

      <section className="mx-auto max-w-3xl px-6 pb-20 text-center">
        <h2 className="text-[1.45rem] uppercase tracking-[0.16em]">
          For directors, editors and visual storytellers
        </h2>

        <p className="mt-6 text-[#5F665C] text-[1.02rem] leading-[1.85]">
          Music can clarify the emotional temperature of a scene, suggest inner movement, or quietly hold the image together. The goal is to support the story with precision — whether through piano, strings, subtle electronics or larger orchestral writing.
        </p>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 pb-24 grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <div className="text-[0.68rem] uppercase tracking-[0.32em] text-[#71786D]">
            Ready when you are
          </div>

          <h2 className="mt-5 text-[2.1rem] uppercase tracking-[0.08em] leading-[1.2]">
            Let’s shape the sound of your story.
          </h2>

          <div className="mt-7 w-16 h-[1px] bg-[#5F665C]" />
        </div>

        <div className={`border ${BORDER_SOFT} p-6 md:p-8 bg-[#F8FBF2]`}>
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

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-[0.75rem] uppercase tracking-[0.28em] text-[#71786D]">
        © Marius Ygre
      </footer>
    </div>
  );
}
  const [desktopActiveTitle, setDesktopActiveTitle] = useState(null);
  const [mobileActiveTitle, setMobileActiveTitle] = useState(null);
  const [desktopSelectedTrack, setDesktopSelectedTrack] = useState(null);
  const [mobileSelectedTrackId, setMobileSelectedTrackId] = useState(null);
  const [desktopImageVisible, setDesktopImageVisible] = useState(true);
  const [mobileImageVisible, setMobileImageVisible] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [progressById, setProgressById] = useState({});

  const audioRefs = useRef({});
  const mobileCollectionRefs = useRef({});
  const desktopImageTimerRef = useRef(null);

  const [desktopDisplayedTitle, desktopCollectionFading] = useFadedValue(desktopActiveTitle);

  const desktopActiveCollection =
    COLLECTIONS.find((c) => c.title === desktopDisplayedTitle) ?? null;

  useEffect(() => {
    COLLECTIONS.forEach((collection) => {
      collection.tracks.forEach((track) => {
        const src = getImageSrc(track);

        if (src) {
          const preloadImg = new Image();
          preloadImg.src = src;
        }
      });
    });
  }, []);

  useEffect(() => {
    return () => {
      if (desktopImageTimerRef.current) {
        clearTimeout(desktopImageTimerRef.current);
      }
    };
  }, []);

  const isPlayable = (track) => track.status !== "UPCOMING" && track.audio;

  const getTrackCollection = (trackId) =>
    COLLECTIONS.find((collection) =>
      collection.tracks.some((track) => track.id === trackId)
    );

  const getNextPlayableTrack = (trackId) => {
    const collection = getTrackCollection(trackId);
    if (!collection) return null;

    const currentIndex = collection.tracks.findIndex((track) => track.id === trackId);
    if (currentIndex === -1) return null;

    return (
      collection.tracks
        .slice(currentIndex + 1)
        .find((track) => isPlayable(track)) || null
    );
  };

  const updateVisibleTrackImage = async (track) => {
    if (desktopImageTimerRef.current) {
      clearTimeout(desktopImageTimerRef.current);
    }

    setDesktopImageVisible(false);

    const src = getImageSrc(track);
    await preloadImage(src);

    desktopImageTimerRef.current = setTimeout(() => {
      setDesktopSelectedTrack(track);
      setDesktopImageVisible(true);
    }, FADE_MS);

    setMobileSelectedTrackId(track.id);
    setMobileImageVisible(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMobileImageVisible(true);
      });
    });
  };

  const pauseAllExcept = (trackId) => {
    Object.entries(audioRefs.current).forEach(([id, audio]) => {
      if (audio && id !== trackId) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const stopAllAudio = () => {
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    setPlayingId(null);
    setProgressById({});
  };

  const startTrack = (track) => {
    if (!isPlayable(track)) return;

    updateVisibleTrackImage(track);
    pauseAllExcept(track.id);

    const audio = audioRefs.current[track.id];

    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setPlayingId(track.id);
    }
  };

  const handleTrackEnded = (track) => {
    setProgressById((prev) => ({ ...prev, [track.id]: 0 }));

    const nextTrack = getNextPlayableTrack(track.id);

    if (nextTrack) {
      setTimeout(() => {
        startTrack(nextTrack);
      }, 150);
    } else {
      setPlayingId(null);
    }
  };

  const handleDesktopCollectionClick = (title) => {
    if (title !== desktopActiveTitle) {
      setDesktopSelectedTrack(null);
      stopAllAudio();
    }

    setDesktopActiveTitle(title);
  };

  const handleMobileCollectionClick = (title) => {
    if (title !== mobileActiveTitle) {
      setMobileSelectedTrackId(null);
      setMobileImageVisible(false);
      stopAllAudio();
      setMobileActiveTitle(title);

      requestAnimationFrame(() => {
        mobileCollectionRefs.current[title]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } else {
      setMobileSelectedTrackId(null);
      setMobileImageVisible(false);
      stopAllAudio();
      setMobileActiveTitle(null);
    }
  };

  const playOrPauseTrack = (track) => {
    if (!isPlayable(track)) return;

    const audio = audioRefs.current[track.id];
    pauseAllExcept(track.id);

    if (audio) {
      if (playingId === track.id) {
        audio.pause();
        setPlayingId(null);
      } else {
        audio.play();
        setPlayingId(track.id);
      }
    }
  };

  const handleSeek = (track, event) => {
    if (!isPlayable(track)) return;

    const audio = audioRefs.current[track.id];
    if (!audio || !audio.duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const percentage = Math.min(
      Math.max((event.clientX - rect.left) / rect.width, 0),
      1
    );

    audio.currentTime = percentage * audio.duration;
  };

  const handleDesktopTrackClick = async (track) => {
    if (desktopImageTimerRef.current) {
      clearTimeout(desktopImageTimerRef.current);
    }

    setDesktopImageVisible(false);

    const src = getImageSrc(track);
    await preloadImage(src);

    desktopImageTimerRef.current = setTimeout(() => {
      setDesktopSelectedTrack(track);
      setDesktopImageVisible(true);
    }, FADE_MS);

    playOrPauseTrack(track);
  };

  const handleMobileTrackClick = async (track) => {
    setMobileSelectedTrackId(null);
    setMobileImageVisible(false);

    const src = getImageSrc(track);
    await preloadImage(src);

    setMobileSelectedTrackId(track.id);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMobileImageVisible(true);
      });
    });

    playOrPauseTrack(track);
  };

  const renderTrackCard = (track, onClick, showInlineImage = false) => {
    const playable = isPlayable(track);

    return (
      <div key={track.id} className={`border ${BORDER_SOFT} p-5 bg-[#F8FBF2]`}>
        {playable && (
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
        )}

        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5 md:gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 flex-wrap">
              <div className="text-lg tracking-[0.02em]">{track.title}</div>

              {track.status && (
                <div className="text-[0.63rem] uppercase tracking-[0.28em] text-[#5F665C] font-medium">
                  {track.status}
                </div>
              )}
            </div>

            <div className="text-[1rem] text-[#5F665C] mt-2 leading-[1.6] max-w-none whitespace-pre-line">
              {track.desc || " "}
            </div>

            {playable && (
              <div className="mt-3 flex items-center gap-4">
                <div className="text-sm text-[#71786D]">{track.duration}</div>

                <div
                  onClick={(e) => handleSeek(track, e)}
                  className="flex-1 h-[5px] bg-transparent cursor-pointer flex items-center"
                >
                  <div className="w-full h-[1px] bg-[#D7DDD1] overflow-hidden">
                    <div
                      className="h-full bg-[#1A1A1A] transition-all duration-200 ease-out"
                      style={{ width: `${progressById[track.id] || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {playable && (
            <button
              onClick={() => onClick(track)}
              className="self-start md:self-auto shrink-0 text-[0.72rem] uppercase tracking-[0.24em] text-[#5F665C] hover:text-[#1A1A1A] transition-all duration-500 ease-out active:opacity-60"
            >
              {playingId === track.id ? "Pause" : "Play"}
            </button>
          )}
        </div>

        {showInlineImage && mobileSelectedTrackId === track.id && (
          <div
            className={`mt-6 flex justify-center transition-opacity duration-[1200ms] ease-out ${
              mobileImageVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-full max-w-md flex items-center justify-center text-[#71786D] text-center">
              {track.image}
            </div>
          </div>
        )}
      </div>
    );
  };

  const playlistButtonClass = (isActive) =>
    `w-full text-left border-b py-6 transition-all duration-500 ease-out active:opacity-70 ${
      isActive
        ? "border-[#1A1A1A] text-[#1A1A1A]"
        : `${BORDER_SOFT} text-[#5F665C] hover:border-[#1A1A1A] hover:text-[#1A1A1A]`
    }`;

  return (
    <div className="min-h-screen bg-[#EFF4D6] text-[#1A1A1A] font-light">
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-8">
          <div>
            <div className="text-[1.35rem] md:text-[1.7rem] tracking-[0.32em] font-medium uppercase">
              COMPOSER
            </div>

            <h1 className="mt-6 text-4xl md:text-[4.1rem] leading-[1.05] uppercase tracking-[0.08em]">
              MARIUS YGRE
            </h1>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <img
            src="/images/profile-image-3.jpg"
            alt="Profile"
            className={`w-full h-auto object-contain ${IMAGE_FRAME}`}
          />
        </div>
      </section>

      <section className="hidden md:block mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {COLLECTIONS.map((collection) => (
            <button
              key={collection.title}
              onClick={() => handleDesktopCollectionClick(collection.title)}
              className={playlistButtonClass(desktopActiveTitle === collection.title)}
            >
              <div className="text-sm uppercase tracking-[0.28em] text-[#71786D]">
                {collection.type}
              </div>

              <div className="mt-4 text-[1.35rem]">{collection.title}</div>
            </button>
          ))}
        </div>

        {desktopActiveCollection && (
          <div
            className={`mt-16 grid md:grid-cols-12 gap-10 items-center transition-opacity duration-[1200ms] ${
              desktopCollectionFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="md:col-span-7 space-y-4">
              {desktopActiveCollection.tracks.map((track) =>
                renderTrackCard(track, handleDesktopTrackClick, false)
              )}
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div
                className={`w-full max-w-md flex items-center justify-center text-[#71786D] text-center transition-opacity duration-[1200ms] ease-out ${
                  desktopImageVisible && desktopSelectedTrack
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                {desktopSelectedTrack ? desktopSelectedTrack.image : null}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="md:hidden mx-auto max-w-6xl px-6 py-10">
        <div className="space-y-6">
          {COLLECTIONS.map((collection) => (
            <div
              key={collection.title}
              ref={(el) => {
                mobileCollectionRefs.current[collection.title] = el;
              }}
            >
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleMobileCollectionClick(collection.title)}
                className={playlistButtonClass(mobileActiveTitle === collection.title)}
              >
                <div className="text-sm uppercase tracking-[0.28em] text-[#71786D]">
                  {collection.type}
                </div>

                <div className="mt-4 text-[1.35rem]">{collection.title}</div>
              </button>

              {mobileActiveTitle === collection.title && (
                <div className="mt-8 space-y-4">
                  {collection.tracks.map((track) =>
                    renderTrackCard(track, handleMobileTrackClick, true)
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

                        <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-[#1A1A1A] text-[2.1rem]">About</h2>

        <div className="mt-6 grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <p className="max-w-[33rem] text-[#5F665C] text-[1.02rem] leading-[1.85]">
              Trained in music production and composition from the Norwegian Academy of Music, and with performance studies at Berklee College of Music, Marius Ygre brings a broad musical background to his work as a composer.
            </p>

            <p className="mt-5 max-w-[33rem] text-[#5F665C] text-[1.02rem] leading-[1.85]">
              As the artist Madden, he built an international pop career as a composer, songwriter and producer, with songs surpassing 200 million streams and reaching audiences across the world. Collaborations with writers and artists across Europe and America helped shape a writing style marked by emotional clarity, precision and an intimate sense of melody.
            </p>

            <p className="mt-5 max-w-[33rem] text-[#5F665C] text-[1.02rem] leading-[1.85]">
              Now focused on film and visual storytelling, he draws on his experiences in performance, composition and production to create music that supports imagery with atmosphere, restraint and emotional detail.
            </p>
          </div>

          <div className="flex justify-center items-start">
            <img
              src="/images/marius-ygre.jpg"
              alt="Marius Ygre"
              className={`max-w-[17rem] h-auto object-contain ${IMAGE_FRAME}`}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <h2 className="text-[#1A1A1A] text-[2.1rem]">Contact</h2>
        </div>

        <div className={`border ${BORDER_SOFT} p-6 md:p-8 bg-[#F8FBF2]`}>
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

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-[0.75rem] uppercase tracking-[0.28em] text-[#71786D]">
        © Marius Ygre
      </footer>
    </div>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/film" element={<FilmPage />} />
      </Routes>
    </BrowserRouter>
  );
}
import React, { useEffect, useRef, useState } from "react";

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
    title: "Score Reel",
    type: "Emotional",
    tracks: [
      { id: "1", title: "This Weight of Open Sky", status: "", desc: "", duration: "02.44", audio: "/audio/this-weight-of-open-sky.wav", image: img("/images/this-weight-of-open-sky.png", "This Weight of Open Sky") },
      { id: "2", title: "Room in Monterey", status: "", desc: "", duration: "03.12", audio: "/audio/room-in-monterey.wav", image: img("/images/room-in-monterey.png", "Room in Monterey") },
      { id: "3", title: "Ridge of Desolation", status: "", desc: "", duration: "02.42", audio: "/audio/ridge-of-desolation.wav", image: img("/images/ridge-of-desolation.png", "Ridge of Desolation") },
      { id: "4", title: "The Quiet Between", status: "", desc: "", duration: "03.28", audio: "/audio/the-quiet-between.wav", image: smallImg("/images/the-quiet-between.png", "The Quiet Between") },
      { id: "5", title: "Iben's Dance", status: "", desc: "", duration: "02.31", audio: "/audio/ibens-dance.wav", image: img("/images/ibens-dance.png", "Iben's Dance") },
      { id: "6", title: "Nival", status: "", desc: "", duration: "02.36", audio: "/audio/nival.wav", image: img("/images/nival.png", "Nival") },
      { id: "7", title: "Suite", status: "", desc: "", duration: "03.36", audio: "/audio/suite.mp3", image: img("/images/suite.png", "Suite") },
      { id: "8", title: "Auralis", status: "UPCOMING", desc: "", duration: "03.23", audio: "/audio/auralis.wav", image: img("/images/auralis.png", "Auralis") },
      { id: "9", title: "Malinconia", status: "UPCOMING", desc: "", duration: "03.08", audio: "/audio/malinconia.wav", image: smallImg("/images/malinconia.png", "Malinconia") },
      { id: "10", title: "Hrim", status: "UPCOMING", desc: "", duration: "03.45", audio: "/audio/hrim.wav", image: img("/images/hrim.png", "Hrim") },
    ],
  },
  {
    title: "Showcase",
    type: "Trailer",
    tracks: [
      { id: "11", title: "Asura Rising", status: "UPCOMING", desc: "", duration: "02.36", audio: "/audio/asura-rising.wav", image: img("/images/asura-rising 8.png", "Asura Rising") },
      { id: "12", title: "Shock Protocol", status: "UPCOMING", desc: "", duration: "02.02", audio: "/audio/shock-protocol.wav", image: smallImg("/images/shock-protocol-2.png", "Shock Protocol") },
      { id: "13", title: "Every Shadow Hides", status: "UPCOMING", desc: "", duration: "02.06", audio: "/audio/every-shadow-hides.wav", image: smallImg("/images/every-shadow-hides.png", "Every Shadow Hides") },
      { id: "14", title: "Velocidad", status: "UPCOMING", desc: "", duration: "02.07", audio: "/audio/velocidad.wav", image: img("/images/velocidad.png", "Velocidad") },
    ],
  },
  {
    title: "Uplifting Tracks",
    type: "Warm",
    tracks: [
      { id: "16", title: "Chasing Horizons", status: "", desc: "", duration: "03.23", audio: "/audio/chasing-horizons.wav", image: smallImg("/images/chasing-horizons.png", "Chasing Horizons") },
      { id: "17", title: "Life Is a Daisy Wish", status: "UPCOMING", desc: "", duration: "01.58", audio: "/audio/life-is-a-daisy-wish.wav", image: smallImg("/images/life-is-a-daisy-wish.png", "Life Is a Daisy Wish") },
      { id: "18", title: "A Little Braver Now", status: "UPCOMING", desc: "", duration: "02.15", audio: "/audio/a-little-braver-now.wav", image: smallImg("/images/a-little-braver-now.png", "A Little Braver Now") },
      { id: "19", title: "The Wave Is Already Water", status: "UPCOMING", desc: "", duration: "03.22", audio: "/audio/the-wave-is-already-water.wav", image: img("/images/the-wave-is-already-water.png", "The Wave Is Already Water") },
    ],
  },
  {
    title: "Narrative Works",
    type: "Books",
    tracks: [
      { id: "20", title: "Under Currents", status: "", desc: 'a character study on Arab from "Moby Dick" by Herman Melville', duration: "02.46", audio: "/audio/under-currents.wav", image: smallImg("/images/arab.png", "Under Currents") },
      { id: "21", title: "The Liminal Passage", status: "", desc: 'inspired by "A Constellation of Vital Phenomena" by Anthony Marra', duration: "04.39", audio: "/audio/the-liminal-passage.wav", image: img("/images/the-liminal-passage.png", "The Liminal Passage") },
      { id: "22", title: "Watch the Voltage", status: "UPCOMING", desc: 'inspired by "Revival" by Stephen King', duration: "03.05", audio: "/audio/watch-the-voltage.wav", image: img("/images/watch-the-voltage.png", "Watch the Voltage") },
      { id: "23", title: "Through Smoke and Starlight", status: "UPCOMING", desc: 'inspired by "The Night Circus" by Erin Morgenstein', duration: "02.24", audio: "/audio/through-smoke-and-starlight.wav", image: img("/images/through-smoke-and-starlight.png", "Through Smoke and Starlight") },
      { id: "24", title: "Flight of Hearts", status: "UPCOMING", desc: `inspired by "She Who Became The Sun"\nby Shelley Parker-Chan`, duration: "02.41", audio: "/audio/flight-of-hearts.wav", image: img("/images/flight-of-hearts.png", "Flight of Hearts") },
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

export default function FilmComposerPortfolioSite() {
  const [desktopActiveTitle, setDesktopActiveTitle] = useState(null);
  const [mobileActiveTitle, setMobileActiveTitle] = useState(null);
  const [desktopSelectedTrack, setDesktopSelectedTrack] = useState(null);
  const [mobileSelectedTrackId, setMobileSelectedTrackId] = useState(null);
  const [desktopImageVisible, setDesktopImageVisible] = useState(true);
  const [mobileImageVisible, setMobileImageVisible] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [progressById, setProgressById] = useState({});

  const audioRefs = useRef({});
  const desktopImageTimerRef = useRef(null);

  const [desktopDisplayedTitle, desktopCollectionFading] = useFadedValue(desktopActiveTitle);
  const desktopActiveCollection = COLLECTIONS.find((c) => c.title === desktopDisplayedTitle) ?? null;

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
      if (desktopImageTimerRef.current) clearTimeout(desktopImageTimerRef.current);
    };
  }, []);

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
    } else {
      setMobileSelectedTrackId(null);
      setMobileImageVisible(false);
      stopAllAudio();
      setMobileActiveTitle(null);
    }
  };

  const playOrPauseTrack = (track) => {
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

  const handleDesktopTrackClick = async (track) => {
    if (desktopImageTimerRef.current) clearTimeout(desktopImageTimerRef.current);
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

  const renderTrackCard = (track, onClick, showInlineImage = false) => (
    <div key={track.id} className={`border ${BORDER_SOFT} p-5 bg-[#F8FBF2]`}>
      <audio
        ref={(el) => {
          audioRefs.current[track.id] = el;
        }}
        src={track.audio}
        onEnded={() => {
          setPlayingId(null);
          setProgressById((prev) => ({ ...prev, [track.id]: 0 }));
        }}
        onTimeUpdate={(e) => {
          const audio = e.currentTarget;
          if (!audio.duration) return;
          const progress = (audio.currentTime / audio.duration) * 100;
          setProgressById((prev) => ({ ...prev, [track.id]: progress }));
        }}
      />

      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5 md:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <div className="text-lg tracking-[0.02em]">{track.title}</div>
            {track.status && (
              <div className="text-[0.63rem] uppercase tracking-[0.28em] text-[#7A8175]">
                {track.status}
              </div>
            )}
          </div>

          <div className="text-[1rem] text-[#5F665C] mt-2 leading-[1.6] max-w-none whitespace-pre-line">
            {track.desc || " "}
          </div>

          <div className="mt-3 flex items-center gap-4">
            <div className="text-sm text-[#71786D]">{track.duration}</div>
            <div className="flex-1 h-[1px] bg-[#D7DDD1] overflow-hidden">
              <div
                className="h-full bg-[#1A1A1A] transition-all duration-200 ease-out"
                style={{ width: `${progressById[track.id] || 0}%` }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => onClick(track)}
          className="self-start md:self-auto shrink-0 text-[0.72rem] uppercase tracking-[0.24em] text-[#5F665C] hover:text-[#1A1A1A] transition-all duration-500 ease-out active:opacity-60"
        >
          {playingId === track.id ? "Pause" : "Play"}
        </button>
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
              MODERN COMPOSER
            </div>
            <h1 className="mt-6 text-4xl md:text-[4.1rem] leading-[1.05] uppercase tracking-[0.08em]">
              MARIUS YGRE
            </h1>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <img src="/images/profile-image-3.jpg" alt="Profile" className={`w-full h-auto object-contain ${IMAGE_FRAME}`} />
        </div>
      </section>

      <section className="hidden md:block mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
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
                  desktopImageVisible && desktopSelectedTrack ? "opacity-100" : "opacity-0"
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
            <div key={collection.title}>
              <button
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

      <section className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <h2 className="text-[#1A1A1A] text-[2.1rem]">About</h2>
          <p className="mt-6 text-[#5F665C] text-[1.15rem] leading-[1.8]">
            Music for visual storytelling.
          </p>
        </div>

        <div className="flex justify-center items-center h-full">
          <img src="/images/marius-ygre.jpg" alt="Marius Ygre" className={`max-w-[17rem] h-auto object-contain ${IMAGE_FRAME}`} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <h2 className="text-[#1A1A1A] text-[2.1rem]">Contact</h2>
        </div>

        <div className={`border ${BORDER_SOFT} p-6 md:p-8 bg-[#F8FBF2]`}>
          <form action="https://formspree.io/f/xykvezbg" method="POST" className="space-y-4">
            <input required type="text" name="name" placeholder="Name *" className={`w-full border ${BORDER_SOFT} bg-[#F8FAF4] px-4 py-4 text-[1rem]`} />
            <input required type="email" name="email" placeholder="E-mail *" className={`w-full border ${BORDER_SOFT} bg-[#F8FAF4] px-4 py-4 text-[1rem]`} />
            <input type="tel" name="phone" placeholder="Phone" className={`w-full border ${BORDER_SOFT} bg-[#F8FAF4] px-4 py-4 text-[1rem]`} />
            <textarea required rows={5} name="message" placeholder="Message" className={`w-full border ${BORDER_SOFT} bg-[#F8FAF4] px-4 py-4 text-[1rem]`} />

            <button className="w-full border border-[#1A1A1A] py-4 text-[0.72rem] uppercase tracking-[0.24em] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500 ease-out active:opacity-70">
              Send Message
            </button>
          </form>

          <div className="mt-6 text-[#5F665C] text-[0.98rem]">
            mariusygre@proton.me
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-[0.75rem] uppercase tracking-[0.28em] text-[#71786D]">
        © Marius Ygre
      </footer>
    </div>
  );
}
import React, { useEffect, useRef, useState } from "react";

const img = (src, alt) => (
  <img src={src} alt={alt} className="max-w-full h-auto object-contain" />
);

const smallImg = (src, alt) => (
  <img
    src={src}
    alt={alt}
    className="max-w-full max-h-[28rem] h-auto object-contain"
  />
);

const COLLECTIONS = [
  {
    title: "Score Reel",
    type: "Emotional",
    tracks: [
      { id: "1", title: "Malinconia (Upcoming)", desc: "", duration: "03.08", audio: "/audio/malinconia.wav", image: smallImg("/images/malinconia.png", "Malinconia") },
      { id: "2", title: "Nival", desc: "", duration: "02.36", audio: "/audio/nival.wav", image: img("/images/nival.png", "Nival") },
      { id: "3", title: "Iben's Dance", desc: "", duration: "02.31", audio: "/audio/ibens-dance.wav", image: img("/images/ibens-dance.png", "Iben's Dance") },
      { id: "4", title: "Hrim (Upcoming)", desc: "", duration: "03.45", audio: "/audio/hrim.wav", image: img("/images/hrim.png", "Hrim") },
      { id: "5", title: "Auralis (Upcoming)", desc: "", duration: "03.23", audio: "/audio/auralis.wav", image: img("/images/auralis.png", "Auralis") },
      { id: "6", title: "Room in Monterey (Upcoming)", desc: "", duration: "03.12", audio: "/audio/room-in-monterey.wav", image: img("/images/room-in-monterey.png", "Room in Monterey") },
      { id: "7", title: "Ridge of Desolation", desc: "", duration: "02.42", audio: "/audio/ridge-of-desolation.wav", image: img("/images/ridge-of-desolation.png", "Ridge of Desolation") },
      { id: "8", title: "The Quiet Between", desc: "", duration: "03.28", audio: "/audio/the-quiet-between.wav", image: smallImg("/images/the-quiet-between.png", "The Quiet Between") },
      { id: "9", title: "This Weight of Open Sky", desc: "", duration: "02.44", audio: "/audio/this-weight-of-open-sky.wav", image: img("/images/this-weight-of-open-sky.png", "This Weight of Open Sky") },
      { id: "10", title: "Suite (Upcoming)", desc: "", duration: "03.36", audio: "/audio/suite.wav", image: img("/images/suite.png", "Suite") },
    ],
  },
  {
    title: "Showcase",
    type: "Trailer",
    tracks: [
      { id: "11", title: "Asura Rising (Upcoming)", desc: "", duration: "02.36", audio: "/audio/asura-rising.wav", image: img("/images/asura-rising 8.png", "Asura Rising") },
      { id: "12", title: "Shock Protocol (Upcoming)", desc: "", duration: "02.02", audio: "/audio/shock-protocol.wav", image: smallImg("/images/shock-protocol-2.png", "Shock Protocol") },
      { id: "13", title: "Every Shadow Hides (Upcoming)", desc: "", duration: "02.06", audio: "/audio/every-shadow-hides.wav", image: smallImg("/images/every-shadow-hides.png", "Every Shadow Hides") },
      { id: "14", title: "Velocidad (Upcoming)", desc: "", duration: "02.07", audio: "/audio/velocidad.wav", image: img("/images/velocidad.png", "Velocidad") },
    ],
  },
  {
    title: "Uplifting Tracks",
    type: "Warm",
    tracks: [
      { id: "16", title: "Chasing Horizons", desc: "", duration: "03.23", audio: "/audio/chasing-horizons.wav", image: smallImg("/images/chasing-horizons.png", "Chasing Horizons") },
      { id: "17", title: "Life Is a Daisy Wish (Upcoming)", desc: "", duration: "01.58", audio: "/audio/life-is-a-daisy-wish.wav", image: smallImg("/images/life-is-a-daisy-wish.png", "Life Is a Daisy Wish") },
      { id: "18", title: "A Little Braver Now (Upcoming)", desc: "", duration: "02.15", audio: "/audio/a-little-braver-now.wav", image: smallImg("/images/a-little-braver-now.png", "A Little Braver Now") },
      { id: "19", title: "The Wave Is Already Water (Upcoming)", desc: "", duration: "03.22", audio: "/audio/the-wave-is-already-water.wav", image: img("/images/the-wave-is-already-water.png", "The Wave Is Already Water") },
    ],
  },
  {
    title: "Narrative Works",
    type: "Books",
    tracks: [
      { id: "20", title: "Under Currents", desc: 'a character study on Arab from "Moby Dick" by Herman Melville', duration: "02.46", audio: "/audio/under-currents.wav", image: smallImg("/images/arab.png", "Under Currents") },
      { id: "21", title: "The Liminal Passage", desc: 'inspired by "A Constellation of Vital Phenomena" by Anthony Marra', duration: "04.39", audio: "/audio/the-liminal-passage.wav", image: img("/images/the-liminal-passage.png", "The Liminal Passage") },
      { id: "22", title: "Watch the Voltage (Upcoming)", desc: 'inspired by "Revival" by Stephen King', duration: "03.05", audio: "/audio/watch-the-voltage.wav", image: img("/images/watch-the-voltage.png", "Watch the Voltage") },
      { id: "23", title: "Through Smoke and Starlight (Upcoming)", desc: 'inspired by "The Night Circus" by Erin Morgenstein', duration: "02.24", audio: "/audio/through-smoke-and-starlight.wav", image: img("/images/through-smoke-and-starlight.png", "Through Smoke and Starlight") },
      { id: "24", title: "Flight of Hearts (Upcoming)", desc: `inspired by "She Who Became The Sun"\nby Shelley Parker-Chan`, duration: "02.41", audio: "/audio/flight-of-hearts.wav", image: img("/images/flight-of-hearts.png", "Flight of Hearts") },
    ],
  },
];

const FADE_MS = 600;

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

export default function FilmComposerPortfolioSite() {
  const [activeTitle, setActiveTitle] = useState(null);
  const [displayedTrack, setDisplayedTrack] = useState(null);
  const [trackFading, setTrackFading] = useState(false);
  const [playingId, setPlayingId] = useState(null);

  const audioRefs = useRef({});
  const imageSwapTimerRef = useRef(null);

  const [displayedTitle, collectionFading] = useFadedValue(activeTitle);
  const activeData = COLLECTIONS.find((c) => c.title === displayedTitle) ?? null;

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
      if (imageSwapTimerRef.current) clearTimeout(imageSwapTimerRef.current);
    };
  }, []);

  const handleCollectionClick = (title) => {
    if (title !== activeTitle) {
      setDisplayedTrack(null);
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      setPlayingId(null);
    }
    setActiveTitle(title);
  };

  const handleTrackClick = async (track) => {
    if (imageSwapTimerRef.current) clearTimeout(imageSwapTimerRef.current);

    const audio = audioRefs.current[track.id];

    Object.entries(audioRefs.current).forEach(([id, otherAudio]) => {
      if (otherAudio && id !== track.id) {
        otherAudio.pause();
        otherAudio.currentTime = 0;
      }
    });

    if (audio) {
      if (playingId === track.id) {
        audio.pause();
        setPlayingId(null);
      } else {
        audio.play();
        setPlayingId(track.id);
      }
    }

    setTrackFading(true);

    const src = getImageSrc(track);
    await preloadImage(src);

    imageSwapTimerRef.current = setTimeout(() => {
      setDisplayedTrack(track);
      setTrackFading(false);
    }, FADE_MS);
  };

  return (
    <div className="min-h-screen bg-[#EFF4D6] text-[#1A1A1A] font-light">
      <section className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div>
            <div className="text-[1.7rem] tracking-[0.32em] font-medium uppercase">
              MODERN COMPOSER
            </div>
            <h1 className="mt-6 text-5xl md:text-[4.1rem] leading-[1.02] uppercase tracking-[0.08em]">
              MARIUS YGRE
            </h1>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <img
            src="/images/profile-image-3.jpg"
            alt="Profile"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          {COLLECTIONS.map((c) => (
            <button
              key={c.title}
              onClick={() => handleCollectionClick(c.title)}
              className={`text-left border p-6 transition-all duration-500 ease-out ${
                activeTitle === c.title
                  ? "border-[#1A1A1A] bg-[#F7F9F2]"
                  : "border-[#C9D0C4] bg-[#F8FBF2] hover:border-[#1A1A1A] hover:bg-[#F7F9F2] hover:text-[#1A1A1A]"
              }`}
            >
              <div className="text-sm uppercase tracking-[0.28em] text-[#71786D]">{c.type}</div>
              <div className="mt-4 text-[1.35rem]">{c.title}</div>
            </button>
          ))}
        </div>

        {activeData && (
          <div
            className={`mt-12 grid md:grid-cols-12 gap-10 items-center transition-opacity duration-700 ${
              collectionFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="md:col-span-7 space-y-4">
              {activeData.tracks.map((t) => (
                <div key={t.id} className="border border-[#C9D0C4] p-5 bg-[#F8FBF2]">
                  <audio
                    ref={(el) => {
                      audioRefs.current[t.id] = el;
                    }}
                    src={t.audio}
                    onEnded={() => setPlayingId(null)}
                  />

                  <div className="flex justify-between items-start gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="text-lg">{t.title}</div>
                      <div className="text-[1rem] text-[#5F665C] mt-2 leading-[1.6] max-w-none whitespace-pre-line">
                        {t.desc || " "}
                      </div>
                      <div className="text-sm text-[#71786D] mt-2">{t.duration}</div>
                    </div>

                    <button
                      onClick={() => handleTrackClick(t)}
                      className="shrink-0 border px-4 py-2 text-[0.95rem] border-[#C9D0C4] bg-[#F8FBF2] text-[#5F665C] hover:border-[#1A1A1A] hover:bg-[#F7F9F2] hover:text-[#1A1A1A] transition-all duration-500 ease-out"
                    >
                      {playingId === t.id ? "Pause" : "Play"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div
                className={`w-full max-w-md flex items-center justify-center text-[#71786D] text-center transition-opacity duration-700 ${
                  trackFading ? "opacity-0" : "opacity-100"
                }`}
              >
                {displayedTrack ? displayedTrack.image : "Track Image"}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-16">
        <div className="text-[#5F665C] space-y-6">
          <h2 className="text-[#1A1A1A] text-[2.1rem]">About</h2>
          <p>I write music that supports narrative, atmosphere, and emotional direction.</p>
          <p>My work blends orchestral writing, minimal textures, electronic production and intimate piano music.</p>
        </div>

        <div className="flex justify-center items-center h-full">
          <img
            src="/images/marius-ygre-2.jpg"
            alt="Marius Ygre"
            className="max-w-[17rem] h-auto object-contain"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-[#1A1A1A] text-[2.1rem]">Contact</h2>
        </div>

        <div className="border border-[#C9D0C4] p-8 bg-[#F8FBF2]">
          <form className="space-y-4">
            <input required placeholder="Name *" className="w-full border border-[#C9D0C4] bg-[#F8FAF4] px-4 py-3 text-[0.98rem]" />
            <input required type="email" placeholder="E-mail *" className="w-full border border-[#C9D0C4] bg-[#F8FAF4] px-4 py-3 text-[0.98rem]" />
            <input type="tel" placeholder="Phone" className="w-full border border-[#C9D0C4] bg-[#F8FAF4] px-4 py-3 text-[0.98rem]" />
            <textarea rows={5} placeholder="Message" className="w-full border border-[#C9D0C4] bg-[#F8FAF4] px-4 py-3 text-[0.98rem]" />
            <button className="w-full bg-[#1A1A1A] text-white py-3">Send Message</button>
          </form>

          <div className="mt-6 text-[#5F665C] text-[0.98rem]">mariusygre@proton.me</div>
        </div>
      </section>
    </div>
  );
}
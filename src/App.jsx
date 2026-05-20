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
      {
        id: "1",
        title: "This Weight of Open Sky",
        status: "",
        desc: "",
        duration: "02.44",
        audio: "/audio/this-weight-of-open-sky.wav",
        image: img(
          "/images/this-weight-of-open-sky.png",
          "This Weight of Open Sky"
        ),
      },
      {
        id: "2",
        title: "Room in Monterey",
        status: "",
        desc: "",
        duration: "03.12",
        audio: "/audio/room-in-monterey.wav",
        image: img("/images/room-in-monterey.png", "Room in Monterey"),
      },
      {
        id: "3",
        title: "Ridge of Desolation",
        status: "",
        desc: "",
        duration: "02.42",
        audio: "/audio/ridge-of-desolation.wav",
        image: img(
          "/images/ridge-of-desolation.png",
          "Ridge of Desolation"
        ),
      },
      {
        id: "4",
        title: "The Quiet Between",
        status: "",
        desc: "",
        duration: "03.28",
        audio: "/audio/the-quiet-between.wav",
        image: smallImg("/images/the-quiet-between.png", "The Quiet Between"),
      },
      {
        id: "5",
        title: "Iben's Dance",
        status: "",
        desc: "",
        duration: "02.31",
        audio: "/audio/ibens-dance.wav",
        image: img("/images/ibens-dance.png", "Iben's Dance"),
      },
      {
        id: "6",
        title: "Nival",
        status: "",
        desc: "",
        duration: "02.36",
        audio: "/audio/nival.wav",
        image: img("/images/nival.png", "Nival"),
      },
      {
        id: "7",
        title: "Suite",
        status: "UPCOMING",
        desc: "",
        duration: "03.36",
        audio: "/audio/suite.wav",
        image: img("/images/suite.png", "Suite"),
      },
      {
        id: "8",
        title: "Auralis",
        status: "UPCOMING",
        desc: "",
        duration: "03.23",
        audio: "/audio/auralis.wav",
        image: img("/images/auralis.png", "Auralis"),
      },
      {
        id: "9",
        title: "Malinconia",
        status: "UPCOMING",
        desc: "",
        duration: "03.08",
        audio: "/audio/malinconia.wav",
        image: smallImg("/images/malinconia.png", "Malinconia"),
      },
      {
        id: "10",
        title: "Hrim",
        status: "UPCOMING",
        desc: "",
        duration: "03.45",
        audio: "/audio/hrim.wav",
        image: img("/images/hrim.png", "Hrim"),
      },
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
  const [activeTitle, setActiveTitle] = useState("Score Reel");
  const [displayedTrack, setDisplayedTrack] = useState(null);
  const [trackFading, setTrackFading] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [progressById, setProgressById] = useState({});

  const audioRefs = useRef({});
  const imageSwapTimerRef = useRef(null);

  const [displayedTitle, collectionFading] =
    useFadedValue(activeTitle);

  const activeData =
    COLLECTIONS.find(
      (c) => c.title === displayedTitle
    ) ?? null;

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
      if (imageSwapTimerRef.current)
        clearTimeout(imageSwapTimerRef.current);
    };
  }, []);

  const handleCollectionClick = (title) => {
    if (title !== activeTitle) {
      setDisplayedTrack(null);

      Object.values(audioRefs.current).forEach(
        (audio) => {
          if (audio) {
            audio.pause();
            audio.currentTime = 0;
          }
        }
      );

      setPlayingId(null);
      setProgressById({});
    }

    setActiveTitle(title);
  };

  const handleTrackClick = async (track) => {
    if (imageSwapTimerRef.current)
      clearTimeout(imageSwapTimerRef.current);

    const audio = audioRefs.current[track.id];

    Object.entries(audioRefs.current).forEach(
      ([id, otherAudio]) => {
        if (otherAudio && id !== track.id) {
          otherAudio.pause();
          otherAudio.currentTime = 0;
        }
      }
    );

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
              <div className="text-sm uppercase tracking-[0.28em] text-[#71786D]">
                {c.type}
              </div>

              <div className="mt-4 text-[1.35rem]">
                {c.title}
              </div>
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
                <div
                  key={t.id}
                  className="border border-[#C9D0C4] p-5 bg-[#F8FBF2]"
                >
                  <audio
                    ref={(el) => {
                      audioRefs.current[t.id] = el;
                    }}
                    src={t.audio}
                    onEnded={() => {
                      setPlayingId(null);

                      setProgressById((prev) => ({
                        ...prev,
                        [t.id]: 0,
                      }));
                    }}
                    onTimeUpdate={(e) => {
                      const audio = e.currentTarget;

                      if (!audio.duration) return;

                      const progress =
                        (audio.currentTime /
                          audio.duration) *
                        100;

                      setProgressById((prev) => ({
                        ...prev,
                        [t.id]: progress,
                      }));
                    }}
                  />

                  <div className="flex justify-between items-start gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <div className="text-lg tracking-[0.02em]">
                          {t.title}
                        </div>

                        {t.status && (
                          <div className="text-[0.63rem] uppercase tracking-[0.28em] text-[#7A8175]">
                            {t.status}
                          </div>
                        )}
                      </div>

                      <div className="text-[1rem] text-[#5F665C] mt-2 leading-[1.6] max-w-none whitespace-pre-line">
                        {t.desc || " "}
                      </div>

                      <div className="mt-3 flex items-center gap-4">
                        <div className="text-sm text-[#71786D]">
                          {t.duration}
                        </div>

                        <div className="flex-1 h-[1px] bg-[#D7DDD1] overflow-hidden relative">
                          <div
                            className="h-full bg-[#1A1A1A] transition-all duration-200 ease-out"
                            style={{
                              width: `${
                                progressById[t.id] || 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleTrackClick(t)}
                      className="shrink-0 text-[0.72rem] uppercase tracking-[0.24em] text-[#5F665C] hover:text-[#1A1A1A] transition-all duration-500 ease-out"
                    >
                      {playingId === t.id
                        ? "Pause"
                        : "Play"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div
                className={`w-full max-w-md flex items-center justify-center text-[#71786D] text-center transition-opacity duration-700 ${
                  trackFading
                    ? "opacity-0"
                    : "opacity-100"
                }`}
              >
                {displayedTrack
                  ? displayedTrack.image
                  : "Track Image"}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
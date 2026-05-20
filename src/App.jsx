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
        title: "Malinconia (Upcoming)",
        desc: "",
        duration: "03.08",
        audio: "/audio/malinconia.wav",
        image: smallImg("/images/malinconia.png", "Malinconia"),
      },

      {
        id: "2",
        title: "Nival",
        desc: "",
        duration: "02.36",
        audio: "/audio/nival.wav",
        image: img("/images/nival.png", "Nival"),
      },

      {
        id: "3",
        title: "Iben's Dance",
        desc: "",
        duration: "02.31",
        audio: "/audio/ibens-dance.wav",
        image: img("/images/ibens-dance.png", "Iben's Dance"),
      },

      {
        id: "4",
        title: "HRIM (Upcoming)",
        desc: "",
        duration: "03.45",
        audio: "/audio/hrim.wav",
        image: img("/images/hrim.png", "Hrim"),
      },

      {
        id: "5",
        title: "AURALIS (Upcoming)",
        desc: "",
        duration: "03.23",
        audio: "/audio/auralis.wav",
        image: img("/images/auralis.png", "Auralis"),
      },

      {
        id: "6",
        title: "ROOM IN MONTEREY (Upcoming)",
        desc: "",
        duration: "03.12",
        audio: "/audio/room-in-monterey.wav",
        image: img("/images/room-in-monterey.png", "Room in Monterey"),
      },

      {
        id: "7",
        title: "Ridge of Desolation",
        desc: "",
        duration: "02.42",
        audio: "/audio/ridge-of-desolation.wav",
        image: img(
          "/images/ridge-of-desolation.png",
          "Ridge of Desolation"
        ),
      },

      {
        id: "8",
        title: "The Quiet Between",
        desc: "",
        duration: "03.28",
        audio: "/audio/the-quiet-between.wav",
        image: smallImg(
          "/images/the-quiet-between.png",
          "The Quiet Between"
        ),
      },

      {
        id: "9",
        title: "This Weight of Open Sky",
        desc: "",
        duration: "02.44",
        audio: "/audio/this-weight-of-open-sky.wav",
        image: img(
          "/images/this-weight-of-open-sky.png",
          "This Weight of Open Sky"
        ),
      },

      {
        id: "10",
        title: "SUITE (Upcoming)",
        desc: "",
        duration: "03.36",
        audio: "/audio/suite.wav",
        image: img("/images/suite.png", "Suite"),
      },
    ],
  },

  {
    title: "Showcase",
    type: "Trailer",
    tracks: [
      {
        id: "11",
        title: "ASURA RISING (Upcoming)",
        desc: "",
        duration: "02.36",
        audio: "/audio/asura-rising.wav",
        image: img(
          "/images/asura-rising 8.png",
          "Asura Rising"
        ),
      },

      {
        id: "12",
        title: "SHOCK PROTOCOL (Upcoming)",
        desc: "",
        duration: "02.02",
        audio: "/audio/shock-protocol.wav",
        image: smallImg(
          "/images/shock-protocol-2.png",
          "Shock Protocol"
        ),
      },

      {
        id: "13",
        title: "EVERY SHADOW HIDES (Upcoming)",
        desc: "",
        duration: "02.06",
        audio: "/audio/every-shadow-hides.wav",
        image: smallImg(
          "/images/every-shadow-hides.png",
          "Every Shadow Hides"
        ),
      },

      {
        id: "14",
        title: "VELOCIDAD (Upcoming)",
        desc: "",
        duration: "02.07",
        audio: "/audio/velocidad.wav",
        image: img("/images/velocidad.png", "Velocidad"),
      },
    ],
  },

  {
    title: "Uplifting Tracks",
    type: "Warm",
    tracks: [
      {
        id: "16",
        title: "Chasing Horizons",
        desc: "",
        duration: "03.23",
        audio: "/audio/chasing-horizons.wav",
        image: smallImg(
          "/images/chasing-horizons.png",
          "Chasing Horizons"
        ),
      },

      {
        id: "17",
        title: "LIFE IS A DAISY WISH (Upcoming)",
        desc: "",
        duration: "01.58",
        audio: "/audio/life-is-a-daisy-wish.wav",
        image: smallImg(
          "/images/life-is-a-daisy-wish.png",
          "Life Is a Daisy Wish"
        ),
      },

      {
        id: "18",
        title: "A LITTLE BRAVER NOW (Upcoming)",
        desc: "",
        duration: "02.15",
        audio: "/audio/a-little-braver-now.wav",
        image: smallImg(
          "/images/a-little-braver-now.png",
          "A Little Braver Now"
        ),
      },

      {
        id: "19",
        title: "THE WAVE IS ALREADY WATER (Upcoming)",
        desc: "",
        duration: "03.22",
        audio: "/audio/the-wave-is-already-water.wav",
        image: img(
          "/images/the-wave-is-already-water.png",
          "The Wave Is Already Water"
        ),
      },
    ],
  },

  {
    title: "Narrative Works",
    type: "Books",
    tracks: [
      {
        id: "20",
        title: "Under Currents",
        desc:
          'a character study on Arab from "Moby Dick" by Herman Melville',
        duration: "02.46",
        audio: "/audio/under-currents.wav",
        image: smallImg("/images/arab.png", "Under Currents"),
      },

      {
        id: "21",
        title: "The Liminal Passage",
        desc:
          'inspired by "A Constellation of Vital Phenomena" by Anthony Marra',
        duration: "04.39",
        audio: "/audio/the-liminal-passage.wav",
        image: img(
          "/images/the-liminal-passage.png",
          "The Liminal Passage"
        ),
      },

      {
        id: "22",
        title: "WATCH THE VOLTAGE (Upcoming)",
        desc: 'inspired by "Revival" by Stephen King',
        duration: "03.05",
        audio: "/audio/watch-the-voltage.wav",
        image: img(
          "/images/watch-the-voltage.png",
          "Watch the Voltage"
        ),
      },

      {
        id: "23",
        title: "THROUGH SMOKE AND STARLIGHT (Upcoming)",
        desc:
          'inspired by "The Night Circus" by Erin Morgenstein',
        duration: "02.24",
        audio: "/audio/through-smoke-and-starlight.wav",
        image: img(
          "/images/through-smoke-and-starlight.png",
          "Through Smoke and Starlight"
        ),
      },

      {
        id: "24",
        title: "FLIGHT OF HEARTS (Upcoming)",
        desc:
          `inspired by "She Who Became The Sun"\nby Shelley Parker-Chan`,
        duration: "02.41",
        audio: "/audio/flight-of-hearts.wav",
        image: img(
          "/images/flight-of-hearts.png",
          "Flight of Hearts"
        ),
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
  const [activeTitle, setActiveTitle] = useState(null);
  const [displayedTrack, setDisplayedTrack] = useState(null);
  const [trackFading, setTrackFading] = useState(false);
  const [playingId, setPlayingId] = useState(null);

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
    </div>
  );
}
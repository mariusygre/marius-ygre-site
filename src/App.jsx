import React, { useEffect, useRef, useState } from "react";

const img = (src, alt) => (
  <img
    src={src}
    alt={alt}
    className="max-w-full h-auto object-contain"
  />
);

const COLLECTIONS = [
  {
    title: "Score Reel",
    type: "Emotional",
    tracks: [
      {
        id: "1",
        title: "Malinconia",
        desc: "",
        duration: "03.08",
        image: "Malinconia",
      },
      {
        id: "2",
        title: "Nival",
        desc: "",
        duration: "02.36",
        image: img("/images/nival.png", "Nival"),
      },
      {
        id: "3",
        title: "Iben's Dance",
        desc: "",
        duration: "02.31",
        image: img("/images/ibens-dance.png", "Iben's Dance"),
      },
      {
        id: "4",
        title: "Hrim",
        desc: "",
        duration: "03.45",
        image: img("/images/hrim.png", "Hrim"),
      },
      {
        id: "5",
        title: "Auralis",
        desc: "",
        duration: "03.23",
        image: img("/images/auralis.png", "Auralis"),
      },
      {
        id: "6",
        title: "Room in Monterey",
        desc: "",
        duration: "03.12",
        image: "Room in Monterey",
      },
      {
        id: "7",
        title: "Ridge of Desolation",
        desc: "",
        duration: "02.42",
        image: img("/images/ridge-of-desolation.png", "Ridge of Desolation"),
      },
      {
        id: "8",
        title: "The Quiet Between",
        desc: "",
        duration: "03.28",
        image: "The Quiet Between",
      },
      {
        id: "9",
        title: "This Weight of Open Sky",
        desc: "",
        duration: "02.44",
        image: img("/images/this-weight-of-open-sky.png", "This Weight of Open Sky"),
      },
      {
        id: "10",
        title: "Suite",
        desc: "",
        duration: "03.36",
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
        title: "Asura Rising",
        desc: "",
        duration: "02.36",
        image: "Asura Rising",
      },
      {
        id: "12",
        title: "Shock Protocol",
        desc: "",
        duration: "02.02",
        image: "Shock Protocol",
      },
      {
        id: "13",
        title: "Every Shadow Hides",
        desc: "",
        duration: "02.06",
        image: img("/images/every-shadow-hides.png", "Every Shadow Hides"),
      },
      {
        id: "14",
        title: "Velocidad",
        desc: "",
        duration: "02.07",
        image: "Velocidad",
      },
      {
        id: "15",
        title: "Red Rebellion",
        desc: "",
        duration: "02.28",
        image: "Red Rebellion",
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
        image: "Chasing Horizons",
      },
      {
        id: "17",
        title: "Life Is a Daisy Wish",
        desc: "",
        duration: "01.58",
        image: "Life Is a Daisy Wish",
      },
      {
        id: "18",
        title: "A Little Braver Now",
        desc: "",
        duration: "02.15",
        image: "A Little Braver Now",
      },
      {
        id: "19",
        title: "The Wave Is Already Water",
        desc: "",
        duration: "03.22",
        image: "The Wave Is Already Water",
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
        desc: 'a character study on Arab from "Moby Dick" by Herman Melville',
        duration: "02.46",
        image: "Under Currents",
      },
      {
        id: "21",
        title: "The Liminal Passage",
        desc: 'inspired by "A Constellation of Vital Phenomena" by Anthony Marra',
        duration: "04.39",
        image: img("/images/the-liminal-passage.png", "The Liminal Passage"),
      },
      {
        id: "22",
        title: "Watch the Voltage",
        desc: 'inspired by "Revival" by Stephen King',
        duration: "03.05",
        image: img("/images/watch-the-voltage.png", "Watch the Voltage"),
      },
      {
        id: "23",
        title: "Through Smoke and Starlight",
        desc: 'inspired by "The Night Circus" by Erin Morgenstein',
        duration: "02.24",
        image: "Through Smoke and Starlight",
      },
      {
        id: "24",
        title: "Flight of Hearts",
        desc: `inspired by "She Who Became The Sun"
by Shelley Parker-Chan`,
        duration: "02.41",
        image: img("/images/flight-of-hearts.png", "Flight of Hearts"),
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

export default function FilmComposerPortfolioSite() {
  const [activeTitle, setActiveTitle] = useState(null);
  const [activeTrack, setActiveTrack] = useState(null);

  const [displayedTitle, collectionFading] = useFadedValue(activeTitle);
  const [displayedTrack, trackFading] = useFadedValue(activeTrack);

  const activeData =
    COLLECTIONS.find((c) => c.title === displayedTitle) ?? null;

  useEffect(() => {
    const imageUrls = [];

    COLLECTIONS.forEach((collection) => {
      collection.tracks.forEach((track) => {
        if (
          track.image &&
          typeof track.image !== "string" &&
          track.image.props &&
          track.image.props.src
        ) {
          imageUrls.push(track.image.props.src);
        }
      });
    });

    imageUrls.forEach((src) => {
      const preloadImg = new Image();
      preloadImg.src = src;
    });
  }, []);

  const handleCollectionClick = (title) => {
    if (title !== activeTitle) {
      setActiveTrack(null);
    }

    setActiveTitle(title);
  };

  return (
    <div className="min-h-screen bg-[#EFF4D6] text-[#1A1A1A] font-light">
      <section className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="text-sm uppercase tracking-[0.38em] text-[#5F665C]">
            <div>Modern Composer</div>
          </div>

          <div>
            <div className="text-[1.7rem] tracking-[0.32em] font-medium">
              MARIUS YGRE
            </div>

            <h1 className="mt-6 text-5xl md:text-[4.1rem] leading-[1.02]">
              Music for Film & Visual Storytelling
            </h1>
          </div>
        </div>

        <div className="border border-[#C9D0C4] p-6 bg-[#F8FBF2]">
          <div className="h-[32rem] flex items-center justify-center border border-dashed border-[#C9D0C4] text-[#71786D]">
            Profile Image
          </div>
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
                <div
                  key={t.id}
                  className="border border-[#C9D0C4] p-5 bg-[#F8FBF2]"
                >
                  <div className="flex justify-between items-start gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="text-lg">{t.title}</div>

                      <div className="text-[1rem] text-[#5F665C] mt-2 leading-[1.6] max-w-none whitespace-pre-line">
                        {t.desc || " "}
                      </div>

                      <div className="text-sm text-[#71786D] mt-2">
                        {t.duration}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTrack(t)}
                      className="shrink-0 border px-4 py-2 text-[0.95rem] border-[#C9D0C4] bg-[#F8FBF2] text-[#5F665C] hover:border-[#1A1A1A] hover:bg-[#F7F9F2] hover:text-[#1A1A1A] transition-all duration-500 ease-out"
                    >
                      Play
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
                {displayedTrack
                  ? displayedTrack.image
                  : "Track Image"}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-16">
        <div className="text-[#5F665C] space-y-6">
          <h2 className="text-[#1A1A1A] text-[2.1rem]">About</h2>

          <p>
            I write music that supports narrative, atmosphere,
            and emotional direction.
          </p>

          <p>
            My work blends orchestral writing, minimal textures,
            electronic production and intimate piano music.
          </p>
        </div>

        <div className="flex justify-center items-center h-full">
          <div className="w-[17rem] aspect-square flex items-center justify-center text-[#71786D] bg-[#F8FBF2]">
            Secondary Image
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-[#1A1A1A] text-[2.1rem]">
            Contact
          </h2>
        </div>

        <div className="border border-[#C9D0C4] p-8 bg-[#F8FBF2]">
          <form className="space-y-4">
            <input
              required
              placeholder="Name *"
              className="w-full border border-[#C9D0C4] bg-[#F8FAF4] px-4 py-3 text-[0.98rem]"
            />

            <input
              required
              type="email"
              placeholder="E-mail *"
              className="w-full border border-[#C9D0C4] bg-[#F8FAF4] px-4 py-3 text-[0.98rem]"
            />

            <input
              type="tel"
              placeholder="Phone"
              className="w-full border border-[#C9D0C4] bg-[#F8FAF4] px-4 py-3 text-[0.98rem]"
            />

            <textarea
              rows={5}
              placeholder="Message"
              className="w-full border border-[#C9D0C4] bg-[#F8FAF4] px-4 py-3 text-[0.98rem]"
            />

            <button className="w-full bg-[#1A1A1A] text-white py-3">
              Send Message
            </button>
          </form>

          <div className="mt-6 text-[#5F665C] text-[0.98rem]">
            mariusygre@proton.me
          </div>
        </div>
      </section>
    </div>
  );
}
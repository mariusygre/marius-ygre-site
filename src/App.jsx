import React, { useEffect, useRef, useState } from "react";

const COLLECTIONS = [
  {
    title: "Score Reel",
    type: "Emotional",
    tracks: [
      { id: "1", title: "Malinconia", desc: "", duration: "03.08", audio: "/audio/malinconia.mp3", image: "Malinconia" },
      { id: "2", title: "Nival", desc: "", duration: "02.36", audio: "/audio/nival.mp3", image: "Nival" },
      {
        id: "3",
        title: "Iben's Dance",
        desc: "",
        duration: "02.31",
        audio: "/audio/ibens-dance.mp3",
        image: (
          <img
            src="/images/ibens-dance.png"
            alt="Iben's Dance"
            className="w-full h-full object-cover"
          />
        ),
      },
      { id: "4", title: "Hrim", desc: "", duration: "03.45", audio: "/audio/hrim.mp3", image: "Hrim" },
      { id: "5", title: "Auralis", desc: "", duration: "03.23", audio: "/audio/auralis.mp3", image: "Auralis" },
      { id: "6", title: "Ridge of Desolation", desc: "", duration: "02.42", audio: "/audio/ridge-of-desolation.mp3", image: "Ridge of Desolation" },
      { id: "7", title: "The Quiet Between", desc: "", duration: "03.28", audio: "/audio/the-quiet-between.mp3", image: "The Quiet Between" },
      { id: "8", title: "This Weight of Open Sky", desc: "", duration: "02.44", audio: "/audio/this-weight-of-open-sky.mp3", image: "This Weight of Open Sky" },
      { id: "9", title: "Suite", desc: "", duration: "03.36", audio: "/audio/suite.mp3", image: "Suite" },
    ],
  },
  {
    title: "Showcase",
    type: "Trailer",
    tracks: [
      { id: "10", title: "Asura Rising", desc: "", duration: "02.36", audio: "/audio/asura-rising.mp3", image: "Asura Rising" },
      { id: "11", title: "Shock Protocol", desc: "", duration: "02.02", audio: "/audio/shock-protocol.mp3", image: "Shock Protocol" },
      { id: "12", title: "Every Shadow Hides", desc: "", duration: "02.06", audio: "/audio/every-shadow-hides.mp3", image: "Every Shadow Hides" },
      { id: "13", title: "Velocidad", desc: "", duration: "02.07", audio: "/audio/velocidad.mp3", image: "Velocidad" },
      { id: "14", title: "Red Rebellion", desc: "", duration: "02.28", audio: "/audio/red-rebellion.mp3", image: "Red Rebellion" },
    ],
  },
  {
    title: "Uplifting Tracks",
    type: "Warm",
    tracks: [
      { id: "15", title: "Chasing Horizons", desc: "", duration: "03.23", audio: "/audio/chasing-horizons.mp3", image: "Chasing Horizons" },
      { id: "16", title: "Life Is a Daisy Wish", desc: "", duration: "01.58", audio: "/audio/life-is-a-daisy-wish.mp3", image: "Life Is a Daisy Wish" },
      { id: "17", title: "A Little Braver Now", desc: "", duration: "02.15", audio: "/audio/a-little-braver-now.mp3", image: "A Little Braver Now" },
      { id: "18", title: "The Wave Is Already Water", desc: "", duration: "03.22", audio: "/audio/the-wave-is-already-water.mp3", image: "The Wave Is Already Water" },
    ],
  },
  {
    title: "Narrative Works",
    type: "Books",
    tracks: [
      {
        id: "19",
        title: "Under Currents",
        desc: "a character study on Arab from \"Moby Dick\" by Herman Melville",
        duration: "02.46",
        audio: "/audio/under-currents.mp3",
        image: "Under Currents",
      },
      {
        id: "20",
        title: "The Liminal Passage",
        desc: "inspired by \"A Constellation of Vital Phenomena\" by Anthony Marra",
        duration: "04.39",
        audio: "/audio/the-liminal-passage.mp3",
        image: "The Liminal Passage",
      },
      {
        id: "21",
        title: "Watch the Voltage",
        desc: "inspired by \"Revival\" by Stephen King",
        duration: "03.05",
        audio: "/audio/watch-the-voltage.mp3",
        image: "Watch the Voltage",
      },
      {
        id: "22",
        title: "Through Smoke and Starlight",
        desc: "inspired by \"The Night Circus\" by Erin Morgenstein",
        duration: "02.24",
        audio: "/audio/through-smoke-and-starlight.mp3",
        image: "Through Smoke and Starlight",
      },
      {
        id: "23",
        title: "Flight of Hearts",
        desc: `inspired by "She Who Became The Sun"
by Shelley Parker-Chan`,
        duration: "02.41",
        audio: "/audio/flight-of-hearts.mp3",
        image: "Flight of Hearts",
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
  const [playingId, setPlayingId] = useState(null);
  const audioRefs = useRef({});

  const [displayedTitle, collectionFading] = useFadedValue(activeTitle);
  const [displayedTrack, trackFading] = useFadedValue(activeTrack);

  const activeData = COLLECTIONS.find((c) => c.title === displayedTitle) ?? null;

  const handleCollectionClick = (title) => {
    if (title !== activeTitle) {
      setActiveTrack(null);
      setPlayingId(null);
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) audio.pause();
      });
    }
    setActiveTitle(title);
  };

  const handlePlay = (track) => {
    const audio = audioRefs.current[track.id];
    if (!audio) return;

    Object.entries(audioRefs.current).forEach(([id, otherAudio]) => {
      if (otherAudio && id !== track.id) {
        otherAudio.pause();
        otherAudio.currentTime = 0;
      }
    });

    setActiveTrack(track);

    if (playingId === track.id) {
      audio.pause();
      setPlayingId(null);
    } else {
      audio.play();
      setPlayingId(track.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFF4D6] text-[#1A1A1A] font-light">
      <section className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="text-sm uppercase tracking-[0.38em] text-[#5F665C]">
            <div>Modern Composer</div>
          </div>

          <div>
            <div className="text-[1.7rem] tracking-[0.32em] font-medium">MARIUS YGRE</div>
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
              <div className="text-sm uppercase tracking-[0.28em] text-[#71786D]">{c.type}</div>
              <div className="mt-4 text-[1.35rem]">{c.title}</div>
            </button>
          ))}
        </div>

        {activeData && (
          <div className={`mt-12 grid md:grid-cols-12 gap-10 items-center transition-opacity duration-700 ${collectionFading ? "opacity-0" : "opacity-100"}`}>
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
                      onClick={() => handlePlay(t)}
                      className="shrink-0 border px-4 py-2 text-[0.95rem] border-[#C9D0C4] bg-[#F8FBF2] text-[#5F665C] hover:border-[#1A1A1A] hover:bg-[#F7F9F2] hover:text-[#1A1A1A] transition-all duration-500 ease-out"
                    >
                      {playingId === t.id ? "Pause" : "Play"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div className={`w-full max-w-md h-[36rem] flex items-center justify-center border border-[#C9D0C4] bg-[#F8FBF2] text-[#71786D] text-center px-6 transition-opacity duration-700 ${trackFading ? "opacity-0" : "opacity-100"}`}>
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
          <div className="w-[17rem] aspect-square flex items-center justify-center text-[#71786D] bg-[#F8FBF2]">
            Secondary Image
          </div>
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
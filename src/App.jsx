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
        title: "Hrim (Upcoming)",
        desc: "",
        duration: "03.45",
        audio: "/audio/hrim.wav",
        image: img("/images/hrim.png", "Hrim"),
      },

      {
        id: "5",
        title: "Auralis (Upcoming)",
        desc: "",
        duration: "03.23",
        audio: "/audio/auralis.wav",
        image: img("/images/auralis.png", "Auralis"),
      },

      {
        id: "6",
        title: "Room in Monterey (Upcoming)",
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
        title: "Suite (Upcoming)",
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
        title: "Asura Rising (Upcoming)",
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
        title: "Shock Protocol (Upcoming)",
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
        title: "Every Shadow Hides (Upcoming)",
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
        title: "Velocidad (Upcoming)",
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
        title: "Life Is a Daisy Wish (Upcoming)",
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
        title: "A Little Braver Now (Upcoming)",
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
        title: "The Wave Is Already Water (Upcoming)",
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
        title: "Watch the Voltage (Upcoming)",
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
        title: "Through Smoke and Starlight (Upcoming)",
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
        title: "Flight of Hearts (Upcoming)",
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
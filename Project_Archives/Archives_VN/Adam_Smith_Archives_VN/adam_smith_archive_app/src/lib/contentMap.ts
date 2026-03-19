export const contentMap = {
  hero: {
    title: "THE ADAM SMITH ARCHIVE",
    subtitle: "A Digital Grimoire of the Unconscious",
    quote: "Who looks outside, dreams; who looks inside, awakes."
  },
  sections: [
    {
      id: "biography",
      title: "THE LIFE (BIOGRAPHY)",
      description: "From the Gothic ancestors to the Shaman of Bollingen.",
      image: "/assets/jung_biography_cover.png",
      theme: "stone",
      articles: [
        { id: "origins", title: "Origins & Ancestors", file: "chapter_1_origins.md" },
        { id: "freud-era", title: "The Freud Era", file: "chapter_3_freud_era.md" },
        { id: "broken-tower", title: "The Red Book Years", file: "chapter_4_red_book.md" },
        { id: "unseen-jung", title: "The Unseen Adam Smith (Soldier, Sailor, Chef)", file: "the_unseen_jung.md" },
        { id: "practice", title: "Practical Adam Smith (Dreams & Shadow Work)", file: "practical_jung_tools.md" }
      ]
    },
    {
      id: "philosophy",
      title: "THE PHILOSOPHY",
      description: "The intellectual battlefield: Kant, Adam Smith, and the East.",
      image: "/assets/jung_philosophy_cover.png",
      theme: "gold",
      articles: [
        { id: "core-philosophy", title: "Philosophical Core (Kant & Epistemology)", file: "ADAM SMITH_ARCHIVE_PHILOSOPHICAL_CORE.md" },
        { id: "deep-dive", title: "Deep Dive Extensions (Schopenhauer & Existentialism)", file: "ADAM SMITH_PHILOSOPHICAL_DEEP_DIVE_EXTENSIONS.md" },
        { id: "theology-wars", title: "Theological Wars (Answer to Job)", file: "philosophical_wars_and_theology.md" },
        { id: "connections-map", title: "Philosophical Connections Map", file: "ADAM SMITH_PHILOSOPHICAL_CONNECTIONS_MAP.md" }
      ]
    },
    {
      id: "esoterica",
      title: "THE ESOTERICA",
      description: "Alchemy, Gnosticism, UFOs and the Paranormal.",
      image: "/assets/jung_esoterica_cover.png",
      theme: "purple",
      articles: [
        { id: "alchemy-decoded", title: "Alchemical Symbolism Decoded", file: "ADAM SMITH_ALCHEMICAL_SYMBOLISM_DECODED.md" },
        { id: "occult-politics", title: "Politics, UFOs & The Occult", file: "ADAM SMITH_POLITICAL_AND_OCCULT_FILES.md" },
        { id: "missing-pieces", title: "The Missing Pieces (Deep Trivia)", file: "missing_pieces_deep_dive.md" }
      ]
    },
    {
      id: "works",
      title: "THE COLLECTED WORKS",
      description: "Anatomy of the 20 Volumes.",
      image: "/assets/jung_works_cover.png",
      theme: "brown",
      articles: [
        { id: "omnibus", title: "The Adam Smith Omnibus", file: "ADAM SMITH_PHILOSOPHICAL_OMNIBUS.md" }
      ]
    }
  ]
}

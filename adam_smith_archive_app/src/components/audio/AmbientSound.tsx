"use client";

import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { Volume2, VolumeX } from "lucide-react";

export default function ProceduralAudio({ isPlaying }: { isPlaying: boolean }) {
    const [isMuted, setIsMuted] = useState(false);
    const droneRef = useRef<Tone.Player | null>(null);
    const synthRef = useRef<Tone.PolySynth | null>(null);

    useEffect(() => {
        if (isPlaying && !droneRef.current) {
            // Create a procedural drone using oscillators
            const limiter = new Tone.Limiter(-10).toDestination();
            const reverb = new Tone.Reverb({ decay: 10, wet: 0.5 }).connect(limiter);
            const filter = new Tone.Filter(200, "lowpass").connect(reverb);

            // Low rumbles
            const osc1 = new Tone.Oscillator(55, "sine").connect(filter).start(); // A1
            const osc2 = new Tone.Oscillator(57, "sine").connect(filter).start(); // Detuned A1
            const lfo = new Tone.LFO(0.1, 150, 250).connect(filter.frequency).start();

            // High ethereal textures
            const delay = new Tone.FeedbackDelay("8n", 0.5).connect(reverb);
            synthRef.current = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: "triangle" },
                envelope: { attack: 2, decay: 1, sustain: 0.3, release: 4 }
            }).connect(delay);

            synthRef.current.volume.value = -20;
        }

        if (isPlaying && Tone.context.state !== 'running') {
            Tone.start();
        }

        return () => {
            // Cleanup if needed
        };
    }, [isPlaying]);

    const toggleMute = () => {
        if (isMuted) {
            Tone.Destination.mute = false;
        } else {
            Tone.Destination.mute = true;
        }
        setIsMuted(!isMuted);
    };

    // Interaction sound
    useEffect(() => {
        const playHover = () => {
            if (synthRef.current && !isMuted) {
                const notes = ["A3", "C4", "E4", "A4"];
                const randomNote = notes[Math.floor(Math.random() * notes.length)];
                synthRef.current.triggerAttackRelease(randomNote, "8n");
            }
        };

        window.addEventListener('PlayHoverSound', playHover);
        return () => window.removeEventListener('PlayHoverSound', playHover);
    }, [isMuted]);

    if (!isPlaying) return null;

    return (
        <button
            onClick={toggleMute}
            className="fixed bottom-8 right-8 z-50 p-4 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
        >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
    );
}

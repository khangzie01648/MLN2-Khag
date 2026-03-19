'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface PsychologicalInventory {
    shadowAspects: string[];
    archetypes: string[];
    alchemicalElements: string[];
    synchronicities: string[];
}

export interface MandalaData {
    chapterId: number;
    symbols: string[];
    colors: string[];
    completedAt: string;
    imageData?: string;
}

export interface Choice {
    chapterId: number;
    questionId: string;
    answer: string;
    timestamp: string;
}

export interface DreamJournalEntry {
    id: string;
    chapterId: number;
    title: string;
    content: string;
    symbols: string[];
    timestamp: string;
}

export interface ChapterProgress {
    id: number;
    isUnlocked: boolean;
    isCompleted: boolean;
    progress: number;
    timeSpent: number;
    puzzlesSolved: number;
    totalPuzzles: number;
}

export interface GameState {
    currentChapter: number;
    completedChapters: number[];
    chapterProgress: Record<number, ChapterProgress>;
    psychologicalInventory: PsychologicalInventory;
    mandalas: MandalaData[];
    choices: Choice[];
    dreamJournal: DreamJournalEntry[];
    totalPlayTime: number;
    lastSaved: string;
    gameStarted: string;
    audioEnabled: boolean;
    musicVolume: number;
    sfxVolume: number;
}

export const DEFAULT_GAME_STATE: GameState = {
    currentChapter: 1,
    completedChapters: [],
    chapterProgress: {
        1: { id: 1, isUnlocked: true, isCompleted: false, progress: 0, timeSpent: 0, puzzlesSolved: 0, totalPuzzles: 3 },
        2: { id: 2, isUnlocked: false, isCompleted: false, progress: 0, timeSpent: 0, puzzlesSolved: 0, totalPuzzles: 3 },
        3: { id: 3, isUnlocked: false, isCompleted: false, progress: 0, timeSpent: 0, puzzlesSolved: 0, totalPuzzles: 3 },
        4: { id: 4, isUnlocked: false, isCompleted: false, progress: 0, timeSpent: 0, puzzlesSolved: 0, totalPuzzles: 3 },
        5: { id: 5, isUnlocked: false, isCompleted: false, progress: 0, timeSpent: 0, puzzlesSolved: 0, totalPuzzles: 3 },
        6: { id: 6, isUnlocked: false, isCompleted: false, progress: 0, timeSpent: 0, puzzlesSolved: 0, totalPuzzles: 3 },
        7: { id: 7, isUnlocked: false, isCompleted: false, progress: 0, timeSpent: 0, puzzlesSolved: 0, totalPuzzles: 3 },
        8: { id: 8, isUnlocked: false, isCompleted: false, progress: 0, timeSpent: 0, puzzlesSolved: 0, totalPuzzles: 3 },
    },
    psychologicalInventory: {
        shadowAspects: [],
        archetypes: [],
        alchemicalElements: [],
        synchronicities: [],
    },
    mandalas: [],
    choices: [],
    dreamJournal: [],
    totalPlayTime: 0,
    lastSaved: new Date().toISOString(),
    gameStarted: new Date().toISOString(),
    audioEnabled: true,
    musicVolume: 0.7,
    sfxVolume: 0.8,
};

interface GameStateContextType {
    gameState: GameState;
    updateGameState: (updates: Partial<GameState>) => void;
    unlockChapter: (chapterId: number) => void;
    completeChapter: (chapterId: number) => void;
    addToInventory: (category: keyof PsychologicalInventory, item: string) => void;
    addMandala: (mandala: MandalaData) => void;
    addChoice: (choice: Choice) => void;
    addJournalEntry: (entry: DreamJournalEntry) => void;
    updateChapterProgress: (chapterId: number, updates: Partial<ChapterProgress>) => void;
    resetGame: () => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: ReactNode }) {
    const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);

    useEffect(() => {
        const saved = localStorage.getItem('jung_game_state');
        if (saved) {
            try {
                setGameState(JSON.parse(saved));
            } catch (error) {
                console.error('Failed to load game state:', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('jung_game_state', JSON.stringify({
            ...gameState,
            lastSaved: new Date().toISOString(),
        }));
    }, [gameState]);

    const updateGameState = (updates: Partial<GameState>) => {
        setGameState(prev => ({ ...prev, ...updates }));
    };

    const unlockChapter = (chapterId: number) => {
        setGameState(prev => ({
            ...prev,
            chapterProgress: {
                ...prev.chapterProgress,
                [chapterId]: {
                    ...prev.chapterProgress[chapterId],
                    isUnlocked: true,
                },
            },
        }));
    };

    const completeChapter = (chapterId: number) => {
        setGameState(prev => ({
            ...prev,
            completedChapters: prev.completedChapters.includes(chapterId)
                ? prev.completedChapters
                : [...prev.completedChapters, chapterId],
            chapterProgress: {
                ...prev.chapterProgress,
                [chapterId]: {
                    ...prev.chapterProgress[chapterId],
                    isCompleted: true,
                    progress: 100,
                },
            },
        }));

        if (chapterId < 8) {
            setTimeout(() => unlockChapter(chapterId + 1), 100);
        }
    };

    const addToInventory = (category: keyof PsychologicalInventory, item: string) => {
        setGameState(prev => ({
            ...prev,
            psychologicalInventory: {
                ...prev.psychologicalInventory,
                [category]: [...prev.psychologicalInventory[category], item],
            },
        }));
    };

    const addMandala = (mandala: MandalaData) => {
        setGameState(prev => ({
            ...prev,
            mandalas: [...prev.mandalas, mandala],
        }));
    };

    const addChoice = (choice: Choice) => {
        setGameState(prev => ({
            ...prev,
            choices: [...prev.choices, choice],
        }));
    };

    const addJournalEntry = (entry: DreamJournalEntry) => {
        setGameState(prev => ({
            ...prev,
            dreamJournal: [...prev.dreamJournal, entry],
        }));
    };

    const updateChapterProgress = (chapterId: number, updates: Partial<ChapterProgress>) => {
        setGameState(prev => ({
            ...prev,
            chapterProgress: {
                ...prev.chapterProgress,
                [chapterId]: {
                    ...prev.chapterProgress[chapterId],
                    ...updates,
                },
            },
        }));
    };

    const resetGame = () => {
        setGameState(DEFAULT_GAME_STATE);
        localStorage.removeItem('jung_game_state');
    };

    const contextValue: GameStateContextType = {
        gameState,
        updateGameState,
        unlockChapter,
        completeChapter,
        addToInventory,
        addMandala,
        addChoice,
        addJournalEntry,
        updateChapterProgress,
        resetGame,
    };

    return (
        <GameStateContext.Provider value={contextValue}>
            {children}
        </GameStateContext.Provider>
    );
}

export function useGameState() {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error('useGameState must be used within GameStateProvider');
    }
    return context;
}

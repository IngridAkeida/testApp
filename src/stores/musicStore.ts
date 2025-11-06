import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MusicChallenge } from '../types';


interface MusicStore {
challenges: MusicChallenge[];
currentTrack: MusicChallenge | null;
isPlaying: boolean;
currentPosition: number;
loadChallenges: () => void;
setCurrentTrack: (track: MusicChallenge | null) => void;
updateProgress: (challengeId: string, progress: number) => void;
markChallengeComplete: (challengeId: string) => void;
}


const SAMPLE_CHALLENGES: MusicChallenge[] = [
{
id: 'challenge-1',
title: 'All Night',
artist: 'Camo & Krooked',
duration: 219,
points: 150,
audioUrl: 'https://belong-dev-public2.s3.us-east-1.amazonaws.com/misc/Camo-Krooked-All-Night.mp3',
description: 'Listen to this drum & bass classic to earn points',
difficulty: 'easy',
completed: false,
progress: 0,
},
{
id: 'challenge-2',
title: 'New Forms',
artist: 'Roni Size',
duration: 464,
points: 300,
audioUrl: 'https://belong-dev-public2.s3.us-east-1.amazonaws.com/misc/New-Forms-Roni+Size.mp3',
description: 'Complete this legendary track for bonus points',
difficulty: 'medium',
completed: false,
progress: 0,
},
];


export const useMusicStore = create<MusicStore>()(
persist(
(set, get) => ({
challenges: [],
currentTrack: null,
isPlaying: false,
currentPosition: 0,
loadChallenges: () => set({ challenges: SAMPLE_CHALLENGES }),
setCurrentTrack: (track) => set({ currentTrack: track }),
updateProgress: (challengeId, progress) =>
set((state) => ({
challenges: state.challenges.map((c) =>
c.id === challengeId ? { ...c, progress } : c
),
})),
markChallengeComplete: (challengeId) =>
set((state) => ({
challenges: state.challenges.map((c) =>
c.id === challengeId ? { ...c, completed: true } : c
),
})),
}),
{
name: 'music-store', 
}
)
);

// // Selector functions for performance
// export const selectCurrentTrack = (state: MusicStore) => state.currentTrack;
// export const selectIsPlaying = (state: MusicStore) => state.isPlaying;
// export const selectChallenges = (state: MusicStore) => state.challenges;
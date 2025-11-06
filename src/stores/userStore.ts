import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface UserStore {
  totalPoints: number;
  completedChallenges: string[];
  addPoints: (points: number) => void;
  completeChallenge: (challengeId: string) => void;
}


export const useUserStore = create<UserStore>()(
persist(
(set) => ({
totalPoints: 0,
completedChallenges: [],
addPoints: (points) => set((s) => ({ totalPoints: s.totalPoints + points })),
completeChallenge: (challengeId) =>
set((s) => ({ completedChallenges: [...s.completedChallenges, challengeId] })),
}),
{ name: 'user-store' }
)
);

// Selector functions
export const selectTotalPoints = (state: UserStore) => state.totalPoints;
export const selectCompletedChallenges = (state: UserStore) => state.completedChallenges;
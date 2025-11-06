import { useCallback, useEffect, useState } from 'react';
import { useMusicStore } from '../stores/musicStore';
import { useUserStore } from '../stores/userStore';


export const useChallenges = () => {
const loadChallenges = useMusicStore((s) => s.loadChallenges);
const challenges = useMusicStore((s) => s.challenges);
const completed = useUserStore((s) => s.completedChallenges);
const markComplete = useMusicStore((s) => s.markChallengeComplete);
const userComplete = useUserStore((s) => s.completeChallenge);
const addPoints = useUserStore((s) => s.addPoints);


const refreshChallenges = useCallback(async () => {
// fake remote load (here synchronous)
loadChallenges();
}, [loadChallenges]);


const completeChallenge = useCallback(async (challengeId: string) => {
markComplete(challengeId);
userComplete(challengeId);
// find track points
const c = challenges.find((x) => x.id === challengeId);
if (c) addPoints(c.points);
}, [markComplete, userComplete, addPoints, challenges]);


useEffect(() => { refreshChallenges(); }, [refreshChallenges]);


return { challenges, completedChallenges: completed, loading: false, error: null, refreshChallenges, completeChallenge };
};
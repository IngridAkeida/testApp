import { useCallback, useEffect, useRef, useState } from 'react';
import { useProgress } from 'react-native-track-player';


interface PointsCounterConfig { totalPoints: number; durationSeconds: number; challengeId: string }


export const usePointsCounter = () => {
const [currentPoints, setCurrentPoints] = useState(0);
const [pointsEarned, setPointsEarned] = useState(0);
const [isActive, setIsActive] = useState(false);
const [config, setConfig] = useState<PointsCounterConfig | null>(null);
const progress = useProgress();


const startCounting = useCallback((newConfig: PointsCounterConfig) => {
setConfig(newConfig);
setIsActive(true);
setCurrentPoints(0);
setPointsEarned(0);
}, []);


const stopCounting = useCallback(() => {
setIsActive(false);
}, []);


useEffect(() => {
if (!isActive || !config || !progress.duration) return;
const pct = Math.min(100, (progress.position / progress.duration) * 100);
const earned = Math.floor((pct / 100) * config.totalPoints);
if (earned !== pointsEarned) {
setPointsEarned(earned);
setCurrentPoints(earned);
}
}, [progress.position, progress.duration, isActive, config, pointsEarned]);


return {
currentPoints,
pointsEarned,
progress: config && progress.duration ? (progress.position / progress.duration) * 100 : 0,
isActive,
startCounting,
stopCounting,
resetProgress: () => {
setCurrentPoints(0); setPointsEarned(0);
}
};
};
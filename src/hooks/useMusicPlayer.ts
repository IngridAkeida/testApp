import { useCallback, useEffect, useState } from 'react';
import TrackPlayer, { 
  Capability, 
  State, 
  usePlaybackState, 
  useProgress 
} from 'react-native-track-player';

import { MusicChallenge } from '../types/index';

let isPlayerSetupAttempted = false;

export const setupTrackPlayer = async () => {
  if (isPlayerSetupAttempted) {
      return; 
  }
  isPlayerSetupAttempted = true;
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SeekTo,
    ],
    });
    console.log('TrackPlayer initialized successfully.');
  } catch (e) {
    console.warn('TrackPlayer setup failed or already initialized', e);
  }
};


export const useMusicPlayer = () => {
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [currentTrack, setCurrentTrack] = useState<MusicChallenge | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


useEffect(() => {
setupTrackPlayer();
return () => {
// cleanup not to leave player running in dev
};
}, []);


const play = useCallback(async (track: MusicChallenge) => {
try {
setLoading(true);
setError(null);
await TrackPlayer.reset();
await TrackPlayer.add({
id: track.id,
url: track.audioUrl,
title: track.title,
artist: track.artist,
});
await TrackPlayer.play();
setCurrentTrack(track);
} catch (err) {
setError(err instanceof Error ? err.message : 'Playback failed');
} finally {
setLoading(false);
}
}, []);


const pause = useCallback(async () => {
await TrackPlayer.pause();
}, []);


const seekTo = useCallback(async (seconds: number) => {
await TrackPlayer.seekTo(seconds);
}, []);


  return {
    isPlaying: playbackState.state === State.Playing,
    currentTrack,
    currentPosition: progress.position,
    duration: progress.duration,
    play,
    pause,
    seekTo,
    loading,
    error,
  };
};
// TypeScript type definitions for MusicRewards app

import { TextStyle, ViewStyle } from "react-native";

export interface MusicChallenge {
id: string;
title: string;
artist: string;
duration: number;
points: number;
audioUrl: string;
imageUrl?: string;
description: string;
difficulty: 'easy' | 'medium' | 'hard';
completed: boolean;
progress: number; 
completedAt?: string;
}

export interface PointsCounterConfig {
  totalPoints: number;
  durationSeconds: number;
  challengeId: string;
}

export interface UseMusicPlayerReturn {
  isPlaying: boolean;
  currentTrack: MusicChallenge | null;
  currentPosition: number;
  duration: number;
  play: (track: MusicChallenge) => Promise<void>;
  pause: () => void;
  resume: () => void;
  seekTo: (seconds: number) => void;
  loading: boolean;
  error: string | null;
}

export interface UsePointsCounterReturn {
  currentPoints: number;
  pointsEarned: number;
  progress: number; // 0-100
  isActive: boolean;
  startCounting: (config: PointsCounterConfig) => void;
  stopCounting: () => void;
  resetProgress: () => void;
}

export interface UseChallengesReturn {
  challenges: MusicChallenge[];
  completedChallenges: string[];
  loading: boolean;
  error: string | null;
  refreshChallenges: () => Promise<void>;
  completeChallenge: (challengeId: string) => Promise<void>;
}

export interface GlassButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary';
}

export interface PointsCounterProps {
  points: number;
  size?: 'sm' | 'md' | 'lg';
}

export interface ChallengeCardProps {
  challenge: MusicChallenge;
  onPlay: (challenge: MusicChallenge) => void;
  isCurrentTrack?: boolean;
  isPlaying?: boolean;
}

export interface ChallengeListProps {
  onPlay: (challenge: MusicChallenge) => void;
}
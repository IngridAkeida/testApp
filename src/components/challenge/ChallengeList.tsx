import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { ChallengeCard } from './ChallengeCard';
import { useChallenges } from '../../hooks/useChallenges';
import { ChallengeListProps } from '../../types';

export const ChallengeList: React.FC<ChallengeListProps> = ({ onPlay }) => {
  const { challenges } = useChallenges();

  return (
    <View style={styles.container}>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChallengeCard challenge={item} onPlay={onPlay} />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
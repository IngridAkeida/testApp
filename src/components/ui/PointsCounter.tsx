import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../../constants/theme';
import type { PointsCounterProps } from '../../types';

export const PointsCounter: React.FC<PointsCounterProps> = ({ points, size = 'md' }) => {
  const fontSizes = {
    sm: THEME.fonts.sizes.sm,
    md: THEME.fonts.sizes.md,
    lg: THEME.fonts.sizes.lg,
  };

  const paddingSizes = {
    sm: 6,
    md: 10,
    lg: 14,
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingVertical: paddingSizes[size],
          paddingHorizontal: paddingSizes[size] * 2,
          borderRadius: THEME.borderRadius.md,
        },
      ]}
    >
      <Text style={[styles.text, { fontSize: fontSizes[size] }]}>{points} pts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.glass,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: THEME.colors.text.primary,
    fontWeight: 'bold',
  },
});

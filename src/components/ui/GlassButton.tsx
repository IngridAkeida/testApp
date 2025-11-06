import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { GlassCard } from "./GlassCard";
import { THEME } from "../../constants/theme";
import type { GlassButtonProps } from '../../types';

// Glass Button Component
export const GlassButton: React.FC<GlassButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
  variant = 'primary',
}) => {
  const gradientColors = variant === 'primary' 
    ? THEME.glass.gradientColors.primary
    : THEME.glass.gradientColors.secondary;

  return (
    <GlassCard
      gradientColors={gradientColors}
      style={StyleSheet.flatten([styles.button, style])}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={styles.buttonContent}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color={THEME.colors.text.primary} size="small" />
        ) : (
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: THEME.spacing.md,
  },
  button: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: THEME.colors.text.primary,
    fontSize: THEME.fonts.sizes.md,
    fontWeight: '600',
  },
});
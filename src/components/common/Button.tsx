import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ButtonProps } from "../../types";
import { colors, borderRadius, fontSize } from "../../utils/theme";

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled,
}: ButtonProps): React.ReactElement => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        disabled ? styles.disabled : styles.default,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: borderRadius.l,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: fontSize.l,
    fontWeight: 600,
    color: colors.primary,
  },
  default: {
    backgroundColor: colors.primary,
  },
  disabled: {
    backgroundColor: colors.primaryLight,
  },
});

export default Button;

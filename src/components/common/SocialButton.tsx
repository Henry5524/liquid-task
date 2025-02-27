import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SocialButtonProps } from "../../types";
import { colors, borderRadius } from "../../utils/theme";

const SocialButton: React.FC<SocialButtonProps> = ({ icon, onPress }) => {
  const renderIcon = () => {
    switch (icon) {
      case "apple":
        return <FontAwesome name="apple" size={24} color="black" />;
      case "google":
        return <FontAwesome name="google" size={24} color="#DB4437" />;
      case "instagram":
        return <FontAwesome name="instagram" size={24} color="#C13584" />;
      default:
        return <Ionicons name="logo-github" size={24} color="black" />;
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {renderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.circular,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
});

export default SocialButton;

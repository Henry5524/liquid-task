import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSize, spacing, borderRadius } from "../../utils/theme";

interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  options: DropdownOption[] | string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
  selectorStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  textStyle?: TextStyle;
  selectedItemStyle?: ViewStyle;
  selectedTextStyle?: TextStyle;
  dropdownItemStyle?: ViewStyle;
  dropdownItemTextStyle?: TextStyle;
  width?: number;
  iconColor?: string;
  showIcon?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder = "Select",
  containerStyle,
  selectorStyle,
  dropdownStyle,
  textStyle,
  selectedItemStyle,
  selectedTextStyle,
  dropdownItemStyle,
  dropdownItemTextStyle,
  width = 90,
  iconColor = colors.white,
  showIcon = true,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;

  const dropdownOptions: DropdownOption[] = options.map((option) =>
    typeof option === "string"
      ? { label: option, value: option }
      : (option as DropdownOption)
  );

  const selectedOption = dropdownOptions.find(
    (option) => option.value === selectedValue
  );

  useEffect(() => {
    if (showDropdown) {
      Animated.timing(dropdownAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(dropdownAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [showDropdown]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setShowDropdown(false);
  };

  const dropdownAnimationStyle = {
    opacity: dropdownAnimation,
    transform: [
      {
        translateY: dropdownAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
        }),
      },
    ],
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.selector, selectorStyle]}
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        <Text style={[styles.selectorText, textStyle]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        {showIcon && (
          <Ionicons
            name={showDropdown ? "chevron-up" : "chevron-down"}
            size={18}
            color={iconColor}
          />
        )}
      </TouchableOpacity>

      {showDropdown && (
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View style={styles.dropdownOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.dropdown,
                  { width },
                  dropdownAnimationStyle,
                  dropdownStyle,
                ]}
              >
                {dropdownOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.dropdownItem,
                      dropdownItemStyle,
                      selectedValue === option.value && styles.selectedItem,
                      selectedValue === option.value && selectedItemStyle,
                    ]}
                    onPress={() => handleSelect(option.value)}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        dropdownItemTextStyle,
                        selectedValue === option.value &&
                          styles.selectedItemText,
                        selectedValue === option.value && selectedTextStyle,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: spacing.xs,
  },
  selectorText: {
    fontSize: fontSize.m,
    color: colors.white,
    opacity: 0.8,
    marginRight: spacing.xs,
  },
  dropdownOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  dropdown: {
    position: "absolute",
    top: spacing.l,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.m,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    overflow: "hidden",
    zIndex: 101,
  },
  dropdownItem: {
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
  },
  selectedItem: {
    backgroundColor: colors.secondary,
  },
  dropdownItemText: {
    fontSize: fontSize.m,
    color: colors.white,
  },
  selectedItemText: {
    fontWeight: "600",
    color: colors.primaryDark,
  },
});

export default CustomDropdown;

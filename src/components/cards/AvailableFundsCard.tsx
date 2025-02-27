import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSize, spacing, borderRadius } from "../../utils/theme";
import { CustomDropdown } from "../common";

interface AvailableFundsProps {
  amount: number;
}

const PERIODS = ["Week", "Month", "Quarter", "Year"];

const AvailableFunds: React.FC<AvailableFundsProps> = ({ amount }) => {
  const [period, setPeriod] = useState<string>("Month");

  const handlePeriodChange = (selectedPeriod: string) => {
    setPeriod(selectedPeriod);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Available Funds</Text>
        <CustomDropdown
          options={PERIODS}
          selectedValue={period}
          onSelect={handlePeriodChange}
          width={90}
          iconColor={colors.white}
          textStyle={styles.periodText}
          selectorStyle={styles.periodSelector}
          dropdownStyle={styles.customDropdown}
          selectedItemStyle={styles.selectedPeriod}
        />
      </View>
      <Text style={styles.amount}>${amount.toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    borderRadius: borderRadius.l,
    backgroundColor: colors.primary,
    opacity: 0.7,
    marginBottom: spacing.l,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: fontSize.l,
    color: colors.white,
    opacity: 0.8,
    fontWeight: "500",
  },
  periodSelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  periodText: {
    width: 60,
    fontSize: fontSize.m,
    color: colors.white,
    textAlign: "right",
    opacity: 0.8,
    marginRight: spacing.xs,
  },
  amount: {
    fontSize: fontSize.xxxl,
    fontWeight: "bold",
    color: colors.white,
  },
  customDropdown: {
    backgroundColor: colors.primaryLight,
  },
  selectedPeriod: {
    backgroundColor: colors.secondary,
  },
});

export default AvailableFunds;

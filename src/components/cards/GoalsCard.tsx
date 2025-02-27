import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SpendingGoal } from "@/types";
import { colors, fontSize, spacing, borderRadius } from "../../utils/theme";

const SpendingGoalsCard: React.FC<{ goal: SpendingGoal }> = ({ goal }) => {
  const progress = (goal.current / goal.target) * 100;
  const isNearLimit = progress >= 90;

  return (
    <View style={styles.goalItem}>
      <View style={styles.topContainer}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={goal.iconName as any}
            size={24}
            color={colors.primary}
          />
        </View>

        <View style={styles.goalInfo}>
          <Text style={styles.categoryName}>{goal.category}</Text>
          {goal.warning && <Text style={styles.warning}>{goal.warning}</Text>}
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.amounts}>
          <Text style={styles.amount}>${goal.current}</Text>
          <Text style={styles.target}>of ${goal.target}</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${progress}%`,
                backgroundColor: isNearLimit ? colors.warning : colors.primary,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    flexDirection: "column",
    marginBottom: spacing.l,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.m,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.m,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.m,
  },
  goalInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  categoryName: {
    fontSize: fontSize.xxl,
    fontWeight: "600",
    color: colors.text,
  },
  warning: {
    fontSize: fontSize.s,
    color: colors.accent,
  },
  progressContainer: {
    width: "100%",
  },
  amounts: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  amount: {
    fontSize: fontSize.l,
    fontWeight: "600",
    color: colors.text,
    marginRight: spacing.xs,
  },
  target: {
    fontSize: fontSize.m,
    color: colors.textLight,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.s,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: borderRadius.s,
  },
});

export default SpendingGoalsCard;

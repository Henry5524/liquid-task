import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Path, G } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSize, spacing } from "../../utils/theme";
import { ExpensesDetails } from "@/types";

interface ExpenseCircleProps {
  totalExpenses: number;
  expensesDetails: ExpensesDetails[];
}

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const createSegmentPath = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  thickness: number
) => {
  const innerRadius = radius - thickness / 2;
  const outerRadius = radius + thickness / 2;

  const outerStart = polarToCartesian(x, y, outerRadius, startAngle);
  const outerEnd = polarToCartesian(x, y, outerRadius, endAngle);
  const innerStart = polarToCartesian(x, y, innerRadius, startAngle);
  const innerEnd = polarToCartesian(x, y, innerRadius, endAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    outerStart.x,
    outerStart.y,
    "A",
    outerRadius,
    outerRadius,
    0,
    largeArcFlag,
    1,
    outerEnd.x,
    outerEnd.y,
    "L",
    innerEnd.x,
    innerEnd.y,
    "A",
    innerRadius,
    innerRadius,
    0,
    largeArcFlag,
    0,
    innerStart.x,
    innerStart.y,
    "L",
    outerStart.x,
    outerStart.y,
    "Z",
  ].join(" ");
};

const ExpenseCircle: React.FC<ExpenseCircleProps> = ({
  totalExpenses,
  expensesDetails,
}) => {
  const formattedAmount = totalExpenses.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const size = 220;
  const center = size / 2;
  const trackThickness = 28;
  const radius = center - trackThickness / 2;

  const segmentGap = 2;

  const totalPercentage = expensesDetails.reduce(
    (sum, item) => sum + item.percentage,
    0
  );

  const totalSegments = expensesDetails.length;
  const totalGapDegrees = segmentGap * totalSegments;
  const availableDegrees = 360 - totalGapDegrees;

  let currentAngle = 0;
  const segments = expensesDetails.map((expense, index) => {
    const normalizedPercentage =
      totalPercentage !== 100
        ? (expense.percentage / totalPercentage) * 100
        : expense.percentage;

    const sweepAngle = (normalizedPercentage / 100) * availableDegrees;

    const startAngle = currentAngle + segmentGap / 2;
    const endAngle = startAngle + sweepAngle;

    const iconAngle = startAngle + sweepAngle / 2;
    const iconPosition = polarToCartesian(center, center, radius, iconAngle);

    const segment = {
      path: createSegmentPath(
        center,
        center,
        radius,
        startAngle,
        endAngle,
        trackThickness
      ),
      icon: expense.icon,
      iconPosition,
      percentage: expense.percentage,
    };

    currentAngle = endAngle + segmentGap / 2;
    return segment;
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Svg width={size} height={size}>
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={trackThickness}
            fill="none"
          />

          {segments.map((segment, index) => (
            <Path
              key={index}
              d={segment.path}
              fill="rgba(255, 255, 255, 0.15)"
            />
          ))}
        </Svg>

        {segments.map((segment, index) => (
          <View
            key={`icon-${index}`}
            style={[
              styles.iconContainer,
              {
                left: segment.iconPosition.x - 12,
                top: segment.iconPosition.y - 12,
              },
            ]}
          >
            <Ionicons name={segment.icon as any} size={16} color="#ffffff" />
          </View>
        ))}

        <View style={styles.innerContent}>
          <Text style={styles.label}>Total Expenses</Text>
          <Text style={styles.amount}>${formattedAmount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.m,
  },
  circleContainer: {
    width: 220,
    height: 220,
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  innerContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    height: "60%",
    zIndex: 5,
  },
  label: {
    fontSize: fontSize.s,
    color: colors.white,
    opacity: 0.8,
    marginBottom: spacing.m,
  },
  amount: {
    fontSize: fontSize.xxl,
    color: colors.white,
  },
});

export default ExpenseCircle;

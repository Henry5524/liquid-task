import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import { SpendingGoal } from "../../types";
import { colors, fontSize, spacing, borderRadius } from "../../utils/theme";
import { SpendingGoalsCard } from "../cards";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SNAP_POINTS = {
  COLLAPSED: SCREEN_HEIGHT,
  MIN_THRESHOLD: SCREEN_HEIGHT * 0.7,
  INITIAL: SCREEN_HEIGHT * 0.6,
  FULL: SCREEN_HEIGHT * 0.2,
  MAX_EXPANSION: SCREEN_HEIGHT * 0.2,
};

const DRAG_THRESHOLD = 50;

interface SpendingGoalsProps {
  goals: SpendingGoal[];
}

const SpendingGoals: React.FC<SpendingGoalsProps> = ({ goals }) => {
  const [currentPosition, setCurrentPosition] = useState("INITIAL");
  const translateY = useRef(new Animated.Value(SNAP_POINTS.INITIAL)).current;

  const renderDragHandle = () => (
    <View style={styles.dragHandleContainer}>
      <View style={styles.dragHandle} />
    </View>
  );

  const snapTo = (position: "COLLAPSED" | "INITIAL" | "FULL") => {
    const toValue = SNAP_POINTS[position];
    setCurrentPosition(position);

    Animated.spring(translateY, {
      toValue,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dy) > 10 && Math.abs(gesture.dx) < 20;
      },
      onPanResponderGrant: () => {
        translateY.stopAnimation();
        translateY.extractOffset();
      },
      onPanResponderMove: (_, gesture) => {
        const proposedTranslateY = gesture.dy;
        const currentPositionValue = SNAP_POINTS["INITIAL"];
        const absolutePosition = currentPositionValue + proposedTranslateY;

        if (absolutePosition < SNAP_POINTS.MAX_EXPANSION) {
          translateY.setValue(SNAP_POINTS.MAX_EXPANSION - currentPositionValue);
        } else if (absolutePosition > SCREEN_HEIGHT) {
          translateY.setValue(SCREEN_HEIGHT - currentPositionValue);
        } else {
          translateY.setValue(proposedTranslateY);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        translateY.flattenOffset();

        let currentRawValue = 0;
        // @ts-ignore
        currentRawValue = translateY.__getValue ? translateY.__getValue() : 0;

        const currentPositionValue = SNAP_POINTS["INITIAL"];
        const currentAbsolutePosition = currentPositionValue + currentRawValue;

        if (currentAbsolutePosition > SNAP_POINTS.MIN_THRESHOLD) {
          snapTo("INITIAL");
          return;
        }

        if (
          gesture.vy > 0.5 ||
          (gesture.dy > DRAG_THRESHOLD && currentPosition !== "COLLAPSED")
        ) {
          if (currentPosition === "FULL") {
            snapTo("INITIAL");
          } else {
            snapTo("COLLAPSED");
          }
        } else if (
          gesture.vy < -0.5 ||
          (gesture.dy < -DRAG_THRESHOLD && currentPosition !== "FULL")
        ) {
          if (currentPosition === "COLLAPSED") {
            snapTo("INITIAL");
          } else {
            snapTo("FULL");
          }
        } else {
          snapTo(currentPosition as "COLLAPSED" | "INITIAL" | "FULL");
        }
      },
    })
  ).current;

  useEffect(() => {
    snapTo("INITIAL");
  }, []);

  return (
    <Animated.View
      style={[
        styles.drawer,
        {
          transform: [{ translateY }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.drawerTitle}>Spending Goals</Text>
        <View style={styles.goalsContainer}>
          {goals && goals.length > 0 ? (
            goals.map((goal) => <SpendingGoalsCard key={goal.id} goal={goal} />)
          ) : (
            <Text style={styles.emptyMessage}>No spending goals available</Text>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    width: "100%",
    height: SCREEN_HEIGHT * 0.8,
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: borderRadius.m,
    elevation: spacing.m,
  },
  dragHandleContainer: {
    width: "100%",
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xs,
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.textLight || "#CCCCCC",
    opacity: 0.5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: spacing.m,
  },
  drawerTitle: {
    fontSize: fontSize.xxl,
    textAlign: "left",
    marginVertical: spacing.l,
    color: colors.text,
  },
  goalsContainer: {
    flex: 1,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: spacing.xl,
    color: colors.text,
    fontSize: fontSize.m,
  },
});

export default SpendingGoals;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { HomeScreenProps } from "../types";
import { ExpenseCircle, SpendingGoals } from "../components/home";
import { colors, spacing, fontSize } from "../utils/theme";
import AvailableFunds from "@/components/cards/AvailableFundsCard";

const HomeScreen: React.FC<HomeScreenProps> = ({ user, financialData }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={colors.gradient.primary as [string, string, string]}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <Image
                source={
                  user
                    ? user.profileImage
                    : require("../../src/assets/images/not_image.png")
                }
                style={styles.profileImage}
              />
              <View style={styles.greeting}>
                <Text style={styles.greetingText}>Hello, {user.name}!</Text>
                <Text style={styles.greetingSubtext}>
                  Welcome to your financial insight.
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <AvailableFunds amount={financialData.availableFunds} />
          <ExpenseCircle
            totalExpenses={financialData.totalExpenses}
            expensesDetails={financialData.expensesDetails}
          />
        </SafeAreaView>

        <SpendingGoals goals={financialData.spendingGoals} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: spacing.l,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: spacing.l,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.white,
  },
  greeting: {
    marginLeft: spacing.m,
  },
  greetingText: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
    color: colors.white,
  },
  greetingSubtext: {
    fontSize: fontSize.m,
    color: colors.white,
    opacity: 0.8,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;

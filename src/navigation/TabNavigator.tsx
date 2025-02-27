import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, NotFoundScreen } from "@/screens";
import { colors } from "../utils/theme";
import { FinancialData, TabIconProps, User } from "@/types";

interface TabNavigatorProps {
  user: User;
  financialData: FinancialData;
  navigation: any;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const EmptyScreen: React.FC = () => <View style={styles.emptyScreen} />;

interface LiquidButtonProps {
  color: string;
  badgeCount: number;
}

const LiquidButton: React.FC<LiquidButtonProps> = ({ color, badgeCount }) => (
  <View style={styles.liquidButtonContainer}>
    <View style={styles.liquidButton}>
      <Image
        source={require("../../src/assets/liquid-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </View>
  </View>
);

const MainTabNavigator: React.FC<TabNavigatorProps> = ({
  user,
  financialData,
}) => {
  const spendingGoalsCount = financialData?.spendingGoals?.length || 0;

  const getTabIcon = (
    routeName: string,
    focused: boolean
  ): keyof typeof Ionicons.glyphMap => {
    const icons = {
      Home: focused ? "home" : "home-outline",
      Stats: focused ? "stats-chart" : "stats-chart-outline",
      Cards: focused ? "card" : "card-outline",
      Favorites: focused ? "heart" : "heart-outline",
    };

    return (icons[routeName as keyof typeof icons] ||
      "home-outline") as keyof typeof Ionicons.glyphMap;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }: TabIconProps) => {
          if (route.name === "Liquid") {
            return (
              <LiquidButton color={color} badgeCount={spendingGoalsCount} />
            );
          }

          const iconName = getTabIcon(route.name, focused);
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        headerShown: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <HomeScreen {...props} user={user} financialData={financialData} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Stats" component={NotFoundScreen} />
      <Tab.Screen
        name="Liquid"
        component={NotFoundScreen}
        options={{
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen name="Cards" component={NotFoundScreen} />
      <Tab.Screen name="Favorites" component={NotFoundScreen} />
    </Tab.Navigator>
  );
};

const TabNavigator: React.FC<TabNavigatorProps> = ({
  user,
  financialData,
  navigation,
}) => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background || "#F8F9FA",
    },
  };

  return (
    <NavigationContainer
      theme={theme}
      fallback={<NotFoundScreen navigation={navigation} />}
      independent={true}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs">
          {(props) => (
            <MainTabNavigator
              {...props}
              user={user}
              financialData={financialData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  emptyScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabBar: {
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
    borderTopWidth: 0,
    elevation: 0, // for Android
    shadowOpacity: 0, // for iOS
  },
  liquidButtonContainer: {
    height: 70,
    width: 70,
    position: "relative",
  },
  liquidButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 35,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 70,
    position: "relative",
  },
  logo: {
    width: 40,
    height: 40,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.primaryDark,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 6,
  },
});

export default TabNavigator;

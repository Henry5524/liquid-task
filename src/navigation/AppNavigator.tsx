import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "@/screens";
import { FinancialData, User } from "@/types";
import { mockFinancialData, mockUser } from "@/utils/mockData";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user] = useState<User>(mockUser);
  const [financialData] = useState<FinancialData>(mockFinancialData);

  const handleLogin = (): void => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main">
            {(props) => (
              <TabNavigator
                {...props}
                user={user}
                financialData={financialData}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

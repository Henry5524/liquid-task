import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, SocialButton } from "../components/common";
import { LoginScreenProps } from "../types";
import { colors, spacing, fontSize } from "../utils/theme";

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    onLogin();
  };

  const handleCreateAccount = () => {
    // Navigate to create account screen
    console.log("Navigate to create account");
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    console.log("Navigate to forgot password");
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login
    console.log(`Login with ${provider}`);
    onLogin();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../src/assets/liquid-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Welcome to Liquid</Text>
            <Text style={styles.subtitleText}>
              Please sign in with your account
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Input
              label="Email ID"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email ID"
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter Password"
            />
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <Button
            title="Sign In"
            onPress={handleLogin}
            style={styles.signInButton}
            textStyle={styles.signInButtonText}
            disabled={!email || !password}
          />

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or login with</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <SocialButton
              icon="apple"
              onPress={() => handleSocialLogin("apple")}
            />
            <SocialButton
              icon="google"
              onPress={() => handleSocialLogin("google")}
            />
            <SocialButton
              icon="instagram"
              onPress={() => handleSocialLogin("instagram")}
            />
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't Have an Account yet? </Text>
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.createAccountText}>Create New</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.l,
    paddingBottom: spacing.xxl,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: spacing.xxl,
    marginBottom: spacing.l,
  },
  logo: {
    width: 120,
    height: 120,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  welcomeText: {
    fontSize: fontSize.xxxl,
    fontWeight: "bold",
    marginBottom: spacing.xs,
    color: colors.text,
  },
  subtitleText: {
    fontSize: fontSize.m,
    color: colors.textLight,
  },
  formContainer: {
    marginBottom: spacing.l,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    fontSize: fontSize.m,
    color: colors.textLight,
  },
  signInButton: {
    marginBottom: spacing.xxl,
  },
  signInButtonText: {
    color: colors.background,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.m,
    color: colors.textLight,
    fontSize: fontSize.m,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.m,
    marginBottom: spacing.xxl,
  },
  socialButton: {
    marginHorizontal: spacing.m,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    fontSize: fontSize.m,
    color: colors.textLight,
  },
  createAccountText: {
    fontSize: fontSize.m,
    fontWeight: "bold",
    color: colors.primary,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;

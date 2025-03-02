import { useContext, useState } from "react";
import { Text, View, ScrollView, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ThemeContext } from "../utils/themeContext";
import { SFProText, SpaceMono } from "@/components/StyledText";
import { useRouter } from "expo-router";

// Components
import AuthCarousel from "@/components/auth/AuthCarousel";

// Services and Context
import { login, LoginCredentials } from "@/services/authService";
import { useAuth } from "@/utils/authContext";

// Images
import Logo from "@/assets/images/grain-logo.png"

export default function Index() {
  const { colors } = useTheme();
  const { theme, setTheme } = useContext(ThemeContext);
  const { signIn, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Handle login function
  const handleLogin = async () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      const credentials: LoginCredentials = { username, password };
      // Use provided credentials for login
      // console.log('Attempting login with credentials:', credentials);
      const userData = await login(credentials);
      
      // Call the signIn function from auth context
      await signIn(userData);
      
      // Router will automatically navigate to tabs based on auth status
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
      enableOnAndroid
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingVertical: 16
        }}
      >

        <AuthCarousel />
        <View>
          <Image source={Logo} style={styles.logo} />
        </View>

        <SFProText
          style={{
            marginTop: 20,
            color: colors.text,
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
          onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          Toggle Theme
        </SFProText>

        <View style={styles.formContainer}>
          <SpaceMono style={[styles.welcomeText, { color: colors.text }]}>Your space for inspiration, ideas, and creativity.</SpaceMono>

          <View style={styles.inputContainer}>
            <SFProText style={[styles.label, { color: colors.text }]}>Username</SFProText>
            <TextInput
              style={[styles.input, { color: colors.text, backgroundColor: colors.backgroundFaint }]}
              placeholder="Enter username"
              placeholderTextColor="#9e9e9e"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <SFProText style={[styles.label, { color: colors.text }]}>Password</SFProText>
            <TextInput
              style={[styles.input, { color: colors.text, backgroundColor: colors.backgroundFaint }]}
              placeholder="Enter password"
              placeholderTextColor="#9e9e9e"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
          </View>

          <TouchableOpacity>
            <SFProText style={[styles.forgotPassword, {color: colors.text}]}>Forgot password?</SFProText>
          </TouchableOpacity>

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
          
          <TouchableOpacity 
            style={[
              styles.loginButton, 
              {backgroundColor: colors.primary},
              isLoading && { opacity: 0.7 }
            ]}
            onPress={handleLogin}
            disabled={isLoading || !username || !password}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <SpaceMono style={styles.loginButtonText}>LOG IN</SpaceMono>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={[styles.dividerText, { color: colors.text }]}>OR</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
              <Text style={[styles.socialButtonText, { color: colors.text }]}>CONTINUE WITH FACEBOOK</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialButton, styles.appleButton, { borderColor: colors.text }]}>
              <Text style={[styles.socialButtonText, { color: colors.text }]}>CONTINUE WITH APPLE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
              <Text style={[styles.socialButtonText, { color: colors.text }]}>CONTINUE WITH GOOGLE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.noAccountText}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.signupText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: '#FF3B30',
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 85,
    height: 85,
    marginBottom: 10,
    marginHorizontal: 'auto'
  },
  appName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  welcomeText: {
    fontSize: 22,
    width: '85%',
    marginHorizontal: 'auto',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    borderRadius: 4,
    padding: 14,
    fontSize: 14,
  },
  forgotPassword: {
    color: '#fff',
    textAlign: 'right',
    marginBottom: 30,
  },
  loginButton: {
    // backgroundColor: '#1DB954',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#4f4f4f',
  },
  dividerText: {
    color: '#fff',
    paddingHorizontal: 10,
  },
  socialButtonsContainer: {
    marginBottom: 30,
  },
  socialButton: {
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  facebookButton: {
    borderColor: '#3B5998',
  },
  appleButton: {
    borderColor: '#fff',
  },
  googleButton: {
    borderColor: '#DB4437',
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 20,
  },
  noAccountText: {
    color: '#9e9e9e',
    marginRight: 5,
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

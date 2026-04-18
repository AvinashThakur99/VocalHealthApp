import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(80)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 40, friction: 8, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, { toValue: -15, duration: 1200, useNativeDriver: true }),
        Animated.timing(bounceAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  function handleContinue() {
    router.replace('/(tabs)');
  }

  return (
    <LinearGradient colors={['#020617', '#0f172a', '#1e1b4b']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >

        {/* TOP LOGO */}
        <Animated.View style={[
          styles.logoSection,
          { opacity: fadeAnim, transform: [{ translateY: bounceAnim }] }
        ]}>
          <Animated.View style={[styles.logoCircle, { transform: [{ scale: pulseAnim }] }]}>
            <Text style={styles.logoEmoji}>🎙️</Text>
          </Animated.View>
          <Animated.Text style={[styles.appName, { opacity: fadeAnim }]}>
            Vocal Health
          </Animated.Text>
          <Text style={styles.appTagline}> Voice Based Health Detection</Text>
        </Animated.View>

        {/* CARD */}
        <Animated.View style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }]
          }
        ]}>

          {/* TAB SWITCHER */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tab, !isLogin && styles.tabActive]}
              onPress={() => setIsLogin(false)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, isLogin && styles.tabActive]}
              onPress={() => setIsLogin(true)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* INPUTS */}
          {!isLogin && (
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name..."
                placeholderTextColor="#020b17"
                value={name}
                onChangeText={setName}
              />
            </View>
          )}

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="email@example.com"
              placeholderTextColor="#475569"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password..."
              placeholderTextColor="#475569"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* MAIN BUTTON */}
          <TouchableOpacity
            style={styles.mainBtn}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#6366f1', '#8b5cf6', '#a78bfa']}
              style={styles.mainBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.mainBtnText}>
                {isLogin ? 'Login →' : 'Create Account 🚀'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* DIVIDER */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* GOOGLE BUTTON */}
          <TouchableOpacity
            style={styles.googleBtn}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

        </Animated.View>

        {/* BOTTOM TEXT */}
        <Animated.Text style={[styles.bottomText, { opacity: fadeAnim }]}>
          By continuing, you agree to our Terms & Privacy Policy
        </Animated.Text>

      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },

  // Logo
  logoSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#01060420',
    borderWidth: 2,
    borderColor: '#26e34f',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  logoEmoji: {
    fontSize: 42,
  },
  appName: {
    fontSize: 28,
    color: '#a78bfa',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appTagline: {
    color: '#64748b',
    fontSize: 13,
  },

  // Card
  card: {
    width: '100%',
    backgroundColor: '#0f172a',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1e293b',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#3bdd17',
    borderRadius: 14,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#90a59f',
  },
  tabText: {
    color: '#64748b',
    fontWeight: '600',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#ffffff',
  },

  // Inputs
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 14,
    color: '#f8fafc',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#334155',
  },

  // Main Button
  mainBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  mainBtnGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 16,
  },
  mainBtnText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1e293b',
  },
  dividerText: {
    color: '#475569',
    fontSize: 12,
  },

  // Google
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 14,
    paddingVertical: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#4285f4',
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
  },
  googleText: {
    color: '#94a3b8',
    fontSize: 15,
    fontWeight: '600',
  },

  // Bottom
  bottomText: {
    color: '#334155',
    fontSize: 11,
    textAlign: 'center',
  },
});
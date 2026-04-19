import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  { id: 1, title: 'Welcome to\nHEALTHYFY', subtitle: 'Personalized Vocal Health Monitoring System', colors: ['#0f0c29', '#302b63', '#24243e'], accent: '#a78bfa', emoji: '🎙️' },
  { id: 2, title: 'Record Your\nVoice Daily', subtitle: 'Just 10 seconds — Our App does the rest', colors: ['#0f2027', '#203a43', '#2c5364'], accent: '#38bdf8', emoji: '🎵' },
  { id: 3, title: 'Detects\nIllness Early', subtitle: 'Get notified before symptoms', colors: ['#134e5e', '#71b280', '#134e5e'], accent: '#22c55e', emoji: '🤖' },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const ring1 = useRef(new Animated.Value(0.5)).current;
  const ring2 = useRef(new Animated.Value(0.3)).current;
  const ring3 = useRef(new Animated.Value(0.1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.5);
    slideAnim.setValue(60);
    ring1.setValue(0.5);
    ring2.setValue(0.3);
    ring3.setValue(0.1);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
    Animated.stagger(150, [
      Animated.spring(ring1, { toValue: 1, tension: 40, friction: 8, useNativeDriver: true }),
      Animated.spring(ring2, { toValue: 1, tension: 40, friction: 8, useNativeDriver: true }),
      Animated.spring(ring3, { toValue: 1, tension: 40, friction: 8, useNativeDriver: true }),
    ]).start();
    Animated.loop(Animated.timing(rotateAnim, { toValue: 1, duration: 8000, useNativeDriver: true })).start();
    Animated.loop(Animated.sequence([
      Animated.timing(bounceAnim, { toValue: -20, duration: 1000, useNativeDriver: true }),
      Animated.timing(bounceAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
    ])).start();
    Animated.loop(Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.15, duration: 800, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
    ])).start();
  }, [current]);

  const spin = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  function goNext() {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      router.replace('/auth');
    }
  }

  const slide = slides[current];

  return (
    <LinearGradient colors={slide.colors as any} style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={() => router.replace('/auth')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.illustrationContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Animated.View style={[styles.ring, { width: 280, height: 280, borderColor: slide.accent + '20', transform: [{ scale: ring3 }] }]} />
        <Animated.View style={[styles.ring, { width: 220, height: 220, borderColor: slide.accent + '40', transform: [{ scale: ring2 }] }]} />
        <Animated.View style={[styles.ring, { width: 160, height: 160, borderColor: slide.accent + '70', transform: [{ scale: ring1 }] }]} />
        <Animated.View style={[styles.orbit, { transform: [{ rotate: spin }] }]}>
          <View style={[styles.orbitDot, { backgroundColor: slide.accent }]} />
        </Animated.View>
        <Animated.View style={[styles.mainEmoji, { transform: [{ translateY: bounceAnim }, { scale: pulseAnim }] }]}>
          <View style={[styles.emojiCircle, { backgroundColor: slide.accent + '30', borderColor: slide.accent }]}>
            <Text style={styles.emoji}>{slide.emoji}</Text>
          </View>
        </Animated.View>
        <Animated.View style={[styles.dot1, { backgroundColor: slide.accent, opacity: fadeAnim }]} />
        <Animated.View style={[styles.dot2, { backgroundColor: slide.accent + '80', opacity: fadeAnim }]} />
        <Animated.View style={[styles.dot3, { backgroundColor: slide.accent + '60', opacity: fadeAnim }]} />
      </Animated.View>
      <Animated.View style={[styles.textContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
      </Animated.View>
      <View style={styles.dotsRow}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dotIndicator, { backgroundColor: i === current ? slide.accent : '#ffffff40', width: i === current ? 28 : 8 }]} />
        ))}
      </View>
      <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity style={[styles.nextBtn, { backgroundColor: slide.accent }]} onPress={goNext} activeOpacity={0.85}>
          <Text style={styles.nextBtnText}>{current === slides.length - 1 ? 'Get Started 🚀' : 'Next →'}</Text>
        </TouchableOpacity>
        {current === slides.length - 1 && (
          <TouchableOpacity onPress={() => router.replace('/auth')} style={styles.loginLink}>
            <Text style={styles.loginLinkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingTop: 60, paddingBottom: 50, paddingHorizontal: 24 },
  skipBtn: { alignSelf: 'flex-end', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#ffffff15' },
  skipText: { color: '#ffffff80', fontSize: 14 },
  illustrationContainer: { width: 300, height: 300, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  ring: { position: 'absolute', borderRadius: 999, borderWidth: 1.5 },
  orbit: { position: 'absolute', width: 190, height: 190, justifyContent: 'flex-start', alignItems: 'center' },
  orbitDot: { width: 12, height: 12, borderRadius: 6, marginTop: 4 },
  mainEmoji: { position: 'absolute' },
  emojiCircle: { width: 110, height: 110, borderRadius: 55, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  emoji: { fontSize: 52 },
  dot1: { position: 'absolute', width: 10, height: 10, borderRadius: 5, top: 40, left: 40 },
  dot2: { position: 'absolute', width: 7, height: 7, borderRadius: 4, top: 60, right: 30 },
  dot3: { position: 'absolute', width: 5, height: 5, borderRadius: 3, bottom: 50, left: 60 },
  textContent: { alignItems: 'center', paddingHorizontal: 10 },
  title: { fontSize: 34, fontWeight: 'bold', textAlign: 'center', lineHeight: 42, marginBottom: 16, color: '#ffffff' },
  subtitle: { color: '#ffffffaa', fontSize: 16, textAlign: 'center', lineHeight: 24 },
  dotsRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  dotIndicator: { height: 8, borderRadius: 4 },
  nextBtn: { width: width - 48, paddingVertical: 18, borderRadius: 30, alignItems: 'center', elevation: 10 },
  nextBtnText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  loginLink: { marginTop: 16 },
  loginLinkText: { color: '#ffffff70', fontSize: 14 },
});
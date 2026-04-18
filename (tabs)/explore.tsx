import * as Location from 'expo-location';
import { Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const features = [
  {
    id: '1',
    icon: '🎤',
    title: 'Voice Analysis',
    desc: 'Analyze your voice and detect health issues',
    btnText: 'Start',
    btnColor: '#38bdf8',
    iconBg: '#1e3a8a',
  },
  {
    id: '2',
    icon: '🤖',
    title: 'AI Prediction',
    desc: 'Predict vocal health using AI model',
    btnText: 'Check',
    btnColor: '#22c55e',
    iconBg: '#022c22',
  },
  {
    id: '3',
    icon: '🎧',
    title: 'Voice Training',
    desc: 'Improve your voice with daily exercises',
    btnText: 'Train',
    btnColor: '#6366f1',
    iconBg: '#1e1b4b',
  },
];

const diseases = [
  { name: 'Laryngitis', risk: 'Common', color: '#f59e0b' },
  { name: 'Vocal Nodules', risk: 'Moderate', color: '#ef4444' },
  { name: 'GERD', risk: 'Common', color: '#f59e0b' },
  { name: 'Vocal Polyps', risk: 'Rare', color: '#22c55e' },
  { name: 'Vocal Paralysis', risk: 'Rare', color: '#ef4444' },
  { name: 'Throat Cancer', risk: 'Rare', color: '#ef4444' },
];

const tips = [
  { icon: '💧', tip: 'Drink 8 glass water daily' },
  { icon: '🚭', tip: 'Do not smoke' },
  { icon: '😴', tip: 'Sleep daily 7-8 hours' },
  { icon: '🎤', tip: 'Do not shout too much' },
];

export default function Explore() {

  async function findHospitals() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        const fallback = 'https://www.google.com/maps/search/hospitals+near+me';
        Platform.OS === 'web'
          ? window.open(fallback, '_blank')
          : Linking.openURL(fallback);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;
      const url = `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},14z`;

      Platform.OS === 'web'
        ? window.open(url, '_blank')
        : Linking.openURL(url);

    } catch (err) {
      console.log('Location error:', err);
      const fallback = 'https://www.google.com/maps/search/hospitals+near+me';
      Platform.OS === 'web'
        ? window.open(fallback, '_blank')
        : Linking.openURL(fallback);
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* TITLE */}
      <Animated.Text entering={FadeInUp.duration(400)} style={styles.title}>
        🔍 Explore
      </Animated.Text>
      <Animated.Text entering={FadeInUp.delay(100)} style={styles.subtitle}>
        Discover AI vocal tools & hospitals
      </Animated.Text>

      {/* 🏥 HOSPITAL FINDER */}
      <Animated.View entering={FadeInUp.delay(150)} style={styles.hospitalCard}>
        <View style={styles.hospitalHeader}>
          <Text style={styles.hospitalBigIcon}>🏥</Text>
          <View style={styles.hospitalHeaderText}>
            <Text style={styles.hospitalTitle}>Hospital Finder</Text>
            <Text style={styles.hospitalSubtitle}>Find your nearby Hospital</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.findBtn}
          onPress={findHospitals}
          activeOpacity={0.8}
        >
          <Text style={styles.findBtnIcon}>📍</Text>
          <Text style={styles.findBtnText}>Find your nearby hospital</Text>
        </TouchableOpacity>

        <Text style={styles.hospitalHint}>
          🗺️ Will open in google map — THe exact location will be displayed
        </Text>
      </Animated.View>

      {/* VOCAL TIPS */}
      <Animated.Text entering={FadeInUp.delay(250)} style={styles.sectionTitle}>
        💡 Vocal Health Tips
      </Animated.Text>
      <View style={styles.tipsRow}>
        {tips.map((t, i) => (
          <Animated.View
            key={i}
            entering={FadeInUp.delay(300 + i * 80)}
            style={styles.tipCard}
          >
            <Text style={styles.tipIcon}>{t.icon}</Text>
            <Text style={styles.tipText}>{t.tip}</Text>
          </Animated.View>
        ))}
      </View>

      {/* AI FEATURES */}
      <Animated.Text entering={FadeInUp.delay(400)} style={styles.sectionTitle}>
        🤖 AI Features
      </Animated.Text>
      {features.map((item, index) => (
        <Animated.View
          key={item.id}
          entering={FadeInUp.delay(450 + index * 100)}
          style={styles.card}
        >
          <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
            <Text style={styles.icon}>{item.icon}</Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: item.btnColor }]}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>{item.btnText}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* DISEASES */}
      <Animated.Text entering={FadeInUp.delay(700)} style={styles.sectionTitle}>
        🦠 Vocal Diseases
      </Animated.Text>
      <View style={styles.diseaseGrid}>
        {diseases.map((d, i) => (
          <Animated.View
            key={i}
            entering={FadeInUp.delay(750 + i * 60)}
            style={styles.diseaseCard}
          >
            <Text style={styles.diseaseName}>{d.name}</Text>
            <View style={[styles.riskBadge, { backgroundColor: d.color + '22' }]}>
              <Text style={[styles.riskText, { color: d.color }]}>{d.risk}</Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* QUICK ACTIONS */}
      <Animated.Text entering={FadeInUp.delay(900)} style={styles.sectionTitle}>
        ⚡ Quick Actions
      </Animated.Text>
      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickCard} activeOpacity={0.8}>
          <Text style={styles.quickIcon}>📊</Text>
          <Text style={styles.quickText}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} activeOpacity={0.8}>
          <Text style={styles.quickIcon}>💡</Text>
          <Text style={styles.quickText}>More Tips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} activeOpacity={0.8}>
          <Text style={styles.quickIcon}>📖</Text>
          <Text style={styles.quickText}>Articles</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#f8fafc',
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    color: '#94a3b8',
    marginBottom: 20,
    fontSize: 13,
  },

  // Hospital Card
  hospitalCard: {
    backgroundColor: '#0f172a',
    borderRadius: 22,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#1e3a8a',
    elevation: 8,
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  hospitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 18,
  },
  hospitalBigIcon: {
    fontSize: 40,
  },
  hospitalHeaderText: {
    flex: 1,
  },
  hospitalTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hospitalSubtitle: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 3,
  },
  findBtn: {
    backgroundColor: '#1e3a8a',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#38bdf833',
  },
  findBtnIcon: {
    fontSize: 20,
  },
  findBtnText: {
    color: '#38bdf8',
    fontSize: 15,
    fontWeight: '700',
  },
  hospitalHint: {
    color: '#475569',
    fontSize: 11,
    textAlign: 'center',
  },

  // Tips
  tipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  tipCard: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    padding: 14,
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tipIcon: {
    fontSize: 20,
  },
  tipText: {
    color: '#94a3b8',
    fontSize: 12,
    flex: 1,
  },

  // Section Title
  sectionTitle: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 10,
  },

  // Feature Card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    padding: 15,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 5,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 22 },
  textBox: { flex: 1, marginLeft: 12 },
  cardTitle: { color: '#f8fafc', fontSize: 15, fontWeight: 'bold' },
  cardDesc: { color: '#94a3b8', fontSize: 12, marginTop: 3 },
  actionBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10 },
  btnText: { color: '#020617', fontWeight: 'bold', fontSize: 12 },

  // Disease Grid
  diseaseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  diseaseCard: {
    backgroundColor: '#0f172a',
    padding: 14,
    borderRadius: 14,
    width: '47%',
  },
  diseaseName: {
    color: '#f8fafc',
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 6,
  },
  riskBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  riskText: { fontSize: 11, fontWeight: '600' },

  // Quick Actions
  quickRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickCard: {
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
    elevation: 4,
  },
  quickIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  quickText: {
    color: '#94a3b8',
    fontWeight: '600',
    fontSize: 12,
  },
});
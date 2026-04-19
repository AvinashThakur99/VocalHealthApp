import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function Dashboard() {
  const healthScore = 87;
  const recordings = 24;
  const issues = 3;

  function getHealthStatus() {
    if (healthScore >= 75) return { text: 'Healthy', color: '#22c55e', icon: '✅' };
    if (healthScore >= 50) return { text: 'Mild Risk', color: '#f59e0b', icon: '⚠️' };
    return { text: 'Ill', color: '#ef4444', icon: '❌' };
  }

  const health = getHealthStatus();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <Animated.View entering={FadeInUp.duration(400)} style={styles.header}>
        <Text style={styles.greeting}>Good Morning 👋</Text>
        <Text style={styles.title}>Your Health Report</Text>
      </Animated.View>

      {/* MAIN SCORE CARD */}
      <Animated.View entering={FadeInUp.delay(200)} style={styles.scoreCard}>

        {/* Big Score Circle */}
        <View style={styles.scoreCircleContainer}>
          <View style={[styles.scoreCircle, { borderColor: health.color }]}>
            <Text style={[styles.scoreNumber, { color: health.color }]}>{healthScore}</Text>
            <Text style={styles.scoreOutOf}>/100</Text>
          </View>
        </View>

        <View style={styles.scoreInfo}>
          <Text style={styles.scoreStatus}>{health.icon} {health.text}</Text>
          <Text style={styles.scoreLabel}>Overall Vocal Health</Text>

          {/* Progress Bar */}
          <View style={styles.progressBg}>
            <Animated.View
              entering={FadeInUp.delay(400)}
              style={[styles.progressFill, {
                width: `${healthScore}%`,
                backgroundColor: health.color
              }]}
            />
          </View>
          <Text style={styles.progressText}>{healthScore}% Score</Text>
        </View>
      </Animated.View>

      {/* STATS ROW */}
      <View style={styles.statsRow}>
        <Animated.View entering={FadeInUp.delay(300)} style={styles.statCard}>
          <Text style={styles.statIcon}>🎤</Text>
          <Text style={styles.statValue}>{recordings}</Text>
          <Text style={styles.statLabel}>Recordings</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400)} style={styles.statCard}>
          <Text style={styles.statIcon}>⚠️</Text>
          <Text style={[styles.statValue, { color: '#f59e0b' }]}>{issues}</Text>
          <Text style={styles.statLabel}>Issues</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500)} style={styles.statCard}>
          <Text style={styles.statIcon}>📅</Text>
          <Text style={styles.statValue}>7</Text>
          <Text style={styles.statLabel}>Days</Text>
        </Animated.View>
      </View>

      {/* AI SUGGESTION CARD */}
      <Animated.View entering={FadeInUp.delay(600)} style={styles.aiCard}>
        <View style={styles.aiHeader}>
          <Text style={styles.aiIcon}>🤖</Text>
          <Text style={styles.aiTitle}>AI Suggestion</Text>
        </View>
        <Text style={styles.aiText}>
          Your voice sounds healthy! Keep drinking warm water and avoid straining your vocal cords. Rest your voice for at least 2 hours today.
        </Text>
        <TouchableOpacity style={styles.aiBtn} activeOpacity={0.8}>
          <Text style={styles.aiBtnText}>View Details →</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* INFO CARDS */}
      <View style={styles.infoRow}>
        <Animated.View entering={FadeInUp.delay(700)} style={styles.infoCard}>
          <Text style={styles.infoIcon}>🕐</Text>
          <Text style={styles.infoLabel}>Last Recording</Text>
          <Text style={styles.infoValue}>2 mins ago</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(800)} style={styles.infoCard}>
          <Text style={styles.infoIcon}>🔵</Text>
          <Text style={styles.infoLabel}>Risk Level</Text>
          <Text style={[styles.infoValue, { color: '#22c55e' }]}>Low</Text>
        </Animated.View>
      </View>

      {/* DOCTOR SUGGESTION */}
      <Animated.View entering={FadeInUp.delay(900)} style={styles.doctorCard}>
        <Text style={styles.doctorIcon}>🏥</Text>
        <View style={styles.doctorText}>
          <Text style={styles.doctorTitle}>Doctor Recommendation</Text>
          <Text style={styles.doctorDesc}>No doctor visit needed right now. Keep monitoring daily!</Text>
        </View>
      </Animated.View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 20,
  },

  // Header
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  greeting: {
    color: '#64748b',
    fontSize: 14,
  },
  title: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },

  // Score Card
  scoreCard: {
    backgroundColor: '#0f172a',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  scoreCircleContainer: {
    alignItems: 'center',
  },
  scoreCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020617',
  },
  scoreNumber: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scoreOutOf: {
    color: '#475569',
    fontSize: 11,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreStatus: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreLabel: {
    color: '#64748b',
    fontSize: 12,
    marginBottom: 10,
  },
  progressBg: {
    height: 8,
    backgroundColor: '#1e293b',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 5,
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 15,
    alignItems: 'center',
    elevation: 5,
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  statValue: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 3,
  },

  // AI Card
  aiCard: {
    backgroundColor: '#0f172a',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#38bdf8',
    elevation: 5,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  aiIcon: {
    fontSize: 20,
  },
  aiTitle: {
    color: '#38bdf8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  aiText: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  aiBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#1e3a8a',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  aiBtnText: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '600',
  },

  // Info Row
  infoRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 15,
    elevation: 5,
  },
  infoIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  infoLabel: {
    color: '#64748b',
    fontSize: 11,
  },
  infoValue: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 3,
  },

  // Doctor Card
  doctorCard: {
    backgroundColor: '#022c22',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    borderWidth: 1,
    borderColor: '#22c55e33',
    elevation: 5,
  },
  doctorIcon: {
    fontSize: 35,
  },
  doctorText: {
    flex: 1,
  },
  doctorTitle: {
    color: '#22c55e',
    fontSize: 15,
    fontWeight: 'bold',
  },
  doctorDesc: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
});
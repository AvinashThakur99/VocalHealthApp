import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const historyData = [
  { id: '1', date: 'Mon', score: 90, result: 'Healthy', color: '#22c55e' },
  { id: '2', date: 'Tue', score: 45, result: 'Ill', color: '#ef4444' },
  { id: '3', date: 'Wed', score: 75, result: 'Healthy', color: '#22c55e' },
  { id: '4', date: 'Thu', score: 30, result: 'Ill', color: '#ef4444' },
  { id: '5', date: 'Fri', score: 85, result: 'Healthy', color: '#22c55e' },
  { id: '6', date: 'Sat', score: 60, result: 'Mild', color: '#f59e0b' },
  { id: '7', date: 'Sun', score: 95, result: 'Healthy', color: '#22c55e' },
];

export default function History() {
  const maxScore = 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* TITLE */}
      <Animated.Text entering={FadeInUp.duration(500)} style={styles.title}>
        📁 Health History
      </Animated.Text>

      {/* GRAPH CARD */}
      <Animated.View entering={FadeInUp.delay(200)} style={styles.graphCard}>
        <Text style={styles.graphTitle}>This Week — Vocal Health Score</Text>

        {/* Y-axis labels + Bars */}
        <View style={styles.graphContainer}>

          {/* Y axis */}
          <View style={styles.yAxis}>
            <Text style={styles.yLabel}>100</Text>
            <Text style={styles.yLabel}>75</Text>
            <Text style={styles.yLabel}>50</Text>
            <Text style={styles.yLabel}>25</Text>
            <Text style={styles.yLabel}>0</Text>
          </View>

          {/* Bars */}
          <View style={styles.barsContainer}>

            {/* Horizontal grid lines */}
            <View style={[styles.gridLine, { bottom: '100%' }]} />
            <View style={[styles.gridLine, { bottom: '75%' }]} />
            <View style={[styles.gridLine, { bottom: '50%' }]} />
            <View style={[styles.gridLine, { bottom: '25%' }]} />
            <View style={[styles.gridLine, { bottom: '0%' }]} />

            {historyData.map((item, index) => (
              <View key={item.id} style={styles.barColumn}>

                {/* Score on top of bar */}
                <Text style={[styles.scoreLabel, { color: item.color }]}>
                  {item.score}
                </Text>

                {/* Bar */}
                <View style={styles.barWrapper}>
                  <Animated.View
                    entering={FadeInUp.delay(300 + index * 100)}
                    style={[
                      styles.bar,
                      {
                        height: `${item.score}%`,
                        backgroundColor: item.color,
                      },
                    ]}
                  />
                </View>

                {/* Day label */}
                <Text style={styles.dayLabel}>{item.date}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* LEGEND */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#22c55e' }]} />
            <Text style={styles.legendText}>Healthy (75-100)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#f59e0b' }]} />
            <Text style={styles.legendText}>Mild (50-74)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#ef4444' }]} />
            <Text style={styles.legendText}>Ill (0-49)</Text>
          </View>
        </View>
      </Animated.View>

      {/* STATUS CARDS */}
      <Text style={styles.sectionTitle}>Daily Records</Text>

      {historyData.map((item, index) => (
        <Animated.View
          key={item.id}
          entering={FadeInUp.delay(400 + index * 80)}
          style={styles.recordCard}
        >
          {/* Color bar left side */}
          <View style={[styles.colorBar, { backgroundColor: item.color }]} />

          <View style={styles.cardContent}>
            <Text style={styles.recordDay}>{item.date}</Text>
            <Text style={[styles.recordResult, { color: item.color }]}>
              {item.result === 'Healthy' ? '✅ Healthy' : item.result === 'Ill' ? '❌ Ill' : '⚠️ Mild'}
            </Text>
          </View>

          {/* Score circle */}
          <View style={[styles.scoreCircle, { borderColor: item.color }]}>
            <Text style={[styles.scoreCircleText, { color: item.color }]}>
              {item.score}
            </Text>
          </View>
        </Animated.View>
      ))}

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
  title: {
    fontSize: 26,
    color: '#38bdf8',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },

  // Graph Card
  graphCard: {
    backgroundColor: '#0f172a',
    borderRadius: 25,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  graphTitle: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 20,
  },
  graphContainer: {
    flexDirection: 'row',
    height: 180,
    marginBottom: 15,
  },

  // Y Axis
  yAxis: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
    height: '100%',
  },
  yLabel: {
    color: '#475569',
    fontSize: 10,
  },

  // Bars
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    position: 'relative',
    height: '100%',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#1e293b',
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  scoreLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  barWrapper: {
    width: 20,
    height: '85%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 20,
    borderRadius: 6,
    minHeight: 4,
  },
  dayLabel: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 6,
  },

  // Legend
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: '#94a3b8',
    fontSize: 11,
  },

  // Section
  sectionTitle: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 12,
  },

  // Record Card
  recordCard: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 4,
  },
  colorBar: {
    width: 5,
    height: 65,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  recordDay: {
    color: '#94a3b8',
    fontSize: 12,
  },
  recordResult: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 3,
  },

  // Score Circle
  scoreCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  scoreCircleText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
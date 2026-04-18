import { Audio } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURI, setAudioURI] = useState<string | null>(null);
  const [status, setStatus] = useState('Ready');
  const [isPlaying, setIsPlaying] = useState(false);

  const bars = useRef(
    Array.from({ length: 20 }, () => new Animated.Value(8))
  ).current;
  const animationsRef = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    setupAudio();
  }, []);

  async function setupAudio() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (err) {
      console.log('Setup error:', err);
    }
  }

  useEffect(() => {
    if (isRecording) {
      animationsRef.current = bars.map((bar) => {
        const anim = Animated.loop(
          Animated.sequence([
            Animated.timing(bar, {
              toValue: Math.random() * 45 + 10,
              duration: 200 + Math.random() * 200,
              useNativeDriver: false,
            }),
            Animated.timing(bar, {
              toValue: 8,
              duration: 200 + Math.random() * 200,
              useNativeDriver: false,
            }),
          ])
        );
        anim.start();
        return anim;
      });
    } else {
      animationsRef.current.forEach((a) => a.stop());
      bars.forEach((bar) =>
        Animated.timing(bar, {
          toValue: 8,
          duration: 200,
          useNativeDriver: false,
        }).start()
      );
    }
  }, [isRecording]);

  async function startRecording() {
    try {
      if (sound) { await sound.unloadAsync(); setSound(null); }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      const { recording: rec } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(rec);
      setIsRecording(true);
      setStatus('Recording... 🔴');
    } catch (err) {
      console.log('Start error:', err);
      setStatus('Error starting ❌');
    }
  }

  async function stopRecording() {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);
      if (uri) {
        setAudioURI(uri);
        setStatus('Analyzing... 🤖');
        setTimeout(() => {
          setStatus('Healthy ✅ — Click play for hear');
        }, 2000);
      }
    } catch (err) {
      console.log('Stop error:', err);
      setStatus('Error stopping ❌');
    }
  }

  async function playRecording() {
    try {
      if (!audioURI) { setStatus('Record first! 🎤'); return; }
      if (sound) { await sound.unloadAsync(); setSound(null); }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      setStatus('Playing... 🎧');
      setIsPlaying(true);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioURI },
        { shouldPlay: true, volume: 1.0 }
      );
      setSound(newSound);
      newSound.setOnPlaybackStatusUpdate((s: any) => {
        if (s.isLoaded && s.didJustFinish) {
          setIsPlaying(false);
          setStatus('Healthy ✅ — Click play for hear');
          newSound.unloadAsync();
          Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
          });
        }
      });
    } catch (err) {
      console.log('Play error:', err);
      setStatus('Play error ❌');
      setIsPlaying(false);
    }
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerSub}>Welcome 👋</Text>
        <Text style={styles.title}>Vocal Health{'\n'}Detection</Text>
      </View>

      {/* STATUS BADGE */}
      <View style={[
        styles.statusBadge,
        isRecording && styles.statusBadgeRecording,
        isPlaying && styles.statusBadgePlaying,
      ]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>

      {/* WAVEFORM */}
      <View style={styles.waveContainer}>
        {bars.map((bar, i) => (
          <Animated.View
            key={i}
            style={[
              styles.bar,
              { height: bar },
              isRecording && { backgroundColor: '#ef4444' },
              isPlaying && { backgroundColor: '#22c55e' },
            ]}
          />
        ))}
      </View>

      {/* MIC BUTTON */}
      <TouchableOpacity
        style={[styles.mic, isRecording && styles.micActive]}
        onPress={isRecording ? stopRecording : startRecording}
        activeOpacity={0.8}
      >
        <View style={[styles.micInner, isRecording && styles.micInnerActive]}>
          <Text style={styles.micIcon}>
            {isRecording ? '⏹' : '🎙️'}
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.hint}>
        {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
      </Text>

      {/* BUTTONS */}
      <View style={styles.buttonRow}>
        <View style={[styles.btn, !audioURI && styles.btnDisabled]}>
          <Text style={styles.btnIcon}>💾</Text>
          <Text style={styles.btnText}>
            {audioURI ? 'Saved' : 'No Recording'}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.btn,
            styles.playBtn,
            !audioURI && styles.btnDisabled,
            isPlaying && styles.playingBtn,
          ]}
          onPress={playRecording}
          disabled={!audioURI || isPlaying}
          activeOpacity={0.8}
        >
          <Text style={styles.btnIcon}>
            {isPlaying ? '🎧' : '▶'}
          </Text>
          <Text style={[styles.btnText, (audioURI && !isPlaying) && { color: '#020617' }]}>
            {isPlaying ? 'Playing...' : 'Play'}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerSub: {
    color: '#64748b',
    fontSize: 14,
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    color: '#38bdf8',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
  },

  // Status Badge
  statusBadge: {
    backgroundColor: '#0f172a',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  statusBadgeRecording: {
    borderColor: '#ef444466',
    backgroundColor: '#1a0a0a',
  },
  statusBadgePlaying: {
    borderColor: '#22c55e66',
    backgroundColor: '#0a1a0a',
  },
  statusText: {
    color: '#94a3b8',
    fontSize: 13,
    textAlign: 'center',
  },

  // Waveform
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    marginBottom: 40,
    gap: 4,
  },
  bar: {
    width: 5,
    backgroundColor: '#38bdf8',
    borderRadius: 4,
  },

  // Mic Button
  mic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1e3a8a',
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  micActive: {
    borderColor: '#ef4444',
    shadowColor: '#ef4444',
  },
  micInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micInnerActive: {
    backgroundColor: '#ef4444',
  },
  micIcon: {
    fontSize: 48,
  },
  hint: {
    color: '#475569',
    fontSize: 13,
    marginTop: 16,
    marginBottom: 10,
  },

  // Buttons
  buttonRow: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 14,
  },
  btn: {
    backgroundColor: '#0f172a',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playBtn: {
    backgroundColor: '#38bdf8',
    borderColor: '#38bdf8',
  },
  playingBtn: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  btnDisabled: {
    opacity: 0.35,
  },
  btnIcon: {
    fontSize: 16,
  },
  btnText: {
    color: '#94a3b8',
    fontWeight: '600',
    fontSize: 14,
  },
});
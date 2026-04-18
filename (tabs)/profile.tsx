import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function Profile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [emergency, setEmergency] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // App kholne pe saved data load karo
  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const savedName = await AsyncStorage.getItem('user_name');
      const savedAge = await AsyncStorage.getItem('user_age');
      const savedCondition = await AsyncStorage.getItem('user_condition');
      const savedEmergency = await AsyncStorage.getItem('user_emergency');
      const savedPhoto = await AsyncStorage.getItem('user_photo');

      if (savedName) setName(savedName);
      if (savedAge) setAge(savedAge);
      if (savedCondition) setCondition(savedCondition);
      if (savedEmergency) setEmergency(savedEmergency);
      if (savedPhoto) setPhoto(savedPhoto);
      if (savedName) setSaved(true);
    } catch (err) {
      console.log('Load error:', err);
    }
  }

  async function saveProfile() {
    if (!name.trim()) {
      Alert.alert('Error', 'Enter your name!');
      return;
    }
    try {
      await AsyncStorage.setItem('user_name', name);
      await AsyncStorage.setItem('user_age', age);
      await AsyncStorage.setItem('user_condition', condition);
      await AsyncStorage.setItem('user_emergency', emergency);
      if (photo) await AsyncStorage.setItem('user_photo', photo);

      setSaved(true);
      Alert.alert('✅ Saved!', 'save successfull!');
    } catch (err) {
      console.log('Save error:', err);
    }
  }

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission chahiye', 'Gallery access allow karo!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission chahiye', 'Camera access allow karo!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  }

  function showPhotoOptions() {
    Alert.alert('Choose your photo', '', [
      { text: '📷 Camera', onPress: takePhoto },
      { text: '🖼 Gallery', onPress: pickImage },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }

  const conditions = ['None', 'Diabetes', 'BP', 'Asthma', 'Heart', 'Other'];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* TITLE */}
      <Animated.Text entering={FadeInUp.duration(400)} style={styles.title}>
        👤 My Profile
      </Animated.Text>

      {/* PHOTO SECTION */}
      <Animated.View entering={FadeInUp.delay(200)} style={styles.photoSection}>
        <TouchableOpacity onPress={showPhotoOptions} activeOpacity={0.8}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoIcon}>👤</Text>
            </View>
          )}
          <View style={styles.editBadge}>
            <Text style={styles.editBadgeText}>📷</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.photoHint}>Tap to change photo</Text>
      </Animated.View>

      {/* NAME */}
      <Animated.View entering={FadeInUp.delay(300)} style={styles.inputCard}>
        <Text style={styles.inputLabel}>👤 Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name..."
          placeholderTextColor="#475569"
          value={name}
          onChangeText={setName}
        />
      </Animated.View>

      {/* AGE */}
      <Animated.View entering={FadeInUp.delay(400)} style={styles.inputCard}>
        <Text style={styles.inputLabel}>🎂 Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age..."
          placeholderTextColor="#475569"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </Animated.View>

      {/* HEALTH CONDITION */}
      <Animated.View entering={FadeInUp.delay(500)} style={styles.inputCard}>
        <Text style={styles.inputLabel}>🩺 Health Condition</Text>
        <View style={styles.conditionRow}>
          {conditions.map((c) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.conditionBtn,
                condition === c && styles.conditionBtnActive,
              ]}
              onPress={() => setCondition(c)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.conditionText,
                condition === c && styles.conditionTextActive,
              ]}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* EMERGENCY CONTACT */}
      <Animated.View entering={FadeInUp.delay(600)} style={styles.inputCard}>
        <Text style={styles.inputLabel}>📞 Emergency Contact</Text>
        <TextInput
          style={styles.input}
          placeholder="Emergency number..."
          placeholderTextColor="#475569"
          value={emergency}
          onChangeText={setEmergency}
          keyboardType="phone-pad"
        />
      </Animated.View>

      {/* SAVE BUTTON */}
      <Animated.View entering={FadeInUp.delay(700)}>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={saveProfile}
          activeOpacity={0.8}
        >
          <Text style={styles.saveBtnText}>
            {saved ? '✅ Profile Update Karo' : '💾 Save Profile'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* SAVED INFO */}
      {saved && (
        <Animated.View entering={FadeInUp.delay(200)} style={styles.savedCard}>
          <Text style={styles.savedTitle}>✅ Profile Saved!</Text>
          <Text style={styles.savedText}>Naam: {name}</Text>
          <Text style={styles.savedText}>Age: {age}</Text>
          <Text style={styles.savedText}>Condition: {condition}</Text>
        </Animated.View>
      )}

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
    fontSize: 26,
    color: '#38bdf8',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },

  // Photo
  photoSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#38bdf8',
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#38bdf8',
  },
  photoIcon: {
    fontSize: 40,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#38bdf8',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadgeText: {
    fontSize: 12,
  },
  photoHint: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 8,
  },

  // Input Card
  inputCard: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
  },
  inputLabel: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 8,
  },
  input: {
    color: '#f8fafc',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    paddingBottom: 8,
  },

  // Condition buttons
  conditionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  conditionBtn: {
    backgroundColor: '#1e293b',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  conditionBtnActive: {
    backgroundColor: '#1e3a8a',
    borderColor: '#38bdf8',
  },
  conditionText: {
    color: '#64748b',
    fontSize: 13,
  },
  conditionTextActive: {
    color: '#38bdf8',
    fontWeight: '600',
  },

  // Save Button
  saveBtn: {
    backgroundColor: '#38bdf8',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  saveBtnText: {
    color: '#020617',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Saved Card
  savedCard: {
    backgroundColor: '#022c22',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#22c55e33',
  },
  savedTitle: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  savedText: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 4,
  },
});
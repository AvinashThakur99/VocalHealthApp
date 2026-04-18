import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function AppEntry() {
  const [ready, setReady] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    checkOnboarding();
  }, []);

  async function checkOnboarding() {
    try {
      const value = await AsyncStorage.getItem('has_onboarded');
      if (value === 'true') {
        setHasOnboarded(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setReady(true);
    }
  }

  if (!ready) {
    return <View style={{ flex: 1, backgroundColor: '#020617' }} />;
  }

  if (hasOnboarded) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/onboarding" />;
}
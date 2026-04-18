import { Tabs } from 'expo-router';
import { Platform, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 58,
      paddingTop: 6,
    }}>
      <View style={{
        width: 46,
        height: 28,
        borderRadius: 14,
        backgroundColor: focused ? '#1e3a8a' : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3,
      }}>
        <Text style={{ fontSize: 16 }}>{emoji}</Text>
      </View>
      <Text style={{
        fontSize: 9,
        color: focused ? '#38bdf8' : '#64748b',
        fontWeight: focused ? '700' : '400',
        textAlign: 'center',
      }}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Animated.View
      entering={FadeIn.duration(800)}
      style={{ flex: 1, backgroundColor: '#020617' }}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#0f172a',
            borderTopWidth: 1,
            borderTopColor: '#1e293b',
            height: Platform.OS === 'ios' ? 88 : 72,
            paddingBottom: Platform.OS === 'ios' ? 24 : 8,
            paddingTop: 4,
            shadowColor: '#38bdf8',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 20,
          },
          tabBarActiveTintColor: '#38bdf8',
          tabBarInactiveTintColor: '#64748b',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="🎤" label="Home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="🔍" label="Explore" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="📁" label="History" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="📊" label="Dashboard" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="👤" label="Profile" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </Animated.View>
  );
}
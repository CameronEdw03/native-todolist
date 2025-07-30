import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: { display: 'none' } // This hides the bottom tab bar completely
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{
          title: 'Home',
        }}
      />
      {/* Add other tab screens here if needed */}
    </Tabs>
  );
}
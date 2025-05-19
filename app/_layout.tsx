import { Stack } from "expo-router";
import "./globals.css";
import { CardProvider, useCardContext } from "../components/contexts/CardContext";
import { StyleSheet, View, Text, Platform } from "react-native";

export default function RootLayout() {
  
  return (
    <CardProvider> 
      <RootLayoutInner />
   
    </CardProvider>
  );
}

function RootLayoutInner() {
  const {
    gameState, 
  } = useCardContext();
  
  const {
    currentRound, 
    remainingCards, 
  } = gameState; 
  

  return ( <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* ============= GAME SETUP ============== */}
      <Stack.Screen name="game-settings" options={{ title: "", 
          headerBackButtonDisplayMode: 'minimal' }} />

      {/* ============= WHICH TEAM PLAYS FIRST ============== */}
      <Stack.Screen
        name="game-coin-flip"
        options={{
          headerTitle: "", // You can set a title here if needed
          headerBackVisible: true, 
          headerBackButtonDisplayMode: 'minimal'
        }}
      />

      {/* ============= INSTRUCTIONS ============== */}
      <Stack.Screen name="prompt" options={{ headerShown: false }} />

      {/* ============= SELECT CARDS LIST ============== */}
      <Stack.Screen
        name="card-selection"
        options={{
          headerTitle: "",
          headerBackVisible: true, 
          headerBackButtonDisplayMode: 'minimal'
        }}
      />

      {/* ============= ROUND INSTRUCTIONS ============== */}
      <Stack.Screen
        name="round-screen"
        options={{ 
          headerShown: false,  
        }}
      />

      {/* ============= GAME ============== */}
       <Stack.Screen
        name="game-card"
        options={{
          headerTitle: () => (
              <View style={styles.header}>
                <Text className="font-bold">Round: {currentRound}</Text>
                <Text>{remainingCards.length} card{remainingCards.length > 1 ? 's':'' } left</Text>
              </View>
            ),
          headerBackVisible: true, 
          headerBackButtonDisplayMode: 'minimal' 
        }}
      />


      {/* ============= TIMES UP ============== */}
      <Stack.Screen name="times-up" options={{ headerShown: false }} />


    </Stack>
  );
}
const styles = StyleSheet.create({
  header: {
    ...Platform.select({
          ios: { 
            width: 100,
          },
          android: {  
            width: '85%',
          },
        }),
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        paddingVertical: 5
        // backgroundColor: 'coral'
  }
});
import { StyleSheet, Text, View } from "react-native";
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import ThemedButton from "../../components/ThemedButton";
import ThemedWrapper from "../../components/ThemedWrapper";

const Home = () => { 
  const [startAnimations, setStartAnimations] = useState(false);

  useEffect(() => { 
    setTimeout(() => {
      setStartAnimations(true);
    }, 50);  
  }, []);
  return (
    <ThemedWrapper
    containerStyles={{backgroundColor: '#FE4E3F'}}
      content={
        <> 
          <View className="w-full h-full items-center justify-center">
            <LottieView style={styles.animationTop} 
        autoPlay={startAnimations}
        loop  
        source={require('../../assets/animations/moniker-top.json')}  
      />
            <Text style={styles.title}>Monikers</Text>
            <LottieView style={styles.animationBottom} 
              speed={1.25} 
        autoPlay={startAnimations}
        loop  
        source={require('../../assets/animations/moniker-bottom.json')}  
      />
          </View>
        </>
      }
      bottomContent={
        <ThemedButton
          title="Play Monikers"
          containerClassNames="w-full h"
          variant="brand-white-btn"
          href="/game-settings"
        />
      }
    > 
    </ThemedWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({  
  title: {
    fontSize: 45,
    letterSpacing: 12,
    textTransform: "uppercase",
    color: "#fff",
  }, 
  animationTop: { 
    alignItems: "center",
    marginTop: 10, 
    width: 400,
    height: 250,
    //     borderWidth: 2,
    // borderRadius: 10,
    // borderColor: "#000",
  }, 
  animationBottom: { 
    alignItems: "center",
    marginTop: 40, 
    width: 305,
    height: 250
  }
});

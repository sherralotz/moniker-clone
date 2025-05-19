import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

const TimesUp = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/round-screen");
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [router]);


  const handlePress = () => {
    router.replace("/round-screen");
  };
  

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View className="h-full" style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Time's up!</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4E4E4E",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    color: "#EF3C36",
  },
});

export default TimesUp;

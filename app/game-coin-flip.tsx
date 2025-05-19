import { StyleSheet, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import React, { useRef, useState } from "react";
import ThemedButton from "../components/ThemedButton";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ThemedWrapper from "../components/ThemedWrapper";
import { useCardContext } from "../components/contexts/CardContext";

const GameCoinFlip = () => {
  const { setStartingTeam, teamAName, teamBName, setSelectedCards } =
    useCardContext();
  const router = useRouter();

  const [result, setResult] = useState<"A" | "B" | null>(null);
  const isFlipping = useRef(false);

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${rotation.value}deg` },
      { perspective: 1000 }, // adds 3D depth
    ],
  }));

  const handleFlip = () => {
    if (isFlipping.current) return;

    isFlipping.current = true;

    const randomTeam = Math.random() < 0.5 ? "A" : "B";
    const targetRotation = 360 * 3 + (randomTeam === "A" ? 0 : 180); // A = front, B = back

    rotation.value = withTiming(targetRotation, { duration: 2000 }, () => {
      runOnJS(setResult)(randomTeam);
      isFlipping.current = false;
    });
  };

  const handleButton = (type: "A" | "B") => {
    setStartingTeam(type);
    setSelectedCards([]);
    router.push("/prompt");
  };

  const handleRandom = () => {
    const randomTeam = Math.random() < 0.5 ? "A" : "B";
    setStartingTeam(randomTeam);
    setSelectedCards([]);
    router.push("/prompt");
  };

  return (
    <ThemedWrapper
      containerStyles={{ backgroundColor: "#fff" }}
      content={
        <View style={styles.container}>
          <Text className="text-center text-xl font-bold">
            Who should go first?
          </Text>
          <View style={{ height: 65, marginTop: 15 }}>
            <ThemedButton
              title={teamAName}
              btnTextColor="black"
              btnTextWeight="normal"
              containerClassNames="w-full"
              variant="brand-white-btn"
              onPress={() => handleButton("A")}
            />
          </View>
          <View style={{ height: 65 }}>
            <ThemedButton
              title={teamBName}
              btnTextColor="black"
              btnTextWeight="normal"
              containerClassNames="w-full"
              variant="brand-white-btn"
              onPress={() => handleButton("B")}
            />
          </View>
        </View>
      }
      bottomContent={
        <>
          <ThemedButton
            title="Any"
            btnTextColor="black"
            btnTextWeight="normal"
            containerClassNames="w-full"
            variant="brand-white-btn"
            icon={
              <AntDesign
                name="swap"
                color={"#dc2626"}
                size={22}
                style={{ marginRight: 5 }}
              />
            }
            onPress={() => handleRandom()}
          />
        </>
      }
    ></ThemedWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    paddingHorizontal: 15,
  },
});

export default GameCoinFlip;

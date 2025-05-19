import { StyleSheet, View, Text, Animated, Easing, Pressable, AppState } from "react-native";
import React, { useEffect, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { useCardContext } from "../components/contexts/CardContext";
import ThemedButton from "../components/ThemedButton";
import ThemedCard from "../components/ThemedCard";
import ThemedWrapper from "../components/ThemedWrapper";

const MAX_TIME = 60;

const GameCard = () => {
  const {
    gameState,
    markCardCorrect,
    passCard,
    startTimer,
    stopTimer,
    resetTimer,
    handleEndOfTurn,
  } = useCardContext();

  const {
    remainingCards,
    timeRemaining,
    isTimerRunning,
  } = gameState;

  const currentCard = remainingCards.length > 0 ? remainingCards[0] : null;
  const router = useRouter();

  const timerAnimation = useRef(new Animated.Value(MAX_TIME)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const initTimerRef = useRef<number | null>(null);
  const isMountedRef = useRef(false);
  const appState = useRef(AppState.currentState);

  const cleanupTimers = () => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }

    if (initTimerRef.current !== null) {
      clearTimeout(initTimerRef.current);
      initTimerRef.current = null;
    }

    stopTimer();
  };

  const initializeTimer = () => {
    cleanupTimers();
    timerAnimation.setValue(MAX_TIME);
    resetTimer();

    initTimerRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        startTimer();
      }
    }, 100);
  };

  useFocusEffect(
    React.useCallback(() => {
      isMountedRef.current = true;
      initializeTimer();

      const subscription = AppState.addEventListener("change", (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active" &&
          isMountedRef.current
        ) {
          initializeTimer();
        }
        appState.current = nextAppState;
      });

      return () => {
        isMountedRef.current = false;
        cleanupTimers();
        subscription.remove();
      };
    }, [])
  );

  useEffect(() => {
    if (!isMountedRef.current) return;

    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }

    timerAnimation.setValue(timeRemaining);

    if (isTimerRunning && timeRemaining > 0) {
      animationRef.current = Animated.timing(timerAnimation, {
        toValue: timeRemaining - 1,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.linear,
      });

      animationRef.current.start();
    }
  }, [timeRemaining, isTimerRunning]);

  useEffect(() => {
    if (timeRemaining === 0 && isTimerRunning && isMountedRef.current) {
      handleTimerEnd();
    }
  }, [timeRemaining, isTimerRunning]);

  const handleTimerEnd = () => {
    cleanupTimers();
    handleEndOfTurn(gameState.remainingCards, () => {
      router.push("/times-up");
    });
  };

  const handlePass = () => {
    passCard();
  };

  const handleCorrect = () => {
    markCardCorrect(() => {
      cleanupTimers();
      router.push("/times-up");
    });
  };

  const timerBarColor = timerAnimation.interpolate({
    inputRange: [0, MAX_TIME * 0.25, MAX_TIME * 0.5],
    outputRange: ["#EF3C36", "#FFA500", "#15BED6"],
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <ThemedWrapper
      containerStyles={{ backgroundColor: "#fff" }}
      content={
        <>
          <View className="flex-row">
            <View className="w-full">
              <View style={styles.timerContainer}>
                <View style={styles.timerBarBackground}>
                  <Animated.View
                    style={[
                      styles.timerBar,
                      {
                        width: timerAnimation.interpolate({
                          inputRange: [0, MAX_TIME],
                          outputRange: ["0%", "100%"],
                        }),
                        backgroundColor: timerBarColor,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.timerText}>
                  {formatTime(timeRemaining)}
                </Text>
              </View>
            </View>
          </View>
          <View className="items-center justify-center mx-6 mb-10">
            {currentCard ? (
              <ThemedCard card={currentCard} />
            ) : (
              <View style={styles.noCardsContainer}>
                <Text>No more cards!</Text>
              </View>
            )}
          </View>
        </>
      }
      bottomContent={
        <>
          <View style={styles.childView}>
            <ThemedButton
              onPress={handlePass}
              content={
                <View style={styles.childContent}>
                  <AntDesign name="arrowleft" size={16} color={"#fff"} />
                  <Text style={styles.childContentText}>Pass</Text>
                </View>
              }
              btnSize="brand-md"
              btnTextWeight="normal"
              variant="brand-orange-btn"
            />
          </View>
          <View style={styles.childView}>
            <ThemedButton
              onPress={handleCorrect}
              content={
                <View style={styles.childContent}>
                  <Text style={styles.childContentText}>Correct</Text>
                  <AntDesign name="check" size={16} color={"#fff"} />
                </View>
              }
              btnSize="brand-md"
              btnTextWeight="normal"
              variant="brand-green-btn"
            />
          </View>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  childView: {
    width: "50%",
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "transparent",
  },
  childContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  childContentText: {
    color: "#fff",
    marginLeft: 5,
    marginRight: 5,
    fontSize: 18,
    fontWeight: "600",
  },
  noCardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerContainer: {
    alignItems: "center",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  timerBarBackground: {
    height: 3,
    width: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 1,
  },
  timerBar: {
    height: 3,
    borderRadius: 1,
  },
});

export default GameCard;

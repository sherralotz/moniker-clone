import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ThemedButton from "../components/ThemedButton";
import ThemedWrapper from "../components/ThemedWrapper";
import { AntDesign } from "@expo/vector-icons";
import { TeamScore, useCardContext } from "../components/contexts/CardContext";
import { useRouter } from "expo-router";
import LottieView from 'lottie-react-native';

const RoundScreenInner = () => {
  const router = useRouter(); 

  const { teamAName,teamBName,gameState, getCurrentTeamDisplayName } = useCardContext();
  const currentTeamName = getCurrentTeamDisplayName();
  
  const {
    currentRound, 
    remainingCards,
    teamAScore,
    teamBScore,
    timeRemaining,
    isTimerRunning,
    isStartOfNewRound,
  } = gameState;
  const isGameOver = currentRound === 3 && remainingCards.length === 0;
  
  const calculateTotalScore = (scores: TeamScore) => {
    return scores.round1 + scores.round2 + scores.round3;
  };
  
  const teamATotal = calculateTotalScore(teamAScore);
  const teamBTotal = calculateTotalScore(teamBScore);
  const winner = (teamATotal > teamBTotal) ? "Team A" : ((teamBTotal > teamATotal) ? "Team B": "It's a tie!"); 

  const roundInstructionsText = {
    1: {
      main: "Use any words, sounds, or gestures",
      secondary: "You can't use the name itself",
    },
    2: {
      main: "Use only 1 word as a clue",
      secondary: "It can be anything but the name itself",
    },
    3: {
      main: "Use only 1 word as a clue",
      secondary: "It can be anything but the name itself",
    },
  };
  const currentText = roundInstructionsText[currentRound];
 

  const handleGoBtn = () => {
    if (remainingCards.length) {
      router.push("/game-card");
    } else if (isGameOver) { 
      router.replace("/");
    } else { 
      console.warn("No cards left but game is not over.");
    }
  };

  return (
    <ThemedWrapper
      containerStyles={{ backgroundColor: "#000" }}
      content={
        <>
          
          <View className="items-center h-full w-full flex-col">
         
            <View className="mt-24 text-center items-center">
              <View
                className="py-3 rounded-xl mt-1"
                style={{
                  backgroundColor: isGameOver ? "#1ABC00" : "#9ACFFF",
                  padding: isGameOver ? 20 : 10,
                }}
              >
                <Text
                  className="text-black font-medium"
                  style={{
                    fontSize: isGameOver ? 18 : 14,
                  }}
                >
                  {isGameOver ? "WINNER" : `ROUND ${currentRound}`}
                </Text>
              </View>

              {!isStartOfNewRound && !isGameOver ? (
                <View className="text-center items-center mt-2">
                  <Text className="text-gray-200 ">
                    {remainingCards.length} card
                    {remainingCards.length > 1 ? "s" : ""} left
                  </Text>
                </View>
              ) : null}
            </View>

            {isGameOver ? (
              <>
                <View className="flex-1  items-center mt-24 mx-16">
                  <Text style={{ fontSize: 30 }} className="text-white">
                    {winner}
                  </Text>
                </View>
              </>
            ) : (
              <View className=" flex-1  items-center mt-24 mx-16">
                <Text className="text-white text-4xl text-center">
                  {currentText.main}
                </Text>
                <Text className="text-gray-200 text-center mt-3">
                  {currentText.secondary}
                </Text>
              </View>
            )}

            {isGameOver ? null : <View className=" items-center mb-24 mt-12 mx-16 bg-[#202020] px-6 py-3 rounded-lg ">
              <Text className="text-gray-200 text-center text-lg">It's your turn</Text>
              <Text className="text-white text-3xl text-center mt-1 font-bold">
                {currentTeamName}
              </Text>
            </View>}
            

            <View className="items-center px-16 mb-4  w-full">
              <View className="flex-row w-full justify-center"> 
                <Text className="text-white text-center">{isGameOver ? 'Total': ''} Scores
                  </Text>
              </View>
             

              <View className="flex-row w-full mt-1 ">
                <Text className="text-gray-200 text-base w-1/2 text-right pe-1">{teamAName}</Text>
                <Text className="text-gray-200 text-base font-bold ps-1">
                  {teamATotal} pts
                </Text>
              </View>

              <View className="flex-row w-full ">
                <Text className="text-gray-200 text-base w-1/2 text-right pe-1">{teamBName}</Text>
                <Text className="text-gray-200 text-base font-bold ps-1">
                  {teamBTotal} pts
                </Text>
              </View>  
            </View>

            {isGameOver ? <View style={styles.backgroundAnimationContainer}>
              <LottieView style={styles.animationTop} 
                     autoPlay={isGameOver}
                     loop  
                              source={require('../assets/animations/confetti.json')}   
                   />
            </View>: null} 
          </View>
        </>
      }
      bottomContent={
        <>
        {isGameOver ? 
        <ThemedButton
            content={
              <View className="flex-row">
                <Text className="text-center text-xl">Home</Text> 
              </View>
            }
            containerClassNames="w-full"
            variant="brand-white-btn"
            onPress={handleGoBtn}
          />: <ThemedButton
            content={
              <View className="flex-row">
                <Text className="text-white me-1 text-xl">Let's go</Text>
                <AntDesign
                  name="arrowright"
                  size={18}
                  color={"#fff"}
                  className="mt-1"
                />
              </View>
            }
            containerClassNames="w-full"
            variant="brand-red-btn"
            onPress={handleGoBtn}
          />}
          
        </>
      }
    ></ThemedWrapper>
  );
};
const styles = StyleSheet.create({
  backgroundAnimationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,  
  },
  backgroundAnimation: {  
  },
  animationTop: { 
    alignItems: "center", 
    width:'100%', 
    height: '100%', 
  }, 
});

const RoundScreen = React.memo(RoundScreenInner);
export default RoundScreen;

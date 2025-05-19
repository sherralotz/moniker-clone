import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import ThemedButton from "../components/ThemedButton";
import { AntDesign } from "@expo/vector-icons";
import ThemedWrapper from "../components/ThemedWrapper";
import CardList from "./card-list";
import { CardProps } from "../components/ThemedCard";
import cardData from "../assets/data/cards.json";
import { useCardContext } from "../components/contexts/CardContext";
import { useRouter } from "expo-router";

const CardSelection = () => {
  const [cards, setCards] = useState<CardProps[]>(cardData);
  const { startGame, resetGame, selectedCards, setSelectedCards } = useCardContext();
  const router = useRouter();

  const handleStartBtn = () => { 
    if (selectedCards.length){
      resetGame();
      startGame();
      router.push("/round-screen");  
    }
  };
  
  const handleRandomSelect = () => {  
     const totalNeeded = 10;
     const selectedIds = new Set(selectedCards.map((card) => card.id));
     const remainingCards = cards.filter((card) => !selectedIds.has(card.id));

     // Shuffle and select the remaining needed cards
     const neededCount = totalNeeded - selectedCards.length;
     const shuffled = [...remainingCards].sort(() => 0.5 - Math.random());
     const newSelections = shuffled.slice(0, neededCount);

     // Combine and update
     setSelectedCards([...selectedCards, ...newSelections]);
  };
  
  return (
    <ThemedWrapper
      containerStyles={{ backgroundColor: "#fff" }}
      content={
        <>
          <CardList data={cards} />
        </>
      }
      bottomContent={
        <View className="flex-row w-full">
          <View>
            <ThemedButton
              btnSize="brand-md"
              containerClassNames="w-12"
              icon={<AntDesign name="swap" size={16} color={"#dc2626"} />}
              variant="brand-white-btn"
              onPress={handleRandomSelect}
            />
          </View>
          <View style={styles.rightBtn}>
            <ThemedButton
              title="Done"
              btnSize="brand-md"
              btnTextWeight="normal"
              containerClassNames="w-full"
              variant="brand-red-btn"
              onPress={handleStartBtn}
            />
          </View>
        </View>
      }
    ></ThemedWrapper>
  );
};

const styles = StyleSheet.create({
  rightBtn: {
    flexGrow: 1,
    paddingLeft: 10,
  },
});
export default CardSelection;

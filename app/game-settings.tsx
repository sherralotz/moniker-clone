import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import ThemedButton from "../components/ThemedButton";
import { AntDesign } from "@expo/vector-icons";
import ThemedMultiSelect, {
  MultiSelectItem,
} from "../components/ThemedMultiSelect";
import ThemedWrapper from "../components/ThemedWrapper";
import { useCardContext } from "../components/contexts/CardContext";

const GameSettings = () => {
  const [count, setCount] = useState(4);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { teamAName, setTeamAName, teamBName, setTeamBName } = useCardContext();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleMultiDropdownChange = () => {
  };
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const handleDecrement = () => {
    if (count > 0) setCount((prevCount) => prevCount - 1);
  };
  const handleInputChange = (text: string) => {
    const parsedValue = parseInt(text);
    if (!isNaN(parsedValue)) {
      setCount(parsedValue);
    } else if (text === "") {
      setCount(0);
    }
  };
  const handleSelectionChange = (selected: number[]) => {
    console.log("Selected in Parent:", selected);
    setSelectedItems(selected);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const options: MultiSelectItem[] = [
    { text: "General", value: 1 },
    { text: "Pop Culture", value: 2 },
    { text: "Broadway", value: 3 },
    { text: "Science", value: 4 },
  ];

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ThemedWrapper
      containerStyles={{ backgroundColor: "#fff", flex: 1 }}
      content={
        <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
          <KeyboardAvoidingView
            style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 0} // Adjust offset as needed
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'space-between', paddingBottom: isKeyboardVisible ? 200 : 20 }} // Adjust bottom padding when keyboard is visible
            >
              <View className="items-center w-full ">
                {/* ====================================== PLAYER COUNT =========================== */}
                <View className=" items-center mt-10">
                  <Text className="text-xl font-bold">
                    How many are playing?
                  </Text>
                </View>
                <View className="flex-row justify-center space-x-4 mt-6 h-16">
                  <ThemedButton
                    btnSize="brand-xs"
                    containerClassNames="w-10 mt-1"
                    icon={<AntDesign name="minus" size={16} color="#dc2626" />}
                    variant="brand-white-btn"
                    onPress={handleDecrement}
                  />

                  <TextInput
                    className="mx-3 items-center rounded-lg content-center w-14 h-16 border border-gray-300 text-center"
                    value={count.toString()}
                    onChangeText={handleInputChange}
                    keyboardType="numeric"
                  />

                  <ThemedButton
                    btnSize="brand-xs"
                    containerClassNames="w-10 mt-1 "
                    icon={<AntDesign name="plus" size={16} color="#dc2626" />}
                    variant="brand-white-btn"
                    onPress={handleIncrement}
                  />
                </View>
                {/* ====================================== SELECT DECKS =========================== */}
                <View className=" items-center mt-10">
                  <Text className="text-xl font-bold">Choose your deck</Text>
                </View>
                <View className="flex-row justify-center mx-6 h-16">
                  <ThemedMultiSelect
                    initialSelectedValues={[1]}
                    options={options}
                    onSelectionChange={handleSelectionChange}
                  />
                </View>

                {/* ====================================== TEAM NAMES =========================== */}
                <View className="mt-9 items-center">
                  <Text className="text-xl font-bold mt-10">Teams</Text>
                </View>
                <View className="w-full px-6">
                  <TextInput
                    className="items-center w-full rounded-lg content-center mt-2 h-16 border border-gray-300 text-center"
                    value={teamAName}
                    onChangeText={(text: string) => setTeamAName(text)}
                  />
                </View>
                <View className="w-full px-6 mt-4">
                  <TextInput
                    className="items-center w-full rounded-lg content-center h-16 border border-gray-300 text-center"
                    value={teamBName}
                    onChangeText={(text: string) => setTeamBName(text)} 
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      }
      bottomContent={
        <ThemedButton
          title="Start"
          containerClassNames="w-full "
          variant="brand-red-btn"
          href="/game-coin-flip"
        />
      }
    ></ThemedWrapper>
  );
};

export default GameSettings;
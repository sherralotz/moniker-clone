import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Checkbox from "expo-checkbox";

export interface MultiSelectItem {
  text: string;
  value: number;
}

export interface MultiSelectDropdownProps {
  options: MultiSelectItem[];
  label?: string;
  onSelectionChange: (selectedValues: number[]) => void; 
  initialSelectedValues?: number[];  
}

const ThemedMultiSelect: React.FC<MultiSelectDropdownProps> = ({
  options,
  label,
  onSelectionChange, 
  initialSelectedValues = [],  
}) => {
  const [selectedValues, setSelectedValues] = useState<number[]>(initialSelectedValues);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleValue = (value: number) => {
    const updated = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setSelectedValues(updated);
    onSelectionChange(updated);
  };

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : <></>}

      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={() => setDropdownOpen((prev) => !prev)}
      >
        <View>
          <Text numberOfLines={1} ellipsizeMode="tail" className=" text-md">
            {selectedValues.length > 0
              ? options
                  .filter((option) => selectedValues.includes(option.value))
                  .map((option) => option.text)
                  .join(", ")
              : "Select options"}
          </Text>
          <AntDesign
            name="caretdown"
            size={10}
            color="black"
            style={styles.dropdownIcon}
          />
        </View>
      </TouchableOpacity>

      {isDropdownOpen && (
        <View style={styles.dropdownList}>
          {options.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={styles.itemRow}
              onPress={() => toggleValue(item.value)}
            >
              <Checkbox
                color={
                  selectedValues.includes(item.value) ? "#ff0000" : "#808080"
                }
                style={[
                  styles.checkboxBase,
                  selectedValues.includes(item.value) && styles.checkboxChecked,
                ]}
                value={selectedValues.includes(item.value)}
                onValueChange={() => toggleValue(item.value)}
              />
              <Text style={styles.itemText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  dropdownHeader: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#fff",
    height: 50,
    marginTop: 10,
    fontSize: 16,
  },
  dropdownIcon: {
    position: "absolute",
    right: 6,
    top: 4,
  },
  dropdownList: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  itemText: {
    marginLeft: 12,
    fontSize: 14,
  },
  checkboxBase: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#e5eoe6",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent", // Make background transparent for custom styling
  },
  checkboxChecked: {
    backgroundColor: "#ff0000", // Red background when checked
    borderColor: "#ff0000",
  },
});

export default ThemedMultiSelect;

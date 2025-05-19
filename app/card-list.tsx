import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  FlatList
} from 'react-native';
import Checkbox from "expo-checkbox";  
import { AntDesign } from "@expo/vector-icons";
import ThemedCard, { CardProps } from '../components/ThemedCard';
import { useCardContext } from '../components/contexts/CardContext';

interface CardListProps {
  data: CardProps[];
  onSelectionChange?: (selectedCards: CardProps[]) => void;
}
const CARD_HEIGHT = 240;

const CardList: React.FC<CardListProps> = ({ data, onSelectionChange }) => {
  const { selectedCards, setSelectedCards } = useCardContext(); 

  const toggleCardSelection = useCallback((card: CardProps) => {
    setSelectedCards(prevSelected => {
      // Use stringified categoryId for more reliable comparison
      const cardId = String(card.id);
      const isAlreadySelected = prevSelected.some(item => String(item.id) === cardId);
      
      let newSelection;
      if (isAlreadySelected) {
        newSelection = prevSelected.filter(item => String(item.id) !== cardId);
      } else {
        newSelection = [...prevSelected, card];
      }
      
      // Notify parent component if callback provided
      if (onSelectionChange) {
        onSelectionChange(newSelection);
      }
      
      return newSelection;
    });
  }, [onSelectionChange]);
  
  // Check if a card is selected - improved for reliability
  const isCardSelected = useCallback((card: CardProps) => {
    return selectedCards.some(item => String(item.id) === String(card.id));
  }, [selectedCards]);
  
  // Render individual card item
  const renderCardItem = useCallback(({ item }: { item: CardProps }) => {
    const selected = isCardSelected(item);
    
    return (
      <TouchableOpacity
        onPress={() => toggleCardSelection(item)}
        activeOpacity={0.85}
        style={[
          styles.cardContainer,
          { width: '50%', height: CARD_HEIGHT }
        ]}
        // Adding hitSlop for better touch detection
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={styles.checkboxContainer} >
          <TouchableOpacity 
            onPress={() => toggleCardSelection(item)} 
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7} 
          >
           {selected ? (
        <Checkbox
          value={selected}
          color={'#0D99FF'}
          style={styles.checkbox}
          onValueChange={() => { 
            toggleCardSelection(item);
          }}
        />
      ) : null}
          </TouchableOpacity> 
        </View> 


        <ThemedCard card={item} fromList={true} selected={selected}/>
     
      </TouchableOpacity>
    );
  }, [isCardSelected, toggleCardSelection]);
  
  // Memoize key extractor for better performance
  const keyExtractor = useCallback((item: CardProps) => `card-${item.id}`, []);
  
  // Render header with selection counter
  const ListHeader = useMemo(() => {
    return (
      <View className="py-4 px-5 flex-row">
        <Text className="text-lg">
          {selectedCards.length} {selectedCards.length === 1 ? 'card' : 'cards'} selected
        </Text>
        {/* <View className='ml-auto'>
          <AntDesign name="filter" size={20} color={"#000"} /> 
        </View> */}

      </View>
    );
  }, [selectedCards.length]);
  
  return (
    <View style={styles.container}>
      {ListHeader}
      <FlatList
        data={data}
        renderItem={renderCardItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={5}
        contentContainerStyle={styles.listContent}
        extraData={selectedCards} // Add this to force re-render when selection changes
        removeClippedSubviews={false} // This can help with rendering issues
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff'
  },
  listContent: {  
    marginTop: 5,
    backgroundColor: '#fff'
  },
  columnWrapper: {
    justifyContent: 'space-between', 
    paddingHorizontal: 5
  },
  cardContainer: {
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  checkbox: {
    width: 20,
    height: 20, 
    borderRadius: 10, 
  },
  checkboxContainer: {
    position: 'absolute',
    top: -8,
    right: 0,
    zIndex: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CardList;
 
import { StyleSheet, View, Text, TextStyle, Platform } from "react-native";
import React from "react";
import ThemedDots from "./ThemedDots";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { CategoryId } from "../assets/enums/categories";

export interface CardProps {
  id: string;
  text: string;
  description: string;
  categoryId: number;
  categoryName: string;
  points: number;
}

interface CardComponentProps {
  card: CardProps;
  fromList?: boolean;
  selected?: boolean;
}

const ThemedCard: React.FC<CardComponentProps> = ({
  card,
  fromList,
  selected
}) => {
  const accentColor = getAccentColor(card.categoryId); 

  return (
    <View style={[styles.wrapper, { marginHorizontal: fromList ? 10 : 5}]}>
      <View className="rounded-2xl h-full w-full " style={[styles.shadow, {borderColor: selected ? '#0D99FF':'#F1F1F1' }]}>
        <View style={styles.cardContent}>

          <View style={styles.cardContentContainer}> 
          {/* ============= TITLE ============== */}
            <View className={fromList ? 'mt-4':'mt-16'} >
              <Text className={`${fromList ? 'text-xl px-4':'text-3xl px-8'} font-bold text-center `}>{card.text}</Text>
            </View>

          {/* ============= DESCRIPTION ============== */}
            <View className={``}>
              <Text
                className={`${fromList ? 'px-4 mt-4 text-sm':'px-8 mt-8 text-justify text-lg'}  `}
                numberOfLines={fromList ? 3 : 10}
              >
                {card.description}
              </Text>
            </View>
          </View> 

          <View style={{height: fromList ?  80 : 150 }}>
            <View  style={styles.cardContent}>
              
          {/* ============= DOTS ============== */}
              <View className="w-full">
                <ThemedDots dotsNumber={20}
                  style={{ width: "100%", justifyContent: "center" }}
                />
              </View>
              
          {/* ============= CATEGORY ============== */}
              <View style={styles.cardContentContainer}>
                <Text numberOfLines={2}
                style={{color: accentColor.base}}
                className={`${fromList ? 'text-sm':'text-2xl'} mx-2 leading-tight text-center uppercase font-bold tracking-[4px]`} >
                  {card.categoryName}
                </Text>
              </View>

              
          {/* ============= POINTS ============== */}
              <View style={[styles.domeContainer, {
                height: fromList ? 30 : 60
              }]}  >
                <View style={[styles.domeTop, { 
                height: fromList ? 30 : 60,
                width: fromList ? 45 : 90,
                backgroundColor: accentColor.base
                }]} className={fromList ? ' h-6':'h-16'} >
                  <View className="flex-col">
                    <Text className={`${fromList ? 'text-xl':'text-3xl'} text-white text-center mt-1 font-bold`}>
                      {card.points}
                    </Text>

                    {fromList ? <></> : <Text className="text-white  text-lg text-center -mt-1">
                      points
                    </Text>}
                    
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};


const getAccentColor = (categoryId: number) => {
  switch (categoryId) {
    case CategoryId.General:
      return { base: '#1153A7' };//dark blue
    case CategoryId.Science:
      return { base: '#E89400' };//orange
    case CategoryId.HistoricalFigure:
      return { base: '#56C599' };//green
    case CategoryId.Celebrity:
      return { base: '#15BED6' };//light blue
    case CategoryId.FictionalCharacter:
      return { base: '#EF3C36' }; //red
    case CategoryId.EtCetera:
      return { base: '#734683' }; //indigo
    default:
      return { base: '#9E0142' };
  }
};

const styles = StyleSheet.create({
  domeContainer: {
    // height: 60,
    flexDirection: "row",
    justifyContent: "center",
  },
  domeTop: {
    position: "absolute",
    top: 0, 
    borderTopLeftRadius: 55,  
    borderTopRightRadius: 55,  
  },   
   wrapper: { 
    borderRadius: 10 
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 7,
      },
    }),
    backgroundColor: 'white', // necessary for iOS shadows to show
    borderRadius: 10, 
    borderWidth: 4
  },
  cardContent: {
    flexDirection: 'column',
    height: "100%", 
  },
  cardContentContainer: {
    flex: 1,
  }, 
});
export default ThemedCard;



// [ 
//     {id: 1, label: "General"},
// {id: 2, label: "Science"},
// {id: 3, label: "Historical Figure"},
// {id: 4, label: "Celebrity"}, 
// {id: 5, label: "Fictional Character"}, 
// {id: 6, label: "Et Cetera"}, 
// ]

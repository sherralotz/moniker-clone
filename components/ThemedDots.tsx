import { StyleSheet, View, Text, ViewStyle } from 'react-native'
import React from 'react'
interface DottedLineProps {
  style?: ViewStyle;  
  dotsNumber?: number;
}

const ThemedDots: React.FC<DottedLineProps> = ({ style, dotsNumber }) => {
    const numberOfDots = dotsNumber ? dotsNumber : 40; // Adjust for desired dot density
  const dotSpacing = 5;    // Adjust for spacing between dots
  const dotSize = 2;       // Adjust for dot size
  const dotColor = '#ccc';

  const dots = Array.from({ length: numberOfDots }).map((_, index) => (
    <View
      key={index}
      style={{
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2, // Make them circles
        backgroundColor: dotColor,
        marginRight: index < numberOfDots - 1 ? dotSpacing : 0,
      }}
    />
  ));

  return (
    <View style={[styles.dottedLineContainer, style]}>
      {dots}
    </View>
  )
}
const styles = StyleSheet.create({
  dottedLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5, // Adjust vertical padding as needed
  },
});
export default ThemedDots
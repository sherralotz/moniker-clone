import { StyleSheet, View, Text } from 'react-native'
import React, { ReactNode } from 'react'

interface ThemedWrapperProps {
  content: ReactNode;
  bottomContent: ReactNode;
  containerStyles?: any; 
}
const ThemedWrapper: React.FC<ThemedWrapperProps> = ({ content, bottomContent, containerStyles }) => {
  return ( 
     <View style={[styles.container, containerStyles ]}>
      <View style={styles.contentContainer}>
        {content}
      </View>
      <View style={styles.bottomContentContainer}>
        <View style={styles.buttonRowContainer}> 
        {bottomContent}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {   
    flexDirection: "column",
    height: "100%" 
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: 'blue' 
  },
  bottomContentContainer: {  
    height: 100, 
  },
  buttonRowContainer: { 
    flexDirection: "row",
    paddingVertical: 15, 
    paddingHorizontal: 25, 
  },
});
export default ThemedWrapper;



//  <ThemedWrapper
//       containerStyles={{ backgroundColor: "#fff" }} 
//       content={
//         <>
          
//         </>
//       }
//       bottomContent={
//                 <>
          
//         </>
//       }
//     > 
//     </ThemedWrapper>
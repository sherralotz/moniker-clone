import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect } from 'react' 
import { useRouter } from 'expo-router';
import { useCardContext } from '../components/contexts/CardContext';

const Prompt = () => {
  const router = useRouter();
    const { gameState } = useCardContext();
    
  const { getCurrentTeamDisplayName } = useCardContext();
  const currentTeamName = getCurrentTeamDisplayName();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/card-selection'); // Use replace to prevent going back to Prompt
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [router]);

  const handlePress = () => {
    router.replace('/card-selection'); // Use replace to prevent going back to Prompt
  };
 

  return ( 

    <TouchableWithoutFeedback onPress={handlePress}>
      <View className='h-full bg-purple-700' style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{currentTeamName }</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.subtitle}>Choose 20 cards</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',    
  },
  titleContainer: {
    flex: 1, 
    justifyContent: 'center',  
    alignItems: 'center',
    width: '100%'
  },
  title: {
    fontSize: 45,
    letterSpacing: 12,
    textTransform: 'uppercase',
    color: '#fff',
    width: '100%',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 30,  
    color: '#fff',
    textAlign: 'center'
  }, 
   
});
export default Prompt
import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Main from './src/components/Main';

const PressableText = props => {
  return(
    <Pressable onPress={() => Alert.alert('you press the text')}>
      <Text> You can press me</Text>
    </Pressable>
  )
}


export default function App() {
  return (
    <Main/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

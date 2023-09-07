/* eslint-disable react/jsx-no-undef */
import React from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function LogoTitle() {
  return (
    <Image
      style={{width: 60, height: 75}}
      source={require('./images/blue-3121354_640.jpg')}
    />
  );
}
function HomeScreen({navigation, route}) {
  React.useEffect(() => {
    if (route.params?.post) {
    }
  }, [route.params?.post]);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image
        style={{padding: 40, marginTop: 40}}
        source={require('./images/navig.png')}
      />
      <View style={{flex: 1, padding: 20, margin: 30}} />
      <Text
        style={{
          fontSize: 24,
          color: 'purple',
          marginBottom: 20,
          fontWeight: '900',
        }}>
        Home Screen
      </Text>
      <Button
        color="gray"
        style={styles.button}
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
      <View style={styles.space} />
      <Button
        color="pink"
        style={styles.button}
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <View style={styles.space} />
      <Button
        color="plum"
        style={styles.button}
        title="update the title"
        onPress={() => navigation.setOptions({title: 'Home Screen Updated!'})}
      />
      <Text
        style={{
          margin: 10,
          fontSize: 18,
          color: 'purple',
          fontWeight: '900',
          marginTop: 20,
        }}>
        {' '}
        Post: {route.params?.post}
      </Text>
    </View>
  );
}

function CreatePostScreen({navigation, route}) {
  const [postText, setPostText] = React.useState('');
  return (
    <>
      <TextInput
        multiline
        placeholder="What is on your mind?"
        style={styles.CreatepostText}
        value={postText}
        onChangeText={setPostText}
      />
      <View style={styles.CreatePostButton}>
        <Button
          color="purple"
          //style={{height: 100}}
          title="Done"
          onPress={() => {
            navigation.navigate({
              name: 'Home',
              params: {post: postText},
              merge: true,
            });
          }}
        />
      </View>
    </>
  );
}
function DetailsScreen({route, navigation}) {
  const {itemId, otherParam} = route.params;
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.DetailscreenText}>Details Screen</Text>
      <Text style={{fontSize: 18, color: 'black'}}>
        {' '}
        itemId:{JSON.stringify(itemId)}
      </Text>
      <Text style={{fontSize: 18, color: 'black'}}>
        otherParam: {JSON.stringify(otherParam)}
      </Text>
      <View style={styles.space} />
      <Button
        color="lightslategrey"
        style={styles.button}
        title="Go to Details....again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <View style={styles.space} />
      <Button
        color="pink"
        style={styles.button}
        title="Go To Home"
        onPress={() => navigation.navigate('Home')}
      />
      <View style={styles.space} />
      <Button
        color="plum"
        style={styles.space}
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.space} />
      <Button
        color="lightcoral"
        style={styles.space}
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          title: 'My Home',
          headerStyle: {
            backgroundColor: 'palevioletred',
          },
          headerTintColor: '#fff5ee',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({route}) => ({title: route.params?.posts})}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          options={{
            // title: (route: {params: {post: any}}) => ({
            //   title: route.params?.post,
            // }),
            //headerTitle: props => <LogoTitle {...props} />,
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => (
              <Button
                onPress={() => Alert.alert('This is a button!')}
                title="Info"
                color="purple"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerRight: () => (
              <Button
                onPress={() => Alert.alert('Details Field')}
                title="Details-Info"
                color="purple"
              />
            ),
          }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: props => <LogoTitle {...props} />,
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => (
              <Button
                onPress={() =>
                  Alert.alert(
                    'In This Section You can create your post and read it in Home page',
                  )
                }
                title="CreatePost-Info"
                color="purple"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 30,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  CreatepostText: {
    height: 200,
    padding: 10,
    backgroundColor: 'white',
    fontSize: 20,
    color: 'darkblue',
  },
  CreatePostButton: {
    width: '50%',
    margin: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  DetailscreenText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'palevioletred',
    backgroundColor: 'papayawhip',
    marginBottom: 15,
  },
});

export default App;

import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

// import core from "~/core";
// import infrastructure from "~/infrastructure";

class App extends React.Component {
  public render() {
    return (
      <View style={theme.container}>
        <Text>Hello Native World!</Text>
      </View>
    );
  }
}

const theme = StyleSheet.create(
  {
    container: {
      alignSelf: "center",
      flex: 1,
      marginTop: 200,
    },
  });

export default App;

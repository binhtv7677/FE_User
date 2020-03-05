import * as React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Home from "./Home/Home";
import Account from "./Account/Account";
import History from "./History/History";
import { Icon } from "../components";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Home />
      </View>
    );
  }
}
export function HistoryScreen() {
  const navigation = useNavigation();
  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    // </View>
    <History props={navigation} />

  );
}
export function AccountScreen() {
  const navigation = useNavigation();
  return <Account props={navigation} />;
}

const Tab = createBottomTabNavigator();

export default function RouterTab() {
  return (
    <Tab.Navigator
      con
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let family;
          if (route.name === "Home") {
            iconName = "ios-home";
            family = "Ionicons";
          } else if (route.name === "History") {
            iconName = "ios-list-box";
            family = "Ionicons";
          } else if (route.name === "Account") {
            iconName = "account";
            family = "MaterialCommunityIcons";
          }
          return (
            <Icon family={family} name={iconName} size={25} color={color} />
          );
        }
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray"
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerTitle: props => <Text>abc</Text>
        })}
      />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

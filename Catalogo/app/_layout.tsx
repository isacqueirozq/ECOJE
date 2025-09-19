import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistroImagem from "./index";
import LeituraRegistros from "./LeituraRegistros";

const Stack = createNativeStackNavigator();
export default function RootLayout() {
  return (
      <Stack.Navigator
        initialRouteName="RegistroImagem"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="RegistroImagem" component={RegistroImagem} />
        <Stack.Screen name="LeituraRegistros" component={LeituraRegistros} />
      </Stack.Navigator>
  );
}

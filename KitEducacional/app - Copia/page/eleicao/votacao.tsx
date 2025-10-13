import React from "react";
import { Text, ScrollView, View, StatusBar} from "react-native";
import { colors, fonts } from "@/app/theme";
import UrnaScreen from "@/app/components/UrnaEletronica";

export default function Votacao() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
          <ScrollView contentContainerStyle={{ padding: 24, alignItems: "center" }}>
            <Text style={{
              fontSize: 32,
              fontWeight: "bold",
              color: colors.primary,
              marginTop: 32,
              marginBottom: 8,
              fontFamily: fonts.bold,
              letterSpacing: 1,
            }}>
              Votação
            </Text>
            <Text style={{
              fontSize: 16,
              color: colors.secondary,
              marginBottom: 32,
              textAlign: "center",
              fontFamily: fonts.regular,
            }}>
              Bem-vindo! Escolha uma opção para começar:
            </Text>
            <View style={{ width: "100%", alignItems: "center" }}>
              <UrnaScreen/>
            </View>
          </ScrollView>
        </View>
  );
}

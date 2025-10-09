import React from "react";
import { Text, ScrollView, View, StatusBar} from "react-native";
import { Card } from "./components/Card";
import { colors, fonts } from "./theme";
import { useRouter } from "expo-router";

const cards = [
  {
    title: "Cadastros",
    description: "Gerencie os cadastros de alunos e professores.",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" ,
    route: "page/cadastros", // ajuste conforme o caminho real do arquivo
  },
  {
    title: "Eleição",
    description: "Acesse e gerencie as eleições escolares.",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png" ,
    route: "/page/eleicao", // ajuste conforme o caminho real do arquivo
  },
  {
    title: "Eletivas",
    description: "Veja e escolha as disciplinas eletivas.",
    image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png" ,
    route: "/page/eletiva", // ajuste conforme o caminho real do arquivo
  },
];

export default function Index() {
  const router = useRouter();

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
          Kit Educacional
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
          {cards.map((card, idx) => (
            <Card
              key={idx}
              title={card.title}
              description={card.description}
              imageUrl={card.image}
              onPress={() => router.push(card.route as any)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

import React from "react";
import { Text, ScrollView, View, StatusBar} from "react-native";
import { Card } from "@/src/components/Card";
import { colors, fonts } from "./theme";
import { useRouter } from "expo-router";

const cards = [
  {
    title: "Cadastros",
    description: "Gerencie os cadastros de alunos, professores e Eletivas...",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" ,
    route: "cadastro", // ajuste conforme o caminho real do arquivo
  },
  {
    title: "Listagem",
    description: "Veja o que foi cadastrado na tela cadastros.",
    image: "https://cdn-icons-png.flaticon.com/512/1086/1086933.png" ,
    route: "listagem", // ajuste conforme o caminho real do arquivo
  },
  {
    title: "Eleições Escolares",
    description: "Acesse e gerencie as eleições de presidente de sala.",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png" ,
    route: "eleicao", // ajuste conforme o caminho real do arquivo
  },
  {
    title: "Eletivas",
    description: "Crie e gerencie um formulario online para Eletivas.",
    image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png" ,
    route: "eletiva", // ajuste conforme o caminho real do arquivo
  },
  {
    title: "Midias",
    description: "Baixe videos.",
    image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png" ,
    route: "midias", // ajuste conforme o caminho real do arquivo
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

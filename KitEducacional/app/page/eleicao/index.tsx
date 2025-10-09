import React from "react";
import { Text, ScrollView, View, StatusBar} from "react-native";
import { colors, fonts } from "@/app/theme";
import { Card } from "@/app/components/Card";
import { useRouter } from "expo-router";


const cards = [
  {
    title: "Nova Eleição",
    description: "Gerencie as eleições da sua instituição. \nAbrir Urna Eletrônica",
    icon: "vote",
    route: "page/eleicao/votacao",
    image: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
  },{
    title: "Resultados",
    description: "Veja os resultados das eleições anteriores.",
    icon: "bar-chart",
    route: "page/eleicao/apuracao",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
  },
  {
    title: "Configurações",
    description: "Ajuste as preferências da eleição.",
    icon: "settings",
    route: "page/eleicao/configuracao",
    image: "https://cdn-icons-png.flaticon.com/512/2099/2099058.png"
  },
  {
    title: "Ajuda",
    description: "Obtenha suporte e informações.",
    icon: "help-circle",
    route: "page/eleicao/ajuda",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png"
  }
]

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
              Eleições Educacionais
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

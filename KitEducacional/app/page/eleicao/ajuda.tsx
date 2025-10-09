import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Ajuda() {
  const [sections, setSections] = useState({
    configuracao: false,
    votacao: false,
    apuracao: false,
  });

  const toggleSection = (key: keyof typeof sections) => {
    setSections({ ...sections, [key]: !sections[key] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Ajuda e Orientações</Text>
        <Text style={styles.subtitle}>Saiba como utilizar o sistema de votação</Text>

        {/* Seção 1: Configuração */}
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleSection("configuracao")}
        >
          <Ionicons
            name={sections.configuracao ? "settings" : "settings-outline"}
            size={22}
            color="#004aad"
          />
          <Text style={styles.accordionTitle}>Configuração da Eleição</Text>
          <Ionicons
            name={sections.configuracao ? "chevron-up" : "chevron-down"}
            size={20}
            color="#004aad"
          />
        </TouchableOpacity>
        {sections.configuracao && (
          <View style={styles.accordionContent}>
            <Text style={styles.text}>
              • Acesse a tela <Text style={styles.bold}>Configurações da Eleição</Text> no menu principal.{"\n"}
              • Crie uma nova eleição e nomeie-a (ex: “Eleição Escolar 2025”).{"\n"}
              • Adicione seções ou salas de votação (ex: “Sala 001”).{"\n"}
              • Dentro de cada sala, cadastre os candidatos correspondentes.{"\n"}
              • Todas as informações são salvas automaticamente no dispositivo.
            </Text>
          </View>
        )}

        {/* Seção 2: Votação */}
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleSection("votacao")}
        >
          <Ionicons
            name={sections.votacao ? "finger-print" : "finger-print-outline"}
            size={22}
            color="#004aad"
          />
          <Text style={styles.accordionTitle}>Tela de Votação</Text>
          <Ionicons
            name={sections.votacao ? "chevron-up" : "chevron-down"}
            size={20}
            color="#004aad"
          />
        </TouchableOpacity>
        {sections.votacao && (
          <View style={styles.accordionContent}>
            <Text style={styles.text}>
              • Na tela de votação, o eleitor digita o número do candidato no teclado da urna.{"\n"}
              • A foto, nome e partido do candidato aparecem para conferência.{"\n"}
              • Após confirmar, o voto é computado para o candidato da seção correspondente.{"\n"}
              • Caso o número digitado não exista, o voto é considerado nulo.
            </Text>
          </View>
        )}

        {/* Seção 3: Apuração */}
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleSection("apuracao")}
        >
          <Ionicons
            name={sections.apuracao ? "bar-chart" : "bar-chart-outline"}
            size={22}
            color="#004aad"
          />
          <Text style={styles.accordionTitle}>Apuração dos Votos</Text>
          <Ionicons
            name={sections.apuracao ? "chevron-up" : "chevron-down"}
            size={20}
            color="#004aad"
          />
        </TouchableOpacity>
        {sections.apuracao && (
          <View style={styles.accordionContent}>
            <Text style={styles.text}>
              • Acesse a tela de <Text style={styles.bold}>Apuração</Text> para visualizar os resultados.{"\n"}
              • Cada candidato aparece com sua foto, nome e a porcentagem de votos obtida.{"\n"}
              • As barras de progresso mostram o desempenho visualmente.{"\n"}
              • É possível reiniciar a contagem para simular novas votações.
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <Ionicons name="information-circle-outline" size={20} color="#004aad" />
          <Text style={styles.footerText}>
            Este aplicativo é apenas uma simulação inspirada na urna eletrônica brasileira.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f9fc" },
  scroll: { padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#004aad",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6edfa",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  accordionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#004aad",
    marginLeft: 8,
  },
  accordionContent: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: { color: "#333", lineHeight: 22 },
  bold: { fontWeight: "700", color: "#004aad" },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footerText: { color: "#555", fontSize: 13, flex: 1 },
});

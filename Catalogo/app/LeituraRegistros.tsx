import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FileService } from "./services/fileService";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function LeituraRegistros({ navigation }: any) {
  const [registro, setRegistro] = useState<any>(null);

  useEffect(() => {
    const carregarRegistro = async () => {
      const dados = await AsyncStorage.getItem("@registro");
      if (!dados) return;
      
      const registro = JSON.parse(dados);
      if (registro.imagem) {
        // Verifica se a imagem ainda existe no filesystem
        const fileInfo = await FileService.getFileInfo(registro.imagem);
        if (!fileInfo.exists && FileService.isDocumentUri(registro.imagem)) {
          // Se era um arquivo local e não existe mais, limpa o registro
          registro.imagem = null;
        }
      }
      setRegistro(registro);
    };
    const unsubscribe = navigation?.addListener?.("focus", carregarRegistro);
    carregarRegistro();
    return unsubscribe;
  }, [navigation]);

  if (!registro) {
    return (
      <LinearGradient colors={["#43cea2", "#185a9d"]} style={styles.gradient}>
        <View style={styles.card}>
          <Ionicons name="alert-circle-outline" size={48} color="#185a9d" />
          <Text style={styles.titulo}>Nenhum registro encontrado</Text>
        </View>
      </LinearGradient>
    );
  }

  const limparRegistro = async () => {
    try {
      if (registro?.imagem && FileService.isDocumentUri(registro.imagem)) {
        await FileService.deleteFile(registro.imagem);
      }
      await AsyncStorage.removeItem("@registro");
      setRegistro(null);
    } catch (error) {
      console.error('Erro ao limpar registro:', error);
    }
  };

  return (
    <LinearGradient colors={["#43cea2", "#185a9d"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.titulo}>Seu Registro</Text>
          <Text style={styles.label}>
            <Ionicons name="document-text-outline" size={18} color="#185a9d" /> Descrição:
          </Text>
          <Text style={styles.valor}>{registro.texto || "Sem descrição"}</Text>
          {registro.imagem && (
            <>
              <Text style={styles.label}>
                <Ionicons name="image-outline" size={18} color="#185a9d" /> Imagem:
              </Text>
              <Image source={{ uri: registro.imagem }} style={styles.imagem} />
            </>
          )}
          {registro.localizacao && (
            <>
              <Text style={styles.label}>
                <Ionicons name="location-outline" size={18} color="#185a9d" /> Localização:
              </Text>
              <Text style={styles.valor}>
                Lat: {registro.localizacao.latitude.toFixed(5)} | Lon: {registro.localizacao.longitude.toFixed(5)}
              </Text>
            </>
          )}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.botaoVoltar}
              onPress={() => navigation?.goBack?.()}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
              <Text style={styles.textoBotaoVoltar}>Voltar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.botaoVoltar, styles.botaoLimpar]}
              onPress={limparRegistro}
            >
              <Ionicons name="trash-outline" size={20} color="#fff" />
              <Text style={styles.textoBotaoVoltar}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 20,
    padding: 24,
    width: '90%',
  },
  loadingText: {
    marginTop: 8,
    color: '#185a9d',
    fontSize: 14,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginVertical: 10,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  botaoLimpar: {
    backgroundColor: '#dc2626',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.97)",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 18,
    letterSpacing: 1,
    textAlign: "center",
  },
  label: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 2,
    alignSelf: "flex-start",
  },
  valor: {
    color: "#222",
    fontSize: 16,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  imagem: {
    width: 220,
    height: 220,
    borderRadius: 16,
    marginVertical: 12,
    borderWidth: 2,
    borderColor: "#43cea2",
    alignSelf: "center",
  },
  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#185a9d",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 18,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  textoBotaoVoltar: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
    letterSpacing: 1,
  },
});
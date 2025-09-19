import React, { useState } from "react";
import { View, TextInput, Image, Text, StyleSheet, PermissionsAndroid, Platform, TouchableOpacity } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Geolocation from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export default function RegistroImagem() {
  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const [localizacao, setLocalizacao] = useState<{ latitude: number; longitude: number } | null>(null);
  const navigation = useNavigation();

  const escolherImagem = async () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImagem(response.assets[0].uri || null);
      }
    });
  };

  const pedirPermissaoLocalizacao = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const obterLocalizacao = async () => {
    const permitido = await pedirPermissaoLocalizacao();
    if (!permitido) {
      alert("Permissão de localização negada!");
      return;
    }
    Geolocation.getCurrentPosition(
      (info) => {
        setLocalizacao({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      (error) => {
        alert("Erro ao obter localização: " + error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const salvarDados = async () => {
    const dados = {
      texto,
      imagem,
      localizacao,
    };
    try {
      await AsyncStorage.setItem("@registro", JSON.stringify(dados));
      alert("Dados salvos com sucesso!");
    } catch (e) {
      alert("Erro ao salvar dados!");
    }
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.gradient}
    >
      <View style={styles.card}>
        <Text style={styles.titulo}>Novo Registro</Text>
        <TextInput
          placeholder="Digite uma descrição..."
          value={texto}
          onChangeText={setTexto}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.botaoIcone} onPress={escolherImagem}>
          <Ionicons name="image-outline" size={22} color="#185a9d" />
          <Text style={styles.textoBotao}>Selecionar Imagem</Text>
        </TouchableOpacity>
        {imagem && <Image source={{ uri: imagem }} style={styles.imagem} />}
        <TouchableOpacity style={styles.botaoIcone} onPress={obterLocalizacao}>
          <Ionicons name="location-outline" size={22} color="#185a9d" />
          <Text style={styles.textoBotao}>Obter Localização</Text>
        </TouchableOpacity>
        {localizacao && (
          <Text style={styles.localizacao}>
            <Ionicons name="location" size={16} color="#43cea2" />
            {"  "}Lat: {localizacao.latitude.toFixed(5)} | Lon: {localizacao.longitude.toFixed(5)}
          </Text>
        )}
        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarDados}>
          <Ionicons name="save-outline" size={22} color="#fff" />
          <Text style={styles.textoBotaoSalvar}>Salvar Dados</Text>
        </TouchableOpacity>
        {/* BOTÃO PARA ACESSAR A PÁGINA DE LEITURA */}
        <TouchableOpacity
          style={[styles.botaoIcone, { backgroundColor: "#dbeafe", marginTop: 10 }]}
          onPress={() => navigation.navigate("LeituraRegistros")}
        >
          <Ionicons name="list-outline" size={22} color="#185a9d" />
          <Text style={styles.textoBotao}>Ver Registro</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 24,
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#43cea2",
    borderRadius: 10,
    width: "100%",
    padding: 12,
    marginBottom: 18,
    fontSize: 16,
    backgroundColor: "#f7f7f7",
    color: "#222",
  },
  botaoIcone: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f9f3",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 14,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  textoBotao: {
    color: "#185a9d",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  imagem: {
    width: 220,
    height: 220,
    borderRadius: 16,
    marginVertical: 18,
    borderWidth: 2,
    borderColor: "#43cea2",
  },
  localizacao: {
    marginBottom: 18,
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "flex-start",
  },
  botaoSalvar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#185a9d",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  textoBotaoSalvar: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 17,
    letterSpacing: 1,
  },
});
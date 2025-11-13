import React, { useState } from "react";
import { 
  View, 
  TextInput, 
  Image, 
  Text, 
  StyleSheet, 
  PermissionsAndroid, 
  Platform, 
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Geolocation from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FileService } from "./services/fileService";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export default function RegistroImagem() {
  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [localizacao, setLocalizacao] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const escolherImagem = async () => {
    launchImageLibrary({ mediaType: "photo" }, async (response) => {
      if (response.assets && response.assets.length > 0) {
        const pickedUri = response.assets[0].uri || null;
        if (!pickedUri) return;
        
        try {
          setIsLoading(true);
          // Gerar preview primeiro
          const thumbUri = await FileService.generateThumbnail(pickedUri);
          setPreview(thumbUri);
          
          // Copiar imagem original para local persistente
          const dest = await FileService.copyImageToDocuments(pickedUri);
          setImagem(dest);
        } catch (err) {
          console.error('Erro ao processar imagem:', err);
          // fallback: usar URI original
          setPreview(pickedUri);
          setImagem(pickedUri);
        } finally {
          setIsLoading(false);
        }
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
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert("Erro ao salvar dados!");
    }
  };

//TODO: Implementar a funcionalidade do Google Lens para reconhecimento de imagens.
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <LinearGradient
          colors={["#43cea2", "#185a9d"]}
          style={styles.gradient}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.card}>
        <Text style={styles.titulo}>Novo Registro</Text>
        <TextInput
          placeholder="Digite uma descrição..."
          value={texto}
          onChangeText={setTexto}
          style={styles.input}
          placeholderTextColor="#888"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
        <TouchableOpacity 
          style={[styles.botaoIcone, isLoading && styles.botaoDesabilitado]} 
          onPress={escolherImagem}
          disabled={isLoading}
        >
          <Ionicons name="image-outline" size={22} color="#185a9d" />
          <Text style={styles.textoBotao}>
            {isLoading ? "Processando..." : "Selecionar Imagem"}
          </Text>
        </TouchableOpacity>
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#185a9d" />
            <Text style={styles.loadingText}>Processando imagem...</Text>
          </View>
        )}
        
        {preview && !isLoading && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewLabel}>Preview:</Text>
            <Image source={{ uri: preview }} style={styles.preview} />
          </View>
        )}
        
        {imagem && !isLoading && (
          <View style={styles.imageContainer}>
            <Text style={styles.imageLabel}>Imagem Final:</Text>
            <Image source={{ uri: imagem }} style={styles.imagem} />
          </View>
        )}
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
    onPress={() => (navigation as any).navigate("LeituraRegistros")}
        >
          <Ionicons name="list-outline" size={22} color="#185a9d" />
          <Text style={styles.textoBotao}>Ver Registro</Text>
        </TouchableOpacity>
                  </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    minHeight: '100%',
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  loadingContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#185a9d',
    fontSize: 14,
  },
  previewContainer: {
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  previewLabel: {
    color: '#185a9d',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  preview: {
    width: 150,
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#43cea2',
  },
  imageContainer: {
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  imageLabel: {
    color: '#185a9d',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.97)",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    marginHorizontal: 'auto',
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
    minHeight: 100,
    textAlignVertical: 'top',
    multiline: true,
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
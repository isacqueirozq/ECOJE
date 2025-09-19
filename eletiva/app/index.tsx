import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

export default function Index() {
  const [matricula, setMatricula] = useState("");

  const handleConsulta = async () => {
    if (!matricula) {
      alert("Informe a matrícula.");
      return;
    }
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbxCFs4jokx_Q_JbIEoWzzGMoFNM6OieAgg_GFYSHvQe7OwjkAi5NZKMguSkOxEczslBMw/exec?matricula=${matricula}`
      );
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert(`Nome: ${data.nome}\nTurma: ${data.turma}`);
      }
    } catch (error) {
      alert("Erro ao consultar. Tente novamente.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Informe seu Número de Matrícula</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de Matrícula"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={matricula}
          onChangeText={setMatricula}
        />
        <TouchableOpacity style={styles.button} onPress={handleConsulta}>
          <Text style={styles.buttonText}>Consultar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    maxWidth: 320,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    width: "100%",
    maxWidth: 320,
    height: 48,
    backgroundColor: "#4f8cff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4f8cff",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

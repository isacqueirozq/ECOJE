import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { Card } from "@/app/components/Card";
import { Ionicons } from "@expo/vector-icons";
import { appendData } from "@/app/storage/storageService";
import { FormProfessores } from "@/app/forms/FormProfessores";
// importe os outros formulários aqui...

type TabKey = "professores" | "alunos" | "eletivas" | "candidatos" | "turmas";

const tabs = [
  { key: "professores", label: "Professores", icon: "person" },
  { key: "alunos", label: "Alunos", icon: "people" },
  { key: "eletivas", label: "Eletivas", icon: "book" },
  { key: "candidatos", label: "Candidatos", icon: "checkmark-done" },
  { key: "turmas", label: "Turmas", icon: "school" },
];

export default function CadastroScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>("professores");
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!Object.values(formData).some(Boolean)) {
      Alert.alert("Atenção", "Preencha os campos obrigatórios!");
      return;
    }
    await appendData(activeTab, formData);
    Alert.alert("✅ Sucesso", `${activeTab} cadastrado com sucesso!`);
    setFormData({});
  };

  const renderForm = () => {
    switch (activeTab) {
      case "professores": return <FormProfessores formData={formData} onChange={handleChange} />;
      // case "alunos": return <FormAlunos ... />;
      // case "eletivas": return <FormEletivas ... />;
      // etc.
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key as TabKey)}
          >
            <Ionicons name={tab.icon as any} size={18} color={activeTab === tab.key ? "#1e3a8a" : "#fff"} />
            <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Card
        title={`Cadastro de ${activeTab}`}
        description="Preencha os campos abaixo"
        imageUrl="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {renderForm()}
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleSubmit}>
            <Text style={styles.btnText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={() => setFormData({})}>
            <Text style={styles.btnText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e0e7ff", padding: 16 },
  tabs: { marginBottom: 16 },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4f46e5",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#4f46e5" },
  tabText: { marginLeft: 6, color: "#fff", fontSize: 14 },
  activeTabText: { color: "#1e3a8a", fontWeight: "bold" },
  actions: { flexDirection: "row", justifyContent: "space-between", gap: 10, marginTop: 16 },
  btn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  btnPrimary: { backgroundColor: "#4f46e5" },
  btnSecondary: { backgroundColor: "#94a3b8" },
  btnText: { color: "#fff", fontWeight: "600" },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { Input } from "@/app/components/Input";
import { Select } from "@/app/components/Select";
import { Card } from "@/app/components/Card";
import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
import { appendData } from "@/app/storage/storageService";

type TabKey = "professores" | "alunos" | "eletivas" | "candidatos" | "turmas";

const tabs = [
  { key: "professores", label: "Professores", icon: "person" },
  { key: "alunos", label: "Alunos", icon: "people" },
  { key: "eletivas", label: "Eletivas", icon: "book" },
  { key: "candidatos", label: "Candidatos", icon: "checkmark-done" },
  { key: "turmas", label: "Turmas", icon: "school" },
];

export default function CadastroScreen() {
  // const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<TabKey>("professores");
  const [formData, setFormData] = useState<Record<string, any>>({});


  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!Object.values(formData).some(Boolean)) {
      Alert.alert("Atenção", "Preencha ao menos um campo!");
      return;
    }
    await appendData(activeTab, formData);
    Alert.alert("✅ Sucesso", `${activeTab} cadastrado com sucesso!`);
    setFormData({});
  };

  const renderForm = () => {
    switch (activeTab) {
      case "professores":
        return (
          <>
            <Input label="Nome Completo" placeholder="Digite o nome do professor"
              value={formData.nome || ""} onChangeText={(v) => handleInputChange("nome", v)} required />
            <Input label="CPF" placeholder="000.000.000-00"
              value={formData.cpf || ""} onChangeText={(v) => handleInputChange("cpf", v)} required />
            <Input label="E-mail" placeholder="professor@escola.com" keyboardType="email-address"
              value={formData.email || ""} onChangeText={(v) => handleInputChange("email", v)} required />
            <Input label="Telefone" placeholder="(00) 00000-0000"
              value={formData.telefone || ""} onChangeText={(v) => handleInputChange("telefone", v)} />
            <Select label="Área de Atuação" value={formData.area || ""} onValueChange={(v) => handleInputChange("area", v)} required options={[
              { value: "matematica", label: "Matemática" },
              { value: "portugues", label: "Português" },
              { value: "ciencias", label: "Ciências" },
              { value: "historia", label: "História" },
            ]} />
          </>
        );

      case "alunos":
        return (
          <>
            <Input label="Nome Completo" placeholder="Digite o nome do aluno"
              value={formData.nome || ""} onChangeText={(v) => handleInputChange("nome", v)} required />
            <Input label="Data de Nascimento" placeholder="dd/mm/aaaa"
              value={formData.dataNasc || ""} onChangeText={(v) => handleInputChange("dataNasc", v)} required />
            <Input label="Matrícula" placeholder="000000"
              value={formData.matricula || ""} onChangeText={(v) => handleInputChange("matricula", v)} required />
            <Input label="E-mail" placeholder="aluno@escola.com" keyboardType="email-address"
              value={formData.email || ""} onChangeText={(v) => handleInputChange("email", v)} />
            <Input label="Responsável" placeholder="Nome do responsável"
              value={formData.responsavel || ""} onChangeText={(v) => handleInputChange("responsavel", v)} required />
            <Input label="Telefone do Responsável" placeholder="(00) 00000-0000"
              value={formData.telefoneResp || ""} onChangeText={(v) => handleInputChange("telefoneResp", v)} required />
          </>
        );

      case "eletivas":
        return (
          <>
            <Input label="Nome da Eletiva" placeholder="Digite o nome da eletiva"
              value={formData.nomeEletiva || ""} onChangeText={(v) => handleInputChange("nomeEletiva", v)} required />
            <Input label="Descrição" placeholder="Breve descrição"
              value={formData.descricao || ""} onChangeText={(v) => handleInputChange("descricao", v)} />
            <Select label="Professor Responsável" value={formData.professor || ""} onValueChange={(v) => handleInputChange("professor", v)} required options={[
              { value: "prof1", label: "Prof. João Silva" },
              { value: "prof2", label: "Profa. Maria Santos" },
              { value: "prof3", label: "Prof. Carlos Souza" },
            ]} />
            <Input label="Carga Horária" placeholder="40" keyboardType="numeric"
              value={formData.cargaHoraria || ""} onChangeText={(v) => handleInputChange("cargaHoraria", v)} required />
            <Input label="Vagas Disponíveis" placeholder="30" keyboardType="numeric"
              value={formData.vagas || ""} onChangeText={(v) => handleInputChange("vagas", v)} required />
            <Select label="Período" value={formData.periodo || ""} onValueChange={(v) => handleInputChange("periodo", v)} required options={[
              { value: "matutino", label: "Matutino" },
              { value: "vespertino", label: "Vespertino" },
              { value: "noturno", label: "Noturno" },
            ]} />
          </>
        );

      case "candidatos":
        return (
          <>
            <Input label="Nome Completo" placeholder="Digite o nome"
              value={formData.nome || ""} onChangeText={(v) => handleInputChange("nome", v)} required />
            <Input label="CPF" placeholder="000.000.000-00"
              value={formData.cpf || ""} onChangeText={(v) => handleInputChange("cpf", v)} required />
            <Input label="E-mail" placeholder="candidato@email.com"
              value={formData.email || ""} onChangeText={(v) => handleInputChange("email", v)} required keyboardType="email-address" />
            <Input label="Telefone" placeholder="(00) 00000-0000"
              value={formData.telefone || ""} onChangeText={(v) => handleInputChange("telefone", v)} required />
            <Select label="Cargo Pretendido" value={formData.cargo || ""} onValueChange={(v) => handleInputChange("cargo", v)} required options={[
              { value: "professor", label: "Professor" },
              { value: "coordenador", label: "Coordenador" },
              { value: "diretor", label: "Diretor" },
              { value: "administrativo", label: "Administrativo" },
            ]} />
            <Input label="Formação" placeholder="Graduação, Pós, etc."
              value={formData.formacao || ""} onChangeText={(v) => handleInputChange("formacao", v)} required />
          </>
        );

      case "turmas":
        return (
          <>
            <Input label="Nome da Turma" placeholder="Ex: 1º Ano A"
              value={formData.nomeTurma || ""} onChangeText={(v) => handleInputChange("nomeTurma", v)} required />
            <Select label="Ano/Série" value={formData.serie || ""} onValueChange={(v) => handleInputChange("serie", v)} required options={[
              { value: "1ano", label: "1º Ano" },
              { value: "2ano", label: "2º Ano" },
              { value: "3ano", label: "3º Ano" },
            ]} />
            <Select label="Turno" value={formData.turno || ""} onValueChange={(v) => handleInputChange("turno", v)} required options={[
              { value: "matutino", label: "Matutino" },
              { value: "vespertino", label: "Vespertino" },
              { value: "noturno", label: "Noturno" },
            ]} />
            <Input label="Capacidade" placeholder="35" keyboardType="numeric"
              value={formData.capacidade || ""} onChangeText={(v) => handleInputChange("capacidade", v)} required />
            <Select label="Professor Orientador" value={formData.orientador || ""} onValueChange={(v) => handleInputChange("orientador", v)} options={[
              { value: "prof1", label: "Prof. João Silva" },
              { value: "prof2", label: "Profa. Maria Santos" },
              { value: "prof3", label: "Prof. Carlos Souza" },
            ]} />
            <Input label="Sala" placeholder="Ex: Sala 101"
              value={formData.sala || ""} onChangeText={(v) => handleInputChange("sala", v)} />
          </>
        );

      default:
        return null;
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
            <Ionicons
              name={tab.icon as any}
              size={18}
              color={activeTab === tab.key ? "#1e3a8a" : "#fff"}
            />
            <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Card
        title={`Cadastro de ${activeTab}`}
        description="Preencha os campos abaixo"
        imageUrl="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.form}>{renderForm()}</View>

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
  tabs: { flexGrow: 0, marginBottom: 16 },
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
  form: { backgroundColor: "#fff", borderRadius: 16, padding: 20, marginBottom: 20 },
  actions: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  btn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  btnPrimary: { backgroundColor: "#4f46e5" },
  btnSecondary: { backgroundColor: "#94a3b8" },
  btnText: { color: "#fff", fontWeight: "600" },
});

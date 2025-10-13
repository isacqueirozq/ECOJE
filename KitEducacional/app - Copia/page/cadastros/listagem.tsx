import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { loadData } from "@/app/storage/storageService";

export default function ListagemScreen() {
  const [dados, setDados] = useState<any[]>([]);
  const [tipo, setTipo] = useState("professores");

  useEffect(() => {
    const fetch = async () => {
      const res = await loadData(tipo);
      setDados(res || []);
    };
    fetch();
  }, [tipo]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de {tipo}</Text>

      <FlatList
        data={dados}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.nome || item.nomeEletiva || item.nomeTurma}</Text>
            <Text style={styles.email}>{item.email || item.professor || ""}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Nenhum registro encontrado.</Text>}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setTipo("professores")}><Text>👩‍🏫 Professores</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setTipo("alunos")}><Text>👨‍🎓 Alunos</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setTipo("eletivas")}><Text>📘 Eletivas</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  item: { borderBottomWidth: 1, borderColor: "#ddd", paddingVertical: 8 },
  name: { fontSize: 16, fontWeight: "600" },
  email: { color: "#555" },
  footer: { flexDirection: "row", justifyContent: "space-around", marginTop: 20 },
});

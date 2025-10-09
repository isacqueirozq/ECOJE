import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { loadData } from "@/app/storage/storageService";

export default function ListagemScreen() {
  const [dados, setDados] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await loadData("professores");
      if (res) setDados(res);
    };
    fetch();
  }, []);

  return (
    <View>
      <FlatList
        data={dados}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text>{item.nome} — {item.email}</Text>
        )}
      />
    </View>
  );
}

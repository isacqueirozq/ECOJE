import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

// Tela de Configurações da Eleição com suporte a múltiplas eleições, seções e candidatos

export default function Configuracao() {
  const [eleicoes, setEleicoes] = useState<any[]>([]);
  const [novaEleicao, setNovaEleicao] = useState('');
  const [novaSala, setNovaSala] = useState('');
  const [novoCandidato, setNovoCandidato] = useState('');
  const [eleicaoSelecionada, setEleicaoSelecionada] = useState<string | null>(null);
  const [salaSelecionada, setSalaSelecionada] = useState<string | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const data = await AsyncStorage.getItem('eleicoes');
      if (data) setEleicoes(JSON.parse(data));
    } catch (error) {
      console.log('Erro ao carregar dados:', error);
    }
  }

  async function salvarDados(novasEleicoes: any[]) {
    try {
      await AsyncStorage.setItem('eleicoes', JSON.stringify(novasEleicoes));
      setEleicoes(novasEleicoes);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  }

  function adicionarEleicao() {
    if (!novaEleicao.trim()) return;
    const nova = { nome: novaEleicao.trim(), salas: [] };
    const atualizadas = [...eleicoes, nova];
    salvarDados(atualizadas);
    setNovaEleicao('');
  }

  function adicionarSala() {
    if (!eleicaoSelecionada || !novaSala.trim()) return;
    const atualizadas = eleicoes.map((e) => {
      if (e.nome === eleicaoSelecionada) {
        return { ...e, salas: [...e.salas, { nome: novaSala.trim(), candidatos: [] }] };
      }
      return e;
    });
    salvarDados(atualizadas);
    setNovaSala('');
  }

  function adicionarCandidato() {
    if (!eleicaoSelecionada || !salaSelecionada || !novoCandidato.trim()) return;
    const atualizadas = eleicoes.map((e) => {
      if (e.nome === eleicaoSelecionada) {
        return {
          ...e,
          salas: e.salas.map((s) => {
            if (s.nome === salaSelecionada) {
              return { ...s, candidatos: [...s.candidatos, novoCandidato.trim()] };
            }
            return s;
          }),
        };
      }
      return e;
    });
    salvarDados(atualizadas);
    setNovoCandidato('');
  }

  function removerTudo() {
    Alert.alert('Confirmação', 'Deseja realmente apagar todas as configurações?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Apagar',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('eleicoes');
          setEleicoes([]);
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Configurações da Eleição</Text>

        {/* Criar nova eleição */}
        <View style={styles.section}>
          <Text style={styles.label}>Nova Eleição</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="Ex: Eleição Escolar 2025"
              value={novaEleicao}
              onChangeText={setNovaEleicao}
            />
            <TouchableOpacity style={styles.button} onPress={adicionarEleicao}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de eleições */}
        <FlatList
          data={eleicoes}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => setEleicaoSelecionada(item.nome)}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
              </TouchableOpacity>

              {eleicaoSelecionada === item.nome && (
                <>
                  {/* Adicionar sala */}
                  <View style={styles.subSection}>
                    <TextInput
                      style={styles.input}
                      placeholder="Nova Sala (ex: Sala 001)"
                      value={novaSala}
                      onChangeText={setNovaSala}
                    />
                    <TouchableOpacity style={styles.smallButton} onPress={adicionarSala}>
                      <Text style={styles.smallButtonText}>Adicionar Sala</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Lista de salas */}
                  {item.salas.map((sala: any) => (
                    <View key={sala.nome} style={styles.salaCard}>
                      <TouchableOpacity onPress={() => setSalaSelecionada(sala.nome)}>
                        <Text style={styles.salaTitle}>{sala.nome}</Text>
                      </TouchableOpacity>

                      {salaSelecionada === sala.nome && (
                        <>
                          {/* Adicionar candidato */}
                          <View style={styles.subSection}>
                            <TextInput
                              style={styles.input}
                              placeholder="Nome do candidato"
                              value={novoCandidato}
                              onChangeText={setNovoCandidato}
                            />
                            <TouchableOpacity style={styles.smallButton} onPress={adicionarCandidato}>
                              <Text style={styles.smallButtonText}>Adicionar</Text>
                            </TouchableOpacity>
                          </View>

                          {/* Lista de candidatos */}
                          {sala.candidatos.length > 0 ? (
                            sala.candidatos.map((c: string, idx: number) => (
                              <Text key={idx} style={styles.candidatoText}>• {c}</Text>
                            ))
                          ) : (
                            <Text style={styles.candidatoVazio}>Nenhum candidato ainda</Text>
                          )}
                        </>
                      )}
                    </View>
                  ))}
                </>
              )}
            </View>
          )}
        />

        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={removerTudo}>
          <Text style={styles.buttonText}>Apagar Tudo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fc' },
  scroll: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#004aad', marginBottom: 16, textAlign: 'center' },
  section: { marginBottom: 20 },
  label: { fontWeight: '600', marginBottom: 8, color: '#333' },
  row: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#004aad',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: { color: '#fff', fontWeight: '700' },
  deleteButton: { backgroundColor: '#d9534f', marginTop: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#222' },
  subSection: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  smallButton: {
    backgroundColor: '#00a86b',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 6,
  },
  smallButtonText: { color: '#fff', fontWeight: '700' },
  salaCard: {
    backgroundColor: '#eef3fb',
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  salaTitle: { fontWeight: '700', color: '#004aad' },
  candidatoText: { marginLeft: 10, color: '#333' },
  candidatoVazio: { marginLeft: 10, color: '#777', fontStyle: 'italic' },
});


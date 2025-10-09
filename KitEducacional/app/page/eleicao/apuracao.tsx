import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Tela de Apuração de Votos com animações e botão de reinício

const candidatosIniciais = [
  {
    id: '1',
    nome: 'João Silva',
    partido: 'PT',
    votos: 42,
    foto: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png',
  },
  {
    id: '2',
    nome: 'Maria Costa',
    partido: 'PSD',
    votos: 35,
    foto: 'https://cdn-icons-png.flaticon.com/512/2922/2922561.png',
  },
  {
    id: '3',
    nome: 'Carlos Pereira',
    partido: 'PSDB',
    votos: 23,
    foto: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
];

export default function ApuracaoScreen() {
  const [candidatos, setCandidatos] = useState(candidatosIniciais);
  const totalVotos = candidatos.reduce((sum, c) => sum + c.votos, 0);
  const animValues = useRef(candidatos.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      200,
      animValues.map((anim, i) =>
        Animated.timing(anim, {
          toValue: (candidatos[i].votos / totalVotos) * 100,
          duration: 1000,
          useNativeDriver: false,
        })
      )
    ).start();
  }, [candidatos]);

  function reiniciarVotacao() {
    const novos = candidatos.map((c) => ({ ...c, votos: Math.floor(Math.random() * 100) }));
    setCandidatos(novos);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Apuração de Votos</Text>
        <Text style={styles.subtitle}>Resultado Atualizado</Text>
      </View>

      <FlatList
        data={candidatos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => {
          const percentual = animValues[index].interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          });

          const votosPercent = ((item.votos / totalVotos) * 100).toFixed(1);

          return (
            <View style={styles.card}>
              <Image source={{ uri: item.foto }} style={styles.foto} />
              <View style={styles.infoContainer}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.partido}>{item.partido}</Text>
                <View style={styles.resultRow}>
                  <Animated.View style={[styles.barra, { width: percentual }]} />
                </View>
                <Text style={styles.percentual}>{votosPercent}% dos votos</Text>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total de votos: {totalVotos}</Text>
        <TouchableOpacity style={styles.button} onPress={reiniciarVotacao}>
          <Text style={styles.buttonText}>Reiniciar Votação</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
  header: {
    padding: 20,
    backgroundColor: '#004aad',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    color: '#dfe6f3',
    marginTop: 4,
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  foto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  partido: {
    color: '#777',
    fontSize: 14,
  },
  resultRow: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 6,
  },
  barra: {
    height: '100%',
    backgroundColor: '#00a86b',
    borderRadius: 5,
  },
  percentual: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    color: '#333',
    fontWeight: '600',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#004aad',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// UrnaScreen.tsx
// Componente que imita a aparência e comportamento básico de uma urna eletrônica brasileira.
// Feito para uso em projetos React Native (Expo).

const { width } = Dimensions.get('window');
const SCREEN_PADDING = 16;

type Candidate = {
  numero: string;
  nome: string;
  partido: string;
};

const candidates: Candidate[] = [
  { numero: '13', nome: 'João Silva', partido: 'PT' },
  { numero: '22', nome: 'Maria Costa', partido: 'PSD' },
  { numero: '45', nome: 'Carlos Pereira', partido: 'PSDB' },
];

export default function UrnaScreen() {
  const [digits, setDigits] = useState<string>('');
  const [displayCandidate, setDisplayCandidate] = useState<Candidate | null>(null);
  const [message, setMessage] = useState<string>('Digite o número do candidato');
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const shake = new Animated.Value(0);

  function pressDigit(d: string) {
    if (confirmed) return; // não aceitar mais dígitos após confirmação
    if (digits.length >= 2) return; // urna simples: 2 dígitos
    const newDigits = digits + d;
    setDigits(newDigits);

    const found = candidates.find((c) => c.numero === newDigits);
    if (found) {
      setDisplayCandidate(found);
      setMessage('Confirme seu voto');
    } else if (newDigits.length === 2) {
      setDisplayCandidate(null);
      setMessage('VOTO NULO');
      // pequeno efeito de shake para destacar erro
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
    }
  }

  function corrige() {
    if (confirmed) return;
    setDigits('');
    setDisplayCandidate(null);
    setMessage('Digite o número do candidato');
  }

  function branco() {
    if (confirmed) return;
    setDigits('');
    setDisplayCandidate(null);
    setMessage('VOTO EM BRANCO');
    setConfirmed(true);
  }

  function confirma() {
    if (confirmed) return;
    if (digits.length < 2 && message !== 'VOTO EM BRANCO') {
      // exigir 2 dígitos ou voto em branco
      setMessage('Número incompleto');
      return;
    }
    setConfirmed(true);
    setMessage('VOTO REGISTRADO — OBRIGADO');
  }

  const shakeInterpolation = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: [-6, 6],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.urnaContainer}>
        <View style={styles.screenArea}>
          <View style={styles.leftPanel}>
            <Text style={styles.title}>VOTO</Text>
            <Text style={styles.subtitle}>ETAPA ÚNICA</Text>

            <Animated.View style={[styles.candidateBox, { transform: [{ translateX: shakeInterpolation }] }]}> 
              {displayCandidate ? (
                <>
                  <Text style={styles.label}>Número</Text>
                  <View style={styles.numberDisplay}>
                    <Text style={styles.numberText}>{displayCandidate.numero}</Text>
                  </View>

                  <Text style={styles.label}>Nome</Text>
                  <Text style={styles.candidateName}>{displayCandidate.nome}</Text>

                  <Text style={styles.label}>Partido</Text>
                  <Text style={styles.candidateParty}>{displayCandidate.partido}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.label}>Número</Text>
                  <View style={styles.numberDisplay}>
                    <Text style={styles.numberText}>{digits || '__'}</Text>
                  </View>

                  <Text style={styles.infoText}>{message}</Text>
                </>
              )}
            </Animated.View>
          </View>

          <View style={styles.rightPanel}>
            <View style={styles.previewScreen}>
              <Text style={styles.previewTitle}>TELA DO ELEITOR</Text>
              <Text style={styles.previewDigits}>{digits || '-'}</Text>
              {displayCandidate ? (
                <Text style={styles.previewCandidate}>{displayCandidate.nome} — {displayCandidate.partido}</Text>
              ) : (
                <Text style={styles.previewCandidateSmall}>{message}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.keypadArea}>
          <View style={styles.keypadRow}>
            {['1','2','3'].map((d) => (
              <Key key={d} label={d} onPress={() => pressDigit(d)} />
            ))}
          </View>
          <View style={styles.keypadRow}>
            {['4','5','6'].map((d) => (
              <Key key={d} label={d} onPress={() => pressDigit(d)} />
            ))}
          </View>
          <View style={styles.keypadRow}>
            {['7','8','9'].map((d) => (
              <Key key={d} label={d} onPress={() => pressDigit(d)} />
            ))}
          </View>
          <View style={styles.keypadRow}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={[styles.actionKey, styles.whiteKey]} onPress={branco} accessibilityLabel="Branco">
                <Text style={styles.actionText}>BRANCO</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <Key label={'0'} onPress={() => pressDigit('0')} />
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity style={[styles.actionKey, styles.corrigeKey]} onPress={corrige} accessibilityLabel="Corrige">
                <Text style={styles.actionText}>CORRIGE</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity style={[styles.largeAction, styles.confirmKey]} onPress={confirma} accessibilityLabel="Confirma">
              <Text style={[styles.actionText, { fontWeight: '700' }]}>CONFIRMA</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    </SafeAreaView>
  );
}

function Key({ label, onPress } : { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.key} onPress={onPress} accessibilityLabel={`Tecla ${label}`}>
      <Text style={styles.keyText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222', padding: SCREEN_PADDING },
  urnaContainer: { flex: 1, backgroundColor: '#111', borderRadius: 12, padding: 12 },
  screenArea: { flexDirection: 'row', padding: 12 },
  leftPanel: { flex: 2, paddingRight: 8 },
  rightPanel: { flex: 1, paddingLeft: 8, justifyContent: 'center' },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  subtitle: { color: '#ddd', fontSize: 12, marginBottom: 8 },
  candidateBox: { backgroundColor: '#e6e6e6', padding: 10, borderRadius: 6, minHeight: 160 },
  label: { fontSize: 12, color: '#333', marginTop: 6 },
  numberDisplay: { backgroundColor: '#fff', width: 120, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 4, marginTop: 6 },
  numberText: { fontSize: 24, fontWeight: '700', color: '#000' },
  candidateName: { fontSize: 18, fontWeight: '700', color: '#000', marginTop: 4 },
  candidateParty: { fontSize: 16, color: '#333', marginTop: 2 },
  infoText: { marginTop: 12, color: '#111', fontWeight: '600' },

  previewScreen: { backgroundColor: '#000', padding: 8, borderRadius: 6, minHeight: 160, justifyContent: 'center', alignItems: 'center' },
  previewTitle: { color: '#fff', fontSize: 12, marginBottom: 6 },
  previewDigits: { color: '#00ff7f', fontSize: 34, fontWeight: '800' },
  previewCandidate: { color: '#fff', marginTop: 8, textAlign: 'center' },
  previewCandidateSmall: { color: '#bbb', marginTop: 8, textAlign: 'center' },

  keypadArea: { marginTop: 12, padding: 8 },
  keypadRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  key: { flex: 1, marginHorizontal: 6, backgroundColor: '#2a2a2a', borderRadius: 6, paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  keyText: { color: '#fff', fontSize: 20, fontWeight: '700' },

  actionKey: { marginHorizontal: 6, borderRadius: 6, paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  whiteKey: { backgroundColor: '#fff' },
  corrigeKey: { backgroundColor: '#ff5c5c' },
  confirmKey: { backgroundColor: '#00a86b' },
  actionText: { color: '#000', fontWeight: '700' },

  bottomRow: { marginTop: 8, alignItems: 'center' },
  largeAction: { width: width - SCREEN_PADDING * 2 - 40, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
});

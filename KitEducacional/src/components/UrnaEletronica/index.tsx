import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// UrnaScreen.tsx
// Componente que imita a aparência e comportamento básico de uma urna eletrônica brasileira.
// Feito para uso em projetos React Native (Expo).
// Tornado responsivo para computador, tablet e celular.

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
  const { width: windowWidth } = useWindowDimensions();

  // Breakpoints simples
  const TABLET_BP = 600;
  const DESKTOP_BP = 900;
  const isPhone = windowWidth < TABLET_BP;
  const isTablet = windowWidth >= TABLET_BP && windowWidth < DESKTOP_BP;
  const isDesktop = windowWidth >= DESKTOP_BP;

  // Ajustes responsivos
  const SCREEN_PADDING = isDesktop ? 24 : isTablet ? 20 : 12;
  const containerWidth = Math.min(windowWidth - SCREEN_PADDING * 2, isDesktop ? 1100 : isTablet ? 900 : windowWidth);

  const [digits, setDigits] = useState<string>('');
  const [displayCandidate, setDisplayCandidate] = useState<Candidate | null>(null);
  const [message, setMessage] = useState<string>('Digite o número do candidato');
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const shake = useRef(new Animated.Value(0)).current;

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

  // estilos responsivos inline/derivados
  const dynamicStyles = StyleSheet.create({
    containerDynamic: {
      padding: SCREEN_PADDING,
      alignItems: 'center',
      backgroundColor: '#222',
    },
    urnaContainerDynamic: {
      width: containerWidth,
      padding: isDesktop ? 18 : isTablet ? 14 : 10,
    },
    screenAreaDynamic: {
      flexDirection: isPhone ? 'column' : 'row',
    },
    leftPanelDynamic: {
      flex: isDesktop ? 3 : 2,
      paddingRight: isPhone ? 0 : 8,
      marginBottom: isPhone ? 12 : 0,
    },
    rightPanelDynamic: {
      flex: isDesktop ? 2 : 1,
      paddingLeft: isPhone ? 0 : 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    candidateBoxDynamic: {
      minHeight: isPhone ? 140 : 180,
      padding: isPhone ? 8 : 12,
    },
    numberDisplayDynamic: {
      width: isPhone ? 100 : isTablet ? 140 : 180,
      height: isPhone ? 38 : isTablet ? 48 : 56,
      marginTop: 6,
    },
    numberTextDynamic: {
      fontSize: isPhone ? 22 : isTablet ? 28 : 34,
    },
    previewScreenDynamic: {
      minHeight: isPhone ? 120 : 180,
      padding: isPhone ? 8 : 12,
    },
    previewDigitsDynamic: {
      fontSize: isPhone ? 28 : isTablet ? 40 : 52,
    },
    keyDynamic: {
      paddingVertical: isPhone ? 12 : 18,
    },
    largeActionDynamic: {
      width: Math.min(containerWidth - 40, isDesktop ? 520 : isTablet ? 420 : containerWidth - 40),
      paddingVertical: isPhone ? 12 : 16,
    },
  });

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.containerDynamic]}>
      <View style={[styles.urnaContainer, dynamicStyles.urnaContainerDynamic]}>
        <View style={[styles.screenArea, dynamicStyles.screenAreaDynamic]}>
          <View style={[styles.leftPanel, dynamicStyles.leftPanelDynamic]}>
            <Text style={styles.title}>VOTO</Text>
            <Text style={styles.subtitle}>ETAPA ÚNICA</Text>

            <Animated.View style={[
              styles.candidateBox,
              dynamicStyles.candidateBoxDynamic,
              { transform: [{ translateX: shakeInterpolation }] }
            ]}>
              {displayCandidate ? (
                <>
                  <Text style={styles.label}>Número</Text>
                  <View style={[styles.numberDisplay, dynamicStyles.numberDisplayDynamic]}>
                    <Text style={[styles.numberText, dynamicStyles.numberTextDynamic]}>{displayCandidate.numero}</Text>
                  </View>

                  <Text style={styles.label}>Nome</Text>
                  <Text style={styles.candidateName}>{displayCandidate.nome}</Text>

                  <Text style={styles.label}>Partido</Text>
                  <Text style={styles.candidateParty}>{displayCandidate.partido}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.label}>Número</Text>
                  <View style={[styles.numberDisplay, dynamicStyles.numberDisplayDynamic]}>
                    <Text style={[styles.numberText, dynamicStyles.numberTextDynamic]}>{digits || '__'}</Text>
                  </View>

                  <Text style={styles.infoText}>{message}</Text>
                </>
              )}
            </Animated.View>
          </View>

          <View style={[styles.rightPanel, dynamicStyles.rightPanelDynamic]}>
            <View style={[styles.previewScreen, dynamicStyles.previewScreenDynamic]}>
              <Text style={styles.previewTitle}>TELA DO ELEITOR</Text>
              <Text style={[styles.previewDigits, dynamicStyles.previewDigitsDynamic]}>{digits || '-'}</Text>
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
              <Key key={d} label={d} onPress={() => pressDigit(d)} keyStyle={dynamicStyles.keyDynamic} />
            ))}
          </View>
          <View style={styles.keypadRow}>
            {['4','5','6'].map((d) => (
              <Key key={d} label={d} onPress={() => pressDigit(d)} keyStyle={dynamicStyles.keyDynamic} />
            ))}
          </View>
          <View style={styles.keypadRow}>
            {['7','8','9'].map((d) => (
              <Key key={d} label={d} onPress={() => pressDigit(d)} keyStyle={dynamicStyles.keyDynamic} />
            ))}
          </View>
          <View style={styles.keypadRow}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={[styles.actionKey, styles.whiteKey, { paddingVertical: isPhone ? 10 : 14 }]} onPress={branco} accessibilityLabel="Branco">
                <Text style={styles.actionText}>BRANCO</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <Key label={'0'} onPress={() => pressDigit('0')} keyStyle={dynamicStyles.keyDynamic} />
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity style={[styles.actionKey, styles.corrigeKey, { paddingVertical: isPhone ? 10 : 14 }]} onPress={corrige} accessibilityLabel="Corrige">
                <Text style={styles.actionText}>CORRIGE</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity style={[styles.largeAction, dynamicStyles.largeActionDynamic, styles.confirmKey]} onPress={confirma} accessibilityLabel="Confirma">
              <Text style={[styles.actionText, { fontWeight: '700', color: '#fff' }]}>CONFIRMA</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    </SafeAreaView>
  );
}

function Key({ label, onPress, keyStyle } : { label: string; onPress: () => void; keyStyle?: any }) {
  return (
    <TouchableOpacity style={[styles.key, keyStyle]} onPress={onPress} accessibilityLabel={`Tecla ${label}`}>
      <Text style={styles.keyText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  urnaContainer: { flex: 1, backgroundColor: '#111', borderRadius: 12 },
  screenArea: { padding: 12 },
  leftPanel: { },
  rightPanel: { },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  subtitle: { color: '#ddd', fontSize: 12, marginBottom: 8 },
  candidateBox: { backgroundColor: '#e6e6e6', borderRadius: 6 },
  label: { fontSize: 12, color: '#333', marginTop: 6 },
  numberDisplay: { backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
  numberText: { fontWeight: '700', color: '#000' },
  candidateName: { fontSize: 18, fontWeight: '700', color: '#000', marginTop: 4 },
  candidateParty: { fontSize: 16, color: '#333', marginTop: 2 },
  infoText: { marginTop: 12, color: '#111', fontWeight: '600' },

  previewScreen: { backgroundColor: '#000', borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  previewTitle: { color: '#fff', fontSize: 12, marginBottom: 6 },
  previewDigits: { color: '#00ff7f', fontWeight: '800' },
  previewCandidate: { color: '#fff', marginTop: 8, textAlign: 'center' },
  previewCandidateSmall: { color: '#bbb', marginTop: 8, textAlign: 'center' },

  keypadArea: { marginTop: 12, padding: 8 },
  keypadRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  key: { flex: 1, marginHorizontal: 6, backgroundColor: '#2a2a2a', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  keyText: { color: '#fff', fontSize: 20, fontWeight: '700' },

  actionKey: { marginHorizontal: 6, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  whiteKey: { backgroundColor: '#fff' },
  corrigeKey: { backgroundColor: '#ff5c5c' },
  confirmKey: { backgroundColor: '#00a86b' },
  actionText: { color: '#000', fontWeight: '700' },

  bottomRow: { marginTop: 8, alignItems: 'center' },
  largeAction: { borderRadius: 8, alignItems: 'center' },
});

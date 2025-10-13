import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type Props = {
  label?: string;
  value?: string;
  placeholder?: string;
  onChangeText?: (t: string) => void;
  keyboardType?: any;
  required?: boolean;
};

export const Input: React.FC<Props> = ({ label, value, placeholder, onChangeText, keyboardType }) => {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper:{marginBottom:12},
  label:{fontSize:13,color:'#334155',marginBottom:6},
  input:{backgroundColor:'#f8fafc',paddingHorizontal:12,paddingVertical:10,borderRadius:8,borderWidth:1,borderColor:'#e2e8f0'}
});

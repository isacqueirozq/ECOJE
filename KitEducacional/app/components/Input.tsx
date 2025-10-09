import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "numeric" | "email-address";
  secureTextEntry?: boolean;
  required?: boolean;
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  required,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={{ color: "red" }}>*</Text>}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, color: "#1e3a8a", marginBottom: 4 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
});

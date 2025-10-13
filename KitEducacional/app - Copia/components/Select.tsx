import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  required?: boolean;
}

export function Select({ label, value, onValueChange, options, required }: SelectProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={{ color: "red" }}>*</Text>}
      </Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={value} onValueChange={onValueChange}>
          <Picker.Item label="Selecione..." value="" />
          {options.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, color: "#1e3a8a", marginBottom: 4 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
});

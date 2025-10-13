import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

type Option = { value: string; label: string };

type Props = {
  label?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  options?: Option[];
};

export const Select: React.FC<Props> = ({ label, value, onValueChange, options = [] }) => {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      {/* Using Picker from react-native; consider @react-native-picker/picker if needed */}
      <View style={styles.pickerBox}>
        <Picker selectedValue={value} onValueChange={(v) => onValueChange && onValueChange(String(v))}>
          <Picker.Item label="Selecione..." value="" />
          {options.map((o) => (
            <Picker.Item key={o.value} label={o.label} value={o.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper:{marginBottom:12},
  label:{fontSize:13,color:'#334155',marginBottom:6},
  pickerBox:{backgroundColor:'#f8fafc',borderRadius:8,borderWidth:1,borderColor:'#e2e8f0'}
});

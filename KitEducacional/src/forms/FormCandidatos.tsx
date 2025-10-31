import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import * as ImagePicker from 'expo-image-picker';

export function FormCandidatos({ formData, onChange }: any) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChange('foto', result.assets[0].uri);
    }
  };

  return (
    <View>

      <TouchableOpacity onPress={pickImage}>
        {formData.foto ? (
          <Image 
            source={{ uri: formData.foto }} 
            style={{ width: 200, height: 200, marginVertical: 10 }} 
          />
        ) : (
          <View style={{ 
            width: 200, 
            height: 200, 
            backgroundColor: '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10 
          }}>
            <Text>Selecionar Foto</Text>
          </View>
        )}
      </TouchableOpacity>

      <Input 
        label="Nome do Candidato" 
        value={formData.nomeCandidato || ''} 
        onChangeText={(v) => onChange('nomeCandidato', v)} 
      />
      
      <Input 
        label="Nome do Vice" 
        value={formData.nomeVice || ''} 
        onChangeText={(v) => onChange('nomeVice', v)} 
      />
      
      <Input 
        label="Slogan" 
        value={formData.slogan || ''} 
        onChangeText={(v) => onChange('slogan', v)} 
      />

      

      <Input 
        label="Turma/Grupo" 
        value={formData.turma || ''} 
        onChangeText={(v) => onChange('turma', v)} 
      />

      <Input 
        label="Número" 
        value={formData.numero || ''} 
        keyboardType="numeric"
        onChangeText={(v) => {
          if (v.length <= 2 && /^\d*$/.test(v)) {
            onChange('numero', v)
          }
        }} 
      />

      <Select 
        label="Ativo" 
        value={formData.ativo?.toString() || 'true'} 
        onValueChange={(v) => onChange('ativo', v === 'true')} 
        options={[
          {value: 'true', label: 'Sim'},
          {value: 'false', label: 'Não'}
        ]} 
      />
    </View>
  );
}

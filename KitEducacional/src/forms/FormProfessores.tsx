import React from 'react';
import { View } from 'react-native';
import { Input } from '../components/Input';
import { Select } from '../components/Select';

export function FormProfessores({ formData, onChange }: any) {
  return (
    <View>
      <Input label="Nome Completo" value={formData.nome || ''} onChangeText={(v)=>onChange('nome', v)} />
      <Input label="CPF" value={formData.cpf || ''} onChangeText={(v)=>onChange('cpf', v)} />
      <Input label="E-mail" value={formData.email || ''} onChangeText={(v)=>onChange('email', v)} keyboardType="email-address" />
      <Input label="Telefone" value={formData.telefone || ''} onChangeText={(v)=>onChange('telefone', v)} />
      <Select label="Área de Atuação" value={formData.area || ''} onValueChange={(v)=>onChange('area', v)} options={[
        {value:'matematica',label:'Matemática'},
        {value:'portugues',label:'Português'},
        {value:'ciencias',label:'Ciências'},
        {value:'historia',label:'História'},
      ]} />
    </View>
  );
}

import React from 'react';
import { View } from 'react-native';
import { Input } from '../components/Input';
import { Select } from '../components/Select';

export function FormTurmas({ formData, onChange }: any){
  return (
    <View>
      <Input label="Nome da Turma" value={formData.nomeTurma || ''} onChangeText={(v)=>onChange('nomeTurma', v)} />
      <Select label="Ano/Série" value={formData.serie || ''} onValueChange={(v)=>onChange('serie', v)} options={[
        {value:'1ano',label:'1º Ano'},
        {value:'2ano',label:'2º Ano'},
        {value:'3ano',label:'3º Ano'},
      ]} />
      <Select label="Turno" value={formData.turno || ''} onValueChange={(v)=>onChange('turno', v)} options={[
        {value:'matutino',label:'Matutino'},
        {value:'vespertino',label:'Vespertino'},
        {value:'noturno',label:'Noturno'}
      ]} />
      <Input label="Capacidade" value={formData.capacidade || ''} keyboardType="numeric" onChangeText={(v)=>onChange('capacidade', v)} />
      <Select label="Professor Orientador" value={formData.orientador || ''} onValueChange={(v)=>onChange('orientador', v)} options={[
        {value:'prof1',label:'Prof. João Silva'},
        {value:'prof2',label:'Profa. Maria Santos'},
        {value:'prof3',label:'Prof. Carlos Souza'},
      ]} />
      <Input label="Sala" value={formData.sala || ''} onChangeText={(v)=>onChange('sala', v)} />
    </View>
  );
}

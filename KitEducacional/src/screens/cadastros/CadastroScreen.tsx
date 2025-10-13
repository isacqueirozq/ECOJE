import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Card } from '../../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { appendData } from '../../storage/storageService';
import { FormProfessores } from '../../forms/FormProfessores';
import { FormAlunos } from '../../forms/FormAlunos';
import { FormEletivas } from '../../forms/FormEletivas';
import { FormCandidatos } from '../../forms/FormCandidatos';
import { FormTurmas } from '../../forms/FormTurmas';

type TabKey = 'professores'|'alunos'|'eletivas'|'candidatos'|'turmas';

const tabs = [
  { key: 'professores', label: 'Professores', icon: 'person' },
  { key: 'alunos', label: 'Alunos', icon: 'people' },
  { key: 'eletivas', label: 'Eletivas', icon: 'book' },
  { key: 'candidatos', label: 'Candidatos', icon: 'checkmark-done' },
  { key: 'turmas', label: 'Turmas', icon: 'school' },
];

export default function CadastroScreen(){
  const [activeTab, setActiveTab] = useState<TabKey>('professores');
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (field: string, value: any) => {
    setFormData(prev=>({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // minimal validation: require at least a name field for most forms
    if (!Object.values(formData).some(Boolean)) {
      Alert.alert('Atenção','Preencha ao menos um campo antes de salvar.');
      return;
    }
    await appendData(activeTab, { ...formData, createdAt: new Date().toISOString() });
    Alert.alert('✅ Sucesso', `${activeTab} salvo com sucesso.`);
    setFormData({});
  };

  const renderForm = () => {
    const props = { formData, onChange: handleChange };
    switch (activeTab) {
      case 'professores': return <FormProfessores {...props} />;
      case 'alunos': return <FormAlunos {...props} />;
      case 'eletivas': return <FormEletivas {...props} />;
      case 'candidatos': return <FormCandidatos {...props} />;
      case 'turmas': return <FormTurmas {...props} />;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
        {tabs.map(t=>(
          <TouchableOpacity key={t.key} style={[styles.tab, activeTab===t.key && styles.activeTab]} onPress={()=>setActiveTab(t.key as TabKey)}>
            <Ionicons name={t.icon as any} size={18} color={activeTab===t.key ? '#1e3a8a' : '#fff'} />
            <Text style={[styles.tabText, activeTab===t.key && styles.activeTabText]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Card title={`Cadastro de ${activeTab}`} description="Preencha os campos abaixo" imageUrl="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" />

      <ScrollView contentContainerStyle={{paddingBottom:60}}>
        <View style={styles.form}>
          {renderForm()}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleSubmit}>
            <Text style={styles.btnText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={()=>setFormData({})}>
            <Text style={styles.btnText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#e0e7ff',padding:16},
  tabs:{marginBottom:16},
  tab:{flexDirection:'row',alignItems:'center',backgroundColor:'#4f46e5',paddingHorizontal:14,paddingVertical:8,borderRadius:20,marginRight:8},
  activeTab:{backgroundColor:'#fff',borderWidth:1,borderColor:'#4f46e5'},
  tabText:{marginLeft:6,color:'#fff',fontSize:14},
  activeTabText:{color:'#1e3a8a',fontWeight:'bold'},
  form:{backgroundColor:'#fff',borderRadius:16,padding:20,marginBottom:20},
  actions:{flexDirection:'row',justifyContent:'space-between',gap:10,marginTop:8},
  btn:{flex:1,paddingVertical:14,borderRadius:12,alignItems:'center',marginHorizontal:4},
  btnPrimary:{backgroundColor:'#4f46e5'},
  btnSecondary:{backgroundColor:'#94a3b8'},
  btnText:{color:'#fff',fontWeight:'600'},
});

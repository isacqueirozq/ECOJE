import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, ViewStyle } from "react-native";

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onPress?: () => void;
}

export function Card({ title, description, imageUrl, onPress }: CardProps) {
  const { width } = useWindowDimensions();

  // Definindo estilos adaptáveis
  let cardStyle: ViewStyle = styles.card;
  if (width >= 900) {
    // Desktop
    cardStyle = { ...cardStyle, width: 400, padding: 32 };
  } else if (width >= 600) {
    // Tablet
    cardStyle = { ...cardStyle, width: 400, padding: 24 };
  } else {
    // Mobile
    cardStyle = { ...cardStyle, width: 320, padding: 16 };
  }

  return (
    <TouchableOpacity style={cardStyle} onPress={onPress}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.desc}>{description}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },
  image: { width: 80, height: 80, marginBottom: 12 },
  title: { fontSize: 18, fontWeight: "bold", color: "#1e3a8a", marginBottom: 6 },
  desc: { fontSize: 14, color: "#475569", textAlign: "center" },
});

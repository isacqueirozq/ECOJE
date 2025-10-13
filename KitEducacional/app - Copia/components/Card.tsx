import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onPress?: () => void;
}

export function Card({ title, description, imageUrl, onPress }: CardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
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
    padding: 20,
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

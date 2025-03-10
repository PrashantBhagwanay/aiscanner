import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SavedCards = () => {
    const [cards, setCards] = useState<any>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const loadCards = async () => {
            const storedCards = await AsyncStorage.getItem("visitingCards");
            if (storedCards) {
                setCards(JSON.parse(storedCards));
            }
        };
        loadCards();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saved Visiting Cards</Text>
            <FlatList
                data={cards}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.cardContainer}
                        // onPress={() => navigation.navigate("VisitingCardForm", { ...item })}
                    >
                        {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />}
                        <Text style={styles.cardText}>{item.name || "No Name"}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    cardContainer: { padding: 15, marginBottom: 10, backgroundColor: "#f9f9f9", borderRadius: 8 },
    cardImage: { width: 80, height: 80, borderRadius: 8, marginBottom: 10 },
    cardText: { fontSize: 16, fontWeight: "bold" },
});

export default SavedCards;

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const SuccessScreen = ({ navigation }:any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>TAI</Text>

            <FontAwesome5 name={"check-circle"} size={60} color="white" style={styles.icon} />

            <Text style={styles.message}>Document Submitted Successfully</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>CLOSE</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.continueButton]}
                onPress={() => navigation.navigate("dashboard")}
            >
                <Text style={styles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SavedCards")}>
                <Text style={styles.buttonText}>View Saved Cards</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E319D",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        marginBottom: 20,
    },
    icon: {
        marginBottom: 20,
    },
    message: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
        marginBottom: 30,
    },
    button: {
        width: "80%",
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 15,
    },
    continueButton: {
        backgroundColor: "#1E319D",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});

export default SuccessScreen;

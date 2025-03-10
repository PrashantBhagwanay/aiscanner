import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>TAI</Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => Alert.alert("SIGN IN pressed")}>
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Alert.alert("SIGN UP pressed")}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Image */}
            <Image source={require("./image.png")} style={styles.bottomImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        alignItems: "center",
        justifyContent: "center",
        // paddingHorizontal: 20,
    },
    title: {
        fontSize: 45,
        fontWeight: "900",
        color: "#2B3991",
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop:80,
        width: "80%", // Ensures buttons are within a manageable width
        alignItems: "center",
        marginBottom:150
    },
    button: {
        backgroundColor: "#2B3991",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    bottomImage: {
        width: width,
        height: height * 0.35,
        resizeMode: "contain",
        position: "absolute",
        bottom: 0,
    },
});

export default LoginScreen;

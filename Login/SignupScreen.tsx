import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const SignupScreen = () => {
    const [checked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>TAI</Text>
            </View>

            <Text style={styles.title}>Create your account</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder="ex: jon smith" placeholderTextColor="#A0A0A0" />

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="ex: jon.smith@email.com" placeholderTextColor="#A0A0A0" />

            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="******" placeholderTextColor="#A0A0A0" secureTextEntry />

            <Text style={styles.label}>Confirm password</Text>
            <TextInput style={styles.input} placeholder="******" placeholderTextColor="#A0A0A0" secureTextEntry />

            {/* Custom Checkbox */}
            <TouchableOpacity style={styles.checkboxContainer} onPress={() => setChecked(!checked)}>
                <Text style={styles.checkbox}>{checked ? "✔" : ""}</Text>
                <Text style={styles.checkboxText}>
                    I agree to the <Text style={styles.terms}>Terms & Conditions.</Text>
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signupButton}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        padding: 20,
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 40,
    },
    logo: {
        fontSize: 45,
        fontWeight: "bold",
        color: "#2B3991",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2B3991",
        marginBottom: 20,
    },
    label: {
        alignSelf: "flex-start",
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 5,
    },
    input: {
        width: width * 0.85,
        height: 45,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#2B3991",
        borderRadius: 5,
        marginRight: 8,
        textAlign: "center",
        fontSize: 16,
        color: "#2B3991",
    },
    checkboxText: {
        fontSize: 12,
        color: "#333",
    },
    terms: {
        color: "#2B3991",
        fontWeight: "bold",
    },
    signupButton: {
        backgroundColor: "#2B3991",
        width: width * 0.85,
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SignupScreen;

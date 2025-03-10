import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            {/* Brand Name */}
            {/* <Text style={styles.brand}>Trangile</Text> */}
            <View style={styles.mainCont}>
                <Image source={require("./Tragilelogo/image.png")} style={styles.image1} />
                <Text style={styles.title}>TAI</Text>

            </View>
            {/* Main Title */}

            {/* Image */}

            {/* Bottom Half-Circle */}
            {/* <Image source={require("./")} style={styles.bottomCircle} /> */}
            <Image source={require("./image.png")} style={styles.image} />
            {/* <View style={styles.bottomCircle} /> */}
            {/* <View style={styles.bottomCircleUppar} /> */}
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2B3991", // Dark Blue Background
        alignItems: "center",
        justifyContent: "center",
    },

    mainCont: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position:"relative",
        top:-45
    },
    image1: {
        width: 70,
        resizeMode: "contain",
        // borderWidth:1,

    },
    title: {
        fontSize: 70,
        fontWeight: "bold",
        color: "#fff",
        position:"relative",
        top:-20
        // position: "absolute",
        // top: 140,
    },
   
    image: {
        width: width ,
        height: height * 0.7,
        resizeMode: "contain",
        position: "absolute",
        bottom: -height * 0.17,
    },

});

export default SplashScreen;

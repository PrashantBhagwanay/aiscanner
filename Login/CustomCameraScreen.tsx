import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, Image, Alert, StyleSheet, FlatList } from "react-native";
import { Camera, useCameraDevices, PhotoFile, CameraDevice } from "react-native-vision-camera";
import { useNavigation } from "@react-navigation/native";

const documentTypes = ["Visiting Card", "Aadhar", "Vehicle Document", "License", "Passport"];

const CustomCameraScreen: React.FC = () => {
    const devices = useCameraDevices();
    const cameraRef = useRef<Camera>(null);
    const navigation = useNavigation();
    const [photo, setPhoto] = useState<string | null>(null);
    const [selectedDoc, setSelectedDoc] = useState<string>(documentTypes[0]);

    const device: CameraDevice | undefined = devices.find((d) => d.position === "back");

    useEffect(() => {
        (async () => {
            const permission:any = await Camera.requestCameraPermission();
            if (permission !== "authorized") {
                Alert.alert("Permission Required", "Camera access is needed to take photos.");
            }
        })();
    }, []);

    const takePhoto = async () => {
        if (cameraRef.current) {
            try {
                const photo: PhotoFile = await cameraRef.current.takePhoto();
                setPhoto(`file://${photo.path}`);
            } catch (error) {
                console.error("Error taking photo:", error);
            }
        }
    };

    if (!device) return <Text>No Camera Available</Text>;

    return (
        <View style={{ flex: 1 }}>
            {!photo ? (
                <Camera
                    ref={cameraRef}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    photo={true}
                />
            ) : (
                <Image source={{ uri: photo }} style={styles.preview} />
            )}

            {/* Horizontal Scrollable Document Selector */}
            <FlatList
                data={documentTypes}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.scrollContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.docButton, selectedDoc === item && styles.selectedDoc]}
                        onPress={() => setSelectedDoc(item)}
                    >
                        <Text style={[styles.docText, selectedDoc === item && styles.selectedText]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={styles.controls}>
                {photo ? (
                    <>
                        <TouchableOpacity onPress={() => setPhoto(null)} style={styles.button}>
                            <Text style={styles.buttonText}>Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                            <Text style={styles.buttonText}>Save & Exit</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity onPress={takePhoto} style={styles.captureButton}>
                        <Text style={styles.buttonText}>Capture</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        resizeMode: "cover",
    },
    scrollContainer: {
        position: "absolute",
        top: 40,
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    docButton: {
        backgroundColor: "#444",
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    selectedDoc: {
        backgroundColor: "#f00",
    },
    docText: {
        color: "#fff",
        fontSize: 16,
    },
    selectedText: {
        fontWeight: "bold",
    },
    controls: {
        position: "absolute",
        bottom: 30,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "green",
        padding: 12,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    captureButton: {
        backgroundColor: "red",
        padding: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
});

export default CustomCameraScreen;

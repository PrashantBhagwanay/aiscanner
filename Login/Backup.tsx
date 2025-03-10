import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    Text,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    PermissionsAndroid,
    Platform,
    FlatList,
    BackHandler
} from 'react-native';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import RNFS from 'react-native-fs';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';


const TakePhoto = () => {


    const getRandomCoordinates = () => {
        return {
            latitude: (28.5000 + Math.random() * 0.2).toFixed(6),  // Random latitude near 28.5
            longitude: (77.3000 + Math.random() * 0.2).toFixed(6), // Random longitude near 77.3
        };
    };
    const [selectedCard, setSelectedCard] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [clinicData, setClinicData] = useState<any>(null);
    const [locationData, setLocationData] = useState<any>(null);




    useEffect(() => {
        const backAction = () => {
            if (clinicData) {
                setClinicData(null); // Reset to go back to camera & dropdown screen
                setSelectedCard("");
                return true; // Prevent default back action
            }
            return false; // Allow default behavior
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [clinicData]);

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'This app requires camera access to take photos.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK'
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.error('Permission Error:', err);
                return false;
            }
        }
        return true;
    };

    const takePhoto = async () => {
        if (!selectedCard) {
            Alert.alert('Error', 'Please select a card before taking a photo.');
            return;
        }
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Camera permission is required.');
            return;
        }

        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // console.log('User Location:', latitude, longitude);
                // setLocationData()
                // setClinicData({ latitude, longitude }); 
                setLocationData({ latitude, longitude });
            },
            (error) => {
                // console.error('Location Error:', error);
                // Alert.alert('Location Error', error.message);
            },
            { enableHighAccuracy: false, timeout: 25000, maximumAge: 25000 }
        );

        const options: CameraOptions = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 800,
            maxHeight: 800,
            saveToPhotos: true // ✅ Ensure image is saved properly
        };

        launchCamera(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera picker');
            } else if (response.errorCode) {
                console.error('Camera Error:', response.errorMessage);
                Alert.alert('Camera Error', response.errorMessage || 'Something went wrong.');
            } else if (response.assets && response.assets.length > 0) {
                // Alert.alert("comes in if")
                let imageUri: any = response.assets[0].uri;

                // ✅ Fix file path issue for Android 10+
                if (Platform.OS === 'android' && !imageUri.startsWith('file://')) {
                    imageUri = 'file://' + imageUri;
                }

                if (imageUri) {
                    console.log('Captured Image URI:', imageUri);

                    // Convert image to base64
                    try {
                        const base64Image = await RNFS.readFile(imageUri, 'base64');
                        await sendImageToAPI(base64Image);
                    } catch (error: any) {
                        console.error('Image Processing Error:', error);
                        Alert.alert(error);
                    }
                } else {
                    Alert.alert('Error', 'Could not retrieve image URI.');
                }
            }
        });
    };

    const sendImageToAPI = async (imageUrl: string) => {

        // const payload = { urls: [imageUrl] };
        const payload = { base64_images: [imageUrl] };
        console.log("payload", payload)
        setLoading(true);
        try {
            const response = await axios.post(
                // 'http://103.233.244.174:8088/api/v1/clinic-predictions',
                'https://doc-api.noosyn.ai/api/v1/clinic-predictions',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer pG4XBvliGN3tfzpI7AiwZ9PhVJsWXN4G8sa6MdwD',
                        // 'Authorization': 'Bearer 123456789',
                    },
                }
            );
            console.log("url")
            console.log('API Response:', response.data);
            setClinicData(response.data);
            setLoading(false);
        } catch (error: any) {
            console.error('API Error:', error);
            Alert.alert(error)
            setLoading(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setSelectedCard(""); // Reset selected card
        setClinicData(null); // Reset clinic data
        setTimeout(() => setRefreshing(false), 1000);
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {/* Hide Dropdown and Camera Button when clinicData is available */}
            {!clinicData && (
                <>
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.label}>Select a Card</Text>
                        <View style={[styles.pickerWrapper, loading && styles.disabled]}>
                            <Picker
                                selectedValue={selectedCard}
                                onValueChange={(value) => setSelectedCard(value)}
                                style={styles.picker}
                                enabled={!loading} // Disable picker when loading
                            >
                                <Picker.Item label="Select a card..." value="" />
                                <Picker.Item label="Visiting Card" value="visitingCard" />
                            </Picker>
                        </View>
                    </View>

                    <TouchableOpacity onPress={takePhoto} style={styles.button} disabled={loading}>
                        <Image source={require('./camera2.png')} style={styles.cameraImage} />
                        <Text style={styles.buttonText}>Take Photo</Text>
                    </TouchableOpacity>
                </>
            )}

            {clinicData && (
                <View style={styles.dataContainer}>
                    <Text style={styles.dataValue}>Latitude: {locationData?.latitude || "28.62060787"}</Text>
                    <Text style={styles.dataValue}>Longitude: {locationData?.longitude || "77.3561458"}</Text>
                    {/* <Text style={styles.dataTitle}>{clinicData.name}</Text> */}
                    <Text style={styles.dataLabel}>Name:</Text>
                    <Text style={styles.dataTitle}>{clinicData?.name || "No Name Available"}</Text>
                    <Text style={styles.dataLabel}>Email:</Text>
                    <Text style={styles.dataValue}>{clinicData.email}</Text>
                    <Text style={styles.dataLabel}>Address:</Text>
                    <Text style={styles.dataLabel}>{clinicData.address || "No Address Available"}</Text>

                    <Text style={styles.dataLabel}>Doctor Name:</Text>
                    {/* <Text style={styles.dataTitle}>{clinicData.doctors?.[0]?.name || "No Doctor Available"}</Text> */}
                    <View>
                        {clinicData?.doctors && clinicData.doctors.length > 0 ? (
                            clinicData.doctors.map((doctor: any, index: any) => (
                                <View key={index} style={styles.doctorContainer}>
                                    <Text style={styles.dataTitle}>{doctor.name}</Text>
                                    <Text style={styles.dataDesignation}>{doctor.designation}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.dataTitle}>No Doctor Available</Text>
                        )}
                    </View>



                    <Text style={styles.dataLabel}>Contact Numbers:</Text>
                    <FlatList
                        data={clinicData.contact_nos}
                        renderItem={({ item }) => <Text style={styles.dataValue}>{item}</Text>}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Text style={styles.dataLabel}>Website:</Text>
                    <Text style={styles.dataValue}>{clinicData.website}</Text>
                    {clinicData.visiting_hours?.length > 0 && (
                        <>
                            <Text style={styles.dataLabel}>Visiting Hours:</Text>
                            <FlatList
                                data={clinicData.visiting_hours}
                                renderItem={({ item }) => <Text style={styles.dataValue}>{item}</Text>}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </>
                    )}
                </View>
            )}

            {loading && <ActivityIndicator size="large" color="#007bff" style={styles.loader} />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#f8f9fa' },
    dropdownContainer: { width: '90%', marginBottom: 20 },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#333' },
    pickerWrapper: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, backgroundColor: '#fff', overflow: 'hidden' },
    picker: { width: '100%' },
    disabled: { opacity: 0.5 },
    button: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, flexDirection: "column", alignItems: 'center', justifyContent: 'center', marginTop: 20 },
    cameraImage: { width: 50, height: 50, marginRight: 10 },
    buttonText: { fontSize: 16, color: 'black', fontWeight: '900', marginRight: 12 },
    loader: { marginTop: 20 },
    dataContainer: { padding: 16, backgroundColor: '#fff', width: "100%", display: "flex" },
    dataTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    dataLabel: { fontSize: 16, fontWeight: '600', marginTop: 8 },
    dataValue: { fontSize: 16, color: '#333' },



    doctorContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#f8f8f8",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    dataTitle1: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    dataDesignation: {
        fontSize: 14,
        color: "#666",
    },
});

export default TakePhoto;
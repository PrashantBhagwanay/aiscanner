import React, { useState } from "react";
import { View, Text, Button, Alert, Platform } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import Permissions from "react-native-permissions";

const LocationComponent: React.FC = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    const getGeoLocation = async () => {
        try {
            const permissionType =
                Platform.OS === "android"
                    ? Permissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                    : Permissions.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

            const response = await Permissions.request(permissionType);

            console.log(response, "Response from permission");

            if (response === Permissions.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log(".......................",position)
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (error) => {
                        console.error("Location Error:", error.message);
                        Alert.alert("Error", "Unable to fetch location. Please try again.");
                    },
                    { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
                );
            } else if (response === Permissions.RESULTS.BLOCKED) {
                Alert.alert(
                    "Permission Denied",
                    "Location access is blocked. Please enable it in settings.",
                    [
                        {
                            text: "Open Settings",
                            onPress: () => Permissions.openSettings(),
                        },
                        { text: "Cancel", style: "cancel" },
                    ]
                );
            }
        } catch (error) {
            console.error("Permission Error:", error);
            Alert.alert("Error", "Something went wrong while requesting location.");
        }
    };

    return (
        <View>
            <Button title="Get Location" onPress={getGeoLocation} />
            {location && (
                <Text>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                </Text>
            )}
        </View>
    );
};

export default LocationComponent;

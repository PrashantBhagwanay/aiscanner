

// import React, { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     TextInput,
//     Image,
//     ScrollView,
//     StyleSheet,
//     FlatList,
// } from "react-native";
// import { useRoute } from "@react-navigation/native";

// const VisitingCardForm = () => {
//     const route = useRoute();
//     const { imageUrl, clinicData } = route.params || {};

//     const [formData, setFormData] = useState({});

//     useEffect(() => {
//         if (clinicData) {
//             setFormData(clinicData);
//         }
//     }, [clinicData]);

//     // Function to render fields dynamically
//     const renderField = (key, value) => {
//         if (value === null || value.length === 0) {
//             return <Text style={styles.noDataText}>No {key.replace(/_/g, " ")} Available</Text>;
//         }

//         if (Array.isArray(value)) {
//             return value.map((item, index) => {
//                 if (typeof item === "object") {
//                     return (
//                         <View key={index} style={styles.doctorContainer}>
//                             <Text style={styles.dataTitle}>{item.name || "No Name"}</Text>
//                             <Text style={styles.dataDesignation}>
//                                 {item.designation || "No Designation"}
//                             </Text>
//                         </View>
//                     );
//                 } else {
//                     return <TextInput key={index} style={styles.input} value={item} />;
//                 }
//             });
//         }

//         return (
//             <TextInput
//                 style={styles.input}
//                 value={value.toString()}
//                 editable={false}
//             />
//         );
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//             {imageUrl ? (
//                 <Image source={{ uri: imageUrl }} style={styles.image} />
//             ) : (
//                 <Text style={styles.noImageText}>No Image Available</Text>
//             )}

//             <View style={styles.formContainer}>
//                 {Object.keys(formData).map((key) => (
//                     <View key={key}>
//                         <Text style={styles.sectionTitle}>{key.replace(/_/g, " ")}</Text>
//                         {renderField(key, formData[key])}
//                     </View>
//                 ))}
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     scrollContainer: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
//     image: { width: "100%", height:400, resizeMode: "contain", marginBottom: 20 },
//     noImageText: { textAlign: "center", fontSize: 16, color: "gray", marginBottom: 20 },
//     formContainer: { gap: 1, minHeight: "100%" },
//     sectionTitle: { fontSize: 16, fontWeight: "bold", marginTop: 20, textTransform: "capitalize" },
//     doctorContainer: { padding: 10, backgroundColor: "#f2f2f2", borderRadius: 5, marginBottom: 10 },
//     dataTitle: { fontSize: 14, fontWeight: "bold" },
//     dataDesignation: { fontSize: 12, color: "gray" },
//     noDataText: { fontSize: 14, color: "red", marginTop: 5 },
//     input: {
//         fontSize: 14,
//         padding: 10,
//         backgroundColor: "#f9f9f9",
//         borderRadius: 5,
//         marginVertical: 3,
//         borderWidth: 1,
//         borderColor: "#ccc",
//     },
// });

// export default VisitingCardForm;



















import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const VisitingCardForm = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const { imageUrl, clinicData, location } = route.params || {};

    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (clinicData) {
            setFormData({
                ...clinicData,
                latitude: location?.latitude || "",
                longitude: location?.longitude || "",
            });
        }
    }, [clinicData, location]);

    // Function to handle input changes
    const handleInputChange = (key, text) => {
        setFormData((prev) => ({
            ...prev,
            [key]: text,
        }));
    };

    // Function to render fields dynamically
    const renderField = (key, value, editable = true) => (
        <TextInput
            style={styles.input}
            value={value ? value.toString() : ""}
            editable={editable}
            onChangeText={editable ? (text) => handleInputChange(key, text) : undefined}
        />
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.imageContainer}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                ) : (
                    <Text style={styles.noImageText}>No Image Available</Text>
                )}
                <TouchableOpacity onPress={() => navigation.navigate("success")}>
                    <FontAwesome5 name="cloud-upload-alt" size={34} color="#003366" />
                </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
                {Object.keys(formData).map((key) => (
                    <View key={key}>
                        <Text style={styles.sectionTitle}>{key.replace(/_/g, " ")}</Text>
                        {renderField(key, formData[key], key !== "latitude" && key !== "longitude")}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
    imageContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    image: { width: "80%", height: 400, resizeMode: "contain" },
    noImageText: { textAlign: "center", fontSize: 16, color: "gray", marginBottom: 20 },
    formContainer: { gap: 1, minHeight: "100%" },
    sectionTitle: { fontSize: 16, fontWeight: "bold", marginTop: 20, textTransform: "capitalize" },
    input: {
        fontSize: 14,
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        marginVertical: 3,
        borderWidth: 1,
        borderColor: "#ccc",
    },
});

export default VisitingCardForm;

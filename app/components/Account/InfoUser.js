import React from 'react';
import { Linking, StyleSheet, View, Text } from 'react-native';
import { Avatar } from "react-native-elements";
import AvatarDefault from "../../../assets/img/avatar-default.jpg"
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
    const { 
        userInfo: { uid, photoURL, displayName, email },
        toastRef,
        setLoading,
        setLoadingText
    } = props;

    const openAppSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL("app-settings:");
        } else {
            RNAndroidOpenSettings.appDetailsSettings();
        }
    }

    //setLoading(true);
    //setLoadingText("Actualizando avatar");

    const changeAvatar = async () => {
        const { permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionMediaLibrary = permissions.mediaLibrary.status;
        
        if (resultPermissionMediaLibrary === "denied") {
            toastRef.current.show("Luxe Advisor requiere del acceso a la cámara para cambiar la imágen de tu Perfil. Por favor ajusta tu configuración para permitir servicios de cámara.");
            openAppSettings();
        }
        
        const resultImagePicker = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (resultImagePicker.cancelled) return toastRef.current.show("Se ha cerrado la selección de imágenes.");

        uploadImage(resultImagePicker.uri)
            .then(() => {
                updatePhotoUrl();
            })
            .catch(() => {
                setLoading(false);
                toastRef.current.show("Error al actualiar avatar.")
            })
    }

    const uploadImage = async uri => {
        setLoadingText("Actualizando avatar");
        setLoading(true);

        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`avatar/${uid}`);

        return ref.put(blob);
    }

    const updatePhotoUrl = () => {
        firebase
            .storage()
            .ref(`avatar/${uid}`)
            .getDownloadURL()
            .then(async res => {
                const update = {
                    photoURL: res
                };
                await firebase.auth().currentUser.updateProfile(update);
                setLoading(false);
            })
            .catch(() => {
                toastRef.current.show("Error al actualiar avatar.")
            })
    }

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                containerStyle={styles.userInfoAvatar}
                onEditPress={changeAvatar}
                source={
                    photoURL ? 
                    { uri: photoURL } : 
                    AvatarDefault
                }
            />
            <View>
                <Text style={styles.displayName}>
                    {
                        displayName ? displayName : "Anónimo"
                    }
                </Text>
                <Text>{email ? email : "Social Login"}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5
    }
});

import React, { useState } from 'react';
import { View, Text } from "react-native";
import { SocialIcon } from 'react-native-elements';
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { useNavigation } from "@react-navigation/native";
import { FacebookApi } from "../../utils/social";
import Loading from "../Loading";

export default function LoginFacebook(props) {
    const { toastRef } = props;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const login = async () => {
        try {
            setLoading(true);

            await Facebook.initializeAsync({
                appId: FacebookApi.application_id
            });
            const {
                type,
                token
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: FacebookApi.permissions
            });

            if (type === 'success') {
                const credentials = firebase.auth.FacebookAuthProvider.credential(token);

                console.log(credentials)
                firebase
                    .auth()
                    .signInWithCredential(credentials)
                    .then(() => {
                        setLoading(false);
                        navigation.navigate("account");
                    })
                    .catch(error => {
                        setLoading(false);
                        console.log(error)
                        toastRef.current.show("Credenciales incorrectas.");
                    })
            }
                if (type === 'cancel') {
                    setLoading(false);
                    toastRef.current.show("Login Facebook Cancel.")
            }
            
        } catch (error) {
            setLoading(false);
            toastRef.current.show("Error de inicio de sesión en Facebook.");
        }
    }

    return (
        <View>
            <SocialIcon 
                title="Iniciar sesión con Facebook"
                button
                type="facebook"
                onPress={login}
            />
            <Loading isVisible={loading} text="Iniciando sesión" />
        </View>
    )
}


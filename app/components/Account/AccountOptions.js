import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { map } from 'lodash';

export default function AccountOptions(props) {
    const { userInfo, toastRef } = props;
    const selectComponent = (key) => {
        
    }
    const menuOptions = generateOptions(selectComponent);


    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem 
                        key={index} 
                        title={menu.title}
                        leftIcon={{
                            type: menu.iconType,
                            name: menu.iconNameLeft,
                            color: menu.iconColorLeft
                        }}
                        rightIcon={{
                            type: menu.iconType,
                            name: menu.iconNameRight,
                            color: menu.iconColorRight
                        }}
                        containerStyle={styles.menuItem}
                        onPress={menu.onPress}
                        bottomDivider
                        >
                    </ListItem>
                  ))
            }
        </View>
    )
}

function generateOptions(selectComponent){
    return[
        {
            title: "Cambiar Nombre y Appelidos.",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("displayName")
        },
        {
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("displayEmail")
        },
        {
            title: "Cambiar Contraseña",
            iconType: "material-community",
            iconNameLeft: "fingerprint",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("displayPassword")
        }
    ]
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
    }
});
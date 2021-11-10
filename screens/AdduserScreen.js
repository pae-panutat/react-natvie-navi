import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Alert } from 'react-native'
import { ThemeProvider, Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

function AdduserScreen({ navigation }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')

    const saveName = (name) => {
       setName(name)
       /* console.warn(val) */
    }

    const saveEmail = (email) => {
        setEmail(email)
        /* console.warn(val) */
     }

     const saveMobile = (mobile) => {
        setMobile(mobile)
        /* console.warn(val) */
     }
     
     const handleSubmit = () => {
        return Alert.alert(
            "Are your sure ?",
            "Are you sure ?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        axios.post('http://localhost:5000/post/', {
                            name: name,
                            email: email,
                            mobile: mobile
                        }).then((res) => {
                            setName('')
                            setEmail('')
                            setMobile('')
                            alert(res.data)
                            /* navigation.navigate('UserScreen') */   
                        }) 
                    },
                },
                
                // The "No" button
                {
                    text: "No",
                },
            ]
          );
            /*try {
                    const res = await axios.post('http://localhost:5000/post/', {
                        name: name,
                        email: email,
                        mobile: mobile
                    })
                    
                    console.warn(res.data)
                } catch(error) {
                    alert(error);
            } */
    }


    return (
        <ThemeProvider theme={theme}>
            <ScrollView style={styles.container}>
                <Image  source={{ uri : 'https://www.hopetutors.com/wp-content/uploads/2018/07/514-5142665_react-native-transparent-react-native-logo-png-png.png'}} 
                        style={{ width:320, height: 100 }}
                        containerStyle={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 }}
                />
                <Input 
                    value={name}
                    onChangeText={saveName}
                    leftIcon={
                        <Icon 
                            name='user-o'
                            size={20}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  Name'}
                />
                <Input 
                    value={email}
                    onChangeText={saveEmail}
                    leftIcon={
                        <Icon 
                            name='envelope-o'
                            size={20}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  E-mail'}
                />
                <Input 
                    value={mobile}
                    onChangeText={saveMobile}
                    leftIcon={
                        <Icon 
                            name='mobile'
                            size={30}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  Mobile'}
                />
                <Button 
                    onPress={() => handleSubmit()}
                    icon={
                        <Icon 
                            name='check'
                            size={14}
                            color='white'
                        />
                    }
                    title='  Add User'
                    buttonStyle={{
                        backgroundColor: '#8acd5b'
                    }}
                />
                <Button 
                    icon={
                        <Icon 
                            name='users'
                            size={14}
                            color='white'
                        />
                    }
                    title='  Go to User Screen'
                    onPress={() => navigation.navigate('UserScreen')}
                    buttonStyle={{
                        backgroundColor: '#AAD4E0'
                    }}
                    containerStyle={{
                        marginTop: 10
                    }}
                />
                 <Button 
                    icon={
                        <Icon 
                            name='users'
                            size={14}
                            color='white'
                        />
                    }
                    title='  Go to User Detail'
                    onPress={() => navigation.navigate('UserDetailScreen')}
                    buttonStyle={{
                        backgroundColor: '#EEB189'
                    }}
                    containerStyle={{
                        marginTop: 10
                    }}
                />
                
            </ScrollView>
        </ThemeProvider>
    )
}


const theme = {
    Button: {
        raised: true
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor: '#F8F8F8'
    },
    preloader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default AdduserScreen

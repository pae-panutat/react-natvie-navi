import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Alert } from 'react-native'
import { ThemeProvider, Badge, ListItem, Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
/* import PropTypes from 'prop-types' */



function UserDetailScreen({ route, navigation }) {

    const { userKey } = route.params
    
    const [id, setId] = useState([])
    const [name, setName] = useState([])
    const [email, setEmail] = useState([])
    const [mobile, setMobile] = useState([])

    const saveId = (id) => {
        setId(id)
        /* console.warn(val) */
     }

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


    useEffect(() => {
        const id = userKey
        axios.get(`http://localhost:5000/fetchById/${id}`)
        .then((response) => {
            response.data.map((val) => { 
                setId(val.id)
                /* console.warn(val.id)  */       
                setName(val.name)
                setEmail(val.email)
                setMobile(val.mobile)
            })
        })
    }, [])


    const editSubmit = (id) => {
        return Alert.alert(
            "Are your sure ?",
            "Are you sure ?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        axios.put(`http://localhost:5000/update/${id}`, {
                            name: name,
                            email: email,
                            mobile: mobile
                        }).then((res) => {
                            alert(res.data)
                            /* navigation.navigate('UserScreen')  */  
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


    const deleteSubmit = (id) => {
        return Alert.alert(
            "Are your sure ?",
            "Are you sure ?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        axios.delete(`http://localhost:5000/delete/${id}`)
                        .then((response) => {
                            alert(response.data)
                            navigation.navigate('UserScreen')
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
            <ScrollView style={styles.container} >
               {/*  <Text>userKey: {JSON.stringify(userKey)}</Text>*/}
                    <View
                    value={id}
                    />
                    
                    <Input 
                    value={name.toString()}
                    onChangeText={saveName}
                    leftIcon={
                        <Icon 
                            name='user-o'
                            size={20}
                            color='#0085E6'
                        />
                    }
                        placeholder = ' Name'
                    />
                    <Input 
                    value={email.toString()}
                    onChangeText={saveEmail}
                    leftIcon={
                        <Icon 
                            name='envelope-o'
                            size={20}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  E-mail'}
                        placeholder = ' E-mail'
                    />
                    <Input 
                    value={mobile.toString()}
                    onChangeText={saveMobile}
                    leftIcon={
                        <Icon 
                            name='mobile'
                            size={30}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  Mobile'}
                        placeholder = ' Mobile'
                    />
                
                    <Button 
                        onPress={() => editSubmit(id)}
                        icon={
                            <Icon 
                                name='wrench'
                                size={15}
                                color='#fff'
                            />
                        }
                        title='  Update'
                        buttonStyle={{
                            backgroundColor: '#EEB189'
                        }}
                    />
                     <Button 
                        onPress={() => deleteSubmit(id)}
                        icon={
                            <Icon 
                                name='trash'
                                size={15}
                                color='#fff'
                            />
                        }
                        title='  Delete'
                        buttonStyle={{
                            backgroundColor: '#ec3c3c'
                        }}
                        containerStyle={{
                            marginTop: 10
                        }}
                    />
                
            </ScrollView>
            
        </ThemeProvider>
    )
}


/* UserDetailScreen.propTypes = {
    userKey: PropTypes.number,
    id: PropTypes.number
  }; */

const theme = {
    Button: {
        raised: true
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor: '#fff'
    }
})

export default UserDetailScreen

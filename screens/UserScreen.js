import React, { useState, useEffect } from 'react'
import { RefreshControl, StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native'
import { ThemeProvider, Badge, ListItem, Button, Input, Image } from 'react-native-elements'
import axios from 'axios'

const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }

function UserScreen({ navigation }) {

    const [data, setData] = useState([])

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        axios.get('http://localhost:5000/fetch')
        .then((response) => {
            setData(response.data)
            /* console.log(response.data) */
        })
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, [])
    
      
     useEffect(() => {
            axios.get('http://localhost:5000/fetch')
            .then((response) => {
                setData(response.data)
                /* console.log(response.data) */
            })
     }, [])


    return (
        <ScrollView
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
        {data.map((res,key) => 
            <ListItem 
                key={key} 
                bottomDivider 
                onPress={() => navigation.navigate('UserDetailScreen' , {
                        userKey: res.id
                    }
                )}
            >
                <Badge value={key+1} />
                        <ListItem.Content>
                        <ListItem.Title>{res.name}</ListItem.Title>
                        <ListItem.Subtitle>{res.email}</ListItem.Subtitle>
                        <ListItem.Subtitle>ID: {res.id}</ListItem.Subtitle>
                    </ListItem.Content >
                <ListItem.Chevron />
            </ListItem>
        )}
      </ScrollView>
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
      paddingTop: 60
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })


export default UserScreen

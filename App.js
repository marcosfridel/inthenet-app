import { FlatList, Text, View, StyleSheet } from 'react-native'

import { useEffect, useState } from 'react';

const App = () => {
   
    const [ data, setData ] = useState('')
    const [ isLoading, setLoading ] = useState('')

    useEffect(async () => {

        var ws = new WebSocket('ws://192.168.175.129:8082');

        ws.onopen = () => {
          // connection opened
          ws.send('something'); // send a message
        };
        
        ws.onmessage = (e) => {
          // a message was received
          console.log(e.data);
        };
        
        ws.onerror = (e) => {
          // an error occurred
          console.log(e.message); 
        };
        


        const opt = {

            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: JSON.stringify(data) // body data type must match "Content-Type" header
        }  
        console.log('fetch') 
        //fetch('https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json')
        //await fetch('https://192.168.175.129:8443/test/get/1', opt)
        await fetch('http://192.168.175.129:8080/test/get/1', opt)
        .then((response) => response.json())
        //.then((json) => setData(json))
        .then((json) => console.log(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, [])
  
    return (
        <View style={styles.container}>
{/* 
        {isLoading ? <Text>Loading...</Text> : 
        ( 
            <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
            <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>{data.title}</Text>
            <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Articles:</Text>
            <FlatList
              data={data.articles}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Text>{item.id + '. ' + item.title}</Text>
              )}
            />
          </View>
        )} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },
});

export default App;

import React,{Component} from 'react';
import {Text,ScrollView,Button,View,Dimensions} from 'react-native'
import Image from 'react-native-scalable-image'



export default class Container extends Component{

  render(){

  return(
    <ScrollView style={{flexDirection : 'column' }}>

        {this.props.navigation.state.params.data.map((chapter,key)=>{
          return(
            <View style={{ flexDirection: 'column' , justifyContent: 'space-around' , padding : 5 , margin: 10 ,elevation: 2 , borderWidth :2 , borderColor: '#ffffff',borderRadius:10}} key={key}>
            <Image source={{uri: chapter.image}} width={(Dimensions.get('window').width - 35)}/>
            <View style={{flexDirection : 'column' , justifyContent: 'space-around'}}>
              <Text>Title : {chapter.title}</Text>
              <Text>Author: {chapter.author}</Text>
              <Text>Status : {chapter.status}</Text>
              <Text>Latest Chapter : {chapter.latest_chapter}</Text>
              <Button
                title = 'Read Latest Chapter'
                onPress={()=>{ this.props.navigation.navigate('MainScreen',{
                  link : chapter.manga_link
                })}}
                />
            </View>
            </View>
          )
        })}
    </ScrollView>
    )
  }
}

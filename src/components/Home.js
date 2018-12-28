import React,{Component} from 'react'
import {ScrollView,TextInput,Text ,Button , View , ActivityIndicator , Image ,Dimensions} from 'react-native'
import Container from './Container'
const cheerio = require('react-native-cheerio')

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      text: '',
      data : [],
      loading : false,
      error: false
    }
  }
  static navigationOptions = {
    headerTitle : <Image source={{uri : 'https://www.heavenmanga.ca/content/upload/logo.png'}} style={{marginRight: 30,width:50 }} />
  }

  async fetchResult(){

    url = 'http://heavenmanga.ca/?s=' + encodeURIComponent(this.state.text)
    const response = await fetch(url).catch((error)=> this.setState({error: true}));
    html = await response.text();
    const $ = cheerio.load(html);
    var data = []
    $('.comics-grid .entry ').each((i,item)=>{
      data[i] = {
        image: item.children[1].children[1].attribs.src,
        title : item.children[0].next.next.next.children[1].children[0].attribs.title,
        author : item.children[3].children[5].children[3].children[0].data,
        status : item.children[3].children[9].children[2].data.trim(),
        latest_chapter : item.children[3].children[13].attribs.title,
        manga_link : item.children[3].children[13].attribs.href
      }

    this.setState({
      data: data,
      loading : false
    })
    console.log("result fetched")
    this.props.navigation.navigate('Container',{
      data : data
      })
    })
  }



    loading(){
      if(this.state.loading){
        console.log('ActivityIndicator')
        return(
          <ActivityIndicator size='large' color='#0000ff'/>
        )
      }
    }
    networkError(){
      if(this.state.error == true){
        this.setState({loading:false})
        return(
          <View style={{backgroundColor: '#ff0000'}}>
            <Text style = {{color: '#ffffff'}}> There was a network error please try again </Text>
          </View>
        )
      }
    }

  render(){

    return(
      <View style={{ flexDirection : 'column' , padding : 5 , justifyContent : 'space-around'}}>
      <Image source={require('../images/logo.png')} style={{height: 65 , width: (Dimensions.get('window').width -10) , marginTop: 20 }} />
      <View style={{ textAlign: 'center' , marginTop: 60}}>
      <TextInput
        placeholder = 'Please Enter The Name of Manga Here : '
        style = {{ width: (Dimensions.get('window').width -10), backgroundColor: '#ffffff' ,elevation: 2 ,marginBottom: 5}}
        onChangeText = {(text)=> this.setState({text})}
        value = {this.state.text}
      />
      <Button
        title = 'search'
        onPress={()=>{

          this.setState({ loading:true})
          this.fetchResult()
        }}
      />
      {this.loading()}
    
      </View>
      </View>

    )

  }
}

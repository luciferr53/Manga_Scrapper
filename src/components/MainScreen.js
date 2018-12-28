import React, {Component} from 'react';
import {ScrollView,Picker,Header,View,Dimensions} from 'react-native';
const cheerio = require('react-native-cheerio');
import Image from 'react-native-scalable-image';
export default class MainScreen extends Component{


  constructor(props){
    super(props);
    this.state = {
      images : [],
      chapters : [],
      page : this.props.navigation.state.params.link,
      
    }
  }
  static navigationOptions = {
    header: null,
  }
  componentWillMount(){
    this.scrape(this.state.page);
  }
  componentWillUpdate(){
    this.scrape(this.state.page);
  }

  async scrape(url){
    if(url==''){
    url = this.props.navigation.state.params.link;
    }
    const array1 = [];
    const array2 = [];
    const response = await fetch(url).catch((error)=>{
      console.log(error);
      this.setState({
        error : true
      })
    });
    html = await response.text();
    const $ = cheerio.load(html);
    $("img").each((i,item)=>{
      array1[i] = item.attribs.src;
    })
    $('option').each((i,item)=>{
      array2[i] = {
        label: item.children[0].data,
        data: item.attribs.value
      }
    });
    this.setState({
      images : array1,
      chapters : array2
    })
    }


   renderImages(){
      return this.state.images.map(link =>
         <Image width={Dimensions.get('window').width} source={{uri : link}} key={link} />
      )

  }
  renderChapters(){
    console.log(this.state.chapters)
    return this.state.chapters.map(chapter=>(
        <Picker.Item label={chapter.label} value={chapter.data} key={chapter.label}/>
    ))
  }

  renderAll(){
    console.log(this.state.page)
    return(
    <Picker
        selectedValue = {this.state.page}
        style={{ height: 50, width: 200, marginLeft: 100 }}
        onValueChange={(value)=>{
          this.setState({
            page: value
          })
        }}
    >
    {this.renderChapters()}
    </Picker>

      )
  }


  render() {
    return (

      <ScrollView>
        {this.renderAll()}
        {this.renderImages()}
        </ScrollView>

    );
  }
}

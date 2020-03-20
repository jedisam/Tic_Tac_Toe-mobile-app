import React from "react"
import { View, Text, StyleSheet,Alert,Button } from "react-native"
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      gameState:[
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1
    }
    
  }

  componentDidMount(){
    this.initializeGame()
  }

  initializeGame = () =>{
    this.setState({
      gameState:
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer:1
    })
  }
  renderIcon = (row,col) =>{
    var value = this.state.gameState[row][col]
    switch(value){
      case 1 : return <Icon name="close" style={styles.tileX} />
      case -1: return <Icon name="circle-outline" style={styles.tiley} />
      default : return null
    }
  }

  getWinner(){
    var ar = this.state.gameState
   // var winner

      // Winner is Player 1
    
    if  ((ar[0][0]===1&&ar[1][1]===1&&ar[2][2]===1)||(ar[0][0]===1&&ar[0][1]===1&&ar[0][2]===1)||(ar[0][2]===1&&ar[1][1]===1&&ar[2][0]===1)||(ar[2][0]===1&&ar[2][1]===1&&ar[2][2]===1)||(ar[1][0]===1&&ar[1][1]===1&&ar[1][2]===1)||(ar[0][0]===1&&ar[1][0]===1&&ar[2][0]===1)||(ar[0][1]===1&&ar[1][1]===1&&ar[2][1]===1)||(ar[0][2]===1&&ar[1][2]===1&&ar[2][2]===1)){
       return 1
       // Winner is player 2
    } else if((ar[0][0]===-1&&ar[1][1]===-1&&ar[2][2]===-1)||(ar[0][0]===-1&&ar[0][1]===-1&&ar[0][2]===-1)||(ar[0][2]===-1&&ar[1][1]===-1&&ar[2][0]===-1)||(ar[2][0]===-1&&ar[2][1]===-1&&ar[2][2]===-1)||(ar[1][0]===-1&&ar[1][1]===-1&&ar[1][2]===-1)||(ar[0][0]===-1&&ar[1][0]===-1&&ar[2][0]===-1)||(ar[0][1]===-1&&ar[1][1]===-1&&ar[2][1]===-1)||(ar[0][2]===-1&&ar[1][2]===-1&&ar[2][2]===-1)){return -1}
     
    // No Winners

       return 0
  }

  onTilePress = (row,col) =>{

    // dont allow already set tile to change

    var value = this.state.gameState[row][col]
    if(value!==0) return

    var current = this.state.currentPlayer
    var player1 =1
    var player2 =-1
    if(current===player1){
      var arr= this.state.gameState.slice()
    arr[row][col] = current

    this.setState({
      gameState:arr,
      currentPlayer:player2
    })
    }else if(current===player2){
      var arr= this.state.gameState.slice()
    arr[row][col] = current

    this.setState({
      gameState:arr,
      currentPlayer:player1
    })
    }

      // Check for a winner
      var winner = this.getWinner()
      
      if(winner===1){
        Alert.alert("Player 1 has Won!")
        this.initializeGame()
      }else if(winner===-1){
        Alert.alert("Player 2 has Won!")
        this.initializeGame()
      }else if(winner===0){
        var arr = this.state.gameState

        if(arr[0][0]!==0&&arr[0][1]!==0&&arr[0][2]!==0&&arr[1][0]!==0&&arr[1][1]!==0&&arr[0][2]!==0&&arr[2][0]!==0&&arr[2][1]!==0&&arr[2][2]!==0){
          Alert.alert("The game is Tied!")
          this.initializeGame()
        }
      }
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.statusBar}></View>
        <View style={{marginBottom:70}}>
          <Text style={{fontSize:40,color:"rgb(133, 2, 133)"}}>Tic Tac Toe</Text>
        </View>
        <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={()=>this.onTilePress(0,0)} style={[styles.tile,{borderLeftWidth:0,borderTopWidth:0}]}>
            {this.renderIcon(0,0)}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.onTilePress(0,1)} style={[styles.tile,{borderTopWidth:0}]}>
            {this.renderIcon(0,1)}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.onTilePress(0,2)} style={[styles.tile,{borderRightWidth:0,borderTopWidth:0}]}>{this.renderIcon(0,2)}</TouchableOpacity>
        </View>

        <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={()=>this.onTilePress(1,0)} style={[styles.tile,{borderLeftWidth:0}]}>{this.renderIcon(1,0)}</TouchableOpacity>
            <TouchableOpacity onPress={()=>this.onTilePress(1,1)} style={styles.tile}>{this.renderIcon(1,1)}</TouchableOpacity>
            <TouchableOpacity onPress={()=>this.onTilePress(1,2)} style={[styles.tile,{borderRightWidth:0}]}>{this.renderIcon(1,2)}</TouchableOpacity>
        </View>

        <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={()=>this.onTilePress(2,0)} style={[styles.tile,{borderLeftWidth:0,borderBottomWidth:0}]}>{this.renderIcon(2,0)}</TouchableOpacity>
            <TouchableOpacity onPress={()=>this.onTilePress(2,1)} style={[styles.tile,{borderBottomWidth:0}]}>{this.renderIcon(2,1)}</TouchableOpacity>
            <TouchableOpacity onPress={()=>this.onTilePress(2,2)} style={[styles.tile,{borderRightWidth:0,borderBottomWidth:0}]}>{this.renderIcon(2,2)}</TouchableOpacity>
          </View>
          <View  style={{padding:20}} />
          <Button
            title="New Game"
            onPress={this.initializeGame}
            style={styles.button}
          />
      </View>  
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff"
  },
  statusBar:{
    height:24,
    backgroundColor: "#f4f4f4"
  },
  inside:{
    color:"green"
  },
  tile:{
    borderWidth:8,
    borderColor:"#ccc",
    width:100,
    height:100
  },
  tileX:{
    color:"red",
    fontSize:60,
    marginLeft:15,
    marginTop:15
  },
  tiley:{
    color:"green",
    fontSize:60,
    marginLeft:15,
    marginTop:15
   },
   button:{
      backgroundColor:"#ccc",
      color:"#ccc"
   }
})
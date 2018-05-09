import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        count: 0,
        Right: 0,
        Left: 0,
        isChar: false,
        Char: 0,
        isComma: false,
        newNumber: false,
        cleared: false,
        loading: true,
        index: 0,
        memory_1: 0,
        memory_2: 0,
        memory_3: 0,

    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Raleway': require('./assets/Lato.ttf')
    });
    this.setState({ loading: false });
  }

  memory_empty(){
      if(this.state.index === 0){
          return true;
      }else{
          return false;
      }
  }

  memory_full(){
      if(this.state.index >= 3){
          return true;
      }else{
          return false;
      }
  }

  memory_add (){
      var i = this.state.index + 1;
      if(i == 1)
          this.setState({
              index: i,
              memory_1: this.state.count,
              count: 0,
          })
      if(i == 2)
          this.setState({
              index: i,
              memory_2: this.state.count,
              count: 0,
          })
      if(i == 3)
          this.setState({
              index: i,
              memory_3: this.state.count,
              count: 0,
          })
      return true;
  }

  memory_return(){
      var i = this.state.index;
      if(i == 1)
          this.setState({
              index: i-1,
              count: this.state.memory_1,
          })
      if(i == 2)
          this.setState({
              index: i-1,
              count: this.state.memory_2,
          })
      if(i == 3)
          this.setState({
              index: i-1,
              count: this.state.memory_3,
          })
  }

  onPress_MPlus = () => {
      if(this.memory_full())
          this.setState({
              count: 'Pamięć pełna',
          })
      else{
          this.memory_add();
      }
  }
  onPress_MR = () => {
      if(this.memory_empty()){
          this.setState({
              count: 'Pamięć pusta',
          })
      }else{
          this.memory_return();
      }
  }


  onPress_number(number){
      if(this.state.count != '0' && !this.state.newNumber){
          this.setState({
              count: this.state.count + number
          })
      }
      else{
          this.setState({
              count: number,
              newNumber: false
          })
      }
  }

  onPress_dot = () => {
      if(!this.state.isComma){
          if(this.state.newNumber){
              this.setState({
                  count: '0.',
                  isComma: true,
                  newNumber: false
              })
          }else{
              this.setState({
                  count: this.state.count + '.',
                  isComma: true
              })
          }
      }
  }

  onPress_C = () => {
      if(!this.state.cleared){
          this.setState({
              count: 0,
              isComma: false,
              cleared: true
          })
      }else{
          this.setState({
              count: 0,
              Right: 0,
              Left: 0,
              isChar: false,
              Char: 0,
              isComma: false,
              newNumber: false,
              cleared: false
          })
      }
  }

  onPress_Char(znak){
    if(this.state.isChar){
        switch (this.state.Char) {
            case '*':
            this.setState({
                count: (this.state.count * this.state.Left).toFixed(4),
                Left: this.state.count * this.state.Left,
                isChar: true,
                newNumber: true,
                Char: znak,
                isComma: false
            })
                break;
            case '÷':
                this.setState({
                    count: (this.state.Left / this.state.count).toFixed(4),
                    Left: (this.state.Left / this.state.count).toFixed(4),
                    isChar: true,
                    newNumber: true,
                    Char: znak,
                    isComma: false
                })
                break;
            case '+':
                this.setState({
                    count: parseFloat(this.state.Left) + parseFloat(this.state.count),
                    Left: parseFloat(this.state.Left) + parseFloat(this.state.count),
                    isChar: true,
                    newNumber: true,
                    Char: znak,
                    isComma: false
                })
                break;
            case '-':
                this.setState({
                    count: this.state.Left - this.state.count,
                    Left: this.state.Left - this.state.count,
                    isChar: true,
                    newNumber: true,
                    Char: znak,
                    isComma: false
                })
                break;


        }
    }else{
        switch (znak) {
            case '*':
                this.setState({
                    Left: this.state.count,
                    isChar: true,
                    newNumber: true,
                    Char: '*',
                    isComma: false
                })
                break;
            case '÷':
                this.setState({
                    Left: this.state.count,
                    isChar: true,
                    newNumber: true,
                    Char: '÷',
                    isComma: false
                })
                    break;
            case '+':
                this.setState({
                    Left: this.state.count,
                    isChar: true,
                    newNumber: true,
                    Char: '+',
                    isComma: false
                })
                break;
            case '-':
                this.setState({
                    Left: this.state.count,
                    isChar: true,
                    newNumber: true,
                    Char: '-',
                    isComma: false
                })
                break;
        }
    }
  }
  onPress_equal = () => {
    switch (this.state.Char) {
        case '*':
            this.setState({
                count: (this.state.count * this.state.Left).toFixed(4),
                Left: this.state.count,
                isChar: false,
                isComma: false,
                newNumber: true,
            })
            break;
        case '÷':
            this.setState({
                count: (this.state.Left / this.state.count).toFixed(4),
                Left: this.state.count,
                isChar: false,
                isComma: false,
                newNumber: true,
            })
            break;
        case '+':
            this.setState({
                count: parseFloat(this.state.Left) + parseFloat(this.state.count),
                Left: this.state.count,
                isChar: false,
                isComma: false,
                newNumber: true,
            })
            break;
        case '-':
            this.setState({
                count: this.state.Left - this.state.count,
                Left: this.state.count,
                isChar: false,
                isComma: false,
                newNumber: true,
            })
            break;

    }
  }

 render() {

     const { loading } = this.state;

     if (loading) return <AppLoading />;

   return (
     <View style={styles.container}>
     <View style={styles.wejscie}>
         <View style={styles.countContainer}>
             <Text style={styles.countText}>
                {this.state.count}
              </Text>
        </View>
     </View>
        <View style={styles.row}>
           <TouchableOpacity
             style={styles.button}
             onPress={this.onPress_C}
           >
             <Text style={styles.Tekst}> C </Text>
           </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={this.onPress_MR}
            ><Text style={styles.Tekst}> MR </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={this.onPress_MPlus}
            ><Text style={styles.Tekst}> M+ </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button_znak}
            onPress={() => this.onPress_Char('*')}
            ><Text style={styles.Tekst}> * </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.row}>
           <TouchableOpacity
             style={styles.button_number}
             onPress={() => this.onPress_number('7')}
           >
             <Text style={styles.Tekst}> 7 </Text>
           </TouchableOpacity>
            <TouchableOpacity
            style={styles.button_number}
            onPress={() => this.onPress_number('8')}
            ><Text style={styles.Tekst}> 8 </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button_number}
            onPress={() => this.onPress_number('9')}
            ><Text style={styles.Tekst}> 9 </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button_znak}
            onPress={() => this.onPress_Char('÷')}
            ><Text style={styles.Tekst}> ÷ </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.row}>
           <TouchableOpacity
             style={styles.button_number}
             onPress={() => this.onPress_number('4')}
           >
             <Text style={styles.Tekst}> 4 </Text>
           </TouchableOpacity>
            <TouchableOpacity
            style={styles.button_number}
            onPress={() => this.onPress_number('5')}
            ><Text style={styles.Tekst}> 5 </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button_number}
            onPress={() => this.onPress_number('6')}
            ><Text style={styles.Tekst}> 6 </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button_znak}
            onPress={() => this.onPress_Char('+')}
            ><Text style={styles.Tekst}> + </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.row}>
           <TouchableOpacity
             style={styles.button_number}
             onPress={() => this.onPress_number('1')}
           >
             <Text style={styles.Tekst}> 1 </Text>
           </TouchableOpacity>
            <TouchableOpacity
            style={styles.button_number}
            onPress={() => this.onPress_number('2')}
            ><Text style={styles.Tekst}> 2 </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button_number}
            onPress={() => this.onPress_number('3')}
            ><Text style={styles.Tekst}> 3 </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button_znak}
            onPress={() => this.onPress_Char('-')}
            ><Text style={styles.Tekst}> - </Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
           <TouchableOpacity
             style={styles.button_0}
             onPress={() => this.onPress_number('0')}
           >
             <Text style={styles.Tekst}> 0 </Text>
           </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={this.onPress_dot}
            ><Text style={styles.Tekst}> . </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button_znak}
            onPress={this.onPress_equal}
            ><Text style={styles.Tekst}> = </Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wejscie: {
    flex: 0,
    justifyContent: 'flex-end',
    height: '37.5%',
    width: '100%',
    backgroundColor: '#ffffff',

  },
  container: {
    flex: 1,

    //justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#CCCCCC',
    padding: 10,
    width: '25%',
    height: '100%',
    borderLeftWidth: 1,
    borderTopColor: '#BBBBBB',
    borderTopWidth: 1,
    borderLeftColor: '#BBBBBB',
    justifyContent: 'center',
  },

  button_number: {
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    padding: 10,
    width: '25%',
    height: '100%',
    borderLeftWidth: 1,
    borderTopColor: '#BBBBBB',
    borderTopWidth: 1,
    borderLeftColor: '#BBBBBB',
    justifyContent: 'center',
  },

  button_znak: {
    alignItems: 'center',
    backgroundColor: 'rgb(255, 151, 57)',
    padding: 10,
    width: '25%',
    height: '100%',
    borderLeftWidth: 1,
    borderTopColor: '#BBBBBB',
    borderTopWidth: 1,
    borderLeftColor: '#BBBBBB',
    justifyContent: 'center',
  },

  button_0: {
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    padding: 10,
    width: '50%',
    height: '100%',
    borderLeftWidth: 1,
    borderTopColor: '#BBBBBB',
    borderTopWidth: 1,
    borderLeftColor: '#BBBBBB',
    justifyContent: 'center',
  },
  row: {
      flexDirection: 'row',
      height
      : '12.5%',
  },
  countContainer: {
    alignItems: 'flex-end',
    padding: 10,
  },
  countText: {
    color: '#FF00FF',
    fontSize: 45,
    fontFamily: 'Raleway',
},
 Tekst: {
    fontFamily: 'Raleway',
    fontSize: 30,
  }
})

// AppRegistry.registerComponent('App', () => App)

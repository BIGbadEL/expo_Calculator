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
        memory_index: 0,
        memory: [],
        step: 0,
        new_step: false,
        is_euqal: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Raleway': require('./assets/Lato.ttf')
    });
    this.setState({ loading: false });
  }

  memory_empty(){
      if(this.state.memory_index === 0) return false;
      else return true;
  }

  memory_full(){
      if(this.state.memory_index >= 3) return false;
      else return true;
  }

  memory_add(){
      this.state.memory.push(this.state.count);
      this.setState({
          memory_index: this.state.memory_index + 1,
          count: 0,
      })
  }

  memory_return(){
      this.setState({
          count: this.state.memory.pop(),
          memory_index: this.state.memory_index - 1,
      })
  }

  onPress_MPlus = () => {
      if(this.memory_full()){
          this.memory_add();
      }else{
          this.setState({
              count: 'Pamięć pełna',
          })
      }
  }

  onPress_MR = () => {
      if(this.memory_empty()){
         this.memory_return();
     }else{
         this.setState({
             count: 'Pamięć pusta',
         })
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
              step: 0,
              isChar: false,
              Char: 0,
              isComma: false,
              newNumber: false,
              cleared: false,
              new_step: false,
              is_euqal: false
          })
      }
  }

  onPress_Char(znak){
    if(this.state.isChar){
        switch (this.state.Char) {
            case '*':
            this.setState({
                count: (this.state.count * this.state.Left),
                Left: (this.state.count * this.state.Left),
            })
                break;
            case '÷':
                this.setState({
                    count: (this.state.Left / this.state.count),
                    Left: (this.state.Left / this.state.count),
                })
                break;
            case '+':
                this.setState({
                    count: parseFloat(this.state.Left) + parseFloat(this.state.count),
                    Left: parseFloat(this.state.Left) + parseFloat(this.state.count),
                })
                break;
            case '-':
                this.setState({
                    count: this.state.Left - this.state.count,
                    Left: this.state.Left - this.state.count,
                })
                break;
        }
        this.setState({
            isChar: true,
            newNumber: true,
            Char: znak,
            isComma: false,
            is_euqal: false
        })

        if(this.state.new_step){
            this.setState({
                step: this.state.step + ' ' + znak + ' ' + this.state.count,
            })
        }else{
            this.setState({
                step: this.state.step + ' ' + this.state.count,
                new_step: true,
            })
        }

    }else{
        this.setState({
            Left: this.state.count,
            step: this.state.count + ' ' + znak,
            isChar: true,
            newNumber: true,
            Char: znak,
            isComma: false,
            is_euqal: false
        })
    }
  }

  onPress_equal = () => {
      if(!this.state.is_euqal){
    switch (this.state.Char) {
        case '*':
            this.setState({
                count: (this.state.count * this.state.Left),
            })
            break;
        case '÷':
            this.setState({
                count: (this.state.Left / this.state.count),

            })
            break;
        case '+':
            this.setState({
                count: parseFloat(this.state.Left) + parseFloat(this.state.count),
            })
            break;
        case '-':
            this.setState({
                count: this.state.Left - this.state.count,
            })
            break;

    }
    this.setState({
        Left: this.state.count,
        isChar: false,
        isComma: false,
        newNumber: true,
        is_euqal: true,
    })
    if(this.state.new_step){
        this.setState({
            step: this.state.step + ' ' + this.state.Char + ' ' + this.state.count + ' = ',
            new_step: false,
        })
    }else{
        this.setState({
            step: this.state.step + ' ' + this.state.count + ' = ',
        })
    }
}
  }

 render() {

     const { loading } = this.state;

     if (loading) return <AppLoading />;

   return (
     <View style={styles.container}>
     <View style={styles.wejscie}>
         <View style={styles.countContainer}>
             <Text style={styles.historyText }>
                { this.state.step !== 0 ? this.state.step: null}
              </Text>
        </View>
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
      height: '12.5%',
  },
  countContainer: {
    alignItems: 'flex-end',
    padding: 10,
    maxHeight: '25%',
  },
  countText: {
    color: '#FF00FF',
    fontSize: 45,
    fontFamily: 'Raleway',
},
 Tekst: {
    fontFamily: 'Raleway',
    fontSize: 30,
},
  historyText: {
      color: '#BBBBBB',
      fontSize: 45,
      fontFamily: 'Raleway',
  },
})

// AppRegistry.registerComponent('App', () => App)

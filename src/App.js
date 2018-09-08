//App Created by Snervan; Date : September 4th, 2018
//Last Update : September 7th, 2018
import React, { Component } from 'react'
import Keyboard from './Keyboard'
import GuessWord from './GuessWord'
import MonPendu from './Pendu'
import './App.css';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
//Pre-defined dictionnary of words to guess in an array (French words)
const dictionary = ["Un singe", "Ane", "Mot", "Pseudo", "Un enfant", "Snervan", "Dire", "Un bateau", "Une voiture", "Decision", "Palmure", "Armature", "Velleitaire"]
/* Pas touche ! Variable constante ci-dessous permettant de savoir le nombre 
   de fausses réponses max avant d'avoir le pendu complet et activer la condition de défaite (nbre = 11) */
const ANSWER_MAX = 11 

class App extends Component {
  state = {
    keyboard: this.createKeyboard(),
    indexMatched: [],
    dico: this.createWord(),
    guesses: 0,
    wrongAnswer: 0, //Incrémenté de 1 à chaque mauvaise lettre ou lettre réutilisée
    lost: false,
    keyPressed: "",
    won: false,
    score: 0,
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.state.indexMatched.length) {
      let space = [" "]
      this.setState({indexMatched: [...this.state.indexMatched, ...space]})
    }

    if(!this.state.won && !this.state.lost) this.countLettersFound()
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this))
  }

  createWord() {
    let random = Math.floor(Math.random() * dictionary.length)
    var word = dictionary[random]
    var letters = []

    for (var i = 0; i < word.length; i++) {
      letters.push(word[i]);
    }

    return letters
  }

  handleLetter = letter => {
    if(!this.state.won && !this.state.lost) {
      this.setState({prevKey: this.state.keyPressed, keyPressed: letter.toUpperCase()})
      this.isMatchingDico(letter)
    }
  }

  handleKeyDown = event => {
    let key = event.key.toUpperCase()

    if(!this.state.won && !this.state.lost && (key >= 'A' && key <= 'Z') ) {
      this.setState({prevKey: this.state.keyPressed, keyPressed: key.toUpperCase()})
      this.isMatchingDico(key)
    }
  }

  isMatchingDico(letter) {
    const {dico, indexMatched, guesses, wrongAnswer, score} = this.state
    const [minLetter, majLetter] = [letter.toLowerCase(), letter.toUpperCase()]
    const newLetter = [minLetter, majLetter]

    if(indexMatched.includes(minLetter) || indexMatched.includes(majLetter)) {
        this.setState({score: score - 2, wrongAnswer : wrongAnswer + 1})
    }
    else if(!dico.includes(majLetter) && !dico.includes(minLetter)) {
      this.setState({score: score - 1, wrongAnswer : wrongAnswer + 1})
      this.setState({indexMatched: [...indexMatched, ...newLetter] })
    } 
    else {
      this.setState({score: score + 2})
      this.setState({indexMatched: [...indexMatched, ...newLetter] })
    } 

    this.setState({guesses: guesses + 1})
  }

  countLettersFound() {
    const {dico, indexMatched, won, lost, wrongAnswer} = this.state
    let lettersFound = 0
    
    for (var i = 0; i < dico.length; i++) {
      for (var y = 0; y < indexMatched.length; y++) {
        if(dico[i] === indexMatched[y]) lettersFound++
      }       
    }

    if(wrongAnswer >= ANSWER_MAX && !won) {
        this.setState({lost: true})
    } else if(lettersFound === dico.length && !lost) {
        this.setState({won: true})
    }
  }

  computeDisplay(letter) {
    const {lost, indexMatched} = this.state
    if(lost) return "visible"

    if(indexMatched.length) {
      return indexMatched.includes(letter) ? "visible" : "hidden";
    }
  }

  createKeyboard() {
    const result = []
    let i = 0

    while (result.length < ALPHABET.length) {
      const letter = ALPHABET[i]
      result.push(letter)
      i++
    }
    return result
  }

  getKeyboardFeedback(key) {
    if(key === this.state.keyPressed)
      return "pressed" 
    else if(this.state.indexMatched.includes(key)) 
      return "used"
    else
      return ""    
  }


  tryAgain() {
    this.setState({
      dico: this.createWord(),
      keyPressed: "",
      guesses: 0,
      indexMatched: [],
      wrongAnswer: 0,
      lost: false,
      won: false,
      score: 0,
    })
  }
  
  render() {
    const {keyboard, dico, wrongAnswer, guesses, score, won, lost} = this.state

    return (
      <div className="container">
       <u><h1>Jeu du Pendu</h1></u>
        {lost && <p style={{fontSize: "14.5px"}}>La réponse était :</p>}
        <div id="dico">
          {dico.map((letter, index) => (
          <GuessWord key={index} index={index} feedback={this.computeDisplay(letter)} letter={letter} />
          ))}
        </div>

        { 
          (!won && !lost)
          && 
          <div className="keyboard">
            {keyboard.map((letter, index) => (
              <Keyboard letter={letter} key={index} index={index} feedback={this.getKeyboardFeedback(letter)} onMouseDown={this.handleLetter} />
            ))}
          </div>
        }

        <hr />

        {(!lost) && <p>Score : {score}</p>}

        {
          won
          &&
          <div>
              <p>Vous avez gagné au bout de {guesses} essais. Réessayez ?</p>
              <button style={{marginTop: "16px", marginBottom: "10px" }} onClick={() => this.tryAgain()} autoFocus>Recommencer</button>
          </div>
        }

        {
          lost
          &&
          <div className="whenWon">
            <p>Vous avez perdu ! Réessayer ?</p>
            <button style={{ textAlign: "center", marginTop: "11px", marginBottom: "8px"  }} onClick={() => this.tryAgain()} autoFocus>Recommencer</button>
          </div>
        }

        {(!won && !lost) && <p>Essais: {guesses}</p>}

        <div className="dessin">
          <MonPendu wrongAnswer={wrongAnswer} />
        </div>
    </div> 
    );
  }
}

export default App;

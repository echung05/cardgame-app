import React, { Component } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import CardDeck from "react-bootstrap/CardDeck"

// full standard card deck
const Deck = [
  '2H', '2C', '2S', '2D',
  '3H', '3C', '3S', '3D',
  '4H', '4C', '4S', '4D',
  '5H', '5C', '5S', '5D',
  '6H', '6C', '6S', '6D',
  '7H', '7C', '7S', '7D',
  '8H', '8C', '8S', '8D',
  '9H', '9C', '9S', '9D',
  '10H', '10C', '10S', '10D',
  'JH', 'JC', 'JS', 'JD',
  'QH', 'QC', 'QS', 'QD',
  'KH', 'KC', 'KS', 'KD',
  'AH', 'AC', 'AS', 'AD',
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpuCards: [], // cpu card deck
      cpuCardPlayed: [], // card(s) being played
      pCards: [], // player card deck
      pCardPlayed: [], // card(s) being played
      winnableCards: [], // holds winnable cards when cards match
      inGame: false // whether game is being played currently
    };

  }
  /**
   * Handles start of game when "start" button clicked.
   * Shuffles deck and distributes it to CPU and player.
   */
  handleStart = () => {
    console.log("starting game");
    // shuffle deck
    let shuffledDeck = this.shuffleCards();
    // distribute cards
    for (let i = 0; i < shuffledDeck.length; i++) {
      if (i % 2 === 0) {
        this.state.cpuCards.push(shuffledDeck[i]);
      }
      else {
        this.state.pCards.push(shuffledDeck[i]);
      }
    }
    this.setState({ inGame: true, });
  }

  /**
   * Helper for shuffling card deck. 
   */
  shuffleCards = () => {
    console.log("shuffling!");
    let index = Deck.length, temp, randIndex;
    // while not at the first card in deck
    while (0 !== index) {
      randIndex = Math.floor(Math.random() * index);
      index -= 1;
      // switch spots of card at end of deck and card in random spot in deck
      temp = Deck[index];
      Deck[index] = Deck[randIndex];
      Deck[randIndex] = temp;
    }
    return Deck;
  }

  /**
   * Handles drawing of cards when "draw" button clicked.
   * Draws and compares cards from CPU and player decks.
   */
  handleDraw = () => {
    console.log("drawing!");
    this.drawCards();
    this.compareCards();
  }

  /**
   * Helper for drawing CPU and player cards.
   * Draws from the top of each deck.
   * Updates each deck with remaining cards.
   */
  drawCards = () => {
    // deal CPU card
    this.state.cpuCardPlayed.push(this.state.cpuCards[0]);
    const newCpuDeck = this.state.cpuCards.slice(1);
    this.setState(prevState => {
      return { cpuCards: newCpuDeck };
    })
    console.log("cpu card played ", this.state.cpuCardPlayed);
    // deal player card
    this.state.pCardPlayed.push(this.state.pCards[0]);
    const newPDeck = this.state.pCards.slice(1);
    this.setState(prevState => {
      return { pCards: newPDeck };
    })
    console.log("player card played ", this.state.pCardPlayed);
  }

  /**
   * Helper for comparing cards. 
   * When values are tied, will put current cards in winnable stack.
   * IN PROGRESS:
   * Draws two more cards, one face up and one face down (not shown).
   * These cards are compared again and the winner takes all. 
   */
  compareCards = () => {
    let cpuCardVal = this.state.cpuCardPlayed[0].charAt(0);
    let pCardVal = this.state.pCardPlayed[0].charAt(0);
    let currCpuCard = this.state.cpuCardPlayed[0];
    let currPCard = this.state.pCardPlayed[0];
    console.log("cpu card value ", cpuCardVal, "| player card value ", pCardVal);
    //in the event of a tie...
    if (cpuCardVal === pCardVal) {
      //each player puts current card on winnable deck
      this.state.winnableCards.push(currCpuCard);
      this.state.winnableCards.push(currPCard);
      // each player draws next card placed face up
      this.drawCards();
      // each player draws next card placed face down
      this.drawCards();
    }
  }

  render() {
    //keeps track of deck sizes
    var cpuCount = this.state.cpuCards.length;
    var pCount = this.state.pCards.length;

    // keeps track of whether player is in an active game or not
    const inGame = this.state.inGame;
    let button;
    // if player is in game, display "Draw Card" button and draw a card when clicked
    if (inGame) {
      button = <Button variant="outline-light" onClick={() => this.handleDraw()}
        style={{ margin: "0 auto", width: "10vw", height: "5vh", marginTop: "2vh", marginBottom: "5vh", float: "none" }}>
        Draw Card
    </Button>;
      // if player is not in game, display "Start" button and start game when clicked
    } else {
      button = <Button variant="outline-light" onClick={() => this.handleStart()}
        style={{ margin: "0 auto", width: "10vw", height: "5vh", marginTop: "2vh", marginBottom: "5vh", float: "none" }}>
        Start
    </Button>;
    }
    // shows current face-up card in CPU and player deck
    let cpuCard;
    if (inGame) {
      cpuCard = this.state.cpuCardPlayed[0];
    } else {
      cpuCard = "CARD";
    }
    let pCard;
    if (inGame) {
      pCard = this.state.pCardPlayed[0];
    } else {
      pCard = "CARD";
    }

    //TODO: separate out components into different files once basic functionality complete
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <img
              src="https://image.flaticon.com/icons/png/512/35/35203.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="icon"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#home">War</Navbar.Brand>
        </Navbar>

        <Card bg="info" text="dark" style={{ margin: "0 auto", width: "60vw", height: "50vh", marginTop: "5vh", float: "none" }}>

          <Card.Body>
            <CardDeck style={{ marginTop: "7vh" }}>
              <Card style={{ height: "25vh" }}>
                <Card.Header>
                  CPU
                </Card.Header>
                <Card.Body>
                  {cpuCard}
                </Card.Body>
                <Card.Footer>
                  Total Cards: {cpuCount}
                </Card.Footer>
              </Card>
              <Card style={{ height: "25vh" }}>
                <Card.Header>
                  You
                </Card.Header>
                <Card.Body>
                  {pCard}
                </Card.Body>
                <Card.Footer>
                  Total Cards: {pCount}
                </Card.Footer>
              </Card>
            </CardDeck>
          </Card.Body>

          {button}

        </Card>

      </div >
    );
  }
}

export default App;

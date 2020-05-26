import React, { Component } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import CardDeck from "react-bootstrap/CardDeck"

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
  'HH', 'JC', 'JS', 'jD',
  'QH', 'QC', 'QS', 'QD',
  'KH', 'KC', 'KS', 'kD',
  'AH', 'AC', 'AS', 'AD',
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpuCards: [],
      cpuCardPlayed: [],
      pCards: [],
      pCardPlayed: [],
      inGame: false
    };

  }

  handleStart = () => {
    console.log("starting game");
    let shuffledDeck = this.shuffleCards();
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

  shuffleCards = () => {
    console.log("shuffling!");
    let index = Deck.length, temp, randIndex;
    while (0 !== index) {
      randIndex = Math.floor(Math.random() * index);
      index -= 1;

      temp = Deck[index];
      Deck[index] = Deck[randIndex];
      Deck[randIndex] = temp;
    }
    return Deck;
  }

  handleDraw = () => {
    console.log("drawing!");
    // deal CPU card
    this.state.cpuCardPlayed.push(this.state.cpuCards[0]);
    const newCpuDeck = this.state.cpuCards.slice(1);
    console.log(newCpuDeck.length);
    this.setState(prevState => {
      return { cpuCards: newCpuDeck };
    })
    console.log(this.state.cpuCardPlayed);
    // deal player card
    this.state.pCardPlayed.push(this.state.pCards[0]);
    const newPDeck = this.state.pCards.slice(1);
    console.log(newPDeck.length);
    this.setState(prevState => {
      return { pCards: newPDeck };
    })
    console.log(this.state.pCardPlayed);
  }

  render() {

    var cpuCount = this.state.cpuCards.length;
    var pCount = this.state.pCards.length;

    const inGame = this.state.inGame;
    let button;
    if (inGame) {
      button = <Button variant="outline-light" onClick={() => this.handleDraw()}
        style={{ margin: "0 auto", width: "10vw", height: "5vh", marginTop: "2vh", marginBottom: "5vh", float: "none" }}>
        Draw Card
    </Button>;
    } else {
      button = <Button variant="outline-light" onClick={() => this.handleStart()}
        style={{ margin: "0 auto", width: "10vw", height: "5vh", marginTop: "2vh", marginBottom: "5vh", float: "none" }}>
        Start
    </Button>;
    }
    let cpuCard;
    if (inGame) {
      cpuCard = this.state.cpuCardPlayed;
    } else {
      cpuCard = "CARD";
    }

    let pCard;
    if (inGame) {
      pCard = this.state.pCardPlayed;
    } else {
      pCard = "CARD";
    }

    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
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

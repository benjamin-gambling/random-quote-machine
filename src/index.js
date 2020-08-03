import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

const root = document.getElementById("root");

const COLORS = [
  "#ff4444",
  "#ffbb33",
  "#00C851",
  "#33b5e5",
  "#2BBBAD",
  "#4285F4",
  "#aa66cc",
  "#eee",
  "#1c2a48",
  "rgba(121, 85, 72, 0.7)",
  "rgba(233, 30, 99, 0.7)",
  "rgba(63, 81, 181, 0.7)",
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

let interval = null;

const randomColor = () => {
  let color = COLORS[Math.floor(Math.random() * COLORS.length)];
  document.body.style.backgroundColor = color;
  return color;
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: "",
      quote: "",
      author: "",
      color: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.randomQuote = this.randomQuote.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((list) => list.json())
      .then((data) => {
        let quotes = data.quotes.map((content) => {
          return { quote: content.quote, author: content.author };
        });
        quotes.push({
          quote: "Don't live for another day becuase that day may never come",
          author: "Benjamin Gambling",
        });
        let random = quotes[Math.floor(Math.random() * quotes.length)];
        this.setState({
          list: quotes,
          quote: random.quote,
          author: random.author,
          color: "#333",
        });
        interval = setInterval(this.randomQuote, 10000);
      })
      .catch(console.log);
  }

  randomQuote() {
    let random = this.state.list[
      Math.floor(Math.random() * this.state.list.length)
    ];
    this.setState({
      quote: random.quote,
      author: random.author,
      color: randomColor(),
    });
  }

  handleClick() {
    clearInterval(interval);
    this.randomQuote();
    interval = setInterval(this.randomQuote, 10000);
  }

  render() {
    return (
      <div>
        <QuoteBox
          quote={this.state.quote}
          author={this.state.author}
          color={this.state.color}
          onClick={this.handleClick}
        />
        <Footer />
      </div>
    );
  }
}

class QuoteBox extends React.Component {
  render() {
    return (
      <div className="quote-box" style={{ color: this.props.color }}>
        <Text quote={this.props.quote} />
        <Author author={this.props.author} />
        <Buttons
          quote={this.props.quote}
          author={this.props.author}
          color={this.props.color}
          onClick={() => this.props.onClick()}
        />
      </div>
    );
  }
}

class Text extends React.Component {
  render() {
    return (
      <div className="quote-text">
        <i className="fa fa-quote-left"></i>
        <span> {this.props.quote} </span>
        <i className="fa fa-quote-right"></i>
      </div>
    );
  }
}

class Author extends React.Component {
  render() {
    return (
      <div className="quote-author">
        - <span>{this.props.author}</span>
      </div>
    );
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <div className="buttons">
        <Tweet
          quote={this.props.quote}
          author={this.props.author}
          color={this.props.color}
        />
        <NewQuote
          color={this.props.color}
          onClick={() => this.props.onClick()}
        />
      </div>
    );
  }
}

class Tweet extends React.Component {
  render() {
    let linkTwitter =
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
      encodeURIComponent(`"${this.props.quote}" - ${this.props.author}`);
    return (
      <a
        href={linkTwitter}
        className="button"
        id="tweet-quote"
        title="Tweet this quote!"
        target="_blank"
        rel="noopener noreferrer"
        style={{ backgroundColor: this.props.color }}
      >
        <i className="fa fa-twitter"></i>
      </a>
    );
  }
}

class NewQuote extends React.Component {
  render() {
    return (
      <button
        className="button"
        id="new-quote"
        href="#"
        onClick={() => this.props.onClick()}
        style={{ backgroundColor: this.props.color }}
      >
        New Quote
      </button>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        by <a href="https://github.com/benjamin-gambling">benjamin gambling</a>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

/*
 <div id="wrapper">
    <div id="quote-box">
          <div class="quote-text">
            <i class="fa fa-quote-left"> </i><span id="text"></span>
          </div>
          <div class="quote-author">- <span id="author"></span></div>
          <div class="buttons">
            <a
              class="button"
              id="tweet-quote"
              title="Tweet this quote!"
              target="_blank"
            >
              <i class="fa fa-twitter"></i>
            </a>
            <button class="button" id="new-quote">New quote</button>
          </div>
        </div>
        <div class="footer">
          by <a href="https://codepen.io/hezag/">hezag</a>
    </div>
  </div>
      */

import React, { Component } from 'react';
import './App.css';
import {
  TableContainer,
  TableRow,
  TableColumn,
} from './style'
import { observable } from 'mobx'
import { axios } from 'axios'

class CurrencyForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        inputValue: ''
      };
    }
  
    updateInputValue(event) {
      const valueOfCoin = event.target.value * this.props.list.quotes.USD.price
      this.setState({
        inputValue: event.target.value,
        valueOfCoin: valueOfCoin
      });
    }

    render() {
      const { list } = this.props
      return (
        <TableRow>
        <TableColumn>{list.name}</TableColumn>
        <TableColumn>{list.symbol}</TableColumn>
        <TableColumn>{list.quotes.USD.price}</TableColumn>
        <TableColumn className={priceIn24Hrs(list.quotes.USD.percent_change_24h)}>{list.quotes.USD.percent_change_24h}</TableColumn>
        <TableColumn>
          <div>
            <input value={this.state.inputValue} onChange={event => this.updateInputValue(event)} />
          </div>
        </TableColumn>
        <TableColumn>{this.state.valueOfCoin ? '$' : ''} {this.state.valueOfCoin}</TableColumn>
      </TableRow>
      );
    }
}


const priceIn24Hrs = (price) => {
  return (price > 0 ? 'green' : 'red')
}


const currencyList = (list) => {
  return (
    <CurrencyForm list={list} />
  )
}

class App extends Component {
  state = {
    data: []
  }

  async componentDidMount() {
    try {
      setInterval(async () => {
        const res = await fetch('https://api.coinmarketcap.com/v2/ticker/?limit=10&sort=id&structure=array')
        const blocks = await res.json();
        this.setState({
          data: blocks.data,
        })
      }, 30000)
    } catch(e) {
      console.log(e)
    }
  }
  
  render() {
    const { data } = this.state
    const currencyResult = observable(data)
    const currencyResults = currencyResult.map(currencyList)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CC</h1>
        </header>
        <TableContainer>
          <TableRow className="header">
              <TableColumn>Name</TableColumn>
              <TableColumn>Short name</TableColumn>
              <TableColumn>$ Value</TableColumn>
              <TableColumn>last 24h</TableColumn>
              <TableColumn>Amount you own </TableColumn>
              <TableColumn>$ value of your coin</TableColumn>
          </TableRow>
          { currencyResults }
        </TableContainer>
      </div>
    );
  }
}

export default { App }

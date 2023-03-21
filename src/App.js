// import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import React, { Component } from 'react'
import News from './components/news';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  pageSize = 6;

  state = {
    progress: 0
  }

  setProgress = (progress) =>{
    this.setState({
      progress: progress
    })
  }

  // Api custom enviroment variable
  apiKey = process.env.REACT_APP_MY_APIKEY;

  render() {
    return (
      <div>

        <BrowserRouter>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize="pageSize" country='in' category='general' />} />
            <Route exact path="business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize="pageSize" country='in' category='business' />} />
            <Route exact path="entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize="pageSize" country='in' category='entertainment' />} />
            <Route exact path="health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize="pageSize" country='in' category='health' />} />
            <Route exact path="science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize="pageSize" country='in' category='science' />} />
            <Route exact path="sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize="pageSize" country='in' category='sports' />} />
            <Route exact path="technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="" pageSize="pageSize" country='in' category='technology' />} />
            <Route exact path="technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="" pageSize="pageSize" country='in' category='technology' />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App


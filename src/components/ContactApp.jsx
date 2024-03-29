import React from "react";
import { Route, Routes } from "react-router-dom";
import { LocaleProvider } from "../context/LocaleContext";
import AddPage from "../pages/AddPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { getUserLogged, putAccessToken } from "../utils/api";
import Navigation from "./Navigation";

class ContactApp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      authedUser : null,
      initializing: true,
      localeContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id'
            localStorage.setItem('locale', newLocale)
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale
              }
            }
          })
        }
      }
    }

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  onLogout(){
    this.setState({
      authedUser: null
    })

    putAccessToken('');
  }

  async componentDidMount(){
    const { data } = await getUserLogged();

    this.setState({
      authedUser: data,
      initializing: false,
    })
  }

  async onLoginSuccess({accessToken}){
    putAccessToken(accessToken)
    const { data } = await getUserLogged()
  
    this.setState({
      authedUser: data
    })
  }

  render() {
    if(this.state.initializing){
      return null
    }
    
    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <div className='contact-app'>
            <header className='contact-app__header'>
              <h1>Aplikasi Kontak</h1>
            </header>
            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      )
    }

    return (
        <LocaleProvider value={this.state.localeContext}>
          <div className="contact-app">
            <header className='contact-app__header'>
              <h1>{this.state.localeContext.locale === 'id' ? 'Aplikasi Kontak' : 'Contact App'}</h1>
              <Navigation name={this.state.authedUser.name} logout={this.onLogout} />
            </header>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add" element={<AddPage />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
    );
  }
}

export default ContactApp
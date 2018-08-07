import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';

import { Header, Button, Card, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = { loggedIn: null };
    }

    componentDidMount() {
        const config = {
            apiKey: 'AIzaSyAgkQ_JT9h2aArcq_yh5ShtmwlmcvwEoTE',
            authDomain: 'auth01-6841d.firebaseapp.com',
            databaseURL: 'https://auth01-6841d.firebaseio.com',
            projectId: 'auth01-6841d',
            storageBucket: 'auth01-6841d.appspot.com',
            messagingSenderId: '87570647049'
          };

          firebase.initializeApp(config);

          firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.setState({ loggedIn: true });
                } else {
                    this.setState({ loggedIn: false });
                }
          });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Card>
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log out
                            </Button>        
                        </CardSection>  
                    </Card>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" /> 
               {this.renderContent()}
            </View>
        );
    }
}

export default App;

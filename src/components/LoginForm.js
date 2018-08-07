import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';

import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = { email: '', password: '', loading: false };
    }

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginFail() {
        this.setState({
            error: 'Autentication Failed!',
            loading: false
        });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        label='Email'
                        placeholder='Type your email address'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}  
                    />
                </CardSection>
                
                <CardSection>
                    <Input 
                        secureTextEntry
                        label='Password'
                        placeholder='Password'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}  
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;

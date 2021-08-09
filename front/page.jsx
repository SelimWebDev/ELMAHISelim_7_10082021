class LoginPage extends React.Component {
    render() { 
        return (
            <React.Fragment>
                <Header/>
                <LoginForm/>
            </React.Fragment>
        )
    }
}

class SignPage extends React.Component {
    render(){
        return (
            <React.Fragment>
                <Header/>
                <SignForm/>
            </React.Fragment>
        )
    }
}
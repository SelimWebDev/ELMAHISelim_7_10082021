
///////////////////////////

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

//////////////////////////////////////////

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

////////////////////////////////////

class MainPage extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,

            items: [],             // conteneur pour le retour de la requette get all

            contain: '',           // les ocnteneur pour l'envoie de la requete post
            date: ''
        }
    }

    setStateAndSendMsg(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '/' + mm + '/' + dd;

        this.setState({
            contain: document.getElementById('contain').value,
            date: today,
        }, function(){
            fetch("http://localhost:3000/api/msg",
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },

                method: "POST",

                body: JSON.stringify({
                    contain: this.state.contain,
                    date: this.state.date,
                })
            })
            .then( () => this.getAllAndSetState())
            .catch(error => this.setState({ error }) )
        })
    }

    getAllAndSetState(){
        fetch("http://localhost:3000/api/msg") // requete GET au serveur
            .then((res) => res.json())
            .then((msgArray) => this.setState({
                isLoaded: true,
                items: msgArray
            }),
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }

    componentDidMount(){
        this.getAllAndSetState();
    }

    render(){
        return (
            <React.Fragment>
                <Header/>
                <AllSection items={this.state.items}/>
                <form id="write">
                    <div>
                        <label htmlFor="contain">écrivez un message : </label>
                        <input id="contain" name="contain" type="text"></input>
                    </div>
                    <button type="button" onClick={() => {this.setStateAndSendMsg()}}>Envoyer</button>
                </form>
            </React.Fragment>
        )
    }
}


class WriteSection extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            error: null,
            contain: '',
            date: '',
        }
    }

    refresh(){
        ReactDOM.render(<MainPage/>, document.querySelector('#app'))
    }

    sendMsg(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '/' + mm + '/' + dd;

        this.setState({
            contain: document.getElementById('contain').value,
            date: today,
        }, function(){
            fetch("http://localhost:3000/api/msg",
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },

                method: "POST",

                body: JSON.stringify({
                    contain: this.state.contain,
                    date: this.state.date,
                })
            })
            .then( () => this.refresh())
            .catch(error => this.setState({ error }) )
        })
    }

    render(){
        return (
            <form id="write">
                <div>
                    <label htmlFor="contain">écrivez un message : </label>
                    <input id="contain" name="contain" type="text"></input>
                </div>
                <button type="button" onClick={() => {this.sendMsg()}}>Envoyer</button>
            </form>
        )
    }
}
///////////////////////////////////////

class Header extends React.Component {
    render() { 
        return <div id="header">
            <h1>Groupomania</h1>
            <div>toto</div>
        </div>
    }
}

////////////////////////////////////////

class SignForm extends React.Component {
    
    constructor (props) {
        super(props)
        this.state = {
            nom: '',
            prenom: '',
            pseudo: '',
            mdp: ''
        }
    }

    reqSign(){
        fetch("http://localhost:3000/api/auth/signup",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },

            method: "POST",

            body: JSON.stringify({
                nom: this.state.nom,
                prenom: this.state.prenom,
                pseudo: this.state.pseudo,
                mdp: this.state.mdp
            })
        })

        .then(function(res){ 
            ReactDOM.render(<LoginPage/>, document.querySelector('#app'))
            console.log(res.json)
        })
        .catch(function(err){
            console.log(err)
        })    
    }

    sign(){
        this.setState({
            nom: document.getElementById("nom").value,                                          // on change le state !async
            prenom: document.getElementById('prenom').value,
            pseudo: document.getElementById('pseudo').value,
            mdp: document.getElementById('mdp').value
        }, function(){
            this.reqSign()                                                             // fonction callback
        })
        
    // A RAJOUTER //
    // verif des champs //
    }

    render(){
        return (
            <form id="form">
                <h2>Inscription</h2>
                <div>
                    <label htmlFor="nom">Nom : </label>
                    <input id="nom" name="nom" type="text"></input>
                </div>
                <div>
                    <label htmlFor="prenom">Prenom : </label>
                    <input id="prenom" name="prenom" type="text"></input>
                </div>
                <div>
                    <label htmlFor="pseudo">Pseudo : </label>
                    <input id="pseudo" name="pseudo" type="text"></input>
                </div>
                <div>
                    <label htmlFor="mdp">Mot de passe : </label>
                    <input id="mdp" name="mdp" type="text"></input>
                </div>
                <button type="button" onClick={() => {this.sign()}}>Enregistrer</button>
            </form>
        )
    }
}


//////////////////////////////////

class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pseudo : '',
            mdp: '',
            errorMsg: ''
        }
    }

    reqLogin(){
        fetch("http://localhost:3000/api/auth/login",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },

            method: "POST",

            body: JSON.stringify({
                pseudo: this.state.pseudo,
                mdp: this.state.mdp,
            })
        })

        .then(function(res){ 
            if(res.ok){
                ReactDOM.render(<MainPage/>, document.querySelector('#app'))
            }
            else if (res.status == 401){
                this.setState({
                    errorMsg: res.message
                })
            }
            else if (res.status == 402){
                this.setState({
                    errorMsg: res.message
                })
            }
        })
        .catch(function(err){
            console.log(err)
        })    
    }

 
    login(){                                                                //A RAJOUTER verif des champs
        this.setState({                    
            pseudo: document.getElementById('pseudo').value,                    // on change le state, async
            mdp: document.getElementById('mdp').value
        }, function(){
            this.reqLogin()                                                             // fonction callback
        })
    }

    render(){
        return (
            <form id="form">
                <h2>Connexion</h2>
                <div>
                    <label htmlFor="pseudo">Entrez votre pseudo : </label>
                    <input type="text" name="pseudo" id="pseudo"></input>
                </div>
                <div>
                    <label htmlFor="mdp">Entrez votre mot de passe : </label>
                    <input type="text" name="mdp" id="mdp"></input>
                </div>
                <div>
                    <span>{this.errorMsg}</span>
                </div>
                <div id="dbButCtn">
                    <button type="button" onClick={() => {this.login()}}>Se connecter</button>
                    <button type="button" onClick={() => {ReactDOM.render(<SignPage/>, document.querySelector('#app'))}}>S'inscrire</button>
                </div>
            </form>
        )
    }
}

//////////////////////////////////////////

function AllSection(props) {
    return (
        <div id="all">
            {props.items.map(msg =>(
                <article key={msg.id}>
                    <span id="author">{msg.authorName}</span>
                    <span id="text">{msg.contain}</span>
                    <div>
                        <div id="like">
                            <i className="fas fa-heart"></i>
                            <div>{msg.like}</div>
                            </div>
                        <span id="date">{msg.date}</span>
                    </div>
                </article>
            ))}
        </div>
    )
}

//////////////////////////////////////////////


//////////////////////////////////////////
ReactDOM.render(<MainPage/>, document.querySelector('#app'))
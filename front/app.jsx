
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
    render(){
        return (
            <React.Fragment>
                <Header/>
                <AllSection/>
            </React.Fragment>
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



class AllSection extends React.Component {

    constructor (props) {
        super(props)
        this.state = [
            {
                id: 0,
                contain: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                date: "17/08/2021",
                like: 0,
                userLike: [],
                authorId: 1,
                authorName: "Hector"
            },
            {
                id: 1,
                contain: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
                date: "17/08/2021",
                like: 0,
                userLike: [],
                authorId: 1,
                authorName: "Malin"
            },
            {
                id: 2,
                contain: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                date: "17/08/2021",
                like: 0,
                userLike: [],
                authorId: 1,
                authorName: "Pipo"
            },
            {
                id: 3,
                contain: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                date: "17/08/2021",
                like: 0,
                userLike: [],
                authorId: 1,
                authorName: "Wingarduim"
            }
        ]
    }
    
    render(){
        const htmlMsg = this.state.map((msg) => {
            return (
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
            )
        })
        return(
            <div id="display">
                {htmlMsg}
            </div>
        )
    }
}


//////////////////////////////////////////
ReactDOM.render(<LoginPage/>, document.querySelector('#app'))
class ProfilPage extends React.Component {
    
    render(){
        return (
            <React.Fragment>
                <Header/>
                <ProfilForm/>
            </React.Fragment>
        )
    }
}

class ProfilForm extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,

            user : ''
        }
    }

    deleteAccount(){
        const userId = localStorage.getItem('userId')
        fetch("http://localhost:3000/api/auth/" + userId,
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
            },

            method: "DELETE",

            body: JSON.stringify({
                userId: userId
            })
        })
        .then((res) => {
            if (res.ok){
                ReactDOM.render(<LoginPage/>, document.querySelector('#app'))
            }
        })
        .catch((err) => {throw err})
    }

    getUser(){
        const userId = localStorage.getItem('userId')
        fetch("http://localhost:3000/api/auth/" + userId, // requete GET au serveur
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
                },

                method: "GET",
            })
            .then((res) => res.json())
            .then((res) => this.setState ({
                user: res,
            }))
            .catch((err) => {throw err})
    }

    componentDidMount(){
        this.getUser()
    }

    render(){
        return (
            <form id="form">
                <h2>Profile</h2>
                <div>
                    <label htmlFor="nom">Nom : </label>
                    <input id="nom" name="nom" type="text" value={this.state.user.nom}></input>
                </div>
                <div>
                    <label htmlFor="prenom">Prenom : </label>
                    <input id="prenom" name="prenom" type="text" value={this.state.user.prenom}></input>
                </div>
                <div>
                    <label htmlFor="pseudo">Pseudo : </label>
                    <input id="pseudo" name="pseudo" type="text" value={this.state.user.pseudo}></input>
                </div>
                <button type="button" onClick={() => {this.deleteAccount()}}>Supprimer le compte</button>
            </form>
        )
        
    }
}


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

            MsgToDelete: '',    // conteneur du msg a supprimer

            file: '',
            contain: '',           // les conteneur pour l'envoie de la requete post
            date: ''
        }
    }

    

    setStateAndSendMsg(){
        var date = new Date();
        var today = date

        this.setState({
            contain: document.getElementById('contain').value,
            date: today,
            file: document.getElementById('fileInput').files[0]
        }, function(){
            if (!this.state.file){                                                                     // si pas de fichier
                fetch("http://localhost:3000/api/msg",
                {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.token
                    },

                    method: "POST",

                    body: JSON.stringify({
                        contain: this.state.contain,
                        date: this.state.date,
                        authorName: localStorage.getItem("userPseudo"),
                        authorId: localStorage.getItem("userId")
                    })
                })
                .then( () => this.getAllAndSetState())
                .catch(error => {
                    this.setState({ error })})
            }
            else {
                const data = new FormData();
                data.append('image', this.state.file)
                data.append('date', this.state.date)
                data.append('contain', this.state.contain)
                data.append('authorName', localStorage.getItem("userPseudo"))
                data.append('authorId', localStorage.getItem("userId"))

                fetch("http://localhost:3000/api/msg",
                {
                    headers: {
                    'Accept': '*/*',
                    'Authorization': 'Bearer ' + localStorage.token
                    },

                    method: "POST",

                    body: data
                })
                .then( () => this.getAllAndSetState())
                .catch(error => this.setState({ error }))
            }
        })
    }

    getAllAndSetState(){
        fetch("http://localhost:3000/api/msg", // requete GET au serveur
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
                },

                method: "GET",
            })
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

    deleteMsg(msg){
        this.setState({
            MsgToDelete: msg
        }, function(){
            fetch("http://localhost:3000/api/msg",
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
                },

                method: "DELETE",

                body: JSON.stringify({
                    msgId: this.state.MsgToDelete
                })
            })
            .then(this.getAllAndSetState())
            .catch(error => this.setState({ error }))
        })
    }

    componentDidMount(){
        this.getAllAndSetState();
        
    }

    componentDidUpdate(){
        const authorMsg = document.getElementsByClassName(localStorage.getItem('userId'))       // style des msg de l'utilisateur
        for ( var i=0; i<authorMsg.length; i++){
            authorMsg[i].style.alignSelf='flex-end'
            authorMsg[i].style.backgroundColor = "#90b3d0"; 
        }

        if (localStorage.getItem('userId') != 10){                   // si l'utilisateur n'est pas admin on n'affiche pas l'icone
            var iconeArray = document.getElementsByClassName('delMsg')
            for (var i=0; i<iconeArray.length; i++){
                iconeArray[i].style.display = "none"
            }
        }
    }

    render(){
        return (
            <React.Fragment>
                <Header/>
                <div id="conteneur">
                    <div id="allSection">
                        {this.state.items.map(msg =>(
                            <article key={msg.id} className={msg.authorId}>
                            <span className="author">{msg.authorName}</span>
                            <span id="text">{msg.contain}</span>
                            <img src={msg.imageUrl}/>
                            <div>
                                <div id="like">
                                    <i className="fas fa-heart"></i>
                                    <div>{msg.like}</div>
                                </div>
                                <span id="date">{msg.date}</span>
                                <i key={msg.id} className="delMsg fas fa-trash" onClick={() => {this.deleteMsg(msg.id)}}></i>
                            </div>
                        </article>
                        ))}
                    </div>               
                    <form id="write">
                        <label htmlFor="contain">écrivez un message : </label>
                        <input id="contain" name="contain" type="text"></input>
                        <i className="fas fa-image fa-2x"><input id="fileInput" type="file"></input></i>
                        <button type="button" onClick={() => {this.setStateAndSendMsg()}}>Envoyer</button>
                    </form>
                </div>
                
            </React.Fragment>
        )
    }
}

///////////////////////////////////////


/*function AllSection(props) {

    if (localStorage.getItem('userId') == 10){
        iconeArray = document.getElementsByClassName('delMsg')
        for (var i=0; i<iconeArray.length; i++){
            iconeArray[i].style.display = "none"
        }
    }

    return (
        <div id="allSection">
            {props.items.map(msg =>(
                <article key={msg.id} className={msg.authorId}>
                    <span className="author">{msg.authorName}</span>
                    <span id="text">{msg.contain}</span>
                    <img src={msg.imageUrl}/>
                    <div>
                        <div id="like">
                            <i className="fas fa-heart"></i>
                            <div>{msg.like}</div>
                            </div>
                        <span id="date">{msg.date}</span>
                        <i className="delMsg fas fa-trash" onClick={}></i>
                    </div>
                </article>
            ))}
        </div>
    )
}*/

///////////////////////////////////////

class Header extends React.Component {
    
    componentDidMount(){
        if (!localStorage.getItem('token')){                                         // si non token, donc non connectcté
            document.getElementById("deconnect").style.display = "none";           // on n'affiche pas le bouton de déconnexion
            document.getElementById("profil").style.display = "none";
        }
    }

    deconnect(){                                                           // fonction pour se déconnecter
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userPseudo');
        ReactDOM.render(<LoginPage/>, document.querySelector('#app'))
    };

    goToProfil(){
        ReactDOM.render(<ProfilPage/>, document.querySelector('#app'))
    }

    render() { 
        return <div id="header">
            <h1>Groupomania</h1>
            <div className="icn_contain">
                <i id="profil" onClick={() => {this.goToProfil()}} className="fas fa-user-circle fa-2x"></i>
                <i id="deconnect" onClick={() => {this.deconnect()}} className="fas fa-power-off fa-2x"></i>
            </div>
                
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


        
        .then((res) => {
            if (res.ok){
                res.json()
                .then((res) => {
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("userId", res.userId)
                    localStorage.setItem("userPseudo", res.userPseudo)
                    ReactDOM.render(<MainPage/>, document.querySelector('#app'))
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

if (!localStorage.getItem('token')){
    ReactDOM.render(<LoginPage/>, document.querySelector('#app'))                // si pas de token affiche page login
} else {
    ReactDOM.render(<MainPage/>, document.querySelector('#app'))                   // sinon affiche main page
}

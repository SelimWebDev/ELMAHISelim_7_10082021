class Header extends React.Component {
    render() { 
        return <div id="header">
            <h1>Groupomania</h1>
        </div>
    }
}

class LoginForm extends React.Component {

    loginFunc (e){
        e.preventDefault()
        console.log("envoie requete login")
    }

    render(){
        return (
                <div id="login">
                    <form>
                        <label for="pseudo">Entrez votre pseudo : </label>
                        <input type="text" name="pseudo" id="pseudo"></input>
                        <label for="mdp">Entrez votre mot de passe : </label>
                        <input type="text" name="mdp" id="mdp"></input>
                        <Bouton fonction={this.loginFunc.bind(this)} text="login"/>
                    </form>
                </div>
        );
    }
}

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
            console.log(res.json)
            return res.json();
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
            <div id="sign">
                <form>
                    <label htmlFor="nom">Nom : </label>
                    <input id="nom" name="nom" type="text"></input>
                    <label htmlFor="prenom">Prenom : </label>
                    <input id="prenom" name="prenom" type="text"></input>
                    <label htmlFor="pseudo">Pseudo : </label>
                    <input id="pseudo" name="pseudo" type="text"></input>
                    <label htmlFor="mdp">Mdp : </label>
                    <input id="mdp" name="mdp" type="text"></input>
                    <button type="button" onClick={() => {this.sign()}}>Enregistrer</button>
                </form>
            </div>
        )
    }
}
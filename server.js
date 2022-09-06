// importer le http de node 
const http = require('http');

//creer un serveur
const server = http.createServer((req, res) => {
    res.end('voila ma reponse !git ')
});

// attendre les requestes envoyer 
server.listen(process.env.PORT || 3000);


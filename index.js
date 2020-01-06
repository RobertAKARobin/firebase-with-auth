const admin = require('firebase-admin');
const adminCedentials = require('./.config.firebase-admin.json');
const clientCredentials = require('./.config.firebase-client.json');

admin.initializeApp({
    credential: admin.credential.cert(adminCedentials),
    databaseURL: clientCredentials.databaseURL,
});
const auth = admin.auth();

const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.static('.'));
app.get('/token', (req, res) => {
    auth.createCustomToken('robin').then(token => res.send(token));
});
app.get('/config', (req, res) => {
    res.send(clientCredentials);
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

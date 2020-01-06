(async function(){
    const configRequest = await fetch('/config');
    const config = await configRequest.json();
    firebase.initializeApp(config);

    const auth = firebase.auth();
    const tokenRequest = await fetch('./token');
    const token = await tokenRequest.text();
    await auth.signInWithCustomToken(token);

    const db = firebase.firestore();
    const collection = db.collection('devices');
    const query = collection;

    const results = await query.get();
    const out = results.docs.map(result => result.data());
    console.log(out);
    debugger;
})();

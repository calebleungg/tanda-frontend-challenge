### Tanda Frontend Code Challenge

## Submission - Caleb Leung

<br/>
<br/>
Hi Adam, please find my submission to your Tanda Frontend code challenge in this repository. 
<br/>
<br/>
It was a fun challenge- for some reason, I always find myself making SaaS prototypes that revolve around Human Resource and Workforce management so this project was another one of those that fell into my lap.
<br/>
<br/>
Any questions let me know.
<br/>
<br/>
<br/>

# Instructions to run

1. Setup the client - While inside the root folder, run:
```
yarn client:setup
```

2. Setup the server - While inside the root folder, run:
```
yarn backend:setup
```

You will need 2 terminals to start the app. 

3. Start the backend
```
yarn backend:start
```
4. Start the client
```
yarn client:start
```

<br/>
The server will run on port 3005, while the client on port 3000 (localhost). The client is configured by default to listen to the server's api on port 3005, so if you change the server's port ensure the configuration is changed also on the client in the file below: 

`
client/src/api/client.js
`



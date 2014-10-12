# React Tutorial (websockets)

This is the React comment box example from [the React tutorial](http://facebook.github.io/react/docs/tutorial.html) adapted to use websockets (with flashsocket and xhr polling fallback) through socket.io instead of ajax polling. This is less code, less expensive, and more secure.

## To use

The ajax version of this repository includes three different servers. Here, I only provide a websockets implementation of the node server. It serves static files from `public/` and fetches/adds data through socket.io events. Start a server with:

```sh
npm install
node server.js
```

And visit <http://localhost:3000/>. Try opening multiple tabs!

/**
 * This file is modified from a file provided by Facebook for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights of the upstream file not expressly granted. because of that, I don't know where 
 * my version stands lol.'
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs'); 
var path = require('path'); 
var express = require('express'); 
var bodyParser = require('body-parser'); 
 
var app = express(); 
 
var comments = JSON.parse(fs.readFileSync('_comments.json')) 
app.use('/', express.static(path.join(__dirname, 'public'))); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
 
var server = require('http').Server(app); 
var io = require('socket.io').listen(server); 
io.set('log level', 1); 
 
io.on('connection', function(socket) { 
  socket.emit('load posts', JSON.stringify(comments)); 
  socket.on('post', function(post){ 
  comments.push(post); 
    socket.broadcast.emit('load posts', JSON.stringify(comments)); 
  }); 
});

server.listen(3000); 
console.log('Server started: http://localhost:3000/');

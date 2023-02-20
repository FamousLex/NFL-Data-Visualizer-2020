import bottle
import json
import App

@bottle.route('/')
def serve_html():
  return bottle.static_file("index.html", root="./client/")

@bottle.route("/front_end.js")
def serve_front_end_js():
    return bottle.static_file("front_end.js", root="./client/")

@bottle.route("/ajax.js")
def serve_AJAX():
    return bottle.static_file("ajax.js", root="./client/")

@bottle.post('/position_input')
def serve_charts():
  jsonBlobPosition = bottle.request.body.read().decode()
  global position
  position = json.loads(jsonBlobPosition)


@bottle.post('/player_input')
def serve_individual():
  jsonBlobPlayer = bottle.request.body.read().decode()
  player = json.loads(jsonBlobPlayer)
  positionRequestData = App.getStatsByPosition(position, player)
  positionRequestDataJSON = json.dumps(positionRequestData)
  return positionRequestDataJSON
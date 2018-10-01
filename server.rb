require "sinatra"
require "sinatra/json"
require "json"
require "sinatra/reloader" if development?
require "pry" if development? || test?


set :bind, '0.0.0.0'  # bind to all interfaces
set :public_folder, File.join(File.dirname(__FILE__), "public")

def import_deck(deck_name)
  JSON.parse(File.read("./src/constants/decks/" + deck_name))
end


before do
  headers({ "Access-Control-Allow-Origin" => "*" })
end

get "/" do
  erb :home
end


get "/cards" do
  erb :home
end

get "/api/v1/decks/:deck" do
  deck = import_deck(params[:deck] + ".json")

  content_type :json
  json deck
end

post "/api/v1/decks/:deck" do
  deck = JSON.parse(request.body.read)

  File.write("./src/constants/decks/#{params[:deck]}.json", JSON.pretty_generate(deck))

  content_type :json
  status 201
  json deck
end

get "*" do
  erb :home
end

require 'sinatra'
require 'sinatra/reloader'

get '/' do
    @title = 'Library of Algorithm'
    @subtitle = 'Algorithm is fun!!!'
    erb :index
end
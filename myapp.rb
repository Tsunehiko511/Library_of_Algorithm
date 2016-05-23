require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'

get '/' do
	@title = 'Library of Algorithm'
	@subtitle = 'Algorithm is fun!!!'
	erb :index
end

get '/def_kmean' do
	erb :def_kmean
end

get '/anime_kmean' do
	erb :anime_kmean
end

get '/que_kmean' do
	erb :que_kmean
end
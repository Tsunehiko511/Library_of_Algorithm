require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'

get '/' do
	@title = 'Library of Algorithms'
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

post '/ans_kmean' do
  @answer = params[:answer]
  @solution = [1,1,1]
  @count = 0
  for i in 0...3 do
  	if @answer[2*i+1].to_i==@solution[i]
  		@count+=1
  	end
  end
  @rate = @count*100/3

  if @rate >= 80
  	@judge = "good"
  else
  	@judge = "but"
  end
	erb :que_kmean
end
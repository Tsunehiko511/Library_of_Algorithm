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
  @solution = [1,2,1,0,2,0,2,0,0,2,0,2,1,1,1,2,2,1,1,0,1,2,2,0,1,1,1,1,0,0,0,2,1,2,0]
  @count = 0
  @count_zero = 0
  @L = @answer.length 

  for i in 0...35 do
  	if @answer[2*i+1].to_i==@solution[i]
  		@count+=1
  	end
    if @answer[2*i+1].to_i==0
      @count_zero+=1
    end
  end
  if @count_zero == 35 or @L<71
    @rate = 0
  else
    @rate = @count*100/35
  end
  if @rate >= 80
  	@judge = "good"
  else
  	@judge = "but"
  end
	erb :que_kmean
end
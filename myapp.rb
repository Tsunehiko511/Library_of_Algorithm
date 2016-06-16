require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'

get '/' do
  @title = 'Library of Algorithms'
  @subtitle = 'Algorithm is fun!!!'
  erb :index
end

get '/def_ga' do
  @title = '遺伝的アルゴリズム'
  erb :def_ga
end

get '/maxvalue' do
  @title = '最大値'
  erb :maxvalue
end

get '/anime_quicksort' do
  @title = 'クイックソート'
  erb :anime_quicksort
end
get '/anime_bubblesort' do
  @title = 'バブルソート'
  erb :anime_bubblesort
end
get '/anime_insertionsort' do
  @title = '挿入ソート'
  erb :anime_insertionsort
end
get '/anime_heapsort' do
  @title = 'ヒープソート'
  erb :anime_heapsort
end
get '/anime_mergesort' do
  @title = 'マージソート'
  @title = 'mergesort'
  erb :anime_mergesort
end
get '/anime_mergesort2' do
  @title = 'mergesort2'
  erb :anime_mergesort2
end
get '/anime_selectsort' do
  @title = '選択ソート'
  erb :anime_selectsort
end

get '/dijkstra' do
  @title = 'ダイクストラ法'
  erb :dijkstra
end
get '/dijkstra2' do
  @title = 'ダイクストラ法　演習'
  erb :dijkstra2
end
get '/a_star' do
  @title = 'A*アルゴリズム'
  erb :a_star
end

get '/anime_knn' do
  @title = 'k近傍法'
  erb :anime_knn
end
get '/anime_ga' do
  @title = 'ナップザック問題'
  erb :anime_ga
end

get '/que_knn' do
  @title = 'k近傍法　演習'
  erb :que_knn
end

post '/ans_knn' do
  @title = 'k近傍法　解答'
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
	erb :que_knn
end
Rails.application.routes.draw do
  root 'homepage#index'
  namespace :api do
    namespace :v1 do
      #get 'users/index'
      post 'users/create'
      get 'users/show/:id', to: 'users#show'
      delete 'users/destroy/:id', to: 'users#destroy'
      patch 'users/update/:id', to: 'users#update'
      
      #get 'tasks/index'
      get 'tasks/index/by-user-id/:uid', to: 'tasks#by_user_id'
      get 'tasks/index/by-category-id/:cid', to: 'tasks#by_category_id'
      post 'tasks/create'
      get 'tasks/show/:id', to: 'tasks#show'
      delete 'tasks/destroy/:id', to: 'tasks#destroy'
      patch 'tasks/update/:id', to: 'tasks#update'

      get 'categories/index'
      post 'categories/create'
      get 'categories/index/by-user-id/:uid', to: 'categories#by_user_id'
      get 'categories/show/:id', to: 'categories#show'
      delete 'categories/destroy/:id', to: 'categories#destroy'
      patch 'categories/update/:id', to: 'categories#update'
    end
  end
  get '/login'  => 'sessions#check'
  post '/login' => 'sessions#create'
  #post '/logout' => 'sessions#destroy'
  get '/logout' => 'sessions#destroy'
  get '/logged_in' => 'sessions#is_logged_in?'

  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

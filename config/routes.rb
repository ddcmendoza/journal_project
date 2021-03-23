Rails.application.routes.draw do

  get 'sessions/create'
  root 'homepage#index'
  namespace :api do
    namespace :v1 do
      get 'users/index'
      post 'users/create'
      get 'users/show/:id', to: 'users#show'
      
      delete 'users/destroy/:id', to: 'users#destroy'
      get 'tasks/index'
      post 'tasks/create'
      get 'categories/index'
      post 'categories/create'
      get 'categories/show/:id', to: 'categories#show'
      delete 'categories/destroy/:id', to: 'categories#destroy'
      get 'tasks/show/:id', to: 'tasks#show'
      delete 'tasks/destroy/:id', to: 'tasks#destroy'
      patch 'tasks/update/:id', to: 'tasks#update'
      patch 'categories/update/:id', to: 'categories#update'
      patch 'users/update/:id', to: 'users#update'
    end
  end
  get '/*path' => 'homepage#index'
  
  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'
  get '/logout' => 'sessions#destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

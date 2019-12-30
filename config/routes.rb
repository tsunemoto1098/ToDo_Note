Rails.application.routes.draw do
  devise_for :users
  get 'notes/index'
  root "notes#index"
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update]
  
end

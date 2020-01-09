Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update, :destroy] do
    resources :notes, only: [:index, :create, :destroy]
  end
end

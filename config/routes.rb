Rails.application.routes.draw do
  get 'notes/index'

  root "notes#index"
end

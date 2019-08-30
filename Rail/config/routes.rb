Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do 
    namespace :v1 do
      # we are using messages in the api to send messages to people under a tag in odin
      resources :rooms do 
        resources :messages
        mount ActionCable.server => '/cable'
      end
    end
  end
end

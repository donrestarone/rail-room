class Api::V1::StatusController < ApplicationController
  def index
    render json: {code: 200, status: 'OK'}
  end
end
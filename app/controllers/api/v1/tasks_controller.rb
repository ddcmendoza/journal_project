class Api::V1::TasksController < ApplicationController
  def index
    @tasks = Task.all.to_json
    if request.headers['Authenticate'] == 'True'
      render json: @tasks
    else
      render json: []
    end
  end

  def show
  end

  def new
  end

  def edit
  end

  def create
  end

  def update
  end

  def destroy
  end
end

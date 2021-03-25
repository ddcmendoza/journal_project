class Api::V1::TasksController < ApplicationController
  def index

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
  def by_user_id
    @tasks = Task.where("user_id = #{params[:uid]}").order("name ASC, category_id")
    if session[:user_id] == params[:uid].to_i 
      render json: @tasks
      else
      render json: "Invalid Request"
      end
  end
  def by_category_id
    @tasks = Task.where(user_id: params[:uid],category_id: params[:cid]).order("name ASC")
    if session[:user_id] == params[:uid].to_i  
      render json: @tasks
      else
      render json: "Invalid Request"
    end
  end

end

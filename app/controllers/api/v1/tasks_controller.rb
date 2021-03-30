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
    @task = Task.new(task_params)
    @task.category = Category.find(@task.category_id)
    @task.user = User.find(session[:user_id])
    if @task.save && !!session[:user_id]
        render json: {
        status: :created,
        task: @task
    }
    else 
        render json: {
        status: 500,
        errors: @task.errors.full_messages
    }
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.name = params[:task][:name]
    @task.details = params[:task][:details]
    @task.deadline = params[:task][:deadline]
    @task.category = Category.find(params[:task][:category_id])
    if session[:user_id].to_i == @task[:user_id].to_i
      if @task.save
        render json: {
          status: :updated,
          category: @task,
        }
      else
        render json: {
          status: 500,
          errors: @task.errors.full_messages
         # errors: ["Error on updating the task"]
      }
      end
    else
      render json: {
       errors: ["You don't have authorization to do that"]
      }
    end
  end

  def destroy
    @task = Task.find(params[:id])
    if @task.destroy and @task.user_id == session[:user_id]
      render json:{
        status: :deleted
      }
    elsif @task.user_id != session[:user_id]
      render json:{
        errors: ["You're not allowed to do that!"]
      }
    else
      render json:{
        errors: ['Something went wrong']
      }
    end
  end
  def by_user_id
    @tasks = Task.where("user_id = #{params[:uid]}").order("deadline ASC, category_id")
    if session[:user_id] == params[:uid].to_i 
      render json: @tasks
      else
      render json: {
        errors: ["Invalid Request"]
      }
      end
  end
  def by_category_id
    @tasks = Task.where(category_id: params[:cid]).order("deadline ASC")
    @category = Category.find(params[:cid])
    if session[:user_id] == @category.user_id  
      render json: @tasks
      else
      render json: {
         errors: ["Invalid Request"]
        }
    end
  end
  private
  def task_params
      params.require(:task).permit(:name, :details,:deadline, :category_id,:user_id)
  end

end

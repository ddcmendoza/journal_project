class Api::V1::CategoriesController < ApplicationController
  def index
    if !!session[:user_id]
      redirect_to action: "by_user_id", uid: session[:user_id]
    else
      render json: {
        errors: ["Invalid Request"]
      }
    end
  end

  def show
  end

  def new
  end

  def edit
  end

  def create
    @category = Category.new(category_params)
    @category.user = User.find(session[:user_id])
    if @category.save && !!session[:user_id]
        render json: {
        status: :created,
        category: @category
    }
    else 
        render json: {
        status: 500,
        errors: @category.errors.full_messages
    }
    end
  end

  def update
    @category = Category.find(params[:id])
    @category.name = params[:category][:name]
    @category.details = params[:category][:details]
    if session[:user_id].to_i == @category[:user_id].to_i
      if @category.save
        render json: {
          status: :updated,
          category: @category,
          session: session
        }
      else
        render json: {
          status: 500,
          errors: @category.errors.full_messages
      }
      end
    else
      render json: {
        errors: ["You don't have authorization to do that"]
      }
    end
  end

  def destroy
    @category = Category.find(params[:id])
    if @category.destroy and @category.user_id == session[:user_id]
      @tasks = Task.where(category_id: params[:id])
      @tasks.each do |t|
        t.destroy
      end
      render json:{
        status: :deleted
      }
    elsif @category.user_id != session[:user_id]
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
    @categories = Category.where(user_id: params[:uid].to_i).order("name ASC")
    if session[:user_id] == params[:uid].to_i 
      render json: @categories
      else
      render json: {
        errors: ["Invalid Request"]
      }
      end
  end
  private
  def category_params
      params.require(:category).permit(:name, :details,:user_id)
  end

end

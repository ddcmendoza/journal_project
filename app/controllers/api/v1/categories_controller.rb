class Api::V1::CategoriesController < ApplicationController
  def index
  end

  def show
  end

  def new
  end

  def edit
  end

  def create
    @category = Category.new(category_params)
    @category.user_id = session[:user_id]
    if @category.save
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
          errors: "Error on updating the category"
      }
      end
    else
      render json: "You don't have authorization to do that"
    end
  end

  def destroy
    @category = Category.find(params[:id])
    if @category.destroy and @category.user_id == session[:user_id]
      render json:{
        status: :deleted
      }
    elsif @category.user_id != session[:user_id]
      render json:{
        errors: "You're not allowed to do that!"
      }
    else
      render json:{
        errors: 'Something went wrong'
      }
    end

  end
  def by_user_id
    @categories = Category.where(user_id: params[:uid]).order("name ASC")
    if session[:user_id] == params[:uid].to_i 
      render json: @categories
      else
      render json: "Invalid Request"
      end
  end
  private
  def category_params
      params.require(:category).permit(:name, :details,:user_id)
  end

end

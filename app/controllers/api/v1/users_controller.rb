class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all
      if @users
        render json: {
        users: @users
      }
    else
        render json: {
        status: 500,
        errors: ['no users found']
    }
    end
  end

  def show
    @user = User.find(params[:id])
      if @user
        render json: {
        user: @user
      }
      else
        render json: {
        status: 500,
        errors: ['user not found']
      }
      end
  end

  def new
  end

  def edit
   
  end

  def create
    @user = User.new(user_params)
    if @user.save
        login!  
        render json: {
        status: :created,
        user: @user
    }
  else 
      render json: {
      status: 500,
      errors: @user.errors.full_messages
  }
  end
  end

  def update
    @user = User.find(params[:id])
    if params[:user][:name]
      @user.update(name: params[:user][:name])
    elsif params[:user][:password]
      @user.update(password: params[:user][:password])
    end

    if session[:user_id] == params[:id]
      if@user.save
        render json: {
          status: :updated,
          user: @user
        }
      else
        render json: {
          status: 500,
          errors: @user.errors.full_messages,
      }
      end
    else
      render json: "You don't have authorization to do that"
    end

  end

  def destroy
  end
  private
     def user_params
         params.require(:user).permit(:username,:name, :password, :password_confirmation)
     end
end
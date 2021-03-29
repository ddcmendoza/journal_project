class SessionsController < ApplicationController
  def create
    @user = User.find_by(username: session_params[:username])
  
    if @user && @user.authenticate(session_params[:password])
      login!
      render json: {
        logged_in: true,
        user: @user
      }
    else
      logout!
      if @user
        render json: { 
          status: 401,
          errors: ['Wrong password or username']
        }
      else
        render json: { 
          status: 401,
          errors: ['Username does not exist']
        }
      end
    end
end
def is_logged_in?
    if logged_in? && current_user
      render json: {
        logged_in: true,
        user: current_user
      }
    else
      render json: {
        logged_in: false,
        message: ['no such user']
      }
    end
end
def check
  if logged_in?
    redirect_to root_path
  end
  redirect_to root_path
end
def destroy
      logout!
      render json: {
        status: 200,
        logged_out: true
      }
end
private
def session_params
      params.require(:user).permit(:username, :password)
end
end
class Api::V1::CategoriesController < ApplicationController
  def index
    @categories = Category.all.to_json
    render json: @categories
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

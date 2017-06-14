class CommentsController < ApplicationController

  def index
    @comments = Comment.all
    render json: { message: "ok", comments_data: @comments }
  end

  def show
    begin
      @comment = Comment.find(params[:id])
      render json: { message: "ok", comments_data: @comment }
    rescue ActiveRecord::RecordNotFound
      render json: { message: "no comment matches that ID" }
    rescue Exception
      render json: { message: "there was some other error" }
    end
  end

  def create
    begin
      @comment = Comment.new(comment_params)
      @comment.save 
      @all_comments = Comment.order(:id)
      render json: { message: "comment added successfully", comments_data: @all_comments }
    rescue Exception
      render json: { message: "there was an error" }, status: 500
    end
  end

  def update
    begin 
      @comment = Comment.find(params[:id])
      @comment.update(comment_params)
      @all_comments = Comment.order(:id)
      render json: { message: "comment updated successfully", comments_data: @all_comments }
    rescue Exception
      render json: { message: "there was an error" }
    end
  end
  
  def destroy
    begin
      @comment = Comment.find(params[:id])
      @comment.destroy
      @all_comments = Comment.order(:id)
      render json: { message: "ok", comments_data: @all_comments }
    rescue ActiveRecord::RecordNotFound
      render json: { message: "no comment matches that ID" }
    rescue Exception
      render json: { message: "there was some other error" }
    end
  end
  
  private
  def comment_params
    params.require(:comment).permit(:author, :content)
  end

end
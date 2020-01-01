class NotesController < ApplicationController
  before_action :set_group

  def index
    @note = Note.new
    @notes = @group.notes.includes(:user)
  end

  def create
    @note = @group.notes.new(note_params)
    if @note.save
      redirect_to group_notes_path(@group)
    else
      @notes = @group.notes.includes(:user)
      render :index
    end
  end

  private

  def note_params
    params.require(:note).permit(:text, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
  
end

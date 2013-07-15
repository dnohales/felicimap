class HappyMomentsController < ApplicationController
  
  # POST /happy_moments
  # POST /happy_moments.json
  def create
    @happy_moment = HappyMoment.new(params[:happy_moment])

    respond_to do |format|
      if @happy_moment.save
        format.html { redirect_to @happy_moment, notice: 'Happy moment was successfully created.' }
        format.json { render json: @happy_moment, status: :created, location: @happy_moment }
      else
        format.html { render action: "new" }
        format.json { render json: @happy_moment.errors, status: :unprocessable_entity }
      end
    end
  end

end

class HappyMomentsController < ApplicationController
  # GET /happy_moments
  # GET /happy_moments.json
  def index
    @happy_moments = HappyMoment.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @happy_moments }
    end
  end

  # GET /happy_moments/1
  # GET /happy_moments/1.json
  def show
    @happy_moment = HappyMoment.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @happy_moment }
    end
  end

  # GET /happy_moments/new
  # GET /happy_moments/new.json
  def new
    @happy_moment = HappyMoment.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @happy_moment }
    end
  end

  # GET /happy_moments/1/edit
  def edit
    @happy_moment = HappyMoment.find(params[:id])
  end

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

  # PUT /happy_moments/1
  # PUT /happy_moments/1.json
  def update
    @happy_moment = HappyMoment.find(params[:id])

    respond_to do |format|
      if @happy_moment.update_attributes(params[:happy_moment])
        format.html { redirect_to @happy_moment, notice: 'Happy moment was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @happy_moment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /happy_moments/1
  # DELETE /happy_moments/1.json
  def destroy
    @happy_moment = HappyMoment.find(params[:id])
    @happy_moment.destroy

    respond_to do |format|
      format.html { redirect_to happy_moments_url }
      format.json { head :no_content }
    end
  end
end

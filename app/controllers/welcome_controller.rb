class WelcomeController < ApplicationController
  def index
	@happy_moments = HappyMoment.all
	@happy_moment = HappyMoment.new
  	respond_to do |format|
      format.html # index.html.erb
    end
  end
end

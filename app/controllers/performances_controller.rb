class PerformancesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update]
  before_action :load_performance, except: [:index, :new, :create]

  def index
    @performances = Performance.all
  end

  def new
    @performance = Performance.new
  end

  def create
    @performance = Performance.new(performance_params)

    if @performance.save
      render :json => { :success => true }
    else
      render :new
    end
  end


  def update
    if @performance.update(performance_params)
      render :json => { :success => true }
    else
      render :edit
    end
  end

  def destroy
    @performance_id = params[:id]
    @performance.destroy

    respond_to do |format|
      format.html { redirect_to performances_path }
      format.js { render :destroy }
    end
  end

  private

  def load_performance
    @performance = Performance.find(params[:id])
  end

  def performance_params
    params.require(:performance).permit(:title, :video, :audio)
  end
end

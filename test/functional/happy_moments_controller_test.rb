require 'test_helper'

class HappyMomentsControllerTest < ActionController::TestCase
  setup do
    @happy_moment = happy_moments(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:happy_moments)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create happy_moment" do
    assert_difference('HappyMoment.count') do
      post :create, happy_moment: { content: @happy_moment.content, lat: @happy_moment.lat, lon: @happy_moment.lon }
    end

    assert_redirected_to happy_moment_path(assigns(:happy_moment))
  end

  test "should show happy_moment" do
    get :show, id: @happy_moment
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @happy_moment
    assert_response :success
  end

  test "should update happy_moment" do
    put :update, id: @happy_moment, happy_moment: { content: @happy_moment.content, lat: @happy_moment.lat, lon: @happy_moment.lon }
    assert_redirected_to happy_moment_path(assigns(:happy_moment))
  end

  test "should destroy happy_moment" do
    assert_difference('HappyMoment.count', -1) do
      delete :destroy, id: @happy_moment
    end

    assert_redirected_to happy_moments_path
  end
end

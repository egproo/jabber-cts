class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :set_locale

  def set_locale
    I18n.locale = current_user.locale if current_user
  end

  protected
  def render_ajax_form(object, success)
    if success
      if request.xhr?
        # FIXME: use Rails.application.routes.url_helpers
        render status: 200, json: { location: "/#{object.class.name.pluralize.underscore}/#{object.id}" }
      else
        redirect_to object
      end
    else
      render (object.new_record? ? :new : :edit), status: 400, layout: !request.xhr?
    end
  end

end

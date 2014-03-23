class EjabberdController < ApplicationController
  def sync
    @transactions = Ejabberd.new.build_transactions.map { |action, name, reason, object|
      ["#{name} #{action} (#{reason})", object]
    }
  end

  def commit
    ej = Ejabberd.new
    ts = ej.build_transactions
    Thread.new do
      logger.info "COMMITTING TRANSACTION: #{ts}"
      ej.apply_transactions ts
    end
    flash[:notice] = 'Commit is in progress. Please refresh this page in a few minutes'
    redirect_to :ejabberd_sync
  end
end

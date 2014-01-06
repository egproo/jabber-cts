class MoneyTransfer < ActiveRecord::Base
  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'
  has_many :payments
  attr_accessible :amount, :comment, :received

  validates_numericality_of :amount, in: 1..5000
  validates_presence_of :sender, :receiver, :amount

  def to_s
    "#{sender.name} -> #{receiver.name} $#{amount} at #{created_at.to_date}"
  end
end

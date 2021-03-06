class Contract < ActiveRecord::Base
  audited

  serialize :adhoc_data

  scope :active, -> { where(active: true) }

  belongs_to :buyer, class_name: 'User', inverse_of: :bought_contracts
  belongs_to :seller, class_name: 'User', inverse_of: :sold_contracts
  has_many :payments, dependent: :destroy, inverse_of: :contract
  has_one :last_payment, class_name: 'Payment', order: 'effective_from DESC', inverse_of: :contract

  attr_accessible :name, :next_amount_estimate, :type, :active, :comment
  accepts_nested_attributes_for :buyer, :seller, :payments

  validates :type, presence: true
  validates :buyer, presence: true
  validates :seller, presence: true

  def next_payment_date
    last_payment.try(:next_expected_date)
  end
end

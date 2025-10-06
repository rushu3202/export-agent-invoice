import { useState } from 'react';
import { User, CreditCard, Check, Zap, Crown } from 'lucide-react';

export default function ProfileBilling() {
  const [currentPlan, setCurrentPlan] = useState('free');

  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: '£0',
      period: 'forever',
      features: [
        '3 invoices per month',
        'Basic export forms',
        'Limited AI assistance',
        'Email support',
      ],
      icon: User,
      color: 'gray',
      buttonText: 'Current Plan',
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '£9.99',
      period: 'per month',
      features: [
        'Unlimited invoices',
        'All export forms',
        'Advanced AI assistance',
        'HS code intelligence',
        'Duty & freight estimates',
        'Priority support',
        'Export analytics',
      ],
      icon: Crown,
      color: 'blue',
      buttonText: 'Upgrade to Pro',
      popular: true,
    },
  ];

  const usageStats = {
    invoicesGenerated: 2,
    invoiceLimit: currentPlan === 'free' ? 3 : '∞',
    formsCompleted: 1,
    aiQueries: 5,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile & Billing</h1>
        <p className="mt-2 text-gray-600">
          Manage your account, subscription, and billing information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">Account</h3>
              <p className="text-sm text-gray-600">Demo User</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">demo@exportai.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Member since:</span>
              <span className="font-medium">Jan 2025</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">Current Plan</h3>
              <p className="text-sm text-gray-600">{currentPlan === 'free' ? 'Free' : 'Pro'}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Invoices:</span>
              <span className="font-medium">{usageStats.invoicesGenerated} / {usageStats.invoiceLimit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Forms:</span>
              <span className="font-medium">{usageStats.formsCompleted} completed</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">Billing</h3>
              <p className="text-sm text-gray-600">Payment method</p>
            </div>
          </div>
          <div className="text-sm">
            {currentPlan === 'free' ? (
              <p className="text-gray-600">No payment method required</p>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Card:</span>
                  <span className="font-medium">**** 4242</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next billing:</span>
                  <span className="font-medium">Feb 1, 2025</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-lg shadow-lg p-8 border-2 transition-all ${
                plan.popular
                  ? 'border-blue-500 scale-105'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="flex items-center mb-6">
                <div className={`w-14 h-14 bg-${plan.color}-100 rounded-full flex items-center justify-center`}>
                  <plan.icon className={`w-8 h-8 text-${plan.color}-600`} />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={currentPlan === plan.id}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  currentPlan === plan.id
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {currentPlan === plan.id ? plan.buttonText : plan.buttonText}
              </button>

              {plan.id === 'pro' && currentPlan === 'free' && (
                <p className="text-sm text-gray-600 text-center mt-4">
                  Start your 7-day free trial • Cancel anytime
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Need a custom enterprise solution?</h3>
        <p className="text-gray-600 mb-4">
          Contact us for volume pricing, custom integrations, and dedicated support
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors">
          Contact Sales
        </button>
      </div>
    </div>
  );
}

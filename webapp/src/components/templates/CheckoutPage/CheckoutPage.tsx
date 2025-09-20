import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/store";
import {
  nextStep,
  prevStep,
  setCurrentStep,
  updatePersonalInfo,
  updateBillingInfo,
  updatePaymentInfo,
  updateTerms,
  resetCheckout,
} from "@/store/slices/checkoutSlice";
import { clearCart } from "@/store/slices/cartSlice";
import { clearBooking } from "@/store/slices/bookingSlice";
import { Navigation } from "@/components/organisms/Navigation/Navigation";
import { Footer } from "@/components/organisms/Footer/Footer";
import {
  CheckoutSteps,
  CheckoutStep,
} from "@/components/molecules/CheckoutSteps/CheckoutSteps";
import { CheckoutSummary } from "@/components/organisms/CheckoutSummary/CheckoutSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, ArrowRight, CreditCard, ShieldCheck } from "lucide-react";

interface CheckoutPageProps {
  type: "products" | "services";
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ type }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkout = useSelector((state: RootState) => state.checkout);
  const cart = useSelector((state: RootState) => state.cart);
  const booking = useSelector((state: RootState) => state.booking);

  // Make sure we have items to checkout
  useEffect(() => {
    if (type === "products" && cart.items.length === 0) {
      navigate("/");
    } else if (type === "services" && !booking.selectedStylist) {
      navigate("/services");
    }
  }, [type, cart.items.length, booking.selectedStylist, navigate]);

  // Define steps for checkout process
  const steps: CheckoutStep[] = [
    {
      id: 1,
      name: "Personal Info",
      description: "Contact details",
    },
    {
      id: 2,
      name: type === "products" ? "Billing" : "Details",
      description:
        type === "products" ? "Shipping & address" : "Special requirements",
    },
    {
      id: 3,
      name: "Payment",
      description: "Secure checkout",
    },
    {
      id: 4,
      name: "Confirmation",
      description: "Review & confirm",
    },
  ];

  // Personal information form
  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(nextStep());
  };

  // Billing information form (for products)
  const handleBillingInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(nextStep());
  };

  // Special requirements form (for services)
  const handleSpecialRequirementsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(nextStep());
  };

  // Payment form
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkout.paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue.",
        variant: "destructive",
      });
      return;
    }
    dispatch(nextStep());
  };

  // Confirm and place order
  const handleConfirmOrder = () => {
    if (!checkout.acceptedTerms) {
      toast({
        title: "Terms & Conditions Required",
        description:
          "Please accept the terms and conditions to place your order.",
        variant: "destructive",
      });
      return;
    }

    // Simulate successful order placement
    setTimeout(() => {
      toast({
        title: type === "products" ? "Order Placed!" : "Appointment Booked!",
        description:
          type === "products"
            ? "Your order has been successfully placed. You will receive a confirmation email shortly."
            : "Your appointment has been successfully booked. You will receive a confirmation email shortly.",
        variant: "default",
      });

      // Clear relevant data
      if (type === "products") {
        dispatch(clearCart());
      } else {
        dispatch(clearBooking());
      }
      dispatch(resetCheckout());

      // Redirect to success page (to be created)
      navigate(type === "products" ? "/order-success" : "/booking-success");
    }, 1500);
  };

  const renderPersonalInfoForm = () => (
    <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={checkout.firstName}
            onChange={(e) =>
              dispatch(
                updatePersonalInfo({
                  ...checkout,
                  firstName: e.target.value,
                })
              )
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={checkout.lastName}
            onChange={(e) =>
              dispatch(
                updatePersonalInfo({
                  ...checkout,
                  lastName: e.target.value,
                })
              )
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={checkout.email}
          onChange={(e) =>
            dispatch(
              updatePersonalInfo({
                ...checkout,
                email: e.target.value,
              })
            )
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={checkout.phone}
          onChange={(e) =>
            dispatch(
              updatePersonalInfo({
                ...checkout,
                phone: e.target.value,
              })
            )
          }
          required
        />
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" className="bg-gradient-luxury" size="lg">
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );

  const renderBillingForm = () => (
    <form onSubmit={handleBillingInfoSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address1">Street Address</Label>
        <Input
          id="address1"
          value={checkout.address1}
          onChange={(e) =>
            dispatch(
              updateBillingInfo({
                ...checkout,
                address1: e.target.value,
              })
            )
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
        <Input
          id="address2"
          value={checkout.address2}
          onChange={(e) =>
            dispatch(
              updateBillingInfo({
                ...checkout,
                address2: e.target.value,
              })
            )
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={checkout.city}
            onChange={(e) =>
              dispatch(
                updateBillingInfo({
                  ...checkout,
                  city: e.target.value,
                })
              )
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={checkout.state}
            onChange={(e) =>
              dispatch(
                updateBillingInfo({
                  ...checkout,
                  state: e.target.value,
                })
              )
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={checkout.postalCode}
            onChange={(e) =>
              dispatch(
                updateBillingInfo({
                  ...checkout,
                  postalCode: e.target.value,
                })
              )
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          value={checkout.country}
          onChange={(e) =>
            dispatch(
              updateBillingInfo({
                ...checkout,
                country: e.target.value,
              })
            )
          }
          required
        />
      </div>

      <div className="pt-4 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch(prevStep())}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="submit" className="bg-gradient-luxury" size="lg">
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );

  const renderSpecialRequirementsForm = () => (
    <form onSubmit={handleSpecialRequirementsSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="specialRequirements">
          Special Requirements or Notes
        </Label>
        <Textarea
          id="specialRequirements"
          placeholder="Any special requests, allergies, or notes for your stylist?"
          value={checkout.specialRequirements}
          onChange={(e) =>
            dispatch(
              updateBillingInfo({
                ...checkout,
                specialRequirements: e.target.value,
              })
            )
          }
          className="min-h-32"
        />
      </div>

      <div className="pt-4 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch(prevStep())}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="submit" className="bg-gradient-luxury" size="lg">
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );

  const renderPaymentForm = () => (
    <form onSubmit={handlePaymentSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label>Payment Method</Label>

        <RadioGroup
          value={checkout.paymentMethod || ""}
          onValueChange={(value) =>
            dispatch(
              updatePaymentInfo({
                paymentMethod: value as "credit-card" | "paypal",
              })
            )
          }
          className="space-y-4"
        >
          <div>
            <RadioGroupItem
              value="credit-card"
              id="credit-card"
              className="peer sr-only"
            />
            <Label
              htmlFor="credit-card"
              className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 rounded-md border p-4 hover:bg-muted cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
            >
              <CreditCard className="h-6 w-6 text-primary" />
              <div className="flex-1">
                <div className="font-semibold">Credit / Debit Card</div>
                <div className="text-sm text-muted-foreground">
                  Pay securely with your card
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {checkout.paymentMethod === "credit-card" && (
        <div className="bg-muted/30 p-4 rounded-lg border space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nameOnCard">Name on Card</Label>
            <Input
              id="nameOnCard"
              value={checkout.nameOnCard}
              onChange={(e) =>
                dispatch(
                  updatePaymentInfo({
                    paymentMethod: "credit-card",
                    nameOnCard: e.target.value,
                  })
                )
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={checkout.cardNumber}
              onChange={(e) =>
                dispatch(
                  updatePaymentInfo({
                    paymentMethod: "credit-card",
                    cardNumber: e.target.value,
                  })
                )
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardExpiry">Expiry Date</Label>
              <Input
                id="cardExpiry"
                placeholder="MM / YY"
                value={checkout.cardExpiry}
                onChange={(e) =>
                  dispatch(
                    updatePaymentInfo({
                      paymentMethod: "credit-card",
                      cardExpiry: e.target.value,
                    })
                  )
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardCvc">CVC / CVV</Label>
              <Input
                id="cardCvc"
                type="password"
                placeholder="•••"
                value={checkout.cardCvc}
                onChange={(e) =>
                  dispatch(
                    updatePaymentInfo({
                      paymentMethod: "credit-card",
                      cardCvc: e.target.value,
                    })
                  )
                }
                required
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 pt-4">
        <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Your payment information is encrypted and secure. We never store your
          full credit card details.
        </p>
      </div>

      <div className="pt-4 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch(prevStep())}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="submit" className="bg-gradient-luxury" size="lg">
          Review Order <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      <Card className="border-primary/10">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <span className="block text-sm text-muted-foreground">
                  Name
                </span>
                <span>
                  {checkout.firstName} {checkout.lastName}
                </span>
              </p>
              <p>
                <span className="block text-sm text-muted-foreground">
                  Email
                </span>
                <span>{checkout.email}</span>
              </p>
              <p>
                <span className="block text-sm text-muted-foreground">
                  Phone
                </span>
                <span>{checkout.phone}</span>
              </p>
            </div>
          </div>

          {type === "products" && (
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Shipping Address</h3>
              <p>
                {checkout.address1}
                <br />
                {checkout.address2 && (
                  <>
                    {checkout.address2}
                    <br />
                  </>
                )}
                {checkout.city}, {checkout.state} {checkout.postalCode}
                <br />
                {checkout.country}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-medium text-lg">Payment Method</h3>
            <p className="flex items-center">
              {checkout.paymentMethod === "credit-card" && (
                <>
                  <CreditCard className="h-5 w-5 mr-2 text-primary" />
                  Credit Card ending in {checkout.cardNumber.slice(-4)}
                </>
              )}
            </p>
          </div>

          {checkout.specialRequirements && (
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Special Requirements</h3>
              <p>{checkout.specialRequirements}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={checkout.acceptedTerms}
            onCheckedChange={(checked) =>
              dispatch(
                updateTerms({
                  ...checkout,
                  acceptedTerms: checked as boolean,
                })
              )
            }
            className="mt-1"
          />
          <div className="space-y-1 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and conditions and privacy policy
            </label>
            <p className="text-sm text-muted-foreground">
              By placing this order, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="marketing"
            checked={checkout.marketingConsent}
            onCheckedChange={(checked) =>
              dispatch(
                updateTerms({
                  ...checkout,
                  marketingConsent: checked as boolean,
                })
              )
            }
            className="mt-1"
          />
          <div className="space-y-1 leading-none">
            <label
              htmlFor="marketing"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email me about special promotions, products and events
            </label>
            <p className="text-sm text-muted-foreground">
              We will never share your email with third parties.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch(prevStep())}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          className="bg-gradient-luxury"
          size="lg"
          onClick={handleConfirmOrder}
        >
          {type === "products" ? "Place Order" : "Book Appointment"}
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (checkout.currentStep) {
      case 1:
        return renderPersonalInfoForm();
      case 2:
        return type === "products"
          ? renderBillingForm()
          : renderSpecialRequirementsForm();
      case 3:
        return renderPaymentForm();
      case 4:
        return renderConfirmation();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-h1 font-light text-center mb-8">
          <span className="bg-gradient-luxury bg-clip-text text-transparent">
            {type === "products" ? "Checkout" : "Book Appointment"}
          </span>
        </h1>

        <CheckoutSteps
          steps={steps}
          currentStep={checkout.currentStep}
          onStepClick={(stepId) => dispatch(setCurrentStep(stepId))}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            {renderCurrentStep()}
          </div>

          <div className="lg:col-span-1 order-1 lg:order-2">
            <CheckoutSummary type={type} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckoutStep {
  id: number;
  name: string;
  description: string;
}

interface CheckoutStepsProps {
  steps: CheckoutStep[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
  allowNavigation?: boolean;
}

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowNavigation = true,
}) => {
  const handleStepClick = (stepId: number) => {
    if (allowNavigation && onStepClick && stepId < currentStep) {
      onStepClick(stepId);
    }
  };

  return (
    <nav aria-label="Checkout Progress" className="mb-8">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step) => (
          <li key={step.id} className="md:flex-1">
            <div
              onClick={() => handleStepClick(step.id)}
              className={cn(
                "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                step.id < currentStep
                  ? "border-primary cursor-pointer"
                  : step.id === currentStep
                  ? "border-primary"
                  : "border-muted-foreground/30 cursor-default",
              )}
            >
              <span className="text-sm font-medium">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border mr-3",
                      step.id < currentStep
                        ? "border-primary bg-primary/10 text-primary"
                        : step.id === currentStep
                        ? "border-primary text-primary"
                        : "border-muted-foreground/50 text-muted-foreground/50"
                    )}
                  >
                    {step.id < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      step.id < currentStep
                        ? "text-primary hover:underline"
                        : step.id === currentStep
                        ? "text-primary"
                        : "text-muted-foreground/50"
                    )}
                  >
                    {step.name}
                  </span>
                </div>
              </span>
              <span
                className={cn(
                  "mt-1 text-sm",
                  step.id === currentStep
                    ? "text-muted-foreground"
                    : "text-muted-foreground/50"
                )}
              >
                {step.description}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CheckoutSteps;
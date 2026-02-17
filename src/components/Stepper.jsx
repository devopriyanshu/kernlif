import React, { useState, Children, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange, 
  onFinalStepCompleted, 
  onNext, // New prop: Return false to block navigation
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = newStep => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      if (onFinalStepCompleted) onFinalStepCompleted();
    } else {
      if (onStepChange) onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = async () => {
    // Check if onNext allows proceeding
    if (onNext) {
        const shouldProceed = await onNext(currentStep); // allow async validation if needed
        if (shouldProceed === false) return;
    }

    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = async () => {
    // Check if onNext allows completion too
    if (onNext) {
        const shouldProceed = await onNext(currentStep);
        if (shouldProceed === false) return;
    }

    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className="flex flex-col min-h-full flex-1 items-center justify-center p-4 sm:aspect-[4/3] md:aspect-[2/1] w-full" {...rest}>
      <div 
        className={`w-full max-w-4xl mx-auto rounded-2xl shadow-xl bg-white border border-gray-100 overflow-hidden flex flex-col ${stepCircleContainerClassName}`}
      >
        <div className={`flex w-full items-center p-6 md:p-8 border-b border-gray-100 ${stepContainerClassName}`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: async (clicked) => {
                      if (clicked === currentStep) return;
                      // Only validating FORWARD navigation usually, but let's see.
                      // If jumping forward past current + 1, we might block? 
                      // Or if jumping forward from currentStep, validate current.
                      if (clicked > currentStep && onNext && (await onNext(currentStep)) === false) return;

                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={async (clicked) => {
                      if (clicked > currentStep && onNext && (await onNext(currentStep)) === false) return;
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`relative overflow-hidden flex-1 ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={`p-6 md:p-8 bg-gray-50 border-t border-gray-100 ${footerClassName}`}>
            <div className={`flex ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className={`transition-all duration-300 rounded-lg px-6 py-2.5 text-gray-500 font-medium hover:bg-gray-200 hover:text-gray-700 ${currentStep === 1 ? 'pointer-events-none opacity-50' : ''}`}
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button 
                onClick={isLastStep ? handleComplete : handleNext} 
                className="transition-all duration-300 flex items-center justify-center rounded-full bg-blue-600 text-white font-medium px-8 py-2.5 hover:bg-blue-700 shadow-lg hover:shadow-blue-200" 
                {...nextButtonProps} // Props spread last, so be careful if onClick is passed here
              >
                {isLastStep ? 'Complete' : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {
  const [parentHeight, setParentHeight] = useState('auto');

  return (
    <motion.div
      className={className}
      animate={{ height: isCompleted ? 0 : (parentHeight || 'auto') }}
      transition={{ type: 'spring', duration: 0.4 }}
      style={{ minHeight: '100px' }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentRect) onHeightReady(entry.contentRect.height);
      }
    });
    observer.observe(containerRef.current);
    if (containerRef.current.offsetHeight > 0) onHeightReady(containerRef.current.offsetHeight);
    else setTimeout(() => { if (containerRef.current) onHeightReady(containerRef.current.offsetHeight); }, 50);
    return () => observer.disconnect();
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="absolute left-0 right-0 top-0 w-full"
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: dir => ({ x: dir >= 0 ? '-100%' : '100%', opacity: 0, position: 'absolute' }),
  center: { x: '0%', opacity: 1, position: 'relative' },
  exit: dir => ({ x: dir >= 0 ? '50%' : '-50%', opacity: 0, position: 'absolute' })
};

export function Step({ children }) {
  return <div className="px-6 md:px-10 py-4 h-full">{children}</div>;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';
  const handleClick = () => { if (step !== currentStep && !disableStepIndicators) onClickStep(step); };
  return (
    <motion.div onClick={handleClick} className="relative cursor-pointer outline-none" animate={status} initial={false}>
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: '#f3f4f6', color: '#9ca3af', border: '2px solid #e5e7eb' },
          active: { scale: 1.1, backgroundColor: '#eff6ff', color: '#2563eb', border: '2px solid #2563eb' },
          complete: { scale: 1, backgroundColor: '#2563eb', color: '#ffffff', border: '2px solid #2563eb' }
        }}
        transition={{ duration: 0.3 }}
        className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm shadow-sm z-10 relative"
      >
        {status === 'complete' ? <CheckIcon className="h-5 w-5" /> : <span className="step-number">{step}</span>}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  const lineVariants = { incomplete: { width: 0, backgroundColor: 'transparent' }, complete: { width: '100%', backgroundColor: '#2563eb' } };
  return (
    <div className="relative mx-2 h-1 flex-1 overflow-hidden rounded-full bg-gray-200">
      <motion.div className="absolute left-0 top-0 h-full" variants={lineVariants} initial={false} animate={isComplete ? 'complete' : 'incomplete'} transition={{ duration: 0.4 }} />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }} strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

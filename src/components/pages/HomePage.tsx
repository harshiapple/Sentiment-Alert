// HPI 1.4-G
import React, { useState, useEffect, useRef } from 'react';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, BarChart3, Settings } from 'lucide-react';
import { Image } from '@/components/ui/image';
// The user's code did not provide an Image component, so we define a basic one.
// In a real project, this would likely be a more advanced component (e.g., from Next.js).
const CustomImage = ({ src, alt, className, width, height }: { 
  src: string; 
  alt: string; 
  className?: string; 
  width?: number; 
  height?: number; 
}) => (

  <Image src={src} alt={alt} className={className} width={width} height={height} loading="lazy" />
);

// A simple hook for Intersection Observer to add animations on scroll.
const useIntersectionObserver = (options: IntersectionObserverInit): [React.RefObject<HTMLDivElement>, boolean] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

const AnimatedElement = ({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number; 
}) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function HomePage() {
  const { isAuthenticated, actions } = useMember();
  const features = [
    {
      icon: Mail,
      title: '01. Email Analysis',
      description: 'Automatically analyze feedback emails with advanced sentiment detection and categorization. Our system intelligently flags critical issues, allowing your team to prioritize effectively.',
    },
    {
      icon: BarChart3,
      title: '02. Smart Analytics',
      description: 'Gain deep insights with comprehensive analytics and visual reports on feedback trends. Track sentiment over time, identify recurring themes, and measure team performance.',
    },
    {
      icon: Settings,
      title: '03. AI Responses',
      description: 'Receive intelligent, context-aware response suggestions powered by AI to handle negative feedback with empathy and efficiency. Edit and approve responses in a single click.',
    },
  ];

  return (
    <div className="bg-background font-paragraph text-foreground overflow-clip">
      <style>{`
        .architectural-rule {
          width: 1px;
          background-color: #A8998A; /* soft-gold */
        }
        .ghost-button {
          border: 1px solid #A8998A; /* soft-gold */
          color: #A8998A; /* soft-gold */
          background-color: transparent;
          transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        }
        .ghost-button:hover {
          background-color: rgba(168, 153, 138, 0.1); /* soft-gold with 10% opacity */
        }
        .ghost-button-primary {
          border: 1px solid #3B82F6; /* primary */
          color: #3B82F6; /* primary */
          background-color: transparent;
          transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
        }
        .ghost-button-primary:hover {
          background-color: #3B82F6; /* primary */
          color: #FFFFFF; /* primary-foreground */
        }
      `}</style>

      {/* Hero Section */}
      <section className="w-full min-h-[80vh] flex items-center py-24 md:py-32">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-12 gap-x-8 items-center">
            <div className="col-span-12 md:col-span-7 relative z-10">
              <AnimatedElement>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading text-foreground">
                  EchoMail
                </h1>
              </AnimatedElement>
              <AnimatedElement delay={150}>
                <p className="text-xl font-heading text-primary mt-4 mb-6">
                  Elevate Your Feedback
                </p>
                <p className="text-lg text-secondary max-w-xl">
                  Transform customer feedback into actionable insights with AI-powered analysis and intelligent response suggestions. Our platform provides the clarity and confidence to build better customer relationships.
                </p>
              </AnimatedElement>
              <AnimatedElement delay={300} className="mt-10">
                {isAuthenticated ? (
                  <Button
                    asChild
                    size="lg"
                    className="ghost-button-primary text-base font-medium px-8 py-6"
                  >
                    <a href="/dashboard">
                      Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    onClick={actions.login}
                    size="lg"
                    className="ghost-button-primary text-base font-medium px-8 py-6"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </AnimatedElement>
            </div>
            <div className="hidden md:block md:col-span-5 relative h-full">
              <div className="absolute top-1/2 left-1/4 h-[200%] w-px bg-soft-gold/30 -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 h-full w-px bg-soft-gold/30 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="w-full py-24 md:py-32 bg-white">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <AnimatedElement className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-foreground">
              From Noise to Insight
            </h2>
            <p className="text-lg text-secondary mt-6">
              We believe that every piece of feedback is a gift. But in a world of overwhelming data, finding the signal in the noise is the real challenge. Our mission is to provide you with the tools to listen, understand, and act with quiet confidence and precision.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-24 md:py-40">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <AnimatedElement>
                  <h2 className="text-5xl md:text-6xl font-heading text-foreground leading-tight">
                    Intelligent Feedback Management
                  </h2>
                  <p className="mt-6 text-lg text-secondary">
                    Streamline your entire feedback lifecycle with a process designed for clarity and efficiency.
                  </p>
                </AnimatedElement>
              </div>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <div className="relative flex flex-col gap-24">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/10" />
                {features.map((feature, index) => (
                  <AnimatedElement key={feature.title} delay={index * 150}>
                    <div className="grid grid-cols-12 gap-x-6 relative">
                      <div className="col-span-2 md:col-span-1 flex justify-center">
                        <div className="w-12 h-12 rounded-full border border-primary/20 bg-background flex items-center justify-center text-primary">
                          <feature.icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="col-span-10 md:col-span-11">
                        <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
                          {feature.title}
                        </h3>
                        <p className="mt-4 text-base md:text-lg text-secondary max-w-2xl">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Showcase */}
      <section className="w-full py-24 md:py-32 bg-white">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <AnimatedElement className="text-center">
            <h2 className="text-4xl md:text-5xl font-heading text-foreground">
              Your Command Center
            </h2>
            <p className="text-lg text-secondary mt-4 max-w-3xl mx-auto">
              A clean, sophisticated, and highly usable interface designed for focus and clarity.
            </p>
          </AnimatedElement>
          <AnimatedElement delay={200} className="mt-16">
            <div className="bg-background p-4 md:p-6 border border-black/5 rounded-xl shadow-2xl shadow-black/5">
              <CustomImage
                src="https://static.wixstatic.com/media/2c8724_522d10aebe224da1bc5b483e91a19a9a~mv2.png?originWidth=1600&originHeight=896"
                alt="A clean and modern dashboard interface for feedback management, showing charts and a list of emails."
                width={1600}
                height={900}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full py-24 md:py-40">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-12 gap-x-8">
            <div className="hidden md:block md:col-span-1">
              <div className="w-px h-full mx-auto architectural-rule" />
            </div>
            <div className="col-span-12 md:col-span-10">
              <AnimatedElement>
                <blockquote className="text-center">
                  <p className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground leading-snug">
                    “This platform didn't just organize our feedback; it transformed our entire approach to customer communication. The clarity it provides is invaluable.”
                  </p>
                  <footer className="mt-8">
                    <p className="text-base font-semibold text-foreground">Jane Doe, Head of Customer Experience</p>
                    <p className="text-sm text-secondary">Acme Inc.</p>
                  </footer>
                </blockquote>
              </AnimatedElement>
            </div>
            <div className="hidden md:block md:col-span-1">
              <div className="w-px h-full mx-auto architectural-rule" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="w-full py-24 md:py-32 bg-white">
          <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
            <AnimatedElement className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Ready to Transform Your Feedback Process?
              </h2>
              <p className="text-lg text-secondary mt-6 mb-10">
                Join companies that trust our platform to build stronger customer relationships through intelligent feedback management.
              </p>
              <Button
                onClick={actions.login}
                size="lg"
                className="ghost-button text-base font-medium px-10 py-6"
              >
                Start Your Free Trial
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </AnimatedElement>
          </div>
        </section>
      )}
    </div>
  );
}
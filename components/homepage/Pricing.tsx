import Balancer from "react-wrap-balancer";
import { Container, Section } from "../craft";
import { Button } from "../ui/button";
import { CircleCheck } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface PricingCardProps {
  title: "Free" | "Starter" | "Pro";
  price: string;
  description?: string;
  features: string[];
  cta: string;
  href: string;
}

// Dummy pricing data
const pricingData: PricingCardProps[] = [
  {
    title: "Free",
    price: "$0/month",
    description: "Get started with socialcraft for free.",
    features: ["10 posts/month", "Basic History Tracking", "Basic Support", ],
    cta: "Choose Basic",
    href: "/generate",
  },
  {
    title: "Starter",
    price: "$19/month",
    description: "Great for individuals and small-scale creators.",
    features: ["50 posts/month", "Advanced History Tracking", "Priority Support", ],
    cta: "Choose Standard",
    href: "/generate",
  },
  {
    
    title: "Pro",
    price: "$49/month",
    description: "Designed for growing brands and businesses.",
    features: ["Unlimited posts/month", "Pro Tracking & Analytics", "24/7 Support", ],
    cta: "Choose Pro",
    href: "/generate",
  },
];

const Pricing = () => {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="!my-0">Pricing</h2>
        <p className="text-lg opacity-70 md:text-2xl">
          <Balancer>Select the plan that best suits your needs.</Balancer>
        </p>

        <div className="not-prose mt-4 grid grid-cols-1 gap-6 min-[850px]:grid-cols-3">
          {pricingData.map((plan, index) => (
            <PricingCard plan={plan} key={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

const PricingCard = ({ plan }: { plan: PricingCardProps }) => {
  return (
    <div className="flex flex-col rounded-lg border p-6">
      <div className="text-center">
        <Badge>{plan.title}</Badge>
        <h4 className="mb-2 mt-4 text-2xl text-primary">{plan.price}</h4>
        <p className="text-sm opacity-70">{plan.description}</p>
      </div>

      <div className="my-4 border-t"></div>

      <ul className="space-y-3 text-left">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm opacity-70">
            <CircleCheck className="mr-2 h-4 w-4" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link href={plan.href} target="_blank">
          <Button size={"sm"} className="w-full">
            {plan.cta}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Pricing;

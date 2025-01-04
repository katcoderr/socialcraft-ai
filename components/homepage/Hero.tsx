import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { ArrowRight, Zap } from "lucide-react";

  
import { Button } from "@/components/ui/button";

  
import { Section, Container } from "@/components/craft";

  
import Placeholder from "@/public/hero.jpg";

export default function Hero() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center text-center">
          <Button
            asChild
            className="not-prose mb-6 flex w-fit"
            size="sm"
            variant="outline"
          >
            <Link href="/generate">
              Generate Now <Zap className="ml-2 w-4" />
            </Link>
          </Button>
          <h1 className="!mb-0">
            <Balancer>
            Unleash Your Creativity with AI-Powered Content!
            </Balancer>
          </h1>
          <h3 className="text-muted-foreground">
            <Balancer>
            Streamline your content strategy with socialcraft that spark engagement and growth like never before.
            </Balancer>
          </h3>
          <div className="my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
            <Image
              className="not-prose h-full w-full object-cover object-bottom"
              src={Placeholder}
              width={1920}
              height={1080}
              alt="hero image"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

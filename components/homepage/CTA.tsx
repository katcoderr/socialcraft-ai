   
import Link from "next/link";

   
import Balancer from "react-wrap-balancer";

   
import { Button } from "@/components/ui/button";

   
import { Section, Container } from "@/components/craft";

const CTA = () => {
  return (
    <Section className="px-4">
      <Container className="flex flex-col items-center gap-6 rounded-lg border bg-accent/50 p-6 text-center md:rounded-xl md:p-12">
        <h2 className="!my-0">Ready to Transform Your Social Media Strategy?</h2>
        <h3 className="!mb-0 text-muted-foreground">
          <Balancer>
          
          Sign up today and let AI do the heavy lifting. Create captivating content for LinkedIn, Instagram, and X effortlessly!
          </Balancer>
        </h3>
        <div className="not-prose mx-auto flex items-center gap-2">
          <Button className="w-fit" asChild>
            <Link href="/generate">Get Started</Link>
          </Button>
          
        </div>
      </Container>
    </Section>
  );
};

export default CTA;

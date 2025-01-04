import { Main, Section, Container } from "@/components/craft"
import CTA from "@/components/homepage/CTA";
import Feature from "@/components/homepage/Features";
import Footer from "@/components/homepage/Footer";
import Hero from "@/components/homepage/Hero";
import Pricing from "@/components/homepage/Pricing";

export default function Home() {
  return (
    <Main>
      <Section>
        <Container>
          <Hero/>
          <Feature/>
          <Pricing/>
          <CTA/>
          <Footer/>
        </Container>
      </Section>
    </Main>
  );
}

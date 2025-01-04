 
import Image from "next/image";
import Link from "next/link";

 
import Balancer from "react-wrap-balancer";

 
import { Button } from "../ui/button";

 
import { Github, Twitter, Facebook } from "lucide-react";

 
import { Section, Container } from "../craft";

 
import Logo from "@/public/logo.png";

export default function Footer() {
  return (
    <footer>
      <Section>
        <Container className="grid gap-12 md:grid-cols-[1.5fr_0.5fr_0.5fr]">
          <div className="not-prose flex flex-col gap-6">
            <Link href="/">
              <h3 className="sr-only"></h3>
              <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={27.27}
                className="transition-all hover:opacity-75 dark:invert"
              ></Image>
            </Link>
            <p>
              <Balancer>
              Crafting Your Social Success - <br /> 
              Powered by SocialCraft
              </Balancer>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h5>Website</h5>
            <Link href="/">Blog</Link>
            <Link href="/">Authors</Link>
            <Link href="/">Categories</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h5>Legal</h5>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms of Service</Link>
            <Link href="/">Cookie Policy</Link>
          </div>
        </Container>
        <Container className="not-prose flex flex-col justify-between gap-6 border-t md:flex-row md:items-center md:gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Github />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter />
            </Button>
            <Button variant="outline" size="icon">
              <Facebook />
            </Button>
          </div>
          <p className="text-muted-foreground">
            ©{" "}
            <a href="/">socialcraft</a>.
            All rights reserved. 2024-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
}

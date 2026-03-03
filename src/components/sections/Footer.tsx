import { Mail, MessageCircle, Send } from "lucide-react";
import { motion } from "motion/react";

import { Container } from "@/components/layout";
import { Body50 } from "@/components/ui";
import LightLogo from "@/assets/Light Logo.svg";

export function Footer() {
  const email = import.meta.env.VITE_EMAIL;
  const telegram = import.meta.env.VITE_TELEGRAM;
  const whatsapp = import.meta.env.VITE_WHATSAPP;

  return (
    <footer className="border-t border-dashed border-white/10 py-8 lg:py-10 xl:py-12">
      <Container className="flex flex-row items-center justify-between gap-6 pt-0.75 md:flex-row md:gap-8">
        <div className="group flex cursor-pointer items-center gap-2">
          <img
            src={LightLogo}
            alt="bzvstudio logo"
            className="-mt-0.75 h-8 w-auto opacity-90 transition-opacity group-hover:opacity-100"
          />
        </div>

        <div className="flex items-center gap-6">
          <motion.a
            href={`mailto:${email}`}
            className="text-muted-foreground flex items-center gap-2 transition-colors hover:text-white"
            whileHover="hover"
            initial="initial"
            data-umami-event="Footer - Email Link"
          >
            <motion.div
              variants={{
                hover: { rotate: [0, -10, 10, -5, 5, 0] },
                initial: { rotate: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Mail className="h-5 w-5" />
            </motion.div>
            <Body50 as="span" className="hidden sm:inline">
              Email
            </Body50>
          </motion.a>
          <motion.a
            href={telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground flex items-center gap-2 transition-colors hover:text-white"
            whileHover="hover"
            initial="initial"
            data-umami-event="Footer - Telegram Link"
          >
            <motion.div
              variants={{
                hover: { rotate: [0, -10, 10, -5, 5, 0] },
                initial: { rotate: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Send className="h-5 w-5" />
            </motion.div>
            <Body50 as="span" className="hidden sm:inline">
              Telegram
            </Body50>
          </motion.a>
          <motion.a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground flex items-center gap-2 transition-colors hover:text-white"
            whileHover="hover"
            initial="initial"
            data-umami-event="Footer - WhatsApp Click"
          >
            <motion.div
              variants={{
                hover: { rotate: [0, -10, 10, -5, 5, 0] },
                initial: { rotate: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <MessageCircle className="h-5 w-5" />
            </motion.div>
            <Body50 as="span" className="hidden sm:inline">
              WhatsApp
            </Body50>
          </motion.a>
        </div>
      </Container>
    </footer>
  );
}

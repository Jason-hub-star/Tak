import { MessageCircle } from "lucide-react";
import { FINAL_CTA_COPY, KAKAO_CHANNEL_URL } from "@/lib/constants";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export default function FinalCTASection() {
  return (
    <Section bg="muted" containerClassName="text-center">
      <Reveal y={24} duration={0.5} className="max-w-2xl mx-auto">
        <h2 className="text-display-sm md:text-display-md font-bold leading-tight text-foreground">
          {FINAL_CTA_COPY.headline}
        </h2>

        <p className="mt-4 text-muted-foreground text-base md:text-lg">
          {FINAL_CTA_COPY.sub}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Button href="/contact" variant="primary" size="lg" fullWidth>
            {FINAL_CTA_COPY.primaryCta}
          </Button>

          <Button
            href={KAKAO_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            fullWidth
            leadingIcon={<MessageCircle size={18} />}
          >
            {FINAL_CTA_COPY.secondaryCta}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

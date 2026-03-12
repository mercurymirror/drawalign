import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { TeamMemberCard } from "@/components/ui/TeamMemberCard";
import { buildPageMetadata } from "@/lib/metadata";
import { getContactPage, getGlobal } from "@/lib/strapi";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const [page, global] = await Promise.all([
    getContactPage(locale),
    getGlobal(locale),
  ]);
  return buildPageMetadata(page?.seo, global?.seo);
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const [page, global] = await Promise.all([
    getContactPage(locale),
    getGlobal(locale),
  ]);

  if (!page) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">
          Contact page not published yet. (locale: {locale})
        </p>
      </main>
    );
  }

  return (
    <main>
      {page.hero && (
        <PageHero
          eyebrow={page.hero.eyebrow}
          title={page.hero.title}
          subtitle={page.hero.text}
        />
      )}

      {/* Team members */}
      {page.team_members && page.team_members.length > 0 && (
        <Section className="flex flex-col gap-5 md:py-5">
          {page.team_members.map((member) => (
            <TeamMemberCard key={member.id} {...member} />
          ))}
        </Section>
      )}

      {/* Bento : formulaire + coordonnées */}
      <Section variant="default" className="md:py-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Formulaire */}
          <div className="flex flex-col gap-6 rounded-2xl bg-primary p-8 text-white lg:p-10">
            <h2 className="text-[32px] tracking-tight">
              Envoyez-nous un message
            </h2>
            <ContactForm />
          </div>

          {/* Coordonnées */}
          <div className="flex flex-col gap-6 rounded-2xl bg-secondary p-8 text-white lg:p-10">
            <h2 className="text-[32px] tracking-tight">Nos coordonnées</h2>
            <div className="flex flex-col gap-4 text-sm lg:text-xl">
              {page.adress && (
                <p className="whitespace-pre-line">{page.adress}</p>
              )}
              <div>
                <Image
                  src="icon/mail.svg"
                  alt="Email"
                  width={16}
                  height={16}
                  className="mr-2 inline-block"
                />
                {page.mail && (
                  <a href={`mailto:${page.mail}`} className="">
                    {page.mail}
                  </a>
                )}
              </div>
              <div>
                <Image
                  src="icon/phone.svg"
                  alt="Phone"
                  width={16}
                  height={16}
                  className="mr-2 inline-block"
                />
                {page.phone && <a href={`tel:${page.phone}`}>{page.phone}</a>}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Photo équipe */}
      {global?.teamPhoto && (
        <section className="overflow-hidden bg-primary lg:px-28">
          <StrapiImage image={global.teamPhoto} className="w-full" />
        </section>
      )}
    </main>
  );
}

import Link from "next/link";
import { clinic } from "@/config/clinic";
import { buttonClass } from "@/components/ui/Button";
import { PendingBadge, PendingText } from "@/components/ui/Placeholder";
import { SignatureLine } from "@/components/ui/SignatureLine";
import { AutoVideo } from "@/components/client/AutoVideo";

export function About() {
  const { vet, showPlaceholderNotes: notes } = clinic;

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="border-t border-line py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative mx-auto w-full max-w-[440px] lg:col-span-5 lg:max-w-none" data-reveal>
          <AutoVideo video={vet.video} className="aspect-[4/5] rounded-media" />
          <p className="mt-3 text-sm text-ink-muted">Vídeo de apresentação publicado no Instagram da clínica.</p>
          <SignatureLine
            trigger="scroll"
            className="pointer-events-none absolute -right-20 -bottom-6 hidden w-60 -scale-x-100 text-sage lg:block"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div data-reveal>
            <p className="eyebrow flex items-center gap-3 text-sage">
              <span aria-hidden="true" className="h-px w-8 bg-current" />O veterinário
            </p>
            <h2 id="sobre-title" className="text-h2 mt-5 text-balance">
              Quem cuida do seu pet.
            </h2>
          </div>

          <div data-reveal className="mt-10 border-t border-line pt-8">
            <p className="flex flex-wrap items-center gap-3 font-display text-[1.75rem] leading-tight">
              {vet.name ?? <PendingText>Nome do veterinário</PendingText>}
              {!vet.name && <PendingBadge />}
            </p>
            <p className="mt-2 text-sm font-semibold tracking-wide text-sage">
              {vet.title}
              {vet.crmv && ` · ${vet.crmv}`}
            </p>

            {vet.bio ? (
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-muted">{vet.bio}</p>
            ) : (
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
                No vídeo, {vet.name ? vet.name.split(" ")[0] : `o fundador da ${clinic.name}`} conta a sua trajetória e o propósito da clínica: entender o
                paciente e ouvir o responsável em cada atendimento.
                {notes && (
                  <span className="mt-4 block text-base italic">
                    [Texto de apresentação e CRMV.]
                  </span>
                )}
              </p>
            )}

            {clinic.specialists.map((s) => (
              <p key={s.name} className="mt-8 max-w-[52ch] border-t border-line pt-6 leading-relaxed text-ink-muted">
                Em alguns dias, mediante agendamento, a clínica recebe também a médica veterinária{" "}
                <span className="font-semibold text-forest">{s.name}</span>, que atende{" "}
                <Link
                  href="/servicos/pets-nao-convencionais"
                  className="font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest"
                >
                  pets não convencionais e animais silvestres
                </Link>
                .
              </p>
            ))}

            <Link href="/consulta?servico=consulta" className={buttonClass("outline", "mt-10")}>
              Agendar uma consulta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

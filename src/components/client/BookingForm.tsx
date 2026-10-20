"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { Bird, Cat, ChevronDown, CircleAlert, Dog, PawPrint, Rat, Turtle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buildBookingMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface Fields {
  tutor: string;
  pet: string;
  species: string;
  speciesOther: string;
  reason: string;
  period: string;
  notes: string;
}

type FieldName = keyof Fields;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: Fields = {
  tutor: "",
  pet: "",
  species: "",
  speciesOther: "",
  reason: "",
  period: "Sem preferência",
  notes: "",
};

const STORAGE_KEY = "platz:agendamento";
const ORDER: FieldName[] = ["tutor", "pet", "species", "speciesOther", "reason"];

const SPECIES: { value: string; icon: LucideIcon }[] = [
  { value: "Cão", icon: Dog },
  { value: "Gato", icon: Cat },
  { value: "Roedor", icon: Rat },
  { value: "Ave", icon: Bird },
  { value: "Réptil", icon: Turtle },
  { value: "Outro", icon: PawPrint },
];
const PERIODS = ["Manhã", "Tarde", "Sem preferência"];

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (f.tutor.trim().length < 2) errors.tutor = "Informe seu nome.";
  if (!f.pet.trim()) errors.pet = "Informe o nome do animal.";
  if (!f.species) errors.species = "Selecione a espécie.";
  if (f.species === "Outro" && !f.speciesOther.trim()) errors.speciesOther = "Informe qual é a espécie.";
  if (!f.reason) errors.reason = "Selecione o motivo do contato.";
  return errors;
}

function save(fields: Fields) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
  } catch {
    // Armazenamento indisponível (aba anônima, bloqueio): o formulário segue funcionando.
  }
}

const inputClass =
  "w-full rounded-xl border border-forest/20 bg-white/70 px-4 text-base text-forest transition-colors placeholder:text-ink-muted/70 hover:border-forest/40 focus:border-forest aria-[invalid=true]:border-clay-deep";

export function BookingForm({
  reasons,
  serviceIds,
  demoMode,
  initialReason,
}: {
  reasons: string[];
  /** id do serviço → nome exibido, para ler /agendamento?servico=<id>. */
  serviceIds: Record<string, string>;
  demoMode: boolean;
  /** Motivo já selecionado. */
  initialReason?: string;
}) {
  const [fields, setFields] = useState<Fields>(() => ({ ...EMPTY, reason: initialReason ?? "" }));
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const id = useId();
  const fieldId = (name: FieldName) => `${id}-${name}`;
  const errorId = (name: FieldName) => `${id}-${name}-erro`;

  // Após a hidratação (para não divergir do HTML do servidor): recupera o
  // rascunho da sessão e aplica o serviço indicado na URL (?servico=vacinacao).
  useEffect(() => {
    const timer = setTimeout(() => {
      let saved: Partial<Fields> = {};
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) saved = JSON.parse(raw) as Partial<Fields>;
      } catch {
        // Rascunho ilegível ou armazenamento bloqueado: começa vazio.
      }
      const fromUrl = serviceIds[new URLSearchParams(window.location.search).get("servico") ?? ""];
      const reason = fromUrl ?? initialReason;
      if (Object.keys(saved).length || reason) {
        setFields({ ...EMPTY, ...saved, ...(reason ? { reason } : {}) });
      }
    });
    return () => clearTimeout(timer);
  }, [initialReason, serviceIds]);

  const update = (name: FieldName, value: string) => {
    const next = { ...fields, [name]: value };
    if (name === "species" && value !== "Outro") next.speciesOther = "";
    setFields(next);
    save(next);
    setSentUrl(null);
    if (submitted || errors[name]) setErrors(validate(next));
  };

  const onBlur = (name: FieldName) => {
    const error = validate(fields)[name];
    if (fields[name] && error) setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const found = validate(fields);
    setErrors(found);

    const first = ORDER.find((name) => found[name]);
    if (first) {
      const target =
        first === "species"
          ? document.querySelector<HTMLInputElement>(`input[name="${id}-species"]`)
          : document.getElementById(fieldId(first));
      target?.focus();
      const count = Object.keys(found).length;
      setAnnouncement(`${count === 1 ? "Há 1 campo" : `Há ${count} campos`} para revisar.`);
      return;
    }

    const url = buildWhatsAppUrl(
      buildBookingMessage({
        tutor: fields.tutor,
        pet: fields.pet,
        species: fields.species === "Outro" ? fields.speciesOther : fields.species,
        reason: fields.reason,
        period: fields.period,
        notes: fields.notes,
      }),
    );
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
    setSentUrl(url);
    setAnnouncement("");
  };

  const reset = () => {
    setFields(EMPTY);
    save(EMPTY);
    setErrors({});
    setSubmitted(false);
    setSentUrl(null);
  };

  const describedBy = (name: FieldName) => (errors[name] ? errorId(name) : undefined);

  const renderError = (name: FieldName) =>
    errors[name] ? (
      <p id={errorId(name)} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-clay-deep">
        <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
        {errors[name]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="on-light grid gap-6" aria-describedby={`${id}-ajuda`}>
      {demoMode && (
        <p className="flex gap-3 rounded-xl bg-mint px-4 py-3 text-sm leading-relaxed text-forest">
          <CircleAlert className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden="true" />
          <span>
            <strong className="font-semibold">Modo demonstração:</strong> o número oficial ainda não foi configurado.
            O WhatsApp abrirá com a mensagem pronta para você escolher o contato.
          </span>
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor={fieldId("tutor")} className="mb-2 block text-sm font-semibold">
            Seu nome
          </label>
          <input
            id={fieldId("tutor")}
            name="tutor"
            autoComplete="name"
            required
            value={fields.tutor}
            onChange={(e) => update("tutor", e.target.value)}
            onBlur={() => onBlur("tutor")}
            aria-invalid={Boolean(errors.tutor)}
            aria-describedby={describedBy("tutor")}
            className={`${inputClass} h-13`}
          />
          {renderError("tutor")}
        </div>
        <div>
          <label htmlFor={fieldId("pet")} className="mb-2 block text-sm font-semibold">
            Nome do animal
          </label>
          <input
            id={fieldId("pet")}
            name="pet"
            autoComplete="off"
            required
            value={fields.pet}
            onChange={(e) => update("pet", e.target.value)}
            onBlur={() => onBlur("pet")}
            aria-invalid={Boolean(errors.pet)}
            aria-describedby={describedBy("pet")}
            className={`${inputClass} h-13`}
          />
          {renderError("pet")}
        </div>
      </div>

      <fieldset aria-describedby={describedBy("species")} data-invalid={Boolean(errors.species)} className="group">
        <legend className="mb-2 text-sm font-semibold">Espécie</legend>
        <div className="grid grid-cols-3 gap-2">
          {SPECIES.map(({ value, icon: Icon }) => (
            <label key={value} className="relative">
              <input
                type="radio"
                name={`${id}-species`}
                value={value}
                checked={fields.species === value}
                onChange={() => update("species", value)}
                required
                className="peer sr-only"
              />
              <span className="flex h-13 cursor-pointer items-center justify-center gap-2 rounded-xl border border-forest/20 bg-white/70 text-sm font-semibold transition-colors peer-checked:border-forest peer-checked:bg-forest peer-checked:text-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-clay group-data-[invalid=true]:border-clay-deep hover:border-forest/40">
                <Icon className="size-4" aria-hidden="true" />
                {value}
              </span>
            </label>
          ))}
        </div>
        {renderError("species")}
      </fieldset>

      {fields.species === "Outro" && (
        <div>
          <label htmlFor={fieldId("speciesOther")} className="mb-2 block text-sm font-semibold">
            Qual espécie?
          </label>
          <input
            id={fieldId("speciesOther")}
            name="speciesOther"
            required
            value={fields.speciesOther}
            onChange={(e) => update("speciesOther", e.target.value)}
            onBlur={() => onBlur("speciesOther")}
            aria-invalid={Boolean(errors.speciesOther)}
            aria-describedby={describedBy("speciesOther")}
            className={`${inputClass} h-13`}
          />
          {renderError("speciesOther")}
        </div>
      )}

      <div>
        <label htmlFor={fieldId("reason")} className="mb-2 block text-sm font-semibold">
          Motivo do contato
        </label>
        <div className="relative">
          <select
            id={fieldId("reason")}
            name="reason"
            required
            value={fields.reason}
            onChange={(e) => update("reason", e.target.value)}
            onBlur={() => onBlur("reason")}
            aria-invalid={Boolean(errors.reason)}
            aria-describedby={describedBy("reason")}
            className={`${inputClass} h-13 cursor-pointer appearance-none pr-11`}
          >
            <option value="" disabled>
              Selecione
            </option>
            {reasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-muted"
            aria-hidden="true"
          />
        </div>
        {renderError("reason")}
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">
          Período de preferência <span className="font-normal text-ink-muted">(opcional)</span>
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {PERIODS.map((period) => (
            <label key={period}>
              <input
                type="radio"
                name={`${id}-period`}
                value={period}
                checked={fields.period === period}
                onChange={() => update("period", period)}
                className="peer sr-only"
              />
              <span className="flex h-13 cursor-pointer items-center justify-center rounded-xl border border-forest/20 bg-white/70 px-2 text-center text-sm leading-tight font-semibold transition-colors peer-checked:border-forest peer-checked:bg-forest peer-checked:text-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-clay hover:border-forest/40">
                {period}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={fieldId("notes")} className="mb-2 block text-sm font-semibold">
          Observações <span className="font-normal text-ink-muted">(opcional)</span>
        </label>
        <textarea
          id={fieldId("notes")}
          name="notes"
          rows={3}
          maxLength={400}
          value={fields.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Ex.: idade do animal, sintomas, dias que funcionam melhor para você"
          className={`${inputClass} resize-y py-3 leading-relaxed`}
        />
      </div>

      <div>
        <button
          type="submit"
          className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-forest px-6 font-semibold text-cream transition-[background-color,transform] duration-300 ease-soft hover:bg-forest-deep active:scale-[0.99]"
        >
          <WhatsAppIcon className="size-5" />
          Solicitar agendamento
        </button>
        <p id={`${id}-ajuda`} className="mt-3 text-center text-sm leading-relaxed text-ink-muted">
          Você será direcionado ao WhatsApp. O horário só fica confirmado após a resposta da clínica.
        </p>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      {sentUrl && (
        <div role="status" className="rounded-xl border border-forest/15 bg-mint p-5 text-sm leading-relaxed">
          <p className="font-semibold">Abrimos o WhatsApp com a sua mensagem.</p>
          <p className="mt-1 text-forest/80">
            Envie por lá e aguarde: a equipe vai responder com a disponibilidade. Seus dados continuam aqui caso
            precise reenviar.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-semibold">
            <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Abrir o WhatsApp novamente
            </a>
            <button type="button" onClick={reset} className="underline underline-offset-4">
              Limpar formulário
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

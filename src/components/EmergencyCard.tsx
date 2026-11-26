import { useState } from 'react';
import { Check, Copy, MessageCircle, Phone, Printer } from 'lucide-react';
import { ESTER_PROFILE, type Language } from '../data/emergencyProfile';

export function EmergencyCard() {
  const [lang, setLang] = useState<Language>('pt');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isPt = lang === 'pt';
  const profile = ESTER_PROFILE;

  const copyText = async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 2000);
    } catch {
      // Fallback for restricted clipboard environments
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopiedId(id);
        window.setTimeout(() => {
          setCopiedId((current) => (current === id ? null : current));
        }, 2000);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  const conditions = isPt ? profile.conditionsPt : profile.conditionsEn;
  const medications = isPt ? profile.medicationsPt : profile.medicationsEn;
  const birthDate = isPt ? profile.birthDatePt : profile.birthDateEn;
  const nationality = isPt ? profile.nationalityPt : profile.nationalityEn;
  const sex = isPt ? profile.sexPt : profile.sexEn;
  const weight = isPt ? profile.weightPt : profile.weightEn;
  const height = isPt ? profile.heightPt : profile.heightEn;

  const buildSummaryText = () => {
    const contactLines = profile.emergencyContacts
      .map((c) => `- ${c.name} (${isPt ? c.relationPt : c.relationEn}): ${c.phoneDisplay}`)
      .join('\n');

    if (isPt) {
      return [
        'CARTÃO DE EMERGÊNCIA',
        `Nome: ${profile.fullName}`,
        `Data de Nascimento: ${profile.birthDatePt}`,
        `Sexo: ${profile.sexPt}`,
        `Peso: ${profile.weightPt} | Altura: ${profile.heightPt}`,
        `Tipo Sanguíneo: ${profile.bloodType}`,
        `Celular: ${profile.phoneDisplay}`,
        `Condições Médicas / Doenças: ${profile.conditionsPt.join(', ')}`,
        `Medicações: ${profile.medicationsPt.join(', ')}`,
        'Contatos de Emergência:',
        contactLines,
      ].join('\n');
    }

    return [
      'EMERGENCY MEDICAL CARD',
      `Full Name: ${profile.fullName}`,
      `Date of Birth: ${profile.birthDateEn}`,
      `Sex: ${profile.sexEn}`,
      `Weight: ${profile.weightEn} | Height: ${profile.heightEn}`,
      `Blood Type: ${profile.bloodType}`,
      `Mobile: ${profile.phoneDisplay}`,
      `Medical Conditions: ${profile.conditionsEn.join(', ')}`,
      `Medications: ${profile.medicationsEn.join(', ')}`,
      'Emergency Contacts:',
      contactLines,
    ].join('\n');
  };

  return (
    <div className="w-full space-y-4">
      <article
        aria-labelledby="emergency-card-title"
        className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs"
      >
        {/* Top Emergency Header */}
        <header className="bg-red-600 text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current shrink-0"
            >
              <path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5V3z" />
            </svg>
            <span className="text-sm sm:text-base font-bold tracking-tight whitespace-nowrap">
              {isPt ? 'Cartão de Emergência' : 'Emergency Card'}
            </span>
          </div>

          <div
            role="group"
            aria-label={isPt ? 'Selecionar idioma' : 'Select language'}
            className="no-print inline-flex items-center p-0.5 bg-red-700/80 rounded-lg shrink-0"
          >
            <button
              type="button"
              onClick={() => setLang('pt')}
              className={`min-h-[36px] px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                isPt ? 'bg-white text-red-700' : 'text-red-100 hover:text-white'
              }`}
            >
              Português
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`min-h-[36px] px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                !isPt ? 'bg-white text-red-700' : 'text-red-100 hover:text-white'
              }`}
            >
              English
            </button>
          </div>
        </header>

        {/* Patient Identity & Blood Type */}
        <section className="px-6 sm:px-8 py-7 border-b border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-500">
              {isPt ? 'Nome Completo' : 'Full Name'}
            </p>
            <h1
              id="emergency-card-title"
              className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]"
            >
              {profile.fullName}
            </h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-sm text-slate-600">
              <span>
                {isPt ? 'Data de Nascimento:' : 'Date of Birth:'}{' '}
                <strong className="font-semibold text-slate-900 tabular-nums">
                  {birthDate}
                </strong>
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span>
                {isPt ? 'Sexo:' : 'Sex:'}{' '}
                <strong className="font-semibold text-slate-900">{sex}</strong>
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span>
                {isPt ? 'Nacionalidade:' : 'Nationality:'}{' '}
                <strong className="font-semibold text-slate-900">{nationality}</strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-slate-600">
              <span>
                {isPt ? 'Peso:' : 'Weight:'}{' '}
                <strong className="font-semibold text-slate-900 tabular-nums">
                  {weight}
                </strong>
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span>
                {isPt ? 'Altura:' : 'Height:'}{' '}
                <strong className="font-semibold text-slate-900 tabular-nums">
                  {height}
                </strong>
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span>
                {isPt ? 'Cidade:' : 'City:'}{' '}
                <strong className="font-semibold text-slate-900">
                  {profile.cityState}
                </strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <span>{isPt ? 'Celular:' : 'Mobile:'}</span>
                <a
                  href={`tel:${profile.phoneDial}`}
                  className="font-mono font-semibold text-slate-900 hover:text-red-700 underline underline-offset-4 decoration-slate-300 hover:decoration-red-600 tabular-nums transition-colors"
                >
                  {profile.phoneDisplay}
                </a>
                <button
                  type="button"
                  onClick={() => void copyText(profile.phoneDisplay, 'patient-phone')}
                  aria-label={isPt ? 'Copiar celular de Ester' : "Copy Ester's mobile number"}
                  className="no-print inline-flex items-center justify-center min-w-[36px] min-h-[36px] rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  {copiedId === 'patient-phone' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </span>
            </div>
          </div>

          <div className="sm:text-right shrink-0">
            <p className="text-xs font-medium text-slate-500">
              {isPt ? 'Tipo Sanguíneo' : 'Blood Type'}
            </p>
            <p className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight text-red-600 font-mono tabular-nums">
              {profile.bloodType}
            </p>
          </div>
        </section>

        {/* Clinical Information */}
        <section className="px-6 sm:px-8 py-6 border-b border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <div>
            <h2 className="text-xs font-semibold text-slate-500">
              {isPt ? 'Condições Médicas / Doenças' : 'Medical Conditions'}
            </h2>
            <ul className="mt-3 divide-y divide-slate-100">
              {conditions.map((condition) => (
                <li
                  key={condition}
                  className="py-2.5 text-base sm:text-lg font-semibold text-slate-900"
                >
                  {condition}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-slate-500">
              {isPt ? 'Medicações de Uso Contínuo' : 'Continuous Medications'}
            </h2>
            <ul className="mt-3 divide-y divide-slate-100">
              {medications.map((medication) => (
                <li
                  key={medication}
                  className="py-2.5 text-base sm:text-lg font-semibold text-slate-900"
                >
                  {medication}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="px-6 sm:px-8 py-7 bg-slate-50/70">
          <h2 className="text-xs font-semibold text-red-700 mb-4">
            {isPt ? 'Contatos de Emergência' : 'Emergency Contacts'}
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.emergencyContacts.map((contact) => {
              const relation = isPt ? contact.relationPt : contact.relationEn;
              const copyKey = `phone-${contact.id}`;
              const firstName = contact.name.split(' ')[0];

              return (
                <li
                  key={contact.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4"
                >
                  <div>
                    <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {contact.name}{' '}
                      <span className="font-normal text-slate-500">({relation})</span>
                    </p>
                    <a
                      href={`tel:${contact.phoneDial}`}
                      className="mt-1.5 inline-flex items-center gap-2 font-mono text-sm sm:text-base font-semibold text-red-700 hover:text-red-800 underline underline-offset-4 decoration-red-300 hover:decoration-red-700 tabular-nums transition-colors"
                    >
                      <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {contact.phoneDisplay}
                    </a>
                  </div>

                  <div className="no-print flex flex-col gap-2 pt-3 border-t border-slate-100">
                    <a
                      href={`tel:${contact.phoneDial}`}
                      className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {isPt ? `Ligar para ${firstName}` : `Call ${firstName}`}
                    </a>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`https://wa.me/${contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 min-h-[44px] px-3 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                      >
                        <MessageCircle
                          className="w-4 h-4 text-emerald-700 shrink-0"
                          aria-hidden="true"
                        />
                        WhatsApp
                      </a>

                      <button
                        type="button"
                        onClick={() => void copyText(contact.phoneDisplay, copyKey)}
                        className="inline-flex items-center justify-center gap-2 min-h-[44px] px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                      >
                        {copiedId === copyKey ? (
                          <>
                            <Check
                              className="w-4 h-4 text-emerald-700 shrink-0"
                              aria-hidden="true"
                            />
                            {isPt ? 'Copiado' : 'Copied'}
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                            {isPt ? 'Copiar' : 'Copy'}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </article>

      {/* Quiet Utility Actions */}
      <footer className="no-print flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-slate-500">
        {isPt ? (
          <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span>Emergência Brasil:</span>
            <a
              href="tel:192"
              className="font-semibold text-slate-700 hover:text-red-700 underline underline-offset-2 decoration-slate-300 tabular-nums transition-colors"
            >
              SAMU 192
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="tel:193"
              className="font-semibold text-slate-700 hover:text-red-700 underline underline-offset-2 decoration-slate-300 tabular-nums transition-colors"
            >
              Bombeiros 193
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="tel:190"
              className="font-semibold text-slate-700 hover:text-red-700 underline underline-offset-2 decoration-slate-300 tabular-nums transition-colors"
            >
              Polícia 190
            </a>
          </span>
        ) : (
          <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span>US Emergency:</span>
            <a
              href="tel:911"
              className="font-semibold text-slate-700 hover:text-red-700 underline underline-offset-2 decoration-slate-300 tabular-nums transition-colors"
            >
              911 (EMS / Fire / Police)
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="tel:+18002221222"
              className="font-semibold text-slate-700 hover:text-red-700 underline underline-offset-2 decoration-slate-300 tabular-nums transition-colors"
            >
              Poison Control 1-800-222-1222
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="tel:988"
              className="font-semibold text-slate-700 hover:text-red-700 underline underline-offset-2 decoration-slate-300 tabular-nums transition-colors"
            >
              Crisis Lifeline 988
            </a>
          </span>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void copyText(buildSummaryText(), 'full-summary')}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            {copiedId === 'full-summary' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                {isPt ? 'Resumo copiado' : 'Summary copied'}
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                {isPt ? 'Copiar resumo' : 'Copy summary'}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            {isPt ? 'Imprimir / PDF' : 'Print / PDF'}
          </button>
        </div>
      </footer>
    </div>
  );
}

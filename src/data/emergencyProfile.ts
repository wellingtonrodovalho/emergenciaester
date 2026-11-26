export type Language = 'pt' | 'en';

export interface EmergencyContact {
  id: string;
  name: string;
  relationPt: string;
  relationEn: string;
  phoneDisplay: string;
  phoneDial: string;
  whatsapp: string;
}

export interface EmergencyProfile {
  fullName: string;
  birthDatePt: string;
  birthDateEn: string;
  phoneDisplay: string;
  phoneDial: string;
  cityState: string;
  nationalityPt: string;
  nationalityEn: string;
  bloodType: string;
  conditionsPt: string[];
  conditionsEn: string[];
  medicationsPt: string[];
  medicationsEn: string[];
  emergencyContacts: EmergencyContact[];
}

export const ESTER_PROFILE: EmergencyProfile = {
  fullName: 'Ester Monteiro Fonseca',
  birthDatePt: '09/12/2007',
  birthDateEn: 'December 9, 2007',
  phoneDisplay: '+55 (62) 98442-7622',
  phoneDial: '+5562984427622',
  cityState: 'Goiânia/GO',
  nationalityPt: 'Brasileira',
  nationalityEn: 'Brazilian',
  bloodType: 'AB+',
  conditionsPt: ['Nenhuma'],
  conditionsEn: ['None'],
  medicationsPt: ['Nenhuma'],
  medicationsEn: ['None'],
  emergencyContacts: [
    {
      id: 'keyla',
      name: 'Keyla Fonseca',
      relationPt: 'Mãe',
      relationEn: 'Mother',
      phoneDisplay: '+55 (62) 98456-2160',
      phoneDial: '+5562984562160',
      whatsapp: '5562984562160',
    },
    {
      id: 'wellington',
      name: 'Wellington Rodovalho Fonseca',
      relationPt: 'Pai',
      relationEn: 'Father',
      phoneDisplay: '+55 (62) 98545-1980',
      phoneDial: '+5562985451980',
      whatsapp: '5562985451980',
    },
    {
      id: 'neila',
      name: 'Neila',
      relationPt: 'Tia',
      relationEn: 'Aunt',
      phoneDisplay: '+55 (62) 98415-4912',
      phoneDial: '+5562984154912',
      whatsapp: '5562984154912',
    },
    {
      id: 'wesley',
      name: 'Wesley Vilela',
      relationPt: 'Tio',
      relationEn: 'Uncle',
      phoneDisplay: '+55 (62) 98136-4888',
      phoneDial: '+5562981364888',
      whatsapp: '5562981364888',
    },
  ],
};

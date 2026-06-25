import { type } from 'arktype'

export const MEXICO_STATES = {
  outside: "Resido fuera del pais",
  aguascalientes: "Aguascalientes",
  bajaCalifornia: "Baja California",
  bajaCaliforniaSur: "Baja California Sur",
  campeche: "Campeche",
  chiapas: "Chiapas",
  chihuahua: "Chihuahua",
  coahuila: "Coahuila de Zaragoza",
  colima: "Colima",
  cdmx: "Ciudad de Mexico",
  durango: "Durango",
  guanajuato: "Guanajuato",
  guerrero: "Guerrero",
  hidalgo: "Hidalgo",
  jalisco: "Jalisco",
  estado: "Estado de Mexico",
  michoacan: "Michoacan de Ocampo",
  morelos: "Morelos",
  nayarit: "Nayarit",
  nuevo: "Nuevo Leon",
  oaxaca: "Oaxaca",
  puebla: "Puebla",
  queretaro: "Queretaro de Arteaga",
  quintana: "Quintana Roo",
  sanLuisPotosi: "San Luis Potosi",
  sinaloa: "Sinaloa",
  sonora: "Sonora",
  tabasco: "Tabasco",
  tamaulipas: "Tamaulipas",
  tlaxcala: "Tlaxcala",
  veracruz: "Veracruz de Ignacio de la Llave",
  yucatan: "Yucatan",
  zacatecas: "Zacatecas",
} as const;

export const GENDERS = {
  male: "Male",
  female: "Female",
  unknown: "I prefer not comment about it",
} as const;

export const UserResidenceState = type('string').narrow(
  (data): data is typeof MEXICO_STATES[keyof typeof MEXICO_STATES] => {
    return Object.values(MEXICO_STATES).includes(data as any);
  }
)

export const UserGenders = type('string').narrow(
  (data): data is typeof GENDERS[keyof typeof GENDERS] => {
    return Object.values(GENDERS).includes(data as any);
  }
)

export const UserPermissions = type({
  isAgeAllowed: 'boolean',
  isStateAllowed: 'boolean',
  isGenderAllowed: 'boolean',
  isMarketingAllowed: 'boolean',
  isAdsAllowed: 'boolean',
})

export const UserRegisterData = type({
  birthdate: 'string.date.iso',
  email: 'string.email',
  gender: UserGenders,
  name: 'string',
  password: '/^(?=.*[A-Z])(?=.*\d).{8,255}$/',
  permissions: UserPermissions,
  residenceState: UserResidenceState,
});

export type UserResidenceState = typeof UserResidenceState.infer;
export type UserGenders = typeof UserGenders.infer;
export type UserPermissions = typeof UserPermissions.infer;
export type UserRegisterData = typeof UserRegisterData.infer;
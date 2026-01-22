export type VoterStatus = "active" | "cut" | "migrated" | "duplicate";

export type Voter = {
  serial: number;
  name_bn: string;
  name_en: string;
  voter_no: string;
  father_bn: string | null;
  father_en: string | null;
  mother_bn: string | null;
  mother_en: string | null;
  spouse_bn: string | null;
  spouse_en: string | null;
  profession_bn: string;
  profession_en: string;
  birthdate: string; // YYYY-MM-DD
  address_bn: string;
  address_en: string;
  status: VoterStatus;
};

export type MetaData = {
  district_bn: string;
  district_en: string;
  upazila_bn: string;
  upazila_en: string;
  union_bn: string;
  union_en: string;
  [key: string]: any;
};

export type GenderList = {
  gender_list: "female" | "male";
  voters: Voter[];
};

export type Root = {
  meta: MetaData;
  female_list?: GenderList;
  male_list?: GenderList;
};

export type Gender = "female" | "male";

export type VoterWithGender = Voter & { gender: Gender };

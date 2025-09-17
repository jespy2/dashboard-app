import { z } from 'zod';


export const LODESSchema = z.object({
  w_geocode: z.number, // Workplace geocode (where the job is located)
  h_geocode: z.number, // Home geocode (where the worker lives)
  S000: z.number, // Total number of jobs
  SA01: z.number, // Jobs with workers aged 29 or younger
  SA02: z.number, // Jobs with workers aged 30–54
  SA03: z.number, // Jobs with workers aged 55 or older
  SE01: z.number, // Jobs in Goods Producing industry
  SE02: z.number, // Jobs in Trade, Transportation, Utilities
  SE03: z.number, // Jobs in All Other Services
  SI01: z.number, // Jobs with earnings ≤ $1,250/month
  SI02: z.number, // Jobs with earnings $1,251–$3,333/month
  SI03: z.number, // Jobs with earnings > $3,333/month
  createdate: z.number, // When the data was published
});

export type LODESRecord = z.infer<typeof LODESSchema>;

export const ACSSchema = z.object({
  PWGTP: z.number, //	PUMS person weight
  WGTP: z.number, //	Housing unit weight
  JWDP: z.number, // Time of departure for work - hour and minute
  JWAP: z.number, // Time of arrival at work - hour and minute
  SCHL: z.number, // Educational attainment
  JWMNP: z.number, // Travel time to work
  PINCP: z.number, // Total person's income (signed, use ADJINC to adjust to constant dollars)
  GRNTP: z.number, // Gross rent (monthly amount, use ADJHSG to adjust GRNTP to constant dollars).  Note: Use ADJHSG to adjust GRNTP to constant dollars.
  SMOCP: z.number, // Selected monthly owner costs (use ADJHSG to adjust SMOCP to constant dollars).  Note: Use ADJHSG to adjust SMOCP to constant dollars.
  ST: z.number, // State (8 = Colorado)
});

export type ACSRecord = z.infer<typeof ACSSchema>;

export enum EducationLevel {
  NA = 0, // N/A (less than 3 years old)
  NoSchooling = 1,
  NurserySchool = 2,
  Kindergarten = 3,
  Grade1 = 4,
  Grade2 = 5,
  Grade3 = 6,
  Grade4 = 7,
  Grade5 = 8,
  Grade6 = 9,
  Grade7 = 10,
  Grade8 = 11,
  Grade9 = 12,
  Grade10 = 13,
  Grade11 = 14,
  Grade12NoDiploma = 15,
  HighSchoolDiploma = 16,
  GED = 17,
  SomeCollegeLessThan1Yr = 18,
  CollegeCreditNoDegree = 19,
  AssociatesDegree = 20,
  BachelorsDegree = 21,
  MastersDegree = 22,
  ProfessionalDegree = 23,
  DoctorateDegree = 24,
}


export const EducationLevelLabels: Record<EducationLevel, string> = {
  [EducationLevel.NA]: 'N/A (less than 3 years old)',
  [EducationLevel.NoSchooling]: 'No schooling completed',
  [EducationLevel.NurserySchool]: 'Nursery school, preschool',
  [EducationLevel.Kindergarten]: 'Kindergarten',
  [EducationLevel.Grade1]: 'Grade 1',
  [EducationLevel.Grade2]: 'Grade 2',
  [EducationLevel.Grade3]: 'Grade 3',
  [EducationLevel.Grade4]: 'Grade 4',
  [EducationLevel.Grade5]: 'Grade 5',
  [EducationLevel.Grade6]: 'Grade 6',
  [EducationLevel.Grade7]: 'Grade 7',
  [EducationLevel.Grade8]: 'Grade 8',
  [EducationLevel.Grade9]: 'Grade 9',
  [EducationLevel.Grade10]: 'Grade 10',
  [EducationLevel.Grade11]: 'Grade 11',
  [EducationLevel.Grade12NoDiploma]: '12th grade - no diploma',
  [EducationLevel.HighSchoolDiploma]: 'Regular high school diploma',
  [EducationLevel.GED]: 'GED or alternative credential',
  [EducationLevel.SomeCollegeLessThan1Yr]: 'Some college, less than 1 year',
  [EducationLevel.CollegeCreditNoDegree]: 'College credit, no degree',
  [EducationLevel.AssociatesDegree]: "Associate's degree",
  [EducationLevel.BachelorsDegree]: "Bachelor's degree",
  [EducationLevel.MastersDegree]: "Master's degree",
  [EducationLevel.ProfessionalDegree]: "Professional degree beyond bachelor's",
  [EducationLevel.DoctorateDegree]: 'Doctorate degree',
};


/** 
 ***** value breaks ****** 
_________SCHL - Education__________
0: N / A(less than 3 years old) 
01: No schooling completed
02: Nursery school, preschool
03: Kindergarten 
04: Grade 1
05: Grade 2
06: Grade 3
07: Grade 4
08: Grade 5 
09: Grade 6 
10: Grade 7
11: Grade 8 
12: Grade 9 
13: Grade 10 
14: Grade 11
15: 12th grade - no diploma 
16: Regular high school diploma
17: GED or alternative credential
18: Some college, but less than 1 year
19: 1 or more years of college credit, no degree
20: Associate's degree
21: Bachelor's degree
22: Master's degree 
23: Professional degree beyond a bachelor's degree 
24: Doctorate degree

__________SMOCP - Selected Monthly owner cost______________
00000: None 
-1: N/A(GQ / vacant / not owned or being bought) 
1:99999: $1 - $99999 (Components are rounded)

export enum OwnerMonthlyCost {
  NotApplicable = -1,       // N/A (GQ / vacant / not owned or being bought)
  None = 0,                 // None
  Range1to99999 = 1         // $1 - $99,999 (Rounded, inclusive)
}
if (value >= 1 && value <= 99999) {
  // Use value directly
}

_________PINCP - income ______________
0: None 
-19999: N/A(less than 15 years old) 
-19997:-1: Loss $1 to $19997 (Rounded components)
-19998: Loss of $19998 or more (Rounded and bottom-coded components)
1: 4209995: $1 to $4209995(Rounded and top - coded components) 

export enum PersonalIncome {
  NotApplicable = -19999,  // N/A (less than 15 years old)
  LossOver19998 = -19998,  // Loss of $19998 or more
  Loss1to19997 = -1,       // Losses between $1–$19997 (rounded)
  None = 0,                // None
  Range1to4209995 = 1      // $1 to $4,209,995 (Rounded and top-coded)
}

*/

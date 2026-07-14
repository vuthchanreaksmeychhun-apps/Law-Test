import { Lawyer, LegalDocument, Textbook } from './types';

export const MOCK_LAWYERS: Lawyer[] = [
  {
    id: 'l1',
    name: 'Ouk Vandeth',
    nameKh: 'អ៊ុក វ៉ាន់ដេត',
    title: 'Senior Attorney & Arbitrator',
    titleKh: 'មេធាវីជាន់ខ្ពស់ និងអាជ្ញាកណ្តាល',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250&h=250',
    experience: 18,
    rating: 4.9,
    reviewsCount: 142,
    specialties: ['Commercial Law', 'Real Estate', 'Arbitration'],
    specialtiesKh: ['ច្បាប់ពាណិជ្ជកម្ម', 'អចលនទ្រព្យ', 'មជ្ឈត្តការ'],
    location: 'Khan Daun Penh, Phnom Penh',
    locationKh: 'ខណ្ឌដូនពេញ, ភ្នំពេញ',
    phone: '+855 12 778 990',
    email: 'vandeth.ouk@khmerlawhub.com',
    languages: ['Khmer (Native)', 'English (Fluent)', 'French (Intermediate)'],
    fee: '$120/hr',
    bio: 'Advocate Ouk Vandeth has over 18 years of experience representing domestic and international corporations in commercial transactions, joint ventures, and high-profile real estate disputes in Cambodia.',
    bioKh: 'លោកមេធាវី អ៊ុក វ៉ាន់ដេត មានបទពិសោធន៍ជាង ១៨ឆ្នាំ ក្នុងការតំណាងឱ្យក្រុមហ៊ុនជាតិ និងអន្តរជាតិ ក្នុងប្រតិបត្តិការពាណិជ្ជកម្ម ការបណ្តាក់ទុនរួមគ្នា និងវិវាទអចលនទ្រព្យកម្រិតខ្ពស់នៅក្នុងប្រទេសកម្ពុជា។'
  },
  {
    id: 'l2',
    name: 'Sok Sreyroth',
    nameKh: 'សុខ ស្រីរ័ត្ន',
    title: 'Family & Civil Law Specialist',
    titleKh: 'អ្នកឯកទេសច្បាប់គ្រួសារ និងរដ្ឋប្បវេណី',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250&h=250',
    experience: 10,
    rating: 4.8,
    reviewsCount: 96,
    specialties: ['Family Law', 'Estate Planning', 'Civil Litigation'],
    specialtiesKh: ['ច្បាប់គ្រួសារ', 'ការរៀបចំមរតក', 'បណ្តឹងរដ្ឋប្បវេណី'],
    location: 'Khan Chamkarmon, Phnom Penh',
    locationKh: 'ខណ្ឌចំការមន, ភ្នំពេញ',
    phone: '+855 16 445 221',
    email: 'sreyroth.sok@khmerlawhub.com',
    languages: ['Khmer (Native)', 'English (Fluent)'],
    fee: '$90/hr',
    bio: 'Specializing in family code disputes, inheritance cases, and marriage registration/divorce representation for both local citizens and expatriates in Phnom Penh.',
    bioKh: 'មានជំនាញឯកទេសលើវិវាទច្បាប់គ្រួសារ ករណីមរតក និងការចុះបញ្ជីអាពាហ៍ពិពាហ៍/ការលែងលះ សម្រាប់ប្រជាពលរដ្ឋខ្មែរ និងជនបរទេសនៅភ្នំពេញ។'
  },
  {
    id: 'l3',
    name: 'Chan Sombo',
    nameKh: 'ចាន់ សំបូរ',
    title: 'Criminal Defense Attorney',
    titleKh: 'មេធាវីការពារក្តីព្រហ្មទណ្ឌ',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250&h=250',
    experience: 14,
    rating: 4.7,
    reviewsCount: 118,
    specialties: ['Criminal Law', 'Appellate Litigation', 'Human Rights'],
    specialtiesKh: ['ច្បាប់ព្រហ្មទណ្ឌ', 'បណ្តឹងឧទ្ធរណ៍', 'សិទ្ធិមនុស្ស'],
    location: 'Siem Reap City, Siem Reap',
    locationKh: 'ក្រុងសៀមរាប, សៀមរាប',
    phone: '+855 88 900 1122',
    email: 'sombo.chan@khmerlawhub.com',
    languages: ['Khmer (Native)', 'English (Conversational)'],
    fee: '$100/hr',
    bio: 'Highly respected defense attorney who has successfully represented clients in the Provincial Court of Siem Reap and Court of Appeal, specializing in criminal trials and constitutional rights.',
    bioKh: 'លោកមេធាវីការពារក្តីដ៏ល្បីល្បាញ ដែលបានតំណាងឱ្យកូនក្តីដោយជោគជ័យនៅក្នុងសាលាដំបូងខេត្តសៀមរាប និងសាលាឧទ្ធរណ៍ ដោយផ្តោតលើសវនាការព្រហ្មទណ្ឌ និងសិទ្ធិរដ្ឋធម្មនុញ្ញ។'
  },
  {
    id: 'l4',
    name: 'Keo Sopheap',
    nameKh: 'កែវ សុភាព',
    title: 'Labor & Employment Counsel',
    titleKh: 'ប្រឹក្សាច្បាប់ការងារ និងបុគ្គលិក',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250&h=250',
    experience: 8,
    rating: 4.9,
    reviewsCount: 74,
    specialties: ['Labor Law', 'Corporate Governance', 'IP Law'],
    specialtiesKh: ['ច្បាប់ការងារ', 'អភិបាលកិច្ចសាជីវកម្ម', 'កម្មសិទ្ធិបញ្ញា'],
    location: 'Sihanoukville, Preah Sihanouk',
    locationKh: 'ក្រុងព្រះសីហនុ, ព្រះសីហនុ',
    phone: '+855 77 552 901',
    email: 'sopheap.keo@khmerlawhub.com',
    languages: ['Khmer (Native)', 'English (Fluent)', 'Chinese (Intermediate)'],
    fee: '$85/hr',
    bio: 'Expert adviser on Cambodia Labor Law, collective bargaining agreements, employee manual audits, and foreign business registration in special economic zones.',
    bioKh: 'អ្នកជំនាញប្រឹក្សាយោបល់លើច្បាប់ស្តីពីការងារនៃព្រះរាជាណាចក្រកម្ពុជា កិច្ចព្រមព្រៀងរួមនៃការចរចា ការសវនកម្មសៀវភៅណែនាំបុគ្គលិក និងការចុះបញ្ជីអាជីវកម្មបរទេសក្នុងតំបន់សេដ្ឋកិច្ចពិសេស។'
  }
];

export const MOCK_DOCUMENTS: LegalDocument[] = [
  {
    id: 'd1',
    title: 'Non-Disclosure Agreement (NDA)',
    titleKh: 'កិច្ចព្រមព្រៀងរក្សាការសម្ងាត់ (NDA)',
    category: 'Contract',
    categoryKh: 'កិច្ចសន្យា',
    description: 'Protect sensitive business data, intellectual property, and trade secrets in Cambodia with a robust NDA.',
    descriptionKh: 'ការពារទិន្នន័យអាជីវកម្ម កម្មសិទ្ធិបញ្ញា និងការសម្ងាត់ពាណិជ្ជកម្មរបស់អ្នកនៅក្នុងប្រទេសកម្ពុជា ជាមួយនឹងកិច្ចព្រមព្រៀងរក្សាការសម្ងាត់ដ៏រឹងមាំមួយ។',
    fields: [
      { key: 'partyA', label: 'Disclosing Party (Party A)', labelKh: 'ភាគីលាតត្រដាង (ភាគី ក)', placeholder: 'e.g. ABC Tech Co., Ltd', defaultValue: 'ក្រុមហ៊ុន អេប៊ីស៊ី តិច ឯ.ក' },
      { key: 'partyB', label: 'Receiving Party (Party B)', labelKh: 'ភាគីទទួលព័ត៌មាន (ភាគី ខ)', placeholder: 'e.g. Sok Dara', defaultValue: 'លោក សុខ ដារ៉ា' },
      { key: 'effectiveDate', label: 'Effective Date', labelKh: 'កាលបរិច្ឆេទចូលជាធរមាន', placeholder: 'YYYY-MM-DD', defaultValue: '២០២៦-០៧-១៤' },
      { key: 'duration', label: 'Confidentiality Period (Years)', labelKh: 'រយៈពេលរក្សាការសម្ងាត់ (ឆ្នាំ)', placeholder: 'e.g. 3 years', defaultValue: '៣' },
      { key: 'governingLaw', label: 'Governing Law Jurisdiction', labelKh: 'យុត្តាធិការច្បាប់គ្រប់គ្រង', placeholder: 'e.g. Phnom Penh Court', defaultValue: 'ព្រះរាជាណាចក្រកម្ពុជា (ភ្នំពេញ)' }
    ],
    templateText: `### NON-DISCLOSURE AGREEMENT
### កិច្ចព្រមព្រៀងរក្សាការសម្ងាត់

This Non-Disclosure Agreement ("Agreement") is made on **{{effectiveDate}}** (កិច្ចព្រមព្រៀងរក្សាការសម្ងាត់នេះ ត្រូវបានធ្វើឡើងនៅថ្ងៃទី **{{effectiveDate}}**) by and between:

1. **{{partyA}}** (hereinafter referred to as "Disclosing Party" or "Party A"), and
   **{{partyA}}** (ហៅកាត់ថា "ភាគីលាតត្រដាង" ឬ "ភាគី ក") និង

2. **{{partyB}}** (hereinafter referred to as "Receiving Party" or "Party B"), and
   **{{partyB}}** (ហៅកាត់ថា "ភាគីទទួល" ឬ "ភាគី ខ")។

---

#### 1. Purpose of Disclosure / គោលបំណងនៃការលាតត្រដាង
The Disclosing Party wishes to disclose certain confidential business, technical, or financial information to the Receiving Party solely for the purpose of exploring a potential business relationship or collaboration.
ភាគីលាតត្រដាងមានបំណងលាតត្រដាងនូវព័ត៌មានសម្ងាត់ផ្នែកអាជីវកម្ម បច្ចេកទេស ឬហិរញ្ញវត្ថុមួយចំនួន ទៅកាន់ភាគីទទួល ក្នុងគោលបំណងសិក្សាអំពីលទ្ធភាពនៃកិច្ចសហការ ឬទំនាក់ទំនងអាជីវកម្មតែប៉ុណ្ណោះ។

#### 2. Confidential Information / ព័ត៌មានសម្ងាត់
"Confidential Information" refers to any data, intellectual property, plans, secrets, or financial materials marked as confidential or reasonably understood to be private.
"ព័ត៌មានសម្ងាត់" សំដៅលើរាល់ទិន្នន័យ កម្មសិទ្ធិបញ្ញា ផែនការ ការសម្ងាត់ ឬសម្ភារហិរញ្ញវត្ថុទាំងឡាយណាដែលត្រូវបានកំណត់ថាសម្ងាត់ ឬត្រូវបានយល់ជាទូទៅថាជាព័ត៌មានឯកជន។

#### 3. Obligations of Receiving Party / កាតព្វកិច្ចរបស់ភាគីទទួល
Party B agrees to maintain absolute confidentiality of all information received from Party A. Party B shall not share, publish, or utilize the Confidential Information for a period of **{{duration}}** years from the Effective Date.
ភាគី ខ យល់ព្រមរក្សាការសម្ងាត់ដាច់ខាតនៃរាល់ព័ត៌មានដែលទទួលបានពីភាគី ក។ ភាគី ខ មិនត្រូវចែកចាយ ផ្សព្វផ្សាយ ឬប្រើប្រាស់ព័ត៌មានសម្ងាត់ទាំងនោះឡើយ សម្រាប់រយៈពេល **{{duration}}** ឆ្នាំ គិតចាប់ពីកាលបរិច្ឆេទចូលជាធរមាន។

#### 4. Dispute Resolution & Governing Law / ការដោះស្រាយវិវាទ និងច្បាប់គ្រប់គ្រង
This Agreement shall be governed and interpreted under the laws of **{{governingLaw}}**. Any dispute arising from this Agreement shall be settled amicably, failing which it shall be referred to the competent court in Cambodia.
កិច្ចព្រមព្រៀងនេះ ត្រូវគ្រប់គ្រង និងបកស្រាយស្របតាមច្បាប់នៃ **{{governingLaw}}**។ រាល់វិវាទដែលកើតឡើងពីកិច្ចព្រមព្រៀងនេះ ត្រូវដោះស្រាយដោយសន្តិវិធី បើមិនដូច្នោះទេ នឹងត្រូវបញ្ជូនទៅតុលាការមានសមត្ថកិច្ចក្នុងប្រទេសកម្ពុជា។

---

**In Witness Whereof / ដើម្បីជាសាក្សី**
Both parties have signed this Agreement in duplicate, with equal legal force.
ភាគីទាំងពីរបានចុះហត្ថលេខាលើកិច្ចព្រមព្រៀងនេះជាពីរច្បាប់ ដែលមានតម្លៃគតិយុត្តស្មើគ្នា។

**Party A (ភាគី ក):** \________________________
**Party B (ភាគី ខ):** \________________________`
  },
  {
    id: 'd2',
    title: 'Residential Lease Agreement',
    titleKh: 'កិច្ចសន្យាជួលផ្ទះស្នាក់នៅ',
    category: 'Contract',
    categoryKh: 'កិច្ចសន្យា',
    description: 'Bilingual lease template for apartments, houses, or office rentals in Phnom Penh and other provinces.',
    descriptionKh: 'ទម្រង់កិច្ចសន្យាជួលទ្វិភាសា សម្រាប់ការជួលអាផាតមិន ផ្ទះ ឬការិយាល័យ នៅភ្នំពេញ និងបណ្តាខេត្តផ្សេងៗទៀត។',
    fields: [
      { key: 'landlord', label: 'Landlord Name', labelKh: 'ឈ្មោះម្ចាស់ផ្ទះ (ភតិបតី)', placeholder: 'e.g. Keo Vutha', defaultValue: 'កែវ វុត្ថា' },
      { key: 'tenant', label: 'Tenant Name', labelKh: 'ឈ្មោះអ្នកជួល (ភតិកៈ)', placeholder: 'e.g. John Doe', defaultValue: 'ចន ដូ' },
      { key: 'propertyAddress', label: 'Property Address', labelKh: 'អាសយដ្ឋានអចលនទ្រព្យ', placeholder: 'e.g. House 45, St 123, BKK1', defaultValue: 'ផ្ទះលេខ ៤៥, ផ្លូវ ១២៣, សង្កាត់បឹងកេងកង១, ភ្នំពេញ' },
      { key: 'monthlyRent', label: 'Monthly Rent (USD)', labelKh: 'ថ្លៃជួលប្រចាំខែ (ដុល្លារ)', placeholder: 'e.g. 500', defaultValue: '៥០០' },
      { key: 'deposit', label: 'Security Deposit (USD)', labelKh: 'ប្រាក់កក់ធានា (ដុល្លារ)', placeholder: 'e.g. 1000', defaultValue: '១០០០' },
      { key: 'term', label: 'Lease Term (Months)', labelKh: 'រយៈពេលជួល (ខែ)', placeholder: 'e.g. 12', defaultValue: '១២' }
    ],
    templateText: `### RESIDENTIAL LEASE AGREEMENT
### កិច្ចសន្យាជួលផ្ទះស្នាក់នៅ

This Lease Agreement is entered into by:
កិច្ចសន្យាជួលនេះត្រូវបានព្រមព្រៀងរវាង៖

**Landlord (ភតិបតី):** **{{landlord}}**
**Tenant (ភតិកៈ):** **{{tenant}}**

---

#### 1. Leased Property / អចលនទ្រព្យជួល
The Landlord agrees to lease the residential property located at:
ម្ចាស់ផ្ទះយល់ព្រមជួលអចលនទ្រព្យស្នាក់នៅ ដែលមានទីតាំងស្ថិតនៅ៖
**{{propertyAddress}}**

#### 2. Lease Term / រយៈពេលជួល
The term of this lease shall be for **{{term}}** months, beginning on the date of execution.
រយៈពេលនៃការជួលនេះត្រូវមានកំណត់ **{{term}}** ខែ ដោយចាប់ផ្តើមគិតពីកាលបរិច្ឆេទនៃការចុះហត្ថលេខា។

#### 3. Rent & Deposit / ថ្លៃជួល និងប្រាក់កក់
- **Monthly Rent / ថ្លៃជួលប្រចាំខែ:** **\${{monthlyRent}} USD** payable on the 1st week of each month.
  **\${{monthlyRent}} ដុល្លារអាមេរិក** ត្រូវបង់រៀងរាល់សប្តាហ៍ទី១ នៃខែនីមួយៗ។
- **Security Deposit / ប្រាក់កក់ធានា:** **\${{deposit}} USD** paid to Landlord upon signing. This deposit is refundable upon lease termination, minus any damages or unpaid utilities.
  **\${{deposit}} ដុល្លារអាមេរិក** ត្រូវបានបង់ជូនម្ចាស់ផ្ទះពេលចុះកិច្ចសន្យា។ ប្រាក់កក់នេះនឹងត្រូវប្រគល់ជូនវិញពេលបញ្ចប់កិច្ចសន្យា ក្រោយកាត់កងការខូចខាត ឬថ្លៃទឹកភ្លើងដែលមិនទាន់បង់។

#### 4. Responsibilities of Tenant / ភារកិច្ចរបស់អ្នកជួល
The Tenant shall keep the premises in a clean and sanitary condition and pay all utilities (electricity, water, internet) punctually.
អ្នកជួលត្រូវថែរក្សាទីកន្លែងឱ្យមានអនាម័យស្អាតបាត និងបង់ថ្លៃសេវាប្រើប្រាស់ទាំងអស់ (អគ្គិសនី ទឹក អ៊ីនធឺណិត) ឱ្យបានទាន់ពេលវេលា។

---

**Signatures (ហត្ថលេខា)**

**Landlord (ភតិបតី):** \________________________
**Tenant (ភតិកៈ):** \________________________`
  },
  {
    id: 'd3',
    title: 'Civil Lawsuit Complaint Template',
    titleKh: 'គំរូពាក្យបណ្តឹងរដ្ឋប្បវេណី (សាលាដំបូង)',
    category: 'Lawsuit',
    categoryKh: 'ពាក្យបណ្តឹង',
    description: 'Standard formal layout for submitting a breach of contract or debt recovery claim to the Cambodian Provincial Court.',
    descriptionKh: 'ប្លង់ផ្លូវការស្តង់ដារ សម្រាប់ដាក់ពាក្យបណ្តឹងករណីរំលោភលើកិច្ចសន្យា ឬការទាមទារប្រាក់មកវិញ ទៅកាន់សាលាដំបូងខេត្ត/រាជធានីនៃប្រទេសកម្ពុជា។',
    fields: [
      { key: 'courtName', label: 'Provincial / Municipal Court Name', labelKh: 'តុលាការខេត្ត/រាជធានី', placeholder: 'e.g. Phnom Penh Municipal Court', defaultValue: 'សាលាដំបូងរាជធានីភ្នំពេញ' },
      { key: 'plaintiff', label: 'Plaintiff Name (You)', labelKh: 'ឈ្មោះដើមចោទ (អ្នក)', placeholder: 'e.g. Lim Sothy', defaultValue: 'លីម សុធី' },
      { key: 'defendant', label: 'Defendant Name', labelKh: 'ឈ្មោះចុងចោទ', placeholder: 'e.g. Meng Chhay', defaultValue: 'ម៉េង ឆាយ' },
      { key: 'claimAmount', label: 'Debt/Claim Amount (USD)', labelKh: 'ចំនួនទឹកប្រាក់ទាមទារ (ដុល្លារ)', placeholder: 'e.g. 5,000', defaultValue: '៥,០០០' },
      { key: 'factualGrounds', label: 'Brief Factual Grounds', labelKh: 'សង្ខេបមូលហេតុអង្គហេតុ', placeholder: 'Describe breach briefly...', defaultValue: 'ចុងចោទមិនព្រមសងប្រាក់តាមការកំណត់ក្នុងកិច្ចសន្យាខ្ចីប្រាក់ ចុះថ្ងៃទី ១០ ខែមីនា ឆ្នាំ ២០២៥' }
    ],
    templateText: `### KINGDOM OF CAMBODIA / ព្រះរាជាណាចក្រកម្ពុជា
### Nation Religion King / ជាតិ សាសនា ព្រះមហាក្សត្រ
---

**TO THE PRESIDENT OF THE {{courtName}}**
**សូមគោរពជូន លោកប្រធាន{{courtName}}**

**PLAINTIFF (ដើមចោទ):** **{{plaintiff}}**, residing in Cambodia.
**DEFENDANT (ចុងចោទ):** **{{defendant}}**, residing in Cambodia.

---

### CIVIL PETITION COMPLAINT / ពាក្យបណ្តឹងរដ្ឋប្បវេណី

#### I. OBJECTIVE OF THE COMPLAINT / កម្មវត្ថុនៃពាក្យបណ្តឹង
To request the Court to order the Defendant to pay the Plaintiff the outstanding sum of **{{claimAmount}} USD** along with legal interest rate until full payment is made.
សុំបង្គាប់ឱ្យចុងចោទសងប្រាក់ចំនួន **{{claimAmount}} ដុល្លារអាមេរិក** មកដើមចោទវិញ ព្រមទាំងការប្រាក់ស្របច្បាប់រហូតដល់ថ្ងៃសងទូទាត់រួចរាល់។

#### II. FACTUAL BACKGROUND / អង្គហេតុនៃករណី
The Plaintiff and Defendant entered into a legal transaction, but the Defendant breached the obligations as follows:
ដើមចោទ និងចុងចោទបានព្រមព្រៀងលើប្រតិបត្តិការច្បាប់ ប៉ុន្តែចុងចោទបានរំលោភលើកាតព្វកិច្ចដូចជា៖
*"{{factualGrounds}}"*

#### III. LEGAL GROUNDS / អង្គច្បាប់បង្អែក
Pursuant to the Civil Code of Cambodia (specifically regarding contract obligations and performance), the debtor must satisfy their due debts.
យោងតាមក្រមរដ្ឋប្បវេណីនៃព្រះរាជាណាចក្រកម្ពុជា (ជាពិសេសលើកាតព្វកិច្ច និងការអនុវត្តកិច្ចសន្យា) កូនបំណុលត្រូវបំពេញកាតព្វកិច្ចរបស់ខ្លួនដែលដល់កំណត់។

#### IV. REQUEST TO THE COURT / សេចក្តីសន្និដ្ឋានសំណូមពរ
Therefore, the Plaintiff respectfully requests the Honorable President of the Court to:
អាស្រ័យហេតុនេះ សូមលោកប្រធានតុលាការមេត្តាសម្រេច៖
1. Accept this lawsuit against the Defendant. (ទទួលយកពាក្យបណ្តឹងនេះចាត់ការតាមច្បាប់)
2. Order the Defendant to return **{{claimAmount}} USD** to the Plaintiff. (បង្គាប់ឱ្យចុងចោទសងប្រាក់ **{{claimAmount}} ដុល្លារអាមេរិក** មកដើមចោទ)
3. Direct the Defendant to pay all legal/court expenses. (បង្គាប់ឱ្យចុងចោទទទួលបន្ទុកលើការចំណាយសេវាផ្លូវច្បាប់ និងតុលាការទាំងអស់)

---

Phnom Penh, Date: \__________________
(ភ្នំពេញ, ថ្ងៃទី...................................)

**Plaintiff Signature & Right Thumbprint / ហត្ថលេខា ឬស្នាមមេដៃស្តាំរបស់ដើមចោទ**`
  }
];

export const MOCK_TEXTBOOKS: Textbook[] = [
  {
    id: 'b1',
    title: 'Civil Code of Cambodia (2007)',
    titleKh: 'ក្រមរដ្ឋប្បវេណី (ឆ្នាំ២០០៧)',
    author: 'Ministry of Justice / Ministry of Foreign Affairs',
    year: 2007,
    coverColor: 'bg-indigo-950',
    category: 'Civil Law',
    chapters: [
      {
        title: 'Book 1: General Rules - Natural Persons',
        titleKh: 'សៀវភៅទី១៖ បទប្បញ្ញត្តិទូទៅ - រូបវន្តបុគ្គល',
        content: 'Article 8 (Acquisition of Capacity for Rights): The capacity for rights shall begin from the birth of a natural person. An unborn child (fetus) shall be deemed already born regarding claims for damages resulting from tortious acts or regarding inheritance.',
        contentKh: 'មាត្រា ៨ (ការទទួលបានសមត្ថភាពទទួលសិទ្ធិ)៖ សមត្ថភាពទទួលសិទ្ធិត្រូវចាប់ផ្តើមឡើងចាប់ពីពេលដែលរូបវន្តបុគ្គលចាប់កំណើត។ ទារកក្នុងផ្ទៃមាតា ត្រូវចាត់ទុកថាបានកើតរួចហើយ ចំពោះការទាមទារសំណងការខូចខាតដែលកើតចេញពីអំពើអនីត្យានុកូល ឬចំពោះមរតក។'
      },
      {
        title: 'Book 3: Real Rights - Ownership',
        titleKh: 'សៀវភៅទី៣៖ សិទ្ធិប្រត្យក្ស - កម្មសិទ្ធិ',
        content: 'Article 134 (Definition of Ownership): Owner of a property may freely use, receive benefits from, and dispose of that property within the limits of laws and regulations.',
        contentKh: 'មាត្រា ១៣៤ (និយមន័យនៃកម្មសិទ្ធិ)៖ ម្ចាស់ទ្រព្យសម្បត្តិអាចប្រើប្រាស់ អាស្រ័យផល និងចាត់ចែងលើទ្រព្យសម្បត្តិនោះដោយសេរី ក្នុងដែនកំណត់នៃច្បាប់ និងលិខិតបទដ្ឋានគតិយុត្ត។'
      },
      {
        title: 'Book 5: Relations of Obligations - Contracts',
        titleKh: 'សៀវភៅទី៥៖ ទំនាក់ទំនងកាតព្វកិច្ច - កិច្ចសន្យា',
        content: 'Article 311 (Formation of Contract): A contract is formed when there is an agreement of declarations of intention (offer and acceptance) made by two or more parties.',
        contentKh: 'មាត្រា ៣១១ (ការកកើតកិច្ចសន្យា)៖ កិច្ចសន្យាកើតឡើងនៅពេលដែលមានការស្របគ្នា នៃការសម្តែងឆន្ទៈ (ការផ្តល់ការសន្យា និងការទទួលយក) រវាងភាគីពីរ ឬច្រើន។'
      }
    ]
  },
  {
    id: 'b2',
    title: 'Criminal Code of Cambodia (2009)',
    titleKh: 'ក្រមព្រហ្មទណ្ឌ (ឆ្នាំ២០០៩)',
    author: 'Kingdom of Cambodia Parliament',
    year: 2009,
    coverColor: 'bg-red-950',
    category: 'Criminal Law',
    chapters: [
      {
        title: 'Chapter 1: Legal Principles of Criminal Law',
        titleKh: 'ជំពូកទី១៖ គោលការណ៍ច្បាប់ព្រហ្មទណ្ឌ',
        content: 'Article 3 (Principle of Legality): No one may be punished for an offense that is not defined as such by the law in force at the time of its commission.',
        contentKh: 'មាត្រា ៣ (គោលការណ៍នីត្យានុកូលភាព)៖ គ្មានបុគ្គលណាម្នាក់អាចត្រូវបានផ្តន្ទាទោសចំពោះបទល្មើសដែលច្បាប់ជាធរមានមិនបានចែងនៅពេលប្រព្រឹត្តនោះឡើយ។'
      },
      {
        title: 'Chapter 2: Criminal Liability',
        titleKh: 'ជំពូកទី២៖ ការទទួលខុសត្រូវព្រហ្មទណ្ឌ',
        content: 'Article 38 (Principle of Personal Liability): No one is criminally liable except for their own personal acts.',
        contentKh: 'មាត្រា ៣៨ (គោលការណ៍ទទួលខុសត្រូវព្រហ្មទណ្ឌផ្ទាល់ខ្លួន)៖ គ្មានបុគ្គលណាម្នាក់ត្រូវទទួលខុសត្រូវព្រហ្មទណ្ឌ ក្រៅពីអំពើផ្ទាល់ខ្លួនរបស់ខ្លួននោះឡើយ។'
      }
    ]
  },
  {
    id: 'b3',
    title: 'Cambodia Labor Law (1997)',
    titleKh: 'ច្បាប់ស្តីពីការងារ (ឆ្នាំ១៩៩៧)',
    author: 'Ministry of Labour and Vocational Training',
    year: 1997,
    coverColor: 'bg-emerald-950',
    category: 'Labor Law',
    chapters: [
      {
        title: 'Chapter 4: Labor Contract - Termination',
        titleKh: 'ជំពូកទី៤៖ កិច្ចសន្យាការងារ - ការបញ្ឈប់',
        content: 'Article 73 (Fixed Duration Contract): A labor contract of specific duration must be made in writing. If not, it becomes an undetermined duration contract. It terminates on the specified date.',
        contentKh: 'មាត្រា ៧៣ (កិច្ចសន្យាការងារមានកំណត់ថិរវេលា)៖ កិច្ចសន្យាដែលមានកំណត់ថិរវេលាច្បាស់លាស់ ត្រូវធ្វើឡើងជាលាយលក្ខណ៍អក្សរ។ បើមិនដូច្នោះទេ វានឹងក្លាយជាកិច្ចសន្យាគ្មានកំណត់ថិរវេលា។ កិច្ចសន្យានេះបញ្ចប់ទៅនៅកាលបរិច្ឆេទកំណត់។'
      },
      {
        title: 'Chapter 6: Working Hours & Overtime',
        titleKh: 'ជំពូកទី៦៖ ម៉ោងធ្វើការ និងការថែមម៉ោង',
        content: 'Article 137 (Standard Work Hours): In all commercial and industrial enterprises, normal working hours of employees cannot exceed 8 hours per day or 48 hours per week.',
        contentKh: 'មាត្រា ១៣៧ (ម៉ោងធ្វើការធម្មតា)៖ នៅក្នុងសហគ្រាសពាណិជ្ជកម្ម និងឧស្សាហកម្មទាំងអស់ ម៉ោងធ្វើការធម្មតារបស់បុគ្គលិកមិនត្រូវលើសពី ៨ ម៉ោងក្នុងមួយថ្ងៃ ឬ ៤៨ ម៉ោងក្នុងមួយសប្តាហ៍ឡើយ។'
      }
    ]
  }
];

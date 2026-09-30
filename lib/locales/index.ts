import { LanguageCode, LanguageMeta, TranslationDictionary } from './types'
import { en } from './en'
import { hi } from './hi'
import { gu } from './gu'
import { mr } from './mr'
import { bn } from './bn'
import { ta } from './ta'
import { te } from './te'
import { kn } from './kn'
import { ml } from './ml'
import { pa } from './pa'
import { ur } from './ur'

export * from './types'

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ur', label: 'Urdu', native: 'اردو', dir: 'rtl' },
]

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en,
  hi,
  gu,
  mr,
  bn,
  ta,
  te,
  kn,
  ml,
  pa,
  ur,
}

export const CATEGORY_TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    'General Goods': 'General Goods',
    'FMCG': 'FMCG Goods',
    'Textiles & Garments': 'Textiles & Garments',
    'Industrial Goods': 'Industrial Goods',
    'Construction Materials': 'Construction Materials',
    'E-commerce Parcels': 'E-commerce Parcels',
    'Agriculture Produce': 'Agriculture Produce',
    'Automobile Parts': 'Automobile Parts',
    'Chemicals (Non-Haz)': 'Chemicals (Non-Haz)',
    'Closed Container': 'Closed Container',
    'Open Tarpaulin Deck': 'Open Tarpaulin Deck',
    'High Side Deck': 'High Side Deck',
    'Flatbed Trailer': 'Flatbed Trailer',
    'Refrigerated Reefer': 'Refrigerated Reefer',
    'Tanker (Liquid)': 'Tanker (Liquid)',
  },
  hi: {
    'General Goods': 'सामान्य माल',
    'FMCG': 'एफएमसीजी (FMCG)',
    'Textiles & Garments': 'कपड़ा और वस्त्र',
    'Industrial Goods': 'औद्योगिक सामान',
    'Construction Materials': 'निर्माण सामग्री',
    'E-commerce Parcels': 'ई-कॉमर्स पार्सल',
    'Agriculture Produce': 'कृषि उपज / अनाज',
    'Automobile Parts': 'ऑटोमोबाइल पार्ट्स',
    'Chemicals (Non-Haz)': 'गैर-खतरनाक रसायन',
    'Closed Container': 'बंद कंटेनर',
    'Open Tarpaulin Deck': 'खुला तिरपाल डेक',
    'High Side Deck': 'हाई साइड डेक',
    'Flatbed Trailer': 'फ्लैटबेड ट्रेलर',
    'Refrigerated Reefer': 'रेफ्रिजरेटेड रीफर',
    'Tanker (Liquid)': 'टैंकर (तरल)',
  },
  gu: {
    'General Goods': 'સામાન્ય માલ',
    'FMCG': 'એફએમસીજી માલ',
    'Textiles & Garments': 'કાપડ અને ગારમેન્ટ્સ',
    'Industrial Goods': 'ઔદ્યોગિક સામાન',
    'Construction Materials': 'બાંધકામ સામગ્રી',
    'E-commerce Parcels': 'ઈ-કોમર્સ પાર્સલ',
    'Agriculture Produce': 'કૃષિ પેદાશ / અનાજ',
    'Automobile Parts': 'ઓટોમોબાઈલ પાર્ટ્સ',
    'Chemicals (Non-Haz)': 'બિન-જોખમી રસાયણો',
    'Closed Container': 'બંધ કન્ટેનર',
    'Open Tarpaulin Deck': 'ખુલ્લું તાલપત્રી ડેક',
    'High Side Deck': 'હાઈ સાઇડ ડેક',
    'Flatbed Trailer': 'ફ્લેટબેડ ટ્રેલર',
    'Refrigerated Reefer': 'રેફ્રિજરેટેડ રીફર',
    'Tanker (Liquid)': 'ટેન્કર (લિક્વિડ)',
  },
  mr: {
    'General Goods': 'सामान्य माल',
    'FMCG': 'एफएमसीजी वस्तू',
    'Textiles & Garments': 'कापड आणि कपडे',
    'Industrial Goods': 'औद्योगिक वस्तू',
    'Construction Materials': 'बांधकाम साहित्य',
    'E-commerce Parcels': 'ई-कॉमर्स पार्सल',
    'Agriculture Produce': 'कृषी उत्पादने / धान्य',
    'Automobile Parts': 'ऑटोमोबाइल पार्टस',
    'Chemicals (Non-Haz)': 'बिनधोक रसायने',
    'Closed Container': 'बंद कंटेनर',
    'Open Tarpaulin Deck': 'ओपन ताडपत्री डेक',
    'High Side Deck': 'हाय साइड डेक',
    'Flatbed Trailer': 'फ्लॅटबेड ट्रेलर',
    'Refrigerated Reefer': 'रेफ्रिजरेटेड रीफर',
    'Tanker (Liquid)': 'टँकर (लिक्विड)',
  },
  bn: {
    'General Goods': 'সাধারণ পণ্য',
    'FMCG': 'এফএমসিজি পণ্য',
    'Textiles & Garments': 'বস্ত্র ও পোশাক',
    'Industrial Goods': 'শিল্প সামগ্রী',
    'Construction Materials': 'নির্মাণ সামগ্রী',
    'E-commerce Parcels': 'ই-কমার্স পার্সেল',
    'Agriculture Produce': 'কৃষি পণ্য / শস্য',
    'Automobile Parts': 'অটোমোবাইল যন্ত্রাংশ',
    'Chemicals (Non-Haz)': 'অ-বিপজ্জনক রাসায়নিক',
    'Closed Container': 'ক্লোজড কনটেইনার',
    'Open Tarpaulin Deck': 'খোলা ত্রিপল ডেক',
    'High Side Deck': 'হাই সাইড ডেক',
    'Flatbed Trailer': 'ফ্ল্যাটবেড ট্রেলার',
    'Refrigerated Reefer': 'রেফ্রিজারেটেড রিফার',
    'Tanker (Liquid)': 'ট্যাঙ্কার (তরল)',
  },
  ta: {
    'General Goods': 'பொது சரக்குகள்',
    'FMCG': 'FMCG பொருட்கள்',
    'Textiles & Garments': 'ஜவுளி மற்றும் ஆடைகள்',
    'Industrial Goods': 'தொழில்துறை பொருட்கள்',
    'Construction Materials': 'கட்டுமான பொருட்கள்',
    'E-commerce Parcels': 'இ-காமர்ஸ் பார்சல்கள்',
    'Agriculture Produce': 'விவசாய பொருட்கள்',
    'Automobile Parts': 'வாகன உதிரிபாகங்கள்',
    'Chemicals (Non-Haz)': 'பாதுகாப்பான இரசாயனங்கள்',
    'Closed Container': 'மூடப்பட்ட கொள்கலன் (Container)',
    'Open Tarpaulin Deck': 'தார்பாய் மூடப்பட்ட லாரி',
    'High Side Deck': 'ஹை சைட் டெக்',
    'Flatbed Trailer': 'பிளாட்பெட் டிரெய்லர்',
    'Refrigerated Reefer': 'குளிரூட்டப்பட்ட ரீஃபர்',
    'Tanker (Liquid)': 'டேங்கர் லாரி',
  },
  te: {
    'General Goods': 'సాధారణ సరుకులు',
    'FMCG': 'FMCG వస్తువులు',
    'Textiles & Garments': 'వస్త్రాలు & దుస్తులు',
    'Industrial Goods': 'పారిశ్రామిక వస్తువులు',
    'Construction Materials': 'నిర్మాణ సామగ్రి',
    'E-commerce Parcels': 'ఈ-కామర్స్ పార్శిల్స్',
    'Agriculture Produce': 'వ్యవసాయ ఉత్పత్తులు',
    'Automobile Parts': 'ఆటోమొబైల్ విడిభాగాలు',
    'Chemicals (Non-Haz)': 'ప్రమాదకరం కాని రసాయనాలు',
    'Closed Container': 'క్లోజ్డ్ కంటైనర్',
    'Open Tarpaulin Deck': 'ఓపెన్ టార్పాలిన్ డెక్',
    'High Side Deck': 'హై సైడ్ డెక్',
    'Flatbed Trailer': 'ఫ్లాట్‌బెడ్ ట్రైలర్',
    'Refrigerated Reefer': 'రిఫ్రిజిరేటెడ్ రీఫర్',
    'Tanker (Liquid)': 'ట్యాంకర్ (లిక్విడ్)',
  },
  kn: {
    'General Goods': 'ಸಾಮಾನ್ಯ ಸರಕುಗಳು',
    'FMCG': 'ಎಫ್‌ಎಂಸಿಜಿ ಸರಕುಗಳು',
    'Textiles & Garments': 'ಜವಳಿ ಮತ್ತು ಉಡುಪುಗಳು',
    'Industrial Goods': 'ಕೈಗಾರಿಕಾ ಸರಕುಗಳು',
    'Construction Materials': 'ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿಗಳು',
    'E-commerce Parcels': 'ಇ-ಕಾಮರ್ಸ್ ಪಾರ್ಸೆಲ್‌ಗಳು',
    'Agriculture Produce': 'ಕೃಷಿ ಉತ್ಪನ್ನಗಳು',
    'Automobile Parts': 'ಆಟೋಮೊಬೈಲ್ ಬಿಡಿಭಾಗಗಳು',
    'Chemicals (Non-Haz)': 'ಅಪಾಯಕಾರಿಯಲ್ಲದ ರಾಸಾಯನಿಕಗಳು',
    'Closed Container': 'ಮುಚ್ಚಿದ ಕಂಟೇನರ್',
    'Open Tarpaulin Deck': 'ಓಪನ್ ಟಾರ್ಪಲಿನ್ ಡೆಕ್',
    'High Side Deck': 'ಹೈ ಸೈಡ್ ಡೆಕ್',
    'Flatbed Trailer': 'ಫ್ಲಾಟ್‌ಬೆಡ್ ಟ್ರೈಲರ್',
    'Refrigerated Reefer': 'ರೆಫ್ರಿಜರೇಟೆಡ್ ರೀಫರ್',
    'Tanker (Liquid)': 'ಟ್ಯಾಂಕರ್ (ದ್ರವ)',
  },
  ml: {
    'General Goods': 'സാധാരണ സാധനങ്ങൾ',
    'FMCG': 'എഫ്.എം.സി.ജി സാധനങ്ങൾ',
    'Textiles & Garments': 'ടെക്സ്റ്റൈൽസ് & വസ്ത്രങ്ങൾ',
    'Industrial Goods': 'വ്യാവസായിക ഉൽപ്പന്നങ്ങൾ',
    'Construction Materials': 'നിർമ്മാണ സാമഗ്രികൾ',
    'E-commerce Parcels': 'ഇ-കൊമേഴ്‌സ് പാർസലുകൾ',
    'Agriculture Produce': 'കാർഷിക ഉൽപ്പന്നങ്ങൾ',
    'Automobile Parts': 'വാഹന സ്പെയർ പാർട്സുകൾ',
    'Chemicals (Non-Haz)': 'അപകടകരമല്ലാത്ത രാസവസ്തുക്കൾ',
    'Closed Container': 'ക്ലോസ്ഡ് കണ്ടെയ്നർ',
    'Open Tarpaulin Deck': 'തുറന്ന ടാർപോളിൻ ഡെക്ക്',
    'High Side Deck': 'ഹൈ സൈഡ് ഡെക്ക്',
    'Flatbed Trailer': 'ഫ്ലാറ്റ്ബെഡ് ട്രെയിലർ',
    'Refrigerated Reefer': 'ശീതീകരിച്ച റീഫർ',
    'Tanker (Liquid)': 'ടാങ്കർ (ദ്രാവകം)',
  },
  pa: {
    'General Goods': 'ਆਮ ਮਾਲ',
    'FMCG': 'ਐਫ.ਐਮ.ਸੀ.ਜੀ ਸਮਾਨ',
    'Textiles & Garments': 'ਕੱਪੜਾ ਅਤੇ ਗਾਰਮੈਂਟਸ',
    'Industrial Goods': 'ਉਦਯੋਗਿਕ ਸਮਾਨ',
    'Construction Materials': 'ਉਸਾਰੀ ਸਮੱਗਰੀ',
    'E-commerce Parcels': 'ਈ-ਕਾਮਰਸ ਪਾਰਸਲ',
    'Agriculture Produce': 'ਖੇਤੀਬਾੜੀ ਉਪਜ / ਅਨਾਜ',
    'Automobile Parts': 'ਆਟੋਮੋਬਾਈਲ ਪਾਰਟਸ',
    'Chemicals (Non-Haz)': 'ਗੈਰ-ਖਤਰਨਾਕ ਰਸਾਇਣ',
    'Closed Container': 'ਬੰਦ ਕੰਟੇਨਰ',
    'Open Tarpaulin Deck': 'ਖੁੱਲ੍ਹਾ ਤਰਪਾਲ ਡੈੱਕ',
    'High Side Deck': 'ਹਾਈ ਸਾਈਡ ਡੈੱਕ',
    'Flatbed Trailer': 'ਫਲੈਟਬੈੱਡ ਟ੍ਰੇਲਰ',
    'Refrigerated Reefer': 'ਰੈਫ੍ਰਿਜਰੇਟਿਡ ਰੀਫਰ',
    'Tanker (Liquid)': 'ਟੈਂਕਰ (ਤਰਲ)',
  },
  ur: {
    'General Goods': 'عام سامان',
    'FMCG': 'ایف ایم سی جی',
    'Textiles & Garments': 'کپڑا اور گارمنٹس',
    'Industrial Goods': 'صنعتی سامان',
    'Construction Materials': 'تعمیراتی سامان',
    'E-commerce Parcels': 'ای کامرس پارسل',
    'Agriculture Produce': 'زرعی اجناس / اناج',
    'Automobile Parts': 'گاڑیوں کے پرزے',
    'Chemicals (Non-Haz)': 'غیر خطرناک کیمیکلز',
    'Closed Container': 'بند کنٹینر',
    'Open Tarpaulin Deck': 'کھلا ترپال ڈیک',
    'High Side Deck': 'ہائی سائیڈ ڈیک',
    'Flatbed Trailer': 'فلیٹ بیڈ ٹریلر',
    'Refrigerated Reefer': 'ریفریجریٹڈ ریفر',
    'Tanker (Liquid)': 'ٹینکر (مائع)',
  },
}

export function translate(key: string, lang: LanguageCode = 'en'): string {
  if (!key) return ''
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en
  const val = (dict as any)[key]
  if (val !== undefined && val !== null && val !== '') {
    return val
  }
  
  // Check category and body type translations
  const catDict = CATEGORY_TRANSLATIONS[lang] || CATEGORY_TRANSLATIONS.en
  if (catDict && catDict[key]) {
    return catDict[key]
  }

  return (TRANSLATIONS.en as any)[key] ?? key
}

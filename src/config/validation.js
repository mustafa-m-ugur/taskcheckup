import * as yup from 'yup';

export const individualValidationSchema = yup.object().shape({
  fullName: yup.string().required('Ad alanı zorunludur.'),
  phone: yup.string().required('Telefon alanı zorunludur.'),
  email: yup
    .string()
    .email('Geçerli bir email giriniz.')
    .required('Email alanı zorunludur.'),
  password: yup
    .string()
    .min(4, ({min}) => `Şifre minimum ${min} karakter olmalıdır.`)
    .required('Şifre alanı zorunludur.'),
  againPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Şifreler eşleşmedi.'),
  checkContracts: yup.boolean().required(),
  checkNotifications: yup.boolean().required(),
});

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Geçerli bir email giriniz.')
    .required('Email alanı zorunludur.'),
  password: yup
    .string()
    .min(4, ({min}) => `Şifre minimum ${min} karakter olmalıdır.`)
    .required('Şifre alanı zorunludur.'),
});

export const corporateValidationSchema = yup.object().shape({
  fullName: yup.string().required('Ad alanı zorunludur.'),
  companyName: yup.string().required('Şirket adı alanı zorunludur.'),
  taxOffice: yup.string().required('Vergi dairesi alanı zorunludur.'),
  taxNumber: yup.string().required('Vergi numarası alanı zorunludur.'),
  phone: yup.string().required('Telefon alanı zorunludur.'),
  email: yup
    .string()
    .email('Geçerli bir email giriniz.')
    .required('Email alanı zorunludur.'),
  password: yup
    .string()
    .min(4, ({min}) => `Şifre minimum ${min} karakter olmalıdır.`)
    .required('Şifre alanı zorunludur.'),
  againPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Şifreler eşleşmedi.'),
});

export const changePasswordValidationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8, ({min}) => `Şifre minimum ${min} karakter olmalıdır.`)
    .required('Mevcut şifre alanı zorunludur.'),
  newPassword: yup
    .string()
    .min(8, ({min}) => `Şifre minimum ${min} karakter olmalıdır.`)
    .required('Yeni şifre alanı zorunludur.'),
  rePassword: yup
    .string()
    .min(8, ({min}) => `Şifre minimum ${min} karakter olmalıdır.`)
    .required('Yeni şifre tekrar alanı zorunludur.')
    .oneOf([yup.ref('newPassword'), null], 'Şifreler eşleşmedi.'),
});

export const refreshPasswordValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, ({min}) => `Şifre minimum ${min} karakter olmalıdır.`)
    .required('Yeni şifre alanı zorunludur.'),
  rePassword: yup
    .string()
    .min(8, ({min}) => `Şifre minimum ${min} karakter olmalıdır.`)
    .oneOf([yup.ref('newPassword'), null], 'Şifreler eşleşmedi.')
    .required('Yeni şifre tekrar alanı zorunludur.'),
});

export const emailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Geçerli bir email giriniz.')
    .required('Email alanı zorunludur.'),
});

export const phoneValidationSchema = yup.object().shape({
  phone: yup.string().required('Telefon alanı zorunludur.'),
});

export const contactInfoValidationSchema = yup.object().shape({
  fullName: yup.string().required('Ad alanı zorunludur.'),
  gender: yup.object().required('Cinsiyet alanı zorunludur.'),
  birthDate: yup.date().required('Doğum tarihi alanı zorunludur.'),
});

export const addressDetailValidationSchema = yup.object().shape({
  addressName: yup.string().required('Adres adı alanı zorunludur.'),
  personName: yup.string().required('Adı soyadı alanı zorunludur.'),
  phone: yup.string().required('Telefon numarası alanı zorunludur.'),
  placeName: yup.string(),
  province: yup.object().required('İl alanı zorunludur.'),
  district: yup.object().required('İlçe alanı zorunludur.'),
  neighborhood: yup.object().required('Mahalle alanı zorunludur.'),
  streetName: yup.string().required('Sokak veya Cadde adı alanı zorunludur.'),
  buildingNo: yup.string().required('Bina no alanı zorunludur.'),
  floor: yup.string().required('Kat alanı zorunludur.'),
  apartmentNo: yup.string().required('Daire alanı zorunludur.'),
});

export const corporateContactInfoValidationSchema = yup.object().shape({
  authorizedPersonFullName: yup
    .string()
    .required('Yetkili adı soyadı alanı zorunludur.'),
  companyName: yup.string().required('Şirket adı alanı zorunludur.'),
  taxAdministration: yup.string().required('Vergi dairesi alanı zorunludur.'),
  taxNumber: yup.string().required('Vergi numarası alanı zorunludur.'),
});

export const reminderDetailValidationSchema = yup.object().shape({
  personName: yup.string().required('Adı soyadı alanı zorunludur.'),
  specialDayType: yup.object().required('Özel gün tipi alanı zorunludur.'),
  specialDayDate: yup.date().required('Özel gün tarihi alanı zorunludur.'),
  reminderTimeNumber: yup
    .object()
    .required('Hatırlatma zamanı alanı zorunludur.'),
});

export const contactFormValidationSchema = yup.object().shape({
  fullName: yup.string().required('Ad soyad alanı zorunludur.'),
  phone: yup.string().required('Telefon numarası alanı zorunludur.'),
  message: yup.string().required('Mesaj alanı zorunludur.'),
  subject: yup.object().required('Konu alanı zorunludur.'),
});

export const storeApplicationValidationSchema = yup.object().shape({
  company_type_id: yup.object().required('Başvuru Türü alanı zorunludur.'),
  shop_name: yup.string().required('Mağaza adı alanı zorunludur.'),
  full_name: yup.string().required('Adınız soyadınız alanı zorunludur.'),
  phone: yup.string().required('Telefon numaranız alanı zorunludur.'),
  email: yup
    .string()
    .email('Geçerli bir email giriniz.')
    .required('E-posta adresiniz alanı zorunludur.'),
  city_id: yup.object().required('İl alanı zorunludur.'),
  county_id: yup.object().required('İlçe alanı zorunludur.'),
  neighborhood_id: yup.object().required('Mahalle alanı zorunludur.'),
  address: yup.string().required('Adres detay alanı zorunludur.'),
  shipping_area: yup
    .string()
    .required('Dağıtım yapabileceğiniz bölgeler alanı zorunludur.'),
  taxPlate: yup.string().required('Vergi levhası alanı zorunludur.'),
});

import { isValidIBAN } from 'ibantools';
import { BANK_CODES } from './bankCodes';


const cleanIban = (iban: string): string => 
    iban.replace(/[\s-]/g, "").toUpperCase();


export const isWellFormatted = (iban: string): boolean => 
    /^ES\d{22}$/i.test(cleanIban(iban));


export const isValidIban = (iban: string): boolean =>
    isValidIBAN(cleanIban(iban));


export const extractIbanInfo = (iban: string) => {
    const cleaned = cleanIban(iban);
    return {
        bankCode: cleaned.slice(4, 8),
        branchCode: cleaned.slice(8, 12),
        branchControlDigit: cleaned.slice(12, 14),
        accountNumber: cleaned.slice(14),
    };
};


export const getBankName = (bankCode: string): string =>
    BANK_CODES[bankCode] || "Banco desconocido";
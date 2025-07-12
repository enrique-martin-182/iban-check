import {
  isWellFormatted,
  isValidIban,
  extractIbanInfo,
  getBankName
} from './ibanUtils';

const ibanInputElement = document.getElementById('ibanInput');
if (!(ibanInputElement instanceof HTMLInputElement)) {
  throw new Error('Elemento ibanInput no encontrado o no es un input');
}

const elements = {
  ibanInput: ibanInputElement,
  validateButton: document.getElementById('validateButton')!,
  resultContainer: document.getElementById('resultContainer')!,
  errorMessage: document.getElementById('errorMessage')!,
  bankName: document.getElementById('bankName')!,
  branchCode: document.getElementById('branchCode')!,
  controlDigit: document.getElementById('controlDigit')!,
  accountNumber: document.getElementById('accountNumber')!,
};

const mostrarIban = (rawIban: string) => {
  elements.errorMessage.classList.add('hidden');
  elements.resultContainer.classList.add('hidden');

  if (!rawIban) throw new Error('Por favor introduce un IBAN');
  if (!isWellFormatted(rawIban)) throw new Error('Formato IBAN incorrecto');
  if (!isValidIban(rawIban)) throw new Error('IBAN inválido');

  const ibanInfo = extractIbanInfo(rawIban);

  elements.bankName.textContent = getBankName(ibanInfo.bankCode);
  elements.branchCode.textContent = ibanInfo.branchCode;
  elements.controlDigit.textContent = ibanInfo.branchControlDigit;
  elements.accountNumber.textContent = ibanInfo.accountNumber;
  elements.resultContainer.classList.remove('hidden');
}

const mostrarError = (error: unknown) => {
  if (error instanceof Error) {
    elements.errorMessage.textContent = error.message;
    elements.errorMessage.classList.remove('hidden');
  }
}

const handleValidation = () => {
  const rawIban = elements.ibanInput.value.trim();

  try {
    mostrarIban(rawIban);

  } catch (error) {
    mostrarError(error)
  }
};

export const cargarAplicacion = () => {
  elements.validateButton.addEventListener('click', handleValidation);
  elements.ibanInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleValidation();
  });
}

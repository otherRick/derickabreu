import PhoneInput, { CountryData } from 'react-phone-input-2';

interface IInput {
  label?: string;
  phoneValue?: string | null;
  readOnly?: boolean | undefined;
  phoneInput?: boolean | undefined;
  value?: React.HTMLInputTypeAttribute | undefined | null;
  type?: React.HTMLInputTypeAttribute | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onPhoneChange?: (
    phoneValue: string,
    data: object | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => void;
  inputmode?:
    | 'email'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal'
    | undefined;
}

export const Input = ({
  label,
  readOnly,
  value,
  type,
  onChange,
  phoneValue,
  onBlur,
  inputmode,
  onPhoneChange,
  phoneInput
}: IInput) => {
  return (
    <div className='flex gap-1 items-center w-full justify-between'>
      <p className={`text-xs ${readOnly ? 'hidden' : ''}`}>{label}</p>
      {phoneInput ? (
        <PhoneInput
          dropdownStyle={{ backgroundColor: 'transparent' }}
          inputStyle={{ width: '100%', backgroundColor: 'transparent' }}
          buttonStyle={{ backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: 'transparent' }}
          searchStyle={{ backgroundColor: 'transparent' }}
          country={'br'}
          value={phoneValue}
          onChange={onPhoneChange}
        />
      ) : (
        <input
          inputMode={inputmode}
          onBlur={onBlur}
          onChange={onChange}
          readOnly={readOnly}
          className={`${
            !readOnly ? 'border border-gray-500 rounded-md ' : 'text-start'
          } bg-transparent outline-none w-full pl-2 p-2 text-xl`}
          value={value ?? ''}
          type={type}
        />
      )}
    </div>
  );
};

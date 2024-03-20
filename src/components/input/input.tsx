export interface IInput {
  label?: string;
  readOnly?: boolean | undefined;
  value?: React.HTMLInputTypeAttribute | undefined;
  type?: React.HTMLInputTypeAttribute | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const Input = ({ label, readOnly, value, type, onChange }: IInput) => {
  return (
    <div className='flex gap-1 items-center justify-between'>
      <p className={`text-xs ${readOnly ? 'hidden' : ''}`}>{label}</p>
      <input
        onChange={onChange}
        readOnly={readOnly}
        className={`${
          !readOnly ? 'border border-gray-500 rounded-md ' : 'text-center'
        } bg-transparent outline-none  pl-2`}
        value={value ?? ''}
        type={type}
      />
    </div>
  );
};

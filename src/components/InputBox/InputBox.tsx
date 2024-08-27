interface inputPropInterface {
  changeFun: (e: any) => void;
  lableText: string;
  placeholderText: string;
  value: string;
}

function InputBox({
  changeFun,
  lableText,
  placeholderText,
  value,
}: inputPropInterface) {
  return (
    <div className="flex flex-col">
      <label htmlFor="username" className="font-bold">
        {lableText}:
      </label>
      <input
        className="flex items-center p-1 text-black"
        id="username"
        value={value}
        type="text"
        onChange={changeFun}
        placeholder={placeholderText}
      />
    </div>
  );
}

export default InputBox;

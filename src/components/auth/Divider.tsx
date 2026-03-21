type Props = {
    text?: string,
}

const Divider = ({text = "or"}: Props) => {
  return (
    <div className="flex items-center justify-center gap-3 mt-6 w-full">
      <div className="flex-1 h-[1.5px] w-full bg-gray-300"></div>
      {text && (
        <span className="text-sm text-gray-500 whitespace-nowrap">{text}</span>
      )}
      <div className="flex-1 h-[1.5px] w-full bg-gray-300"></div>
    </div>
  );
}

export default Divider
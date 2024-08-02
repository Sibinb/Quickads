
function Button({icon, text, backgroundColor = false}) {
  return (
    <div className={`flex-center rounded-lg gap-1 h-[25px] w-auto px-3 py-4 border border-black-600 box-border ${backgroundColor ? "bg-sky-600 text-white" : "bg-white"}`}>
     {icon} <span className="text-base">{text}</span>
    </div>
  )
}

export default Button;
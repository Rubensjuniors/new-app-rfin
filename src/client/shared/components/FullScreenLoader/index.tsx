export const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="relative">
        <div className="absolute inset-0 blur-2xl opacity-30 animate-pulse">
          <img src="/icons/logo.svg" alt="" className="w-24 h-24" aria-hidden="true" />
        </div>
        <img
          src="/icons/logo.svg"
          alt="rfin logo"
          className="w-24 h-24 animate-[pulse_2s_ease-in-out_infinite]"
        />
      </div>
    </div>
  )
}

import logo71Digital from "@assets/71digital logo.png";

export default function LogoBackdrop() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
      <img
        src={logo71Digital}
        alt="71 Digital Logo Backdrop"
        className="w-auto h-80 md:h-96 lg:h-[500px] xl:h-[600px] object-contain opacity-3 select-none"
      />
    </div>
  );
}
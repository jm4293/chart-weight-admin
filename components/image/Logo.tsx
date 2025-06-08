"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/toplogo.png";

export default function Logo() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div className="w-full flex justify-center px-4 py-8 cursor-pointer">
      <Image src={logo} alt="logo" width={366} height={60} onClick={handleLogoClick} />
    </div>
  );
}

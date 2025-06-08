import Link from "next/link";

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="w-full mt-4 bg-gray-500 text-white p-4 rounded hover:bg-gray-600 transition-colors text-center"
    >
      처음으로 돌아가기
    </Link>
  );
}

export default function Loading() {
  return (
    <div className="fixed w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-white z-50">
      <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );
}

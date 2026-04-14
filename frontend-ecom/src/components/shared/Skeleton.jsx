const Skeleton = () => {
  return (
    <div className="animate-pulse p-6 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-10 bg-slate-200 rounded-md w-full" />
      ))}
    </div>
  );
};

export default Skeleton;

function InfoRowOnDetailUser({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-zinc-100 text-zinc-500">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-zinc-400 leading-none mb-0.5">{label}</p>
        <p className="text-sm font-medium text-zinc-800 truncate">{value}</p>
      </div>
    </div>
  );
}
export default InfoRowOnDetailUser;

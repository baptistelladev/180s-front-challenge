export default function NewQuotationProductCardSkeleton() {
  return (
    <div className="w-full bg-card text-card-foreground gap-6 rounded-xl border hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
      <div className="px-6 gap-1.5 pt-6 flex-1 flex flex-col">
        <div className="flex items-center w-full gap-3">
          <div className="p-2 bg-primary/10 rounded-lg h-10 w-10" />
          <div className="bg-primary/10 rounded-lg h-3.5 w-30" />
        </div>
        <div className="bg-primary/10 rounded-lg h-3.5 w-50" />
      </div>

      <div className="px-6 pb-6">
        <div className="rounded-md text-xs font-medium transition-all bg-primary/10 animate-pulse h-8 p-0 w-full px-4 py-2" />
      </div>
    </div>
  );
}

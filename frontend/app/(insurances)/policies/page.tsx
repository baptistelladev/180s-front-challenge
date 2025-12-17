import PageHeaderComp from "@/components/layout/PageHeader";

export default function PoliciesPage() {
  return (
    <div className="policies">
      <PageHeaderComp
        icon="file-text"
        title="Minhas Apólices"
        subTitle="Gerencie suas apólices de seguro emitidas"
      />

      <div>
        <div>
          <h1 className="mb-2">Minhas Apólices</h1>
          <p className="text-muted-foreground">
            Gerencie suas apólices de seguro
          </p>
        </div>
      </div>
    </div>
  );
}

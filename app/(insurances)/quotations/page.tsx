import PageHeaderComp from "@/components/layout/PageHeader";

export default function PoliciesPage() {
  return (
    <div className="policies">
      <PageHeaderComp
        icon="add"
        title="Nova cotação"
        subTitle="Gerencie suas apólices de seguro emitidas"
      />

      <div>
        <div>
          <h1 className="mb-2">Minhas Apólices</h1>
          <p className="text-muted-foreground">
            Escolha o tipo de seguro que deseja cotar
          </p>
        </div>
      </div>
    </div>
  );
}

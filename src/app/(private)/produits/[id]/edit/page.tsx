type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProduitPage({
  params,
}: Props) {

  const { id } = await params;

  return (
    <div className="space-y-6">

      <h1
        className="
          text-3xl
          font-bold
        "
      >
        Modifier Produit
      </h1>

      <p>
        Produit ID : {id}
      </p>

      <p>
        Formulaire édition
        à connecter
      </p>
    </div>
  );
}
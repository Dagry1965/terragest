interface WorkflowCardProps {

  workflow: any;
}

export const WorkflowCard = ({
  workflow,
}: WorkflowCardProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <p className="
            text-gray-500
          ">
            Workflow
          </p>

          <h2 className="
            text-2xl
            font-bold
            mt-2
          ">
            {workflow.nom}
          </h2>

        </div>

        <div className="
          px-3
          py-1
          rounded-full
          bg-green-100
          text-green-700
          text-sm
        ">
          ACTIF
        </div>

      </div>

      <p className="
        text-gray-600
        mt-4
      ">
        {workflow.description}
      </p>

      <div className="
        mt-6
      ">

        <p className="
          text-sm
          text-gray-500
        ">
          Steps :
          {workflow.steps?.length || 0}
        </p>

      </div>

    </div>
  );
}

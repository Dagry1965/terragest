import { InvitationForm }
from "@/features/invitations/components/InvitationForm";

import { TeamMembersTable }
from "@/features/teams/components/TeamMembersTable";

export default function TeamPage() {

  return (
    <div
      className="
        p-6
        space-y-6
      "
    >
      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Team Management
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Gestion organisation
        </p>
      </div>

      <InvitationForm />

      <TeamMembersTable />
    </div>
  );
}
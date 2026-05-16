"use client";

import {
  useState,
} from "react";

import { InvitationService }
from "@/features/invitations/services/InvitationService";

type Props = {

  params: Promise<{
    token: string;
  }>;
};

export default async function
AcceptInvitationPage({
  params,
}: Props) {

  const { token } =
    await params;

  return (
    <AcceptInvitationClient
      token={token}
    />
  );
}

function AcceptInvitationClient({
  token,
}: {
  token: string;
}) {

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    success,
    setSuccess,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  async function handleAccept() {

    try {

      setLoading(true);

      await InvitationService.accept(
        token,
        "demo-user"
      );

      setSuccess(true);

    } catch (e: any) {

      setError(
        e.message
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
        p-6
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          border
          p-8
          w-full
          max-w-md
          space-y-6
        "
      >
        <div>

          <h1
            className="
              text-2xl
              font-bold
            "
          >
            Invitation
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Rejoindre organisation
          </p>
        </div>

        {success ? (

          <div
            className="
              bg-green-50
              border
              border-green-200
              rounded-xl
              p-4
            "
          >
            Invitation acceptÃ©e
          </div>

        ) : (

          <>
            {error && (

              <div
                className="
                  bg-red-50
                  border
                  border-red-200
                  rounded-xl
                  p-4
                  text-red-700
                "
              >
                {error}
              </div>
            )}

            <button
              onClick={handleAccept}
              disabled={loading}
              className="
                w-full
                bg-black
                text-white
                rounded-xl
                py-3
              "
            >
              {
                loading
                  ? "Chargement..."
                  : "Accepter invitation"
              }
            </button>
          </>
        )}
      </div>
    </div>
  );
}
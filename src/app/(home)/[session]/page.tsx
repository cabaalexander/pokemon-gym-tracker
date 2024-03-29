"use client";

import { Badges, type BadgesProps } from "~/app/_components/ui/badges";
import { JoinTrainer } from "~/app/_components/ui/join-trainer";
import { Title } from "~/app/_components/title";
import { usePathname } from "next/navigation";
import { useApp } from "~/app/_hooks/app";
import { useEffect } from "react";
import { TrainersBadges } from "~/app/_components/ui/trainers-badges";
import { api } from "~/trpc/react";

import { useTrainer } from "~/app/_hooks/trainer";
import { getTrainer } from "~/utils/get-trainer";
import { env } from "~/env";
import { ContextMenuTrainer } from "~/app/_components/ui/context-menu/trainer";
import { ContextMenuBadge } from "~/app/_components/ui/context-menu/badge";
import { ModalBase } from "~/app/_components/ui/modals/modal-base";
import { ModalProvider } from "~/app/_context/modal";

export default function Session() {
  const { app } = useApp();
  const { trainers: localTrainers } = useTrainer();

  const localTrainer = getTrainer({
    trainers: localTrainers,
    sessionPath: app.sessionId,
  });
  const isNotDev = env.NEXT_PUBLIC_NODE_ENV !== "development";

  const { setSession } = useApp();
  const sessionId = usePathname().split("/")[1] ?? "";

  const getTrainers = api.trainer.getTrainers.useQuery(
    { sessionId },
    { ...(isNotDev && { refetchInterval: 1000 }) },
  );

  useEffect(() => {
    setSession({ id: sessionId });
  }, [sessionId]);

  const badgesProps: BadgesProps = {
    className: "w-64 sm:size-full lg:gap-2",
    classNameBadgesRow: "md:grid-cols-8",
    badgesSize: "md:size-8 lg:size-10",
  };

  return (
    <main className="container mx-auto grid grid-cols-1 justify-items-center gap-y-4 ">
      <ModalProvider>
        <Title className="text-center sm:col-span-full " />

        <div className="grid w-fit items-center  justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:justify-items-start">
          <Badges init highlightBadges={localTrainer} {...badgesProps} />

          <JoinTrainer
            className="w-full "
            inputClassName="grow min-h-[40px]"
            sessionId={sessionId}
          />

          <div className="hidden lg:block">{/** grid divider */}</div>

          <TrainersBadges
            disabled
            localTrainer={localTrainer}
            trainers={getTrainers.data}
            {...badgesProps}
          />
        </div>

        {localTrainer?.sessionLeader && <ContextMenuTrainer />}
        <ContextMenuBadge />
        <ModalBase />
      </ModalProvider>
    </main>
  );
}

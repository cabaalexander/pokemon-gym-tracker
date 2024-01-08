import classNames from "classnames";
import { Badge } from "~/app/_components/badge";
import { type PokemonVersion } from "~/types";

export type BadgesRowProps = {
  className?: string;
  badges?: number[];
  version: PokemonVersion;
  badgesSize?: string;
  disabled?: boolean;
  notrack?: boolean;
  highlightBadges?: number[];
};

export function BadgesRow(props: BadgesRowProps) {
  if (!props.badges || props.badges.length === 0) {
    return null;
  }

  return (
    <div className={classNames("grid grid-cols-4 gap-2 ", props.className)}>
      {props.badges.sort().map((badgeOrder, i) => {
        return (
          <Badge
            size={classNames("size-[50px]", props.badgesSize)}
            disabled={props.disabled}
            key={i}
            number={badgeOrder}
            version={props.version}
            active={props.highlightBadges?.includes(badgeOrder)}
          />
        );
      })}
    </div>
  );
}
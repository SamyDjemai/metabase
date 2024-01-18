import cx from "classnames";
import { Icon } from "metabase/ui";

type Props = {
  name: "close" | "enter_or_return" | "empty" | "chevrondown" | "refresh";
  onClick?: () => void;
};

export function WidgetStatusIcon({ name, onClick }: Props) {
  const classes = cx(
    "flex-align-right flex-no-shrink",
    ["close", "refresh"].includes(name) && "cursor-pointer",
  );

  const handleOnClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <Icon name={name} onClick={handleOnClick} size={12} className={classes} />
  );
}

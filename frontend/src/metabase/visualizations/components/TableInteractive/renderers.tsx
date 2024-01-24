import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { Facebook, Twitter, Search, Mail } from "react-feather";
import { Icon } from "metabase/ui";

const getVal = r => {
  const { row, column } = r;
  return row[column.idx - 1];
};

export const defaultRenderer = (row: Row) => {
  return <div>{String(getVal(row))}</div>;
};

export const emailRenderer = (row: Row) => {
  return (
    <div>
      <Icon name="mail" size={12} className="mr1" style={{ opacity: 0.6 }} />
      {String(getVal(row))}
    </div>
  );
};

export const sourceRenderer = (row: Row) => {
  const size = 12;
  const val = getVal(row);
  function getIcon(val: string) {
    switch (val) {
      case "Facebook":
        return <Facebook size={size} />;
      case "Twitter":
        return <Twitter size={size} />;
      case "Google":
        return <Search size={size} />;
      case "Invite":
        return <Mail size={size} />;
      default:
        return null;
    }
  }
  return (
    <div
      style={{ color: val ? "inherirt" : "#666" }}
      className="flex align-center"
    >
      {val && (
        <span className="mr1" style={{ opacity: 0.6 }}>
          {getIcon(val)}
        </span>
      )}
      {String(getVal(row))}
    </div>
  );
};

export const countryRenderer = (row: Row) => {
  const val = getVal(row);
  return (
    <>
      <span className="mr1">{getUnicodeFlagIcon(String(val))}</span>
      {String(val)}
    </>
  );
};

export const booleanRenderer = (row: Row) => {
  const val = getVal(row);

  return (
    <div>
      <div
        className="mr1"
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: 12,
          backgroundColor: val ? "#22c55e" : "#ef4444",
        }}
      ></div>
      {String(val)}
    </div>
  );
};

export const dateRenderer = (row: Row) => {
  return (
    <div>
      <Icon
        name="calendar"
        size={12}
        className="mr1"
        style={{ opacity: 0.6 }}
      />
      {new Date(getVal(row)).toLocaleString("en")}
    </div>
  );
};

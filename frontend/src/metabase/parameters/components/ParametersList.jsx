/* eslint-disable react/prop-types */
import { useCallback, useMemo } from "react";
import cx from "classnames";
import { useSensor, PointerSensor } from "@dnd-kit/core";

import { Icon } from "metabase/ui";
import { getVisibleParameters } from "metabase/parameters/utils/ui";
import { SortableList } from "metabase/core/components/Sortable";
import { ParameterWidget } from "./ParameterWidget";

const getId = valuePopulatedParameter => valuePopulatedParameter.id;

function ParametersList({
  className,

  parameters,
  question,
  dashboard,
  editingParameter,

  isFullscreen,
  isNightMode,
  hideParameters,
  isEditing,
  vertical,
  commitImmediately,

  setParameterValue,
  setParameterIndex,
  setEditingParameter,
}) {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 0 },
  });
  const visibleValuePopulatedParameters = useMemo(
    () => getVisibleParameters(parameters, hideParameters),
    [parameters, hideParameters],
  );

  const handleSortStart = useCallback(() => {
    document.body.classList.add("grabbing");
  }, []);

  const handleSortEnd = useCallback(
    ({ id, newIndex }) => {
      document.body.classList.remove("grabbing");
      if (setParameterIndex) {
        setParameterIndex(id, newIndex);
      }
    },
    [setParameterIndex],
  );

  const renderItem = valuePopulatedParameter => (
    <ParameterWidget
      className={cx({ mb2: vertical })}
      isEditing={isEditing}
      isFullscreen={isFullscreen}
      isNightMode={isNightMode}
      parameter={valuePopulatedParameter}
      parameters={parameters}
      question={question}
      dashboard={dashboard}
      editingParameter={editingParameter}
      setEditingParameter={setEditingParameter}
      setValue={
        setParameterValue &&
        (value => setParameterValue(valuePopulatedParameter.id, value))
      }
      commitImmediately={commitImmediately}
      dragHandle={
        isEditing && setParameterIndex ? (
          <div className="flex layout-centered cursor-grab text-inherit">
            <Icon name="grabber" />
          </div>
        ) : null
      }
    />
  );

  return visibleValuePopulatedParameters.length > 0 ? (
    <div
      className={cx(
        className,
        "flex align-end flex-wrap",
        vertical ? "flex-column" : "flex-row",
      )}
    >
      <SortableList
        items={visibleValuePopulatedParameters}
        getId={getId}
        renderItem={renderItem}
        onSortEnd={handleSortEnd}
        onSortStart={handleSortStart}
        disableSort={!isEditing}
        sensors={[pointerSensor]}
      />
    </div>
  ) : null;
}

ParametersList.defaultProps = {
  vertical: false,
  commitImmediately: false,
};

export default ParametersList;

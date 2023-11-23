import type { DatasetColumn, RowValue } from "metabase-types/api";
import { createOrdersTotalDatasetColumn } from "metabase-types/api/mocks/presets";
import * as Lib from "metabase-lib";
import {
  columnFinder,
  createQuery,
  findDrillThru,
  queryDrillThru,
} from "./test-helpers";

describe("drill-thru/sort", () => {
  const drillType = "drill-thru/sort";
  const initialQuery = createQuery();
  const stageIndex = 0;
  const findColumn = columnFinder(
    initialQuery,
    Lib.orderableColumns(initialQuery, stageIndex),
  );

  describe("availableDrillThrus", () => {
    it("should return directions for unsorted query", () => {
      const { drillInfo } = findDrillInfo(
        drillType,
        initialQuery,
        stageIndex,
        createOrdersTotalDatasetColumn(),
      );
      expect(drillInfo).toMatchObject({
        type: drillType,
        directions: ["asc", "desc"],
      });
    });

    it("should return directions when the query is sorted ascending", () => {
      const query = Lib.orderBy(
        initialQuery,
        stageIndex,
        findColumn("ORDERS", "TOTAL"),
        "asc",
      );
      const { drillInfo } = findDrillInfo(
        drillType,
        query,
        stageIndex,
        createOrdersTotalDatasetColumn(),
      );
      expect(drillInfo).toMatchObject({
        type: drillType,
        directions: ["desc"],
      });
    });

    it("should return directions when the query is sorted descending", () => {
      const query = Lib.orderBy(
        initialQuery,
        stageIndex,
        findColumn("ORDERS", "TOTAL"),
        "desc",
      );
      const { drillInfo } = findDrillInfo(
        drillType,
        query,
        stageIndex,
        createOrdersTotalDatasetColumn(),
      );
      expect(drillInfo).toMatchObject({
        type: drillType,
        directions: ["asc"],
      });
    });
  });
});

describe("drill-thru/column-filter", () => {
  const drillType = "drill-thru/column-filter";
  const initialQuery = createQuery();
  const stageIndex = 0;

  describe("availableDrillThrus", () => {
    it("should allow to drill when clicked on a column header", () => {
      const column = createOrdersTotalDatasetColumn();
      const { drillInfo } = findDrillInfo(
        drillType,
        initialQuery,
        stageIndex,
        column,
      );

      expect(drillInfo).toMatchObject({
        type: drillType,
      });
    });

    it("should not allow to drill when clicked on a value", () => {
      const column = createOrdersTotalDatasetColumn();
      const value = 10;
      const row = [{ col: column, value }];
      const drill = queryDrillThru(
        drillType,
        initialQuery,
        stageIndex,
        column,
        value,
        row,
      );

      expect(drill).toBeNull();
    });

    it("should not allow to drill when clicked on a null value", () => {
      const column = createOrdersTotalDatasetColumn();
      const value = null;
      const row = [{ col: column, value }];
      const drill = queryDrillThru(
        drillType,
        initialQuery,
        0,
        column,
        value,
        row,
      );

      expect(drill).toBeNull();
    });
  });
});

function findDrillInfo(
  drillType: Lib.DrillThruType,
  query: Lib.Query,
  stageIndex: number,
  column: DatasetColumn,
  value?: RowValue,
  row?: Lib.DataRow,
  dimensions?: Lib.DataDimension[],
) {
  const drill = findDrillThru(
    drillType,
    query,
    stageIndex,
    column,
    value,
    row,
    dimensions,
  );
  const drillInfo = Lib.displayInfo(query, 0, drill);
  return { drill, drillInfo };
}

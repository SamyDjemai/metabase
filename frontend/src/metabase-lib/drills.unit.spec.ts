import { createOrdersTotalDatasetColumn } from "metabase-types/api/mocks/presets";
import * as Lib from "metabase-lib";
import {
  columnFinder,
  createQuery,
  findDrillThru,
  queryDrillThru,
} from "metabase-lib/test-helpers";

describe("drill-thru/sort", () => {
  const drillType = "drill-thru/sort";
  const initialQuery = createQuery();
  const stageIndex = 0;
  const column = createOrdersTotalDatasetColumn();
  const findColumn = columnFinder(
    initialQuery,
    Lib.orderableColumns(initialQuery, stageIndex),
  );

  describe("availableDrillThrus", () => {
    it("should allow to drill when query is not sorted", () => {
      const { drillInfo } = findDrillThru(
        drillType,
        initialQuery,
        stageIndex,
        column,
      );
      expect(drillInfo).toMatchObject({
        type: drillType,
        directions: ["asc", "desc"],
      });
    });

    it("should allow to drill when query is sorted ascending", () => {
      const query = Lib.orderBy(
        initialQuery,
        stageIndex,
        findColumn("ORDERS", "TOTAL"),
        "asc",
      );
      const { drillInfo } = findDrillThru(drillType, query, stageIndex, column);
      expect(drillInfo).toMatchObject({
        type: drillType,
        directions: ["desc"],
      });
    });

    it("should allow to drill when query is sorted descending", () => {
      const query = Lib.orderBy(
        initialQuery,
        stageIndex,
        findColumn("ORDERS", "TOTAL"),
        "desc",
      );
      const { drillInfo } = findDrillThru(drillType, query, stageIndex, column);
      expect(drillInfo).toMatchObject({
        type: drillType,
        directions: ["asc"],
      });
    });

    it("should not allow to drill when clicked on a value", () => {
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

describe("drill-thru/column-filter", () => {
  const drillType = "drill-thru/column-filter";
  const initialQuery = createQuery();
  const stageIndex = 0;
  const column = createOrdersTotalDatasetColumn();

  describe("availableDrillThrus", () => {
    it("should allow to drill when clicked on a column header", () => {
      const { drillInfo } = findDrillThru(
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

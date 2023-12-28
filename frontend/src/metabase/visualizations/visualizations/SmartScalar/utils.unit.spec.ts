import * as measureText from "metabase/lib/measure-text";
import type { FontStyle } from "metabase/visualizations/shared/types/measure-text";

import {
  formatChange,
  formatChangeAutoPrecision,
  getChangeWidth,
  getValueWidth,
} from "./utils";

jest.doMock("metabase/lib/measure-text", () => ({
  measureText: jest.fn(),
}));

const createMockMeasureText = (width: number, height: number) => {
  return (_text: string, _style: FontStyle) => ({ width, height });
};

const getAutoPrecisionOptions = (width: number) => {
  return { fontFamily: "Lato", fontWeight: 400, width };
};

describe("SmartScalar > utils", () => {
  describe("getValueWidth", () => {
    it("should not return negative values", () => {
      expect(getValueWidth(1)).toBeGreaterThanOrEqual(0);
      expect(getValueWidth(1)).toBeGreaterThanOrEqual(0);
    });
  });

  describe("getChangeWidth", () => {
    it("should not return negative values", () => {
      expect(getChangeWidth(1)).toBeGreaterThanOrEqual(0);
      expect(getChangeWidth(1)).toBeGreaterThanOrEqual(0);
    });
  });

  describe("formatChangeAutoPrecision", () => {
    let measureTextSpy: jest.SpyInstance;

    beforeEach(() => {
      measureTextSpy = jest.spyOn(measureText, "measureText");
    });

    afterEach(() => {
      measureTextSpy.mockRestore();
    });

    it("should use maximum 2 fraction digits precision when text fits", () => {
      measureTextSpy.mockImplementationOnce(createMockMeasureText(100, 50));

      expect(
        formatChangeAutoPrecision(1.23456, getAutoPrecisionOptions(100)),
      ).toBe("123.46%");
    });

    it("should use 1 fraction digit when 2 digits don not fit", () => {
      measureTextSpy.mockImplementationOnce(createMockMeasureText(101, 50));
      measureTextSpy.mockImplementationOnce(createMockMeasureText(100, 50));

      expect(
        formatChangeAutoPrecision(1.23456, getAutoPrecisionOptions(100)),
      ).toBe("123.5%");
    });

    it("should use no fraction digits when they do not fit", () => {
      measureTextSpy.mockImplementationOnce(createMockMeasureText(103, 50));
      measureTextSpy.mockImplementationOnce(createMockMeasureText(102, 50));
      measureTextSpy.mockImplementationOnce(createMockMeasureText(101, 50));

      expect(
        formatChangeAutoPrecision(1.23456, getAutoPrecisionOptions(100)),
      ).toBe("123%");
    });
  });

  describe("formatChange", () => {
    it("should format as percentage", () => {
      expect(formatChange(-5)).toBe("500%");
      expect(formatChange(0)).toBe("0%");
      expect(formatChange(1)).toBe("100%");
      expect(formatChange(100)).toBe("10,000%");
    });

    it("should not keep the minus sign because UI has a dedicated icon for it", () => {
      expect(formatChange(-5)).toBe("500%");
    });

    it("should handle maximumFractionDigits parameter", () => {
      expect(formatChange(1.23456, { maximumFractionDigits: 2 })).toBe(
        "123.46%",
      );
      expect(formatChange(1.23456, { maximumFractionDigits: 1 })).toBe(
        "123.5%",
      );
      expect(formatChange(1.23456, { maximumFractionDigits: 0 })).toBe("123%");
    });
  });
});

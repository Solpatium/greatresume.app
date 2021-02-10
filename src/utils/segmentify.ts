const appendMany = (parent: Element | Node, content: (Element | Node)[]): void => {
  for (const child of content) {
    parent.appendChild(child);
  }
};

const replaceContent = (destination: Element, content: Node[]): void => {
  destination.innerHTML = "";
  appendMany(destination, content);
};

const getContentSize = (
  element: Element,
): {
  width: number;
  height: number;
  offset: Record<"top" | "bottom" | "left" | "right", number>;
} => {
  const computed = getComputedStyle(element);
  const parse = parseFloat;
  const offset = {
    left: parse(computed.paddingLeft),
    right: parse(computed.paddingRight),
    top: parse(computed.paddingTop),
    bottom: parse(computed.paddingBottom),
  };
  return {
    width: parse(computed.width) - offset.left - offset.right,
    height: parse(computed.height) - offset.top - offset.bottom,
    offset,
  };
};

const isAtomic = (el: Element): boolean =>
  el.childElementCount === 0 || el.className.includes("atomic");

type YRange = { top: number; bottom: number; content: Element | Node };
type XRange = { left: number; right: number; content: YRange[] };
type MeasuredElement = {
  el: Element | Node;
  // We don't want to to mutate the original element, but after .cloneNode we get
  // Node which is not an Element and we can't measure them
  children: Element[];
  x: number;
  width: number;
  height;
};

// No need to be extra precise
const normalizeValue = Math.round;

class Page {
  private ranges: Array<XRange>;
  // Used for adding DOM in the right order
  private children = [];
  constructor(private base: Element, private width: number, private height: number) {
    this.ranges = [{ left: 0, right: normalizeValue(width), content: [] }];
    console.log("PAGE SIZE", { width, height });
  }

  private addPoint = (point: number): void => {
    point = normalizeValue(point);
    for (const [i, range] of this.ranges.entries()) {
      if (range.left === point || range.right === point) {
        // Already exists
        return;
      }
      if (range.left < point && point < range.right) {
        const left = { left: range.left, right: point, content: range.content };
        // We can't use the same content twice
        const right = { left: point, right: range.right, content: [...range.content] };
        this.ranges.splice(i, 1, left, right);
      }
    }

    console.warn(`Point outside of valid range [0, ${this.width}]: ${point}`);
  };

  private getRange = (start: number, end: number): XRange[] => {
    // debugger;
    start = normalizeValue(start);
    end = normalizeValue(end);

    // TODO: Binary search & optimizations
    this.addPoint(start);
    this.addPoint(end);

    const result: XRange[] = [];
    let started = false;
    // debugger;
    for (const range of this.ranges) {
      if (started) {
        if (end <= range.left) {
          return result;
        }
        result.push(range);
      } else if (range.left === start) {
        result.push(range);
        started = true;
      }
    }
    return result;
    return this.ranges.filter(
      r => (r.left <= start && r.right <= end) || (start <= r.left && end <= r.right),
    );
  };

  // Returns overflowing element
  //  -→ X
  // ↓
  // Y
  public addContent = (element: MeasuredElement, force?: boolean): MeasuredElement | null => {
    console.log("element", element.el);
    // debugger;
    const ranges = this.getRange(element.x, element.x + element.width);
    console.log(this.ranges, element.x, element.x + element.width, "RANGES", ranges);
    let lowestPoint = 0;
    for (const range of ranges) {
      const lastRectangle = range.content[range.content.length - 1];
      console.log({ lastRectangle });
      if (lastRectangle && lastRectangle.bottom > lowestPoint) {
        lowestPoint = lastRectangle.bottom;
      }
    }
    const remainingHeight = this.height - lowestPoint;
    let elementToAdd: Element | Node;
    let overflow: MeasuredElement | null = null;
    console.log({ lowestPoint, remainingHeight });
    if (remainingHeight < element.height && !force) {
      // This element can't be divided
      // if (element.el instanceof Element && isAtomic(element.el)) {
      //   return element;
      // }

      // We treat every element as atomic at this level
      const { children } = element;
      let sumHeight = 0;
      let overflowingIndex: number | null = null;
      for (const [i, el] of children.entries()) {
        const { height } = el.getBoundingClientRect();
        console.log(i, el, height, remainingHeight, sumHeight, this.height, lowestPoint);
        if (height + sumHeight <= remainingHeight) {
          sumHeight += height;
        } else {
          overflowingIndex = i;
          break;
        }
      }
      // Not even a single child fits
      if (overflowingIndex === 0) {
        return element;
      }
      // Parent's padding + overflowing content
      const overflowHeight = element.height - sumHeight;

      // TODO
      // This means that although sum of children sizes fits the space the parent
      // doesn't (because of padding etc)
      if (overflowingIndex === null) {
        // Assumption that it is enough to move one child to the next page!
        overflowingIndex = children.length;
      }

      const fittingChildren = children.slice(0, overflowingIndex);
      elementToAdd = element.el.cloneNode(false);
      appendMany(
        elementToAdd,
        fittingChildren.map(c => c.cloneNode(true)),
      );

      const overflowingChildren = children.slice(overflowingIndex);
      console.log({ overflowHeight, overflowingIndex, fittingChildren, overflowingChildren });
      overflow = {
        el: element.el.cloneNode(false),
        children: overflowingChildren,
        width: element.width,
        height: overflowHeight,
        x: element.x,
      };
    } else {
      // Whole element fits
      elementToAdd = element.el.cloneNode(false);
      appendMany(
        elementToAdd,
        element.children.map(e => e.cloneNode(true)),
      );
    }
    this.children.push(elementToAdd);
    for (const range of ranges) {
      range.content.push({
        top: lowestPoint,
        // We can get only a part of the height, we need to normalize to page size
        bottom: Math.min(this.height, lowestPoint + element.height),
        content: elementToAdd,
      });
    }
    return overflow;
  };

  public makeNode = (): Node => {
    console.log(this.ranges);
    const page = this.base.cloneNode(false);
    for (const child of this.children) {
      page.appendChild(child);
    }
    return page;
  };
}

export const segmentify = (source: Element, destination: Element): void => {
  // TODO: If one page don't start this whole logic
  const pageSize = getContentSize(source);
  const { x: pageX } = source.getBoundingClientRect();
  const contentStart = pageX + pageSize.offset.left;
  const pages: Array<Page> = [new Page(source, pageSize.width, pageSize.height)];
  const continueEmptyList: MeasuredElement[] = [];
  for (const element of source.children) {
    const continueEmpty = element.className.includes("continue-empty");
    const { x, width, height } = element.getBoundingClientRect();
    const initial: MeasuredElement = {
      el: element,
      x: x - contentStart,
      width,
      height,
      children: Array.from(element.children),
    };
    let overflow = initial;
    // TODO: Improve the algorithm to search for a proper page
    for (const page of pages) {
      if (overflow) {
        overflow = page.addContent(overflow);
        console.log("OVERFLOW", overflow);
      } else if (continueEmpty) {
        page.addContent({ ...initial, children: [] }, true);
      }
    }
    while (overflow) {
      const newPage = new Page(source, pageSize.width, pageSize.height);
      pages.push(newPage);
      for (const toAdd of continueEmptyList) {
        newPage.addContent({ ...toAdd, children: [] }, true);
      }
      const remainingContent = newPage.addContent(overflow);
      // Nothing was added
      if (!remainingContent || remainingContent.height < overflow.height) {
        overflow = remainingContent;
      } else {
        console.error("Content too big for a page", remainingContent);
        overflow = null;
      }
      // if (result) {
      //   console.error("Content too big for a page", result);
      //   // throw new Error("Content too big for a page");
      // }
    }

    if (continueEmpty) {
      continueEmptyList.push(initial);
    }
  }

  console.log(pages);

  replaceContent(
    destination,
    pages.map((p, i) => {
      const page = p.makeNode() as Element;
      // const additionalClasses = [`page-${i}`];
      page.classList.add(`page-${i}`);
      return page;
    }),
  );
};

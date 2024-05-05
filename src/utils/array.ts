export const arraysEqual = (a: any[], b: any[]): boolean => {
    return a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }
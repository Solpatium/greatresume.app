const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export type HasId = { id: string };

export const withId = <T>(value: T): T & { id: string } => ({ ...value, id: generateId() });

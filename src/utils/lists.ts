let key = 1;

export const withKey = <T>(value: T): T & { key: number } => ({ ...value, key: key++ });

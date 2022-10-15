export const sleep = (time: number) => new Promise(res => setTimeout(res, time));

export const getEmptyBoard = (): (0 | 1)[][] => Array.from(Array(8), () => new Array(8).fill(0));
//рассчитываем как нам разбить массив продуктов на 2 части
export const calculateOffsets = (length: number) => {
  const dataTotalCount = length;
  const dataFirstPartLength = Math.round((dataTotalCount / 100) * 5);
  const dataSecondPartLength = dataTotalCount - dataFirstPartLength;
  return [dataFirstPartLength, dataSecondPartLength];
};

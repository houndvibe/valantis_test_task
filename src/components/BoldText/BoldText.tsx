//Небольшая обертка для выделения текста жирным шрифтом

const BoldText = ({ children }: { children: string }) => {
  return <span style={{ fontWeight: 600 }}>{children}</span>;
};

export default BoldText;

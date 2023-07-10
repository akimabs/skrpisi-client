export const formatRupiah = (text: string, withoutRp?: boolean) => {
  const valueText = text ? text : '0';
  return (
    `${!withoutRp ? 'Rp' : ''}` +
    valueText
      .toString()
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  );
};

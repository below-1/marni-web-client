export function formatV(x: number) {
  if (x < 0.6) {
    return 'Buruk';
  }
  if (x < 0.70) {
    return 'Kurang';
  }
  if (x < 0.80) {
    return 'Sedang';
  }
  if (x < 1.2) {
    return 'Baik';
  }

  return 'Lebih';
}

export function bb_umur_format(s: string) {
  switch (s) {
    case 'BURUK': return '< -3SD';
    case 'KURANG': return '-3 SD sampai dengan < -2SD';
    case 'BAIK': return '-2SD sampai dengan 2SD';
    case 'LEBIH': return '> 2SD';
    default:
      throw new Error('something wrong');
  }
}
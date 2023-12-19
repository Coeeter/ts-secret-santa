const colors = ['red', 'blue', 'yellow'];
const instruments = ['violin', 'xylophone', 'drum'];

const fn = (val, options = {}) => {
  let str = '';

  for (let i = val.length - 1; i >= 0; i--) {
    str += val[i];
  }

  if (options.f) {
    return str.at(-1);
  }

  return str;
};

const s = {
  str1: 'rt',
  str2: colors[colors.length - 3],
  str3: fn('am'),
};

const i = Math.floor(instruments.length / 2);

const secondWord = fn(
  fn(instruments[i], { f: 2 }) + 'o' + fn(colors[i], { f: 3 })
);

console.log(
  `The place of the present is: ${s.str2 + s.str3 + s.str1} ${secondWord}`
);

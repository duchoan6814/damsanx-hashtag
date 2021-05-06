import { replace } from "lodash";

const replaceBetween = (origin, startIndex, endIndex, insertion) => {
  return (
    origin.substring(0, startIndex) + insertion + origin.substring(endIndex)
  );
};

export const handleRemoveCommentLatexTag = (latex) => {
  let _latex = latex;
  const regex1 = /\\begin{ex}(%\[.*\])*/;
  const regex2 = /\\end{ex}/;

  _latex = _latex.replace(regex1, "");
  _latex = _latex.replace(regex2, "");

  return _latex;
};

export const removeSpaceResidual = (latex) => {
  let _latex = latex;
  const regex = /\s{2,}/g;
  _latex = _latex.replace(regex, " ");
  return _latex;
};

export const removeBeginCenterTag = (latex) => {
  let _latex = latex;
  const regex1 = /\\begin{center}/gm;
  const regex2 = /\\end{center}/gm;

  _latex = _latex.replace(regex1, "");
  _latex = _latex.replace(regex2, "");

  return _latex;
};

export const removeMiniPageTag = (latex) => {
  let _latex = latex;
  const regex = /(\\begin{minipage})/gm;

  _latex = _latex.replace(regex, "");

  return _latex;
};

export const removeTabVarTag = (latex) => {
  let _latex = latex;
  const regex = /(\\tabvar)/gm;
  _latex = _latex.replace(regex, "");
  return _latex;
};

export const removeLoiGiaiTag = (latex) => {
  let _latex = latex;
  // const regex = /(\\loigiai)/gm;
  // _latex = _latex.replace(regex, "");
  // return _latex;

  const listTemp = _latex.split(/\\loigiai\{/gm);

  listTemp.map((i, index) => {
    if (index > 0) {
      let listMoNgoac = [];
      let listDongNgoac = [];

      for (let i = 0; i < listTemp[index].length; i++) {
        if (listTemp[index][i].match(/\{/)) {
          listMoNgoac = [...listMoNgoac, i];
        }

        if (listTemp[index][i].match(/\}/)) {
          listDongNgoac = [...listDongNgoac, i];
        }

        if (listDongNgoac.length > listMoNgoac.length) {
          break;
        }
      }

      let a = listTemp[index]
        .split("")
        .splice(0, listDongNgoac[listDongNgoac.length - 1])
        .join("");

      listTemp[index] = replaceBetween(
        listTemp[index],
        0,
        listDongNgoac[listDongNgoac.length - 1] + 1,
        a
      );
    }
  });

  return listTemp.join("");
};

export const removeNoindentTag = (latex) => {
  let _latex = latex;
  const regex = /(\\noindent)/gm;
  _latex = _latex.replace(regex, "");
  return _latex;
};
export const removeHfillTag = (latex) => {
  let _latex = latex;
  const regex = /(\\hfill)/gm;
  _latex = _latex.replace(regex, "");
  return _latex;
};
export const removeQquadTag = (latex) => {
  let _latex = latex;
  const regex = /(\\qquad)/gm;
  const regex1 = /(\\newline)/gm;
  const regex2 = /(\\break)/gm;
  const regex3 = /(\\linebreak)/gm;
  const regex4 = /(\\textwidth)/gm;
  const regex5 = /(\\impicinpar)/gm;
  const regex6 = /(\\newline)/gm;
  const regex7 = /(\\medskip)/gm;

  _latex = _latex.replace(regex, "");
  _latex = _latex.replace(regex1, "");
  _latex = _latex.replace(regex2, "");
  _latex = _latex.replace(regex3, "");
  _latex = _latex.replace(regex4, "");
  _latex = _latex.replace(regex5, "");
  _latex = _latex.replace(regex6, "");
  _latex = _latex.replace(regex7, "");
  return _latex;
};

export const handleLatexHeva = (latex) => {
  let _latex = latex;

  const listTemp = _latex.split(/\\heva\{/);

  listTemp.map((i, index) => {
    if (index > 0) {
      let listMoNgoac = [];
      let listDongNgoac = [];

      for (let i = 0; i < listTemp[index].length; i++) {
        if (listTemp[index][i].match(/\{/)) {
          listMoNgoac = [...listMoNgoac, i];
        }

        if (listTemp[index][i].match(/\}/)) {
          listDongNgoac = [...listDongNgoac, i];
        }

        if (listDongNgoac.length > listMoNgoac.length) {
          break;
        }
      }

      let contentInLatex = listTemp[index]
        .split("")
        .splice(0, listDongNgoac[listDongNgoac.length - 1])
        .join("")
        .replace(/&/g, "")
        .replace(/\$\\\\\$/g, "\\\\");

      listTemp[index] = replaceBetween(
        listTemp[index],
        0,
        listDongNgoac[listDongNgoac.length - 1] + 1,
        `\\begin{cases}${contentInLatex}\\end{cases}`
      );
    }
  });

  return listTemp.join("");
};

export const handleDoubleBackSlash = (latex) => {
  let _latex = latex;
  _latex = _latex.replace(/\$\\\\\$/gm, '\\\\')
  _latex = _latex.replace(/\\\\/gm, ' \\\\ ')
  _latex = _latex.replace(/(?<!\$)\\\\[^$]{0}/g, "$\\\\$");
  return _latex;
};

export const handleLatexHoac = (latex) => {
  let _latex = latex;

  const listTemp = _latex.split(/\\hoac\{/);

  listTemp.map((i, index) => {
    if (index > 0) {
      let listMoNgoac = [];
      let listDongNgoac = [];

      for (let i = 0; i < listTemp[index].length; i++) {
        if (listTemp[index][i].match(/\{/)) {
          listMoNgoac = [...listMoNgoac, i];
        }

        if (listTemp[index][i].match(/\}/)) {
          listDongNgoac = [...listDongNgoac, i];
        }

        if (listDongNgoac.length > listMoNgoac.length) {
          break;
        }
      }

      let contentInLatex = listTemp[index]
        .split("")
        .splice(0, listDongNgoac[listDongNgoac.length - 1])
        .join("")
        .replace(/&/g, "")
        .replace(/\$\\\\\$/g, "\\\\");

      listTemp[index] = replaceBetween(
        listTemp[index],
        0,
        listDongNgoac[listDongNgoac.length - 1] + 1,
        `\$\\left[\\begin{aligned}${contentInLatex}\\end{aligned}\\right.\$`
      );
    }
  });

  return listTemp.join("");
};

export const handleNhayKep = (latex) => {
  let _latex = latex;
  _latex = _latex
    .replace(/\\lqlq/, "$\\\\``$")
    .replace(/\\lq(?!=lq)/g, "$\\\\`$")
    .replace(/\\rq\\rq/g, "$\\\\\\\\”$");

  return _latex;
};

export const handleTextBF = (latex) => {
  let _latex = latex;

  const listTemp = _latex.split(/\\textbf\{/);

  listTemp.map((i, index) => {
    if (index > 0) {
      let listMoNgoac = [];
      let listDongNgoac = [];

      for (let i = 0; i < listTemp[index].length; i++) {
        if (listTemp[index][i].match(/\{/)) {
          listMoNgoac = [...listMoNgoac, i];
        }

        if (listTemp[index][i].match(/\}/)) {
          listDongNgoac = [...listDongNgoac, i];
        }

        if (listDongNgoac.length > listMoNgoac.length) {
          break;
        }
      }

      let contentInLatex = listTemp[index]
        .split("")
        .splice(0, listDongNgoac[listDongNgoac.length - 1])
        .join("")

      listTemp[index] = replaceBetween(
        listTemp[index],
        0,
        listDongNgoac[listDongNgoac.length - 1] + 1,
        `\$\\textbf{${contentInLatex}}\$`
      );
    }
  });

  return listTemp.join("");

};

export const handleRemoveImmini = (latex) => {
  let _latex = latex;

  const listTemp = _latex.split(/\\immini\{/);

  listTemp.map((i, index) => {
    if (index > 0) {
      let listMoNgoac = [];
      let listDongNgoac = [];

      for (let i = 0; i < listTemp[index].length; i++) {
        if (listTemp[index][i].match(/\{/)) {
          listMoNgoac = [...listMoNgoac, i];
        }

        if (listTemp[index][i].match(/\}/)) {
          listDongNgoac = [...listDongNgoac, i];
        }

        if (listDongNgoac.length > listMoNgoac.length) {
          break;
        }
      }

      let a = listTemp[index]
        .split("")
        .splice(0, listDongNgoac[listDongNgoac.length - 1])
        .join("");

      listTemp[index] = replaceBetween(
        listTemp[index],
        0,
        listDongNgoac[listDongNgoac.length - 1] + 1,
        a
      );
    }
  });

  return listTemp.join("");
};

export const handleRemoveAllowdisplaybreaks = (latex) => {
  let _latex = latex;

  _latex = _latex.replace(/\\allowdisplaybreaks[^\{]/gm, "");

  const listTemp = _latex.split(/\\allowdisplaybreaks\{/gm);

  listTemp.map((i, index) => {
    if (index > 0) {
      let listMoNgoac = [];
      let listDongNgoac = [];

      for (let i = 0; i < listTemp[index].length; i++) {
        if (listTemp[index][i].match(/\{/)) {
          listMoNgoac = [...listMoNgoac, i];
        }

        if (listTemp[index][i].match(/\}/)) {
          listDongNgoac = [...listDongNgoac, i];
        }

        if (listDongNgoac.length > listMoNgoac.length) {
          break;
        }
      }

      let a = listTemp[index]
        .split("")
        .splice(0, listDongNgoac[listDongNgoac.length - 1])
        .join("");

      listTemp[index] = replaceBetween(
        listTemp[index],
        0,
        listDongNgoac[listDongNgoac.length - 1] + 1,
        a
      );
    }
  });

  return listTemp.join("");
};

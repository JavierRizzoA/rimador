/**************************************************************************
*   Copyright (C) 2016 by Javier Rizzo                                    *
*   javierrizzoa@gmail.com                                                *
*   http://javierrizzo.com                                                *
*                                                                         *
*   This project is based heavely on DiccionarioDeRimas                   *
*   (https://sourceforge.net/projects/diccionariorima/)                   *
*   by Eduardo Rodriguez Lorenzo <edu.tabula@gmail.com>,                  *
*   copyright (C) 2009.                                                   *
*                                                                         *
*                                                                         *
*   This program is free software; you can redistribute it and/or modify  *
*   it under the terms of the GNU General Public License as published by  *
*   the Free Software Foundation; either version 2 of the License, or     *
*   (at your option) any later version.                                   *
*                                                                         *
*   This program is distributed in the hope that it will be useful,       *
*   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
*   GNU General Public License for more details.                          *
*                                                                         *
*   You should have received a copy of the GNU General Public License     *
*   along with this program; if not, write to the                         *
*   Free Software Foundation, Inc.,                                       *
*   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
***************************************************************************/

function isVowel(c) {
  return (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' || c == 'ü' || c == 'á' || c == 'é' || c == 'í' || c == 'ó' || c == 'ú');
}

function isWeak(c) {
  return (c == 'u' || c == 'i' || c == 'ü' || c == 'y');
}

function isAnAccent(c) {
  return (c == 'á' || c == 'é' || c == 'í' || c == 'ó' || c == 'ú');
}

function analyze(word) {
  var VOWEL = 0;
  var CONSONANT = 1;
  var SOFT = 0;
  var HARD = 1;

  var AGUDA = 0;
  var LLANA = 1;
  var ESDRU = 2;

  var rhyme = '';
  var asonance = '';
  var oldSil = [];
  var loc = 0;
  var silablesTotal = 0;
  var accentedSil = 0;

  var chars = word.split('');

  var oldTypes = Array(chars.length);
  var oldSoft = Array(chars.length);
  for (var i = 0; i < chars.length; i++) {
    if (isVowel(chars[i]) ||
      (chars[i] == 'y' && (i + 1 == chars.length || (i + 1 < chars.length && !isVowel(chars[i + 1])))))
      oldTypes[i] = VOWEL;
    else
      oldTypes[i] = CONSONANT;
    if (isWeak(chars[i]))
      oldSoft[i] = SOFT;
    else
      oldSoft[i] = HARD;

  }

  var accentLoc = -1;

  for (var i = 0; i < chars.length; i++) {
    if (isAnAccent(chars[i]))
      accentLoc = i;
  }

  var newWordB = chars[0];
  var positions = new Array(chars.length);
  var types = new Array(chars.length);
  var soft = new Array(chars.length);
  positions[0] = 0;
  var newLen = 1;
  for (var i = 1; i < chars.length; i++) {
    var skip = false;
    if (i == chars.length - 1 && oldTypes[i] == CONSONANT && oldTypes[i - 1] == CONSONANT)
      skip = true;
    if (chars[i] == 's' && chars[i - 1] == 'n' && i + 1 < chars.length && oldTypes[i + 1] == CONSONANT) //transformación
      skip = true;

    if (chars[i] == 's' && chars[i - 1] == 'b' && i + 1 < chars.length && oldTypes[i + 1] == CONSONANT) // abstraigo
      skip = true;

    if (chars[i] == 'r' || chars[i] == 'l') {
      if (chars[i - 1] == 'b' || chars[i - 1] == 'f' || chars[i - 1] == 'g' || chars[i - 1] == 'k' ||
        chars[i - 1] == 'p' || chars[i - 1] == 't' || chars[i - 1] == 'c')
        skip = true;
    }
    if (chars[i] == 'h' ||
      (chars[i] == 'l' && chars[i - 1] == 'l') ||
      (chars[i] == 'u' && chars[i - 1] == 'q') ||
      (chars[i] == 'u' && chars[i - 1] == 'g' && i + 1 < chars.length && (chars[i + 1] == 'e' || chars[i + 1] == 'i')) ||
      (chars[i] == 'r' && (chars[i - 1] == 'r' || chars[i - 1] == 'd')))
      skip = true;

    if (!skip) {
      newWordB += (chars[i]);
      types[newLen] = oldTypes[i];
      soft[newLen] = oldSoft[i];
      positions[newLen] = i;
      newLen++;
    }
  }

  var newChars = newWordB.split('');

  var silables = new Array(newChars.length);
  var countSilables = 0;
  var lastStart = 0;
  for (var i = 0; i < newLen; i++) {

    if (i + 1 >= newLen) {

      silables[countSilables] = lastStart;
      countSilables++;
      if (types[i] == VOWEL && i > 1 && types[i - 1] == VOWEL && types[i - 2] == VOWEL && soft[i] == HARD &&
        soft[i - 1] == SOFT && soft[i - 2] == HARD) {
        silables[countSilables] = i;
        countSilables++;
      } else if (types[i] == VOWEL && soft[i] == HARD && i > 0 && types[i - 1] == VOWEL && soft[i - 1] == HARD) {
        silables[countSilables] = i;
        countSilables++;
      }
    } else if (lastStart != i) {
      if (types[i] == CONSONANT) {
        silables[countSilables] = lastStart;
        countSilables++;
        if (types[i + 1] == CONSONANT)
          lastStart = i + 1;
        else
          lastStart = i;

      } else if (soft[i] == HARD && types[i - 1] == VOWEL && soft[i - 1] == HARD) {
        silables[countSilables] = lastStart;
        countSilables++;
        lastStart = i;
      } else if (i > 1 && types[i - 1] == VOWEL && types[i - 2] == VOWEL && soft[i] == HARD &&
        soft[i - 1] == SOFT && soft[i - 2] == HARD) {
        silables[countSilables] = lastStart;
        countSilables++;
        lastStart = i;

      }
    }
  }

  silablesTotal = countSilables;

  oldSil = new Array(countSilables);
  for (var i = 0; i < countSilables; i++) {
    oldSil[i] = positions[silables[i]];
  }
  if (accentLoc == -1) {
    // llana o aguda
    var lastLetter = chars[chars.length - 1];
    var begSil = 0;
    var endSil = 0;

    if (countSilables > 1 && (isVowel(lastLetter) || lastLetter == 'n' || lastLetter == 's')) {
      begSil = silables[countSilables - 2];
      endSil = silables[countSilables - 1];
    } else {
      begSil = silables[countSilables - 1];
      endSil = chars.length;
    }

    for (var i = begSil; i < endSil; i++) {

      if (types[i] == VOWEL) {
        if (i + 1 == endSil || types[i + 1] == CONSONANT) {
          accentLoc = positions[i];

        } else {
          for (var j = i; j < endSil; j++) {
            if (types[j] == VOWEL && soft[j] == HARD) {
              accentLoc = positions[j];
              j = endSil;

            }

          }
          if (accentLoc == -1) {
            for (var j = endSil - 1; j >= begSil; j--) {
              if (types[j] == VOWEL) {
                accentLoc = positions[j];
                j = -1;
              }

            }
          }
        }
        i = endSil;
      }
    }
  }

  loc = accentLoc;
  var rhymeB = '';
  var asonanceB = '';
  if (accentLoc != -1) {
    for (var i = accentLoc; i < chars.length; i++) {

      if (chars[i] == 'á') {
        rhymeB += ('a');
        asonanceB += ('a');
      } else if (chars[i] == 'é') {
        rhymeB += ('e');
        asonanceB += ('e');
      } else if (chars[i] == 'í') {
        rhymeB += ('i');
        asonanceB += ('i');
      } else if (chars[i] == 'ó') {
        rhymeB += ('o');
        asonanceB += ('o');
      } else if (chars[i] == 'ú') {
        rhymeB += ('u');
        asonanceB += ('u');
      } else if (chars[i] == 'v') {
        rhymeB += ('b');
      } else if (chars[i] == 'y' && oldTypes[i] == VOWEL) {
        rhymeB += ('i');
        asonanceB += ('i');
      } else {
        rhymeB += (chars[i]);
        if (oldTypes[i] == VOWEL)
          asonanceB += (chars[i]);
      }

    }
  } else
    rhyme = word;

  rhyme = rhymeB.toString();
  asonance = asonanceB.toString();

  accentedSil = -1;
  for (var i = 0; i < oldSil.length; i++) {
    if (accentLoc >= oldSil[i])
      accentedSil = i;
  }

  var newSilables = [];
  silables.forEach(function(s) {if(s != null) newSilables.push(s)});

  return {
    word: word,
    rhyme: rhyme,
    asonance: asonance,
    accentLocation: loc,
    syllables: silablesTotal,
    accentedSyllable: accentedSil,
    hyphens: newSilables
  };
}

exports.analyze = analyze;

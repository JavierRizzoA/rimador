#rimador

Finds the rhyme, the number of syllables, the accented syllable, and other related stuff of Spanish words.

##Code Example

```javascript
var r = require('rimador');
r.analyze('palabra');
```

That code returns the following object:

```javascript
{
    word: 'palabra',
    rhyme: 'abra',
    asonance: 'aa',
    accentLocation: 3,
    syllables: 3,
    accentedSyllable: 1,
    hyphens: [0, 2, 4]
}
```

##Motivation

Just for the keks.

##Installation

```shell
npm install rimador
```

##API Reference

The `analyze(word)` function returns an object with the following properties:

* **word**: The word analyzed.
* **rhyme**: The rhyme-significant letters.
* **asonance**: The vocals present in the rhyme, significant to the asonant rhyme.
* **accentLocation**: The index of the accented character.
* **syllables**: The number of syllables.
* **accentedSyllable**: The index of the accented syllable.
* **hyphens**: An array containing the index of the starting character of each syllable.

##Tests

```shell
npm run test
```

##Contribute

Contribute by reporting issues, adding features or fixing bugs.

##License

Copyright (C) 2016 by Javier Rizzo
(javierrizzoa@gmail.com)

This project is based heavely on DiccionarioDeRimas
(https://sourceforge.net/projects/diccionariorima/)
by Eduardo Rodriguez Lorenzo (edu.tabula@gmail.com),
copyright (C) 2009.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the
Free Software Foundation, Inc.,
59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.

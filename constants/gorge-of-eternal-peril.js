/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

module.exports = {
  questions: {
    stop: {
      q: [
        'Stop! Who would cross the Bridge of Death must\nanswer me these',
        'questions three, \'ere the other side he see.\n Dare thouest cross?'
      ].join(' '),
      check: input => !!input.match('yes')
    },
    quest: {
      q: 'What is your quest?'
    },
    name: {
      q: 'What is your name?'
    },
    favoriteColor: {
      q: 'What is your favorite color?',
      check: input => !input.match('blue no yellow')
    },
    capitalOfAssyria: {
      q: 'What is the capital of Assyria?',
      // There are a few as the capital moved during the nations existence
      check: input => ['nineveh', 'ekallatum', 'assur']
        .indexOf(input.toLowerCase()) > -1
    },
    airSpeedVelocity: {
      q: 'What is the air-speed velocity of an unladen European swallow?',
      check: input => !!input.match('11 meters per second')
    }
  },
  taunt: [
    '\nBrave Sir Robin ran away',
    'Bravely ran away away',
    'When danger reared its ugly head',
    'He bravely turned his tail and fled'
  ].join('\n'),
  wildcardTags: ['favoriteColor', 'capitalOfAssyria', 'airSpeedVelocity'],
  intoTheGorge: [
    'The bridgekeeper smiles slyly as you feel yourself thrust\n',
    'into the air and thrown into the gorge!!\n  Apparently you were wrong...'
  ].join(''),
  onYourWay: 'Right, off you go then..'
};

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
const builder = require('botbuilder');
const random = require('lodash.random');
const constants = require('../constants/gorge-of-eternal-peril.js');

module.exports = [
  function (session) {
    // Prompt the user to confirm they would like to cross the gorge
    builder.Prompts.text(session, constants.questions.stop.q);
  },
  function (session, results) {
    // Check to see if the user wants to cross the gorge
    if (!constants.questions.stop.check(results.response)) {
      // Apparently they don't so in Monty Python style send them on thier way
      session.send(constants.taunt);
      // End the dialog to open a new session on the console
      session.endConversation();
    } else {
      // Otherwise they chose to proceed, prompt them with the first question:
      // "What is your name?"
      builder.Prompts.text(session, constants.questions.name.q);
    }
  },
  function (session, results) {
    // Ask the second question: "What is your quest?"
    builder.Prompts.text(session, constants.questions.quest.q);
  },
  function (session, results) {
    // Randomly select our last question, three choices exist in our constants
    // file, please refer to the wildcardTags property to determine which
    // questions may be randomly selected.
    const qTag = constants
      .wildcardTags[random(0, constants.wildcardTags.length-1)];
    session.userData.lastQuestionTag = qTag;
    builder.Prompts.text(session, constants.questions[qTag].q);
  },
  function (session, results) {
    const question = constants.questions[session.userData.lastQuestionTag];
    const answer = results.response.trim();
    // Unlike our other two questions the last question always has a wrong
    // answer or set of answers. Check to see whether the user was correct
    const correct = question.check(results.response.trim());
    if (!correct) {
      // Incorrect! Into the gorge you go
      session.send(constants.intoTheGorge);
    } else {
      // Right! On your way then
      session.send(constants.onYourWay);
    }
    // End the conversation to open a new session on the console
    session.endConversation();
  }
];

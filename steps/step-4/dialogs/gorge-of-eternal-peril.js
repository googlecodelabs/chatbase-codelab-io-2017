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
const chatbase = require('@google/chatbase')
  .setApiKey('[your api key]')
  .setUserId('some-unique-user-id')
  .setPlatform('gorge-of-peril')
  .setVersion('1.0')
  .setIntent('cross-gorge-of-peril');

module.exports = [
  function (session) {
    // Prompt the user to confirm they would like to cross the gorge
    builder.Prompts.text(session, constants.questions.stop.q);
  },
  function (session, results) {
    // Check to see if the user wants to cross the gorge
    if (!constants.questions.stop.check(results.response)) {
      // Apparently they don't so in Monty Python style send them on thier way
      chatbase.newMessage()
        .setAsNotHandled()
        .setMessage(results.response.toString())
        .send()
        .catch(e => console.error(e))
      session.send(constants.taunt);
      // End the dialog to open a new session on the console
      session.endConversation();
    } else {
      // Otherwise they chose to proceed, prompt them with the first question:
      // "What is your name?"
      chatbase.newMessage()
        .setMessage(results.response.toString())
        .send()
        .catch(e => console.error(e));
      builder.Prompts.text(session, constants.questions.name.q);
    }
  },
  function (session, results) {
    chatbase.newMessage()
      // send the value received for the 'name' question
      .setMessage(results.response.toString())
      .send()
      .catch(e => console.error(e));
    // Ask the second question: "What is your quest?"
    builder.Prompts.text(session, constants.questions.quest.q);
  },
  function (session, results) {
    chatbase.newMessage()
      // send the value received for the 'quest' question
      .setMessage(results.response.toString())
      .send()
      .catch(e => console.error(e));
    // Randomly select our last question, several choices exist in our constants
    // file, please refer to the wildcardTags property to determine which
    // questions may be randomly selected.
    const qTag = constants
      .wildcardTags[random(0, constants.wildcardTags.length-1)];
    session.userData.lastQuestionTag = qTag;
    builder.Prompts.text(session, constants.questions[qTag].q);
  },
  function (session, results) {
    const question = constants.questions[session.userData.lastQuestionTag];
    const answer = results.response.toString().trim();
    // Unlike our other two questions this last question always has a wrong
    // answer or set of correct answers. Check the validity of the users input.
    const correct = question.check(answer);
    // BEGIN MODIFICATION TO LAST STEP 1/3
    const msg = chatbase.newMessage()
      // Set up our message with the question asked and whether or not the
      // answer was correct along with the users response but don't send it yet!
      .setMessage(JSON.stringify({
        question: question.q,
        answer: answer,
        correct: correct
      }));
    // END MODIFICATION TO LAST STEP 1/3
    if (!correct) {
      // BEGIN MODIFICATION TO LAST STEP 2/3
      // Looks like the response was incorrect; count it as unhandled by setting
      // the message as not handled
      msg.setAsNotHandled();
      // END MODIFICATION TO LAST STEP 2/3
      // Incorrect! Into the gorge you go
      session.send(constants.intoTheGorge);
    } else {
      // Right! On your way then
      session.send(constants.onYourWay);
    }
    // BEGIN MODIFICATION TO LAST STEP 3/3
    // Now, send the message
    msg.send().catch(e => console.error(e));
    // END MODIFICATION TO LAST STEP 3/3
    // End the conversation to open a new session on the console
    session.endConversation();
  }
];
